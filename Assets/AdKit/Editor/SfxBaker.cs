using System;
using System.IO;
using UnityEditor;
using UnityEngine;
using Id = AdKit.Sfx.Id;
namespace AdKit.EditorTools
{
    public static class SfxBaker
    {
        const int Rate = 44100;
        [InitializeOnLoadMethod]
        static void ScheduleBake() { EditorApplication.delayCall += BakeMissing; }
        [MenuItem("Voodoo/Bake Playable Audio")]
        public static void BakeMissing()
        {
            const string folder = "Assets/Resources/AdKitSfx";
            Directory.CreateDirectory(folder);
            bool changed = false;
            foreach (Id id in Enum.GetValues(typeof(Id)))
            {
                string path = folder + "/" + id + ".wav";
                if (File.Exists(path)) continue;
                AudioClip clip = Build(id);
                float[] data = new float[clip.samples * clip.channels];
                clip.GetData(data, 0);
                using (var writer = new BinaryWriter(File.Create(path)))
                {
                    writer.Write(System.Text.Encoding.ASCII.GetBytes("RIFF")); writer.Write(36 + data.Length * 2);
                    writer.Write(System.Text.Encoding.ASCII.GetBytes("WAVEfmt ")); writer.Write(16);
                    writer.Write((short)1); writer.Write((short)clip.channels); writer.Write(clip.frequency);
                    writer.Write(clip.frequency * clip.channels * 2); writer.Write((short)(clip.channels * 2)); writer.Write((short)16);
                    writer.Write(System.Text.Encoding.ASCII.GetBytes("data")); writer.Write(data.Length * 2);
                    foreach (float sample in data) writer.Write((short)(Mathf.Clamp(sample, -1f, 1f) * 32767f));
                }
                UnityEngine.Object.DestroyImmediate(clip);
                changed = true;
            }
            if (changed) { AssetDatabase.Refresh(); Debug.Log("[AdKit] Baked 16 playable audio clips."); }
        }
        // ------------------------------------------------------------------ synthesis
        delegate float Gen(float t, float u); // t = seconds, u = 0..1 progress

        static uint seed = 22222;
        static float Noise() { seed ^= seed << 13; seed ^= seed >> 17; seed ^= seed << 5; return (seed / (float)uint.MaxValue) * 2f - 1f; }
        static float Sin(float ph) => Mathf.Sin(ph * 2f * Mathf.PI);
        static float Env(float u, float attack, float curve) => (u < attack ? u / attack : Mathf.Pow(1f - (u - attack) / (1f - attack), curve));

        static AudioClip Make(string name, float dur, Gen g)
        {
            int n = Mathf.CeilToInt(dur * Rate);
            var d = new float[n];
            float peak = 0.0001f;
            for (int i = 0; i < n; i++) { d[i] = g(i / (float)Rate, i / (float)n); peak = Mathf.Max(peak, Mathf.Abs(d[i])); }
            float k = 0.9f / peak;
            for (int i = 0; i < n; i++) d[i] *= k;
            var c = AudioClip.Create("sfx_" + name, n, 1, Rate, false);
            c.SetData(d, 0);
            return c;
        }

        /// <summary>Sine sweep from f0 to f1 Hz with a quick attack and decaying tail.</summary>
        static AudioClip Sweep(string name, float dur, float f0, float f1, float attack = 0.02f, float curve = 2f, float harm = 0.25f)
        {
            float ph = 0f;
            return Make(name, dur, (t, u) =>
            {
                ph += Mathf.Lerp(f0, f1, u) / Rate;
                return (Sin(ph) + harm * Sin(ph * 2f)) * Env(u, attack, curve);
            });
        }

        /// <summary>Plays a little arpeggio of notes (Hz), each with a bell-ish tone.</summary>
        static AudioClip Notes(string name, float step, float tail, params float[] f)
        {
            float dur = step * (f.Length - 1) + tail;
            return Make(name, dur, (t, u) =>
            {
                float v = 0f;
                for (int i = 0; i < f.Length; i++)
                {
                    float lt = t - i * step;
                    if (lt < 0f) continue;
                    float e = Mathf.Exp(-lt * 6f) * Mathf.Min(1f, lt * 200f);
                    v += (Sin(f[i] * lt) + 0.3f * Sin(f[i] * 2f * lt) + 0.12f * Sin(f[i] * 3f * lt)) * e;
                }
                return v * Mathf.Min(1f, (1f - u) * 20f);
            });
        }

