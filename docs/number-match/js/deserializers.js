var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i824 = root || request.c( 'UnityEngine.JointSpring' )
  var i825 = data
  i824.spring = i825[0]
  i824.damper = i825[1]
  i824.targetPosition = i825[2]
  return i824
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i826 = root || request.c( 'UnityEngine.JointMotor' )
  var i827 = data
  i826.m_TargetVelocity = i827[0]
  i826.m_Force = i827[1]
  i826.m_FreeSpin = i827[2]
  return i826
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i828 = root || request.c( 'UnityEngine.JointLimits' )
  var i829 = data
  i828.m_Min = i829[0]
  i828.m_Max = i829[1]
  i828.m_Bounciness = i829[2]
  i828.m_BounceMinVelocity = i829[3]
  i828.m_ContactDistance = i829[4]
  i828.minBounce = i829[5]
  i828.maxBounce = i829[6]
  return i828
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i830 = root || request.c( 'UnityEngine.JointDrive' )
  var i831 = data
  i830.m_PositionSpring = i831[0]
  i830.m_PositionDamper = i831[1]
  i830.m_MaximumForce = i831[2]
  i830.m_UseAcceleration = i831[3]
  return i830
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i832 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i833 = data
  i832.m_Spring = i833[0]
  i832.m_Damper = i833[1]
  return i832
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i834 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i835 = data
  i834.m_Limit = i835[0]
  i834.m_Bounciness = i835[1]
  i834.m_ContactDistance = i835[2]
  return i834
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i836 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i837 = data
  i836.m_ExtremumSlip = i837[0]
  i836.m_ExtremumValue = i837[1]
  i836.m_AsymptoteSlip = i837[2]
  i836.m_AsymptoteValue = i837[3]
  i836.m_Stiffness = i837[4]
  return i836
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i838 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i839 = data
  i838.m_LowerAngle = i839[0]
  i838.m_UpperAngle = i839[1]
  return i838
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i841 = data
  i840.m_MotorSpeed = i841[0]
  i840.m_MaximumMotorTorque = i841[1]
  return i840
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i842 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i843 = data
  i842.m_DampingRatio = i843[0]
  i842.m_Frequency = i843[1]
  i842.m_Angle = i843[2]
  return i842
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i844 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i845 = data
  i844.m_LowerTranslation = i845[0]
  i844.m_UpperTranslation = i845[1]
  return i844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i846 = root || new pc.UnityMaterial()
  var i847 = data
  i846.name = i847[0]
  request.r(i847[1], i847[2], 0, i846, 'shader')
  i846.renderQueue = i847[3]
  i846.enableInstancing = !!i847[4]
  var i849 = i847[5]
  var i848 = []
  for(var i = 0; i < i849.length; i += 1) {
    i848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i849[i + 0]) );
  }
  i846.floatParameters = i848
  var i851 = i847[6]
  var i850 = []
  for(var i = 0; i < i851.length; i += 1) {
    i850.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i851[i + 0]) );
  }
  i846.colorParameters = i850
  var i853 = i847[7]
  var i852 = []
  for(var i = 0; i < i853.length; i += 1) {
    i852.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i853[i + 0]) );
  }
  i846.vectorParameters = i852
  var i855 = i847[8]
  var i854 = []
  for(var i = 0; i < i855.length; i += 1) {
    i854.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i855[i + 0]) );
  }
  i846.textureParameters = i854
  var i857 = i847[9]
  var i856 = []
  for(var i = 0; i < i857.length; i += 1) {
    i856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i857[i + 0]) );
  }
  i846.materialFlags = i856
  return i846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i861 = data
  i860.name = i861[0]
  i860.value = i861[1]
  return i860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i865 = data
  i864.name = i865[0]
  i864.value = new pc.Color(i865[1], i865[2], i865[3], i865[4])
  return i864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i868 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i869 = data
  i868.name = i869[0]
  i868.value = new pc.Vec4( i869[1], i869[2], i869[3], i869[4] )
  return i868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i873 = data
  i872.name = i873[0]
  request.r(i873[1], i873[2], 0, i872, 'value')
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i877 = data
  i876.name = i877[0]
  i876.enabled = !!i877[1]
  return i876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i879 = data
  i878.name = i879[0]
  i878.width = i879[1]
  i878.height = i879[2]
  i878.mipmapCount = i879[3]
  i878.anisoLevel = i879[4]
  i878.filterMode = i879[5]
  i878.hdr = !!i879[6]
  i878.format = i879[7]
  i878.wrapMode = i879[8]
  i878.alphaIsTransparency = !!i879[9]
  i878.alphaSource = i879[10]
  i878.graphicsFormat = i879[11]
  i878.sRGBTexture = !!i879[12]
  i878.desiredColorSpace = i879[13]
  i878.wrapU = i879[14]
  i878.wrapV = i879[15]
  return i878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i881 = data
  i880.name = i881[0]
  i880.atlasId = i881[1]
  i880.mipmapCount = i881[2]
  i880.hdr = !!i881[3]
  i880.size = i881[4]
  i880.anisoLevel = i881[5]
  i880.filterMode = i881[6]
  var i883 = i881[7]
  var i882 = []
  for(var i = 0; i < i883.length; i += 4) {
    i882.push( UnityEngine.Rect.MinMaxRect(i883[i + 0], i883[i + 1], i883[i + 2], i883[i + 3]) );
  }
  i880.rects = i882
  i880.wrapU = i881[8]
  i880.wrapV = i881[9]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i886 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i887 = data
  i886.name = i887[0]
  i886.index = i887[1]
  i886.startup = !!i887[2]
  return i886
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i889 = data
  i888.aspect = i889[0]
  i888.orthographic = !!i889[1]
  i888.orthographicSize = i889[2]
  i888.backgroundColor = new pc.Color(i889[3], i889[4], i889[5], i889[6])
  i888.nearClipPlane = i889[7]
  i888.farClipPlane = i889[8]
  i888.fieldOfView = i889[9]
  i888.depth = i889[10]
  i888.clearFlags = i889[11]
  i888.cullingMask = i889[12]
  i888.rect = i889[13]
  request.r(i889[14], i889[15], 0, i888, 'targetTexture')
  i888.usePhysicalProperties = !!i889[16]
  i888.focalLength = i889[17]
  i888.sensorSize = new pc.Vec2( i889[18], i889[19] )
  i888.lensShift = new pc.Vec2( i889[20], i889[21] )
  i888.gateFit = i889[22]
  i888.commandBufferCount = i889[23]
  i888.cameraType = i889[24]
  i888.enabled = !!i889[25]
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i891 = data
  i890.name = i891[0]
  i890.tagId = i891[1]
  i890.enabled = !!i891[2]
  i890.isStatic = !!i891[3]
  i890.layer = i891[4]
  return i890
}

