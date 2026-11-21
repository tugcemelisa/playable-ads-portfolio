using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace JellyAd.EditorTools
{
    /// <summary>Creates the playable scenes. Voodoo menu contains only Mob Control as requested.</summary>
    [InitializeOnLoad]
    public static class JellySceneBuilder
    {
        public const string JellyScene = "Assets/Scenes/JellyPuzzle.unity";
        public const string RunnerScene = "Assets/Scenes/RescueRun.unity";
        public const string SurvivorScene = "Assets/Scenes/LastCamp.unity";
        public const string NumberMatchScene = "Assets/Scenes/NumberMatch.unity";
        public const string MobControlScene = "Assets/Scenes/MobControl.unity";

        public static void BuildMobControl()
        {
            CreateScene(MobControlScene, false, typeof(MobControlAd.MobControlGame));
            SetBuildScene(MobControlScene);
            EditorSceneManager.OpenScene(MobControlScene);
        }

        public static void BuildNumberMatch()
        {
            CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
            SetBuildScene(NumberMatchScene);
            EditorSceneManager.OpenScene(NumberMatchScene);
        }

        public static void BuildNumberMatchTestPlayer()
        {
            if (!System.IO.File.Exists(NumberMatchScene)) BuildNumberMatchBatch();
            var args = System.Environment.GetCommandLineArgs();
            string outPath = "Builds/NumberMatchTest/NumberMatch.exe";
            for (int i = 0; i < args.Length - 1; i++) if (args[i] == "-nmOut") outPath = args[i + 1];
            var report = UnityEditor.BuildPipeline.BuildPlayer(new[] { NumberMatchScene }, outPath,
                BuildTarget.StandaloneWindows64, BuildOptions.None);
            Debug.Log("[Voodoo] Test build: " + report.summary.result + " -> " + outPath);
        }

        public static void PlayNumberMatch()
        {
            if (!System.IO.File.Exists(NumberMatchScene)) BuildNumberMatchBatch();
            EditorSceneManager.OpenScene(NumberMatchScene);
            EditorApplication.isPlaying = true;
        }

        public static void BuildNumberMatchBatch()
        {
            CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
            SetBuildScene(NumberMatchScene);
        }

        public static void BuildSurvivor()
        {
            CreateScene(SurvivorScene, false, typeof(HordeCamp.SurvivorGame));
            SetBuildScene(SurvivorScene);
            EditorSceneManager.OpenScene(SurvivorScene);
        }

        static JellySceneBuilder()
        {
            EditorApplication.delayCall += () =>
            {
                if (EditorApplication.isPlayingOrWillChangePlaymode) return;
                if (!System.IO.File.Exists(MobControlScene)) CreateScene(MobControlScene, false, typeof(MobControlAd.MobControlGame));
                if (!System.IO.File.Exists(JellyScene)) CreateScene(JellyScene, true, typeof(JellyGame));
                if (!System.IO.File.Exists(RunnerScene)) CreateScene(RunnerScene, false, typeof(RescueRun.RunnerGame));
                if (!System.IO.File.Exists(SurvivorScene)) CreateScene(SurvivorScene, false, typeof(HordeCamp.SurvivorGame));
                if (!System.IO.File.Exists(NumberMatchScene)) CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
                if (EditorBuildSettings.scenes.Length == 0) SetBuildScene(MobControlScene);
            };
        }

        public static void BuildJelly()
        {
            CreateScene(JellyScene, true, typeof(JellyGame));
            SetBuildScene(JellyScene);
            EditorSceneManager.OpenScene(JellyScene);
        }

        public static void BuildRunner()
        {
            CreateScene(RunnerScene, false, typeof(RescueRun.RunnerGame));
            SetBuildScene(RunnerScene);
            EditorSceneManager.OpenScene(RunnerScene);
        }

        public static void Build() => BuildMobControl();

        static void CreateScene(string path, bool ortho, System.Type game)
        {
            System.IO.Directory.CreateDirectory("Assets/Scenes");

            bool replaceAll = false;
            for (int s = SceneManager.sceneCount - 1; s >= 0; s--)
            {
                var open = SceneManager.GetSceneAt(s);
                if (open.path != path) continue;
                if (open.isDirty) EditorSceneManager.SaveScene(open);
                if (SceneManager.sceneCount > 1) EditorSceneManager.CloseScene(open, true);
                else replaceAll = true;
            }

            var active = SceneManager.GetActiveScene();
            if (active.isDirty && !string.IsNullOrEmpty(active.path))
                EditorSceneManager.SaveScene(active);
            bool untitled = replaceAll || string.IsNullOrEmpty(active.path) || SceneManager.sceneCount == 1;
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, untitled ? NewSceneMode.Single : NewSceneMode.Additive);

            var camGo = new GameObject("Main Camera") { tag = "MainCamera" };
            var cam = camGo.AddComponent<Camera>();
            camGo.AddComponent<AudioListener>();
            cam.orthographic = ortho;
            cam.orthographicSize = 9.2f;
            cam.fieldOfView = 52f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = ortho ? new Color(0.16f, 0.18f, 0.42f) : new Color(0.32f, 0.66f, 0.96f);
            camGo.transform.position = new Vector3(0f, ortho ? 0f : 13.8f, ortho ? -10f : -5.6f);
            if (!ortho) camGo.transform.rotation = Quaternion.Euler(46f, 0f, 0f);
            SceneManager.MoveGameObjectToScene(camGo, scene);

            var g = new GameObject(game.Name);
            g.AddComponent(game);
            SceneManager.MoveGameObjectToScene(g, scene);

            if (!ortho)
            {
                var sun = new GameObject("Sun");
                var l = sun.AddComponent<Light>();
                l.type = LightType.Directional;
                l.intensity = 1.15f;
                l.shadows = LightShadows.Soft;
                sun.transform.rotation = Quaternion.Euler(55f, -30f, 0f);
                SceneManager.MoveGameObjectToScene(sun, scene);
            }

            EditorSceneManager.SaveScene(scene, path);
            if (SceneManager.sceneCount > 1) EditorSceneManager.CloseScene(scene, true);

            PlayerSettings.defaultInterfaceOrientation = UIOrientation.Portrait;
            PlayerSettings.defaultScreenWidth = 540;
            PlayerSettings.defaultScreenHeight = 960;
            PlayerSettings.fullScreenMode = FullScreenMode.Windowed;
            AssetDatabase.SaveAssets();
            Debug.Log("[Voodoo] Scene ready: " + path);
        }

        static void SetBuildScene(string path)
        {
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(path, true) };
        }
    }
}