        static AudioClip Build(Id id)
        {
            switch (id)
            {
                case Id.Tap: return Sweep("tap", 0.07f, 900f, 600f, 0.01f, 3f);
                case Id.Click: return Sweep("click", 0.05f, 1400f, 1100f, 0.01f, 4f, 0f);
                case Id.Jump: return Sweep("jump", 0.22f, 260f, 820f, 0.03f, 1.5f);           // jelly hops onto the belt
                case Id.Pop: return Sweep("pop", 0.09f, 700f, 1500f, 0.01f, 2.5f, 0.1f);       // pixel eaten / shot fired
                case Id.Land: return Sweep("land", 0.14f, 320f, 140f, 0.01f, 2.5f, 0.4f);      // jelly lands in a slot
                case Id.JellyPop:                                                              // jelly finished: wet pop + sparkle
                    {
                        float ph = 0f;
                        return Make("jellypop", 0.3f, (t, u) =>
                        {
                            ph += Mathf.Lerp(500f, 1800f, Mathf.Sqrt(u)) / Rate;
                            float body = Sin(ph) * Env(u, 0.02f, 3f);
                            float sp = Sin(2600f * t) * Mathf.Exp(-t * 18f) * 0.35f;
                            return body + sp;
                        });
                    }
                case Id.Error:                                                                 // belt full / not allowed
                    return Make("error", 0.22f, (t, u) =>
                    {
                        float sq = Mathf.Sign(Sin(150f * t)) * 0.6f + Sin(150f * t) * 0.4f;
                        return sq * Env(u, 0.02f, 1.5f) * 0.6f;
                    });
                case Id.Win: return Notes("win", 0.09f, 0.6f, 523f, 659f, 784f, 1047f, 1319f);
                case Id.Fail: return Notes("fail", 0.16f, 0.7f, 392f, 330f, 277f, 220f);
                case Id.GateGood: return Notes("gategood", 0.05f, 0.25f, 660f, 880f, 1320f);
                case Id.GateBad: return Sweep("gatebad", 0.3f, 420f, 160f, 0.02f, 1.5f, 0.5f);
                case Id.Shot:                                                                  // soft blaster
                    {
                        float ph = 0f;
                        return Make("shot", 0.1f, (t, u) =>
                        {
                            ph += Mathf.Lerp(1600f, 400f, u) / Rate;
                            return (Sin(ph) * 0.7f + Noise() * 0.3f) * Env(u, 0.01f, 3f);
                        });
                    }
                case Id.Hit: return Make("hit", 0.08f, (t, u) => (Noise() * 0.7f + Sin(180f * t) * 0.5f) * Env(u, 0.01f, 3f));
                case Id.Glass:                                                                 // tank shatters
                    return Make("glass", 0.6f, (t, u) =>
                    {
                        float n = Noise() * Mathf.Exp(-t * 9f);
                        float ring = (Sin(2300f * t) + Sin(3170f * t) * 0.7f + Sin(4410f * t) * 0.5f) * Mathf.Exp(-t * 7f) * 0.5f;
                        return n * 0.8f + ring;
                    });
                case Id.Stomp:                                                                 // boss hit / heavy impact
                    {
                        float ph = 0f;
                        return Make("stomp", 0.35f, (t, u) =>
                        {
                            ph += Mathf.Lerp(110f, 40f, u) / Rate;
                            return Sin(ph) * Env(u, 0.01f, 2f) + Noise() * Mathf.Exp(-t * 30f) * 0.5f;
                        });
                    }
                case Id.Banner: return Make("banner", 0.35f, (t, u) => Noise() * Mathf.Sin(u * Mathf.PI) * 0.5f + Sin(Mathf.Lerp(300f, 900f, u) * t) * Mathf.Sin(u * Mathf.PI) * 0.3f);
            }
            return Sweep("default", 0.1f, 600f, 600f);
        }

    }
}
