namespace JellyAd
{
    /// <summary>Ad-network CTA and lifecycle bridge, supplied by Unity Playworks.</summary>
    public static class StoreLink
    {
        // Store destinations are configured in Playworks, rather than opened as arbitrary URLs.
        public static void Open(string url)
        {
            Luna.Unity.Playable.InstallFullGame();
        }

        public static void NotifyGameEnded()
        {
            Luna.Unity.LifeCycle.GameEnded();
        }
    }
}
