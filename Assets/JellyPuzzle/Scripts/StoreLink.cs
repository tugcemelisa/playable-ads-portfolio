namespace JellyAd
{
    /// <summary>Ad-network CTA and lifecycle bridge, supplied by Unity Playworks.</summary>
    public static class StoreLink
    {
        // Store destinations are configured in Playworks, rather than opened as arbitrary URLs.
        public static void Open(string url)
        {
            Luna.Unity.Analytics.LogEvent(Luna.Unity.Analytics.EventType.EndCardShown);
            Luna.Unity.Playable.InstallFullGame(url, url);
#if UNITY_EDITOR || !UNITY_WEBGL
            if (!string.IsNullOrEmpty(url)) UnityEngine.Application.OpenURL(url);
#endif
        }

        public static void NotifyGameEnded()
        {
            Luna.Unity.LifeCycle.GameEnded();
        }

        public static void GameEnded() => NotifyGameEnded();

        public static void LogEvent(string name, int value = 0)
        {
            Luna.Unity.Analytics.LogEvent(name, value);
        }
    }
}
