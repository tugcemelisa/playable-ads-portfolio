# Jelly Puzzle – Playable + Video Ad

Sahne: `Assets/Scenes/JellyPuzzle.unity` (yeniden kurmak için menü: **Voodoo > Build Jelly Puzzle Scene**)
Game view çözünürlüğü: **1080x1920 (Portrait)** ekle ve seç.

## Oynanış
- Alttaki jöleye dokun → konveyöre çıkar, resmin etrafında döner.
- Geçtiği her satır/sütunda, dışarıdan görünen ilk piksel kendi rengindeyse onu yer (sayı azalır).
- Sayısı biterse patlar. Tur bitince sayısı kalmışsa slota park eder (slottakine dokununca tekrar gönderilir).
- Slotlar doluyken bir jöle daha park etmek zorunda kalırsa → **OUT OF SPACE** (fail) → endcard.
- Tüm pikseller bitince → **AMAZING!** → resim tamamlanır → endcard.

## Inspector (JellyGame objesi)
| Alan | Ne işe yarar |
|---|---|
| Source Image | Kendi görselin (Read/Write açık olmalı). Intro'da tam ekran gösterilir, sonra piksele dönüşür. |
| Grid Size | Piksel çözünürlüğü (16 önerilir). |
| Columns / Slot Count / Belt Capacity | Zorluk ayarı. |
| Store Url / Cta Text / Game Title | Endcard ve CTA. |
| Endcard After Seconds | Ağların istediği süre sınırı. |
| **Auto Play** | Oyun kendini oynar, el görünür → video kaydı için. |
| **Auto Play Fail Ending** | %85'ten sonra el yanlış hamle yapar → "so close" fail sonu. |

## Video kaydı (Unity Recorder)
1. Auto Play = açık.
2. Window > General > Recorder > Recorder Window → Add Recorder → Movie.
3. Output Resolution: Custom 1080x1920, Frame Rate 30 (Constant), Format MP4.
4. Start Recording → Play. Bitince After Effects'te hook yazısı / müzik / ses efektleri.

Farklı videolar için `Random Seed` değiştir (jöle dizilimi değişir), ya da Fail Ending'i kapat (win sonu).

## Playable build
File > Build Profiles > Web → Switch Platform → Build.
Ağlara (AppLovin, Unity Ads, IronSource, Mintegral) göndermek için tek HTML ve < 5 MB gerekir:
Unity Luna Playworks ile export edilmesi önerilir. CTA kodu `mraid.open` / `FbPlayableAd` destekler.

## Özel el görseli
`Assets/JellyPuzzle/Resources/hand.png` (Sprite) eklersen prosedürel elin yerine o kullanılır.
