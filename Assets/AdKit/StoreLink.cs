namespace AdKit
{
    /// <summary>Ad-network CTA and lifecycle bridge, supplied by Unity Playworks.</summary>
    public static class StoreLink
    {
        public static void Open(string url = "https://apps.apple.com/us/app/mob-control/id1562817072")
        {
            Luna.Unity.Analytics.LogEvent(Luna.Unity.Analytics.EventType.EndCardShown);
            if (!string.IsNullOrEmpty(url))
                Luna.Unity.Playable.InstallFullGame(url, url);
            else
                Luna.Unity.Playable.InstallFullGame();
#if !UNITY_LUNA
            if (!string.IsNullOrEmpty(url))
                UnityEngine.Application.OpenURL(url);
#endif
            UnityEngine.Debug.Log("[Voodoo Playworks CTA] InstallFullGame() -> " + url);
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
