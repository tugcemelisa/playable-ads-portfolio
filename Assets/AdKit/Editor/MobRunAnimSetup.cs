using System.Linq;
using UnityEditor;
using UnityEditor.Animations;
using UnityEngine;

namespace AdKit.Editor
{
    /// <summary>
    /// Automatically configures PurpleMob.fbx, YellowMob.fbx, and FastRun.fbx as Humanoid rigs
    /// and generates Resources/Models/MobRunController.controller playing Mixamo's Fast Run clip in a loop.
    /// </summary>
    [InitializeOnLoad]
    public static class MobRunAnimSetup
    {
        const string FastRunPath = "Assets/MobControl/Resources/Models/FastRun.fbx";
        const string PurplePath  = "Assets/MobControl/Resources/Models/PurpleMob.fbx";
        const string YellowPath  = "Assets/MobControl/Resources/Models/YellowMob.fbx";
        const string CtrlPath    = "Assets/MobControl/Resources/Models/MobRunController.controller";

        static MobRunAnimSetup()
        {
            EditorApplication.delayCall += EnsureSetup;
        }

        static void EnsureSetup()
        {
            if (!AssetDatabase.LoadAssetAtPath<Object>(FastRunPath)) return;
            if (AssetDatabase.LoadAssetAtPath<RuntimeAnimatorController>(CtrlPath) != null) return;
            SetupFastRun();
        }

        [MenuItem("Playable Ads/Setup FastRun Mixamo Animation")]
        public static void SetupFastRun()
        {
            // 1. Configure FastRun.fbx as Humanoid + Looping clip
            var fastImp = AssetImporter.GetAtPath(FastRunPath) as ModelImporter;
            if (fastImp == null)
            {
                Debug.LogWarning("[MobRunAnimSetup] FastRun.fbx not found at " + FastRunPath);
                return;
            }
            fastImp.animationType = ModelImporterAnimationType.Human;
            fastImp.avatarSetup = ModelImporterAvatarSetup.CreateFromThisModel;
            fastImp.importAnimation = true;
            var clips = fastImp.defaultClipAnimations;
            if (clips != null && clips.Length > 0)
            {
                for (int i = 0; i < clips.Length; i++)
                {
                    clips[i].loopTime = true;
                    clips[i].lockRootPositionXZ = true;
                    clips[i].lockRootHeightY = true;
                    clips[i].lockRootRotation = true;
                    clips[i].keepOriginalPositionXZ = true;
                    clips[i].keepOriginalPositionY = true;
                    clips[i].keepOriginalOrientation = true;
                }
                fastImp.clipAnimations = clips;
            }
            fastImp.SaveAndReimport();

            // 2. Configure PurpleMob.fbx & YellowMob.fbx as Humanoid (strip 30 unused clips to save Playworks RAM!)
            ConfigureMobHumanoid(PurplePath);
            ConfigureMobHumanoid(YellowPath);

            // 3. Create MobRunController.controller with Mixamo Fast Run clip
            var runClip = AssetDatabase.LoadAllAssetsAtPath(FastRunPath)
                .OfType<AnimationClip>()
                .FirstOrDefault(c => !c.name.StartsWith("__preview__"));
            if (runClip == null)
            {
                Debug.LogWarning("[MobRunAnimSetup] Could not find AnimationClip inside FastRun.fbx");
                return;
            }

            if (AssetDatabase.LoadAssetAtPath<RuntimeAnimatorController>(CtrlPath) != null)
                AssetDatabase.DeleteAsset(CtrlPath);

            var controller = AnimatorController.CreateAnimatorControllerAtPath(CtrlPath);
            var sm = controller.layers[0].stateMachine;
            var state = sm.AddState("FastRun");
            state.motion = runClip;
            sm.defaultState = state;
            EditorUtility.SetDirty(controller);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
            Debug.Log("[MobRunAnimSetup] Configured Humanoid FastRun retargeting -> " + CtrlPath);
        }

        static void ConfigureMobHumanoid(string path)
        {
            var imp = AssetImporter.GetAtPath(path) as ModelImporter;
            if (imp == null) return;
            imp.animationType = ModelImporterAnimationType.Human;
            imp.avatarSetup = ModelImporterAvatarSetup.CreateFromThisModel;
            imp.importAnimation = false; // Strip unused Quaternius clips -> much smaller Playworks build & RAM!
            imp.SaveAndReimport();
        }
    }
}
