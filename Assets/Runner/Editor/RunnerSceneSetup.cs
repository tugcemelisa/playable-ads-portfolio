using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using RunnerAd;

namespace RunnerAd.EditorTools
{
    public static class RunnerSceneSetup
    {
        const string RunnerScenePath = "Assets/Scenes/Runner.unity";

        [MenuItem("Playable Ads/Setup Clean Runner Scene", priority = 5)]
        public static void BuildCleanRunnerScene()
        {
            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            var camGo = new GameObject("Main Camera");
            camGo.tag = "MainCamera";
            var cam = camGo.AddComponent<Camera>();
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.28f, 0.66f, 0.96f);
            camGo.AddComponent<AudioListener>();

            var lightGo = new GameObject("Directional Light");
            var light = lightGo.AddComponent<Light>();
            light.type = LightType.Directional;
            light.shadows = LightShadows.None;
            light.intensity = 1.25f;
            lightGo.transform.rotation = Quaternion.Euler(46f, -26f, 0f);

            var gameGo = new GameObject("RunnerPlayableGame");
            gameGo.AddComponent<RunnerPlayableGame>();

            EditorSceneManager.SaveScene(scene, RunnerScenePath);
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(RunnerScenePath, true) };
            Debug.Log("[Playable Ads] Clean Playworks-ready Runner scene saved to " + RunnerScenePath);
        }
    }
}
