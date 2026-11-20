using UnityEditor;
using UnityEngine;

namespace JellyAd.EditorTools
{
    // Runtime-created renderers need an exported material and shader variant.
    [InitializeOnLoad]
    static class PlayableSpriteMaterial
    {
        static PlayableSpriteMaterial() => EditorApplication.delayCall += EnsureMaterial;

        static void EnsureMaterial()
        {
            const string fontPath = "Assets/Resources/Fonts/Inter-SemiBold.ttf";
            var fontImporter = AssetImporter.GetAtPath(fontPath) as TrueTypeFontImporter;
            if (fontImporter && fontImporter.fontTextureCase != FontTextureCase.Dynamic)
            {
                fontImporter.fontTextureCase = FontTextureCase.Dynamic;
                fontImporter.fontSize = 64;
                fontImporter.SaveAndReimport();
            }
            const string path = "Assets/Resources/JellySprite.mat";
            const string primitivesPath = "Assets/Resources/PlayablePrimitiveExport.prefab";
            if (!AssetDatabase.LoadAssetAtPath<GameObject>(primitivesPath))
            {
                var primitives = new GameObject("PlayablePrimitiveExport");
                foreach (PrimitiveType primitive in System.Enum.GetValues(typeof(PrimitiveType)))
                {
                    var child = GameObject.CreatePrimitive(primitive);
                    child.transform.SetParent(primitives.transform);
                }
                PrefabUtility.SaveAsPrefabAsset(primitives, primitivesPath);
                Object.DestroyImmediate(primitives);
            }
            var font = AssetDatabase.LoadAssetAtPath<Font>(fontPath);
            const string seedPath = "Assets/Resources/JellyFontExportV2.prefab";
            if (font && !AssetDatabase.LoadAssetAtPath<GameObject>(seedPath))
            {
                var seed = new GameObject("JellyFontExport", typeof(RectTransform));
                var text = seed.AddComponent<UnityEngine.UI.Text>();
                text.font = font;
                text.fontSize = 64;
                text.text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 /%!?.,:+-";
                var meshSeed = new GameObject("WorldText");
                meshSeed.transform.SetParent(seed.transform);
                var meshText = meshSeed.AddComponent<TextMesh>();
                meshText.font = font;
                meshText.fontSize = 64;
                meshText.text = text.text;
                meshSeed.GetComponent<MeshRenderer>().sharedMaterial = font.material;
                PrefabUtility.SaveAsPrefabAsset(seed, seedPath);
                Object.DestroyImmediate(seed);
            }
            if (font && !AssetDatabase.LoadAssetAtPath<Material>("Assets/Resources/JellyFont.mat"))
            {
                var fontMaterial = new Material(Shader.Find("Sprites/Default"));
                fontMaterial.mainTexture = font.material.mainTexture;
                AssetDatabase.CreateAsset(fontMaterial, "Assets/Resources/JellyFont.mat");
            }
            if (AssetDatabase.LoadAssetAtPath<Material>(path)) return;
            var material = new Material(Shader.Find("Sprites/Default"));
            AssetDatabase.CreateAsset(material, path);
            AssetDatabase.SaveAssets();
        }
    }
}
