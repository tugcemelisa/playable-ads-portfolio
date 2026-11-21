var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i2340 = root || request.c( 'UnityEngine.JointSpring' )
  var i2341 = data
  i2340.spring = i2341[0]
  i2340.damper = i2341[1]
  i2340.targetPosition = i2341[2]
  return i2340
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i2342 = root || request.c( 'UnityEngine.JointMotor' )
  var i2343 = data
  i2342.m_TargetVelocity = i2343[0]
  i2342.m_Force = i2343[1]
  i2342.m_FreeSpin = i2343[2]
  return i2342
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i2344 = root || request.c( 'UnityEngine.JointLimits' )
  var i2345 = data
  i2344.m_Min = i2345[0]
  i2344.m_Max = i2345[1]
  i2344.m_Bounciness = i2345[2]
  i2344.m_BounceMinVelocity = i2345[3]
  i2344.m_ContactDistance = i2345[4]
  i2344.minBounce = i2345[5]
  i2344.maxBounce = i2345[6]
  return i2344
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i2346 = root || request.c( 'UnityEngine.JointDrive' )
  var i2347 = data
  i2346.m_PositionSpring = i2347[0]
  i2346.m_PositionDamper = i2347[1]
  i2346.m_MaximumForce = i2347[2]
  i2346.m_UseAcceleration = i2347[3]
  return i2346
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i2348 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i2349 = data
  i2348.m_Spring = i2349[0]
  i2348.m_Damper = i2349[1]
  return i2348
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i2350 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i2351 = data
  i2350.m_Limit = i2351[0]
  i2350.m_Bounciness = i2351[1]
  i2350.m_ContactDistance = i2351[2]
  return i2350
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i2352 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i2353 = data
  i2352.m_ExtremumSlip = i2353[0]
  i2352.m_ExtremumValue = i2353[1]
  i2352.m_AsymptoteSlip = i2353[2]
  i2352.m_AsymptoteValue = i2353[3]
  i2352.m_Stiffness = i2353[4]
  return i2352
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i2354 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i2355 = data
  i2354.m_LowerAngle = i2355[0]
  i2354.m_UpperAngle = i2355[1]
  return i2354
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i2356 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i2357 = data
  i2356.m_MotorSpeed = i2357[0]
  i2356.m_MaximumMotorTorque = i2357[1]
  return i2356
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i2358 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i2359 = data
  i2358.m_DampingRatio = i2359[0]
  i2358.m_Frequency = i2359[1]
  i2358.m_Angle = i2359[2]
  return i2358
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i2360 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i2361 = data
  i2360.m_LowerTranslation = i2361[0]
  i2360.m_UpperTranslation = i2361[1]
  return i2360
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i2362 = root || new pc.UnityMaterial()
  var i2363 = data
  i2362.name = i2363[0]
  request.r(i2363[1], i2363[2], 0, i2362, 'shader')
  i2362.renderQueue = i2363[3]
  i2362.enableInstancing = !!i2363[4]
  var i2365 = i2363[5]
  var i2364 = []
  for(var i = 0; i < i2365.length; i += 1) {
    i2364.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i2365[i + 0]) );
  }
  i2362.floatParameters = i2364
  var i2367 = i2363[6]
  var i2366 = []
  for(var i = 0; i < i2367.length; i += 1) {
    i2366.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i2367[i + 0]) );
  }
  i2362.colorParameters = i2366
  var i2369 = i2363[7]
  var i2368 = []
  for(var i = 0; i < i2369.length; i += 1) {
    i2368.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i2369[i + 0]) );
  }
  i2362.vectorParameters = i2368
  var i2371 = i2363[8]
  var i2370 = []
  for(var i = 0; i < i2371.length; i += 1) {
    i2370.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i2371[i + 0]) );
  }
  i2362.textureParameters = i2370
  var i2373 = i2363[9]
  var i2372 = []
  for(var i = 0; i < i2373.length; i += 1) {
    i2372.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i2373[i + 0]) );
  }
  i2362.materialFlags = i2372
  return i2362
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i2376 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i2377 = data
  i2376.name = i2377[0]
  i2376.value = i2377[1]
  return i2376
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i2380 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i2381 = data
  i2380.name = i2381[0]
  i2380.value = new pc.Color(i2381[1], i2381[2], i2381[3], i2381[4])
  return i2380
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i2384 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i2385 = data
  i2384.name = i2385[0]
  i2384.value = new pc.Vec4( i2385[1], i2385[2], i2385[3], i2385[4] )
  return i2384
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i2388 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i2389 = data
  i2388.name = i2389[0]
  request.r(i2389[1], i2389[2], 0, i2388, 'value')
  return i2388
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i2392 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i2393 = data
  i2392.name = i2393[0]
  i2392.enabled = !!i2393[1]
  return i2392
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i2394 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i2395 = data
  i2394.name = i2395[0]
  i2394.width = i2395[1]
  i2394.height = i2395[2]
  i2394.mipmapCount = i2395[3]
  i2394.anisoLevel = i2395[4]
  i2394.filterMode = i2395[5]
  i2394.hdr = !!i2395[6]
  i2394.format = i2395[7]
  i2394.wrapMode = i2395[8]
  i2394.alphaIsTransparency = !!i2395[9]
  i2394.alphaSource = i2395[10]
  i2394.graphicsFormat = i2395[11]
  i2394.sRGBTexture = !!i2395[12]
  i2394.desiredColorSpace = i2395[13]
  i2394.wrapU = i2395[14]
  i2394.wrapV = i2395[15]
  return i2394
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i2396 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i2397 = data
  i2396.name = i2397[0]
  i2396.atlasId = i2397[1]
  i2396.mipmapCount = i2397[2]
  i2396.hdr = !!i2397[3]
  i2396.size = i2397[4]
  i2396.anisoLevel = i2397[5]
  i2396.filterMode = i2397[6]
  var i2399 = i2397[7]
  var i2398 = []
  for(var i = 0; i < i2399.length; i += 4) {
    i2398.push( UnityEngine.Rect.MinMaxRect(i2399[i + 0], i2399[i + 1], i2399[i + 2], i2399[i + 3]) );
  }
  i2396.rects = i2398
  i2396.wrapU = i2397[8]
  i2396.wrapV = i2397[9]
  return i2396
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i2402 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i2403 = data
  i2402.name = i2403[0]
  i2402.index = i2403[1]
  i2402.startup = !!i2403[2]
  return i2402
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i2404 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i2405 = data
  i2404.aspect = i2405[0]
  i2404.orthographic = !!i2405[1]
  i2404.orthographicSize = i2405[2]
  i2404.backgroundColor = new pc.Color(i2405[3], i2405[4], i2405[5], i2405[6])
  i2404.nearClipPlane = i2405[7]
  i2404.farClipPlane = i2405[8]
  i2404.fieldOfView = i2405[9]
  i2404.depth = i2405[10]
  i2404.clearFlags = i2405[11]
  i2404.cullingMask = i2405[12]
  i2404.rect = i2405[13]
  request.r(i2405[14], i2405[15], 0, i2404, 'targetTexture')
  i2404.usePhysicalProperties = !!i2405[16]
  i2404.focalLength = i2405[17]
  i2404.sensorSize = new pc.Vec2( i2405[18], i2405[19] )
  i2404.lensShift = new pc.Vec2( i2405[20], i2405[21] )
  i2404.gateFit = i2405[22]
  i2404.commandBufferCount = i2405[23]
  i2404.cameraType = i2405[24]
  i2404.enabled = !!i2405[25]
  return i2404
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i2406 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i2407 = data
  i2406.name = i2407[0]
  i2406.tagId = i2407[1]
  i2406.enabled = !!i2407[2]
  i2406.isStatic = !!i2407[3]
  i2406.layer = i2407[4]
  return i2406
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i2408 = root || request.c( 'MobControlAd.MobControlGame' )
  var i2409 = data
  i2408.fireRate = i2409[0]
  i2408.yellowBlockStartHp = i2409[1]
  i2408.enemyBaseStartHp = i2409[2]
  i2408.ctaText = i2409[3]
  return i2408
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i2410 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i2411 = data
  i2410.type = i2411[0]
  i2410.color = new pc.Color(i2411[1], i2411[2], i2411[3], i2411[4])
  i2410.cullingMask = i2411[5]
  i2410.intensity = i2411[6]
  i2410.range = i2411[7]
  i2410.spotAngle = i2411[8]
  i2410.shadows = i2411[9]
  i2410.shadowNormalBias = i2411[10]
  i2410.shadowBias = i2411[11]
  i2410.shadowStrength = i2411[12]
  i2410.shadowResolution = i2411[13]
  i2410.lightmapBakeType = i2411[14]
  i2410.renderMode = i2411[15]
  request.r(i2411[16], i2411[17], 0, i2410, 'cookie')
  i2410.cookieSize = i2411[18]
  i2410.shadowNearPlane = i2411[19]
  i2410.occlusionMaskChannel = i2411[20]
  i2410.isBaked = !!i2411[21]
  i2410.mixedLightingMode = i2411[22]
  i2410.enabled = !!i2411[23]
  return i2410
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i2412 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i2413 = data
  i2412.ambientIntensity = i2413[0]
  i2412.reflectionIntensity = i2413[1]
  i2412.ambientMode = i2413[2]
  i2412.ambientLight = new pc.Color(i2413[3], i2413[4], i2413[5], i2413[6])
  i2412.ambientSkyColor = new pc.Color(i2413[7], i2413[8], i2413[9], i2413[10])
  i2412.ambientGroundColor = new pc.Color(i2413[11], i2413[12], i2413[13], i2413[14])
  i2412.ambientEquatorColor = new pc.Color(i2413[15], i2413[16], i2413[17], i2413[18])
  i2412.fogColor = new pc.Color(i2413[19], i2413[20], i2413[21], i2413[22])
  i2412.fogEndDistance = i2413[23]
  i2412.fogStartDistance = i2413[24]
  i2412.fogDensity = i2413[25]
  i2412.fog = !!i2413[26]
  request.r(i2413[27], i2413[28], 0, i2412, 'skybox')
  i2412.fogMode = i2413[29]
  var i2415 = i2413[30]
  var i2414 = []
  for(var i = 0; i < i2415.length; i += 1) {
    i2414.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i2415[i + 0]) );
  }
  i2412.lightmaps = i2414
  i2412.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i2413[31], i2412.lightProbes)
  i2412.lightmapsMode = i2413[32]
  i2412.mixedBakeMode = i2413[33]
  i2412.environmentLightingMode = i2413[34]
  i2412.ambientProbe = new pc.SphericalHarmonicsL2(i2413[35])
  request.r(i2413[36], i2413[37], 0, i2412, 'customReflection')
  request.r(i2413[38], i2413[39], 0, i2412, 'defaultReflection')
  i2412.defaultReflectionMode = i2413[40]
  i2412.defaultReflectionResolution = i2413[41]
  i2412.sunLightObjectId = i2413[42]
  i2412.pixelLightCount = i2413[43]
  i2412.defaultReflectionHDR = !!i2413[44]
  i2412.hasLightDataAsset = !!i2413[45]
  i2412.hasManualGenerate = !!i2413[46]
  return i2412
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i2418 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i2419 = data
  request.r(i2419[0], i2419[1], 0, i2418, 'lightmapColor')
  request.r(i2419[2], i2419[3], 0, i2418, 'lightmapDirection')
  request.r(i2419[4], i2419[5], 0, i2418, 'shadowMask')
  return i2418
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i2420 = root || new UnityEngine.LightProbes()
  var i2421 = data
  return i2420
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i2428 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i2429 = data
  i2428.pivot = new pc.Vec2( i2429[0], i2429[1] )
  i2428.anchorMin = new pc.Vec2( i2429[2], i2429[3] )
  i2428.anchorMax = new pc.Vec2( i2429[4], i2429[5] )
  i2428.sizeDelta = new pc.Vec2( i2429[6], i2429[7] )
  i2428.anchoredPosition3D = new pc.Vec3( i2429[8], i2429[9], i2429[10] )
  i2428.rotation = new pc.Quat(i2429[11], i2429[12], i2429[13], i2429[14])
  i2428.scale = new pc.Vec3( i2429[15], i2429[16], i2429[17] )
  return i2428
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i2430 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i2431 = data
  i2430.cullTransparentMesh = !!i2431[0]
  return i2430
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i2432 = root || request.c( 'UnityEngine.UI.Text' )
  var i2433 = data
  i2432.m_FontData = request.d('UnityEngine.UI.FontData', i2433[0], i2432.m_FontData)
  i2432.m_Text = i2433[1]
  request.r(i2433[2], i2433[3], 0, i2432, 'm_Material')
  i2432.m_Maskable = !!i2433[4]
  i2432.m_Color = new pc.Color(i2433[5], i2433[6], i2433[7], i2433[8])
  i2432.m_RaycastTarget = !!i2433[9]
  i2432.m_RaycastPadding = new pc.Vec4( i2433[10], i2433[11], i2433[12], i2433[13] )
  return i2432
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i2434 = root || request.c( 'UnityEngine.UI.FontData' )
  var i2435 = data
  request.r(i2435[0], i2435[1], 0, i2434, 'm_Font')
  i2434.m_FontSize = i2435[2]
  i2434.m_FontStyle = i2435[3]
  i2434.m_BestFit = !!i2435[4]
  i2434.m_MinSize = i2435[5]
  i2434.m_MaxSize = i2435[6]
  i2434.m_Alignment = i2435[7]
  i2434.m_AlignByGeometry = !!i2435[8]
  i2434.m_RichText = !!i2435[9]
  i2434.m_HorizontalOverflow = i2435[10]
  i2434.m_VerticalOverflow = i2435[11]
  i2434.m_LineSpacing = i2435[12]
  return i2434
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i2436 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i2437 = data
  i2436.position = new pc.Vec3( i2437[0], i2437[1], i2437[2] )
  i2436.scale = new pc.Vec3( i2437[3], i2437[4], i2437[5] )
  i2436.rotation = new pc.Quat(i2437[6], i2437[7], i2437[8], i2437[9])
  return i2436
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i2438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i2439 = data
  request.r(i2439[0], i2439[1], 0, i2438, 'additionalVertexStreams')
  i2438.enabled = !!i2439[2]
  request.r(i2439[3], i2439[4], 0, i2438, 'sharedMaterial')
  var i2441 = i2439[5]
  var i2440 = []
  for(var i = 0; i < i2441.length; i += 2) {
  request.r(i2441[i + 0], i2441[i + 1], 2, i2440, '')
  }
  i2438.sharedMaterials = i2440
  i2438.receiveShadows = !!i2439[6]
  i2438.shadowCastingMode = i2439[7]
  i2438.sortingLayerID = i2439[8]
  i2438.sortingOrder = i2439[9]
  i2438.lightmapIndex = i2439[10]
  i2438.lightmapSceneIndex = i2439[11]
  i2438.lightmapScaleOffset = new pc.Vec4( i2439[12], i2439[13], i2439[14], i2439[15] )
  i2438.lightProbeUsage = i2439[16]
  i2438.reflectionProbeUsage = i2439[17]
  return i2438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i2444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i2445 = data
  i2444.m_Alignment = i2445[0]
  i2444.m_Anchor = i2445[1]
  i2444.m_CharacterSize = i2445[2]
  request.r(i2445[3], i2445[4], 0, i2444, 'm_Font')
  i2444.m_FontSize = i2445[5]
  i2444.m_FontStyle = i2445[6]
  i2444.m_LineSpacing = i2445[7]
  i2444.m_OffsetZ = i2445[8]
  i2444.m_RichText = !!i2445[9]
  i2444.m_TabSize = i2445[10]
  i2444.m_Text = i2445[11]
  return i2444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i2446 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i2447 = data
  request.r(i2447[0], i2447[1], 0, i2446, 'sharedMesh')
  return i2446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i2448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i2449 = data
  i2448.name = i2449[0]
  i2448.halfPrecision = !!i2449[1]
  i2448.useSimplification = !!i2449[2]
  i2448.useUInt32IndexFormat = !!i2449[3]
  i2448.vertexCount = i2449[4]
  i2448.aabb = i2449[5]
  var i2451 = i2449[6]
  var i2450 = []
  for(var i = 0; i < i2451.length; i += 1) {
    i2450.push( !!i2451[i + 0] );
  }
  i2448.streams = i2450
  i2448.vertices = i2449[7]
  var i2453 = i2449[8]
  var i2452 = []
  for(var i = 0; i < i2453.length; i += 1) {
    i2452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i2453[i + 0]) );
  }
  i2448.subMeshes = i2452
  var i2455 = i2449[9]
  var i2454 = []
  for(var i = 0; i < i2455.length; i += 16) {
    i2454.push( new pc.Mat4().setData(i2455[i + 0], i2455[i + 1], i2455[i + 2], i2455[i + 3],  i2455[i + 4], i2455[i + 5], i2455[i + 6], i2455[i + 7],  i2455[i + 8], i2455[i + 9], i2455[i + 10], i2455[i + 11],  i2455[i + 12], i2455[i + 13], i2455[i + 14], i2455[i + 15]) );
  }
  i2448.bindposes = i2454
  var i2457 = i2449[10]
  var i2456 = []
  for(var i = 0; i < i2457.length; i += 1) {
    i2456.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i2457[i + 0]) );
  }
  i2448.blendShapes = i2456
  return i2448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i2462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i2463 = data
  i2462.triangles = i2463[0]
  return i2462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i2468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i2469 = data
  i2468.name = i2469[0]
  var i2471 = i2469[1]
  var i2470 = []
  for(var i = 0; i < i2471.length; i += 1) {
    i2470.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i2471[i + 0]) );
  }
  i2468.frames = i2470
  return i2468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i2472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i2473 = data
  request.r(i2473[0], i2473[1], 0, i2472, 'sharedMesh')
  var i2475 = i2473[2]
  var i2474 = []
  for(var i = 0; i < i2475.length; i += 2) {
  request.r(i2475[i + 0], i2475[i + 1], 2, i2474, '')
  }
  i2472.bones = i2474
  i2472.updateWhenOffscreen = !!i2473[3]
  i2472.localBounds = i2473[4]
  request.r(i2473[5], i2473[6], 0, i2472, 'rootBone')
  var i2477 = i2473[7]
  var i2476 = []
  for(var i = 0; i < i2477.length; i += 1) {
    i2476.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i2477[i + 0]) );
  }
  i2472.blendShapesWeights = i2476
  i2472.enabled = !!i2473[8]
  request.r(i2473[9], i2473[10], 0, i2472, 'sharedMaterial')
  var i2479 = i2473[11]
  var i2478 = []
  for(var i = 0; i < i2479.length; i += 2) {
  request.r(i2479[i + 0], i2479[i + 1], 2, i2478, '')
  }
  i2472.sharedMaterials = i2478
  i2472.receiveShadows = !!i2473[12]
  i2472.shadowCastingMode = i2473[13]
  i2472.sortingLayerID = i2473[14]
  i2472.sortingOrder = i2473[15]
  i2472.lightmapIndex = i2473[16]
  i2472.lightmapSceneIndex = i2473[17]
  i2472.lightmapScaleOffset = new pc.Vec4( i2473[18], i2473[19], i2473[20], i2473[21] )
  i2472.lightProbeUsage = i2473[22]
  i2472.reflectionProbeUsage = i2473[23]
  return i2472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i2484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i2485 = data
  i2484.weight = i2485[0]
  return i2484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i2488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i2489 = data
  i2488.weight = i2489[0]
  i2488.vertices = i2489[1]
  i2488.normals = i2489[2]
  i2488.tangents = i2489[3]
  return i2488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i2490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i2491 = data
  i2490.center = new pc.Vec3( i2491[0], i2491[1], i2491[2] )
  i2490.radius = i2491[3]
  i2490.enabled = !!i2491[4]
  i2490.isTrigger = !!i2491[5]
  request.r(i2491[6], i2491[7], 0, i2490, 'material')
  return i2490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i2492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i2493 = data
  i2492.center = new pc.Vec3( i2493[0], i2493[1], i2493[2] )
  i2492.radius = i2493[3]
  i2492.height = i2493[4]
  i2492.direction = i2493[5]
  i2492.enabled = !!i2493[6]
  i2492.isTrigger = !!i2493[7]
  request.r(i2493[8], i2493[9], 0, i2492, 'material')
  return i2492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i2494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i2495 = data
  i2494.center = new pc.Vec3( i2495[0], i2495[1], i2495[2] )
  i2494.size = new pc.Vec3( i2495[3], i2495[4], i2495[5] )
  i2494.enabled = !!i2495[6]
  i2494.isTrigger = !!i2495[7]
  request.r(i2495[8], i2495[9], 0, i2494, 'material')
  return i2494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i2496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i2497 = data
  request.r(i2497[0], i2497[1], 0, i2496, 'sharedMesh')
  i2496.convex = !!i2497[2]
  i2496.enabled = !!i2497[3]
  i2496.isTrigger = !!i2497[4]
  request.r(i2497[5], i2497[6], 0, i2496, 'material')
  return i2496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i2498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i2499 = data
  var i2501 = i2499[0]
  var i2500 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i2501.length; i += 1) {
    i2500.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i2501[i + 0]));
  }
  i2498.ShaderCompilationErrors = i2500
  i2498.name = i2499[1]
  i2498.guid = i2499[2]
  var i2503 = i2499[3]
  var i2502 = []
  for(var i = 0; i < i2503.length; i += 1) {
    i2502.push( i2503[i + 0] );
  }
  i2498.shaderDefinedKeywords = i2502
  var i2505 = i2499[4]
  var i2504 = []
  for(var i = 0; i < i2505.length; i += 1) {
    i2504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i2505[i + 0]) );
  }
  i2498.passes = i2504
  var i2507 = i2499[5]
  var i2506 = []
  for(var i = 0; i < i2507.length; i += 1) {
    i2506.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i2507[i + 0]) );
  }
  i2498.usePasses = i2506
  var i2509 = i2499[6]
  var i2508 = []
  for(var i = 0; i < i2509.length; i += 1) {
    i2508.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i2509[i + 0]) );
  }
  i2498.defaultParameterValues = i2508
  request.r(i2499[7], i2499[8], 0, i2498, 'unityFallbackShader')
  i2498.readDepth = !!i2499[9]
  i2498.hasDepthOnlyPass = !!i2499[10]
  i2498.isCreatedByShaderGraph = !!i2499[11]
  i2498.disableBatching = !!i2499[12]
  i2498.compiled = !!i2499[13]
  return i2498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i2512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i2513 = data
  i2512.shaderName = i2513[0]
  i2512.errorMessage = i2513[1]
  return i2512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i2518 = root || new pc.UnityShaderPass()
  var i2519 = data
  i2518.id = i2519[0]
  i2518.subShaderIndex = i2519[1]
  i2518.name = i2519[2]
  i2518.passType = i2519[3]
  i2518.grabPassTextureName = i2519[4]
  i2518.usePass = !!i2519[5]
  i2518.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[6], i2518.zTest)
  i2518.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[7], i2518.zWrite)
  i2518.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[8], i2518.culling)
  i2518.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2519[9], i2518.blending)
  i2518.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i2519[10], i2518.alphaBlending)
  i2518.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[11], i2518.colorWriteMask)
  i2518.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[12], i2518.offsetUnits)
  i2518.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[13], i2518.offsetFactor)
  i2518.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[14], i2518.stencilRef)
  i2518.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[15], i2518.stencilReadMask)
  i2518.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2519[16], i2518.stencilWriteMask)
  i2518.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2519[17], i2518.stencilOp)
  i2518.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2519[18], i2518.stencilOpFront)
  i2518.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i2519[19], i2518.stencilOpBack)
  var i2521 = i2519[20]
  var i2520 = []
  for(var i = 0; i < i2521.length; i += 1) {
    i2520.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i2521[i + 0]) );
  }
  i2518.tags = i2520
  var i2523 = i2519[21]
  var i2522 = []
  for(var i = 0; i < i2523.length; i += 1) {
    i2522.push( i2523[i + 0] );
  }
  i2518.passDefinedKeywords = i2522
  var i2525 = i2519[22]
  var i2524 = []
  for(var i = 0; i < i2525.length; i += 1) {
    i2524.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i2525[i + 0]) );
  }
  i2518.passDefinedKeywordGroups = i2524
  var i2527 = i2519[23]
  var i2526 = []
  for(var i = 0; i < i2527.length; i += 1) {
    i2526.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2527[i + 0]) );
  }
  i2518.variants = i2526
  var i2529 = i2519[24]
  var i2528 = []
  for(var i = 0; i < i2529.length; i += 1) {
    i2528.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i2529[i + 0]) );
  }
  i2518.excludedVariants = i2528
  i2518.hasDepthReader = !!i2519[25]
  return i2518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i2530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i2531 = data
  i2530.val = i2531[0]
  i2530.name = i2531[1]
  return i2530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i2532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i2533 = data
  i2532.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2533[0], i2532.src)
  i2532.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2533[1], i2532.dst)
  i2532.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2533[2], i2532.op)
  return i2532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i2534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i2535 = data
  i2534.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2535[0], i2534.pass)
  i2534.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2535[1], i2534.fail)
  i2534.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2535[2], i2534.zFail)
  i2534.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i2535[3], i2534.comp)
  return i2534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i2538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i2539 = data
  i2538.name = i2539[0]
  i2538.value = i2539[1]
  return i2538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i2542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i2543 = data
  var i2545 = i2543[0]
  var i2544 = []
  for(var i = 0; i < i2545.length; i += 1) {
    i2544.push( i2545[i + 0] );
  }
  i2542.keywords = i2544
  i2542.hasDiscard = !!i2543[1]
  return i2542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i2548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i2549 = data
  i2548.passId = i2549[0]
  i2548.subShaderIndex = i2549[1]
  var i2551 = i2549[2]
  var i2550 = []
  for(var i = 0; i < i2551.length; i += 1) {
    i2550.push( i2551[i + 0] );
  }
  i2548.keywords = i2550
  i2548.vertexProgram = i2549[3]
  i2548.fragmentProgram = i2549[4]
  i2548.exportedForWebGl2 = !!i2549[5]
  i2548.readDepth = !!i2549[6]
  return i2548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i2554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i2555 = data
  request.r(i2555[0], i2555[1], 0, i2554, 'shader')
  i2554.pass = i2555[2]
  return i2554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i2558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i2559 = data
  i2558.name = i2559[0]
  i2558.type = i2559[1]
  i2558.value = new pc.Vec4( i2559[2], i2559[3], i2559[4], i2559[5] )
  i2558.textureValue = i2559[6]
  i2558.shaderPropertyFlag = i2559[7]
  return i2558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i2560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i2561 = data
  i2560.name = i2561[0]
  return i2560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i2562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i2563 = data
  i2562.name = i2563[0]
  i2562.wrapMode = i2563[1]
  i2562.isLooping = !!i2563[2]
  i2562.length = i2563[3]
  var i2565 = i2563[4]
  var i2564 = []
  for(var i = 0; i < i2565.length; i += 1) {
    i2564.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i2565[i + 0]) );
  }
  i2562.curves = i2564
  var i2567 = i2563[5]
  var i2566 = []
  for(var i = 0; i < i2567.length; i += 1) {
    i2566.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i2567[i + 0]) );
  }
  i2562.events = i2566
  i2562.halfPrecision = !!i2563[6]
  i2562._frameRate = i2563[7]
  i2562.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i2563[8], i2562.localBounds)
  i2562.hasMuscleCurves = !!i2563[9]
  var i2569 = i2563[10]
  var i2568 = []
  for(var i = 0; i < i2569.length; i += 1) {
    i2568.push( i2569[i + 0] );
  }
  i2562.clipMuscleConstant = i2568
  i2562.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i2563[11], i2562.clipBindingConstant)
  return i2562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i2572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i2573 = data
  i2572.path = i2573[0]
  i2572.hash = i2573[1]
  i2572.componentType = i2573[2]
  i2572.property = i2573[3]
  i2572.keys = i2573[4]
  var i2575 = i2573[5]
  var i2574 = []
  for(var i = 0; i < i2575.length; i += 1) {
    i2574.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i2575[i + 0]) );
  }
  i2572.objectReferenceKeys = i2574
  return i2572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i2578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i2579 = data
  i2578.time = i2579[0]
  request.r(i2579[1], i2579[2], 0, i2578, 'value')
  return i2578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i2582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i2583 = data
  i2582.functionName = i2583[0]
  i2582.floatParameter = i2583[1]
  i2582.intParameter = i2583[2]
  i2582.stringParameter = i2583[3]
  request.r(i2583[4], i2583[5], 0, i2582, 'objectReferenceParameter')
  i2582.time = i2583[6]
  return i2582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i2584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i2585 = data
  i2584.center = new pc.Vec3( i2585[0], i2585[1], i2585[2] )
  i2584.extends = new pc.Vec3( i2585[3], i2585[4], i2585[5] )
  return i2584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i2588 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i2589 = data
  var i2591 = i2589[0]
  var i2590 = []
  for(var i = 0; i < i2591.length; i += 1) {
    i2590.push( i2591[i + 0] );
  }
  i2588.genericBindings = i2590
  var i2593 = i2589[1]
  var i2592 = []
  for(var i = 0; i < i2593.length; i += 1) {
    i2592.push( i2593[i + 0] );
  }
  i2588.pptrCurveMapping = i2592
  return i2588
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i2594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i2595 = data
  i2594.name = i2595[0]
  i2594.ascent = i2595[1]
  i2594.originalLineHeight = i2595[2]
  i2594.fontSize = i2595[3]
  var i2597 = i2595[4]
  var i2596 = []
  for(var i = 0; i < i2597.length; i += 1) {
    i2596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i2597[i + 0]) );
  }
  i2594.characterInfo = i2596
  request.r(i2595[5], i2595[6], 0, i2594, 'texture')
  i2594.originalFontSize = i2595[7]
  return i2594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i2600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i2601 = data
  i2600.index = i2601[0]
  i2600.advance = i2601[1]
  i2600.bearing = i2601[2]
  i2600.glyphWidth = i2601[3]
  i2600.glyphHeight = i2601[4]
  i2600.minX = i2601[5]
  i2600.maxX = i2601[6]
  i2600.minY = i2601[7]
  i2600.maxY = i2601[8]
  i2600.uvBottomLeftX = i2601[9]
  i2600.uvBottomLeftY = i2601[10]
  i2600.uvBottomRightX = i2601[11]
  i2600.uvBottomRightY = i2601[12]
  i2600.uvTopLeftX = i2601[13]
  i2600.uvTopLeftY = i2601[14]
  i2600.uvTopRightX = i2601[15]
  i2600.uvTopRightY = i2601[16]
  return i2600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i2602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i2603 = data
  i2602.name = i2603[0]
  i2602.bytes64 = i2603[1]
  i2602.data = i2603[2]
  return i2602
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i2604 = root || request.c( 'TMPro.TMP_Settings' )
  var i2605 = data
  i2604.assetVersion = i2605[0]
  i2604.m_TextWrappingMode = i2605[1]
  i2604.m_enableKerning = !!i2605[2]
  var i2607 = i2605[3]
  var i2606 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i2607.length; i += 1) {
    i2606.add(i2607[i + 0]);
  }
  i2604.m_ActiveFontFeatures = i2606
  i2604.m_enableExtraPadding = !!i2605[4]
  i2604.m_enableTintAllSprites = !!i2605[5]
  i2604.m_enableParseEscapeCharacters = !!i2605[6]
  i2604.m_EnableRaycastTarget = !!i2605[7]
  i2604.m_GetFontFeaturesAtRuntime = !!i2605[8]
  i2604.m_missingGlyphCharacter = i2605[9]
  i2604.m_ClearDynamicDataOnBuild = !!i2605[10]
  i2604.m_warningsDisabled = !!i2605[11]
  request.r(i2605[12], i2605[13], 0, i2604, 'm_defaultFontAsset')
  i2604.m_defaultFontAssetPath = i2605[14]
  i2604.m_defaultFontSize = i2605[15]
  i2604.m_defaultAutoSizeMinRatio = i2605[16]
  i2604.m_defaultAutoSizeMaxRatio = i2605[17]
  i2604.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i2605[18], i2605[19] )
  i2604.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i2605[20], i2605[21] )
  i2604.m_autoSizeTextContainer = !!i2605[22]
  i2604.m_IsTextObjectScaleStatic = !!i2605[23]
  var i2609 = i2605[24]
  var i2608 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2609.length; i += 2) {
  request.r(i2609[i + 0], i2609[i + 1], 1, i2608, '')
  }
  i2604.m_fallbackFontAssets = i2608
  i2604.m_matchMaterialPreset = !!i2605[25]
  i2604.m_HideSubTextObjects = !!i2605[26]
  request.r(i2605[27], i2605[28], 0, i2604, 'm_defaultSpriteAsset')
  i2604.m_defaultSpriteAssetPath = i2605[29]
  i2604.m_enableEmojiSupport = !!i2605[30]
  i2604.m_MissingCharacterSpriteUnicode = i2605[31]
  var i2611 = i2605[32]
  var i2610 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i2611.length; i += 2) {
  request.r(i2611[i + 0], i2611[i + 1], 1, i2610, '')
  }
  i2604.m_EmojiFallbackTextAssets = i2610
  i2604.m_defaultColorGradientPresetsPath = i2605[33]
  request.r(i2605[34], i2605[35], 0, i2604, 'm_defaultStyleSheet')
  i2604.m_StyleSheetsResourcePath = i2605[36]
  request.r(i2605[37], i2605[38], 0, i2604, 'm_leadingCharacters')
  request.r(i2605[39], i2605[40], 0, i2604, 'm_followingCharacters')
  i2604.m_UseModernHangulLineBreakingRules = !!i2605[41]
  return i2604
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i2618 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i2619 = data
  i2618.normalStyle = i2619[0]
  i2618.normalSpacingOffset = i2619[1]
  i2618.boldStyle = i2619[2]
  i2618.boldSpacing = i2619[3]
  i2618.italicStyle = i2619[4]
  i2618.tabSize = i2619[5]
  request.r(i2619[6], i2619[7], 0, i2618, 'atlas')
  i2618.m_SourceFontFileGUID = i2619[8]
  i2618.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i2619[9], i2618.m_CreationSettings)
  request.r(i2619[10], i2619[11], 0, i2618, 'm_SourceFontFile')
  i2618.m_SourceFontFilePath = i2619[12]
  i2618.m_AtlasPopulationMode = i2619[13]
  i2618.InternalDynamicOS = !!i2619[14]
  var i2621 = i2619[15]
  var i2620 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i2621.length; i += 1) {
    i2620.add(request.d('UnityEngine.TextCore.Glyph', i2621[i + 0]));
  }
  i2618.m_GlyphTable = i2620
  var i2623 = i2619[16]
  var i2622 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i2623.length; i += 1) {
    i2622.add(request.d('TMPro.TMP_Character', i2623[i + 0]));
  }
  i2618.m_CharacterTable = i2622
  var i2625 = i2619[17]
  var i2624 = []
  for(var i = 0; i < i2625.length; i += 2) {
  request.r(i2625[i + 0], i2625[i + 1], 2, i2624, '')
  }
  i2618.m_AtlasTextures = i2624
  i2618.m_AtlasTextureIndex = i2619[18]
  i2618.m_IsMultiAtlasTexturesEnabled = !!i2619[19]
  i2618.m_GetFontFeatures = !!i2619[20]
  i2618.m_ClearDynamicDataOnBuild = !!i2619[21]
  i2618.m_AtlasWidth = i2619[22]
  i2618.m_AtlasHeight = i2619[23]
  i2618.m_AtlasPadding = i2619[24]
  i2618.m_AtlasRenderMode = i2619[25]
  var i2627 = i2619[26]
  var i2626 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2627.length; i += 1) {
    i2626.add(request.d('UnityEngine.TextCore.GlyphRect', i2627[i + 0]));
  }
  i2618.m_UsedGlyphRects = i2626
  var i2629 = i2619[27]
  var i2628 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i2629.length; i += 1) {
    i2628.add(request.d('UnityEngine.TextCore.GlyphRect', i2629[i + 0]));
  }
  i2618.m_FreeGlyphRects = i2628
  i2618.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i2619[28], i2618.m_FontFeatureTable)
  i2618.m_ShouldReimportFontFeatures = !!i2619[29]
  var i2631 = i2619[30]
  var i2630 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2631.length; i += 2) {
  request.r(i2631[i + 0], i2631[i + 1], 1, i2630, '')
  }
  i2618.m_FallbackFontAssetTable = i2630
  var i2633 = i2619[31]
  var i2632 = []
  for(var i = 0; i < i2633.length; i += 1) {
    i2632.push( request.d('TMPro.TMP_FontWeightPair', i2633[i + 0]) );
  }
  i2618.m_FontWeightTable = i2632
  var i2635 = i2619[32]
  var i2634 = []
  for(var i = 0; i < i2635.length; i += 1) {
    i2634.push( request.d('TMPro.TMP_FontWeightPair', i2635[i + 0]) );
  }
  i2618.fontWeights = i2634
  i2618.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i2619[33], i2618.m_fontInfo)
  var i2637 = i2619[34]
  var i2636 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i2637.length; i += 1) {
    i2636.add(request.d('TMPro.TMP_Glyph', i2637[i + 0]));
  }
  i2618.m_glyphInfoList = i2636
  i2618.m_KerningTable = request.d('TMPro.KerningTable', i2619[35], i2618.m_KerningTable)
  var i2639 = i2619[36]
  var i2638 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i2639.length; i += 2) {
  request.r(i2639[i + 0], i2639[i + 1], 1, i2638, '')
  }
  i2618.fallbackFontAssets = i2638
  i2618.m_Version = i2619[37]
  i2618.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2619[38], i2618.m_FaceInfo)
  request.r(i2619[39], i2619[40], 0, i2618, 'm_Material')
  return i2618
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i2640 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i2641 = data
  i2640.sourceFontFileName = i2641[0]
  i2640.sourceFontFileGUID = i2641[1]
  i2640.faceIndex = i2641[2]
  i2640.pointSizeSamplingMode = i2641[3]
  i2640.pointSize = i2641[4]
  i2640.padding = i2641[5]
  i2640.paddingMode = i2641[6]
  i2640.packingMode = i2641[7]
  i2640.atlasWidth = i2641[8]
  i2640.atlasHeight = i2641[9]
  i2640.characterSetSelectionMode = i2641[10]
  i2640.characterSequence = i2641[11]
  i2640.referencedFontAssetGUID = i2641[12]
  i2640.referencedTextAssetGUID = i2641[13]
  i2640.fontStyle = i2641[14]
  i2640.fontStyleModifier = i2641[15]
  i2640.renderMode = i2641[16]
  i2640.includeFontFeatures = !!i2641[17]
  return i2640
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i2644 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i2645 = data
  i2644.m_Index = i2645[0]
  i2644.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2645[1], i2644.m_Metrics)
  i2644.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2645[2], i2644.m_GlyphRect)
  i2644.m_Scale = i2645[3]
  i2644.m_AtlasIndex = i2645[4]
  i2644.m_ClassDefinitionType = i2645[5]
  return i2644
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i2646 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i2647 = data
  i2646.m_Width = i2647[0]
  i2646.m_Height = i2647[1]
  i2646.m_HorizontalBearingX = i2647[2]
  i2646.m_HorizontalBearingY = i2647[3]
  i2646.m_HorizontalAdvance = i2647[4]
  return i2646
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i2648 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i2649 = data
  i2648.m_X = i2649[0]
  i2648.m_Y = i2649[1]
  i2648.m_Width = i2649[2]
  i2648.m_Height = i2649[3]
  return i2648
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i2652 = root || request.c( 'TMPro.TMP_Character' )
  var i2653 = data
  i2652.m_ElementType = i2653[0]
  i2652.m_Unicode = i2653[1]
  i2652.m_GlyphIndex = i2653[2]
  i2652.m_Scale = i2653[3]
  return i2652
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i2658 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i2659 = data
  var i2661 = i2659[0]
  var i2660 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i2661.length; i += 1) {
    i2660.add(request.d('TMPro.MultipleSubstitutionRecord', i2661[i + 0]));
  }
  i2658.m_MultipleSubstitutionRecords = i2660
  var i2663 = i2659[1]
  var i2662 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i2663.length; i += 1) {
    i2662.add(request.d('TMPro.LigatureSubstitutionRecord', i2663[i + 0]));
  }
  i2658.m_LigatureSubstitutionRecords = i2662
  var i2665 = i2659[2]
  var i2664 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i2665.length; i += 1) {
    i2664.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i2665[i + 0]));
  }
  i2658.m_GlyphPairAdjustmentRecords = i2664
  var i2667 = i2659[3]
  var i2666 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i2667.length; i += 1) {
    i2666.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i2667[i + 0]));
  }
  i2658.m_MarkToBaseAdjustmentRecords = i2666
  var i2669 = i2659[4]
  var i2668 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i2669.length; i += 1) {
    i2668.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i2669[i + 0]));
  }
  i2658.m_MarkToMarkAdjustmentRecords = i2668
  return i2658
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i2672 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i2673 = data
  i2672.m_TargetGlyphID = i2673[0]
  i2672.m_SubstituteGlyphIDs = i2673[1]
  return i2672
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i2676 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i2677 = data
  i2676.m_ComponentGlyphIDs = i2677[0]
  i2676.m_LigatureGlyphID = i2677[1]
  return i2676
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i2680 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i2681 = data
  i2680.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2681[0], i2680.m_FirstAdjustmentRecord)
  i2680.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i2681[1], i2680.m_SecondAdjustmentRecord)
  i2680.m_FeatureLookupFlags = i2681[2]
  return i2680
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i2682 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i2683 = data
  i2682.m_GlyphIndex = i2683[0]
  i2682.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i2683[1], i2682.m_GlyphValueRecord)
  return i2682
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i2684 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i2685 = data
  i2684.m_XPlacement = i2685[0]
  i2684.m_YPlacement = i2685[1]
  i2684.m_XAdvance = i2685[2]
  i2684.m_YAdvance = i2685[3]
  return i2684
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i2688 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i2689 = data
  i2688.m_BaseGlyphID = i2689[0]
  i2688.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2689[1], i2688.m_BaseGlyphAnchorPoint)
  i2688.m_MarkGlyphID = i2689[2]
  i2688.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2689[3], i2688.m_MarkPositionAdjustment)
  return i2688
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i2692 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i2693 = data
  i2692.m_BaseMarkGlyphID = i2693[0]
  i2692.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i2693[1], i2692.m_BaseMarkGlyphAnchorPoint)
  i2692.m_CombiningMarkGlyphID = i2693[2]
  i2692.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i2693[3], i2692.m_CombiningMarkPositionAdjustment)
  return i2692
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i2696 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i2697 = data
  request.r(i2697[0], i2697[1], 0, i2696, 'regularTypeface')
  request.r(i2697[2], i2697[3], 0, i2696, 'italicTypeface')
  return i2696
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i2698 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i2699 = data
  i2698.Name = i2699[0]
  i2698.PointSize = i2699[1]
  i2698.Scale = i2699[2]
  i2698.CharacterCount = i2699[3]
  i2698.LineHeight = i2699[4]
  i2698.Baseline = i2699[5]
  i2698.Ascender = i2699[6]
  i2698.CapHeight = i2699[7]
  i2698.Descender = i2699[8]
  i2698.CenterLine = i2699[9]
  i2698.SuperscriptOffset = i2699[10]
  i2698.SubscriptOffset = i2699[11]
  i2698.SubSize = i2699[12]
  i2698.Underline = i2699[13]
  i2698.UnderlineThickness = i2699[14]
  i2698.strikethrough = i2699[15]
  i2698.strikethroughThickness = i2699[16]
  i2698.TabWidth = i2699[17]
  i2698.Padding = i2699[18]
  i2698.AtlasWidth = i2699[19]
  i2698.AtlasHeight = i2699[20]
  return i2698
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i2702 = root || request.c( 'TMPro.TMP_Glyph' )
  var i2703 = data
  i2702.id = i2703[0]
  i2702.x = i2703[1]
  i2702.y = i2703[2]
  i2702.width = i2703[3]
  i2702.height = i2703[4]
  i2702.xOffset = i2703[5]
  i2702.yOffset = i2703[6]
  i2702.xAdvance = i2703[7]
  i2702.scale = i2703[8]
  return i2702
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i2704 = root || request.c( 'TMPro.KerningTable' )
  var i2705 = data
  var i2707 = i2705[0]
  var i2706 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i2707.length; i += 1) {
    i2706.add(request.d('TMPro.KerningPair', i2707[i + 0]));
  }
  i2704.kerningPairs = i2706
  return i2704
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i2710 = root || request.c( 'TMPro.KerningPair' )
  var i2711 = data
  i2710.xOffset = i2711[0]
  i2710.m_FirstGlyph = i2711[1]
  i2710.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2711[2], i2710.m_FirstGlyphAdjustments)
  i2710.m_SecondGlyph = i2711[3]
  i2710.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i2711[4], i2710.m_SecondGlyphAdjustments)
  i2710.m_IgnoreSpacingAdjustments = !!i2711[5]
  return i2710
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i2712 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i2713 = data
  i2712.m_FaceIndex = i2713[0]
  i2712.m_FamilyName = i2713[1]
  i2712.m_StyleName = i2713[2]
  i2712.m_PointSize = i2713[3]
  i2712.m_Scale = i2713[4]
  i2712.m_UnitsPerEM = i2713[5]
  i2712.m_LineHeight = i2713[6]
  i2712.m_AscentLine = i2713[7]
  i2712.m_CapLine = i2713[8]
  i2712.m_MeanLine = i2713[9]
  i2712.m_Baseline = i2713[10]
  i2712.m_DescentLine = i2713[11]
  i2712.m_SuperscriptOffset = i2713[12]
  i2712.m_SuperscriptSize = i2713[13]
  i2712.m_SubscriptOffset = i2713[14]
  i2712.m_SubscriptSize = i2713[15]
  i2712.m_UnderlineOffset = i2713[16]
  i2712.m_UnderlineThickness = i2713[17]
  i2712.m_StrikethroughOffset = i2713[18]
  i2712.m_StrikethroughThickness = i2713[19]
  i2712.m_TabWidth = i2713[20]
  return i2712
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i2714 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i2715 = data
  request.r(i2715[0], i2715[1], 0, i2714, 'spriteSheet')
  var i2717 = i2715[2]
  var i2716 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i2717.length; i += 1) {
    i2716.add(request.d('TMPro.TMP_Sprite', i2717[i + 0]));
  }
  i2714.spriteInfoList = i2716
  var i2719 = i2715[3]
  var i2718 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i2719.length; i += 2) {
  request.r(i2719[i + 0], i2719[i + 1], 1, i2718, '')
  }
  i2714.fallbackSpriteAssets = i2718
  var i2721 = i2715[4]
  var i2720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i2721.length; i += 1) {
    i2720.add(request.d('TMPro.TMP_SpriteCharacter', i2721[i + 0]));
  }
  i2714.m_SpriteCharacterTable = i2720
  var i2723 = i2715[5]
  var i2722 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i2723.length; i += 1) {
    i2722.add(request.d('TMPro.TMP_SpriteGlyph', i2723[i + 0]));
  }
  i2714.m_GlyphTable = i2722
  i2714.m_Version = i2715[6]
  i2714.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i2715[7], i2714.m_FaceInfo)
  request.r(i2715[8], i2715[9], 0, i2714, 'm_Material')
  return i2714
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i2726 = root || request.c( 'TMPro.TMP_Sprite' )
  var i2727 = data
  i2726.name = i2727[0]
  i2726.hashCode = i2727[1]
  i2726.unicode = i2727[2]
  i2726.pivot = new pc.Vec2( i2727[3], i2727[4] )
  request.r(i2727[5], i2727[6], 0, i2726, 'sprite')
  i2726.id = i2727[7]
  i2726.x = i2727[8]
  i2726.y = i2727[9]
  i2726.width = i2727[10]
  i2726.height = i2727[11]
  i2726.xOffset = i2727[12]
  i2726.yOffset = i2727[13]
  i2726.xAdvance = i2727[14]
  i2726.scale = i2727[15]
  return i2726
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i2732 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i2733 = data
  i2732.m_Name = i2733[0]
  i2732.m_ElementType = i2733[1]
  i2732.m_Unicode = i2733[2]
  i2732.m_GlyphIndex = i2733[3]
  i2732.m_Scale = i2733[4]
  return i2732
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i2736 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i2737 = data
  request.r(i2737[0], i2737[1], 0, i2736, 'sprite')
  i2736.m_Index = i2737[2]
  i2736.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i2737[3], i2736.m_Metrics)
  i2736.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i2737[4], i2736.m_GlyphRect)
  i2736.m_Scale = i2737[5]
  i2736.m_AtlasIndex = i2737[6]
  i2736.m_ClassDefinitionType = i2737[7]
  return i2736
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i2738 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i2739 = data
  var i2741 = i2739[0]
  var i2740 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i2741.length; i += 1) {
    i2740.add(request.d('TMPro.TMP_Style', i2741[i + 0]));
  }
  i2738.m_StyleList = i2740
  return i2738
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i2744 = root || request.c( 'TMPro.TMP_Style' )
  var i2745 = data
  i2744.m_Name = i2745[0]
  i2744.m_HashCode = i2745[1]
  i2744.m_OpeningDefinition = i2745[2]
  i2744.m_ClosingDefinition = i2745[3]
  i2744.m_OpeningTagArray = i2745[4]
  i2744.m_ClosingTagArray = i2745[5]
  return i2744
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i2746 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i2747 = data
  var i2749 = i2747[0]
  var i2748 = []
  for(var i = 0; i < i2749.length; i += 1) {
    i2748.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i2749[i + 0]) );
  }
  i2746.files = i2748
  i2746.componentToPrefabIds = i2747[1]
  return i2746
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i2752 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i2753 = data
  i2752.path = i2753[0]
  request.r(i2753[1], i2753[2], 0, i2752, 'unityObject')
  return i2752
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i2754 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i2755 = data
  var i2757 = i2755[0]
  var i2756 = []
  for(var i = 0; i < i2757.length; i += 1) {
    i2756.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i2757[i + 0]) );
  }
  i2754.scriptsExecutionOrder = i2756
  var i2759 = i2755[1]
  var i2758 = []
  for(var i = 0; i < i2759.length; i += 1) {
    i2758.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i2759[i + 0]) );
  }
  i2754.sortingLayers = i2758
  var i2761 = i2755[2]
  var i2760 = []
  for(var i = 0; i < i2761.length; i += 1) {
    i2760.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i2761[i + 0]) );
  }
  i2754.cullingLayers = i2760
  i2754.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i2755[3], i2754.timeSettings)
  i2754.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i2755[4], i2754.physicsSettings)
  i2754.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i2755[5], i2754.physics2DSettings)
  i2754.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2755[6], i2754.qualitySettings)
  i2754.enableRealtimeShadows = !!i2755[7]
  i2754.enableAutoInstancing = !!i2755[8]
  i2754.enableStaticBatching = !!i2755[9]
  i2754.enableDynamicBatching = !!i2755[10]
  i2754.usePreservativeDynamicBatching = !!i2755[11]
  i2754.lightmapEncodingQuality = i2755[12]
  i2754.desiredColorSpace = i2755[13]
  var i2763 = i2755[14]
  var i2762 = []
  for(var i = 0; i < i2763.length; i += 1) {
    i2762.push( i2763[i + 0] );
  }
  i2754.allTags = i2762
  return i2754
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i2766 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i2767 = data
  i2766.name = i2767[0]
  i2766.value = i2767[1]
  return i2766
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i2770 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i2771 = data
  i2770.id = i2771[0]
  i2770.name = i2771[1]
  i2770.value = i2771[2]
  return i2770
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i2774 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i2775 = data
  i2774.id = i2775[0]
  i2774.name = i2775[1]
  return i2774
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i2776 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i2777 = data
  i2776.fixedDeltaTime = i2777[0]
  i2776.maximumDeltaTime = i2777[1]
  i2776.timeScale = i2777[2]
  i2776.maximumParticleTimestep = i2777[3]
  return i2776
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i2778 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i2779 = data
  i2778.gravity = new pc.Vec3( i2779[0], i2779[1], i2779[2] )
  i2778.defaultSolverIterations = i2779[3]
  i2778.bounceThreshold = i2779[4]
  i2778.autoSyncTransforms = !!i2779[5]
  i2778.autoSimulation = !!i2779[6]
  var i2781 = i2779[7]
  var i2780 = []
  for(var i = 0; i < i2781.length; i += 1) {
    i2780.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i2781[i + 0]) );
  }
  i2778.collisionMatrix = i2780
  return i2778
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i2784 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i2785 = data
  i2784.enabled = !!i2785[0]
  i2784.layerId = i2785[1]
  i2784.otherLayerId = i2785[2]
  return i2784
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i2786 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i2787 = data
  request.r(i2787[0], i2787[1], 0, i2786, 'material')
  i2786.gravity = new pc.Vec2( i2787[2], i2787[3] )
  i2786.positionIterations = i2787[4]
  i2786.velocityIterations = i2787[5]
  i2786.velocityThreshold = i2787[6]
  i2786.maxLinearCorrection = i2787[7]
  i2786.maxAngularCorrection = i2787[8]
  i2786.maxTranslationSpeed = i2787[9]
  i2786.maxRotationSpeed = i2787[10]
  i2786.baumgarteScale = i2787[11]
  i2786.baumgarteTOIScale = i2787[12]
  i2786.timeToSleep = i2787[13]
  i2786.linearSleepTolerance = i2787[14]
  i2786.angularSleepTolerance = i2787[15]
  i2786.defaultContactOffset = i2787[16]
  i2786.autoSimulation = !!i2787[17]
  i2786.queriesHitTriggers = !!i2787[18]
  i2786.queriesStartInColliders = !!i2787[19]
  i2786.callbacksOnDisable = !!i2787[20]
  i2786.reuseCollisionCallbacks = !!i2787[21]
  i2786.autoSyncTransforms = !!i2787[22]
  var i2789 = i2787[23]
  var i2788 = []
  for(var i = 0; i < i2789.length; i += 1) {
    i2788.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i2789[i + 0]) );
  }
  i2786.collisionMatrix = i2788
  return i2786
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i2792 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i2793 = data
  i2792.enabled = !!i2793[0]
  i2792.layerId = i2793[1]
  i2792.otherLayerId = i2793[2]
  return i2792
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i2794 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i2795 = data
  var i2797 = i2795[0]
  var i2796 = []
  for(var i = 0; i < i2797.length; i += 1) {
    i2796.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i2797[i + 0]) );
  }
  i2794.qualityLevels = i2796
  var i2799 = i2795[1]
  var i2798 = []
  for(var i = 0; i < i2799.length; i += 1) {
    i2798.push( i2799[i + 0] );
  }
  i2794.names = i2798
  i2794.shadows = i2795[2]
  i2794.anisotropicFiltering = i2795[3]
  i2794.antiAliasing = i2795[4]
  i2794.lodBias = i2795[5]
  i2794.shadowCascades = i2795[6]
  i2794.shadowDistance = i2795[7]
  i2794.shadowmaskMode = i2795[8]
  i2794.shadowProjection = i2795[9]
  i2794.shadowResolution = i2795[10]
  i2794.softParticles = !!i2795[11]
  i2794.softVegetation = !!i2795[12]
  i2794.activeColorSpace = i2795[13]
  i2794.desiredColorSpace = i2795[14]
  i2794.masterTextureLimit = i2795[15]
  i2794.maxQueuedFrames = i2795[16]
  i2794.particleRaycastBudget = i2795[17]
  i2794.pixelLightCount = i2795[18]
  i2794.realtimeReflectionProbes = !!i2795[19]
  i2794.shadowCascade2Split = i2795[20]
  i2794.shadowCascade4Split = new pc.Vec3( i2795[21], i2795[22], i2795[23] )
  i2794.streamingMipmapsActive = !!i2795[24]
  i2794.vSyncCount = i2795[25]
  i2794.asyncUploadBufferSize = i2795[26]
  i2794.asyncUploadTimeSlice = i2795[27]
  i2794.billboardsFaceCameraPosition = !!i2795[28]
  i2794.shadowNearPlaneOffset = i2795[29]
  i2794.streamingMipmapsMemoryBudget = i2795[30]
  i2794.maximumLODLevel = i2795[31]
  i2794.streamingMipmapsAddAllCameras = !!i2795[32]
  i2794.streamingMipmapsMaxLevelReduction = i2795[33]
  i2794.streamingMipmapsRenderersPerFrame = i2795[34]
  i2794.resolutionScalingFixedDPIFactor = i2795[35]
  i2794.streamingMipmapsMaxFileIORequests = i2795[36]
  i2794.currentQualityLevel = i2795[37]
  return i2794
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i2802 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i2803 = data
  i2802.m_XCoordinate = i2803[0]
  i2802.m_YCoordinate = i2803[1]
  return i2802
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i2804 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i2805 = data
  i2804.m_XPositionAdjustment = i2805[0]
  i2804.m_YPositionAdjustment = i2805[1]
  return i2804
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i2806 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i2807 = data
  i2806.xPlacement = i2807[0]
  i2806.yPlacement = i2807[1]
  i2806.xAdvance = i2807[2]
  i2806.yAdvance = i2807[3]
  return i2806
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[19],"40":[1],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[1],"16":[15],"63":[64],"65":[64],"66":[9],"67":[68],"69":[5],"70":[5],"71":[9],"72":[15,9],"73":[9,10],"74":[9],"75":[10,9],"76":[15],"77":[10,9],"78":[9],"79":[9],"80":[9],"81":[66],"82":[10,9],"83":[9],"84":[66],"85":[9],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[10,9],"95":[9],"96":[9],"97":[9],"98":[9],"12":[10,9],"99":[9],"100":[101],"102":[101],"103":[101],"104":[101],"105":[1],"106":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AnimationClip","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "1.2";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1714";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4605";

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

Deserializers.buildID = "8fab944c-44aa-4f30-b0cd-4044ac808e92";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEditor","Recorder","RecorderWindow","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"]],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

