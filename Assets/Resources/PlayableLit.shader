Shader "Voodoo/PlayableLit"
{
    Properties
    {
        _Color ("Color", Color) = (1,1,1,1)
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry" }
        LOD 100

        Pass
        {
            Blend SrcAlpha OneMinusSrcAlpha
            ZWrite On
            Cull Back

            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float3 normal : NORMAL;
            };

            struct v2f
            {
                float4 pos : SV_POSITION;
                half3 shade : TEXCOORD0;
            };

            fixed4 _Color;

            v2f vert(appdata v)
            {
                v2f o;
                o.pos = UnityObjectToClipPos(v.vertex);
                float3 wn = UnityObjectToWorldNormal(v.normal);
                float3 lightDir = normalize(float3(0.38, 0.82, -0.42));
                half ndotl = saturate(dot(wn, lightDir));
                half hemi = saturate(wn.y * 0.5 + 0.5);
                half3 ambient = lerp(half3(0.38, 0.40, 0.48), half3(0.62, 0.65, 0.72), hemi);
                o.shade = ambient + ndotl * half3(0.56, 0.54, 0.50);
                return o;
            }

            fixed4 frag(v2f i) : SV_Target
            {
                return fixed4(_Color.rgb * i.shade, _Color.a);
            }
            ENDCG
        }
    }
    FallBack "Unlit/Color"
}