Deserializers["NumberMatchAd.NumberMatchGame"] = function (request, data, root) {
  var i892 = root || request.c( 'NumberMatchAd.NumberMatchGame' )
  var i893 = data
  request.r(i893[0], i893[1], 0, i892, 'sourceImage')
  i892.gridSize = i893[2]
  i892.colorTolerance = i893[3]
  i892.missingPerGroup = i893[4]
  i892.gameTitle = i893[5]
  i892.introBanner = i893[6]
  i892.endcardTitle = i893[7]
  i892.ctaText = i893[8]
  i892.storeUrl = i893[9]
  i892.endcardAfterSeconds = i893[10]
  i892.showTutorial = !!i893[11]
  i892.autoPlay = !!i893[12]
  i892.autoMoveInterval = i893[13]
  i892.autoPlayOneMistake = !!i893[14]
  i892.randomSeed = i893[15]
  return i892
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i895 = data
  i894.ambientIntensity = i895[0]
  i894.reflectionIntensity = i895[1]
  i894.ambientMode = i895[2]
  i894.ambientLight = new pc.Color(i895[3], i895[4], i895[5], i895[6])
  i894.ambientSkyColor = new pc.Color(i895[7], i895[8], i895[9], i895[10])
  i894.ambientGroundColor = new pc.Color(i895[11], i895[12], i895[13], i895[14])
  i894.ambientEquatorColor = new pc.Color(i895[15], i895[16], i895[17], i895[18])
  i894.fogColor = new pc.Color(i895[19], i895[20], i895[21], i895[22])
  i894.fogEndDistance = i895[23]
  i894.fogStartDistance = i895[24]
  i894.fogDensity = i895[25]
  i894.fog = !!i895[26]
  request.r(i895[27], i895[28], 0, i894, 'skybox')
  i894.fogMode = i895[29]
  var i897 = i895[30]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i897[i + 0]) );
  }
  i894.lightmaps = i896
  i894.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i895[31], i894.lightProbes)
  i894.lightmapsMode = i895[32]
  i894.mixedBakeMode = i895[33]
  i894.environmentLightingMode = i895[34]
  i894.ambientProbe = new pc.SphericalHarmonicsL2(i895[35])
  request.r(i895[36], i895[37], 0, i894, 'customReflection')
  request.r(i895[38], i895[39], 0, i894, 'defaultReflection')
  i894.defaultReflectionMode = i895[40]
  i894.defaultReflectionResolution = i895[41]
  i894.sunLightObjectId = i895[42]
  i894.pixelLightCount = i895[43]
  i894.defaultReflectionHDR = !!i895[44]
  i894.hasLightDataAsset = !!i895[45]
  i894.hasManualGenerate = !!i895[46]
  return i894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i900 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i901 = data
  request.r(i901[0], i901[1], 0, i900, 'lightmapColor')
  request.r(i901[2], i901[3], 0, i900, 'lightmapDirection')
  request.r(i901[4], i901[5], 0, i900, 'shadowMask')
  return i900
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i902 = root || new UnityEngine.LightProbes()
  var i903 = data
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i911 = data
  i910.pivot = new pc.Vec2( i911[0], i911[1] )
  i910.anchorMin = new pc.Vec2( i911[2], i911[3] )
  i910.anchorMax = new pc.Vec2( i911[4], i911[5] )
  i910.sizeDelta = new pc.Vec2( i911[6], i911[7] )
  i910.anchoredPosition3D = new pc.Vec3( i911[8], i911[9], i911[10] )
  i910.rotation = new pc.Quat(i911[11], i911[12], i911[13], i911[14])
  i910.scale = new pc.Vec3( i911[15], i911[16], i911[17] )
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i913 = data
  i912.cullTransparentMesh = !!i913[0]
  return i912
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i914 = root || request.c( 'UnityEngine.UI.Text' )
  var i915 = data
  i914.m_FontData = request.d('UnityEngine.UI.FontData', i915[0], i914.m_FontData)
  i914.m_Text = i915[1]
  request.r(i915[2], i915[3], 0, i914, 'm_Material')
  i914.m_Maskable = !!i915[4]
  i914.m_Color = new pc.Color(i915[5], i915[6], i915[7], i915[8])
  i914.m_RaycastTarget = !!i915[9]
  i914.m_RaycastPadding = new pc.Vec4( i915[10], i915[11], i915[12], i915[13] )
  return i914
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i916 = root || request.c( 'UnityEngine.UI.FontData' )
  var i917 = data
  request.r(i917[0], i917[1], 0, i916, 'm_Font')
  i916.m_FontSize = i917[2]
  i916.m_FontStyle = i917[3]
  i916.m_BestFit = !!i917[4]
  i916.m_MinSize = i917[5]
  i916.m_MaxSize = i917[6]
  i916.m_Alignment = i917[7]
  i916.m_AlignByGeometry = !!i917[8]
  i916.m_RichText = !!i917[9]
  i916.m_HorizontalOverflow = i917[10]
  i916.m_VerticalOverflow = i917[11]
  i916.m_LineSpacing = i917[12]
  return i916
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i918 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i919 = data
  i918.position = new pc.Vec3( i919[0], i919[1], i919[2] )
  i918.scale = new pc.Vec3( i919[3], i919[4], i919[5] )
  i918.rotation = new pc.Quat(i919[6], i919[7], i919[8], i919[9])
  return i918
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i921 = data
  request.r(i921[0], i921[1], 0, i920, 'additionalVertexStreams')
  i920.enabled = !!i921[2]
  request.r(i921[3], i921[4], 0, i920, 'sharedMaterial')
  var i923 = i921[5]
  var i922 = []
  for(var i = 0; i < i923.length; i += 2) {
  request.r(i923[i + 0], i923[i + 1], 2, i922, '')
  }
  i920.sharedMaterials = i922
  i920.receiveShadows = !!i921[6]
  i920.shadowCastingMode = i921[7]
  i920.sortingLayerID = i921[8]
  i920.sortingOrder = i921[9]
  i920.lightmapIndex = i921[10]
  i920.lightmapSceneIndex = i921[11]
  i920.lightmapScaleOffset = new pc.Vec4( i921[12], i921[13], i921[14], i921[15] )
  i920.lightProbeUsage = i921[16]
  i920.reflectionProbeUsage = i921[17]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i926 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i927 = data
  i926.m_Alignment = i927[0]
  i926.m_Anchor = i927[1]
  i926.m_CharacterSize = i927[2]
  request.r(i927[3], i927[4], 0, i926, 'm_Font')
  i926.m_FontSize = i927[5]
  i926.m_FontStyle = i927[6]
  i926.m_LineSpacing = i927[7]
  i926.m_OffsetZ = i927[8]
  i926.m_RichText = !!i927[9]
  i926.m_TabSize = i927[10]
  i926.m_Text = i927[11]
  return i926
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i929 = data
  request.r(i929[0], i929[1], 0, i928, 'sharedMesh')
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i931 = data
  i930.center = new pc.Vec3( i931[0], i931[1], i931[2] )
  i930.radius = i931[3]
  i930.enabled = !!i931[4]
  i930.isTrigger = !!i931[5]
  request.r(i931[6], i931[7], 0, i930, 'material')
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i932 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i933 = data
  i932.center = new pc.Vec3( i933[0], i933[1], i933[2] )
  i932.radius = i933[3]
  i932.height = i933[4]
  i932.direction = i933[5]
  i932.enabled = !!i933[6]
  i932.isTrigger = !!i933[7]
  request.r(i933[8], i933[9], 0, i932, 'material')
  return i932
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i934 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i935 = data
  i934.center = new pc.Vec3( i935[0], i935[1], i935[2] )
  i934.size = new pc.Vec3( i935[3], i935[4], i935[5] )
  i934.enabled = !!i935[6]
  i934.isTrigger = !!i935[7]
  request.r(i935[8], i935[9], 0, i934, 'material')
  return i934
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i936 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i937 = data
  request.r(i937[0], i937[1], 0, i936, 'sharedMesh')
  i936.convex = !!i937[2]
  i936.enabled = !!i937[3]
  i936.isTrigger = !!i937[4]
  request.r(i937[5], i937[6], 0, i936, 'material')
  return i936
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i938 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i939 = data
  i938.name = i939[0]
  i938.halfPrecision = !!i939[1]
  i938.useSimplification = !!i939[2]
  i938.useUInt32IndexFormat = !!i939[3]
  i938.vertexCount = i939[4]
  i938.aabb = i939[5]
  var i941 = i939[6]
  var i940 = []
  for(var i = 0; i < i941.length; i += 1) {
    i940.push( !!i941[i + 0] );
  }
  i938.streams = i940
  i938.vertices = i939[7]
  var i943 = i939[8]
  var i942 = []
  for(var i = 0; i < i943.length; i += 1) {
    i942.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i943[i + 0]) );
  }
  i938.subMeshes = i942
  var i945 = i939[9]
  var i944 = []
  for(var i = 0; i < i945.length; i += 16) {
    i944.push( new pc.Mat4().setData(i945[i + 0], i945[i + 1], i945[i + 2], i945[i + 3],  i945[i + 4], i945[i + 5], i945[i + 6], i945[i + 7],  i945[i + 8], i945[i + 9], i945[i + 10], i945[i + 11],  i945[i + 12], i945[i + 13], i945[i + 14], i945[i + 15]) );
  }
  i938.bindposes = i944
  var i947 = i939[10]
  var i946 = []
  for(var i = 0; i < i947.length; i += 1) {
    i946.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i947[i + 0]) );
  }
  i938.blendShapes = i946
  return i938
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i952 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i953 = data
  i952.triangles = i953[0]
  return i952
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i958 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i959 = data
  i958.name = i959[0]
  var i961 = i959[1]
  var i960 = []
  for(var i = 0; i < i961.length; i += 1) {
    i960.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i961[i + 0]) );
  }
  i958.frames = i960
  return i958
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i962 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i963 = data
  var i965 = i963[0]
  var i964 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i965.length; i += 1) {
    i964.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i965[i + 0]));
  }
  i962.ShaderCompilationErrors = i964
  i962.name = i963[1]
  i962.guid = i963[2]
  var i967 = i963[3]
  var i966 = []
  for(var i = 0; i < i967.length; i += 1) {
    i966.push( i967[i + 0] );
  }
  i962.shaderDefinedKeywords = i966
  var i969 = i963[4]
  var i968 = []
  for(var i = 0; i < i969.length; i += 1) {
    i968.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i969[i + 0]) );
  }
  i962.passes = i968
  var i971 = i963[5]
  var i970 = []
  for(var i = 0; i < i971.length; i += 1) {
    i970.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i971[i + 0]) );
  }
  i962.usePasses = i970
  var i973 = i963[6]
  var i972 = []
  for(var i = 0; i < i973.length; i += 1) {
    i972.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i973[i + 0]) );
  }
  i962.defaultParameterValues = i972
  request.r(i963[7], i963[8], 0, i962, 'unityFallbackShader')
  i962.readDepth = !!i963[9]
  i962.hasDepthOnlyPass = !!i963[10]
  i962.isCreatedByShaderGraph = !!i963[11]
  i962.disableBatching = !!i963[12]
  i962.compiled = !!i963[13]
  return i962
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i976 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i977 = data
  i976.shaderName = i977[0]
  i976.errorMessage = i977[1]
  return i976
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i982 = root || new pc.UnityShaderPass()
  var i983 = data
  i982.id = i983[0]
  i982.subShaderIndex = i983[1]
  i982.name = i983[2]
  i982.passType = i983[3]
  i982.grabPassTextureName = i983[4]
  i982.usePass = !!i983[5]
  i982.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[6], i982.zTest)
  i982.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[7], i982.zWrite)
  i982.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[8], i982.culling)
  i982.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i983[9], i982.blending)
  i982.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i983[10], i982.alphaBlending)
  i982.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[11], i982.colorWriteMask)
  i982.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[12], i982.offsetUnits)
  i982.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[13], i982.offsetFactor)
  i982.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[14], i982.stencilRef)
  i982.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[15], i982.stencilReadMask)
  i982.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i983[16], i982.stencilWriteMask)
  i982.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i983[17], i982.stencilOp)
  i982.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i983[18], i982.stencilOpFront)
  i982.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i983[19], i982.stencilOpBack)
  var i985 = i983[20]
  var i984 = []
  for(var i = 0; i < i985.length; i += 1) {
    i984.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i985[i + 0]) );
  }
  i982.tags = i984
  var i987 = i983[21]
  var i986 = []
  for(var i = 0; i < i987.length; i += 1) {
    i986.push( i987[i + 0] );
  }
  i982.passDefinedKeywords = i986
  var i989 = i983[22]
  var i988 = []
  for(var i = 0; i < i989.length; i += 1) {
    i988.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i989[i + 0]) );
  }
  i982.passDefinedKeywordGroups = i988
  var i991 = i983[23]
  var i990 = []
  for(var i = 0; i < i991.length; i += 1) {
    i990.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i991[i + 0]) );
  }
  i982.variants = i990
  var i993 = i983[24]
  var i992 = []
  for(var i = 0; i < i993.length; i += 1) {
    i992.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i993[i + 0]) );
  }
  i982.excludedVariants = i992
  i982.hasDepthReader = !!i983[25]
  return i982
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i994 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i995 = data
  i994.val = i995[0]
  i994.name = i995[1]
  return i994
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i996 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i997 = data
  i996.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i997[0], i996.src)
  i996.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i997[1], i996.dst)
  i996.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i997[2], i996.op)
  return i996
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i998 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i999 = data
  i998.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i999[0], i998.pass)
  i998.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i999[1], i998.fail)
  i998.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i999[2], i998.zFail)
  i998.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i999[3], i998.comp)
  return i998
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1002 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1003 = data
  i1002.name = i1003[0]
  i1002.value = i1003[1]
  return i1002
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1006 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1007 = data
  var i1009 = i1007[0]
  var i1008 = []
  for(var i = 0; i < i1009.length; i += 1) {
    i1008.push( i1009[i + 0] );
  }
  i1006.keywords = i1008
  i1006.hasDiscard = !!i1007[1]
  return i1006
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1012 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1013 = data
  i1012.passId = i1013[0]
  i1012.subShaderIndex = i1013[1]
  var i1015 = i1013[2]
  var i1014 = []
  for(var i = 0; i < i1015.length; i += 1) {
    i1014.push( i1015[i + 0] );
  }
  i1012.keywords = i1014
  i1012.vertexProgram = i1013[3]
  i1012.fragmentProgram = i1013[4]
  i1012.exportedForWebGl2 = !!i1013[5]
  i1012.readDepth = !!i1013[6]
  return i1012
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1018 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1019 = data
  request.r(i1019[0], i1019[1], 0, i1018, 'shader')
  i1018.pass = i1019[2]
  return i1018
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1022 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1023 = data
  i1022.name = i1023[0]
  i1022.type = i1023[1]
  i1022.value = new pc.Vec4( i1023[2], i1023[3], i1023[4], i1023[5] )
  i1022.textureValue = i1023[6]
  i1022.shaderPropertyFlag = i1023[7]
  return i1022
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1024 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1025 = data
  i1024.name = i1025[0]
  return i1024
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1026 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1027 = data
  i1026.name = i1027[0]
  i1026.ascent = i1027[1]
  i1026.originalLineHeight = i1027[2]
  i1026.fontSize = i1027[3]
  var i1029 = i1027[4]
  var i1028 = []
  for(var i = 0; i < i1029.length; i += 1) {
    i1028.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1029[i + 0]) );
  }
  i1026.characterInfo = i1028
  request.r(i1027[5], i1027[6], 0, i1026, 'texture')
  i1026.originalFontSize = i1027[7]
  return i1026
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1032 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1033 = data
  i1032.index = i1033[0]
  i1032.advance = i1033[1]
  i1032.bearing = i1033[2]
  i1032.glyphWidth = i1033[3]
  i1032.glyphHeight = i1033[4]
  i1032.minX = i1033[5]
  i1032.maxX = i1033[6]
  i1032.minY = i1033[7]
  i1032.maxY = i1033[8]
  i1032.uvBottomLeftX = i1033[9]
  i1032.uvBottomLeftY = i1033[10]
  i1032.uvBottomRightX = i1033[11]
  i1032.uvBottomRightY = i1033[12]
  i1032.uvTopLeftX = i1033[13]
  i1032.uvTopLeftY = i1033[14]
  i1032.uvTopRightX = i1033[15]
  i1032.uvTopRightY = i1033[16]
  return i1032
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1034 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1035 = data
  i1034.name = i1035[0]
  i1034.bytes64 = i1035[1]
  i1034.data = i1035[2]
  return i1034
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1036 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1037 = data
  var i1039 = i1037[0]
  var i1038 = []
  for(var i = 0; i < i1039.length; i += 1) {
    i1038.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1039[i + 0]) );
  }
  i1036.files = i1038
  i1036.componentToPrefabIds = i1037[1]
  return i1036
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1042 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1043 = data
  i1042.path = i1043[0]
  request.r(i1043[1], i1043[2], 0, i1042, 'unityObject')
  return i1042
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1044 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1045 = data
  var i1047 = i1045[0]
  var i1046 = []
  for(var i = 0; i < i1047.length; i += 1) {
    i1046.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1047[i + 0]) );
  }
  i1044.scriptsExecutionOrder = i1046
  var i1049 = i1045[1]
  var i1048 = []
  for(var i = 0; i < i1049.length; i += 1) {
    i1048.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1049[i + 0]) );
  }
  i1044.sortingLayers = i1048
  var i1051 = i1045[2]
  var i1050 = []
  for(var i = 0; i < i1051.length; i += 1) {
    i1050.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1051[i + 0]) );
  }
  i1044.cullingLayers = i1050
  i1044.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1045[3], i1044.timeSettings)
  i1044.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1045[4], i1044.physicsSettings)
  i1044.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1045[5], i1044.physics2DSettings)
  i1044.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1045[6], i1044.qualitySettings)
  i1044.enableRealtimeShadows = !!i1045[7]
  i1044.enableAutoInstancing = !!i1045[8]
  i1044.enableStaticBatching = !!i1045[9]
  i1044.enableDynamicBatching = !!i1045[10]
  i1044.usePreservativeDynamicBatching = !!i1045[11]
  i1044.lightmapEncodingQuality = i1045[12]
  i1044.desiredColorSpace = i1045[13]
  var i1053 = i1045[14]
  var i1052 = []
  for(var i = 0; i < i1053.length; i += 1) {
    i1052.push( i1053[i + 0] );
  }
  i1044.allTags = i1052
  return i1044
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1056 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1057 = data
  i1056.name = i1057[0]
  i1056.value = i1057[1]
  return i1056
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1060 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1061 = data
  i1060.id = i1061[0]
  i1060.name = i1061[1]
  i1060.value = i1061[2]
  return i1060
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1064 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1065 = data
  i1064.id = i1065[0]
  i1064.name = i1065[1]
  return i1064
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1066 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1067 = data
  i1066.fixedDeltaTime = i1067[0]
  i1066.maximumDeltaTime = i1067[1]
  i1066.timeScale = i1067[2]
  i1066.maximumParticleTimestep = i1067[3]
  return i1066
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1068 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1069 = data
  i1068.gravity = new pc.Vec3( i1069[0], i1069[1], i1069[2] )
  i1068.defaultSolverIterations = i1069[3]
  i1068.bounceThreshold = i1069[4]
  i1068.autoSyncTransforms = !!i1069[5]
  i1068.autoSimulation = !!i1069[6]
  var i1071 = i1069[7]
  var i1070 = []
  for(var i = 0; i < i1071.length; i += 1) {
    i1070.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1071[i + 0]) );
  }
  i1068.collisionMatrix = i1070
  return i1068
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1074 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1075 = data
  i1074.enabled = !!i1075[0]
  i1074.layerId = i1075[1]
  i1074.otherLayerId = i1075[2]
  return i1074
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1076 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1077 = data
  request.r(i1077[0], i1077[1], 0, i1076, 'material')
  i1076.gravity = new pc.Vec2( i1077[2], i1077[3] )
  i1076.positionIterations = i1077[4]
  i1076.velocityIterations = i1077[5]
  i1076.velocityThreshold = i1077[6]
  i1076.maxLinearCorrection = i1077[7]
  i1076.maxAngularCorrection = i1077[8]
  i1076.maxTranslationSpeed = i1077[9]
  i1076.maxRotationSpeed = i1077[10]
  i1076.baumgarteScale = i1077[11]
  i1076.baumgarteTOIScale = i1077[12]
  i1076.timeToSleep = i1077[13]
  i1076.linearSleepTolerance = i1077[14]
  i1076.angularSleepTolerance = i1077[15]
  i1076.defaultContactOffset = i1077[16]
  i1076.autoSimulation = !!i1077[17]
  i1076.queriesHitTriggers = !!i1077[18]
  i1076.queriesStartInColliders = !!i1077[19]
  i1076.callbacksOnDisable = !!i1077[20]
  i1076.reuseCollisionCallbacks = !!i1077[21]
  i1076.autoSyncTransforms = !!i1077[22]
  var i1079 = i1077[23]
  var i1078 = []
  for(var i = 0; i < i1079.length; i += 1) {
    i1078.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1079[i + 0]) );
  }
  i1076.collisionMatrix = i1078
  return i1076
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1082 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1083 = data
  i1082.enabled = !!i1083[0]
  i1082.layerId = i1083[1]
  i1082.otherLayerId = i1083[2]
  return i1082
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1084 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1085 = data
  var i1087 = i1085[0]
  var i1086 = []
  for(var i = 0; i < i1087.length; i += 1) {
    i1086.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1087[i + 0]) );
  }
  i1084.qualityLevels = i1086
  var i1089 = i1085[1]
  var i1088 = []
  for(var i = 0; i < i1089.length; i += 1) {
    i1088.push( i1089[i + 0] );
  }
  i1084.names = i1088
  i1084.shadows = i1085[2]
  i1084.anisotropicFiltering = i1085[3]
  i1084.antiAliasing = i1085[4]
  i1084.lodBias = i1085[5]
  i1084.shadowCascades = i1085[6]
  i1084.shadowDistance = i1085[7]
  i1084.shadowmaskMode = i1085[8]
  i1084.shadowProjection = i1085[9]
  i1084.shadowResolution = i1085[10]
  i1084.softParticles = !!i1085[11]
  i1084.softVegetation = !!i1085[12]
  i1084.activeColorSpace = i1085[13]
  i1084.desiredColorSpace = i1085[14]
  i1084.masterTextureLimit = i1085[15]
  i1084.maxQueuedFrames = i1085[16]
  i1084.particleRaycastBudget = i1085[17]
  i1084.pixelLightCount = i1085[18]
  i1084.realtimeReflectionProbes = !!i1085[19]
  i1084.shadowCascade2Split = i1085[20]
  i1084.shadowCascade4Split = new pc.Vec3( i1085[21], i1085[22], i1085[23] )
  i1084.streamingMipmapsActive = !!i1085[24]
  i1084.vSyncCount = i1085[25]
  i1084.asyncUploadBufferSize = i1085[26]
  i1084.asyncUploadTimeSlice = i1085[27]
  i1084.billboardsFaceCameraPosition = !!i1085[28]
  i1084.shadowNearPlaneOffset = i1085[29]
  i1084.streamingMipmapsMemoryBudget = i1085[30]
  i1084.maximumLODLevel = i1085[31]
  i1084.streamingMipmapsAddAllCameras = !!i1085[32]
  i1084.streamingMipmapsMaxLevelReduction = i1085[33]
  i1084.streamingMipmapsRenderersPerFrame = i1085[34]
  i1084.resolutionScalingFixedDPIFactor = i1085[35]
  i1084.streamingMipmapsMaxFileIORequests = i1085[36]
  i1084.currentQualityLevel = i1085[37]
  return i1084
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1094 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1095 = data
  i1094.weight = i1095[0]
  i1094.vertices = i1095[1]
  i1094.normals = i1095[2]
  i1094.tangents = i1095[3]
  return i1094
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"24":[25],"26":[25],"27":[25],"28":[25],"29":[25],"30":[25],"31":[32],"33":[1],"34":[35],"36":[35],"37":[35],"38":[35],"39":[35],"40":[35],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[42],"49":[42],"50":[42],"51":[42],"52":[42],"53":[42],"54":[42],"55":[1],"14":[13],"56":[57],"58":[57],"59":[7],"60":[7],"61":[13,7],"62":[7,8],"63":[7],"64":[8,7],"65":[13],"66":[8,7],"67":[7],"68":[7],"69":[7],"70":[59],"71":[8,7],"72":[7],"73":[59],"74":[7],"75":[7],"76":[7],"77":[7],"78":[7],"79":[7],"80":[7],"81":[7],"82":[7],"83":[8,7],"84":[7],"85":[7],"86":[7],"87":[7],"10":[8,7],"88":[7],"89":[90],"91":[90],"92":[90],"93":[90],"94":[1],"95":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.MonoBehaviour","NumberMatchAd.NumberMatchGame","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","UnityEngine.AudioClip","UnityEngine.TextAsset","UnityEngine.GameObject","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.SkinnedMeshRenderer","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "0.0";

