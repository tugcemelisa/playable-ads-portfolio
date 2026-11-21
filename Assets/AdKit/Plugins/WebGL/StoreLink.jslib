mergeInto(LibraryManager.library, {
  JellyOpenStore: function (urlPtr) {
    var url = UTF8ToString(urlPtr);
    try { if (typeof mraid !== 'undefined' && mraid.open) { mraid.open(url); return; } } catch (e) {}
    try { if (typeof FbPlayableAd !== 'undefined') { FbPlayableAd.onCTAClick(); return; } } catch (e) {}
    window.open(url, '_blank');
  }
});
