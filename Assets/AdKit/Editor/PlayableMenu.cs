using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;

namespace AdKit.EditorTools
{
    /// <summary>Top menu bar shortcuts for opening and exporting Mob Control, Number Match, and Runner playable ads.</summary>
    public static class PlayableMenu
    {
        const string MobControlScene = "Assets/Scenes/MobControl.unity";
        const string NumberMatchScene = "Assets/Scenes/NumberMatch.unity";
        const string RunnerScene = "Assets/Scenes/Runner.unity";

        const BindingFlags PublicInstance = BindingFlags.Public | BindingFlags.Instance;
        static bool _busy;

        [MenuItem("Playable Ads/Open Scene/Mob Control", priority = 1)]
        public static void OpenMobControl() => OpenScene(MobControlScene);

        [MenuItem("Playable Ads/Open Scene/Number Match", priority = 2)]
        public static void OpenNumberMatch() => OpenScene(NumberMatchScene);

        [MenuItem("Playable Ads/Open Scene/Runner", priority = 3)]
        public static void OpenRunner() => OpenScene(RunnerScene);

        [MenuItem("Playable Ads/Export Playworks/Mob Control", priority = 20)]
        public static void ExportMobControl() => Build(MobControlScene, "mob-control");

        [MenuItem("Playable Ads/Export Playworks/Number Match", priority = 21)]
        public static void ExportNumberMatch() => Build(NumberMatchScene, "number-match");

        [MenuItem("Playable Ads/Export Playworks/Runner", priority = 22)]
        public static void ExportRunner() => Build(RunnerScene, "runner");

        [MenuItem("Playable Ads/Export Playworks/Export All (Mob Control + Number Match + Runner)", priority = 40)]
        public static void ExportAll() => BuildMultiple(
            (MobControlScene, "mob-control"),
            (NumberMatchScene, "number-match"),
            (RunnerScene, "runner")
        );

        static void OpenScene(string scenePath)
        {
            if (!File.Exists(scenePath))
            {
                Debug.LogError("[Playable Ads] Scene not found: " + scenePath);
                return;
            }
            if (EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo())
            {
                EditorSceneManager.OpenScene(scenePath);
                EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(scenePath, true) };
            }
        }

        static async void Build(string scene, string docsSlug) => await RunExports(new[] { (scene, docsSlug) });

        static async void BuildMultiple(params (string scene, string docsSlug)[] targets) => await RunExports(targets);

        static async Task RunExports((string scene, string docsSlug)[] targets)
        {
            if (_busy || EditorApplication.isPlayingOrWillChangePlaymode) return;
            EditorSceneManager.SaveOpenScenes();
            _busy = true;
            try
            {
                foreach (var (scene, slug) in targets)
                {
                    if (!File.Exists(scene))
                    {
                        Debug.LogError("[Playable Ads] Scene not found: " + scene);
                        continue;
                    }
                    EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(scene, true) };
                    EditorSceneManager.OpenScene(scene);
                    EditorApplication.ExecuteMenuItem("Tools/Unity Playworks Plugin");
                    await Task.Delay(500);
                    await ExportPlayworks(scene, slug);
                }
                Debug.Log("[Playable Ads] Requested Playworks exports completed.");
            }
            catch (Exception e)
            {
                Debug.LogException(e);
            }
            finally
            {
                _busy = false;
            }
        }

        static async Task ExportPlayworks(string scene, string docsSlug)
        {
            var assembly = AppDomain.CurrentDomain.GetAssemblies().FirstOrDefault(a => a.GetName().Name == "EditorScripts");
            if (assembly == null) throw new InvalidOperationException("Install Unity Playworks 7.2.0 first.");
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
            if (!success && !File.Exists("LunaTemp/stage4/develop/iframe.html"))
                throw new InvalidOperationException("Playworks export failed for " + scene + ". See LunaTemp/luna.log.");

            string name = Path.GetFileNameWithoutExtension(scene);
            string output = "Builds/Playables/" + name;
            CopyDirectory("LunaTemp/stage4/develop", output);
            var htmlPath = output + "/iframe.html";
            File.WriteAllText(htmlPath, File.ReadAllText(htmlPath).Replace("window.DEVELOP=!0", "window.DEVELOP=!1"));
            File.WriteAllText(output + "/index.html",
                "<!doctype html><html lang=\"en\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>" +
                name + " — Playable Demo</title><style>html,body{margin:0;height:100%;background:#101427}body{display:grid;place-items:center}iframe{border:0;width:min(100vw,56.25vh);height:100dvh}</style><iframe title=\"Playable demo\" src=\"iframe.html\" allow=\"autoplay; fullscreen\"></iframe></html>");
            if (File.Exists(output + "/luna.json")) File.Delete(output + "/luna.json");
            File.WriteAllText(output + "/build-info.txt", "Scene: " + scene + "\nSDK: Playworks 7.2.0\nBuilt UTC: " + DateTime.UtcNow.ToString("O") + "\n");

            if (!string.IsNullOrEmpty(docsSlug))
                CopyDirectory(output, "docs/" + docsSlug);

            Debug.Log("[Playable Ads] Exported " + name + " -> " + Path.GetFullPath(output) + " (and docs/" + docsSlug + ")");
        }

        static void CopyDirectory(string source, string destination)
        {
            Directory.CreateDirectory(destination);
            foreach (var file in Directory.GetFiles(source))
                File.Copy(file, Path.Combine(destination, Path.GetFileName(file)), true);
            foreach (var directory in Directory.GetDirectories(source))
                CopyDirectory(directory, Path.Combine(destination, Path.GetFileName(directory)));
        }
    }
}
