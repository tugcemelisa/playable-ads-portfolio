var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i474 = root || request.c( 'UnityEngine.JointSpring' )
  var i475 = data
  i474.spring = i475[0]
  i474.damper = i475[1]
  i474.targetPosition = i475[2]
  return i474
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i476 = root || request.c( 'UnityEngine.JointMotor' )
  var i477 = data
  i476.m_TargetVelocity = i477[0]
  i476.m_Force = i477[1]
  i476.m_FreeSpin = i477[2]
  return i476
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i478 = root || request.c( 'UnityEngine.JointLimits' )
  var i479 = data
  i478.m_Min = i479[0]
  i478.m_Max = i479[1]
  i478.m_Bounciness = i479[2]
  i478.m_BounceMinVelocity = i479[3]
  i478.m_ContactDistance = i479[4]
  i478.minBounce = i479[5]
  i478.maxBounce = i479[6]
  return i478
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i480 = root || request.c( 'UnityEngine.JointDrive' )
  var i481 = data
  i480.m_PositionSpring = i481[0]
  i480.m_PositionDamper = i481[1]
  i480.m_MaximumForce = i481[2]
  i480.m_UseAcceleration = i481[3]
  return i480
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i482 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i483 = data
  i482.m_Spring = i483[0]
  i482.m_Damper = i483[1]
  return i482
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i484 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i485 = data
  i484.m_Limit = i485[0]
  i484.m_Bounciness = i485[1]
  i484.m_ContactDistance = i485[2]
  return i484
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i486 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i487 = data
  i486.m_ExtremumSlip = i487[0]
  i486.m_ExtremumValue = i487[1]
  i486.m_AsymptoteSlip = i487[2]
  i486.m_AsymptoteValue = i487[3]
  i486.m_Stiffness = i487[4]
  return i486
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i488 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i489 = data
  i488.m_LowerAngle = i489[0]
  i488.m_UpperAngle = i489[1]
  return i488
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i490 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i491 = data
  i490.m_MotorSpeed = i491[0]
  i490.m_MaximumMotorTorque = i491[1]
  return i490
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i492 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i493 = data
  i492.m_DampingRatio = i493[0]
  i492.m_Frequency = i493[1]
  i492.m_Angle = i493[2]
  return i492
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i494 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i495 = data
  i494.m_LowerTranslation = i495[0]
  i494.m_UpperTranslation = i495[1]
  return i494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i496 = root || new pc.UnityMaterial()
  var i497 = data
  i496.name = i497[0]
  request.r(i497[1], i497[2], 0, i496, 'shader')
  i496.renderQueue = i497[3]
  i496.enableInstancing = !!i497[4]
  var i499 = i497[5]
  var i498 = []
  for(var i = 0; i < i499.length; i += 1) {
    i498.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i499[i + 0]) );
  }
  i496.floatParameters = i498
  var i501 = i497[6]
  var i500 = []
  for(var i = 0; i < i501.length; i += 1) {
    i500.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i501[i + 0]) );
  }
  i496.colorParameters = i500
  var i503 = i497[7]
  var i502 = []
  for(var i = 0; i < i503.length; i += 1) {
    i502.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i503[i + 0]) );
  }
  i496.vectorParameters = i502
  var i505 = i497[8]
  var i504 = []
  for(var i = 0; i < i505.length; i += 1) {
    i504.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i505[i + 0]) );
  }
  i496.textureParameters = i504
  var i507 = i497[9]
  var i506 = []
  for(var i = 0; i < i507.length; i += 1) {
    i506.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i507[i + 0]) );
  }
  i496.materialFlags = i506
  return i496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i511 = data
  i510.name = i511[0]
  i510.value = i511[1]
  return i510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i514 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i515 = data
  i514.name = i515[0]
  i514.value = new pc.Color(i515[1], i515[2], i515[3], i515[4])
  return i514
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i519 = data
  i518.name = i519[0]
  i518.value = new pc.Vec4( i519[1], i519[2], i519[3], i519[4] )
  return i518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i523 = data
  i522.name = i523[0]
  request.r(i523[1], i523[2], 0, i522, 'value')
  return i522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i526 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i527 = data
  i526.name = i527[0]
  i526.enabled = !!i527[1]
  return i526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i529 = data
  i528.name = i529[0]
  i528.width = i529[1]
  i528.height = i529[2]
  i528.mipmapCount = i529[3]
  i528.anisoLevel = i529[4]
  i528.filterMode = i529[5]
  i528.hdr = !!i529[6]
  i528.format = i529[7]
  i528.wrapMode = i529[8]
  i528.alphaIsTransparency = !!i529[9]
  i528.alphaSource = i529[10]
  i528.graphicsFormat = i529[11]
  i528.sRGBTexture = !!i529[12]
  i528.desiredColorSpace = i529[13]
  i528.wrapU = i529[14]
  i528.wrapV = i529[15]
  return i528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i530 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i531 = data
  i530.name = i531[0]
  i530.atlasId = i531[1]
  i530.mipmapCount = i531[2]
  i530.hdr = !!i531[3]
  i530.size = i531[4]
  i530.anisoLevel = i531[5]
  i530.filterMode = i531[6]
  var i533 = i531[7]
  var i532 = []
  for(var i = 0; i < i533.length; i += 4) {
    i532.push( UnityEngine.Rect.MinMaxRect(i533[i + 0], i533[i + 1], i533[i + 2], i533[i + 3]) );
  }
  i530.rects = i532
  i530.wrapU = i531[8]
  i530.wrapV = i531[9]
  return i530
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i537 = data
  i536.name = i537[0]
  i536.index = i537[1]
  i536.startup = !!i537[2]
  return i536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i538 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i539 = data
  i538.aspect = i539[0]
  i538.orthographic = !!i539[1]
  i538.orthographicSize = i539[2]
  i538.backgroundColor = new pc.Color(i539[3], i539[4], i539[5], i539[6])
  i538.nearClipPlane = i539[7]
  i538.farClipPlane = i539[8]
  i538.fieldOfView = i539[9]
  i538.depth = i539[10]
  i538.clearFlags = i539[11]
  i538.cullingMask = i539[12]
  i538.rect = i539[13]
  request.r(i539[14], i539[15], 0, i538, 'targetTexture')
  i538.usePhysicalProperties = !!i539[16]
  i538.focalLength = i539[17]
  i538.sensorSize = new pc.Vec2( i539[18], i539[19] )
  i538.lensShift = new pc.Vec2( i539[20], i539[21] )
  i538.gateFit = i539[22]
  i538.commandBufferCount = i539[23]
  i538.cameraType = i539[24]
  i538.enabled = !!i539[25]
  return i538
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i541 = data
  i540.name = i541[0]
  i540.tagId = i541[1]
  i540.enabled = !!i541[2]
  i540.isStatic = !!i541[3]
  i540.layer = i541[4]
  return i540
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i542 = root || request.c( 'MobControlAd.MobControlGame' )
  var i543 = data
  i542.fireRate = i543[0]
  i542.roundDuration = i543[1]
  i542.yellowBlockStartHp = i543[2]
  i542.enemyBaseStartHp = i543[3]
  i542.enableGiantChampion = !!i543[4]
  i542.minLoseTime = i543[5]
  i542.frontGateMultiplier = i543[6]
  i542.leftGateMultiplier = i543[7]
  i542.rightGateMultiplier = i543[8]
  i542.ctaText = i543[9]
  i542.defeatTitle = i543[10]
  i542.victoryTitle = i543[11]
  i542.defeatSubtitle = i543[12]
  i542.victorySubtitle = i543[13]
  i542.tutorialText = i543[14]
  i542.backgroundTheme = i543[15]
  i542.characterStyle = i543[16]
  i542.ctaColor = i543[17]
  i542.ctaShape = i543[18]
  return i542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i545 = data
  i544.type = i545[0]
  i544.color = new pc.Color(i545[1], i545[2], i545[3], i545[4])
  i544.cullingMask = i545[5]
  i544.intensity = i545[6]
  i544.range = i545[7]
  i544.spotAngle = i545[8]
  i544.shadows = i545[9]
  i544.shadowNormalBias = i545[10]
  i544.shadowBias = i545[11]
  i544.shadowStrength = i545[12]
  i544.shadowResolution = i545[13]
  i544.lightmapBakeType = i545[14]
  i544.renderMode = i545[15]
  request.r(i545[16], i545[17], 0, i544, 'cookie')
  i544.cookieSize = i545[18]
  i544.shadowNearPlane = i545[19]
  i544.occlusionMaskChannel = i545[20]
  i544.isBaked = !!i545[21]
  i544.mixedLightingMode = i545[22]
  i544.enabled = !!i545[23]
  return i544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i546 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i547 = data
  i546.ambientIntensity = i547[0]
  i546.reflectionIntensity = i547[1]
  i546.ambientMode = i547[2]
  i546.ambientLight = new pc.Color(i547[3], i547[4], i547[5], i547[6])
  i546.ambientSkyColor = new pc.Color(i547[7], i547[8], i547[9], i547[10])
  i546.ambientGroundColor = new pc.Color(i547[11], i547[12], i547[13], i547[14])
  i546.ambientEquatorColor = new pc.Color(i547[15], i547[16], i547[17], i547[18])
  i546.fogColor = new pc.Color(i547[19], i547[20], i547[21], i547[22])
  i546.fogEndDistance = i547[23]
  i546.fogStartDistance = i547[24]
  i546.fogDensity = i547[25]
  i546.fog = !!i547[26]
  request.r(i547[27], i547[28], 0, i546, 'skybox')
  i546.fogMode = i547[29]
  var i549 = i547[30]
  var i548 = []
  for(var i = 0; i < i549.length; i += 1) {
    i548.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i549[i + 0]) );
  }
  i546.lightmaps = i548
  i546.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i547[31], i546.lightProbes)
  i546.lightmapsMode = i547[32]
  i546.mixedBakeMode = i547[33]
  i546.environmentLightingMode = i547[34]
  i546.ambientProbe = new pc.SphericalHarmonicsL2(i547[35])
  request.r(i547[36], i547[37], 0, i546, 'customReflection')
  request.r(i547[38], i547[39], 0, i546, 'defaultReflection')
  i546.defaultReflectionMode = i547[40]
  i546.defaultReflectionResolution = i547[41]
  i546.sunLightObjectId = i547[42]
  i546.pixelLightCount = i547[43]
  i546.defaultReflectionHDR = !!i547[44]
  i546.hasLightDataAsset = !!i547[45]
  i546.hasManualGenerate = !!i547[46]
  return i546
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i553 = data
  request.r(i553[0], i553[1], 0, i552, 'lightmapColor')
  request.r(i553[2], i553[3], 0, i552, 'lightmapDirection')
  request.r(i553[4], i553[5], 0, i552, 'shadowMask')
  return i552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i554 = root || new UnityEngine.LightProbes()
  var i555 = data
  return i554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i563 = data
  i562.pivot = new pc.Vec2( i563[0], i563[1] )
  i562.anchorMin = new pc.Vec2( i563[2], i563[3] )
  i562.anchorMax = new pc.Vec2( i563[4], i563[5] )
  i562.sizeDelta = new pc.Vec2( i563[6], i563[7] )
  i562.anchoredPosition3D = new pc.Vec3( i563[8], i563[9], i563[10] )
  i562.rotation = new pc.Quat(i563[11], i563[12], i563[13], i563[14])
  i562.scale = new pc.Vec3( i563[15], i563[16], i563[17] )
  return i562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i565 = data
  i564.cullTransparentMesh = !!i565[0]
  return i564
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i566 = root || request.c( 'UnityEngine.UI.Text' )
  var i567 = data
  i566.m_FontData = request.d('UnityEngine.UI.FontData', i567[0], i566.m_FontData)
  i566.m_Text = i567[1]
  request.r(i567[2], i567[3], 0, i566, 'm_Material')
  i566.m_Maskable = !!i567[4]
  i566.m_Color = new pc.Color(i567[5], i567[6], i567[7], i567[8])
  i566.m_RaycastTarget = !!i567[9]
  i566.m_RaycastPadding = new pc.Vec4( i567[10], i567[11], i567[12], i567[13] )
  return i566
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i568 = root || request.c( 'UnityEngine.UI.FontData' )
  var i569 = data
  request.r(i569[0], i569[1], 0, i568, 'm_Font')
  i568.m_FontSize = i569[2]
  i568.m_FontStyle = i569[3]
  i568.m_BestFit = !!i569[4]
  i568.m_MinSize = i569[5]
  i568.m_MaxSize = i569[6]
  i568.m_Alignment = i569[7]
  i568.m_AlignByGeometry = !!i569[8]
  i568.m_RichText = !!i569[9]
  i568.m_HorizontalOverflow = i569[10]
  i568.m_VerticalOverflow = i569[11]
  i568.m_LineSpacing = i569[12]
  return i568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i571 = data
  i570.position = new pc.Vec3( i571[0], i571[1], i571[2] )
  i570.scale = new pc.Vec3( i571[3], i571[4], i571[5] )
  i570.rotation = new pc.Quat(i571[6], i571[7], i571[8], i571[9])
  return i570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i573 = data
  request.r(i573[0], i573[1], 0, i572, 'additionalVertexStreams')
  i572.enabled = !!i573[2]
  request.r(i573[3], i573[4], 0, i572, 'sharedMaterial')
  var i575 = i573[5]
  var i574 = []
  for(var i = 0; i < i575.length; i += 2) {
  request.r(i575[i + 0], i575[i + 1], 2, i574, '')
  }
  i572.sharedMaterials = i574
  i572.receiveShadows = !!i573[6]
  i572.shadowCastingMode = i573[7]
  i572.sortingLayerID = i573[8]
  i572.sortingOrder = i573[9]
  i572.lightmapIndex = i573[10]
  i572.lightmapSceneIndex = i573[11]
  i572.lightmapScaleOffset = new pc.Vec4( i573[12], i573[13], i573[14], i573[15] )
  i572.lightProbeUsage = i573[16]
  i572.reflectionProbeUsage = i573[17]
  return i572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i579 = data
  i578.m_Alignment = i579[0]
  i578.m_Anchor = i579[1]
  i578.m_CharacterSize = i579[2]
  request.r(i579[3], i579[4], 0, i578, 'm_Font')
  i578.m_FontSize = i579[5]
  i578.m_FontStyle = i579[6]
  i578.m_LineSpacing = i579[7]
  i578.m_OffsetZ = i579[8]
  i578.m_RichText = !!i579[9]
  i578.m_TabSize = i579[10]
  i578.m_Text = i579[11]
  return i578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i581 = data
  request.r(i581[0], i581[1], 0, i580, 'sharedMesh')
  return i580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i583 = data
  i582.name = i583[0]
  i582.halfPrecision = !!i583[1]
  i582.useSimplification = !!i583[2]
  i582.useUInt32IndexFormat = !!i583[3]
  i582.vertexCount = i583[4]
  i582.aabb = i583[5]
  var i585 = i583[6]
  var i584 = []
  for(var i = 0; i < i585.length; i += 1) {
    i584.push( !!i585[i + 0] );
  }
  i582.streams = i584
  i582.vertices = i583[7]
  var i587 = i583[8]
  var i586 = []
  for(var i = 0; i < i587.length; i += 1) {
    i586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i587[i + 0]) );
  }
  i582.subMeshes = i586
  var i589 = i583[9]
  var i588 = []
  for(var i = 0; i < i589.length; i += 16) {
    i588.push( new pc.Mat4().setData(i589[i + 0], i589[i + 1], i589[i + 2], i589[i + 3],  i589[i + 4], i589[i + 5], i589[i + 6], i589[i + 7],  i589[i + 8], i589[i + 9], i589[i + 10], i589[i + 11],  i589[i + 12], i589[i + 13], i589[i + 14], i589[i + 15]) );
  }
  i582.bindposes = i588
  var i591 = i583[10]
  var i590 = []
  for(var i = 0; i < i591.length; i += 1) {
    i590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i591[i + 0]) );
  }
  i582.blendShapes = i590
  return i582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i597 = data
  i596.triangles = i597[0]
  return i596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i603 = data
  i602.name = i603[0]
  var i605 = i603[1]
  var i604 = []
  for(var i = 0; i < i605.length; i += 1) {
    i604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i605[i + 0]) );
  }
  i602.frames = i604
  return i602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animation"] = function (request, data, root) {
  var i606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animation' )
  var i607 = data
  i606.playAutomatically = !!i607[0]
  request.r(i607[1], i607[2], 0, i606, 'clip')
  var i609 = i607[3]
  var i608 = []
  for(var i = 0; i < i609.length; i += 2) {
  request.r(i609[i + 0], i609[i + 1], 2, i608, '')
  }
  i606.clips = i608
  i606.wrapMode = i607[4]
  i606.enabled = !!i607[5]
  return i606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i613 = data
  request.r(i613[0], i613[1], 0, i612, 'sharedMesh')
  var i615 = i613[2]
  var i614 = []
  for(var i = 0; i < i615.length; i += 2) {
  request.r(i615[i + 0], i615[i + 1], 2, i614, '')
  }
  i612.bones = i614
  i612.updateWhenOffscreen = !!i613[3]
  i612.localBounds = i613[4]
  request.r(i613[5], i613[6], 0, i612, 'rootBone')
  var i617 = i613[7]
  var i616 = []
  for(var i = 0; i < i617.length; i += 1) {
    i616.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i617[i + 0]) );
  }
  i612.blendShapesWeights = i616
  i612.enabled = !!i613[8]
  request.r(i613[9], i613[10], 0, i612, 'sharedMaterial')
  var i619 = i613[11]
  var i618 = []
  for(var i = 0; i < i619.length; i += 2) {
  request.r(i619[i + 0], i619[i + 1], 2, i618, '')
  }
  i612.sharedMaterials = i618
  i612.receiveShadows = !!i613[12]
  i612.shadowCastingMode = i613[13]
  i612.sortingLayerID = i613[14]
  i612.sortingOrder = i613[15]
  i612.lightmapIndex = i613[16]
  i612.lightmapSceneIndex = i613[17]
  i612.lightmapScaleOffset = new pc.Vec4( i613[18], i613[19], i613[20], i613[21] )
  i612.lightProbeUsage = i613[22]
  i612.reflectionProbeUsage = i613[23]
  return i612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i625 = data
  i624.weight = i625[0]
  return i624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i627 = data
  i626.center = new pc.Vec3( i627[0], i627[1], i627[2] )
  i626.radius = i627[3]
  i626.enabled = !!i627[4]
  i626.isTrigger = !!i627[5]
  request.r(i627[6], i627[7], 0, i626, 'material')
  return i626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i628 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i629 = data
  i628.center = new pc.Vec3( i629[0], i629[1], i629[2] )
  i628.radius = i629[3]
  i628.height = i629[4]
  i628.direction = i629[5]
  i628.enabled = !!i629[6]
  i628.isTrigger = !!i629[7]
  request.r(i629[8], i629[9], 0, i628, 'material')
  return i628
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i631 = data
  i630.center = new pc.Vec3( i631[0], i631[1], i631[2] )
  i630.size = new pc.Vec3( i631[3], i631[4], i631[5] )
  i630.enabled = !!i631[6]
  i630.isTrigger = !!i631[7]
  request.r(i631[8], i631[9], 0, i630, 'material')
  return i630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i633 = data
  request.r(i633[0], i633[1], 0, i632, 'sharedMesh')
  i632.convex = !!i633[2]
  i632.enabled = !!i633[3]
  i632.isTrigger = !!i633[4]
  request.r(i633[5], i633[6], 0, i632, 'material')
  return i632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i634 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i635 = data
  var i637 = i635[0]
  var i636 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i637.length; i += 1) {
    i636.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i637[i + 0]));
  }
  i634.ShaderCompilationErrors = i636
  i634.name = i635[1]
  i634.guid = i635[2]
  var i639 = i635[3]
  var i638 = []
  for(var i = 0; i < i639.length; i += 1) {
    i638.push( i639[i + 0] );
  }
  i634.shaderDefinedKeywords = i638
  var i641 = i635[4]
  var i640 = []
  for(var i = 0; i < i641.length; i += 1) {
    i640.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i641[i + 0]) );
  }
  i634.passes = i640
  var i643 = i635[5]
  var i642 = []
  for(var i = 0; i < i643.length; i += 1) {
    i642.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i643[i + 0]) );
  }
  i634.usePasses = i642
  var i645 = i635[6]
  var i644 = []
  for(var i = 0; i < i645.length; i += 1) {
    i644.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i645[i + 0]) );
  }
  i634.defaultParameterValues = i644
  request.r(i635[7], i635[8], 0, i634, 'unityFallbackShader')
  i634.readDepth = !!i635[9]
  i634.hasDepthOnlyPass = !!i635[10]
  i634.isCreatedByShaderGraph = !!i635[11]
  i634.disableBatching = !!i635[12]
  i634.compiled = !!i635[13]
  return i634
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i649 = data
  i648.shaderName = i649[0]
  i648.errorMessage = i649[1]
  return i648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i654 = root || new pc.UnityShaderPass()
  var i655 = data
  i654.id = i655[0]
  i654.subShaderIndex = i655[1]
  i654.name = i655[2]
  i654.passType = i655[3]
  i654.grabPassTextureName = i655[4]
  i654.usePass = !!i655[5]
  i654.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[6], i654.zTest)
  i654.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[7], i654.zWrite)
  i654.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[8], i654.culling)
  i654.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i655[9], i654.blending)
  i654.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i655[10], i654.alphaBlending)
  i654.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[11], i654.colorWriteMask)
  i654.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[12], i654.offsetUnits)
  i654.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[13], i654.offsetFactor)
  i654.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[14], i654.stencilRef)
  i654.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[15], i654.stencilReadMask)
  i654.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i655[16], i654.stencilWriteMask)
  i654.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i655[17], i654.stencilOp)
  i654.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i655[18], i654.stencilOpFront)
  i654.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i655[19], i654.stencilOpBack)
  var i657 = i655[20]
  var i656 = []
  for(var i = 0; i < i657.length; i += 1) {
    i656.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i657[i + 0]) );
  }
  i654.tags = i656
  var i659 = i655[21]
  var i658 = []
  for(var i = 0; i < i659.length; i += 1) {
    i658.push( i659[i + 0] );
  }
  i654.passDefinedKeywords = i658
  var i661 = i655[22]
  var i660 = []
  for(var i = 0; i < i661.length; i += 1) {
    i660.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i661[i + 0]) );
  }
  i654.passDefinedKeywordGroups = i660
  var i663 = i655[23]
  var i662 = []
  for(var i = 0; i < i663.length; i += 1) {
    i662.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i663[i + 0]) );
  }
  i654.variants = i662
  var i665 = i655[24]
  var i664 = []
  for(var i = 0; i < i665.length; i += 1) {
    i664.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i665[i + 0]) );
  }
  i654.excludedVariants = i664
  i654.hasDepthReader = !!i655[25]
  return i654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i667 = data
  i666.val = i667[0]
  i666.name = i667[1]
  return i666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i669 = data
  i668.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i669[0], i668.src)
  i668.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i669[1], i668.dst)
  i668.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i669[2], i668.op)
  return i668
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i671 = data
  i670.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i671[0], i670.pass)
  i670.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i671[1], i670.fail)
  i670.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i671[2], i670.zFail)
  i670.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i671[3], i670.comp)
  return i670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i674 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i675 = data
  i674.name = i675[0]
  i674.value = i675[1]
  return i674
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i679 = data
  var i681 = i679[0]
  var i680 = []
  for(var i = 0; i < i681.length; i += 1) {
    i680.push( i681[i + 0] );
  }
  i678.keywords = i680
  i678.hasDiscard = !!i679[1]
  return i678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i685 = data
  i684.passId = i685[0]
  i684.subShaderIndex = i685[1]
  var i687 = i685[2]
  var i686 = []
  for(var i = 0; i < i687.length; i += 1) {
    i686.push( i687[i + 0] );
  }
  i684.keywords = i686
  i684.vertexProgram = i685[3]
  i684.fragmentProgram = i685[4]
  i684.exportedForWebGl2 = !!i685[5]
  i684.readDepth = !!i685[6]
  return i684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i691 = data
  request.r(i691[0], i691[1], 0, i690, 'shader')
  i690.pass = i691[2]
  return i690
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i694 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i695 = data
  i694.name = i695[0]
  i694.type = i695[1]
  i694.value = new pc.Vec4( i695[2], i695[3], i695[4], i695[5] )
  i694.textureValue = i695[6]
  i694.shaderPropertyFlag = i695[7]
  return i694
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i696 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i697 = data
  i696.name = i697[0]
  return i696
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i698 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i699 = data
  i698.name = i699[0]
  i698.wrapMode = i699[1]
  i698.isLooping = !!i699[2]
  i698.length = i699[3]
  var i701 = i699[4]
  var i700 = []
  for(var i = 0; i < i701.length; i += 1) {
    i700.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i701[i + 0]) );
  }
  i698.curves = i700
  var i703 = i699[5]
  var i702 = []
  for(var i = 0; i < i703.length; i += 1) {
    i702.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i703[i + 0]) );
  }
  i698.events = i702
  i698.halfPrecision = !!i699[6]
  i698._frameRate = i699[7]
  i698.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i699[8], i698.localBounds)
  i698.hasMuscleCurves = !!i699[9]
  var i705 = i699[10]
  var i704 = []
  for(var i = 0; i < i705.length; i += 1) {
    i704.push( i705[i + 0] );
  }
  i698.clipMuscleConstant = i704
  i698.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i699[11], i698.clipBindingConstant)
  return i698
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i708 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i709 = data
  i708.path = i709[0]
  i708.hash = i709[1]
  i708.componentType = i709[2]
  i708.property = i709[3]
  i708.keys = i709[4]
  var i711 = i709[5]
  var i710 = []
  for(var i = 0; i < i711.length; i += 1) {
    i710.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i711[i + 0]) );
  }
  i708.objectReferenceKeys = i710
  return i708
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i714 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i715 = data
  i714.time = i715[0]
  request.r(i715[1], i715[2], 0, i714, 'value')
  return i714
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i718 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i719 = data
  i718.functionName = i719[0]
  i718.floatParameter = i719[1]
  i718.intParameter = i719[2]
  i718.stringParameter = i719[3]
  request.r(i719[4], i719[5], 0, i718, 'objectReferenceParameter')
  i718.time = i719[6]
  return i718
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i720 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i721 = data
  i720.center = new pc.Vec3( i721[0], i721[1], i721[2] )
  i720.extends = new pc.Vec3( i721[3], i721[4], i721[5] )
  return i720
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i724 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i725 = data
  var i727 = i725[0]
  var i726 = []
  for(var i = 0; i < i727.length; i += 1) {
    i726.push( i727[i + 0] );
  }
  i724.genericBindings = i726
  var i729 = i725[1]
  var i728 = []
  for(var i = 0; i < i729.length; i += 1) {
    i728.push( i729[i + 0] );
  }
  i724.pptrCurveMapping = i728
  return i724
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i730 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i731 = data
  i730.name = i731[0]
  i730.ascent = i731[1]
  i730.originalLineHeight = i731[2]
  i730.fontSize = i731[3]
  var i733 = i731[4]
  var i732 = []
  for(var i = 0; i < i733.length; i += 1) {
    i732.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i733[i + 0]) );
  }
  i730.characterInfo = i732
  request.r(i731[5], i731[6], 0, i730, 'texture')
  i730.originalFontSize = i731[7]
  return i730
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i736 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i737 = data
  i736.index = i737[0]
  i736.advance = i737[1]
  i736.bearing = i737[2]
  i736.glyphWidth = i737[3]
  i736.glyphHeight = i737[4]
  i736.minX = i737[5]
  i736.maxX = i737[6]
  i736.minY = i737[7]
  i736.maxY = i737[8]
  i736.uvBottomLeftX = i737[9]
  i736.uvBottomLeftY = i737[10]
  i736.uvBottomRightX = i737[11]
  i736.uvBottomRightY = i737[12]
  i736.uvTopLeftX = i737[13]
  i736.uvTopLeftY = i737[14]
  i736.uvTopRightX = i737[15]
  i736.uvTopRightY = i737[16]
  return i736
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i738 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i739 = data
  i738.name = i739[0]
  i738.bytes64 = i739[1]
  i738.data = i739[2]
  return i738
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i740 = root || request.c( 'TMPro.TMP_Settings' )
  var i741 = data
  i740.assetVersion = i741[0]
  i740.m_TextWrappingMode = i741[1]
  i740.m_enableKerning = !!i741[2]
  var i743 = i741[3]
  var i742 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i743.length; i += 1) {
    i742.add(i743[i + 0]);
  }
  i740.m_ActiveFontFeatures = i742
  i740.m_enableExtraPadding = !!i741[4]
  i740.m_enableTintAllSprites = !!i741[5]
  i740.m_enableParseEscapeCharacters = !!i741[6]
  i740.m_EnableRaycastTarget = !!i741[7]
  i740.m_GetFontFeaturesAtRuntime = !!i741[8]
  i740.m_missingGlyphCharacter = i741[9]
  i740.m_ClearDynamicDataOnBuild = !!i741[10]
  i740.m_warningsDisabled = !!i741[11]
  request.r(i741[12], i741[13], 0, i740, 'm_defaultFontAsset')
  i740.m_defaultFontAssetPath = i741[14]
  i740.m_defaultFontSize = i741[15]
  i740.m_defaultAutoSizeMinRatio = i741[16]
  i740.m_defaultAutoSizeMaxRatio = i741[17]
  i740.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i741[18], i741[19] )
  i740.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i741[20], i741[21] )
  i740.m_autoSizeTextContainer = !!i741[22]
  i740.m_IsTextObjectScaleStatic = !!i741[23]
  var i745 = i741[24]
  var i744 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i745.length; i += 2) {
  request.r(i745[i + 0], i745[i + 1], 1, i744, '')
  }
  i740.m_fallbackFontAssets = i744
  i740.m_matchMaterialPreset = !!i741[25]
  i740.m_HideSubTextObjects = !!i741[26]
  request.r(i741[27], i741[28], 0, i740, 'm_defaultSpriteAsset')
  i740.m_defaultSpriteAssetPath = i741[29]
  i740.m_enableEmojiSupport = !!i741[30]
  i740.m_MissingCharacterSpriteUnicode = i741[31]
  var i747 = i741[32]
  var i746 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i747.length; i += 2) {
  request.r(i747[i + 0], i747[i + 1], 1, i746, '')
  }
  i740.m_EmojiFallbackTextAssets = i746
  i740.m_defaultColorGradientPresetsPath = i741[33]
  request.r(i741[34], i741[35], 0, i740, 'm_defaultStyleSheet')
  i740.m_StyleSheetsResourcePath = i741[36]
  request.r(i741[37], i741[38], 0, i740, 'm_leadingCharacters')
  request.r(i741[39], i741[40], 0, i740, 'm_followingCharacters')
  i740.m_UseModernHangulLineBreakingRules = !!i741[41]
  return i740
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i754 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i755 = data
  i754.normalStyle = i755[0]
  i754.normalSpacingOffset = i755[1]
  i754.boldStyle = i755[2]
  i754.boldSpacing = i755[3]
  i754.italicStyle = i755[4]
  i754.tabSize = i755[5]
  request.r(i755[6], i755[7], 0, i754, 'atlas')
  i754.m_SourceFontFileGUID = i755[8]
  i754.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i755[9], i754.m_CreationSettings)
  request.r(i755[10], i755[11], 0, i754, 'm_SourceFontFile')
  i754.m_SourceFontFilePath = i755[12]
  i754.m_AtlasPopulationMode = i755[13]
  i754.InternalDynamicOS = !!i755[14]
  var i757 = i755[15]
  var i756 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i757.length; i += 1) {
    i756.add(request.d('UnityEngine.TextCore.Glyph', i757[i + 0]));
  }
  i754.m_GlyphTable = i756
  var i759 = i755[16]
  var i758 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i759.length; i += 1) {
    i758.add(request.d('TMPro.TMP_Character', i759[i + 0]));
  }
  i754.m_CharacterTable = i758
  var i761 = i755[17]
  var i760 = []
  for(var i = 0; i < i761.length; i += 2) {
  request.r(i761[i + 0], i761[i + 1], 2, i760, '')
  }
  i754.m_AtlasTextures = i760
  i754.m_AtlasTextureIndex = i755[18]
  i754.m_IsMultiAtlasTexturesEnabled = !!i755[19]
  i754.m_GetFontFeatures = !!i755[20]
  i754.m_ClearDynamicDataOnBuild = !!i755[21]
  i754.m_AtlasWidth = i755[22]
  i754.m_AtlasHeight = i755[23]
  i754.m_AtlasPadding = i755[24]
  i754.m_AtlasRenderMode = i755[25]
  var i763 = i755[26]
  var i762 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i763.length; i += 1) {
    i762.add(request.d('UnityEngine.TextCore.GlyphRect', i763[i + 0]));
  }
  i754.m_UsedGlyphRects = i762
  var i765 = i755[27]
  var i764 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i765.length; i += 1) {
    i764.add(request.d('UnityEngine.TextCore.GlyphRect', i765[i + 0]));
  }
  i754.m_FreeGlyphRects = i764
  i754.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i755[28], i754.m_FontFeatureTable)
  i754.m_ShouldReimportFontFeatures = !!i755[29]
  var i767 = i755[30]
  var i766 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i767.length; i += 2) {
  request.r(i767[i + 0], i767[i + 1], 1, i766, '')
  }
  i754.m_FallbackFontAssetTable = i766
  var i769 = i755[31]
  var i768 = []
  for(var i = 0; i < i769.length; i += 1) {
    i768.push( request.d('TMPro.TMP_FontWeightPair', i769[i + 0]) );
  }
  i754.m_FontWeightTable = i768
  var i771 = i755[32]
  var i770 = []
  for(var i = 0; i < i771.length; i += 1) {
    i770.push( request.d('TMPro.TMP_FontWeightPair', i771[i + 0]) );
  }
  i754.fontWeights = i770
  i754.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i755[33], i754.m_fontInfo)
  var i773 = i755[34]
  var i772 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i773.length; i += 1) {
    i772.add(request.d('TMPro.TMP_Glyph', i773[i + 0]));
  }
  i754.m_glyphInfoList = i772
  i754.m_KerningTable = request.d('TMPro.KerningTable', i755[35], i754.m_KerningTable)
  var i775 = i755[36]
  var i774 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i775.length; i += 2) {
  request.r(i775[i + 0], i775[i + 1], 1, i774, '')
  }
  i754.fallbackFontAssets = i774
  i754.m_Version = i755[37]
  i754.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i755[38], i754.m_FaceInfo)
  request.r(i755[39], i755[40], 0, i754, 'm_Material')
  return i754
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i776 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i777 = data
  i776.sourceFontFileName = i777[0]
  i776.sourceFontFileGUID = i777[1]
  i776.faceIndex = i777[2]
  i776.pointSizeSamplingMode = i777[3]
  i776.pointSize = i777[4]
  i776.padding = i777[5]
  i776.paddingMode = i777[6]
  i776.packingMode = i777[7]
  i776.atlasWidth = i777[8]
  i776.atlasHeight = i777[9]
  i776.characterSetSelectionMode = i777[10]
  i776.characterSequence = i777[11]
  i776.referencedFontAssetGUID = i777[12]
  i776.referencedTextAssetGUID = i777[13]
  i776.fontStyle = i777[14]
  i776.fontStyleModifier = i777[15]
  i776.renderMode = i777[16]
  i776.includeFontFeatures = !!i777[17]
  return i776
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i780 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i781 = data
  i780.m_Index = i781[0]
  i780.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i781[1], i780.m_Metrics)
  i780.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i781[2], i780.m_GlyphRect)
  i780.m_Scale = i781[3]
  i780.m_AtlasIndex = i781[4]
  i780.m_ClassDefinitionType = i781[5]
  return i780
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i782 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i783 = data
  i782.m_Width = i783[0]
  i782.m_Height = i783[1]
  i782.m_HorizontalBearingX = i783[2]
  i782.m_HorizontalBearingY = i783[3]
  i782.m_HorizontalAdvance = i783[4]
  return i782
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i784 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i785 = data
  i784.m_X = i785[0]
  i784.m_Y = i785[1]
  i784.m_Width = i785[2]
  i784.m_Height = i785[3]
  return i784
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i788 = root || request.c( 'TMPro.TMP_Character' )
  var i789 = data
  i788.m_ElementType = i789[0]
  i788.m_Unicode = i789[1]
  i788.m_GlyphIndex = i789[2]
  i788.m_Scale = i789[3]
  return i788
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i794 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i795 = data
  var i797 = i795[0]
  var i796 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i797.length; i += 1) {
    i796.add(request.d('TMPro.MultipleSubstitutionRecord', i797[i + 0]));
  }
  i794.m_MultipleSubstitutionRecords = i796
  var i799 = i795[1]
  var i798 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i799.length; i += 1) {
    i798.add(request.d('TMPro.LigatureSubstitutionRecord', i799[i + 0]));
  }
  i794.m_LigatureSubstitutionRecords = i798
  var i801 = i795[2]
  var i800 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i801.length; i += 1) {
    i800.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i801[i + 0]));
  }
  i794.m_GlyphPairAdjustmentRecords = i800
  var i803 = i795[3]
  var i802 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i803.length; i += 1) {
    i802.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i803[i + 0]));
  }
  i794.m_MarkToBaseAdjustmentRecords = i802
  var i805 = i795[4]
  var i804 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i805.length; i += 1) {
    i804.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i805[i + 0]));
  }
  i794.m_MarkToMarkAdjustmentRecords = i804
  return i794
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i808 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i809 = data
  i808.m_TargetGlyphID = i809[0]
  i808.m_SubstituteGlyphIDs = i809[1]
  return i808
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i812 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i813 = data
  i812.m_ComponentGlyphIDs = i813[0]
  i812.m_LigatureGlyphID = i813[1]
  return i812
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i816 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i817 = data
  i816.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i817[0], i816.m_FirstAdjustmentRecord)
  i816.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i817[1], i816.m_SecondAdjustmentRecord)
  i816.m_FeatureLookupFlags = i817[2]
  return i816
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i818 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i819 = data
  i818.m_GlyphIndex = i819[0]
  i818.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i819[1], i818.m_GlyphValueRecord)
  return i818
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i820 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i821 = data
  i820.m_XPlacement = i821[0]
  i820.m_YPlacement = i821[1]
  i820.m_XAdvance = i821[2]
  i820.m_YAdvance = i821[3]
  return i820
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i824 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i825 = data
  i824.m_BaseGlyphID = i825[0]
  i824.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i825[1], i824.m_BaseGlyphAnchorPoint)
  i824.m_MarkGlyphID = i825[2]
  i824.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i825[3], i824.m_MarkPositionAdjustment)
  return i824
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i828 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i829 = data
  i828.m_BaseMarkGlyphID = i829[0]
  i828.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i829[1], i828.m_BaseMarkGlyphAnchorPoint)
  i828.m_CombiningMarkGlyphID = i829[2]
  i828.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i829[3], i828.m_CombiningMarkPositionAdjustment)
  return i828
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i832 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i833 = data
  request.r(i833[0], i833[1], 0, i832, 'regularTypeface')
  request.r(i833[2], i833[3], 0, i832, 'italicTypeface')
  return i832
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i834 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i835 = data
  i834.Name = i835[0]
  i834.PointSize = i835[1]
  i834.Scale = i835[2]
  i834.CharacterCount = i835[3]
  i834.LineHeight = i835[4]
  i834.Baseline = i835[5]
  i834.Ascender = i835[6]
  i834.CapHeight = i835[7]
  i834.Descender = i835[8]
  i834.CenterLine = i835[9]
  i834.SuperscriptOffset = i835[10]
  i834.SubscriptOffset = i835[11]
  i834.SubSize = i835[12]
  i834.Underline = i835[13]
  i834.UnderlineThickness = i835[14]
  i834.strikethrough = i835[15]
  i834.strikethroughThickness = i835[16]
  i834.TabWidth = i835[17]
  i834.Padding = i835[18]
  i834.AtlasWidth = i835[19]
  i834.AtlasHeight = i835[20]
  return i834
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i838 = root || request.c( 'TMPro.TMP_Glyph' )
  var i839 = data
  i838.id = i839[0]
  i838.x = i839[1]
  i838.y = i839[2]
  i838.width = i839[3]
  i838.height = i839[4]
  i838.xOffset = i839[5]
  i838.yOffset = i839[6]
  i838.xAdvance = i839[7]
  i838.scale = i839[8]
  return i838
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i840 = root || request.c( 'TMPro.KerningTable' )
  var i841 = data
  var i843 = i841[0]
  var i842 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i843.length; i += 1) {
    i842.add(request.d('TMPro.KerningPair', i843[i + 0]));
  }
  i840.kerningPairs = i842
  return i840
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i846 = root || request.c( 'TMPro.KerningPair' )
  var i847 = data
  i846.xOffset = i847[0]
  i846.m_FirstGlyph = i847[1]
  i846.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i847[2], i846.m_FirstGlyphAdjustments)
  i846.m_SecondGlyph = i847[3]
  i846.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i847[4], i846.m_SecondGlyphAdjustments)
  i846.m_IgnoreSpacingAdjustments = !!i847[5]
  return i846
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i848 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i849 = data
  i848.m_FaceIndex = i849[0]
  i848.m_FamilyName = i849[1]
  i848.m_StyleName = i849[2]
  i848.m_PointSize = i849[3]
  i848.m_Scale = i849[4]
  i848.m_UnitsPerEM = i849[5]
  i848.m_LineHeight = i849[6]
  i848.m_AscentLine = i849[7]
  i848.m_CapLine = i849[8]
  i848.m_MeanLine = i849[9]
  i848.m_Baseline = i849[10]
  i848.m_DescentLine = i849[11]
  i848.m_SuperscriptOffset = i849[12]
  i848.m_SuperscriptSize = i849[13]
  i848.m_SubscriptOffset = i849[14]
  i848.m_SubscriptSize = i849[15]
  i848.m_UnderlineOffset = i849[16]
  i848.m_UnderlineThickness = i849[17]
  i848.m_StrikethroughOffset = i849[18]
  i848.m_StrikethroughThickness = i849[19]
  i848.m_TabWidth = i849[20]
  return i848
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i850 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i851 = data
  request.r(i851[0], i851[1], 0, i850, 'spriteSheet')
  var i853 = i851[2]
  var i852 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i853.length; i += 1) {
    i852.add(request.d('TMPro.TMP_Sprite', i853[i + 0]));
  }
  i850.spriteInfoList = i852
  var i855 = i851[3]
  var i854 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i855.length; i += 2) {
  request.r(i855[i + 0], i855[i + 1], 1, i854, '')
  }
  i850.fallbackSpriteAssets = i854
  var i857 = i851[4]
  var i856 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i857.length; i += 1) {
    i856.add(request.d('TMPro.TMP_SpriteCharacter', i857[i + 0]));
  }
  i850.m_SpriteCharacterTable = i856
  var i859 = i851[5]
  var i858 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i859.length; i += 1) {
    i858.add(request.d('TMPro.TMP_SpriteGlyph', i859[i + 0]));
  }
  i850.m_GlyphTable = i858
  i850.m_Version = i851[6]
  i850.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i851[7], i850.m_FaceInfo)
  request.r(i851[8], i851[9], 0, i850, 'm_Material')
  return i850
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i862 = root || request.c( 'TMPro.TMP_Sprite' )
  var i863 = data
  i862.name = i863[0]
  i862.hashCode = i863[1]
  i862.unicode = i863[2]
  i862.pivot = new pc.Vec2( i863[3], i863[4] )
  request.r(i863[5], i863[6], 0, i862, 'sprite')
  i862.id = i863[7]
  i862.x = i863[8]
  i862.y = i863[9]
  i862.width = i863[10]
  i862.height = i863[11]
  i862.xOffset = i863[12]
  i862.yOffset = i863[13]
  i862.xAdvance = i863[14]
  i862.scale = i863[15]
  return i862
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i868 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i869 = data
  i868.m_Name = i869[0]
  i868.m_ElementType = i869[1]
  i868.m_Unicode = i869[2]
  i868.m_GlyphIndex = i869[3]
  i868.m_Scale = i869[4]
  return i868
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i872 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i873 = data
  request.r(i873[0], i873[1], 0, i872, 'sprite')
  i872.m_Index = i873[2]
  i872.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i873[3], i872.m_Metrics)
  i872.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i873[4], i872.m_GlyphRect)
  i872.m_Scale = i873[5]
  i872.m_AtlasIndex = i873[6]
  i872.m_ClassDefinitionType = i873[7]
  return i872
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i874 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i875 = data
  var i877 = i875[0]
  var i876 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i877.length; i += 1) {
    i876.add(request.d('TMPro.TMP_Style', i877[i + 0]));
  }
  i874.m_StyleList = i876
  return i874
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i880 = root || request.c( 'TMPro.TMP_Style' )
  var i881 = data
  i880.m_Name = i881[0]
  i880.m_HashCode = i881[1]
  i880.m_OpeningDefinition = i881[2]
  i880.m_ClosingDefinition = i881[3]
  i880.m_OpeningTagArray = i881[4]
  i880.m_ClosingTagArray = i881[5]
  return i880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i883 = data
  var i885 = i883[0]
  var i884 = []
  for(var i = 0; i < i885.length; i += 1) {
    i884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i885[i + 0]) );
  }
  i882.files = i884
  i882.componentToPrefabIds = i883[1]
  return i882
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i889 = data
  i888.path = i889[0]
  request.r(i889[1], i889[2], 0, i888, 'unityObject')
  return i888
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i890 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i891 = data
  var i893 = i891[0]
  var i892 = []
  for(var i = 0; i < i893.length; i += 1) {
    i892.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i893[i + 0]) );
  }
  i890.scriptsExecutionOrder = i892
  var i895 = i891[1]
  var i894 = []
  for(var i = 0; i < i895.length; i += 1) {
    i894.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i895[i + 0]) );
  }
  i890.sortingLayers = i894
  var i897 = i891[2]
  var i896 = []
  for(var i = 0; i < i897.length; i += 1) {
    i896.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i897[i + 0]) );
  }
  i890.cullingLayers = i896
  i890.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i891[3], i890.timeSettings)
  i890.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i891[4], i890.physicsSettings)
  i890.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i891[5], i890.physics2DSettings)
  i890.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i891[6], i890.qualitySettings)
  i890.enableRealtimeShadows = !!i891[7]
  i890.enableAutoInstancing = !!i891[8]
  i890.enableStaticBatching = !!i891[9]
  i890.enableDynamicBatching = !!i891[10]
  i890.usePreservativeDynamicBatching = !!i891[11]
  i890.lightmapEncodingQuality = i891[12]
  i890.desiredColorSpace = i891[13]
  var i899 = i891[14]
  var i898 = []
  for(var i = 0; i < i899.length; i += 1) {
    i898.push( i899[i + 0] );
  }
  i890.allTags = i898
  return i890
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i902 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i903 = data
  i902.name = i903[0]
  i902.value = i903[1]
  return i902
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i906 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i907 = data
  i906.id = i907[0]
  i906.name = i907[1]
  i906.value = i907[2]
  return i906
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i910 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i911 = data
  i910.id = i911[0]
  i910.name = i911[1]
  return i910
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i912 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i913 = data
  i912.fixedDeltaTime = i913[0]
  i912.maximumDeltaTime = i913[1]
  i912.timeScale = i913[2]
  i912.maximumParticleTimestep = i913[3]
  return i912
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i914 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i915 = data
  i914.gravity = new pc.Vec3( i915[0], i915[1], i915[2] )
  i914.defaultSolverIterations = i915[3]
  i914.bounceThreshold = i915[4]
  i914.autoSyncTransforms = !!i915[5]
  i914.autoSimulation = !!i915[6]
  var i917 = i915[7]
  var i916 = []
  for(var i = 0; i < i917.length; i += 1) {
    i916.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i917[i + 0]) );
  }
  i914.collisionMatrix = i916
  return i914
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i920 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i921 = data
  i920.enabled = !!i921[0]
  i920.layerId = i921[1]
  i920.otherLayerId = i921[2]
  return i920
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i922 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i923 = data
  request.r(i923[0], i923[1], 0, i922, 'material')
  i922.gravity = new pc.Vec2( i923[2], i923[3] )
  i922.positionIterations = i923[4]
  i922.velocityIterations = i923[5]
  i922.velocityThreshold = i923[6]
  i922.maxLinearCorrection = i923[7]
  i922.maxAngularCorrection = i923[8]
  i922.maxTranslationSpeed = i923[9]
  i922.maxRotationSpeed = i923[10]
  i922.baumgarteScale = i923[11]
  i922.baumgarteTOIScale = i923[12]
  i922.timeToSleep = i923[13]
  i922.linearSleepTolerance = i923[14]
  i922.angularSleepTolerance = i923[15]
  i922.defaultContactOffset = i923[16]
  i922.autoSimulation = !!i923[17]
  i922.queriesHitTriggers = !!i923[18]
  i922.queriesStartInColliders = !!i923[19]
  i922.callbacksOnDisable = !!i923[20]
  i922.reuseCollisionCallbacks = !!i923[21]
  i922.autoSyncTransforms = !!i923[22]
  var i925 = i923[23]
  var i924 = []
  for(var i = 0; i < i925.length; i += 1) {
    i924.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i925[i + 0]) );
  }
  i922.collisionMatrix = i924
  return i922
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i928 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i929 = data
  i928.enabled = !!i929[0]
  i928.layerId = i929[1]
  i928.otherLayerId = i929[2]
  return i928
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i930 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i931 = data
  var i933 = i931[0]
  var i932 = []
  for(var i = 0; i < i933.length; i += 1) {
    i932.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i933[i + 0]) );
  }
  i930.qualityLevels = i932
  var i935 = i931[1]
  var i934 = []
  for(var i = 0; i < i935.length; i += 1) {
    i934.push( i935[i + 0] );
  }
  i930.names = i934
  i930.shadows = i931[2]
  i930.anisotropicFiltering = i931[3]
  i930.antiAliasing = i931[4]
  i930.lodBias = i931[5]
  i930.shadowCascades = i931[6]
  i930.shadowDistance = i931[7]
  i930.shadowmaskMode = i931[8]
  i930.shadowProjection = i931[9]
  i930.shadowResolution = i931[10]
  i930.softParticles = !!i931[11]
  i930.softVegetation = !!i931[12]
  i930.activeColorSpace = i931[13]
  i930.desiredColorSpace = i931[14]
  i930.masterTextureLimit = i931[15]
  i930.maxQueuedFrames = i931[16]
  i930.particleRaycastBudget = i931[17]
  i930.pixelLightCount = i931[18]
  i930.realtimeReflectionProbes = !!i931[19]
  i930.shadowCascade2Split = i931[20]
  i930.shadowCascade4Split = new pc.Vec3( i931[21], i931[22], i931[23] )
  i930.streamingMipmapsActive = !!i931[24]
  i930.vSyncCount = i931[25]
  i930.asyncUploadBufferSize = i931[26]
  i930.asyncUploadTimeSlice = i931[27]
  i930.billboardsFaceCameraPosition = !!i931[28]
  i930.shadowNearPlaneOffset = i931[29]
  i930.streamingMipmapsMemoryBudget = i931[30]
  i930.maximumLODLevel = i931[31]
  i930.streamingMipmapsAddAllCameras = !!i931[32]
  i930.streamingMipmapsMaxLevelReduction = i931[33]
  i930.streamingMipmapsRenderersPerFrame = i931[34]
  i930.resolutionScalingFixedDPIFactor = i931[35]
  i930.streamingMipmapsMaxFileIORequests = i931[36]
  i930.currentQualityLevel = i931[37]
  return i930
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i940 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i941 = data
  i940.weight = i941[0]
  i940.vertices = i941[1]
  i940.normals = i941[2]
  i940.tangents = i941[3]
  return i940
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i942 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i943 = data
  i942.m_XCoordinate = i943[0]
  i942.m_YCoordinate = i943[1]
  return i942
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i944 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i945 = data
  i944.m_XPositionAdjustment = i945[0]
  i944.m_YPositionAdjustment = i945[1]
  return i944
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i946 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i947 = data
  i946.xPlacement = i947[0]
  i946.yPlacement = i947[1]
  i946.xAdvance = i947[2]
  i946.yAdvance = i947[3]
  return i946
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.Animation":{"playAutomatically":0,"clip":1,"clips":3,"wrapMode":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"33":[34],"35":[34],"36":[34],"37":[34],"38":[34],"39":[34],"40":[21],"41":[1],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[1],"16":[15],"64":[65],"66":[65],"67":[9],"68":[69],"70":[5],"71":[5],"72":[9],"73":[15,9],"74":[9,10],"75":[9],"76":[10,9],"77":[15],"78":[10,9],"79":[9],"80":[9],"81":[9],"82":[67],"83":[10,9],"84":[9],"85":[67],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[9],"95":[10,9],"96":[9],"97":[9],"98":[9],"99":[9],"12":[10,9],"100":[9],"101":[102],"103":[102],"104":[102],"105":[102],"106":[1],"107":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.Animation","UnityEngine.AnimationClip","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "2.1";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1687";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4603";

Deserializers.runtimeAnalysisExcludedModules = "physics2d, particle-system, reflection, mecanim-wasm";

Deserializers.isRuntimeAnalysisEnabledForShaders = "True";

Deserializers.isRealtimeShadowsEnabled = "False";

Deserializers.isLunaCompilerV2Used = "True";

Deserializers.companyName = "DefaultCompany";

Deserializers.buildPlatform = "StandaloneWindows64";

Deserializers.applicationIdentifier = "com.DefaultCompany.Jelly-Puzzle-Playable";

Deserializers.disableAntiAliasing = true;

Deserializers.graphicsConstraint = 24;

Deserializers.linearColorSpace = false;

Deserializers.buildID = "8aaae3af-76f3-4e02-9f33-7e1eb1073592";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["AdKit","Prims","ResetStatics"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

