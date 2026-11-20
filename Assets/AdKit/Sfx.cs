using System.Collections.Generic;
using UnityEngine;

namespace AdKit
{
    /// <summary>
    /// Procedural sound effects: every clip is synthesized in code at startup, so the playable
    /// ships with zero audio files (keeps the HTML small). Call e.g. Sfx.Play(Sfx.Id.Pop).
    /// To use a real recorded sound instead, assign a clip with Sfx.Override(id, clip).
    /// </summary>
    public static class Sfx
    {
        public enum Id { Tap, Jump, Pop, JellyPop, Land, Error, Win, Fail, GateGood, GateBad, Shot, Hit, Glass, Stomp, Click, Banner }

        public static float Volume = 0.8f;
        public static bool Muted;

        const int Rate = 44100;
        static readonly Dictionary<Id, AudioClip> clips = new Dictionary<Id, AudioClip>();
        static readonly Dictionary<Id, float> lastPlay = new Dictionary<Id, float>();
        static AudioSource[] sources;
        static int next;

        public static void Override(Id id, AudioClip clip) { if (clip) clips[id] = clip; }

        /// <param name="pitchJitter">random pitch spread, e.g. 0.1 = ±10%</param>
        /// <param name="minGap">seconds before the same sound may play again (avoids machine-gun spam)</param>
        public static void Play(Id id, float vol = 1f, float pitch = 1f, float pitchJitter = 0.06f, float minGap = 0.035f)
        {
            if (Muted) return;
            Init();
            float now = Time.unscaledTime;
            if (lastPlay.TryGetValue(id, out float t) && now - t < minGap) return;
            lastPlay[id] = now;
            if (!clips.TryGetValue(id, out var clip)) clips[id] = clip = Build(id);

            var s = sources[next];
            next = (next + 1) % sources.Length;
            s.pitch = pitch * (1f + Random.Range(-pitchJitter, pitchJitter));
            s.PlayOneShot(clip, vol * Volume);
        }

        static void Init()
        {
            if (sources != null && sources[0]) return;
            var go = new GameObject("[Sfx]");
            Object.DontDestroyOnLoad(go);
            sources = new AudioSource[8];
            for (int i = 0; i < sources.Length; i++)
            {
                sources[i] = go.AddComponent<AudioSource>();
                sources[i].playOnAwake = false;
                sources[i].spatialBlend = 0f;
            }
            if (!Object.FindAnyObjectByType<AudioListener>()) go.AddComponent<AudioListener>();
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
