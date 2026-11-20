using UnityEngine;
#if UNITY_WEBGL && !UNITY_EDITOR
using System.Runtime.InteropServices;
#endif

namespace JellyAd
{
    /// <summary>CTA: uses mraid.open / FbPlayableAd when the ad network provides it, else opens the URL.</summary>
    public static class StoreLink
    {
#if UNITY_WEBGL && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void JellyOpenStore(string url);
#endif

        public static void Open(string url)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            JellyOpenStore(url);
#else
            Debug.Log("[CTA] Store link: " + url);
            Application.OpenURL(url);
#endif
        }
    }
}
