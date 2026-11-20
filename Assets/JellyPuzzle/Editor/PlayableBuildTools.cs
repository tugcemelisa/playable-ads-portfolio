using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Collections.Generic;
using System.Threading.Tasks;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace JellyAd.EditorTools
{
    public static class PlayableBuildTools
    {
        static bool busy;
        static System.Threading.Timer bgPollTimer;
        static DateTime lastScriptStamp;
        [InitializeOnLoadMethod]
        static void RunInitialValidation()
        {
            Application.runInBackground = true;
            lastScriptStamp = GetLatestScriptWriteUtc();
            var ctx = System.Threading.SynchronizationContext.Current;
            if (ctx != null && bgPollTimer == null)
            {
                bgPollTimer = new System.Threading.Timer(_ =>
                {
                    try { ctx.Post(__ => CheckForExternalScriptChanges(), null); } catch { }
                }, null, 2000, 2000);
            }
            const string key = "Voodoo.PlayableValidation.RescueRunV2";
            if (SessionState.GetBool(key, false)) return;
            SessionState.SetBool(key, true);
            EditorApplication.delayCall += () =>
            {
                PlayableSpriteMaterial.EnsureNow();
                JellySceneBuilder.BuildRunner();
                Runner();
            };
        }

        static DateTime GetLatestScriptWriteUtc()
        {
            DateTime max = DateTime.MinValue;
            foreach (var f in Directory.GetFiles("Assets", "*.cs", SearchOption.AllDirectories))
            {
                var t = File.GetLastWriteTimeUtc(f);
                if (t > max) max = t;
            }
            return max;
        }

        static void CheckForExternalScriptChanges()
        {
            if (busy || EditorApplication.isCompiling || EditorApplication.isUpdating) return;
            var latest = GetLatestScriptWriteUtc();
            if (latest > lastScriptStamp)
            {
                lastScriptStamp = latest;
                AssetDatabase.Refresh();
            }
        }
        const BindingFlags PublicInstance = BindingFlags.Public | BindingFlags.Instance;

        // Adapter pinned to the locally installed Playworks 7.2.0 export pipeline.
        // Fail explicitly if the SDK changes; never silently produce another target.
        static async Task Export(string scene)
        {
            var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.GetName().Name == "EditorScripts");
            if (assembly == null) throw new InvalidOperationException("Install Playworks 7.2.0 first.");
            var configType = assembly.GetType("\u1680.\u1680\u202d", true);
            var config = configType.GetMethod("\u00a0", BindingFlags.Public | BindingFlags.Static, null, Type.EmptyTypes, null).Invoke(null, null);
            if ((string)config.GetType().GetField("version").GetValue(config) != "7.2.0")
                throw new InvalidOperationException("This build adapter requires Playworks 7.2.0.");
            var unity = config.GetType().GetField("unity").GetValue(config);
            unity.GetType().GetField("scenes").SetValue(unity, new List<string> { scene });
            unity.GetType().GetField("disabledScenes").SetValue(unity, new List<string>());
            unity.GetType().GetField("startupScene").SetValue(unity, 0);
            configType.GetMethod("\u2058", BindingFlags.Public | BindingFlags.Static).Invoke(null, null);
            var pipelineType = assembly.GetType("\u1680.\u1680\u2027", true);
            var pipeline = pipelineType.GetField("\u2010\u202e", BindingFlags.Public | BindingFlags.Static).GetValue(null);
            var targetField = pipelineType.GetField("\u2010\u2035", PublicInstance);
            targetField.SetValue(pipeline, Enum.ToObject(targetField.FieldType, 0));
            var stageType = assembly.GetType("\u1680.\u1680\u2025", true);
            var method = pipelineType.GetMethod("\u2007", PublicInstance, null, new[] { stageType }, null);
            bool success = await (Task<bool>)method.Invoke(pipeline, new[] { Enum.ToObject(stageType, 7) });
            if (!success) throw new InvalidOperationException("Playworks export failed for " + scene + ". See LunaTemp/luna.log.");
            var exported = JsonUtility.FromJson<ExportConfig>(File.ReadAllText("LunaTemp/stage4/develop/luna.json"));
            if (exported.unity.scenes.Length != 1 || exported.unity.scenes[0] != scene)
                throw new InvalidOperationException("Exported scene does not match the requested scene: " + scene);
            string name = Path.GetFileNameWithoutExtension(scene);
            string output = "Builds/Playables/" + name;
            CopyDirectory("LunaTemp/stage4/develop", output);
            // A portfolio preview has no local diagnostics server to receive tracing requests.
            var htmlPath = output + "/iframe.html";
            File.WriteAllText(htmlPath, File.ReadAllText(htmlPath).Replace("window.DEVELOP=!0", "window.DEVELOP=!1"));
            File.WriteAllText(output + "/index.html", "<!doctype html><html lang=\"en\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" + name + " — Playable Demo</title><style>html,body{margin:0;height:100%;background:#101427}body{display:grid;place-items:center}iframe{border:0;width:min(100vw,56.25vh);height:100dvh}</style><iframe title=\"Playable demo\" src=\"iframe.html\" allow=\"autoplay; fullscreen\"></iframe></html>");
            File.Delete(output + "/luna.json");
            File.WriteAllText(output + "/build-info.txt", "Scene: " + scene + "\nSDK: Playworks 7.2.0\nBuilt UTC: " + DateTime.UtcNow.ToString("O") + "\n");
            Debug.Log("[Voodoo] Playable exported: " + Path.GetFullPath(output));
        }
        [Serializable] class ExportConfig { public ExportUnity unity; }
        [Serializable] class ExportUnity { public string[] scenes; }
        static void CopyDirectory(string source, string destination)
        {
            Directory.CreateDirectory(destination);
            foreach (var file in Directory.GetFiles(source)) File.Copy(file, Path.Combine(destination, Path.GetFileName(file)), true);
            foreach (var directory in Directory.GetDirectories(source)) CopyDirectory(directory, Path.Combine(destination, Path.GetFileName(directory)));
        }
        static async void Build(params string[] scenes)
        {
            if (busy || EditorApplication.isPlayingOrWillChangePlaymode) return;
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;
            busy = true;
            try
            {
                foreach (var scene in scenes)
                {
                    Prepare(scene);
                    await Task.Delay(500);
                    await Export(scene);
                }
                Debug.Log("[Voodoo] All requested playable exports completed.");
            }
            catch (Exception e) { Debug.LogException(e); }
            finally { busy = false; }
        }
        static void Prepare(string scene)
        {
            if (!File.Exists(scene)) throw new FileNotFoundException(scene);
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(scene, true) };
            EditorSceneManager.OpenScene(scene);
            EditorApplication.ExecuteMenuItem("Tools/Unity Playworks Plugin");
        }
        [MenuItem("Voodoo/Playable Builds/Jelly Flow")]
        public static void Jelly() => Build(JellySceneBuilder.JellyScene);
        [MenuItem("Voodoo/Playable Builds/Rescue Run")]
        public static void Runner() => Build(JellySceneBuilder.RunnerScene);
        [MenuItem("Voodoo/Playable Builds/Last Camp")]
        public static void Camp() => Build(JellySceneBuilder.SurvivorScene);
        [MenuItem("Voodoo/Playable Builds/Number Match")]
        public static void Numbers() => Build(JellySceneBuilder.NumberMatchScene);
        [MenuItem("Voodoo/Playable Builds/Build All Four %#F8")]
        public static void All() => Build(JellySceneBuilder.JellyScene, JellySceneBuilder.NumberMatchScene, JellySceneBuilder.RunnerScene, JellySceneBuilder.SurvivorScene);
    }
}
