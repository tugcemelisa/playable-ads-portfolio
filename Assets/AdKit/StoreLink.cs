namespace AdKit
{
    /// <summary>Ad-network CTA and lifecycle bridge, supplied by Unity Playworks.</summary>
    public static class StoreLink
    {
        public static void Open(string url = "https://play.google.com/store/apps/details?id=com.vincentb.MobControl&gl=IN")
        {
            Luna.Unity.Analytics.LogEvent(Luna.Unity.Analytics.EventType.EndCardShown);
            Luna.Unity.Playable.InstallFullGame();
            if (!string.IsNullOrEmpty(url))
                UnityEngine.Application.OpenURL(url);
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
