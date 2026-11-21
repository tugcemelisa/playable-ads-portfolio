var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i468 = root || request.c( 'UnityEngine.JointSpring' )
  var i469 = data
  i468.spring = i469[0]
  i468.damper = i469[1]
  i468.targetPosition = i469[2]
  return i468
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i470 = root || request.c( 'UnityEngine.JointMotor' )
  var i471 = data
  i470.m_TargetVelocity = i471[0]
  i470.m_Force = i471[1]
  i470.m_FreeSpin = i471[2]
  return i470
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i472 = root || request.c( 'UnityEngine.JointLimits' )
  var i473 = data
  i472.m_Min = i473[0]
  i472.m_Max = i473[1]
  i472.m_Bounciness = i473[2]
  i472.m_BounceMinVelocity = i473[3]
  i472.m_ContactDistance = i473[4]
  i472.minBounce = i473[5]
  i472.maxBounce = i473[6]
  return i472
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i474 = root || request.c( 'UnityEngine.JointDrive' )
  var i475 = data
  i474.m_PositionSpring = i475[0]
  i474.m_PositionDamper = i475[1]
  i474.m_MaximumForce = i475[2]
  i474.m_UseAcceleration = i475[3]
  return i474
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i476 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i477 = data
  i476.m_Spring = i477[0]
  i476.m_Damper = i477[1]
  return i476
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i478 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i479 = data
  i478.m_Limit = i479[0]
  i478.m_Bounciness = i479[1]
  i478.m_ContactDistance = i479[2]
  return i478
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i480 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i481 = data
  i480.m_ExtremumSlip = i481[0]
  i480.m_ExtremumValue = i481[1]
  i480.m_AsymptoteSlip = i481[2]
  i480.m_AsymptoteValue = i481[3]
  i480.m_Stiffness = i481[4]
  return i480
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i482 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i483 = data
  i482.m_LowerAngle = i483[0]
  i482.m_UpperAngle = i483[1]
  return i482
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i484 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i485 = data
  i484.m_MotorSpeed = i485[0]
  i484.m_MaximumMotorTorque = i485[1]
  return i484
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i486 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i487 = data
  i486.m_DampingRatio = i487[0]
  i486.m_Frequency = i487[1]
  i486.m_Angle = i487[2]
  return i486
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i488 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i489 = data
  i488.m_LowerTranslation = i489[0]
  i488.m_UpperTranslation = i489[1]
  return i488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i490 = root || new pc.UnityMaterial()
  var i491 = data
  i490.name = i491[0]
  request.r(i491[1], i491[2], 0, i490, 'shader')
  i490.renderQueue = i491[3]
  i490.enableInstancing = !!i491[4]
  var i493 = i491[5]
  var i492 = []
  for(var i = 0; i < i493.length; i += 1) {
    i492.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i493[i + 0]) );
  }
  i490.floatParameters = i492
  var i495 = i491[6]
  var i494 = []
  for(var i = 0; i < i495.length; i += 1) {
    i494.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i495[i + 0]) );
  }
  i490.colorParameters = i494
  var i497 = i491[7]
  var i496 = []
  for(var i = 0; i < i497.length; i += 1) {
    i496.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i497[i + 0]) );
  }
  i490.vectorParameters = i496
  var i499 = i491[8]
  var i498 = []
  for(var i = 0; i < i499.length; i += 1) {
    i498.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i499[i + 0]) );
  }
  i490.textureParameters = i498
  var i501 = i491[9]
  var i500 = []
  for(var i = 0; i < i501.length; i += 1) {
    i500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i501[i + 0]) );
  }
  i490.materialFlags = i500
  return i490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i504 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i505 = data
  i504.name = i505[0]
  i504.value = i505[1]
  return i504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i509 = data
  i508.name = i509[0]
  i508.value = new pc.Color(i509[1], i509[2], i509[3], i509[4])
  return i508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i513 = data
  i512.name = i513[0]
  i512.value = new pc.Vec4( i513[1], i513[2], i513[3], i513[4] )
  return i512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i516 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i517 = data
  i516.name = i517[0]
  request.r(i517[1], i517[2], 0, i516, 'value')
  return i516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i521 = data
  i520.name = i521[0]
  i520.enabled = !!i521[1]
  return i520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i523 = data
  i522.name = i523[0]
  i522.width = i523[1]
  i522.height = i523[2]
  i522.mipmapCount = i523[3]
  i522.anisoLevel = i523[4]
  i522.filterMode = i523[5]
  i522.hdr = !!i523[6]
  i522.format = i523[7]
  i522.wrapMode = i523[8]
  i522.alphaIsTransparency = !!i523[9]
  i522.alphaSource = i523[10]
  i522.graphicsFormat = i523[11]
  i522.sRGBTexture = !!i523[12]
  i522.desiredColorSpace = i523[13]
  i522.wrapU = i523[14]
  i522.wrapV = i523[15]
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i524 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i525 = data
  i524.name = i525[0]
  i524.atlasId = i525[1]
  i524.mipmapCount = i525[2]
  i524.hdr = !!i525[3]
  i524.size = i525[4]
  i524.anisoLevel = i525[5]
  i524.filterMode = i525[6]
  var i527 = i525[7]
  var i526 = []
  for(var i = 0; i < i527.length; i += 4) {
    i526.push( UnityEngine.Rect.MinMaxRect(i527[i + 0], i527[i + 1], i527[i + 2], i527[i + 3]) );
  }
  i524.rects = i526
  i524.wrapU = i525[8]
  i524.wrapV = i525[9]
  return i524
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i531 = data
  i530.name = i531[0]
  i530.index = i531[1]
  i530.startup = !!i531[2]
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i533 = data
  i532.aspect = i533[0]
  i532.orthographic = !!i533[1]
  i532.orthographicSize = i533[2]
  i532.backgroundColor = new pc.Color(i533[3], i533[4], i533[5], i533[6])
  i532.nearClipPlane = i533[7]
  i532.farClipPlane = i533[8]
  i532.fieldOfView = i533[9]
  i532.depth = i533[10]
  i532.clearFlags = i533[11]
  i532.cullingMask = i533[12]
  i532.rect = i533[13]
  request.r(i533[14], i533[15], 0, i532, 'targetTexture')
  i532.usePhysicalProperties = !!i533[16]
  i532.focalLength = i533[17]
  i532.sensorSize = new pc.Vec2( i533[18], i533[19] )
  i532.lensShift = new pc.Vec2( i533[20], i533[21] )
  i532.gateFit = i533[22]
  i532.commandBufferCount = i533[23]
  i532.cameraType = i533[24]
  i532.enabled = !!i533[25]
  return i532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i535 = data
  i534.name = i535[0]
  i534.tagId = i535[1]
  i534.enabled = !!i535[2]
  i534.isStatic = !!i535[3]
  i534.layer = i535[4]
  return i534
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i536 = root || request.c( 'MobControlAd.MobControlGame' )
  var i537 = data
  i536.fireRate = i537[0]
  i536.yellowBlockStartHp = i537[1]
  i536.enemyBaseStartHp = i537[2]
  i536.ctaText = i537[3]
  return i536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i539 = data
  i538.type = i539[0]
  i538.color = new pc.Color(i539[1], i539[2], i539[3], i539[4])
  i538.cullingMask = i539[5]
  i538.intensity = i539[6]
  i538.range = i539[7]
  i538.spotAngle = i539[8]
  i538.shadows = i539[9]
  i538.shadowNormalBias = i539[10]
  i538.shadowBias = i539[11]
  i538.shadowStrength = i539[12]
  i538.shadowResolution = i539[13]
  i538.lightmapBakeType = i539[14]
  i538.renderMode = i539[15]
  request.r(i539[16], i539[17], 0, i538, 'cookie')
  i538.cookieSize = i539[18]
  i538.shadowNearPlane = i539[19]
  i538.occlusionMaskChannel = i539[20]
  i538.isBaked = !!i539[21]
  i538.mixedLightingMode = i539[22]
  i538.enabled = !!i539[23]
  return i538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i541 = data
  i540.ambientIntensity = i541[0]
  i540.reflectionIntensity = i541[1]
  i540.ambientMode = i541[2]
  i540.ambientLight = new pc.Color(i541[3], i541[4], i541[5], i541[6])
  i540.ambientSkyColor = new pc.Color(i541[7], i541[8], i541[9], i541[10])
  i540.ambientGroundColor = new pc.Color(i541[11], i541[12], i541[13], i541[14])
  i540.ambientEquatorColor = new pc.Color(i541[15], i541[16], i541[17], i541[18])
  i540.fogColor = new pc.Color(i541[19], i541[20], i541[21], i541[22])
  i540.fogEndDistance = i541[23]
  i540.fogStartDistance = i541[24]
  i540.fogDensity = i541[25]
  i540.fog = !!i541[26]
  request.r(i541[27], i541[28], 0, i540, 'skybox')
  i540.fogMode = i541[29]
  var i543 = i541[30]
  var i542 = []
  for(var i = 0; i < i543.length; i += 1) {
    i542.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i543[i + 0]) );
  }
  i540.lightmaps = i542
  i540.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i541[31], i540.lightProbes)
  i540.lightmapsMode = i541[32]
  i540.mixedBakeMode = i541[33]
  i540.environmentLightingMode = i541[34]
  i540.ambientProbe = new pc.SphericalHarmonicsL2(i541[35])
  request.r(i541[36], i541[37], 0, i540, 'customReflection')
  request.r(i541[38], i541[39], 0, i540, 'defaultReflection')
  i540.defaultReflectionMode = i541[40]
  i540.defaultReflectionResolution = i541[41]
  i540.sunLightObjectId = i541[42]
  i540.pixelLightCount = i541[43]
  i540.defaultReflectionHDR = !!i541[44]
  i540.hasLightDataAsset = !!i541[45]
  i540.hasManualGenerate = !!i541[46]
  return i540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i547 = data
  request.r(i547[0], i547[1], 0, i546, 'lightmapColor')
  request.r(i547[2], i547[3], 0, i546, 'lightmapDirection')
  request.r(i547[4], i547[5], 0, i546, 'shadowMask')
  return i546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i548 = root || new UnityEngine.LightProbes()
  var i549 = data
  return i548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i557 = data
  i556.pivot = new pc.Vec2( i557[0], i557[1] )
  i556.anchorMin = new pc.Vec2( i557[2], i557[3] )
  i556.anchorMax = new pc.Vec2( i557[4], i557[5] )
  i556.sizeDelta = new pc.Vec2( i557[6], i557[7] )
  i556.anchoredPosition3D = new pc.Vec3( i557[8], i557[9], i557[10] )
  i556.rotation = new pc.Quat(i557[11], i557[12], i557[13], i557[14])
  i556.scale = new pc.Vec3( i557[15], i557[16], i557[17] )
  return i556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i559 = data
  i558.cullTransparentMesh = !!i559[0]
  return i558
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i560 = root || request.c( 'UnityEngine.UI.Text' )
  var i561 = data
  i560.m_FontData = request.d('UnityEngine.UI.FontData', i561[0], i560.m_FontData)
  i560.m_Text = i561[1]
  request.r(i561[2], i561[3], 0, i560, 'm_Material')
  i560.m_Maskable = !!i561[4]
  i560.m_Color = new pc.Color(i561[5], i561[6], i561[7], i561[8])
  i560.m_RaycastTarget = !!i561[9]
  i560.m_RaycastPadding = new pc.Vec4( i561[10], i561[11], i561[12], i561[13] )
  return i560
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i562 = root || request.c( 'UnityEngine.UI.FontData' )
  var i563 = data
  request.r(i563[0], i563[1], 0, i562, 'm_Font')
  i562.m_FontSize = i563[2]
  i562.m_FontStyle = i563[3]
  i562.m_BestFit = !!i563[4]
  i562.m_MinSize = i563[5]
  i562.m_MaxSize = i563[6]
  i562.m_Alignment = i563[7]
  i562.m_AlignByGeometry = !!i563[8]
  i562.m_RichText = !!i563[9]
  i562.m_HorizontalOverflow = i563[10]
  i562.m_VerticalOverflow = i563[11]
  i562.m_LineSpacing = i563[12]
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i565 = data
  i564.position = new pc.Vec3( i565[0], i565[1], i565[2] )
  i564.scale = new pc.Vec3( i565[3], i565[4], i565[5] )
  i564.rotation = new pc.Quat(i565[6], i565[7], i565[8], i565[9])
  return i564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i566 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i567 = data
  request.r(i567[0], i567[1], 0, i566, 'additionalVertexStreams')
  i566.enabled = !!i567[2]
  request.r(i567[3], i567[4], 0, i566, 'sharedMaterial')
  var i569 = i567[5]
  var i568 = []
  for(var i = 0; i < i569.length; i += 2) {
  request.r(i569[i + 0], i569[i + 1], 2, i568, '')
  }
  i566.sharedMaterials = i568
  i566.receiveShadows = !!i567[6]
  i566.shadowCastingMode = i567[7]
  i566.sortingLayerID = i567[8]
  i566.sortingOrder = i567[9]
  i566.lightmapIndex = i567[10]
  i566.lightmapSceneIndex = i567[11]
  i566.lightmapScaleOffset = new pc.Vec4( i567[12], i567[13], i567[14], i567[15] )
  i566.lightProbeUsage = i567[16]
  i566.reflectionProbeUsage = i567[17]
  return i566
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i573 = data
  i572.m_Alignment = i573[0]
  i572.m_Anchor = i573[1]
  i572.m_CharacterSize = i573[2]
  request.r(i573[3], i573[4], 0, i572, 'm_Font')
  i572.m_FontSize = i573[5]
  i572.m_FontStyle = i573[6]
  i572.m_LineSpacing = i573[7]
  i572.m_OffsetZ = i573[8]
  i572.m_RichText = !!i573[9]
  i572.m_TabSize = i573[10]
  i572.m_Text = i573[11]
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i575 = data
  request.r(i575[0], i575[1], 0, i574, 'sharedMesh')
  return i574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i577 = data
  i576.name = i577[0]
  i576.halfPrecision = !!i577[1]
  i576.useSimplification = !!i577[2]
  i576.useUInt32IndexFormat = !!i577[3]
  i576.vertexCount = i577[4]
  i576.aabb = i577[5]
  var i579 = i577[6]
  var i578 = []
  for(var i = 0; i < i579.length; i += 1) {
    i578.push( !!i579[i + 0] );
  }
  i576.streams = i578
  i576.vertices = i577[7]
  var i581 = i577[8]
  var i580 = []
  for(var i = 0; i < i581.length; i += 1) {
    i580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i581[i + 0]) );
  }
  i576.subMeshes = i580
  var i583 = i577[9]
  var i582 = []
  for(var i = 0; i < i583.length; i += 16) {
    i582.push( new pc.Mat4().setData(i583[i + 0], i583[i + 1], i583[i + 2], i583[i + 3],  i583[i + 4], i583[i + 5], i583[i + 6], i583[i + 7],  i583[i + 8], i583[i + 9], i583[i + 10], i583[i + 11],  i583[i + 12], i583[i + 13], i583[i + 14], i583[i + 15]) );
  }
  i576.bindposes = i582
  var i585 = i577[10]
  var i584 = []
  for(var i = 0; i < i585.length; i += 1) {
    i584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i585[i + 0]) );
  }
  i576.blendShapes = i584
  return i576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i591 = data
  i590.triangles = i591[0]
  return i590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i597 = data
  i596.name = i597[0]
  var i599 = i597[1]
  var i598 = []
  for(var i = 0; i < i599.length; i += 1) {
    i598.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i599[i + 0]) );
  }
  i596.frames = i598
  return i596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i601 = data
  request.r(i601[0], i601[1], 0, i600, 'sharedMesh')
  var i603 = i601[2]
  var i602 = []
  for(var i = 0; i < i603.length; i += 2) {
  request.r(i603[i + 0], i603[i + 1], 2, i602, '')
  }
  i600.bones = i602
  i600.updateWhenOffscreen = !!i601[3]
  i600.localBounds = i601[4]
  request.r(i601[5], i601[6], 0, i600, 'rootBone')
  var i605 = i601[7]
  var i604 = []
  for(var i = 0; i < i605.length; i += 1) {
    i604.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i605[i + 0]) );
  }
  i600.blendShapesWeights = i604
  i600.enabled = !!i601[8]
  request.r(i601[9], i601[10], 0, i600, 'sharedMaterial')
  var i607 = i601[11]
  var i606 = []
  for(var i = 0; i < i607.length; i += 2) {
  request.r(i607[i + 0], i607[i + 1], 2, i606, '')
  }
  i600.sharedMaterials = i606
  i600.receiveShadows = !!i601[12]
  i600.shadowCastingMode = i601[13]
  i600.sortingLayerID = i601[14]
  i600.sortingOrder = i601[15]
  i600.lightmapIndex = i601[16]
  i600.lightmapSceneIndex = i601[17]
  i600.lightmapScaleOffset = new pc.Vec4( i601[18], i601[19], i601[20], i601[21] )
  i600.lightProbeUsage = i601[22]
  i600.reflectionProbeUsage = i601[23]
  return i600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i613 = data
  i612.weight = i613[0]
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i617 = data
  i616.weight = i617[0]
  i616.vertices = i617[1]
  i616.normals = i617[2]
  i616.tangents = i617[3]
  return i616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i619 = data
  i618.center = new pc.Vec3( i619[0], i619[1], i619[2] )
  i618.radius = i619[3]
  i618.enabled = !!i619[4]
  i618.isTrigger = !!i619[5]
  request.r(i619[6], i619[7], 0, i618, 'material')
  return i618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i621 = data
  i620.center = new pc.Vec3( i621[0], i621[1], i621[2] )
  i620.radius = i621[3]
  i620.height = i621[4]
  i620.direction = i621[5]
  i620.enabled = !!i621[6]
  i620.isTrigger = !!i621[7]
  request.r(i621[8], i621[9], 0, i620, 'material')
  return i620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i623 = data
  i622.center = new pc.Vec3( i623[0], i623[1], i623[2] )
  i622.size = new pc.Vec3( i623[3], i623[4], i623[5] )
  i622.enabled = !!i623[6]
  i622.isTrigger = !!i623[7]
  request.r(i623[8], i623[9], 0, i622, 'material')
  return i622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i625 = data
  request.r(i625[0], i625[1], 0, i624, 'sharedMesh')
  i624.convex = !!i625[2]
  i624.enabled = !!i625[3]
  i624.isTrigger = !!i625[4]
  request.r(i625[5], i625[6], 0, i624, 'material')
  return i624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i627 = data
  var i629 = i627[0]
  var i628 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i629.length; i += 1) {
    i628.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i629[i + 0]));
  }
  i626.ShaderCompilationErrors = i628
  i626.name = i627[1]
  i626.guid = i627[2]
  var i631 = i627[3]
  var i630 = []
  for(var i = 0; i < i631.length; i += 1) {
    i630.push( i631[i + 0] );
  }
  i626.shaderDefinedKeywords = i630
  var i633 = i627[4]
  var i632 = []
  for(var i = 0; i < i633.length; i += 1) {
    i632.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i633[i + 0]) );
  }
  i626.passes = i632
  var i635 = i627[5]
  var i634 = []
  for(var i = 0; i < i635.length; i += 1) {
    i634.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i635[i + 0]) );
  }
  i626.usePasses = i634
  var i637 = i627[6]
  var i636 = []
  for(var i = 0; i < i637.length; i += 1) {
    i636.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i637[i + 0]) );
  }
  i626.defaultParameterValues = i636
  request.r(i627[7], i627[8], 0, i626, 'unityFallbackShader')
  i626.readDepth = !!i627[9]
  i626.hasDepthOnlyPass = !!i627[10]
  i626.isCreatedByShaderGraph = !!i627[11]
  i626.disableBatching = !!i627[12]
  i626.compiled = !!i627[13]
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i640 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i641 = data
  i640.shaderName = i641[0]
  i640.errorMessage = i641[1]
  return i640
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i646 = root || new pc.UnityShaderPass()
  var i647 = data
  i646.id = i647[0]
  i646.subShaderIndex = i647[1]
  i646.name = i647[2]
  i646.passType = i647[3]
  i646.grabPassTextureName = i647[4]
  i646.usePass = !!i647[5]
  i646.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[6], i646.zTest)
  i646.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[7], i646.zWrite)
  i646.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[8], i646.culling)
  i646.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i647[9], i646.blending)
  i646.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i647[10], i646.alphaBlending)
  i646.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[11], i646.colorWriteMask)
  i646.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[12], i646.offsetUnits)
  i646.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[13], i646.offsetFactor)
  i646.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[14], i646.stencilRef)
  i646.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[15], i646.stencilReadMask)
  i646.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i647[16], i646.stencilWriteMask)
  i646.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i647[17], i646.stencilOp)
  i646.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i647[18], i646.stencilOpFront)
  i646.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i647[19], i646.stencilOpBack)
  var i649 = i647[20]
  var i648 = []
  for(var i = 0; i < i649.length; i += 1) {
    i648.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i649[i + 0]) );
  }
  i646.tags = i648
  var i651 = i647[21]
  var i650 = []
  for(var i = 0; i < i651.length; i += 1) {
    i650.push( i651[i + 0] );
  }
  i646.passDefinedKeywords = i650
  var i653 = i647[22]
  var i652 = []
  for(var i = 0; i < i653.length; i += 1) {
    i652.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i653[i + 0]) );
  }
  i646.passDefinedKeywordGroups = i652
  var i655 = i647[23]
  var i654 = []
  for(var i = 0; i < i655.length; i += 1) {
    i654.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i655[i + 0]) );
  }
  i646.variants = i654
  var i657 = i647[24]
  var i656 = []
  for(var i = 0; i < i657.length; i += 1) {
    i656.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i657[i + 0]) );
  }
  i646.excludedVariants = i656
  i646.hasDepthReader = !!i647[25]
  return i646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i659 = data
  i658.val = i659[0]
  i658.name = i659[1]
  return i658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i661 = data
  i660.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i661[0], i660.src)
  i660.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i661[1], i660.dst)
  i660.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i661[2], i660.op)
  return i660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i663 = data
  i662.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i663[0], i662.pass)
  i662.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i663[1], i662.fail)
  i662.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i663[2], i662.zFail)
  i662.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i663[3], i662.comp)
  return i662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i667 = data
  i666.name = i667[0]
  i666.value = i667[1]
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i671 = data
  var i673 = i671[0]
  var i672 = []
  for(var i = 0; i < i673.length; i += 1) {
    i672.push( i673[i + 0] );
  }
  i670.keywords = i672
  i670.hasDiscard = !!i671[1]
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i677 = data
  i676.passId = i677[0]
  i676.subShaderIndex = i677[1]
  var i679 = i677[2]
  var i678 = []
  for(var i = 0; i < i679.length; i += 1) {
    i678.push( i679[i + 0] );
  }
  i676.keywords = i678
  i676.vertexProgram = i677[3]
  i676.fragmentProgram = i677[4]
  i676.exportedForWebGl2 = !!i677[5]
  i676.readDepth = !!i677[6]
  return i676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i683 = data
  request.r(i683[0], i683[1], 0, i682, 'shader')
  i682.pass = i683[2]
  return i682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i687 = data
  i686.name = i687[0]
  i686.type = i687[1]
  i686.value = new pc.Vec4( i687[2], i687[3], i687[4], i687[5] )
  i686.textureValue = i687[6]
  i686.shaderPropertyFlag = i687[7]
  return i686
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i689 = data
  i688.name = i689[0]
  return i688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i691 = data
  i690.name = i691[0]
  i690.wrapMode = i691[1]
  i690.isLooping = !!i691[2]
  i690.length = i691[3]
  var i693 = i691[4]
  var i692 = []
  for(var i = 0; i < i693.length; i += 1) {
    i692.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i693[i + 0]) );
  }
  i690.curves = i692
  var i695 = i691[5]
  var i694 = []
  for(var i = 0; i < i695.length; i += 1) {
    i694.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i695[i + 0]) );
  }
  i690.events = i694
  i690.halfPrecision = !!i691[6]
  i690._frameRate = i691[7]
  i690.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i691[8], i690.localBounds)
  i690.hasMuscleCurves = !!i691[9]
  var i697 = i691[10]
  var i696 = []
  for(var i = 0; i < i697.length; i += 1) {
    i696.push( i697[i + 0] );
  }
  i690.clipMuscleConstant = i696
  i690.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i691[11], i690.clipBindingConstant)
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i700 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i701 = data
  i700.path = i701[0]
  i700.hash = i701[1]
  i700.componentType = i701[2]
  i700.property = i701[3]
  i700.keys = i701[4]
  var i703 = i701[5]
  var i702 = []
  for(var i = 0; i < i703.length; i += 1) {
    i702.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i703[i + 0]) );
  }
  i700.objectReferenceKeys = i702
  return i700
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i706 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i707 = data
  i706.time = i707[0]
  request.r(i707[1], i707[2], 0, i706, 'value')
  return i706
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i710 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i711 = data
  i710.functionName = i711[0]
  i710.floatParameter = i711[1]
  i710.intParameter = i711[2]
  i710.stringParameter = i711[3]
  request.r(i711[4], i711[5], 0, i710, 'objectReferenceParameter')
  i710.time = i711[6]
  return i710
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i712 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i713 = data
  i712.center = new pc.Vec3( i713[0], i713[1], i713[2] )
  i712.extends = new pc.Vec3( i713[3], i713[4], i713[5] )
  return i712
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i716 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i717 = data
  var i719 = i717[0]
  var i718 = []
  for(var i = 0; i < i719.length; i += 1) {
    i718.push( i719[i + 0] );
  }
  i716.genericBindings = i718
  var i721 = i717[1]
  var i720 = []
  for(var i = 0; i < i721.length; i += 1) {
    i720.push( i721[i + 0] );
  }
  i716.pptrCurveMapping = i720
  return i716
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i722 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i723 = data
  i722.name = i723[0]
  i722.ascent = i723[1]
  i722.originalLineHeight = i723[2]
  i722.fontSize = i723[3]
  var i725 = i723[4]
  var i724 = []
  for(var i = 0; i < i725.length; i += 1) {
    i724.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i725[i + 0]) );
  }
  i722.characterInfo = i724
  request.r(i723[5], i723[6], 0, i722, 'texture')
  i722.originalFontSize = i723[7]
  return i722
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i728 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i729 = data
  i728.index = i729[0]
  i728.advance = i729[1]
  i728.bearing = i729[2]
  i728.glyphWidth = i729[3]
  i728.glyphHeight = i729[4]
  i728.minX = i729[5]
  i728.maxX = i729[6]
  i728.minY = i729[7]
  i728.maxY = i729[8]
  i728.uvBottomLeftX = i729[9]
  i728.uvBottomLeftY = i729[10]
  i728.uvBottomRightX = i729[11]
  i728.uvBottomRightY = i729[12]
  i728.uvTopLeftX = i729[13]
  i728.uvTopLeftY = i729[14]
  i728.uvTopRightX = i729[15]
  i728.uvTopRightY = i729[16]
  return i728
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i731 = data
  i730.name = i731[0]
  i730.bytes64 = i731[1]
  i730.data = i731[2]
  return i730
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i732 = root || request.c( 'TMPro.TMP_Settings' )
  var i733 = data
  i732.assetVersion = i733[0]
  i732.m_TextWrappingMode = i733[1]
  i732.m_enableKerning = !!i733[2]
  var i735 = i733[3]
  var i734 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i735.length; i += 1) {
    i734.add(i735[i + 0]);
  }
  i732.m_ActiveFontFeatures = i734
  i732.m_enableExtraPadding = !!i733[4]
  i732.m_enableTintAllSprites = !!i733[5]
  i732.m_enableParseEscapeCharacters = !!i733[6]
  i732.m_EnableRaycastTarget = !!i733[7]
  i732.m_GetFontFeaturesAtRuntime = !!i733[8]
  i732.m_missingGlyphCharacter = i733[9]
  i732.m_ClearDynamicDataOnBuild = !!i733[10]
  i732.m_warningsDisabled = !!i733[11]
  request.r(i733[12], i733[13], 0, i732, 'm_defaultFontAsset')
  i732.m_defaultFontAssetPath = i733[14]
  i732.m_defaultFontSize = i733[15]
  i732.m_defaultAutoSizeMinRatio = i733[16]
  i732.m_defaultAutoSizeMaxRatio = i733[17]
  i732.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i733[18], i733[19] )
  i732.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i733[20], i733[21] )
  i732.m_autoSizeTextContainer = !!i733[22]
  i732.m_IsTextObjectScaleStatic = !!i733[23]
  var i737 = i733[24]
  var i736 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i737.length; i += 2) {
  request.r(i737[i + 0], i737[i + 1], 1, i736, '')
  }
  i732.m_fallbackFontAssets = i736
  i732.m_matchMaterialPreset = !!i733[25]
  i732.m_HideSubTextObjects = !!i733[26]
  request.r(i733[27], i733[28], 0, i732, 'm_defaultSpriteAsset')
  i732.m_defaultSpriteAssetPath = i733[29]
  i732.m_enableEmojiSupport = !!i733[30]
  i732.m_MissingCharacterSpriteUnicode = i733[31]
  var i739 = i733[32]
  var i738 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i739.length; i += 2) {
  request.r(i739[i + 0], i739[i + 1], 1, i738, '')
  }
  i732.m_EmojiFallbackTextAssets = i738
  i732.m_defaultColorGradientPresetsPath = i733[33]
  request.r(i733[34], i733[35], 0, i732, 'm_defaultStyleSheet')
  i732.m_StyleSheetsResourcePath = i733[36]
  request.r(i733[37], i733[38], 0, i732, 'm_leadingCharacters')
  request.r(i733[39], i733[40], 0, i732, 'm_followingCharacters')
  i732.m_UseModernHangulLineBreakingRules = !!i733[41]
  return i732
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i746 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i747 = data
  i746.normalStyle = i747[0]
  i746.normalSpacingOffset = i747[1]
  i746.boldStyle = i747[2]
  i746.boldSpacing = i747[3]
  i746.italicStyle = i747[4]
  i746.tabSize = i747[5]
  request.r(i747[6], i747[7], 0, i746, 'atlas')
  i746.m_SourceFontFileGUID = i747[8]
  i746.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i747[9], i746.m_CreationSettings)
  request.r(i747[10], i747[11], 0, i746, 'm_SourceFontFile')
  i746.m_SourceFontFilePath = i747[12]
  i746.m_AtlasPopulationMode = i747[13]
  i746.InternalDynamicOS = !!i747[14]
  var i749 = i747[15]
  var i748 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i749.length; i += 1) {
    i748.add(request.d('UnityEngine.TextCore.Glyph', i749[i + 0]));
  }
  i746.m_GlyphTable = i748
  var i751 = i747[16]
  var i750 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i751.length; i += 1) {
    i750.add(request.d('TMPro.TMP_Character', i751[i + 0]));
  }
  i746.m_CharacterTable = i750
  var i753 = i747[17]
  var i752 = []
  for(var i = 0; i < i753.length; i += 2) {
  request.r(i753[i + 0], i753[i + 1], 2, i752, '')
  }
  i746.m_AtlasTextures = i752
  i746.m_AtlasTextureIndex = i747[18]
  i746.m_IsMultiAtlasTexturesEnabled = !!i747[19]
  i746.m_GetFontFeatures = !!i747[20]
  i746.m_ClearDynamicDataOnBuild = !!i747[21]
  i746.m_AtlasWidth = i747[22]
  i746.m_AtlasHeight = i747[23]
  i746.m_AtlasPadding = i747[24]
  i746.m_AtlasRenderMode = i747[25]
  var i755 = i747[26]
  var i754 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i755.length; i += 1) {
    i754.add(request.d('UnityEngine.TextCore.GlyphRect', i755[i + 0]));
  }
  i746.m_UsedGlyphRects = i754
  var i757 = i747[27]
  var i756 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i757.length; i += 1) {
    i756.add(request.d('UnityEngine.TextCore.GlyphRect', i757[i + 0]));
  }
  i746.m_FreeGlyphRects = i756
  i746.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i747[28], i746.m_FontFeatureTable)
  i746.m_ShouldReimportFontFeatures = !!i747[29]
  var i759 = i747[30]
  var i758 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i759.length; i += 2) {
  request.r(i759[i + 0], i759[i + 1], 1, i758, '')
  }
  i746.m_FallbackFontAssetTable = i758
  var i761 = i747[31]
  var i760 = []
  for(var i = 0; i < i761.length; i += 1) {
    i760.push( request.d('TMPro.TMP_FontWeightPair', i761[i + 0]) );
  }
  i746.m_FontWeightTable = i760
  var i763 = i747[32]
  var i762 = []
  for(var i = 0; i < i763.length; i += 1) {
    i762.push( request.d('TMPro.TMP_FontWeightPair', i763[i + 0]) );
  }
  i746.fontWeights = i762
  i746.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i747[33], i746.m_fontInfo)
  var i765 = i747[34]
  var i764 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i765.length; i += 1) {
    i764.add(request.d('TMPro.TMP_Glyph', i765[i + 0]));
  }
  i746.m_glyphInfoList = i764
  i746.m_KerningTable = request.d('TMPro.KerningTable', i747[35], i746.m_KerningTable)
  var i767 = i747[36]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i767.length; i += 2) {
  request.r(i767[i + 0], i767[i + 1], 1, i766, '')
  }
  i746.fallbackFontAssets = i766
  i746.m_Version = i747[37]
  i746.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i747[38], i746.m_FaceInfo)
  request.r(i747[39], i747[40], 0, i746, 'm_Material')
  return i746
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i768 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i769 = data
  i768.sourceFontFileName = i769[0]
  i768.sourceFontFileGUID = i769[1]
  i768.faceIndex = i769[2]
  i768.pointSizeSamplingMode = i769[3]
  i768.pointSize = i769[4]
  i768.padding = i769[5]
  i768.paddingMode = i769[6]
  i768.packingMode = i769[7]
  i768.atlasWidth = i769[8]
  i768.atlasHeight = i769[9]
  i768.characterSetSelectionMode = i769[10]
  i768.characterSequence = i769[11]
  i768.referencedFontAssetGUID = i769[12]
  i768.referencedTextAssetGUID = i769[13]
  i768.fontStyle = i769[14]
  i768.fontStyleModifier = i769[15]
  i768.renderMode = i769[16]
  i768.includeFontFeatures = !!i769[17]
  return i768
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i772 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i773 = data
  i772.m_Index = i773[0]
  i772.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i773[1], i772.m_Metrics)
  i772.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i773[2], i772.m_GlyphRect)
  i772.m_Scale = i773[3]
  i772.m_AtlasIndex = i773[4]
  i772.m_ClassDefinitionType = i773[5]
  return i772
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i774 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i775 = data
  i774.m_Width = i775[0]
  i774.m_Height = i775[1]
  i774.m_HorizontalBearingX = i775[2]
  i774.m_HorizontalBearingY = i775[3]
  i774.m_HorizontalAdvance = i775[4]
  return i774
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i776 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i777 = data
  i776.m_X = i777[0]
  i776.m_Y = i777[1]
  i776.m_Width = i777[2]
  i776.m_Height = i777[3]
  return i776
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i780 = root || request.c( 'TMPro.TMP_Character' )
  var i781 = data
  i780.m_ElementType = i781[0]
  i780.m_Unicode = i781[1]
  i780.m_GlyphIndex = i781[2]
  i780.m_Scale = i781[3]
  return i780
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i786 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i787 = data
  var i789 = i787[0]
  var i788 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i789.length; i += 1) {
    i788.add(request.d('TMPro.MultipleSubstitutionRecord', i789[i + 0]));
  }
  i786.m_MultipleSubstitutionRecords = i788
  var i791 = i787[1]
  var i790 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i791.length; i += 1) {
    i790.add(request.d('TMPro.LigatureSubstitutionRecord', i791[i + 0]));
  }
  i786.m_LigatureSubstitutionRecords = i790
  var i793 = i787[2]
  var i792 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i793.length; i += 1) {
    i792.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i793[i + 0]));
  }
  i786.m_GlyphPairAdjustmentRecords = i792
  var i795 = i787[3]
  var i794 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i795.length; i += 1) {
    i794.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i795[i + 0]));
  }
  i786.m_MarkToBaseAdjustmentRecords = i794
  var i797 = i787[4]
  var i796 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i797.length; i += 1) {
    i796.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i797[i + 0]));
  }
  i786.m_MarkToMarkAdjustmentRecords = i796
  return i786
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i800 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i801 = data
  i800.m_TargetGlyphID = i801[0]
  i800.m_SubstituteGlyphIDs = i801[1]
  return i800
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i804 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i805 = data
  i804.m_ComponentGlyphIDs = i805[0]
  i804.m_LigatureGlyphID = i805[1]
  return i804
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i808 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i809 = data
  i808.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i809[0], i808.m_FirstAdjustmentRecord)
  i808.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i809[1], i808.m_SecondAdjustmentRecord)
  i808.m_FeatureLookupFlags = i809[2]
  return i808
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i810 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i811 = data
  i810.m_GlyphIndex = i811[0]
  i810.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i811[1], i810.m_GlyphValueRecord)
  return i810
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i812 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i813 = data
  i812.m_XPlacement = i813[0]
  i812.m_YPlacement = i813[1]
  i812.m_XAdvance = i813[2]
  i812.m_YAdvance = i813[3]
  return i812
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i816 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i817 = data
  i816.m_BaseGlyphID = i817[0]
  i816.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i817[1], i816.m_BaseGlyphAnchorPoint)
  i816.m_MarkGlyphID = i817[2]
  i816.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i817[3], i816.m_MarkPositionAdjustment)
  return i816
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i820 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i821 = data
  i820.m_BaseMarkGlyphID = i821[0]
  i820.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i821[1], i820.m_BaseMarkGlyphAnchorPoint)
  i820.m_CombiningMarkGlyphID = i821[2]
  i820.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i821[3], i820.m_CombiningMarkPositionAdjustment)
  return i820
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i824 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i825 = data
  request.r(i825[0], i825[1], 0, i824, 'regularTypeface')
  request.r(i825[2], i825[3], 0, i824, 'italicTypeface')
  return i824
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i826 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i827 = data
  i826.Name = i827[0]
  i826.PointSize = i827[1]
  i826.Scale = i827[2]
  i826.CharacterCount = i827[3]
  i826.LineHeight = i827[4]
  i826.Baseline = i827[5]
  i826.Ascender = i827[6]
  i826.CapHeight = i827[7]
  i826.Descender = i827[8]
  i826.CenterLine = i827[9]
  i826.SuperscriptOffset = i827[10]
  i826.SubscriptOffset = i827[11]
  i826.SubSize = i827[12]
  i826.Underline = i827[13]
  i826.UnderlineThickness = i827[14]
  i826.strikethrough = i827[15]
  i826.strikethroughThickness = i827[16]
  i826.TabWidth = i827[17]
  i826.Padding = i827[18]
  i826.AtlasWidth = i827[19]
  i826.AtlasHeight = i827[20]
  return i826
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i830 = root || request.c( 'TMPro.TMP_Glyph' )
  var i831 = data
  i830.id = i831[0]
  i830.x = i831[1]
  i830.y = i831[2]
  i830.width = i831[3]
  i830.height = i831[4]
  i830.xOffset = i831[5]
  i830.yOffset = i831[6]
  i830.xAdvance = i831[7]
  i830.scale = i831[8]
  return i830
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i832 = root || request.c( 'TMPro.KerningTable' )
  var i833 = data
  var i835 = i833[0]
  var i834 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i835.length; i += 1) {
    i834.add(request.d('TMPro.KerningPair', i835[i + 0]));
  }
  i832.kerningPairs = i834
  return i832
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i838 = root || request.c( 'TMPro.KerningPair' )
  var i839 = data
  i838.xOffset = i839[0]
  i838.m_FirstGlyph = i839[1]
  i838.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i839[2], i838.m_FirstGlyphAdjustments)
  i838.m_SecondGlyph = i839[3]
  i838.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i839[4], i838.m_SecondGlyphAdjustments)
  i838.m_IgnoreSpacingAdjustments = !!i839[5]
  return i838
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i840 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i841 = data
  i840.m_FaceIndex = i841[0]
  i840.m_FamilyName = i841[1]
  i840.m_StyleName = i841[2]
  i840.m_PointSize = i841[3]
  i840.m_Scale = i841[4]
  i840.m_UnitsPerEM = i841[5]
  i840.m_LineHeight = i841[6]
  i840.m_AscentLine = i841[7]
  i840.m_CapLine = i841[8]
  i840.m_MeanLine = i841[9]
  i840.m_Baseline = i841[10]
  i840.m_DescentLine = i841[11]
  i840.m_SuperscriptOffset = i841[12]
  i840.m_SuperscriptSize = i841[13]
  i840.m_SubscriptOffset = i841[14]
  i840.m_SubscriptSize = i841[15]
  i840.m_UnderlineOffset = i841[16]
  i840.m_UnderlineThickness = i841[17]
  i840.m_StrikethroughOffset = i841[18]
  i840.m_StrikethroughThickness = i841[19]
  i840.m_TabWidth = i841[20]
  return i840
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i842 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i843 = data
  request.r(i843[0], i843[1], 0, i842, 'spriteSheet')
  var i845 = i843[2]
  var i844 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i845.length; i += 1) {
    i844.add(request.d('TMPro.TMP_Sprite', i845[i + 0]));
  }
  i842.spriteInfoList = i844
  var i847 = i843[3]
  var i846 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i847.length; i += 2) {
  request.r(i847[i + 0], i847[i + 1], 1, i846, '')
  }
  i842.fallbackSpriteAssets = i846
  var i849 = i843[4]
  var i848 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i849.length; i += 1) {
    i848.add(request.d('TMPro.TMP_SpriteCharacter', i849[i + 0]));
  }
  i842.m_SpriteCharacterTable = i848
  var i851 = i843[5]
  var i850 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i851.length; i += 1) {
    i850.add(request.d('TMPro.TMP_SpriteGlyph', i851[i + 0]));
  }
  i842.m_GlyphTable = i850
  i842.m_Version = i843[6]
  i842.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i843[7], i842.m_FaceInfo)
  request.r(i843[8], i843[9], 0, i842, 'm_Material')
  return i842
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i854 = root || request.c( 'TMPro.TMP_Sprite' )
  var i855 = data
  i854.name = i855[0]
  i854.hashCode = i855[1]
  i854.unicode = i855[2]
  i854.pivot = new pc.Vec2( i855[3], i855[4] )
  request.r(i855[5], i855[6], 0, i854, 'sprite')
  i854.id = i855[7]
  i854.x = i855[8]
  i854.y = i855[9]
  i854.width = i855[10]
  i854.height = i855[11]
  i854.xOffset = i855[12]
  i854.yOffset = i855[13]
  i854.xAdvance = i855[14]
  i854.scale = i855[15]
  return i854
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i860 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i861 = data
  i860.m_Name = i861[0]
  i860.m_ElementType = i861[1]
  i860.m_Unicode = i861[2]
  i860.m_GlyphIndex = i861[3]
  i860.m_Scale = i861[4]
  return i860
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i864 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i865 = data
  request.r(i865[0], i865[1], 0, i864, 'sprite')
  i864.m_Index = i865[2]
  i864.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i865[3], i864.m_Metrics)
  i864.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i865[4], i864.m_GlyphRect)
  i864.m_Scale = i865[5]
  i864.m_AtlasIndex = i865[6]
  i864.m_ClassDefinitionType = i865[7]
  return i864
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i866 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i867 = data
  var i869 = i867[0]
  var i868 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i869.length; i += 1) {
    i868.add(request.d('TMPro.TMP_Style', i869[i + 0]));
  }
  i866.m_StyleList = i868
  return i866
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i872 = root || request.c( 'TMPro.TMP_Style' )
  var i873 = data
  i872.m_Name = i873[0]
  i872.m_HashCode = i873[1]
  i872.m_OpeningDefinition = i873[2]
  i872.m_ClosingDefinition = i873[3]
  i872.m_OpeningTagArray = i873[4]
  i872.m_ClosingTagArray = i873[5]
  return i872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i875 = data
  var i877 = i875[0]
  var i876 = []
  for(var i = 0; i < i877.length; i += 1) {
    i876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i877[i + 0]) );
  }
  i874.files = i876
  i874.componentToPrefabIds = i875[1]
  return i874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i881 = data
  i880.path = i881[0]
  request.r(i881[1], i881[2], 0, i880, 'unityObject')
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i883 = data
  var i885 = i883[0]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i885[i + 0]) );
  }
  i882.scriptsExecutionOrder = i884
  var i887 = i883[1]
  var i886 = []
  for(var i = 0; i < i887.length; i += 1) {
    i886.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i887[i + 0]) );
  }
  i882.sortingLayers = i886
  var i889 = i883[2]
  var i888 = []
  for(var i = 0; i < i889.length; i += 1) {
    i888.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i889[i + 0]) );
  }
  i882.cullingLayers = i888
  i882.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i883[3], i882.timeSettings)
  i882.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i883[4], i882.physicsSettings)
  i882.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i883[5], i882.physics2DSettings)
  i882.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i883[6], i882.qualitySettings)
  i882.enableRealtimeShadows = !!i883[7]
  i882.enableAutoInstancing = !!i883[8]
  i882.enableStaticBatching = !!i883[9]
  i882.enableDynamicBatching = !!i883[10]
  i882.usePreservativeDynamicBatching = !!i883[11]
  i882.lightmapEncodingQuality = i883[12]
  i882.desiredColorSpace = i883[13]
  var i891 = i883[14]
  var i890 = []
  for(var i = 0; i < i891.length; i += 1) {
    i890.push( i891[i + 0] );
  }
  i882.allTags = i890
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i894 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i895 = data
  i894.name = i895[0]
  i894.value = i895[1]
  return i894
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i898 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i899 = data
  i898.id = i899[0]
  i898.name = i899[1]
  i898.value = i899[2]
  return i898
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i903 = data
  i902.id = i903[0]
  i902.name = i903[1]
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i904 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i905 = data
  i904.fixedDeltaTime = i905[0]
  i904.maximumDeltaTime = i905[1]
  i904.timeScale = i905[2]
  i904.maximumParticleTimestep = i905[3]
  return i904
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i907 = data
  i906.gravity = new pc.Vec3( i907[0], i907[1], i907[2] )
  i906.defaultSolverIterations = i907[3]
  i906.bounceThreshold = i907[4]
  i906.autoSyncTransforms = !!i907[5]
  i906.autoSimulation = !!i907[6]
  var i909 = i907[7]
  var i908 = []
  for(var i = 0; i < i909.length; i += 1) {
    i908.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i909[i + 0]) );
  }
  i906.collisionMatrix = i908
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i913 = data
  i912.enabled = !!i913[0]
  i912.layerId = i913[1]
  i912.otherLayerId = i913[2]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i915 = data
  request.r(i915[0], i915[1], 0, i914, 'material')
  i914.gravity = new pc.Vec2( i915[2], i915[3] )
  i914.positionIterations = i915[4]
  i914.velocityIterations = i915[5]
  i914.velocityThreshold = i915[6]
  i914.maxLinearCorrection = i915[7]
  i914.maxAngularCorrection = i915[8]
  i914.maxTranslationSpeed = i915[9]
  i914.maxRotationSpeed = i915[10]
  i914.baumgarteScale = i915[11]
  i914.baumgarteTOIScale = i915[12]
  i914.timeToSleep = i915[13]
  i914.linearSleepTolerance = i915[14]
  i914.angularSleepTolerance = i915[15]
  i914.defaultContactOffset = i915[16]
  i914.autoSimulation = !!i915[17]
  i914.queriesHitTriggers = !!i915[18]
  i914.queriesStartInColliders = !!i915[19]
  i914.callbacksOnDisable = !!i915[20]
  i914.reuseCollisionCallbacks = !!i915[21]
  i914.autoSyncTransforms = !!i915[22]
  var i917 = i915[23]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i917[i + 0]) );
  }
  i914.collisionMatrix = i916
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i921 = data
  i920.enabled = !!i921[0]
  i920.layerId = i921[1]
  i920.otherLayerId = i921[2]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i923 = data
  var i925 = i923[0]
  var i924 = []
  for(var i = 0; i < i925.length; i += 1) {
    i924.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i925[i + 0]) );
  }
  i922.qualityLevels = i924
  var i927 = i923[1]
  var i926 = []
  for(var i = 0; i < i927.length; i += 1) {
    i926.push( i927[i + 0] );
  }
  i922.names = i926
  i922.shadows = i923[2]
  i922.anisotropicFiltering = i923[3]
  i922.antiAliasing = i923[4]
  i922.lodBias = i923[5]
  i922.shadowCascades = i923[6]
  i922.shadowDistance = i923[7]
  i922.shadowmaskMode = i923[8]
  i922.shadowProjection = i923[9]
  i922.shadowResolution = i923[10]
  i922.softParticles = !!i923[11]
  i922.softVegetation = !!i923[12]
  i922.activeColorSpace = i923[13]
  i922.desiredColorSpace = i923[14]
  i922.masterTextureLimit = i923[15]
  i922.maxQueuedFrames = i923[16]
  i922.particleRaycastBudget = i923[17]
  i922.pixelLightCount = i923[18]
  i922.realtimeReflectionProbes = !!i923[19]
  i922.shadowCascade2Split = i923[20]
  i922.shadowCascade4Split = new pc.Vec3( i923[21], i923[22], i923[23] )
  i922.streamingMipmapsActive = !!i923[24]
  i922.vSyncCount = i923[25]
  i922.asyncUploadBufferSize = i923[26]
  i922.asyncUploadTimeSlice = i923[27]
  i922.billboardsFaceCameraPosition = !!i923[28]
  i922.shadowNearPlaneOffset = i923[29]
  i922.streamingMipmapsMemoryBudget = i923[30]
  i922.maximumLODLevel = i923[31]
  i922.streamingMipmapsAddAllCameras = !!i923[32]
  i922.streamingMipmapsMaxLevelReduction = i923[33]
  i922.streamingMipmapsRenderersPerFrame = i923[34]
  i922.resolutionScalingFixedDPIFactor = i923[35]
  i922.streamingMipmapsMaxFileIORequests = i923[36]
  i922.currentQualityLevel = i923[37]
  return i922
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i930 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i931 = data
  i930.m_XCoordinate = i931[0]
  i930.m_YCoordinate = i931[1]
  return i930
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i932 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i933 = data
  i932.m_XPositionAdjustment = i933[0]
  i932.m_YPositionAdjustment = i933[1]
  return i932
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i934 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i935 = data
  i934.xPlacement = i935[0]
  i934.yPlacement = i935[1]
  i934.xAdvance = i935[2]
  i934.yAdvance = i935[3]
  return i934
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[19],"40":[1],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[1],"16":[15],"63":[64],"65":[64],"66":[9],"67":[68],"69":[5],"70":[5],"71":[9],"72":[15,9],"73":[9,10],"74":[9],"75":[10,9],"76":[15],"77":[10,9],"78":[9],"79":[9],"80":[9],"81":[66],"82":[10,9],"83":[9],"84":[66],"85":[9],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[10,9],"95":[9],"96":[9],"97":[9],"98":[9],"12":[10,9],"99":[9],"100":[101],"102":[101],"103":[101],"104":[101],"105":[1],"106":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AnimationClip","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "1.1";

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

Deserializers.buildID = "4e83a0a1-e6fc-4b30-83e5-6b5f64aeffec";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEditor","Recorder","RecorderWindow","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"]],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