Deserializers.lunaVersion = "7.2.0";

Deserializers.lunaSHA = "ea08d29afe2968efcb8d91d5624f033c6485cc68";

Deserializers.creativeName = "";

Deserializers.lunaAppID = "0";

Deserializers.projectId = "7ccd2e359dd01ac419bc2d8d8f044d39";

Deserializers.packagesInfo = "com.unity.ugui: 2.0.0";

Deserializers.externalJsLibraries = "";

Deserializers.androidLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.androidLink?window.$environment.packageConfig.androidLink:'Empty';

Deserializers.iosLink = ( typeof window !== "undefined")&&window.$environment.packageConfig.iosLink?window.$environment.packageConfig.iosLink:'Empty';

Deserializers.base64Enabled = "False";

Deserializers.minifyEnabled = "True";

Deserializers.isForceUncompressed = "False";

Deserializers.isAntiAliasingEnabled = "False";

Deserializers.isRuntimeAnalysisEnabledForCode = "False";

Deserializers.runtimeAnalysisExcludedClassesCount = "1744";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4248";

Deserializers.runtimeAnalysisExcludedModules = "physics3d, physics2d, particle-system, reflection, prefabs, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "True";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.Jelly-Puzzle-Playable";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "1613a53a-d789-45c2-b9c6-cfd5f7ef81d7";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEditor","Recorder","RecorderWindow","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"]],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

