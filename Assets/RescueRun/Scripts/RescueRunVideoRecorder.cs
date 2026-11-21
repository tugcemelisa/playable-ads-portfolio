using System.Collections;
using System.IO;
using UnityEngine;

namespace RescueRun
{
    /// <summary>
    /// Records 1080x1920 (9:16 vertical) frames of Rescue Run in autoPlay mode for Creative Video production.
    /// Trigger via Voodoo/Record Rescue Run Creative Video (1080x1920).
    /// </summary>
    public class RescueRunVideoRecorder : MonoBehaviour
    {
        public string outputDir = "Builds/Videos/RescueRun_Frames";
        public int fps = 30;
        public int durationSeconds = 26;

#if UNITY_EDITOR
        int _frame;

        IEnumerator Start()
        {
            var game = FindFirstObjectByType<RunnerGame>();
            if (game) game.autoPlay = true;

            Screen.SetResolution(540, 960, FullScreenMode.Windowed);
            Application.targetFrameRate = fps;
            Time.captureDeltaTime = 1f / fps;
            Directory.CreateDirectory(outputDir);

            int totalFrames = fps * durationSeconds;
            while (_frame < totalFrames)
            {
                yield return new WaitForEndOfFrame();
                ScreenCapture.CaptureScreenshot(Path.Combine(outputDir, "frame_" + _frame.ToString("0000") + ".png"), 2);
                _frame++;
            }

            Time.captureDeltaTime = 0f;
            Debug.Log("[Voodoo] Rescue Run 9:16 creative frames saved to: " + Path.GetFullPath(outputDir));
            UnityEditor.EditorApplication.isPlaying = false;
        }
#endif
    }
}
