using UnityEditor;
using UnityEngine;

namespace JellyAd.EditorTools
{
    // Runtime-created renderers need an exported material and shader variant.
    [InitializeOnLoad]
    static class PlayableSpriteMaterial
    {
        static PlayableSpriteMaterial() => EditorApplication.delayCall += EnsureNow;

        public static void EnsureNow()
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
            const string primMatPath = "Assets/Resources/PlayablePrimMat.mat";
            const string primitivesPath = "Assets/Resources/PlayablePrimitiveExport.prefab";
            var primShader = Shader.Find("Voodoo/PlayableLit");
            if (!primShader) primShader = Shader.Find("Unlit/Color");
            if (!primShader) primShader = Shader.Find("Sprites/Default");
            var primMat = AssetDatabase.LoadAssetAtPath<Material>(primMatPath);
            if (!primMat)
            {
                primMat = new Material(primShader) { color = Color.white };
                AssetDatabase.CreateAsset(primMat, primMatPath);
            }
            else if (primShader && primMat.shader != primShader)
            {
                primMat.shader = primShader;
                primMat.color = Color.white;
                EditorUtility.SetDirty(primMat);
                AssetDatabase.SaveAssets();
            }
            var existingPrims = AssetDatabase.LoadAssetAtPath<GameObject>(primitivesPath);
            if (!existingPrims || existingPrims.GetComponentInChildren<Renderer>()?.sharedMaterial != primMat)
            {
                var primitives = new GameObject("PlayablePrimitiveExport");
                foreach (PrimitiveType primitive in System.Enum.GetValues(typeof(PrimitiveType)))
                {
                    var child = GameObject.CreatePrimitive(primitive);
                    child.transform.SetParent(primitives.transform);
                    var r = child.GetComponent<Renderer>();
                    if (r && primMat) r.sharedMaterial = primMat;
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
