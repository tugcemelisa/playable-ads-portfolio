using System.Collections;
using UnityEngine;

namespace AdKit
{
    /// <summary>Primitive-based 3D helpers: coloured shapes, chibi figures, particle bursts.</summary>
    public static class Prims
    {
        static readonly int ColorId = Shader.PropertyToID("_Color");

        public static GameObject Make(PrimitiveType t, Transform parent, Vector3 pos, Vector3 scale, Color c)
        {
            var g = GameObject.CreatePrimitive(t);
            Object.Destroy(g.GetComponent<Collider>());
            g.transform.SetParent(parent, false);
            g.transform.localPosition = pos;
            g.transform.localScale = scale;
            SetColor(g.GetComponent<Renderer>(), c);
            return g;
        }

        public static void SetColor(Renderer r, Color c)
        {
            var mpb = new MaterialPropertyBlock();
            r.GetPropertyBlock(mpb);
            mpb.SetColor(ColorId, c);
            r.SetPropertyBlock(mpb);
        }

        /// <summary>Chibi figure: body capsule (child 0), head, hair/helmet, held item. Pivot at feet.</summary>
        public static Transform Figure(Transform parent, Color body, Color hair, Color skin, Color item, float scale)
        {
            var root = new GameObject("Figure").transform;
            root.SetParent(parent, false);
            root.localScale = Vector3.one * scale;
            Make(PrimitiveType.Capsule, root, new Vector3(0f, 0.42f, 0f), new Vector3(0.46f, 0.42f, 0.4f), body);
            Make(PrimitiveType.Sphere, root, new Vector3(0f, 0.98f, 0f), Vector3.one * 0.42f, skin);
            Make(PrimitiveType.Sphere, root, new Vector3(0f, 1.1f, -0.04f), new Vector3(0.48f, 0.3f, 0.48f), hair);
            Make(PrimitiveType.Cube, root, new Vector3(0.24f, 0.55f, 0.2f), new Vector3(0.09f, 0.5f, 0.09f), item);
            return root;
        }

        public static void Burst(MonoBehaviour host, Transform parent, Vector3 pos, Color c, int n, float speed = 4f)
            => host.StartCoroutine(BurstRoutine(parent, pos, c, n, speed));

        static IEnumerator BurstRoutine(Transform parent, Vector3 pos, Color c, int n, float speed)
        {
            var parts = new Transform[n];
            var vel = new Vector3[n];
            for (int i = 0; i < n; i++)
            {
                parts[i] = Make(PrimitiveType.Cube, parent, pos, Vector3.one * Random.Range(0.08f, 0.2f), c).transform;
                vel[i] = new Vector3(Random.Range(-1f, 1f), Random.Range(0.6f, 1.6f), Random.Range(-1f, 1f)) * speed;
            }
            for (float t = 0f; t < 0.6f; t += Time.deltaTime)
            {
                float dt = Time.deltaTime;
                for (int i = 0; i < n; i++)
                {
                    vel[i].y -= 14f * dt;
                    parts[i].position += vel[i] * dt;
                    parts[i].Rotate(400f * dt, 300f * dt, 0f);
                    parts[i].localScale *= 1f - dt * 1.5f;
                }
                yield return null;
            }
            foreach (var p in parts) Object.Destroy(p.gameObject);
        }
    }
}
