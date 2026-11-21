using System.Collections.Generic;
using UnityEngine;

namespace AdKit
{
    /// <summary>
    /// Sound effects loaded from Editor-baked Resources clips for Playworks compatibility.
    /// Regenerate missing clips with Voodoo/Bake Playable Audio. Call e.g. Sfx.Play(Sfx.Id.Pop).
    /// To use a real recorded sound instead, assign a clip with Sfx.Override(id, clip).
    /// </summary>
    public static class Sfx
    {
        public enum Id { Tap, Jump, Pop, JellyPop, Land, Error, Win, Fail, GateGood, GateBad, Shot, Hit, Glass, Stomp, Click, Banner }

        public static float Volume = 0.95f;
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
            if (!clips.TryGetValue(id, out var clip)) clips[id] = clip = Resources.Load<AudioClip>("AdKitSfx/" + id);

            if (!clip) return;
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
#if !UNITY_LUNA
            var mainCam = Camera.main;
            if (mainCam && !mainCam.GetComponent<AudioListener>()) mainCam.gameObject.AddComponent<AudioListener>();
            else if (!mainCam) go.AddComponent<AudioListener>();
#endif
            sources = new AudioSource[8];
            for (int i = 0; i < sources.Length; i++)
            {
                sources[i] = go.AddComponent<AudioSource>();
                sources[i].playOnAwake = false;
                sources[i].spatialBlend = 0f;
            }
        }

    }
}
