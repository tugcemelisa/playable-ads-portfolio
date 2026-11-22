using System.Linq;
using UnityEditor;
using UnityEngine;

namespace AdKit.EditorTools
{
    /// <summary>
    /// Strips unused animation clips (keeps ONLY Run), compresses meshes, disables blendshapes/tangents,
    /// and optimizes 2D textures to keep Unity Playworks RAM < 200 MB and performance Good/Excellent.
    /// </summary>
    public static class MobAssetOptimizer
    {
        [MenuItem("Playable Ads/Optimize Mob Control Assets (RAM & FPS)")]
        public static void OptimizeAll()
        {
            OptimizeMobFbx("Assets/MobControl/Resources/Models/PurpleMob.fbx", keepRunClip: true);
            OptimizeMobFbx("Assets/MobControl/Resources/Models/YellowMob.fbx", keepRunClip: true);
            OptimizeMobFbx("Assets/Resources/Models/Cannon.fbx", keepRunClip: false);

            OptimizeTexture("Assets/MobControl/Resources/AlpineBg.jpg", 512);
            OptimizeTexture("Assets/MobControl/Resources/MidnightBg.jpg", 512);
            OptimizeTexture("Assets/MobControl/Resources/MobControlLogo.png", 512);

            AssetDatabase.SaveAssets();
            Debug.Log("[MobAssetOptimizer] Optimized FBX clips/meshes & textures for Playworks RAM & FPS.");
        }

        static void OptimizeMobFbx(string path, bool keepRunClip)
        {
            var imp = AssetImporter.GetAtPath(path) as ModelImporter;
            if (imp == null) return;

            bool changed = false;

            if (imp.meshCompression != ModelImporterMeshCompression.Medium) { imp.meshCompression = ModelImporterMeshCompression.Medium; changed = true; }
            if (imp.importBlendShapes) { imp.importBlendShapes = false; changed = true; }
            if (imp.importCameras) { imp.importCameras = false; changed = true; }
            if (imp.importLights) { imp.importLights = false; changed = true; }
            if (imp.importTangents != ModelImporterTangents.None) { imp.importTangents = ModelImporterTangents.None; changed = true; }
            if (!imp.optimizeMeshPolygons) { imp.optimizeMeshPolygons = true; changed = true; }
            if (!imp.optimizeMeshVertices) { imp.optimizeMeshVertices = true; changed = true; }
            if (imp.isReadable) { imp.isReadable = false; changed = true; }

            if (keepRunClip)
            {
                if (imp.animationType != ModelImporterAnimationType.Legacy) { imp.animationType = ModelImporterAnimationType.Legacy; changed = true; }
                if (!imp.importAnimation) { imp.importAnimation = true; changed = true; }
                if (imp.animationCompression != ModelImporterAnimationCompression.Optimal) { imp.animationCompression = ModelImporterAnimationCompression.Optimal; changed = true; }

                // Keep ONLY the single Run clip (strips 14+ unused clips like Wave/Duck/Punch/Death -> massive RAM savings!)
                var existing = imp.clipAnimations;
                if (existing == null || existing.Length != 1 || !existing[0].name.ToLowerInvariant().Contains("run"))
                {
                    var defaults = imp.defaultClipAnimations;
                    if (defaults != null && defaults.Length > 0)
                    {
                        var runClip = defaults.FirstOrDefault(c => c.name.ToLowerInvariant().Contains("run"))
                                      ?? defaults.FirstOrDefault(c => c.name.ToLowerInvariant().Contains("walk"))
                                      ?? defaults[0];
                        runClip.loopTime = true;
                        runClip.wrapMode = WrapMode.Loop;
                        imp.clipAnimations = new[] { runClip };
                        changed = true;
                    }
                }
            }
            else
            {
                if (imp.importAnimation) { imp.importAnimation = false; changed = true; }
            }

            if (changed)
                imp.SaveAndReimport();
        }

        static void OptimizeTexture(string path, int maxSize)
        {
            var imp = AssetImporter.GetAtPath(path) as TextureImporter;
            if (imp == null) return;
            bool changed = false;
            if (imp.mipmapEnabled) { imp.mipmapEnabled = false; changed = true; }
            if (imp.maxTextureSize > maxSize) { imp.maxTextureSize = maxSize; changed = true; }
            if (imp.isReadable) { imp.isReadable = false; changed = true; }
            if (changed)
                imp.SaveAndReimport();
        }
    }
}
