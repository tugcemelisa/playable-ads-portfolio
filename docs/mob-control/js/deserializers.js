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

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Animation"] = function (request, data, root) {
  var i1528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Animation' )
  var i1529 = data
  i1528.playAutomatically = !!i1529[0]
  request.r(i1529[1], i1529[2], 0, i1528, 'clip')
  var i1531 = i1529[3]
  var i1530 = []
  for(var i = 0; i < i1531.length; i += 2) {
  request.r(i1531[i + 0], i1531[i + 1], 2, i1530, '')
  }
  i1528.clips = i1530
  i1528.wrapMode = i1529[4]
  i1528.enabled = !!i1529[5]
  return i1528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1534 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1535 = data
  request.r(i1535[0], i1535[1], 0, i1534, 'sharedMesh')
  return i1534
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1536 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1537 = data
  request.r(i1537[0], i1537[1], 0, i1536, 'sharedMesh')
  var i1539 = i1537[2]
  var i1538 = []
  for(var i = 0; i < i1539.length; i += 2) {
  request.r(i1539[i + 0], i1539[i + 1], 2, i1538, '')
  }
  i1536.bones = i1538
  i1536.updateWhenOffscreen = !!i1537[3]
  i1536.localBounds = i1537[4]
  request.r(i1537[5], i1537[6], 0, i1536, 'rootBone')
  var i1541 = i1537[7]
  var i1540 = []
  for(var i = 0; i < i1541.length; i += 1) {
    i1540.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1541[i + 0]) );
  }
  i1536.blendShapesWeights = i1540
  i1536.enabled = !!i1537[8]
  request.r(i1537[9], i1537[10], 0, i1536, 'sharedMaterial')
  var i1543 = i1537[11]
  var i1542 = []
  for(var i = 0; i < i1543.length; i += 2) {
  request.r(i1543[i + 0], i1543[i + 1], 2, i1542, '')
  }
  i1536.sharedMaterials = i1542
  i1536.receiveShadows = !!i1537[12]
  i1536.shadowCastingMode = i1537[13]
  i1536.sortingLayerID = i1537[14]
  i1536.sortingOrder = i1537[15]
  i1536.lightmapIndex = i1537[16]
  i1536.lightmapSceneIndex = i1537[17]
  i1536.lightmapScaleOffset = new pc.Vec4( i1537[18], i1537[19], i1537[20], i1537[21] )
  i1536.lightProbeUsage = i1537[22]
  i1536.reflectionProbeUsage = i1537[23]
  return i1536
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1549 = data
  i1548.weight = i1549[0]
  return i1548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1551 = data
  i1550.name = i1551[0]
  i1550.halfPrecision = !!i1551[1]
  i1550.useSimplification = !!i1551[2]
  i1550.useUInt32IndexFormat = !!i1551[3]
  i1550.vertexCount = i1551[4]
  i1550.aabb = i1551[5]
  var i1553 = i1551[6]
  var i1552 = []
  for(var i = 0; i < i1553.length; i += 1) {
    i1552.push( !!i1553[i + 0] );
  }
  i1550.streams = i1552
  i1550.vertices = i1551[7]
  var i1555 = i1551[8]
  var i1554 = []
  for(var i = 0; i < i1555.length; i += 1) {
    i1554.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1555[i + 0]) );
  }
  i1550.subMeshes = i1554
  var i1557 = i1551[9]
  var i1556 = []
  for(var i = 0; i < i1557.length; i += 16) {
    i1556.push( new pc.Mat4().setData(i1557[i + 0], i1557[i + 1], i1557[i + 2], i1557[i + 3],  i1557[i + 4], i1557[i + 5], i1557[i + 6], i1557[i + 7],  i1557[i + 8], i1557[i + 9], i1557[i + 10], i1557[i + 11],  i1557[i + 12], i1557[i + 13], i1557[i + 14], i1557[i + 15]) );
  }
  i1550.bindposes = i1556
  var i1559 = i1551[10]
  var i1558 = []
  for(var i = 0; i < i1559.length; i += 1) {
    i1558.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1559[i + 0]) );
  }
  i1550.blendShapes = i1558
  return i1550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1564 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1565 = data
  i1564.triangles = i1565[0]
  return i1564
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1570 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1571 = data
  i1570.name = i1571[0]
  var i1573 = i1571[1]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1573[i + 0]) );
  }
  i1570.frames = i1572
  return i1570
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1574 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1575 = data
  i1574.center = new pc.Vec3( i1575[0], i1575[1], i1575[2] )
  i1574.radius = i1575[3]
  i1574.enabled = !!i1575[4]
  i1574.isTrigger = !!i1575[5]
  request.r(i1575[6], i1575[7], 0, i1574, 'material')
  return i1574
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i1576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i1577 = data
  i1576.center = new pc.Vec3( i1577[0], i1577[1], i1577[2] )
  i1576.radius = i1577[3]
  i1576.height = i1577[4]
  i1576.direction = i1577[5]
  i1576.enabled = !!i1577[6]
  i1576.isTrigger = !!i1577[7]
  request.r(i1577[8], i1577[9], 0, i1576, 'material')
  return i1576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1578 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1579 = data
  i1578.center = new pc.Vec3( i1579[0], i1579[1], i1579[2] )
  i1578.size = new pc.Vec3( i1579[3], i1579[4], i1579[5] )
  i1578.enabled = !!i1579[6]
  i1578.isTrigger = !!i1579[7]
  request.r(i1579[8], i1579[9], 0, i1578, 'material')
  return i1578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i1580 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i1581 = data
  request.r(i1581[0], i1581[1], 0, i1580, 'sharedMesh')
  i1580.convex = !!i1581[2]
  i1580.enabled = !!i1581[3]
  i1580.isTrigger = !!i1581[4]
  request.r(i1581[5], i1581[6], 0, i1580, 'material')
  return i1580
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1582 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1583 = data
  var i1585 = i1583[0]
  var i1584 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1585[i + 0]));
  }
  i1582.ShaderCompilationErrors = i1584
  i1582.name = i1583[1]
  i1582.guid = i1583[2]
  var i1587 = i1583[3]
  var i1586 = []
  for(var i = 0; i < i1587.length; i += 1) {
    i1586.push( i1587[i + 0] );
  }
  i1582.shaderDefinedKeywords = i1586
  var i1589 = i1583[4]
  var i1588 = []
  for(var i = 0; i < i1589.length; i += 1) {
    i1588.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1589[i + 0]) );
  }
  i1582.passes = i1588
  var i1591 = i1583[5]
  var i1590 = []
  for(var i = 0; i < i1591.length; i += 1) {
    i1590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1591[i + 0]) );
  }
  i1582.usePasses = i1590
  var i1593 = i1583[6]
  var i1592 = []
  for(var i = 0; i < i1593.length; i += 1) {
    i1592.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1593[i + 0]) );
  }
  i1582.defaultParameterValues = i1592
  request.r(i1583[7], i1583[8], 0, i1582, 'unityFallbackShader')
  i1582.readDepth = !!i1583[9]
  i1582.hasDepthOnlyPass = !!i1583[10]
  i1582.isCreatedByShaderGraph = !!i1583[11]
  i1582.disableBatching = !!i1583[12]
  i1582.compiled = !!i1583[13]
  return i1582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1597 = data
  i1596.shaderName = i1597[0]
  i1596.errorMessage = i1597[1]
  return i1596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1602 = root || new pc.UnityShaderPass()
  var i1603 = data
  i1602.id = i1603[0]
  i1602.subShaderIndex = i1603[1]
  i1602.name = i1603[2]
  i1602.passType = i1603[3]
  i1602.grabPassTextureName = i1603[4]
  i1602.usePass = !!i1603[5]
  i1602.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[6], i1602.zTest)
  i1602.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[7], i1602.zWrite)
  i1602.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[8], i1602.culling)
  i1602.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1603[9], i1602.blending)
  i1602.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1603[10], i1602.alphaBlending)
  i1602.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[11], i1602.colorWriteMask)
  i1602.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[12], i1602.offsetUnits)
  i1602.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[13], i1602.offsetFactor)
  i1602.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[14], i1602.stencilRef)
  i1602.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[15], i1602.stencilReadMask)
  i1602.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1603[16], i1602.stencilWriteMask)
  i1602.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1603[17], i1602.stencilOp)
  i1602.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1603[18], i1602.stencilOpFront)
  i1602.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1603[19], i1602.stencilOpBack)
  var i1605 = i1603[20]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1605[i + 0]) );
  }
  i1602.tags = i1604
  var i1607 = i1603[21]
  var i1606 = []
  for(var i = 0; i < i1607.length; i += 1) {
    i1606.push( i1607[i + 0] );
  }
  i1602.passDefinedKeywords = i1606
  var i1609 = i1603[22]
  var i1608 = []
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1609[i + 0]) );
  }
  i1602.passDefinedKeywordGroups = i1608
  var i1611 = i1603[23]
  var i1610 = []
  for(var i = 0; i < i1611.length; i += 1) {
    i1610.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1611[i + 0]) );
  }
  i1602.variants = i1610
  var i1613 = i1603[24]
  var i1612 = []
  for(var i = 0; i < i1613.length; i += 1) {
    i1612.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1613[i + 0]) );
  }
  i1602.excludedVariants = i1612
  i1602.hasDepthReader = !!i1603[25]
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1615 = data
  i1614.val = i1615[0]
  i1614.name = i1615[1]
  return i1614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1616 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1617 = data
  i1616.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1617[0], i1616.src)
  i1616.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1617[1], i1616.dst)
  i1616.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1617[2], i1616.op)
  return i1616
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1619 = data
  i1618.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1619[0], i1618.pass)
  i1618.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1619[1], i1618.fail)
  i1618.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1619[2], i1618.zFail)
  i1618.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1619[3], i1618.comp)
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1623 = data
  i1622.name = i1623[0]
  i1622.value = i1623[1]
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1627 = data
  var i1629 = i1627[0]
  var i1628 = []
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.push( i1629[i + 0] );
  }
  i1626.keywords = i1628
  i1626.hasDiscard = !!i1627[1]
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1633 = data
  i1632.passId = i1633[0]
  i1632.subShaderIndex = i1633[1]
  var i1635 = i1633[2]
  var i1634 = []
  for(var i = 0; i < i1635.length; i += 1) {
    i1634.push( i1635[i + 0] );
  }
  i1632.keywords = i1634
  i1632.vertexProgram = i1633[3]
  i1632.fragmentProgram = i1633[4]
  i1632.exportedForWebGl2 = !!i1633[5]
  i1632.readDepth = !!i1633[6]
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1639 = data
  request.r(i1639[0], i1639[1], 0, i1638, 'shader')
  i1638.pass = i1639[2]
  return i1638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1643 = data
  i1642.name = i1643[0]
  i1642.type = i1643[1]
  i1642.value = new pc.Vec4( i1643[2], i1643[3], i1643[4], i1643[5] )
  i1642.textureValue = i1643[6]
  i1642.shaderPropertyFlag = i1643[7]
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1645 = data
  i1644.name = i1645[0]
  return i1644
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1647 = data
  i1646.name = i1647[0]
  i1646.wrapMode = i1647[1]
  i1646.isLooping = !!i1647[2]
  i1646.length = i1647[3]
  var i1649 = i1647[4]
  var i1648 = []
  for(var i = 0; i < i1649.length; i += 1) {
    i1648.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1649[i + 0]) );
  }
  i1646.curves = i1648
  var i1651 = i1647[5]
  var i1650 = []
  for(var i = 0; i < i1651.length; i += 1) {
    i1650.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1651[i + 0]) );
  }
  i1646.events = i1650
  i1646.halfPrecision = !!i1647[6]
  i1646._frameRate = i1647[7]
  i1646.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1647[8], i1646.localBounds)
  i1646.hasMuscleCurves = !!i1647[9]
  var i1653 = i1647[10]
  var i1652 = []
  for(var i = 0; i < i1653.length; i += 1) {
    i1652.push( i1653[i + 0] );
  }
  i1646.clipMuscleConstant = i1652
  i1646.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1647[11], i1646.clipBindingConstant)
  return i1646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1656 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1657 = data
  i1656.path = i1657[0]
  i1656.hash = i1657[1]
  i1656.componentType = i1657[2]
  i1656.property = i1657[3]
  i1656.keys = i1657[4]
  var i1659 = i1657[5]
  var i1658 = []
  for(var i = 0; i < i1659.length; i += 1) {
    i1658.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1659[i + 0]) );
  }
  i1656.objectReferenceKeys = i1658
  return i1656
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1663 = data
  i1662.time = i1663[0]
  request.r(i1663[1], i1663[2], 0, i1662, 'value')
  return i1662
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1667 = data
  i1666.functionName = i1667[0]
  i1666.floatParameter = i1667[1]
  i1666.intParameter = i1667[2]
  i1666.stringParameter = i1667[3]
  request.r(i1667[4], i1667[5], 0, i1666, 'objectReferenceParameter')
  i1666.time = i1667[6]
  return i1666
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1668 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1669 = data
  i1668.center = new pc.Vec3( i1669[0], i1669[1], i1669[2] )
  i1668.extends = new pc.Vec3( i1669[3], i1669[4], i1669[5] )
  return i1668
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1672 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1673 = data
  var i1675 = i1673[0]
  var i1674 = []
  for(var i = 0; i < i1675.length; i += 1) {
    i1674.push( i1675[i + 0] );
  }
  i1672.genericBindings = i1674
  var i1677 = i1673[1]
  var i1676 = []
  for(var i = 0; i < i1677.length; i += 1) {
    i1676.push( i1677[i + 0] );
  }
  i1672.pptrCurveMapping = i1676
  return i1672
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1678 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1679 = data
  i1678.name = i1679[0]
  i1678.ascent = i1679[1]
  i1678.originalLineHeight = i1679[2]
  i1678.fontSize = i1679[3]
  var i1681 = i1679[4]
  var i1680 = []
  for(var i = 0; i < i1681.length; i += 1) {
    i1680.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1681[i + 0]) );
  }
  i1678.characterInfo = i1680
  request.r(i1679[5], i1679[6], 0, i1678, 'texture')
  i1678.originalFontSize = i1679[7]
  return i1678
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1684 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1685 = data
  i1684.index = i1685[0]
  i1684.advance = i1685[1]
  i1684.bearing = i1685[2]
  i1684.glyphWidth = i1685[3]
  i1684.glyphHeight = i1685[4]
  i1684.minX = i1685[5]
  i1684.maxX = i1685[6]
  i1684.minY = i1685[7]
  i1684.maxY = i1685[8]
  i1684.uvBottomLeftX = i1685[9]
  i1684.uvBottomLeftY = i1685[10]
  i1684.uvBottomRightX = i1685[11]
  i1684.uvBottomRightY = i1685[12]
  i1684.uvTopLeftX = i1685[13]
  i1684.uvTopLeftY = i1685[14]
  i1684.uvTopRightX = i1685[15]
  i1684.uvTopRightY = i1685[16]
  return i1684
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1686 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1687 = data
  i1686.name = i1687[0]
  i1686.bytes64 = i1687[1]
  i1686.data = i1687[2]
  return i1686
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1688 = root || request.c( 'TMPro.TMP_Settings' )
  var i1689 = data
  i1688.assetVersion = i1689[0]
  i1688.m_TextWrappingMode = i1689[1]
  i1688.m_enableKerning = !!i1689[2]
  var i1691 = i1689[3]
  var i1690 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1691.length; i += 1) {
    i1690.add(i1691[i + 0]);
  }
  i1688.m_ActiveFontFeatures = i1690
  i1688.m_enableExtraPadding = !!i1689[4]
  i1688.m_enableTintAllSprites = !!i1689[5]
  i1688.m_enableParseEscapeCharacters = !!i1689[6]
  i1688.m_EnableRaycastTarget = !!i1689[7]
  i1688.m_GetFontFeaturesAtRuntime = !!i1689[8]
  i1688.m_missingGlyphCharacter = i1689[9]
  i1688.m_ClearDynamicDataOnBuild = !!i1689[10]
  i1688.m_warningsDisabled = !!i1689[11]
  request.r(i1689[12], i1689[13], 0, i1688, 'm_defaultFontAsset')
  i1688.m_defaultFontAssetPath = i1689[14]
  i1688.m_defaultFontSize = i1689[15]
  i1688.m_defaultAutoSizeMinRatio = i1689[16]
  i1688.m_defaultAutoSizeMaxRatio = i1689[17]
  i1688.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1689[18], i1689[19] )
  i1688.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1689[20], i1689[21] )
  i1688.m_autoSizeTextContainer = !!i1689[22]
  i1688.m_IsTextObjectScaleStatic = !!i1689[23]
  var i1693 = i1689[24]
  var i1692 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1693.length; i += 2) {
  request.r(i1693[i + 0], i1693[i + 1], 1, i1692, '')
  }
  i1688.m_fallbackFontAssets = i1692
  i1688.m_matchMaterialPreset = !!i1689[25]
  i1688.m_HideSubTextObjects = !!i1689[26]
  request.r(i1689[27], i1689[28], 0, i1688, 'm_defaultSpriteAsset')
  i1688.m_defaultSpriteAssetPath = i1689[29]
  i1688.m_enableEmojiSupport = !!i1689[30]
  i1688.m_MissingCharacterSpriteUnicode = i1689[31]
  var i1695 = i1689[32]
  var i1694 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1695.length; i += 2) {
  request.r(i1695[i + 0], i1695[i + 1], 1, i1694, '')
  }
  i1688.m_EmojiFallbackTextAssets = i1694
  i1688.m_defaultColorGradientPresetsPath = i1689[33]
  request.r(i1689[34], i1689[35], 0, i1688, 'm_defaultStyleSheet')
  i1688.m_StyleSheetsResourcePath = i1689[36]
  request.r(i1689[37], i1689[38], 0, i1688, 'm_leadingCharacters')
  request.r(i1689[39], i1689[40], 0, i1688, 'm_followingCharacters')
  i1688.m_UseModernHangulLineBreakingRules = !!i1689[41]
  return i1688
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1702 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1703 = data
  i1702.normalStyle = i1703[0]
  i1702.normalSpacingOffset = i1703[1]
  i1702.boldStyle = i1703[2]
  i1702.boldSpacing = i1703[3]
  i1702.italicStyle = i1703[4]
  i1702.tabSize = i1703[5]
  request.r(i1703[6], i1703[7], 0, i1702, 'atlas')
  i1702.m_SourceFontFileGUID = i1703[8]
  i1702.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1703[9], i1702.m_CreationSettings)
  request.r(i1703[10], i1703[11], 0, i1702, 'm_SourceFontFile')
  i1702.m_SourceFontFilePath = i1703[12]
  i1702.m_AtlasPopulationMode = i1703[13]
  i1702.InternalDynamicOS = !!i1703[14]
  var i1705 = i1703[15]
  var i1704 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1705.length; i += 1) {
    i1704.add(request.d('UnityEngine.TextCore.Glyph', i1705[i + 0]));
  }
  i1702.m_GlyphTable = i1704
  var i1707 = i1703[16]
  var i1706 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1707.length; i += 1) {
    i1706.add(request.d('TMPro.TMP_Character', i1707[i + 0]));
  }
  i1702.m_CharacterTable = i1706
  var i1709 = i1703[17]
  var i1708 = []
  for(var i = 0; i < i1709.length; i += 2) {
  request.r(i1709[i + 0], i1709[i + 1], 2, i1708, '')
  }
  i1702.m_AtlasTextures = i1708
  i1702.m_AtlasTextureIndex = i1703[18]
  i1702.m_IsMultiAtlasTexturesEnabled = !!i1703[19]
  i1702.m_GetFontFeatures = !!i1703[20]
  i1702.m_ClearDynamicDataOnBuild = !!i1703[21]
  i1702.m_AtlasWidth = i1703[22]
  i1702.m_AtlasHeight = i1703[23]
  i1702.m_AtlasPadding = i1703[24]
  i1702.m_AtlasRenderMode = i1703[25]
  var i1711 = i1703[26]
  var i1710 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1711.length; i += 1) {
    i1710.add(request.d('UnityEngine.TextCore.GlyphRect', i1711[i + 0]));
  }
  i1702.m_UsedGlyphRects = i1710
  var i1713 = i1703[27]
  var i1712 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1713.length; i += 1) {
    i1712.add(request.d('UnityEngine.TextCore.GlyphRect', i1713[i + 0]));
  }
  i1702.m_FreeGlyphRects = i1712
  i1702.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1703[28], i1702.m_FontFeatureTable)
  i1702.m_ShouldReimportFontFeatures = !!i1703[29]
  var i1715 = i1703[30]
  var i1714 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1715.length; i += 2) {
  request.r(i1715[i + 0], i1715[i + 1], 1, i1714, '')
  }
  i1702.m_FallbackFontAssetTable = i1714
  var i1717 = i1703[31]
  var i1716 = []
  for(var i = 0; i < i1717.length; i += 1) {
    i1716.push( request.d('TMPro.TMP_FontWeightPair', i1717[i + 0]) );
  }
  i1702.m_FontWeightTable = i1716
  var i1719 = i1703[32]
  var i1718 = []
  for(var i = 0; i < i1719.length; i += 1) {
    i1718.push( request.d('TMPro.TMP_FontWeightPair', i1719[i + 0]) );
  }
  i1702.fontWeights = i1718
  i1702.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1703[33], i1702.m_fontInfo)
  var i1721 = i1703[34]
  var i1720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1721.length; i += 1) {
    i1720.add(request.d('TMPro.TMP_Glyph', i1721[i + 0]));
  }
  i1702.m_glyphInfoList = i1720
  i1702.m_KerningTable = request.d('TMPro.KerningTable', i1703[35], i1702.m_KerningTable)
  var i1723 = i1703[36]
  var i1722 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1723.length; i += 2) {
  request.r(i1723[i + 0], i1723[i + 1], 1, i1722, '')
  }
  i1702.fallbackFontAssets = i1722
  i1702.m_Version = i1703[37]
  i1702.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1703[38], i1702.m_FaceInfo)
  request.r(i1703[39], i1703[40], 0, i1702, 'm_Material')
  return i1702
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1724 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1725 = data
  i1724.sourceFontFileName = i1725[0]
  i1724.sourceFontFileGUID = i1725[1]
  i1724.faceIndex = i1725[2]
  i1724.pointSizeSamplingMode = i1725[3]
  i1724.pointSize = i1725[4]
  i1724.padding = i1725[5]
  i1724.paddingMode = i1725[6]
  i1724.packingMode = i1725[7]
  i1724.atlasWidth = i1725[8]
  i1724.atlasHeight = i1725[9]
  i1724.characterSetSelectionMode = i1725[10]
  i1724.characterSequence = i1725[11]
  i1724.referencedFontAssetGUID = i1725[12]
  i1724.referencedTextAssetGUID = i1725[13]
  i1724.fontStyle = i1725[14]
  i1724.fontStyleModifier = i1725[15]
  i1724.renderMode = i1725[16]
  i1724.includeFontFeatures = !!i1725[17]
  return i1724
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1728 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1729 = data
  i1728.m_Index = i1729[0]
  i1728.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1729[1], i1728.m_Metrics)
  i1728.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1729[2], i1728.m_GlyphRect)
  i1728.m_Scale = i1729[3]
  i1728.m_AtlasIndex = i1729[4]
  i1728.m_ClassDefinitionType = i1729[5]
  return i1728
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1730 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1731 = data
  i1730.m_Width = i1731[0]
  i1730.m_Height = i1731[1]
  i1730.m_HorizontalBearingX = i1731[2]
  i1730.m_HorizontalBearingY = i1731[3]
  i1730.m_HorizontalAdvance = i1731[4]
  return i1730
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1732 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1733 = data
  i1732.m_X = i1733[0]
  i1732.m_Y = i1733[1]
  i1732.m_Width = i1733[2]
  i1732.m_Height = i1733[3]
  return i1732
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1736 = root || request.c( 'TMPro.TMP_Character' )
  var i1737 = data
  i1736.m_ElementType = i1737[0]
  i1736.m_Unicode = i1737[1]
  i1736.m_GlyphIndex = i1737[2]
  i1736.m_Scale = i1737[3]
  return i1736
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1742 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1743 = data
  var i1745 = i1743[0]
  var i1744 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1745.length; i += 1) {
    i1744.add(request.d('TMPro.MultipleSubstitutionRecord', i1745[i + 0]));
  }
  i1742.m_MultipleSubstitutionRecords = i1744
  var i1747 = i1743[1]
  var i1746 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1747.length; i += 1) {
    i1746.add(request.d('TMPro.LigatureSubstitutionRecord', i1747[i + 0]));
  }
  i1742.m_LigatureSubstitutionRecords = i1746
  var i1749 = i1743[2]
  var i1748 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1749.length; i += 1) {
    i1748.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1749[i + 0]));
  }
  i1742.m_GlyphPairAdjustmentRecords = i1748
  var i1751 = i1743[3]
  var i1750 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1751.length; i += 1) {
    i1750.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1751[i + 0]));
  }
  i1742.m_MarkToBaseAdjustmentRecords = i1750
  var i1753 = i1743[4]
  var i1752 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1753.length; i += 1) {
    i1752.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1753[i + 0]));
  }
  i1742.m_MarkToMarkAdjustmentRecords = i1752
  return i1742
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1756 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1757 = data
  i1756.m_TargetGlyphID = i1757[0]
  i1756.m_SubstituteGlyphIDs = i1757[1]
  return i1756
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1760 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1761 = data
  i1760.m_ComponentGlyphIDs = i1761[0]
  i1760.m_LigatureGlyphID = i1761[1]
  return i1760
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1764 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1765 = data
  i1764.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1765[0], i1764.m_FirstAdjustmentRecord)
  i1764.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1765[1], i1764.m_SecondAdjustmentRecord)
  i1764.m_FeatureLookupFlags = i1765[2]
  return i1764
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1766 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1767 = data
  i1766.m_GlyphIndex = i1767[0]
  i1766.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1767[1], i1766.m_GlyphValueRecord)
  return i1766
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1768 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1769 = data
  i1768.m_XPlacement = i1769[0]
  i1768.m_YPlacement = i1769[1]
  i1768.m_XAdvance = i1769[2]
  i1768.m_YAdvance = i1769[3]
  return i1768
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1772 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1773 = data
  i1772.m_BaseGlyphID = i1773[0]
  i1772.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1773[1], i1772.m_BaseGlyphAnchorPoint)
  i1772.m_MarkGlyphID = i1773[2]
  i1772.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1773[3], i1772.m_MarkPositionAdjustment)
  return i1772
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1776 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1777 = data
  i1776.m_BaseMarkGlyphID = i1777[0]
  i1776.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1777[1], i1776.m_BaseMarkGlyphAnchorPoint)
  i1776.m_CombiningMarkGlyphID = i1777[2]
  i1776.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1777[3], i1776.m_CombiningMarkPositionAdjustment)
  return i1776
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1780 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1781 = data
  request.r(i1781[0], i1781[1], 0, i1780, 'regularTypeface')
  request.r(i1781[2], i1781[3], 0, i1780, 'italicTypeface')
  return i1780
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1782 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1783 = data
  i1782.Name = i1783[0]
  i1782.PointSize = i1783[1]
  i1782.Scale = i1783[2]
  i1782.CharacterCount = i1783[3]
  i1782.LineHeight = i1783[4]
  i1782.Baseline = i1783[5]
  i1782.Ascender = i1783[6]
  i1782.CapHeight = i1783[7]
  i1782.Descender = i1783[8]
  i1782.CenterLine = i1783[9]
  i1782.SuperscriptOffset = i1783[10]
  i1782.SubscriptOffset = i1783[11]
  i1782.SubSize = i1783[12]
  i1782.Underline = i1783[13]
  i1782.UnderlineThickness = i1783[14]
  i1782.strikethrough = i1783[15]
  i1782.strikethroughThickness = i1783[16]
  i1782.TabWidth = i1783[17]
  i1782.Padding = i1783[18]
  i1782.AtlasWidth = i1783[19]
  i1782.AtlasHeight = i1783[20]
  return i1782
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1786 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1787 = data
  i1786.id = i1787[0]
  i1786.x = i1787[1]
  i1786.y = i1787[2]
  i1786.width = i1787[3]
  i1786.height = i1787[4]
  i1786.xOffset = i1787[5]
  i1786.yOffset = i1787[6]
  i1786.xAdvance = i1787[7]
  i1786.scale = i1787[8]
  return i1786
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1788 = root || request.c( 'TMPro.KerningTable' )
  var i1789 = data
  var i1791 = i1789[0]
  var i1790 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1791.length; i += 1) {
    i1790.add(request.d('TMPro.KerningPair', i1791[i + 0]));
  }
  i1788.kerningPairs = i1790
  return i1788
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1794 = root || request.c( 'TMPro.KerningPair' )
  var i1795 = data
  i1794.xOffset = i1795[0]
  i1794.m_FirstGlyph = i1795[1]
  i1794.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1795[2], i1794.m_FirstGlyphAdjustments)
  i1794.m_SecondGlyph = i1795[3]
  i1794.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1795[4], i1794.m_SecondGlyphAdjustments)
  i1794.m_IgnoreSpacingAdjustments = !!i1795[5]
  return i1794
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1796 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1797 = data
  i1796.m_FaceIndex = i1797[0]
  i1796.m_FamilyName = i1797[1]
  i1796.m_StyleName = i1797[2]
  i1796.m_PointSize = i1797[3]
  i1796.m_Scale = i1797[4]
  i1796.m_UnitsPerEM = i1797[5]
  i1796.m_LineHeight = i1797[6]
  i1796.m_AscentLine = i1797[7]
  i1796.m_CapLine = i1797[8]
  i1796.m_MeanLine = i1797[9]
  i1796.m_Baseline = i1797[10]
  i1796.m_DescentLine = i1797[11]
  i1796.m_SuperscriptOffset = i1797[12]
  i1796.m_SuperscriptSize = i1797[13]
  i1796.m_SubscriptOffset = i1797[14]
  i1796.m_SubscriptSize = i1797[15]
  i1796.m_UnderlineOffset = i1797[16]
  i1796.m_UnderlineThickness = i1797[17]
  i1796.m_StrikethroughOffset = i1797[18]
  i1796.m_StrikethroughThickness = i1797[19]
  i1796.m_TabWidth = i1797[20]
  return i1796
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1798 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1799 = data
  request.r(i1799[0], i1799[1], 0, i1798, 'spriteSheet')
  var i1801 = i1799[2]
  var i1800 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1801.length; i += 1) {
    i1800.add(request.d('TMPro.TMP_Sprite', i1801[i + 0]));
  }
  i1798.spriteInfoList = i1800
  var i1803 = i1799[3]
  var i1802 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1803.length; i += 2) {
  request.r(i1803[i + 0], i1803[i + 1], 1, i1802, '')
  }
  i1798.fallbackSpriteAssets = i1802
  var i1805 = i1799[4]
  var i1804 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1805.length; i += 1) {
    i1804.add(request.d('TMPro.TMP_SpriteCharacter', i1805[i + 0]));
  }
  i1798.m_SpriteCharacterTable = i1804
  var i1807 = i1799[5]
  var i1806 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1807.length; i += 1) {
    i1806.add(request.d('TMPro.TMP_SpriteGlyph', i1807[i + 0]));
  }
  i1798.m_GlyphTable = i1806
  i1798.m_Version = i1799[6]
  i1798.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1799[7], i1798.m_FaceInfo)
  request.r(i1799[8], i1799[9], 0, i1798, 'm_Material')
  return i1798
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1810 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1811 = data
  i1810.name = i1811[0]
  i1810.hashCode = i1811[1]
  i1810.unicode = i1811[2]
  i1810.pivot = new pc.Vec2( i1811[3], i1811[4] )
  request.r(i1811[5], i1811[6], 0, i1810, 'sprite')
  i1810.id = i1811[7]
  i1810.x = i1811[8]
  i1810.y = i1811[9]
  i1810.width = i1811[10]
  i1810.height = i1811[11]
  i1810.xOffset = i1811[12]
  i1810.yOffset = i1811[13]
  i1810.xAdvance = i1811[14]
  i1810.scale = i1811[15]
  return i1810
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1816 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1817 = data
  i1816.m_Name = i1817[0]
  i1816.m_ElementType = i1817[1]
  i1816.m_Unicode = i1817[2]
  i1816.m_GlyphIndex = i1817[3]
  i1816.m_Scale = i1817[4]
  return i1816
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1820 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1821 = data
  request.r(i1821[0], i1821[1], 0, i1820, 'sprite')
  i1820.m_Index = i1821[2]
  i1820.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1821[3], i1820.m_Metrics)
  i1820.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1821[4], i1820.m_GlyphRect)
  i1820.m_Scale = i1821[5]
  i1820.m_AtlasIndex = i1821[6]
  i1820.m_ClassDefinitionType = i1821[7]
  return i1820
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1822 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1823 = data
  var i1825 = i1823[0]
  var i1824 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1825.length; i += 1) {
    i1824.add(request.d('TMPro.TMP_Style', i1825[i + 0]));
  }
  i1822.m_StyleList = i1824
  return i1822
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1828 = root || request.c( 'TMPro.TMP_Style' )
  var i1829 = data
  i1828.m_Name = i1829[0]
  i1828.m_HashCode = i1829[1]
  i1828.m_OpeningDefinition = i1829[2]
  i1828.m_ClosingDefinition = i1829[3]
  i1828.m_OpeningTagArray = i1829[4]
  i1828.m_ClosingTagArray = i1829[5]
  return i1828
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1831 = data
  var i1833 = i1831[0]
  var i1832 = []
  for(var i = 0; i < i1833.length; i += 1) {
    i1832.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1833[i + 0]) );
  }
  i1830.files = i1832
  i1830.componentToPrefabIds = i1831[1]
  return i1830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1837 = data
  i1836.path = i1837[0]
  request.r(i1837[1], i1837[2], 0, i1836, 'unityObject')
  return i1836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1839 = data
  var i1841 = i1839[0]
  var i1840 = []
  for(var i = 0; i < i1841.length; i += 1) {
    i1840.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1841[i + 0]) );
  }
  i1838.scriptsExecutionOrder = i1840
  var i1843 = i1839[1]
  var i1842 = []
  for(var i = 0; i < i1843.length; i += 1) {
    i1842.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1843[i + 0]) );
  }
  i1838.sortingLayers = i1842
  var i1845 = i1839[2]
  var i1844 = []
  for(var i = 0; i < i1845.length; i += 1) {
    i1844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1845[i + 0]) );
  }
  i1838.cullingLayers = i1844
  i1838.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1839[3], i1838.timeSettings)
  i1838.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1839[4], i1838.physicsSettings)
  i1838.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1839[5], i1838.physics2DSettings)
  i1838.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1839[6], i1838.qualitySettings)
  i1838.enableRealtimeShadows = !!i1839[7]
  i1838.enableAutoInstancing = !!i1839[8]
  i1838.enableStaticBatching = !!i1839[9]
  i1838.enableDynamicBatching = !!i1839[10]
  i1838.usePreservativeDynamicBatching = !!i1839[11]
  i1838.lightmapEncodingQuality = i1839[12]
  i1838.desiredColorSpace = i1839[13]
  var i1847 = i1839[14]
  var i1846 = []
  for(var i = 0; i < i1847.length; i += 1) {
    i1846.push( i1847[i + 0] );
  }
  i1838.allTags = i1846
  return i1838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1851 = data
  i1850.name = i1851[0]
  i1850.value = i1851[1]
  return i1850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1855 = data
  i1854.id = i1855[0]
  i1854.name = i1855[1]
  i1854.value = i1855[2]
  return i1854
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1859 = data
  i1858.id = i1859[0]
  i1858.name = i1859[1]
  return i1858
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1860 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1861 = data
  i1860.fixedDeltaTime = i1861[0]
  i1860.maximumDeltaTime = i1861[1]
  i1860.timeScale = i1861[2]
  i1860.maximumParticleTimestep = i1861[3]
  return i1860
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1862 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1863 = data
  i1862.gravity = new pc.Vec3( i1863[0], i1863[1], i1863[2] )
  i1862.defaultSolverIterations = i1863[3]
  i1862.bounceThreshold = i1863[4]
  i1862.autoSyncTransforms = !!i1863[5]
  i1862.autoSimulation = !!i1863[6]
  var i1865 = i1863[7]
  var i1864 = []
  for(var i = 0; i < i1865.length; i += 1) {
    i1864.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1865[i + 0]) );
  }
  i1862.collisionMatrix = i1864
  return i1862
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1868 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1869 = data
  i1868.enabled = !!i1869[0]
  i1868.layerId = i1869[1]
  i1868.otherLayerId = i1869[2]
  return i1868
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1870 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1871 = data
  request.r(i1871[0], i1871[1], 0, i1870, 'material')
  i1870.gravity = new pc.Vec2( i1871[2], i1871[3] )
  i1870.positionIterations = i1871[4]
  i1870.velocityIterations = i1871[5]
  i1870.velocityThreshold = i1871[6]
  i1870.maxLinearCorrection = i1871[7]
  i1870.maxAngularCorrection = i1871[8]
  i1870.maxTranslationSpeed = i1871[9]
  i1870.maxRotationSpeed = i1871[10]
  i1870.baumgarteScale = i1871[11]
  i1870.baumgarteTOIScale = i1871[12]
  i1870.timeToSleep = i1871[13]
  i1870.linearSleepTolerance = i1871[14]
  i1870.angularSleepTolerance = i1871[15]
  i1870.defaultContactOffset = i1871[16]
  i1870.autoSimulation = !!i1871[17]
  i1870.queriesHitTriggers = !!i1871[18]
  i1870.queriesStartInColliders = !!i1871[19]
  i1870.callbacksOnDisable = !!i1871[20]
  i1870.reuseCollisionCallbacks = !!i1871[21]
  i1870.autoSyncTransforms = !!i1871[22]
  var i1873 = i1871[23]
  var i1872 = []
  for(var i = 0; i < i1873.length; i += 1) {
    i1872.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1873[i + 0]) );
  }
  i1870.collisionMatrix = i1872
  return i1870
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1876 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1877 = data
  i1876.enabled = !!i1877[0]
  i1876.layerId = i1877[1]
  i1876.otherLayerId = i1877[2]
  return i1876
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1878 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1879 = data
  var i1881 = i1879[0]
  var i1880 = []
  for(var i = 0; i < i1881.length; i += 1) {
    i1880.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1881[i + 0]) );
  }
  i1878.qualityLevels = i1880
  var i1883 = i1879[1]
  var i1882 = []
  for(var i = 0; i < i1883.length; i += 1) {
    i1882.push( i1883[i + 0] );
  }
  i1878.names = i1882
  i1878.shadows = i1879[2]
  i1878.anisotropicFiltering = i1879[3]
  i1878.antiAliasing = i1879[4]
  i1878.lodBias = i1879[5]
  i1878.shadowCascades = i1879[6]
  i1878.shadowDistance = i1879[7]
  i1878.shadowmaskMode = i1879[8]
  i1878.shadowProjection = i1879[9]
  i1878.shadowResolution = i1879[10]
  i1878.softParticles = !!i1879[11]
  i1878.softVegetation = !!i1879[12]
  i1878.activeColorSpace = i1879[13]
  i1878.desiredColorSpace = i1879[14]
  i1878.masterTextureLimit = i1879[15]
  i1878.maxQueuedFrames = i1879[16]
  i1878.particleRaycastBudget = i1879[17]
  i1878.pixelLightCount = i1879[18]
  i1878.realtimeReflectionProbes = !!i1879[19]
  i1878.shadowCascade2Split = i1879[20]
  i1878.shadowCascade4Split = new pc.Vec3( i1879[21], i1879[22], i1879[23] )
  i1878.streamingMipmapsActive = !!i1879[24]
  i1878.vSyncCount = i1879[25]
  i1878.asyncUploadBufferSize = i1879[26]
  i1878.asyncUploadTimeSlice = i1879[27]
  i1878.billboardsFaceCameraPosition = !!i1879[28]
  i1878.shadowNearPlaneOffset = i1879[29]
  i1878.streamingMipmapsMemoryBudget = i1879[30]
  i1878.maximumLODLevel = i1879[31]
  i1878.streamingMipmapsAddAllCameras = !!i1879[32]
  i1878.streamingMipmapsMaxLevelReduction = i1879[33]
  i1878.streamingMipmapsRenderersPerFrame = i1879[34]
  i1878.resolutionScalingFixedDPIFactor = i1879[35]
  i1878.streamingMipmapsMaxFileIORequests = i1879[36]
  i1878.currentQualityLevel = i1879[37]
  return i1878
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1888 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1889 = data
  i1888.weight = i1889[0]
  i1888.vertices = i1889[1]
  i1888.normals = i1889[2]
  i1888.tangents = i1889[3]
  return i1888
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

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.Animation":{"playAutomatically":0,"clip":1,"clips":3,"wrapMode":4,"enabled":5},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3}}

Deserializers.requiredComponents = {"33":[34],"35":[34],"36":[34],"37":[34],"38":[34],"39":[34],"40":[21],"41":[1],"42":[43],"44":[43],"45":[43],"46":[43],"47":[43],"48":[43],"49":[50],"51":[50],"52":[50],"53":[50],"54":[50],"55":[50],"56":[50],"57":[50],"58":[50],"59":[50],"60":[50],"61":[50],"62":[50],"63":[1],"16":[15],"64":[65],"66":[65],"67":[9],"68":[69],"70":[5],"71":[5],"72":[9],"73":[15,9],"74":[9,10],"75":[9],"76":[10,9],"77":[15],"78":[10,9],"79":[9],"80":[9],"81":[9],"82":[67],"83":[10,9],"84":[9],"85":[67],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[9],"95":[10,9],"96":[9],"97":[9],"98":[9],"99":[9],"12":[10,9],"100":[9],"101":[102],"103":[102],"104":[102],"105":[102],"106":[1],"107":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.Animation","UnityEngine.AnimationClip","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

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

Deserializers.buildID = "0e344745-b84b-4b6e-bb91-59d02bcb25e4";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[["AdKit","Prims","ResetStatics"]]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

