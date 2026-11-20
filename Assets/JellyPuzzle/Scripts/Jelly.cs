using UnityEngine;
using UnityEngine.Rendering;

namespace JellyAd
{
    public enum JState { Stack, Entering, Belt, Slot, Dead }

    /// <summary>One jelly unit: a colour + how many pixels it can still eat.</summary>
    public class Jelly : MonoBehaviour
    {
        public int colorIdx, count;
        public JState state;
        public float t, enterTimer;
        public Vector3 enterFrom, target;
        public float targetScale, curScale;
        public int lastSide = -1, lastLane = -1;
        public SpriteRenderer body;
        public Label label;
        public SortingGroup group;
        public Color baseColor;

        float squish, seed;

        void Awake() { seed = Random.value * 10f; }

        public void Kick() { squish = 1f; }

        public void SetCount(int c)
        {
            count = c;
            label.Text = c.ToString();
        }

        public void SetDim(bool dim)
        {
            body.color = dim ? Color.Lerp(baseColor, new Color(0.12f, 0.12f, 0.22f), 0.45f) : baseColor;
        }

        void Update()
        {
            float dt = Time.deltaTime;
            if (state == JState.Stack || state == JState.Slot)
                transform.position = Vector3.Lerp(transform.position, target, 1f - Mathf.Exp(-14f * dt));

            curScale = Mathf.Lerp(curScale, targetScale, 1f - Mathf.Exp(-12f * dt));
            squish = Mathf.MoveTowards(squish, 0f, dt * 3.5f);
            float w = Mathf.Sin(Time.time * 28f) * squish * 0.16f;
            if (state == JState.Belt) w += Mathf.Sin(Time.time * 10f + seed) * 0.04f;
            transform.localScale = new Vector3(curScale * (1f + w), curScale * (1f - w), 1f);
        }
    }
}
