using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace JellyAd.EditorTools
{
    /// <summary>Creates the playable scenes. Missing scenes are created automatically after compile.</summary>
    [InitializeOnLoad]
    public static class JellySceneBuilder
    {
        public const string JellyScene = "Assets/Scenes/JellyPuzzle.unity";
        public const string RunnerScene = "Assets/Scenes/RescueRun.unity";
        public const string SurvivorScene = "Assets/Scenes/LastCamp.unity";
        public const string NumberMatchScene = "Assets/Scenes/NumberMatch.unity";

        [MenuItem("Voodoo/Build Number Match Scene")]
        public static void BuildNumberMatch()
        {
            CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
            SetBuildScene(NumberMatchScene);
            EditorSceneManager.OpenScene(NumberMatchScene);
        }

        // batch-mode entry: desktop test build of the Number Match scene (output path after -nmOut)
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

        // command-line entry (no -batchmode): opens the scene and presses Play
        public static void PlayNumberMatch()
        {
            if (!System.IO.File.Exists(NumberMatchScene)) BuildNumberMatchBatch();
            EditorSceneManager.OpenScene(NumberMatchScene);
            EditorApplication.isPlaying = true;
        }

        // batch-mode entry: Unity -batchmode -executeMethod JellyAd.EditorTools.JellySceneBuilder.BuildNumberMatchBatch
        public static void BuildNumberMatchBatch()
        {
            CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
            SetBuildScene(NumberMatchScene);
        }

        [MenuItem("Voodoo/Build Last Camp Scene")]
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
                if (!System.IO.File.Exists(JellyScene)) CreateScene(JellyScene, true, typeof(JellyGame));
                if (!System.IO.File.Exists(RunnerScene)) CreateScene(RunnerScene, false, typeof(RescueRun.RunnerGame));
                if (!System.IO.File.Exists(SurvivorScene)) CreateScene(SurvivorScene, false, typeof(HordeCamp.SurvivorGame));
                if (!System.IO.File.Exists(NumberMatchScene)) CreateScene(NumberMatchScene, true, typeof(NumberMatchAd.NumberMatchGame));
                if (EditorBuildSettings.scenes.Length == 0) SetBuildScene(JellyScene);
            };
        }

        [MenuItem("Voodoo/Build Jelly Puzzle Scene")]
        public static void BuildJelly()
        {
            CreateScene(JellyScene, true, typeof(JellyGame));
            SetBuildScene(JellyScene);
            EditorSceneManager.OpenScene(JellyScene);
        }

        [MenuItem("Voodoo/Build Rescue Run Scene")]
        public static void BuildRunner()
        {
            CreateScene(RunnerScene, false, typeof(RescueRun.RunnerGame));
            SetBuildScene(RunnerScene);
            EditorSceneManager.OpenScene(RunnerScene);
        }

        // kept for the earlier batch-mode command line
        public static void Build() => BuildJelly();

        static void CreateScene(string path, bool ortho, System.Type game)
        {
            System.IO.Directory.CreateDirectory("Assets/Scenes");
            // Unity can't add a scene next to an untitled one, so replace it in that case (only if it has no unsaved work).
            var active = SceneManager.GetActiveScene();
            bool untitled = string.IsNullOrEmpty(active.path);
            if (untitled && active.isDirty)
            {
                Debug.LogWarning("[Voodoo] Save or discard the open untitled scene, then use the Voodoo menu to build " + path);
                return;
            }
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, untitled ? NewSceneMode.Single : NewSceneMode.Additive);

            var camGo = new GameObject("Main Camera") { tag = "MainCamera" };
            var cam = camGo.AddComponent<Camera>();
            cam.orthographic = ortho;
            cam.orthographicSize = 9.2f;
            cam.fieldOfView = 60f;
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = ortho ? new Color(0.16f, 0.18f, 0.42f) : new Color(0.62f, 0.78f, 0.95f);
            camGo.transform.position = new Vector3(0f, ortho ? 0f : 12f, -10f);
            SceneManager.MoveGameObjectToScene(camGo, scene);

            var g = new GameObject(game.Name);
            g.AddComponent(game);
            SceneManager.MoveGameObjectToScene(g, scene);

            if (!ortho)
            {
                var sun = new GameObject("Sun");
                var l = sun.AddComponent<Light>();
                l.type = LightType.Directional;
                l.intensity = 1.1f;
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

        /// <summary>A playable ships one scene: the build list holds only the chosen one.</summary>
        static void SetBuildScene(string path)
        {
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(path, true) };
        }
    }
}
