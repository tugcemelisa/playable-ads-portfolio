var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i320 = root || request.c( 'UnityEngine.JointSpring' )
  var i321 = data
  i320.spring = i321[0]
  i320.damper = i321[1]
  i320.targetPosition = i321[2]
  return i320
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i322 = root || request.c( 'UnityEngine.JointMotor' )
  var i323 = data
  i322.m_TargetVelocity = i323[0]
  i322.m_Force = i323[1]
  i322.m_FreeSpin = i323[2]
  return i322
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i324 = root || request.c( 'UnityEngine.JointLimits' )
  var i325 = data
  i324.m_Min = i325[0]
  i324.m_Max = i325[1]
  i324.m_Bounciness = i325[2]
  i324.m_BounceMinVelocity = i325[3]
  i324.m_ContactDistance = i325[4]
  i324.minBounce = i325[5]
  i324.maxBounce = i325[6]
  return i324
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i326 = root || request.c( 'UnityEngine.JointDrive' )
  var i327 = data
  i326.m_PositionSpring = i327[0]
  i326.m_PositionDamper = i327[1]
  i326.m_MaximumForce = i327[2]
  i326.m_UseAcceleration = i327[3]
  return i326
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i328 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i329 = data
  i328.m_Spring = i329[0]
  i328.m_Damper = i329[1]
  return i328
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i330 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i331 = data
  i330.m_Limit = i331[0]
  i330.m_Bounciness = i331[1]
  i330.m_ContactDistance = i331[2]
  return i330
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i332 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i333 = data
  i332.m_ExtremumSlip = i333[0]
  i332.m_ExtremumValue = i333[1]
  i332.m_AsymptoteSlip = i333[2]
  i332.m_AsymptoteValue = i333[3]
  i332.m_Stiffness = i333[4]
  return i332
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i334 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i335 = data
  i334.m_LowerAngle = i335[0]
  i334.m_UpperAngle = i335[1]
  return i334
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i336 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i337 = data
  i336.m_MotorSpeed = i337[0]
  i336.m_MaximumMotorTorque = i337[1]
  return i336
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i338 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i339 = data
  i338.m_DampingRatio = i339[0]
  i338.m_Frequency = i339[1]
  i338.m_Angle = i339[2]
  return i338
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i340 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i341 = data
  i340.m_LowerTranslation = i341[0]
  i340.m_UpperTranslation = i341[1]
  return i340
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i342 = root || new pc.UnityMaterial()
  var i343 = data
  i342.name = i343[0]
  request.r(i343[1], i343[2], 0, i342, 'shader')
  i342.renderQueue = i343[3]
  i342.enableInstancing = !!i343[4]
  var i345 = i343[5]
  var i344 = []
  for(var i = 0; i < i345.length; i += 1) {
    i344.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i345[i + 0]) );
  }
  i342.floatParameters = i344
  var i347 = i343[6]
  var i346 = []
  for(var i = 0; i < i347.length; i += 1) {
    i346.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i347[i + 0]) );
  }
  i342.colorParameters = i346
  var i349 = i343[7]
  var i348 = []
  for(var i = 0; i < i349.length; i += 1) {
    i348.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i349[i + 0]) );
  }
  i342.vectorParameters = i348
  var i351 = i343[8]
  var i350 = []
  for(var i = 0; i < i351.length; i += 1) {
    i350.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i351[i + 0]) );
  }
  i342.textureParameters = i350
  var i353 = i343[9]
  var i352 = []
  for(var i = 0; i < i353.length; i += 1) {
    i352.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i353[i + 0]) );
  }
  i342.materialFlags = i352
  return i342
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i356 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i357 = data
  i356.name = i357[0]
  i356.value = i357[1]
  return i356
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i360 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i361 = data
  i360.name = i361[0]
  i360.value = new pc.Color(i361[1], i361[2], i361[3], i361[4])
  return i360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i364 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i365 = data
  i364.name = i365[0]
  i364.value = new pc.Vec4( i365[1], i365[2], i365[3], i365[4] )
  return i364
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i368 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i369 = data
  i368.name = i369[0]
  request.r(i369[1], i369[2], 0, i368, 'value')
  return i368
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i372 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i373 = data
  i372.name = i373[0]
  i372.enabled = !!i373[1]
  return i372
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i374 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i375 = data
  i374.name = i375[0]
  i374.width = i375[1]
  i374.height = i375[2]
  i374.mipmapCount = i375[3]
  i374.anisoLevel = i375[4]
  i374.filterMode = i375[5]
  i374.hdr = !!i375[6]
  i374.format = i375[7]
  i374.wrapMode = i375[8]
  i374.alphaIsTransparency = !!i375[9]
  i374.alphaSource = i375[10]
  i374.graphicsFormat = i375[11]
  i374.sRGBTexture = !!i375[12]
  i374.desiredColorSpace = i375[13]
  i374.wrapU = i375[14]
  i374.wrapV = i375[15]
  return i374
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i377 = data
  i376.name = i377[0]
  i376.atlasId = i377[1]
  i376.mipmapCount = i377[2]
  i376.hdr = !!i377[3]
  i376.size = i377[4]
  i376.anisoLevel = i377[5]
  i376.filterMode = i377[6]
  var i379 = i377[7]
  var i378 = []
  for(var i = 0; i < i379.length; i += 4) {
    i378.push( UnityEngine.Rect.MinMaxRect(i379[i + 0], i379[i + 1], i379[i + 2], i379[i + 3]) );
  }
  i376.rects = i378
  i376.wrapU = i377[8]
  i376.wrapV = i377[9]
  return i376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i382 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i383 = data
  i382.name = i383[0]
  i382.index = i383[1]
  i382.startup = !!i383[2]
  return i382
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i385 = data
  i384.aspect = i385[0]
  i384.orthographic = !!i385[1]
  i384.orthographicSize = i385[2]
  i384.backgroundColor = new pc.Color(i385[3], i385[4], i385[5], i385[6])
  i384.nearClipPlane = i385[7]
  i384.farClipPlane = i385[8]
  i384.fieldOfView = i385[9]
  i384.depth = i385[10]
  i384.clearFlags = i385[11]
  i384.cullingMask = i385[12]
  i384.rect = i385[13]
  request.r(i385[14], i385[15], 0, i384, 'targetTexture')
  i384.usePhysicalProperties = !!i385[16]
  i384.focalLength = i385[17]
  i384.sensorSize = new pc.Vec2( i385[18], i385[19] )
  i384.lensShift = new pc.Vec2( i385[20], i385[21] )
  i384.gateFit = i385[22]
  i384.commandBufferCount = i385[23]
  i384.cameraType = i385[24]
  i384.enabled = !!i385[25]
  return i384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i386 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i387 = data
  i386.name = i387[0]
  i386.tagId = i387[1]
  i386.enabled = !!i387[2]
  i386.isStatic = !!i387[3]
  i386.layer = i387[4]
  return i386
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i388 = root || request.c( 'MobControlAd.MobControlGame' )
  var i389 = data
  i388.fireRate = i389[0]
  i388.yellowBlockStartHp = i389[1]
  i388.enemyBaseStartHp = i389[2]
  i388.ctaText = i389[3]
  return i388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i390 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i391 = data
  i390.type = i391[0]
  i390.color = new pc.Color(i391[1], i391[2], i391[3], i391[4])
  i390.cullingMask = i391[5]
  i390.intensity = i391[6]
  i390.range = i391[7]
  i390.spotAngle = i391[8]
  i390.shadows = i391[9]
  i390.shadowNormalBias = i391[10]
  i390.shadowBias = i391[11]
  i390.shadowStrength = i391[12]
  i390.shadowResolution = i391[13]
  i390.lightmapBakeType = i391[14]
  i390.renderMode = i391[15]
  request.r(i391[16], i391[17], 0, i390, 'cookie')
  i390.cookieSize = i391[18]
  i390.shadowNearPlane = i391[19]
  i390.occlusionMaskChannel = i391[20]
  i390.isBaked = !!i391[21]
  i390.mixedLightingMode = i391[22]
  i390.enabled = !!i391[23]
  return i390
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i393 = data
  i392.ambientIntensity = i393[0]
  i392.reflectionIntensity = i393[1]
  i392.ambientMode = i393[2]
  i392.ambientLight = new pc.Color(i393[3], i393[4], i393[5], i393[6])
  i392.ambientSkyColor = new pc.Color(i393[7], i393[8], i393[9], i393[10])
  i392.ambientGroundColor = new pc.Color(i393[11], i393[12], i393[13], i393[14])
  i392.ambientEquatorColor = new pc.Color(i393[15], i393[16], i393[17], i393[18])
  i392.fogColor = new pc.Color(i393[19], i393[20], i393[21], i393[22])
  i392.fogEndDistance = i393[23]
  i392.fogStartDistance = i393[24]
  i392.fogDensity = i393[25]
  i392.fog = !!i393[26]
  request.r(i393[27], i393[28], 0, i392, 'skybox')
  i392.fogMode = i393[29]
  var i395 = i393[30]
  var i394 = []
  for(var i = 0; i < i395.length; i += 1) {
    i394.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i395[i + 0]) );
  }
  i392.lightmaps = i394
  i392.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i393[31], i392.lightProbes)
  i392.lightmapsMode = i393[32]
  i392.mixedBakeMode = i393[33]
  i392.environmentLightingMode = i393[34]
  i392.ambientProbe = new pc.SphericalHarmonicsL2(i393[35])
  request.r(i393[36], i393[37], 0, i392, 'customReflection')
  request.r(i393[38], i393[39], 0, i392, 'defaultReflection')
  i392.defaultReflectionMode = i393[40]
  i392.defaultReflectionResolution = i393[41]
  i392.sunLightObjectId = i393[42]
  i392.pixelLightCount = i393[43]
  i392.defaultReflectionHDR = !!i393[44]
  i392.hasLightDataAsset = !!i393[45]
  i392.hasManualGenerate = !!i393[46]
  return i392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i398 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i399 = data
  request.r(i399[0], i399[1], 0, i398, 'lightmapColor')
  request.r(i399[2], i399[3], 0, i398, 'lightmapDirection')
  request.r(i399[4], i399[5], 0, i398, 'shadowMask')
  return i398
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i400 = root || new UnityEngine.LightProbes()
  var i401 = data
  return i400
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i408 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i409 = data
  i408.pivot = new pc.Vec2( i409[0], i409[1] )
  i408.anchorMin = new pc.Vec2( i409[2], i409[3] )
  i408.anchorMax = new pc.Vec2( i409[4], i409[5] )
  i408.sizeDelta = new pc.Vec2( i409[6], i409[7] )
  i408.anchoredPosition3D = new pc.Vec3( i409[8], i409[9], i409[10] )
  i408.rotation = new pc.Quat(i409[11], i409[12], i409[13], i409[14])
  i408.scale = new pc.Vec3( i409[15], i409[16], i409[17] )
  return i408
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i411 = data
  i410.cullTransparentMesh = !!i411[0]
  return i410
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i412 = root || request.c( 'UnityEngine.UI.Text' )
  var i413 = data
  i412.m_FontData = request.d('UnityEngine.UI.FontData', i413[0], i412.m_FontData)
  i412.m_Text = i413[1]
  request.r(i413[2], i413[3], 0, i412, 'm_Material')
  i412.m_Maskable = !!i413[4]
  i412.m_Color = new pc.Color(i413[5], i413[6], i413[7], i413[8])
  i412.m_RaycastTarget = !!i413[9]
  i412.m_RaycastPadding = new pc.Vec4( i413[10], i413[11], i413[12], i413[13] )
  return i412
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i414 = root || request.c( 'UnityEngine.UI.FontData' )
  var i415 = data
  request.r(i415[0], i415[1], 0, i414, 'm_Font')
  i414.m_FontSize = i415[2]
  i414.m_FontStyle = i415[3]
  i414.m_BestFit = !!i415[4]
  i414.m_MinSize = i415[5]
  i414.m_MaxSize = i415[6]
  i414.m_Alignment = i415[7]
  i414.m_AlignByGeometry = !!i415[8]
  i414.m_RichText = !!i415[9]
  i414.m_HorizontalOverflow = i415[10]
  i414.m_VerticalOverflow = i415[11]
  i414.m_LineSpacing = i415[12]
  return i414
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i416 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i417 = data
  i416.position = new pc.Vec3( i417[0], i417[1], i417[2] )
  i416.scale = new pc.Vec3( i417[3], i417[4], i417[5] )
  i416.rotation = new pc.Quat(i417[6], i417[7], i417[8], i417[9])
  return i416
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i418 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i419 = data
  request.r(i419[0], i419[1], 0, i418, 'additionalVertexStreams')
  i418.enabled = !!i419[2]
  request.r(i419[3], i419[4], 0, i418, 'sharedMaterial')
  var i421 = i419[5]
  var i420 = []
  for(var i = 0; i < i421.length; i += 2) {
  request.r(i421[i + 0], i421[i + 1], 2, i420, '')
  }
  i418.sharedMaterials = i420
  i418.receiveShadows = !!i419[6]
  i418.shadowCastingMode = i419[7]
  i418.sortingLayerID = i419[8]
  i418.sortingOrder = i419[9]
  i418.lightmapIndex = i419[10]
  i418.lightmapSceneIndex = i419[11]
  i418.lightmapScaleOffset = new pc.Vec4( i419[12], i419[13], i419[14], i419[15] )
  i418.lightProbeUsage = i419[16]
  i418.reflectionProbeUsage = i419[17]
  return i418
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i424 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i425 = data
  i424.m_Alignment = i425[0]
  i424.m_Anchor = i425[1]
  i424.m_CharacterSize = i425[2]
  request.r(i425[3], i425[4], 0, i424, 'm_Font')
  i424.m_FontSize = i425[5]
  i424.m_FontStyle = i425[6]
  i424.m_LineSpacing = i425[7]
  i424.m_OffsetZ = i425[8]
  i424.m_RichText = !!i425[9]
  i424.m_TabSize = i425[10]
  i424.m_Text = i425[11]
  return i424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i426 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i427 = data
  request.r(i427[0], i427[1], 0, i426, 'sharedMesh')
  return i426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i429 = data
  i428.name = i429[0]
  i428.halfPrecision = !!i429[1]
  i428.useSimplification = !!i429[2]
  i428.useUInt32IndexFormat = !!i429[3]
  i428.vertexCount = i429[4]
  i428.aabb = i429[5]
  var i431 = i429[6]
  var i430 = []
  for(var i = 0; i < i431.length; i += 1) {
    i430.push( !!i431[i + 0] );
  }
  i428.streams = i430
  i428.vertices = i429[7]
  var i433 = i429[8]
  var i432 = []
  for(var i = 0; i < i433.length; i += 1) {
    i432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i433[i + 0]) );
  }
  i428.subMeshes = i432
  var i435 = i429[9]
  var i434 = []
  for(var i = 0; i < i435.length; i += 16) {
    i434.push( new pc.Mat4().setData(i435[i + 0], i435[i + 1], i435[i + 2], i435[i + 3],  i435[i + 4], i435[i + 5], i435[i + 6], i435[i + 7],  i435[i + 8], i435[i + 9], i435[i + 10], i435[i + 11],  i435[i + 12], i435[i + 13], i435[i + 14], i435[i + 15]) );
  }
  i428.bindposes = i434
  var i437 = i429[10]
  var i436 = []
  for(var i = 0; i < i437.length; i += 1) {
    i436.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i437[i + 0]) );
  }
  i428.blendShapes = i436
  return i428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i443 = data
  i442.triangles = i443[0]
  return i442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i449 = data
  i448.name = i449[0]
  var i451 = i449[1]
  var i450 = []
  for(var i = 0; i < i451.length; i += 1) {
    i450.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i451[i + 0]) );
  }
  i448.frames = i450
  return i448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i453 = data
  request.r(i453[0], i453[1], 0, i452, 'sharedMesh')
  var i455 = i453[2]
  var i454 = []
  for(var i = 0; i < i455.length; i += 2) {
  request.r(i455[i + 0], i455[i + 1], 2, i454, '')
  }
  i452.bones = i454
  i452.updateWhenOffscreen = !!i453[3]
  i452.localBounds = i453[4]
  request.r(i453[5], i453[6], 0, i452, 'rootBone')
  var i457 = i453[7]
  var i456 = []
  for(var i = 0; i < i457.length; i += 1) {
    i456.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i457[i + 0]) );
  }
  i452.blendShapesWeights = i456
  i452.enabled = !!i453[8]
  request.r(i453[9], i453[10], 0, i452, 'sharedMaterial')
  var i459 = i453[11]
  var i458 = []
  for(var i = 0; i < i459.length; i += 2) {
  request.r(i459[i + 0], i459[i + 1], 2, i458, '')
  }
  i452.sharedMaterials = i458
  i452.receiveShadows = !!i453[12]
  i452.shadowCastingMode = i453[13]
  i452.sortingLayerID = i453[14]
  i452.sortingOrder = i453[15]
  i452.lightmapIndex = i453[16]
  i452.lightmapSceneIndex = i453[17]
  i452.lightmapScaleOffset = new pc.Vec4( i453[18], i453[19], i453[20], i453[21] )
  i452.lightProbeUsage = i453[22]
  i452.reflectionProbeUsage = i453[23]
  return i452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i465 = data
  i464.weight = i465[0]
  return i464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i469 = data
  i468.weight = i469[0]
  i468.vertices = i469[1]
  i468.normals = i469[2]
  i468.tangents = i469[3]
  return i468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i471 = data
  i470.center = new pc.Vec3( i471[0], i471[1], i471[2] )
  i470.radius = i471[3]
  i470.enabled = !!i471[4]
  i470.isTrigger = !!i471[5]
  request.r(i471[6], i471[7], 0, i470, 'material')
  return i470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i473 = data
  i472.center = new pc.Vec3( i473[0], i473[1], i473[2] )
  i472.radius = i473[3]
  i472.height = i473[4]
  i472.direction = i473[5]
  i472.enabled = !!i473[6]
  i472.isTrigger = !!i473[7]
  request.r(i473[8], i473[9], 0, i472, 'material')
  return i472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i475 = data
  i474.center = new pc.Vec3( i475[0], i475[1], i475[2] )
  i474.size = new pc.Vec3( i475[3], i475[4], i475[5] )
  i474.enabled = !!i475[6]
  i474.isTrigger = !!i475[7]
  request.r(i475[8], i475[9], 0, i474, 'material')
  return i474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i477 = data
  request.r(i477[0], i477[1], 0, i476, 'sharedMesh')
  i476.convex = !!i477[2]
  i476.enabled = !!i477[3]
  i476.isTrigger = !!i477[4]
  request.r(i477[5], i477[6], 0, i476, 'material')
  return i476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i479 = data
  var i481 = i479[0]
  var i480 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i481.length; i += 1) {
    i480.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i481[i + 0]));
  }
  i478.ShaderCompilationErrors = i480
  i478.name = i479[1]
  i478.guid = i479[2]
  var i483 = i479[3]
  var i482 = []
  for(var i = 0; i < i483.length; i += 1) {
    i482.push( i483[i + 0] );
  }
  i478.shaderDefinedKeywords = i482
  var i485 = i479[4]
  var i484 = []
  for(var i = 0; i < i485.length; i += 1) {
    i484.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i485[i + 0]) );
  }
  i478.passes = i484
  var i487 = i479[5]
  var i486 = []
  for(var i = 0; i < i487.length; i += 1) {
    i486.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i487[i + 0]) );
  }
  i478.usePasses = i486
  var i489 = i479[6]
  var i488 = []
  for(var i = 0; i < i489.length; i += 1) {
    i488.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i489[i + 0]) );
  }
  i478.defaultParameterValues = i488
  request.r(i479[7], i479[8], 0, i478, 'unityFallbackShader')
  i478.readDepth = !!i479[9]
  i478.hasDepthOnlyPass = !!i479[10]
  i478.isCreatedByShaderGraph = !!i479[11]
  i478.disableBatching = !!i479[12]
  i478.compiled = !!i479[13]
  return i478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i493 = data
  i492.shaderName = i493[0]
  i492.errorMessage = i493[1]
  return i492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i498 = root || new pc.UnityShaderPass()
  var i499 = data
  i498.id = i499[0]
  i498.subShaderIndex = i499[1]
  i498.name = i499[2]
  i498.passType = i499[3]
  i498.grabPassTextureName = i499[4]
  i498.usePass = !!i499[5]
  i498.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[6], i498.zTest)
  i498.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[7], i498.zWrite)
  i498.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[8], i498.culling)
  i498.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i499[9], i498.blending)
  i498.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i499[10], i498.alphaBlending)
  i498.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[11], i498.colorWriteMask)
  i498.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[12], i498.offsetUnits)
  i498.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[13], i498.offsetFactor)
  i498.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[14], i498.stencilRef)
  i498.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[15], i498.stencilReadMask)
  i498.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i499[16], i498.stencilWriteMask)
  i498.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i499[17], i498.stencilOp)
  i498.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i499[18], i498.stencilOpFront)
  i498.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i499[19], i498.stencilOpBack)
  var i501 = i499[20]
  var i500 = []
  for(var i = 0; i < i501.length; i += 1) {
    i500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i501[i + 0]) );
  }
  i498.tags = i500
  var i503 = i499[21]
  var i502 = []
  for(var i = 0; i < i503.length; i += 1) {
    i502.push( i503[i + 0] );
  }
  i498.passDefinedKeywords = i502
  var i505 = i499[22]
  var i504 = []
  for(var i = 0; i < i505.length; i += 1) {
    i504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i505[i + 0]) );
  }
  i498.passDefinedKeywordGroups = i504
  var i507 = i499[23]
  var i506 = []
  for(var i = 0; i < i507.length; i += 1) {
    i506.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i507[i + 0]) );
  }
  i498.variants = i506
  var i509 = i499[24]
  var i508 = []
  for(var i = 0; i < i509.length; i += 1) {
    i508.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i509[i + 0]) );
  }
  i498.excludedVariants = i508
  i498.hasDepthReader = !!i499[25]
  return i498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i511 = data
  i510.val = i511[0]
  i510.name = i511[1]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i513 = data
  i512.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i513[0], i512.src)
  i512.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i513[1], i512.dst)
  i512.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i513[2], i512.op)
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i515 = data
  i514.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i515[0], i514.pass)
  i514.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i515[1], i514.fail)
  i514.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i515[2], i514.zFail)
  i514.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i515[3], i514.comp)
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i519 = data
  i518.name = i519[0]
  i518.value = i519[1]
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i523 = data
  var i525 = i523[0]
  var i524 = []
  for(var i = 0; i < i525.length; i += 1) {
    i524.push( i525[i + 0] );
  }
  i522.keywords = i524
  i522.hasDiscard = !!i523[1]
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i529 = data
  i528.passId = i529[0]
  i528.subShaderIndex = i529[1]
  var i531 = i529[2]
  var i530 = []
  for(var i = 0; i < i531.length; i += 1) {
    i530.push( i531[i + 0] );
  }
  i528.keywords = i530
  i528.vertexProgram = i529[3]
  i528.fragmentProgram = i529[4]
  i528.exportedForWebGl2 = !!i529[5]
  i528.readDepth = !!i529[6]
  return i528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i535 = data
  request.r(i535[0], i535[1], 0, i534, 'shader')
  i534.pass = i535[2]
  return i534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i539 = data
  i538.name = i539[0]
  i538.type = i539[1]
  i538.value = new pc.Vec4( i539[2], i539[3], i539[4], i539[5] )
  i538.textureValue = i539[6]
  i538.shaderPropertyFlag = i539[7]
  return i538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i541 = data
  i540.name = i541[0]
  return i540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i543 = data
  i542.name = i543[0]
  i542.wrapMode = i543[1]
  i542.isLooping = !!i543[2]
  i542.length = i543[3]
  var i545 = i543[4]
  var i544 = []
  for(var i = 0; i < i545.length; i += 1) {
    i544.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i545[i + 0]) );
  }
  i542.curves = i544
  var i547 = i543[5]
  var i546 = []
  for(var i = 0; i < i547.length; i += 1) {
    i546.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i547[i + 0]) );
  }
  i542.events = i546
  i542.halfPrecision = !!i543[6]
  i542._frameRate = i543[7]
  i542.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i543[8], i542.localBounds)
  i542.hasMuscleCurves = !!i543[9]
  var i549 = i543[10]
  var i548 = []
  for(var i = 0; i < i549.length; i += 1) {
    i548.push( i549[i + 0] );
  }
  i542.clipMuscleConstant = i548
  i542.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i543[11], i542.clipBindingConstant)
  return i542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i553 = data
  i552.path = i553[0]
  i552.hash = i553[1]
  i552.componentType = i553[2]
  i552.property = i553[3]
  i552.keys = i553[4]
  var i555 = i553[5]
  var i554 = []
  for(var i = 0; i < i555.length; i += 1) {
    i554.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i555[i + 0]) );
  }
  i552.objectReferenceKeys = i554
  return i552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i559 = data
  i558.time = i559[0]
  request.r(i559[1], i559[2], 0, i558, 'value')
  return i558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i563 = data
  i562.functionName = i563[0]
  i562.floatParameter = i563[1]
  i562.intParameter = i563[2]
  i562.stringParameter = i563[3]
  request.r(i563[4], i563[5], 0, i562, 'objectReferenceParameter')
  i562.time = i563[6]
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i565 = data
  i564.center = new pc.Vec3( i565[0], i565[1], i565[2] )
  i564.extends = new pc.Vec3( i565[3], i565[4], i565[5] )
  return i564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i569 = data
  var i571 = i569[0]
  var i570 = []
  for(var i = 0; i < i571.length; i += 1) {
    i570.push( i571[i + 0] );
  }
  i568.genericBindings = i570
  var i573 = i569[1]
  var i572 = []
  for(var i = 0; i < i573.length; i += 1) {
    i572.push( i573[i + 0] );
  }
  i568.pptrCurveMapping = i572
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i575 = data
  i574.name = i575[0]
  i574.ascent = i575[1]
  i574.originalLineHeight = i575[2]
  i574.fontSize = i575[3]
  var i577 = i575[4]
  var i576 = []
  for(var i = 0; i < i577.length; i += 1) {
    i576.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i577[i + 0]) );
  }
  i574.characterInfo = i576
  request.r(i575[5], i575[6], 0, i574, 'texture')
  i574.originalFontSize = i575[7]
  return i574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i581 = data
  i580.index = i581[0]
  i580.advance = i581[1]
  i580.bearing = i581[2]
  i580.glyphWidth = i581[3]
  i580.glyphHeight = i581[4]
  i580.minX = i581[5]
  i580.maxX = i581[6]
  i580.minY = i581[7]
  i580.maxY = i581[8]
  i580.uvBottomLeftX = i581[9]
  i580.uvBottomLeftY = i581[10]
  i580.uvBottomRightX = i581[11]
  i580.uvBottomRightY = i581[12]
  i580.uvTopLeftX = i581[13]
  i580.uvTopLeftY = i581[14]
  i580.uvTopRightX = i581[15]
  i580.uvTopRightY = i581[16]
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i583 = data
  i582.name = i583[0]
  i582.bytes64 = i583[1]
  i582.data = i583[2]
  return i582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i585 = data
  var i587 = i585[0]
  var i586 = []
  for(var i = 0; i < i587.length; i += 1) {
    i586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i587[i + 0]) );
  }
  i584.files = i586
  i584.componentToPrefabIds = i585[1]
  return i584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i591 = data
  i590.path = i591[0]
  request.r(i591[1], i591[2], 0, i590, 'unityObject')
  return i590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i593 = data
  var i595 = i593[0]
  var i594 = []
  for(var i = 0; i < i595.length; i += 1) {
    i594.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i595[i + 0]) );
  }
  i592.scriptsExecutionOrder = i594
  var i597 = i593[1]
  var i596 = []
  for(var i = 0; i < i597.length; i += 1) {
    i596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i597[i + 0]) );
  }
  i592.sortingLayers = i596
  var i599 = i593[2]
  var i598 = []
  for(var i = 0; i < i599.length; i += 1) {
    i598.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i599[i + 0]) );
  }
  i592.cullingLayers = i598
  i592.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i593[3], i592.timeSettings)
  i592.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i593[4], i592.physicsSettings)
  i592.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i593[5], i592.physics2DSettings)
  i592.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i593[6], i592.qualitySettings)
  i592.enableRealtimeShadows = !!i593[7]
  i592.enableAutoInstancing = !!i593[8]
  i592.enableStaticBatching = !!i593[9]
  i592.enableDynamicBatching = !!i593[10]
  i592.usePreservativeDynamicBatching = !!i593[11]
  i592.lightmapEncodingQuality = i593[12]
  i592.desiredColorSpace = i593[13]
  var i601 = i593[14]
  var i600 = []
  for(var i = 0; i < i601.length; i += 1) {
    i600.push( i601[i + 0] );
  }
  i592.allTags = i600
  return i592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i604 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i605 = data
  i604.name = i605[0]
  i604.value = i605[1]
  return i604
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i609 = data
  i608.id = i609[0]
  i608.name = i609[1]
  i608.value = i609[2]
  return i608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i613 = data
  i612.id = i613[0]
  i612.name = i613[1]
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i615 = data
  i614.fixedDeltaTime = i615[0]
  i614.maximumDeltaTime = i615[1]
  i614.timeScale = i615[2]
  i614.maximumParticleTimestep = i615[3]
  return i614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i617 = data
  i616.gravity = new pc.Vec3( i617[0], i617[1], i617[2] )
  i616.defaultSolverIterations = i617[3]
  i616.bounceThreshold = i617[4]
  i616.autoSyncTransforms = !!i617[5]
  i616.autoSimulation = !!i617[6]
  var i619 = i617[7]
  var i618 = []
  for(var i = 0; i < i619.length; i += 1) {
    i618.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i619[i + 0]) );
  }
  i616.collisionMatrix = i618
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i623 = data
  i622.enabled = !!i623[0]
  i622.layerId = i623[1]
  i622.otherLayerId = i623[2]
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i625 = data
  request.r(i625[0], i625[1], 0, i624, 'material')
  i624.gravity = new pc.Vec2( i625[2], i625[3] )
  i624.positionIterations = i625[4]
  i624.velocityIterations = i625[5]
  i624.velocityThreshold = i625[6]
  i624.maxLinearCorrection = i625[7]
  i624.maxAngularCorrection = i625[8]
  i624.maxTranslationSpeed = i625[9]
  i624.maxRotationSpeed = i625[10]
  i624.baumgarteScale = i625[11]
  i624.baumgarteTOIScale = i625[12]
  i624.timeToSleep = i625[13]
  i624.linearSleepTolerance = i625[14]
  i624.angularSleepTolerance = i625[15]
  i624.defaultContactOffset = i625[16]
  i624.autoSimulation = !!i625[17]
  i624.queriesHitTriggers = !!i625[18]
  i624.queriesStartInColliders = !!i625[19]
  i624.callbacksOnDisable = !!i625[20]
  i624.reuseCollisionCallbacks = !!i625[21]
  i624.autoSyncTransforms = !!i625[22]
  var i627 = i625[23]
  var i626 = []
  for(var i = 0; i < i627.length; i += 1) {
    i626.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i627[i + 0]) );
  }
  i624.collisionMatrix = i626
  return i624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i631 = data
  i630.enabled = !!i631[0]
  i630.layerId = i631[1]
  i630.otherLayerId = i631[2]
  return i630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i633 = data
  var i635 = i633[0]
  var i634 = []
  for(var i = 0; i < i635.length; i += 1) {
    i634.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i635[i + 0]) );
  }
  i632.qualityLevels = i634
  var i637 = i633[1]
  var i636 = []
  for(var i = 0; i < i637.length; i += 1) {
    i636.push( i637[i + 0] );
  }
  i632.names = i636
  i632.shadows = i633[2]
  i632.anisotropicFiltering = i633[3]
  i632.antiAliasing = i633[4]
  i632.lodBias = i633[5]
  i632.shadowCascades = i633[6]
  i632.shadowDistance = i633[7]
  i632.shadowmaskMode = i633[8]
  i632.shadowProjection = i633[9]
  i632.shadowResolution = i633[10]
  i632.softParticles = !!i633[11]
  i632.softVegetation = !!i633[12]
  i632.activeColorSpace = i633[13]
  i632.desiredColorSpace = i633[14]
  i632.masterTextureLimit = i633[15]
  i632.maxQueuedFrames = i633[16]
  i632.particleRaycastBudget = i633[17]
  i632.pixelLightCount = i633[18]
  i632.realtimeReflectionProbes = !!i633[19]
  i632.shadowCascade2Split = i633[20]
  i632.shadowCascade4Split = new pc.Vec3( i633[21], i633[22], i633[23] )
  i632.streamingMipmapsActive = !!i633[24]
  i632.vSyncCount = i633[25]
  i632.asyncUploadBufferSize = i633[26]
  i632.asyncUploadTimeSlice = i633[27]
  i632.billboardsFaceCameraPosition = !!i633[28]
  i632.shadowNearPlaneOffset = i633[29]
  i632.streamingMipmapsMemoryBudget = i633[30]
  i632.maximumLODLevel = i633[31]
  i632.streamingMipmapsAddAllCameras = !!i633[32]
  i632.streamingMipmapsMaxLevelReduction = i633[33]
  i632.streamingMipmapsRenderersPerFrame = i633[34]
  i632.resolutionScalingFixedDPIFactor = i633[35]
  i632.streamingMipmapsMaxFileIORequests = i633[36]
  i632.currentQualityLevel = i633[37]
  return i632
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"28":[29],"30":[29],"31":[29],"32":[29],"33":[29],"34":[29],"35":[19],"36":[1],"37":[38],"39":[38],"40":[38],"41":[38],"42":[38],"43":[38],"44":[45],"46":[45],"47":[45],"48":[45],"49":[45],"50":[45],"51":[45],"52":[45],"53":[45],"54":[45],"55":[45],"56":[45],"57":[45],"58":[1],"16":[15],"59":[60],"61":[60],"62":[9],"63":[9],"64":[15,9],"65":[9,10],"66":[9],"67":[10,9],"68":[15],"69":[10,9],"70":[9],"71":[9],"72":[9],"73":[62],"74":[10,9],"75":[9],"76":[62],"77":[9],"78":[9],"79":[9],"80":[9],"81":[9],"82":[9],"83":[9],"84":[9],"85":[9],"86":[10,9],"87":[9],"88":[9],"89":[9],"90":[9],"12":[10,9],"91":[9],"92":[93],"94":[93],"95":[93],"96":[93],"97":[1],"98":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","UnityEngine.AudioClip","UnityEngine.TextAsset","UnityEngine.GameObject","UnityEngine.AnimationClip","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "1.0";

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

Deserializers.isRuntimeAnalysisEnabledForCode = "True";

Deserializers.runtimeAnalysisExcludedClassesCount = "1737";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4298";

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

Deserializers.buildID = "ca59a568-0f11-4026-a0d9-e108a3760a40";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEditor","Recorder","RecorderWindow","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"]],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

