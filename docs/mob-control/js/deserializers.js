var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.JointSpring' )
  var i1423 = data
  i1422.spring = i1423[0]
  i1422.damper = i1423[1]
  i1422.targetPosition = i1423[2]
  return i1422
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1424 = root || request.c( 'UnityEngine.JointMotor' )
  var i1425 = data
  i1424.m_TargetVelocity = i1425[0]
  i1424.m_Force = i1425[1]
  i1424.m_FreeSpin = i1425[2]
  return i1424
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1426 = root || request.c( 'UnityEngine.JointLimits' )
  var i1427 = data
  i1426.m_Min = i1427[0]
  i1426.m_Max = i1427[1]
  i1426.m_Bounciness = i1427[2]
  i1426.m_BounceMinVelocity = i1427[3]
  i1426.m_ContactDistance = i1427[4]
  i1426.minBounce = i1427[5]
  i1426.maxBounce = i1427[6]
  return i1426
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1428 = root || request.c( 'UnityEngine.JointDrive' )
  var i1429 = data
  i1428.m_PositionSpring = i1429[0]
  i1428.m_PositionDamper = i1429[1]
  i1428.m_MaximumForce = i1429[2]
  i1428.m_UseAcceleration = i1429[3]
  return i1428
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1430 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1431 = data
  i1430.m_Spring = i1431[0]
  i1430.m_Damper = i1431[1]
  return i1430
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1432 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1433 = data
  i1432.m_Limit = i1433[0]
  i1432.m_Bounciness = i1433[1]
  i1432.m_ContactDistance = i1433[2]
  return i1432
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1434 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1435 = data
  i1434.m_ExtremumSlip = i1435[0]
  i1434.m_ExtremumValue = i1435[1]
  i1434.m_AsymptoteSlip = i1435[2]
  i1434.m_AsymptoteValue = i1435[3]
  i1434.m_Stiffness = i1435[4]
  return i1434
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1436 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1437 = data
  i1436.m_LowerAngle = i1437[0]
  i1436.m_UpperAngle = i1437[1]
  return i1436
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1438 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1439 = data
  i1438.m_MotorSpeed = i1439[0]
  i1438.m_MaximumMotorTorque = i1439[1]
  return i1438
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1440 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1441 = data
  i1440.m_DampingRatio = i1441[0]
  i1440.m_Frequency = i1441[1]
  i1440.m_Angle = i1441[2]
  return i1440
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1442 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1443 = data
  i1442.m_LowerTranslation = i1443[0]
  i1442.m_UpperTranslation = i1443[1]
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1444 = root || new pc.UnityMaterial()
  var i1445 = data
  i1444.name = i1445[0]
  request.r(i1445[1], i1445[2], 0, i1444, 'shader')
  i1444.renderQueue = i1445[3]
  i1444.enableInstancing = !!i1445[4]
  var i1447 = i1445[5]
  var i1446 = []
  for(var i = 0; i < i1447.length; i += 1) {
    i1446.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1447[i + 0]) );
  }
  i1444.floatParameters = i1446
  var i1449 = i1445[6]
  var i1448 = []
  for(var i = 0; i < i1449.length; i += 1) {
    i1448.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1449[i + 0]) );
  }
  i1444.colorParameters = i1448
  var i1451 = i1445[7]
  var i1450 = []
  for(var i = 0; i < i1451.length; i += 1) {
    i1450.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1451[i + 0]) );
  }
  i1444.vectorParameters = i1450
  var i1453 = i1445[8]
  var i1452 = []
  for(var i = 0; i < i1453.length; i += 1) {
    i1452.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1453[i + 0]) );
  }
  i1444.textureParameters = i1452
  var i1455 = i1445[9]
  var i1454 = []
  for(var i = 0; i < i1455.length; i += 1) {
    i1454.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1455[i + 0]) );
  }
  i1444.materialFlags = i1454
  return i1444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1459 = data
  i1458.name = i1459[0]
  i1458.value = i1459[1]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1462 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1463 = data
  i1462.name = i1463[0]
  i1462.value = new pc.Color(i1463[1], i1463[2], i1463[3], i1463[4])
  return i1462
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1467 = data
  i1466.name = i1467[0]
  i1466.value = new pc.Vec4( i1467[1], i1467[2], i1467[3], i1467[4] )
  return i1466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1471 = data
  i1470.name = i1471[0]
  request.r(i1471[1], i1471[2], 0, i1470, 'value')
  return i1470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1475 = data
  i1474.name = i1475[0]
  i1474.enabled = !!i1475[1]
  return i1474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1477 = data
  i1476.name = i1477[0]
  i1476.width = i1477[1]
  i1476.height = i1477[2]
  i1476.mipmapCount = i1477[3]
  i1476.anisoLevel = i1477[4]
  i1476.filterMode = i1477[5]
  i1476.hdr = !!i1477[6]
  i1476.format = i1477[7]
  i1476.wrapMode = i1477[8]
  i1476.alphaIsTransparency = !!i1477[9]
  i1476.alphaSource = i1477[10]
  i1476.graphicsFormat = i1477[11]
  i1476.sRGBTexture = !!i1477[12]
  i1476.desiredColorSpace = i1477[13]
  i1476.wrapU = i1477[14]
  i1476.wrapV = i1477[15]
  return i1476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1479 = data
  i1478.name = i1479[0]
  i1478.atlasId = i1479[1]
  i1478.mipmapCount = i1479[2]
  i1478.hdr = !!i1479[3]
  i1478.size = i1479[4]
  i1478.anisoLevel = i1479[5]
  i1478.filterMode = i1479[6]
  var i1481 = i1479[7]
  var i1480 = []
  for(var i = 0; i < i1481.length; i += 4) {
    i1480.push( UnityEngine.Rect.MinMaxRect(i1481[i + 0], i1481[i + 1], i1481[i + 2], i1481[i + 3]) );
  }
  i1478.rects = i1480
  i1478.wrapU = i1479[8]
  i1478.wrapV = i1479[9]
  return i1478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1484 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1485 = data
  i1484.name = i1485[0]
  i1484.index = i1485[1]
  i1484.startup = !!i1485[2]
  return i1484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1486 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1487 = data
  i1486.aspect = i1487[0]
  i1486.orthographic = !!i1487[1]
  i1486.orthographicSize = i1487[2]
  i1486.backgroundColor = new pc.Color(i1487[3], i1487[4], i1487[5], i1487[6])
  i1486.nearClipPlane = i1487[7]
  i1486.farClipPlane = i1487[8]
  i1486.fieldOfView = i1487[9]
  i1486.depth = i1487[10]
  i1486.clearFlags = i1487[11]
  i1486.cullingMask = i1487[12]
  i1486.rect = i1487[13]
  request.r(i1487[14], i1487[15], 0, i1486, 'targetTexture')
  i1486.usePhysicalProperties = !!i1487[16]
  i1486.focalLength = i1487[17]
  i1486.sensorSize = new pc.Vec2( i1487[18], i1487[19] )
  i1486.lensShift = new pc.Vec2( i1487[20], i1487[21] )
  i1486.gateFit = i1487[22]
  i1486.commandBufferCount = i1487[23]
  i1486.cameraType = i1487[24]
  i1486.enabled = !!i1487[25]
  return i1486
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1489 = data
  i1488.name = i1489[0]
  i1488.tagId = i1489[1]
  i1488.enabled = !!i1489[2]
  i1488.isStatic = !!i1489[3]
  i1488.layer = i1489[4]
  return i1488
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i1490 = root || request.c( 'MobControlAd.MobControlGame' )
  var i1491 = data
  i1490.fireRate = i1491[0]
  i1490.roundDuration = i1491[1]
  i1490.yellowBlockStartHp = i1491[2]
  i1490.enemyBaseStartHp = i1491[3]
  i1490.enableGiantChampion = !!i1491[4]
  i1490.minLoseTime = i1491[5]
  i1490.frontGateMultiplier = i1491[6]
  i1490.leftGateMultiplier = i1491[7]
  i1490.rightGateMultiplier = i1491[8]
  i1490.ctaText = i1491[9]
  i1490.defeatTitle = i1491[10]
  i1490.victoryTitle = i1491[11]
  i1490.defeatSubtitle = i1491[12]
  i1490.victorySubtitle = i1491[13]
  i1490.tutorialText = i1491[14]
  i1490.backgroundTheme = i1491[15]
  i1490.characterStyle = i1491[16]
  i1490.ctaColor = i1491[17]
  i1490.ctaShape = i1491[18]
  return i1490
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1493 = data
  i1492.type = i1493[0]
  i1492.color = new pc.Color(i1493[1], i1493[2], i1493[3], i1493[4])
  i1492.cullingMask = i1493[5]
  i1492.intensity = i1493[6]
  i1492.range = i1493[7]
  i1492.spotAngle = i1493[8]
  i1492.shadows = i1493[9]
  i1492.shadowNormalBias = i1493[10]
  i1492.shadowBias = i1493[11]
  i1492.shadowStrength = i1493[12]
  i1492.shadowResolution = i1493[13]
  i1492.lightmapBakeType = i1493[14]
  i1492.renderMode = i1493[15]
  request.r(i1493[16], i1493[17], 0, i1492, 'cookie')
  i1492.cookieSize = i1493[18]
  i1492.shadowNearPlane = i1493[19]
  i1492.occlusionMaskChannel = i1493[20]
  i1492.isBaked = !!i1493[21]
  i1492.mixedLightingMode = i1493[22]
  i1492.enabled = !!i1493[23]
  return i1492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1495 = data
  i1494.ambientIntensity = i1495[0]
  i1494.reflectionIntensity = i1495[1]
  i1494.ambientMode = i1495[2]
  i1494.ambientLight = new pc.Color(i1495[3], i1495[4], i1495[5], i1495[6])
  i1494.ambientSkyColor = new pc.Color(i1495[7], i1495[8], i1495[9], i1495[10])
  i1494.ambientGroundColor = new pc.Color(i1495[11], i1495[12], i1495[13], i1495[14])
  i1494.ambientEquatorColor = new pc.Color(i1495[15], i1495[16], i1495[17], i1495[18])
  i1494.fogColor = new pc.Color(i1495[19], i1495[20], i1495[21], i1495[22])
  i1494.fogEndDistance = i1495[23]
  i1494.fogStartDistance = i1495[24]
  i1494.fogDensity = i1495[25]
  i1494.fog = !!i1495[26]
  request.r(i1495[27], i1495[28], 0, i1494, 'skybox')
  i1494.fogMode = i1495[29]
  var i1497 = i1495[30]
  var i1496 = []
  for(var i = 0; i < i1497.length; i += 1) {
    i1496.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1497[i + 0]) );
  }
  i1494.lightmaps = i1496
  i1494.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1495[31], i1494.lightProbes)
  i1494.lightmapsMode = i1495[32]
  i1494.mixedBakeMode = i1495[33]
  i1494.environmentLightingMode = i1495[34]
  i1494.ambientProbe = new pc.SphericalHarmonicsL2(i1495[35])
  request.r(i1495[36], i1495[37], 0, i1494, 'customReflection')
  request.r(i1495[38], i1495[39], 0, i1494, 'defaultReflection')
  i1494.defaultReflectionMode = i1495[40]
  i1494.defaultReflectionResolution = i1495[41]
  i1494.sunLightObjectId = i1495[42]
  i1494.pixelLightCount = i1495[43]
  i1494.defaultReflectionHDR = !!i1495[44]
  i1494.hasLightDataAsset = !!i1495[45]
  i1494.hasManualGenerate = !!i1495[46]
  return i1494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1501 = data
  request.r(i1501[0], i1501[1], 0, i1500, 'lightmapColor')
  request.r(i1501[2], i1501[3], 0, i1500, 'lightmapDirection')
  request.r(i1501[4], i1501[5], 0, i1500, 'shadowMask')
  return i1500
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1502 = root || new UnityEngine.LightProbes()
  var i1503 = data
  return i1502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1511 = data
  i1510.pivot = new pc.Vec2( i1511[0], i1511[1] )
  i1510.anchorMin = new pc.Vec2( i1511[2], i1511[3] )
  i1510.anchorMax = new pc.Vec2( i1511[4], i1511[5] )
  i1510.sizeDelta = new pc.Vec2( i1511[6], i1511[7] )
  i1510.anchoredPosition3D = new pc.Vec3( i1511[8], i1511[9], i1511[10] )
  i1510.rotation = new pc.Quat(i1511[11], i1511[12], i1511[13], i1511[14])
  i1510.scale = new pc.Vec3( i1511[15], i1511[16], i1511[17] )
  return i1510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1513 = data
  i1512.cullTransparentMesh = !!i1513[0]
  return i1512
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1514 = root || request.c( 'UnityEngine.UI.Text' )
  var i1515 = data
  i1514.m_FontData = request.d('UnityEngine.UI.FontData', i1515[0], i1514.m_FontData)
  i1514.m_Text = i1515[1]
  request.r(i1515[2], i1515[3], 0, i1514, 'm_Material')
  i1514.m_Maskable = !!i1515[4]
  i1514.m_Color = new pc.Color(i1515[5], i1515[6], i1515[7], i1515[8])
  i1514.m_RaycastTarget = !!i1515[9]
  i1514.m_RaycastPadding = new pc.Vec4( i1515[10], i1515[11], i1515[12], i1515[13] )
  return i1514
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1516 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1517 = data
  request.r(i1517[0], i1517[1], 0, i1516, 'm_Font')
  i1516.m_FontSize = i1517[2]
  i1516.m_FontStyle = i1517[3]
  i1516.m_BestFit = !!i1517[4]
  i1516.m_MinSize = i1517[5]
  i1516.m_MaxSize = i1517[6]
  i1516.m_Alignment = i1517[7]
  i1516.m_AlignByGeometry = !!i1517[8]
  i1516.m_RichText = !!i1517[9]
  i1516.m_HorizontalOverflow = i1517[10]
  i1516.m_VerticalOverflow = i1517[11]
  i1516.m_LineSpacing = i1517[12]
  return i1516
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i1518 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i1519 = data
  i1518.position = new pc.Vec3( i1519[0], i1519[1], i1519[2] )
  i1518.scale = new pc.Vec3( i1519[3], i1519[4], i1519[5] )
  i1518.rotation = new pc.Quat(i1519[6], i1519[7], i1519[8], i1519[9])
  return i1518
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1520 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1521 = data
  request.r(i1521[0], i1521[1], 0, i1520, 'additionalVertexStreams')
  i1520.enabled = !!i1521[2]
  request.r(i1521[3], i1521[4], 0, i1520, 'sharedMaterial')
  var i1523 = i1521[5]
  var i1522 = []
  for(var i = 0; i < i1523.length; i += 2) {
  request.r(i1523[i + 0], i1523[i + 1], 2, i1522, '')
  }
  i1520.sharedMaterials = i1522
  i1520.receiveShadows = !!i1521[6]
  i1520.shadowCastingMode = i1521[7]
  i1520.sortingLayerID = i1521[8]
  i1520.sortingOrder = i1521[9]
  i1520.lightmapIndex = i1521[10]
  i1520.lightmapSceneIndex = i1521[11]
  i1520.lightmapScaleOffset = new pc.Vec4( i1521[12], i1521[13], i1521[14], i1521[15] )
  i1520.lightProbeUsage = i1521[16]
  i1520.reflectionProbeUsage = i1521[17]
  return i1520
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i1526 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i1527 = data
  i1526.m_Alignment = i1527[0]
  i1526.m_Anchor = i1527[1]
  i1526.m_CharacterSize = i1527[2]
  request.r(i1527[3], i1527[4], 0, i1526, 'm_Font')
  i1526.m_FontSize = i1527[5]
  i1526.m_FontStyle = i1527[6]
  i1526.m_LineSpacing = i1527[7]
  i1526.m_OffsetZ = i1527[8]
  i1526.m_RichText = !!i1527[9]
  i1526.m_TabSize = i1527[10]
  i1526.m_Text = i1527[11]
  return i1526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1529 = data
  request.r(i1529[0], i1529[1], 0, i1528, 'sharedMesh')
  var i1531 = i1529[2]
  var i1530 = []
  for(var i = 0; i < i1531.length; i += 2) {
  request.r(i1531[i + 0], i1531[i + 1], 2, i1530, '')
  }
  i1528.bones = i1530
  i1528.updateWhenOffscreen = !!i1529[3]
  i1528.localBounds = i1529[4]
  request.r(i1529[5], i1529[6], 0, i1528, 'rootBone')
  var i1533 = i1529[7]
  var i1532 = []
  for(var i = 0; i < i1533.length; i += 1) {
    i1532.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1533[i + 0]) );
  }
  i1528.blendShapesWeights = i1532
  i1528.enabled = !!i1529[8]
  request.r(i1529[9], i1529[10], 0, i1528, 'sharedMaterial')
  var i1535 = i1529[11]
  var i1534 = []
  for(var i = 0; i < i1535.length; i += 2) {
  request.r(i1535[i + 0], i1535[i + 1], 2, i1534, '')
  }
  i1528.sharedMaterials = i1534
  i1528.receiveShadows = !!i1529[12]
  i1528.shadowCastingMode = i1529[13]
  i1528.sortingLayerID = i1529[14]
  i1528.sortingOrder = i1529[15]
  i1528.lightmapIndex = i1529[16]
  i1528.lightmapSceneIndex = i1529[17]
  i1528.lightmapScaleOffset = new pc.Vec4( i1529[18], i1529[19], i1529[20], i1529[21] )
  i1528.lightProbeUsage = i1529[22]
  i1528.reflectionProbeUsage = i1529[23]
  return i1528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1540 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1541 = data
  i1540.weight = i1541[0]
  return i1540
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1542 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1543 = data
  i1542.name = i1543[0]
  i1542.halfPrecision = !!i1543[1]
  i1542.useSimplification = !!i1543[2]
  i1542.useUInt32IndexFormat = !!i1543[3]
  i1542.vertexCount = i1543[4]
  i1542.aabb = i1543[5]
  var i1545 = i1543[6]
  var i1544 = []
  for(var i = 0; i < i1545.length; i += 1) {
    i1544.push( !!i1545[i + 0] );
  }
  i1542.streams = i1544
  i1542.vertices = i1543[7]
  var i1547 = i1543[8]
  var i1546 = []
  for(var i = 0; i < i1547.length; i += 1) {
    i1546.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1547[i + 0]) );
  }
  i1542.subMeshes = i1546
  var i1549 = i1543[9]
  var i1548 = []
  for(var i = 0; i < i1549.length; i += 16) {
    i1548.push( new pc.Mat4().setData(i1549[i + 0], i1549[i + 1], i1549[i + 2], i1549[i + 3],  i1549[i + 4], i1549[i + 5], i1549[i + 6], i1549[i + 7],  i1549[i + 8], i1549[i + 9], i1549[i + 10], i1549[i + 11],  i1549[i + 12], i1549[i + 13], i1549[i + 14], i1549[i + 15]) );
  }
  i1542.bindposes = i1548
  var i1551 = i1543[10]
  var i1550 = []
  for(var i = 0; i < i1551.length; i += 1) {
    i1550.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1551[i + 0]) );
  }
  i1542.blendShapes = i1550
  return i1542
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1557 = data
  i1556.triangles = i1557[0]
  return i1556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1563 = data
  i1562.name = i1563[0]
  var i1565 = i1563[1]
  var i1564 = []
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1565[i + 0]) );
  }
  i1562.frames = i1564
  return i1562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1568 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1569 = data
  i1568.weight = i1569[0]
  i1568.vertices = i1569[1]
  i1568.normals = i1569[2]
  i1568.tangents = i1569[3]
  return i1568
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animation"] = function (request, data, root) {
  var i1570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animation' )
  var i1571 = data
  i1570.playAutomatically = !!i1571[0]
  request.r(i1571[1], i1571[2], 0, i1570, 'clip')
  var i1573 = i1571[3]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 2) {
  request.r(i1573[i + 0], i1573[i + 1], 2, i1572, '')
  }
  i1570.clips = i1572
  i1570.wrapMode = i1571[4]
  i1570.enabled = !!i1571[5]
  return i1570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1577 = data
  request.r(i1577[0], i1577[1], 0, i1576, 'sharedMesh')
  return i1576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1579 = data
  i1578.center = new pc.Vec3( i1579[0], i1579[1], i1579[2] )
  i1578.radius = i1579[3]
  i1578.enabled = !!i1579[4]
  i1578.isTrigger = !!i1579[5]
  request.r(i1579[6], i1579[7], 0, i1578, 'material')
  return i1578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i1580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i1581 = data
  i1580.center = new pc.Vec3( i1581[0], i1581[1], i1581[2] )
  i1580.radius = i1581[3]
  i1580.height = i1581[4]
  i1580.direction = i1581[5]
  i1580.enabled = !!i1581[6]
  i1580.isTrigger = !!i1581[7]
  request.r(i1581[8], i1581[9], 0, i1580, 'material')
  return i1580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1583 = data
  i1582.center = new pc.Vec3( i1583[0], i1583[1], i1583[2] )
  i1582.size = new pc.Vec3( i1583[3], i1583[4], i1583[5] )
  i1582.enabled = !!i1583[6]
  i1582.isTrigger = !!i1583[7]
  request.r(i1583[8], i1583[9], 0, i1582, 'material')
  return i1582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i1584 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i1585 = data
  request.r(i1585[0], i1585[1], 0, i1584, 'sharedMesh')
  i1584.convex = !!i1585[2]
  i1584.enabled = !!i1585[3]
  i1584.isTrigger = !!i1585[4]
  request.r(i1585[5], i1585[6], 0, i1584, 'material')
  return i1584
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1586 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1587 = data
  var i1589 = i1587[0]
  var i1588 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1589.length; i += 1) {
    i1588.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1589[i + 0]));
  }
  i1586.ShaderCompilationErrors = i1588
  i1586.name = i1587[1]
  i1586.guid = i1587[2]
  var i1591 = i1587[3]
  var i1590 = []
  for(var i = 0; i < i1591.length; i += 1) {
    i1590.push( i1591[i + 0] );
  }
  i1586.shaderDefinedKeywords = i1590
  var i1593 = i1587[4]
  var i1592 = []
  for(var i = 0; i < i1593.length; i += 1) {
    i1592.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1593[i + 0]) );
  }
  i1586.passes = i1592
  var i1595 = i1587[5]
  var i1594 = []
  for(var i = 0; i < i1595.length; i += 1) {
    i1594.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1595[i + 0]) );
  }
  i1586.usePasses = i1594
  var i1597 = i1587[6]
  var i1596 = []
  for(var i = 0; i < i1597.length; i += 1) {
    i1596.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1597[i + 0]) );
  }
  i1586.defaultParameterValues = i1596
  request.r(i1587[7], i1587[8], 0, i1586, 'unityFallbackShader')
  i1586.readDepth = !!i1587[9]
  i1586.hasDepthOnlyPass = !!i1587[10]
  i1586.isCreatedByShaderGraph = !!i1587[11]
  i1586.disableBatching = !!i1587[12]
  i1586.compiled = !!i1587[13]
  return i1586
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1600 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1601 = data
  i1600.shaderName = i1601[0]
  i1600.errorMessage = i1601[1]
  return i1600
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1606 = root || new pc.UnityShaderPass()
  var i1607 = data
  i1606.id = i1607[0]
  i1606.subShaderIndex = i1607[1]
  i1606.name = i1607[2]
  i1606.passType = i1607[3]
  i1606.grabPassTextureName = i1607[4]
  i1606.usePass = !!i1607[5]
  i1606.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[6], i1606.zTest)
  i1606.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[7], i1606.zWrite)
  i1606.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[8], i1606.culling)
  i1606.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1607[9], i1606.blending)
  i1606.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1607[10], i1606.alphaBlending)
  i1606.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[11], i1606.colorWriteMask)
  i1606.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[12], i1606.offsetUnits)
  i1606.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[13], i1606.offsetFactor)
  i1606.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[14], i1606.stencilRef)
  i1606.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[15], i1606.stencilReadMask)
  i1606.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1607[16], i1606.stencilWriteMask)
  i1606.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1607[17], i1606.stencilOp)
  i1606.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1607[18], i1606.stencilOpFront)
  i1606.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1607[19], i1606.stencilOpBack)
  var i1609 = i1607[20]
  var i1608 = []
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1609[i + 0]) );
  }
  i1606.tags = i1608
  var i1611 = i1607[21]
  var i1610 = []
  for(var i = 0; i < i1611.length; i += 1) {
    i1610.push( i1611[i + 0] );
  }
  i1606.passDefinedKeywords = i1610
  var i1613 = i1607[22]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1613[i + 0]) );
  }
  i1606.passDefinedKeywordGroups = i1612
  var i1615 = i1607[23]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1615[i + 0]) );
  }
  i1606.variants = i1614
  var i1617 = i1607[24]
  var i1616 = []
  for(var i = 0; i < i1617.length; i += 1) {
    i1616.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1617[i + 0]) );
  }
  i1606.excludedVariants = i1616
  i1606.hasDepthReader = !!i1607[25]
  return i1606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1619 = data
  i1618.val = i1619[0]
  i1618.name = i1619[1]
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1621 = data
  i1620.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1621[0], i1620.src)
  i1620.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1621[1], i1620.dst)
  i1620.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1621[2], i1620.op)
  return i1620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1623 = data
  i1622.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1623[0], i1622.pass)
  i1622.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1623[1], i1622.fail)
  i1622.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1623[2], i1622.zFail)
  i1622.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1623[3], i1622.comp)
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1627 = data
  i1626.name = i1627[0]
  i1626.value = i1627[1]
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1630 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1631 = data
  var i1633 = i1631[0]
  var i1632 = []
  for(var i = 0; i < i1633.length; i += 1) {
    i1632.push( i1633[i + 0] );
  }
  i1630.keywords = i1632
  i1630.hasDiscard = !!i1631[1]
  return i1630
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1637 = data
  i1636.passId = i1637[0]
  i1636.subShaderIndex = i1637[1]
  var i1639 = i1637[2]
  var i1638 = []
  for(var i = 0; i < i1639.length; i += 1) {
    i1638.push( i1639[i + 0] );
  }
  i1636.keywords = i1638
  i1636.vertexProgram = i1637[3]
  i1636.fragmentProgram = i1637[4]
  i1636.exportedForWebGl2 = !!i1637[5]
  i1636.readDepth = !!i1637[6]
  return i1636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1643 = data
  request.r(i1643[0], i1643[1], 0, i1642, 'shader')
  i1642.pass = i1643[2]
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1647 = data
  i1646.name = i1647[0]
  i1646.type = i1647[1]
  i1646.value = new pc.Vec4( i1647[2], i1647[3], i1647[4], i1647[5] )
  i1646.textureValue = i1647[6]
  i1646.shaderPropertyFlag = i1647[7]
  return i1646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1649 = data
  i1648.name = i1649[0]
  return i1648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1650 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1651 = data
  i1650.name = i1651[0]
  i1650.wrapMode = i1651[1]
  i1650.isLooping = !!i1651[2]
  i1650.length = i1651[3]
  var i1653 = i1651[4]
  var i1652 = []
  for(var i = 0; i < i1653.length; i += 1) {
    i1652.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1653[i + 0]) );
  }
  i1650.curves = i1652
  var i1655 = i1651[5]
  var i1654 = []
  for(var i = 0; i < i1655.length; i += 1) {
    i1654.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1655[i + 0]) );
  }
  i1650.events = i1654
  i1650.halfPrecision = !!i1651[6]
  i1650._frameRate = i1651[7]
  i1650.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1651[8], i1650.localBounds)
  i1650.hasMuscleCurves = !!i1651[9]
  var i1657 = i1651[10]
  var i1656 = []
  for(var i = 0; i < i1657.length; i += 1) {
    i1656.push( i1657[i + 0] );
  }
  i1650.clipMuscleConstant = i1656
  i1650.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1651[11], i1650.clipBindingConstant)
  return i1650
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1661 = data
  i1660.path = i1661[0]
  i1660.hash = i1661[1]
  i1660.componentType = i1661[2]
  i1660.property = i1661[3]
  i1660.keys = i1661[4]
  var i1663 = i1661[5]
  var i1662 = []
  for(var i = 0; i < i1663.length; i += 1) {
    i1662.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1663[i + 0]) );
  }
  i1660.objectReferenceKeys = i1662
  return i1660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1667 = data
  i1666.time = i1667[0]
  request.r(i1667[1], i1667[2], 0, i1666, 'value')
  return i1666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1670 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1671 = data
  i1670.functionName = i1671[0]
  i1670.floatParameter = i1671[1]
  i1670.intParameter = i1671[2]
  i1670.stringParameter = i1671[3]
  request.r(i1671[4], i1671[5], 0, i1670, 'objectReferenceParameter')
  i1670.time = i1671[6]
  return i1670
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1672 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1673 = data
  i1672.center = new pc.Vec3( i1673[0], i1673[1], i1673[2] )
  i1672.extends = new pc.Vec3( i1673[3], i1673[4], i1673[5] )
  return i1672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1676 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1677 = data
  var i1679 = i1677[0]
  var i1678 = []
  for(var i = 0; i < i1679.length; i += 1) {
    i1678.push( i1679[i + 0] );
  }
  i1676.genericBindings = i1678
  var i1681 = i1677[1]
  var i1680 = []
  for(var i = 0; i < i1681.length; i += 1) {
    i1680.push( i1681[i + 0] );
  }
  i1676.pptrCurveMapping = i1680
  return i1676
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1682 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1683 = data
  i1682.name = i1683[0]
  i1682.ascent = i1683[1]
  i1682.originalLineHeight = i1683[2]
  i1682.fontSize = i1683[3]
  var i1685 = i1683[4]
  var i1684 = []
  for(var i = 0; i < i1685.length; i += 1) {
    i1684.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1685[i + 0]) );
  }
  i1682.characterInfo = i1684
  request.r(i1683[5], i1683[6], 0, i1682, 'texture')
  i1682.originalFontSize = i1683[7]
  return i1682
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1688 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1689 = data
  i1688.index = i1689[0]
  i1688.advance = i1689[1]
  i1688.bearing = i1689[2]
  i1688.glyphWidth = i1689[3]
  i1688.glyphHeight = i1689[4]
  i1688.minX = i1689[5]
  i1688.maxX = i1689[6]
  i1688.minY = i1689[7]
  i1688.maxY = i1689[8]
  i1688.uvBottomLeftX = i1689[9]
  i1688.uvBottomLeftY = i1689[10]
  i1688.uvBottomRightX = i1689[11]
  i1688.uvBottomRightY = i1689[12]
  i1688.uvTopLeftX = i1689[13]
  i1688.uvTopLeftY = i1689[14]
  i1688.uvTopRightX = i1689[15]
  i1688.uvTopRightY = i1689[16]
  return i1688
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1690 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1691 = data
  i1690.name = i1691[0]
  i1690.bytes64 = i1691[1]
  i1690.data = i1691[2]
  return i1690
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1692 = root || request.c( 'TMPro.TMP_Settings' )
  var i1693 = data
  i1692.assetVersion = i1693[0]
  i1692.m_TextWrappingMode = i1693[1]
  i1692.m_enableKerning = !!i1693[2]
  var i1695 = i1693[3]
  var i1694 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1695.length; i += 1) {
    i1694.add(i1695[i + 0]);
  }
  i1692.m_ActiveFontFeatures = i1694
  i1692.m_enableExtraPadding = !!i1693[4]
  i1692.m_enableTintAllSprites = !!i1693[5]
  i1692.m_enableParseEscapeCharacters = !!i1693[6]
  i1692.m_EnableRaycastTarget = !!i1693[7]
  i1692.m_GetFontFeaturesAtRuntime = !!i1693[8]
  i1692.m_missingGlyphCharacter = i1693[9]
  i1692.m_ClearDynamicDataOnBuild = !!i1693[10]
  i1692.m_warningsDisabled = !!i1693[11]
  request.r(i1693[12], i1693[13], 0, i1692, 'm_defaultFontAsset')
  i1692.m_defaultFontAssetPath = i1693[14]
  i1692.m_defaultFontSize = i1693[15]
  i1692.m_defaultAutoSizeMinRatio = i1693[16]
  i1692.m_defaultAutoSizeMaxRatio = i1693[17]
  i1692.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1693[18], i1693[19] )
  i1692.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1693[20], i1693[21] )
  i1692.m_autoSizeTextContainer = !!i1693[22]
  i1692.m_IsTextObjectScaleStatic = !!i1693[23]
  var i1697 = i1693[24]
  var i1696 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1697.length; i += 2) {
  request.r(i1697[i + 0], i1697[i + 1], 1, i1696, '')
  }
  i1692.m_fallbackFontAssets = i1696
  i1692.m_matchMaterialPreset = !!i1693[25]
  i1692.m_HideSubTextObjects = !!i1693[26]
  request.r(i1693[27], i1693[28], 0, i1692, 'm_defaultSpriteAsset')
  i1692.m_defaultSpriteAssetPath = i1693[29]
  i1692.m_enableEmojiSupport = !!i1693[30]
  i1692.m_MissingCharacterSpriteUnicode = i1693[31]
  var i1699 = i1693[32]
  var i1698 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1699.length; i += 2) {
  request.r(i1699[i + 0], i1699[i + 1], 1, i1698, '')
  }
  i1692.m_EmojiFallbackTextAssets = i1698
  i1692.m_defaultColorGradientPresetsPath = i1693[33]
  request.r(i1693[34], i1693[35], 0, i1692, 'm_defaultStyleSheet')
  i1692.m_StyleSheetsResourcePath = i1693[36]
  request.r(i1693[37], i1693[38], 0, i1692, 'm_leadingCharacters')
  request.r(i1693[39], i1693[40], 0, i1692, 'm_followingCharacters')
  i1692.m_UseModernHangulLineBreakingRules = !!i1693[41]
  return i1692
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1706 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1707 = data
  i1706.normalStyle = i1707[0]
  i1706.normalSpacingOffset = i1707[1]
  i1706.boldStyle = i1707[2]
  i1706.boldSpacing = i1707[3]
  i1706.italicStyle = i1707[4]
  i1706.tabSize = i1707[5]
  request.r(i1707[6], i1707[7], 0, i1706, 'atlas')
  i1706.m_SourceFontFileGUID = i1707[8]
  i1706.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1707[9], i1706.m_CreationSettings)
  request.r(i1707[10], i1707[11], 0, i1706, 'm_SourceFontFile')
  i1706.m_SourceFontFilePath = i1707[12]
  i1706.m_AtlasPopulationMode = i1707[13]
  i1706.InternalDynamicOS = !!i1707[14]
  var i1709 = i1707[15]
  var i1708 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1709.length; i += 1) {
    i1708.add(request.d('UnityEngine.TextCore.Glyph', i1709[i + 0]));
  }
  i1706.m_GlyphTable = i1708
  var i1711 = i1707[16]
  var i1710 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1711.length; i += 1) {
    i1710.add(request.d('TMPro.TMP_Character', i1711[i + 0]));
  }
  i1706.m_CharacterTable = i1710
  var i1713 = i1707[17]
  var i1712 = []
  for(var i = 0; i < i1713.length; i += 2) {
  request.r(i1713[i + 0], i1713[i + 1], 2, i1712, '')
  }
  i1706.m_AtlasTextures = i1712
  i1706.m_AtlasTextureIndex = i1707[18]
  i1706.m_IsMultiAtlasTexturesEnabled = !!i1707[19]
  i1706.m_GetFontFeatures = !!i1707[20]
  i1706.m_ClearDynamicDataOnBuild = !!i1707[21]
  i1706.m_AtlasWidth = i1707[22]
  i1706.m_AtlasHeight = i1707[23]
  i1706.m_AtlasPadding = i1707[24]
  i1706.m_AtlasRenderMode = i1707[25]
  var i1715 = i1707[26]
  var i1714 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1715.length; i += 1) {
    i1714.add(request.d('UnityEngine.TextCore.GlyphRect', i1715[i + 0]));
  }
  i1706.m_UsedGlyphRects = i1714
  var i1717 = i1707[27]
  var i1716 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1717.length; i += 1) {
    i1716.add(request.d('UnityEngine.TextCore.GlyphRect', i1717[i + 0]));
  }
  i1706.m_FreeGlyphRects = i1716
  i1706.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1707[28], i1706.m_FontFeatureTable)
  i1706.m_ShouldReimportFontFeatures = !!i1707[29]
  var i1719 = i1707[30]
  var i1718 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1719.length; i += 2) {
  request.r(i1719[i + 0], i1719[i + 1], 1, i1718, '')
  }
  i1706.m_FallbackFontAssetTable = i1718
  var i1721 = i1707[31]
  var i1720 = []
  for(var i = 0; i < i1721.length; i += 1) {
    i1720.push( request.d('TMPro.TMP_FontWeightPair', i1721[i + 0]) );
  }
  i1706.m_FontWeightTable = i1720
  var i1723 = i1707[32]
  var i1722 = []
  for(var i = 0; i < i1723.length; i += 1) {
    i1722.push( request.d('TMPro.TMP_FontWeightPair', i1723[i + 0]) );
  }
  i1706.fontWeights = i1722
  i1706.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1707[33], i1706.m_fontInfo)
  var i1725 = i1707[34]
  var i1724 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1725.length; i += 1) {
    i1724.add(request.d('TMPro.TMP_Glyph', i1725[i + 0]));
  }
  i1706.m_glyphInfoList = i1724
  i1706.m_KerningTable = request.d('TMPro.KerningTable', i1707[35], i1706.m_KerningTable)
  var i1727 = i1707[36]
  var i1726 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1727.length; i += 2) {
  request.r(i1727[i + 0], i1727[i + 1], 1, i1726, '')
  }
  i1706.fallbackFontAssets = i1726
  i1706.m_Version = i1707[37]
  i1706.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1707[38], i1706.m_FaceInfo)
  request.r(i1707[39], i1707[40], 0, i1706, 'm_Material')
  return i1706
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1728 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1729 = data
  i1728.sourceFontFileName = i1729[0]
  i1728.sourceFontFileGUID = i1729[1]
  i1728.faceIndex = i1729[2]
  i1728.pointSizeSamplingMode = i1729[3]
  i1728.pointSize = i1729[4]
  i1728.padding = i1729[5]
  i1728.paddingMode = i1729[6]
  i1728.packingMode = i1729[7]
  i1728.atlasWidth = i1729[8]
  i1728.atlasHeight = i1729[9]
  i1728.characterSetSelectionMode = i1729[10]
  i1728.characterSequence = i1729[11]
  i1728.referencedFontAssetGUID = i1729[12]
  i1728.referencedTextAssetGUID = i1729[13]
  i1728.fontStyle = i1729[14]
  i1728.fontStyleModifier = i1729[15]
  i1728.renderMode = i1729[16]
  i1728.includeFontFeatures = !!i1729[17]
  return i1728
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1732 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1733 = data
  i1732.m_Index = i1733[0]
  i1732.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1733[1], i1732.m_Metrics)
  i1732.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1733[2], i1732.m_GlyphRect)
  i1732.m_Scale = i1733[3]
  i1732.m_AtlasIndex = i1733[4]
  i1732.m_ClassDefinitionType = i1733[5]
  return i1732
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1734 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1735 = data
  i1734.m_Width = i1735[0]
  i1734.m_Height = i1735[1]
  i1734.m_HorizontalBearingX = i1735[2]
  i1734.m_HorizontalBearingY = i1735[3]
  i1734.m_HorizontalAdvance = i1735[4]
  return i1734
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1736 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1737 = data
  i1736.m_X = i1737[0]
  i1736.m_Y = i1737[1]
  i1736.m_Width = i1737[2]
  i1736.m_Height = i1737[3]
  return i1736
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1740 = root || request.c( 'TMPro.TMP_Character' )
  var i1741 = data
  i1740.m_ElementType = i1741[0]
  i1740.m_Unicode = i1741[1]
  i1740.m_GlyphIndex = i1741[2]
  i1740.m_Scale = i1741[3]
  return i1740
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1746 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1747 = data
  var i1749 = i1747[0]
  var i1748 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1749.length; i += 1) {
    i1748.add(request.d('TMPro.MultipleSubstitutionRecord', i1749[i + 0]));
  }
  i1746.m_MultipleSubstitutionRecords = i1748
  var i1751 = i1747[1]
  var i1750 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1751.length; i += 1) {
    i1750.add(request.d('TMPro.LigatureSubstitutionRecord', i1751[i + 0]));
  }
  i1746.m_LigatureSubstitutionRecords = i1750
  var i1753 = i1747[2]
  var i1752 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1753.length; i += 1) {
    i1752.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1753[i + 0]));
  }
  i1746.m_GlyphPairAdjustmentRecords = i1752
  var i1755 = i1747[3]
  var i1754 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1755.length; i += 1) {
    i1754.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1755[i + 0]));
  }
  i1746.m_MarkToBaseAdjustmentRecords = i1754
  var i1757 = i1747[4]
  var i1756 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1757.length; i += 1) {
    i1756.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1757[i + 0]));
  }
  i1746.m_MarkToMarkAdjustmentRecords = i1756
  return i1746
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1760 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1761 = data
  i1760.m_TargetGlyphID = i1761[0]
  i1760.m_SubstituteGlyphIDs = i1761[1]
  return i1760
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1764 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1765 = data
  i1764.m_ComponentGlyphIDs = i1765[0]
  i1764.m_LigatureGlyphID = i1765[1]
  return i1764
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1768 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1769 = data
  i1768.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1769[0], i1768.m_FirstAdjustmentRecord)
  i1768.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1769[1], i1768.m_SecondAdjustmentRecord)
  i1768.m_FeatureLookupFlags = i1769[2]
  return i1768
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1770 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1771 = data
  i1770.m_GlyphIndex = i1771[0]
  i1770.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1771[1], i1770.m_GlyphValueRecord)
  return i1770
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1772 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1773 = data
  i1772.m_XPlacement = i1773[0]
  i1772.m_YPlacement = i1773[1]
  i1772.m_XAdvance = i1773[2]
  i1772.m_YAdvance = i1773[3]
  return i1772
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1776 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1777 = data
  i1776.m_BaseGlyphID = i1777[0]
  i1776.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1777[1], i1776.m_BaseGlyphAnchorPoint)
  i1776.m_MarkGlyphID = i1777[2]
  i1776.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1777[3], i1776.m_MarkPositionAdjustment)
  return i1776
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1780 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1781 = data
  i1780.m_BaseMarkGlyphID = i1781[0]
  i1780.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1781[1], i1780.m_BaseMarkGlyphAnchorPoint)
  i1780.m_CombiningMarkGlyphID = i1781[2]
  i1780.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1781[3], i1780.m_CombiningMarkPositionAdjustment)
  return i1780
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1784 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1785 = data
  request.r(i1785[0], i1785[1], 0, i1784, 'regularTypeface')
  request.r(i1785[2], i1785[3], 0, i1784, 'italicTypeface')
  return i1784
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1786 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1787 = data
  i1786.Name = i1787[0]
  i1786.PointSize = i1787[1]
  i1786.Scale = i1787[2]
  i1786.CharacterCount = i1787[3]
  i1786.LineHeight = i1787[4]
  i1786.Baseline = i1787[5]
  i1786.Ascender = i1787[6]
  i1786.CapHeight = i1787[7]
  i1786.Descender = i1787[8]
  i1786.CenterLine = i1787[9]
  i1786.SuperscriptOffset = i1787[10]
  i1786.SubscriptOffset = i1787[11]
  i1786.SubSize = i1787[12]
  i1786.Underline = i1787[13]
  i1786.UnderlineThickness = i1787[14]
  i1786.strikethrough = i1787[15]
  i1786.strikethroughThickness = i1787[16]
  i1786.TabWidth = i1787[17]
  i1786.Padding = i1787[18]
  i1786.AtlasWidth = i1787[19]
  i1786.AtlasHeight = i1787[20]
  return i1786
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1790 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1791 = data
  i1790.id = i1791[0]
  i1790.x = i1791[1]
  i1790.y = i1791[2]
  i1790.width = i1791[3]
  i1790.height = i1791[4]
  i1790.xOffset = i1791[5]
  i1790.yOffset = i1791[6]
  i1790.xAdvance = i1791[7]
  i1790.scale = i1791[8]
  return i1790
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1792 = root || request.c( 'TMPro.KerningTable' )
  var i1793 = data
  var i1795 = i1793[0]
  var i1794 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1795.length; i += 1) {
    i1794.add(request.d('TMPro.KerningPair', i1795[i + 0]));
  }
  i1792.kerningPairs = i1794
  return i1792
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1798 = root || request.c( 'TMPro.KerningPair' )
  var i1799 = data
  i1798.xOffset = i1799[0]
  i1798.m_FirstGlyph = i1799[1]
  i1798.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1799[2], i1798.m_FirstGlyphAdjustments)
  i1798.m_SecondGlyph = i1799[3]
  i1798.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1799[4], i1798.m_SecondGlyphAdjustments)
  i1798.m_IgnoreSpacingAdjustments = !!i1799[5]
  return i1798
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1800 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1801 = data
  i1800.m_FaceIndex = i1801[0]
  i1800.m_FamilyName = i1801[1]
  i1800.m_StyleName = i1801[2]
  i1800.m_PointSize = i1801[3]
  i1800.m_Scale = i1801[4]
  i1800.m_UnitsPerEM = i1801[5]
  i1800.m_LineHeight = i1801[6]
  i1800.m_AscentLine = i1801[7]
  i1800.m_CapLine = i1801[8]
  i1800.m_MeanLine = i1801[9]
  i1800.m_Baseline = i1801[10]
  i1800.m_DescentLine = i1801[11]
  i1800.m_SuperscriptOffset = i1801[12]
  i1800.m_SuperscriptSize = i1801[13]
  i1800.m_SubscriptOffset = i1801[14]
  i1800.m_SubscriptSize = i1801[15]
  i1800.m_UnderlineOffset = i1801[16]
  i1800.m_UnderlineThickness = i1801[17]
  i1800.m_StrikethroughOffset = i1801[18]
  i1800.m_StrikethroughThickness = i1801[19]
  i1800.m_TabWidth = i1801[20]
  return i1800
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1802 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1803 = data
  request.r(i1803[0], i1803[1], 0, i1802, 'spriteSheet')
  var i1805 = i1803[2]
  var i1804 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1805.length; i += 1) {
    i1804.add(request.d('TMPro.TMP_Sprite', i1805[i + 0]));
  }
  i1802.spriteInfoList = i1804
  var i1807 = i1803[3]
  var i1806 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1807.length; i += 2) {
  request.r(i1807[i + 0], i1807[i + 1], 1, i1806, '')
  }
  i1802.fallbackSpriteAssets = i1806
  var i1809 = i1803[4]
  var i1808 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1809.length; i += 1) {
    i1808.add(request.d('TMPro.TMP_SpriteCharacter', i1809[i + 0]));
  }
  i1802.m_SpriteCharacterTable = i1808
  var i1811 = i1803[5]
  var i1810 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1811.length; i += 1) {
    i1810.add(request.d('TMPro.TMP_SpriteGlyph', i1811[i + 0]));
  }
  i1802.m_GlyphTable = i1810
  i1802.m_Version = i1803[6]
  i1802.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1803[7], i1802.m_FaceInfo)
  request.r(i1803[8], i1803[9], 0, i1802, 'm_Material')
  return i1802
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1814 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1815 = data
  i1814.name = i1815[0]
  i1814.hashCode = i1815[1]
  i1814.unicode = i1815[2]
  i1814.pivot = new pc.Vec2( i1815[3], i1815[4] )
  request.r(i1815[5], i1815[6], 0, i1814, 'sprite')
  i1814.id = i1815[7]
  i1814.x = i1815[8]
  i1814.y = i1815[9]
  i1814.width = i1815[10]
  i1814.height = i1815[11]
  i1814.xOffset = i1815[12]
  i1814.yOffset = i1815[13]
  i1814.xAdvance = i1815[14]
  i1814.scale = i1815[15]
  return i1814
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1820 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1821 = data
  i1820.m_Name = i1821[0]
  i1820.m_ElementType = i1821[1]
  i1820.m_Unicode = i1821[2]
  i1820.m_GlyphIndex = i1821[3]
  i1820.m_Scale = i1821[4]
  return i1820
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1824 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1825 = data
  request.r(i1825[0], i1825[1], 0, i1824, 'sprite')
  i1824.m_Index = i1825[2]
  i1824.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1825[3], i1824.m_Metrics)
  i1824.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1825[4], i1824.m_GlyphRect)
  i1824.m_Scale = i1825[5]
  i1824.m_AtlasIndex = i1825[6]
  i1824.m_ClassDefinitionType = i1825[7]
  return i1824
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1826 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1827 = data
  var i1829 = i1827[0]
  var i1828 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1829.length; i += 1) {
    i1828.add(request.d('TMPro.TMP_Style', i1829[i + 0]));
  }
  i1826.m_StyleList = i1828
  return i1826
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1832 = root || request.c( 'TMPro.TMP_Style' )
  var i1833 = data
  i1832.m_Name = i1833[0]
  i1832.m_HashCode = i1833[1]
  i1832.m_OpeningDefinition = i1833[2]
  i1832.m_ClosingDefinition = i1833[3]
  i1832.m_OpeningTagArray = i1833[4]
  i1832.m_ClosingTagArray = i1833[5]
  return i1832
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1835 = data
  var i1837 = i1835[0]
  var i1836 = []
  for(var i = 0; i < i1837.length; i += 1) {
    i1836.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1837[i + 0]) );
  }
  i1834.files = i1836
  i1834.componentToPrefabIds = i1835[1]
  return i1834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1841 = data
  i1840.path = i1841[0]
  request.r(i1841[1], i1841[2], 0, i1840, 'unityObject')
  return i1840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1843 = data
  var i1845 = i1843[0]
  var i1844 = []
  for(var i = 0; i < i1845.length; i += 1) {
    i1844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1845[i + 0]) );
  }
  i1842.scriptsExecutionOrder = i1844
  var i1847 = i1843[1]
  var i1846 = []
  for(var i = 0; i < i1847.length; i += 1) {
    i1846.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1847[i + 0]) );
  }
  i1842.sortingLayers = i1846
  var i1849 = i1843[2]
  var i1848 = []
  for(var i = 0; i < i1849.length; i += 1) {
    i1848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1849[i + 0]) );
  }
  i1842.cullingLayers = i1848
  i1842.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1843[3], i1842.timeSettings)
  i1842.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1843[4], i1842.physicsSettings)
  i1842.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1843[5], i1842.physics2DSettings)
  i1842.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1843[6], i1842.qualitySettings)
  i1842.enableRealtimeShadows = !!i1843[7]
  i1842.enableAutoInstancing = !!i1843[8]
  i1842.enableStaticBatching = !!i1843[9]
  i1842.enableDynamicBatching = !!i1843[10]
  i1842.usePreservativeDynamicBatching = !!i1843[11]
  i1842.lightmapEncodingQuality = i1843[12]
  i1842.desiredColorSpace = i1843[13]
  var i1851 = i1843[14]
  var i1850 = []
  for(var i = 0; i < i1851.length; i += 1) {
    i1850.push( i1851[i + 0] );
  }
  i1842.allTags = i1850
  return i1842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1855 = data
  i1854.name = i1855[0]
  i1854.value = i1855[1]
  return i1854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1859 = data
  i1858.id = i1859[0]
  i1858.name = i1859[1]
  i1858.value = i1859[2]
  return i1858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1863 = data
  i1862.id = i1863[0]
  i1862.name = i1863[1]
  return i1862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1864 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1865 = data
  i1864.fixedDeltaTime = i1865[0]
  i1864.maximumDeltaTime = i1865[1]
  i1864.timeScale = i1865[2]
  i1864.maximumParticleTimestep = i1865[3]
  return i1864
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1866 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1867 = data
  i1866.gravity = new pc.Vec3( i1867[0], i1867[1], i1867[2] )
  i1866.defaultSolverIterations = i1867[3]
  i1866.bounceThreshold = i1867[4]
  i1866.autoSyncTransforms = !!i1867[5]
  i1866.autoSimulation = !!i1867[6]
  var i1869 = i1867[7]
  var i1868 = []
  for(var i = 0; i < i1869.length; i += 1) {
    i1868.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1869[i + 0]) );
  }
  i1866.collisionMatrix = i1868
  return i1866
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1872 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1873 = data
  i1872.enabled = !!i1873[0]
  i1872.layerId = i1873[1]
  i1872.otherLayerId = i1873[2]
  return i1872
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1874 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1875 = data
  request.r(i1875[0], i1875[1], 0, i1874, 'material')
  i1874.gravity = new pc.Vec2( i1875[2], i1875[3] )
  i1874.positionIterations = i1875[4]
  i1874.velocityIterations = i1875[5]
  i1874.velocityThreshold = i1875[6]
  i1874.maxLinearCorrection = i1875[7]
  i1874.maxAngularCorrection = i1875[8]
  i1874.maxTranslationSpeed = i1875[9]
  i1874.maxRotationSpeed = i1875[10]
  i1874.baumgarteScale = i1875[11]
  i1874.baumgarteTOIScale = i1875[12]
  i1874.timeToSleep = i1875[13]
  i1874.linearSleepTolerance = i1875[14]
  i1874.angularSleepTolerance = i1875[15]
  i1874.defaultContactOffset = i1875[16]
  i1874.autoSimulation = !!i1875[17]
  i1874.queriesHitTriggers = !!i1875[18]
  i1874.queriesStartInColliders = !!i1875[19]
  i1874.callbacksOnDisable = !!i1875[20]
  i1874.reuseCollisionCallbacks = !!i1875[21]
  i1874.autoSyncTransforms = !!i1875[22]
  var i1877 = i1875[23]
  var i1876 = []
  for(var i = 0; i < i1877.length; i += 1) {
    i1876.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1877[i + 0]) );
  }
  i1874.collisionMatrix = i1876
  return i1874
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1880 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1881 = data
  i1880.enabled = !!i1881[0]
  i1880.layerId = i1881[1]
  i1880.otherLayerId = i1881[2]
  return i1880
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1882 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1883 = data
  var i1885 = i1883[0]
  var i1884 = []
  for(var i = 0; i < i1885.length; i += 1) {
    i1884.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1885[i + 0]) );
  }
  i1882.qualityLevels = i1884
  var i1887 = i1883[1]
  var i1886 = []
  for(var i = 0; i < i1887.length; i += 1) {
    i1886.push( i1887[i + 0] );
  }
  i1882.names = i1886
  i1882.shadows = i1883[2]
  i1882.anisotropicFiltering = i1883[3]
  i1882.antiAliasing = i1883[4]
  i1882.lodBias = i1883[5]
  i1882.shadowCascades = i1883[6]
  i1882.shadowDistance = i1883[7]
  i1882.shadowmaskMode = i1883[8]
  i1882.shadowProjection = i1883[9]
  i1882.shadowResolution = i1883[10]
  i1882.softParticles = !!i1883[11]
  i1882.softVegetation = !!i1883[12]
  i1882.activeColorSpace = i1883[13]
  i1882.desiredColorSpace = i1883[14]
  i1882.masterTextureLimit = i1883[15]
  i1882.maxQueuedFrames = i1883[16]
  i1882.particleRaycastBudget = i1883[17]
  i1882.pixelLightCount = i1883[18]
  i1882.realtimeReflectionProbes = !!i1883[19]
  i1882.shadowCascade2Split = i1883[20]
  i1882.shadowCascade4Split = new pc.Vec3( i1883[21], i1883[22], i1883[23] )
  i1882.streamingMipmapsActive = !!i1883[24]
  i1882.vSyncCount = i1883[25]
  i1882.asyncUploadBufferSize = i1883[26]
  i1882.asyncUploadTimeSlice = i1883[27]
  i1882.billboardsFaceCameraPosition = !!i1883[28]
  i1882.shadowNearPlaneOffset = i1883[29]
  i1882.streamingMipmapsMemoryBudget = i1883[30]
  i1882.maximumLODLevel = i1883[31]
  i1882.streamingMipmapsAddAllCameras = !!i1883[32]
  i1882.streamingMipmapsMaxLevelReduction = i1883[33]
  i1882.streamingMipmapsRenderersPerFrame = i1883[34]
  i1882.resolutionScalingFixedDPIFactor = i1883[35]
  i1882.streamingMipmapsMaxFileIORequests = i1883[36]
  i1882.currentQualityLevel = i1883[37]
  return i1882
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1890 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1891 = data
  i1890.m_XCoordinate = i1891[0]
  i1890.m_YCoordinate = i1891[1]
  return i1890
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1892 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1893 = data
  i1892.m_XPositionAdjustment = i1893[0]
  i1892.m_YPositionAdjustment = i1893[1]
  return i1892
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1894 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1895 = data
  i1894.xPlacement = i1895[0]
  i1894.yPlacement = i1895[1]
  i1894.xAdvance = i1895[2]
  i1894.yAdvance = i1895[3]
  return i1894
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.Animation":{"playAutomatically":0,"clip":1,"clips":3,"wrapMode":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"33":[34],"35":[34],"36":[34],"37":[34],"38":[34],"39":[34],"40":[17],"41":[1],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[1],"16":[15],"64":[65],"66":[65],"67":[9],"68":[69],"70":[5],"71":[5],"72":[9],"73":[15,9],"74":[9,10],"75":[9],"76":[10,9],"77":[15],"78":[10,9],"79":[9],"80":[9],"81":[9],"82":[67],"83":[10,9],"84":[9],"85":[67],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[9],"95":[10,9],"96":[9],"97":[9],"98":[9],"99":[9],"12":[10,9],"100":[9],"101":[102],"103":[102],"104":[102],"105":[102],"106":[1],"107":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.Mesh","UnityEngine.Animation","UnityEngine.AnimationClip","UnityEngine.MeshFilter","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "1.9";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1690";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4581";

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

Deserializers.buildID = "f2525560-c457-4ea7-9de2-004bed6e9279";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

