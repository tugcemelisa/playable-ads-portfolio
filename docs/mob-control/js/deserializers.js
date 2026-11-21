var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1404 = root || request.c( 'UnityEngine.JointSpring' )
  var i1405 = data
  i1404.spring = i1405[0]
  i1404.damper = i1405[1]
  i1404.targetPosition = i1405[2]
  return i1404
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1406 = root || request.c( 'UnityEngine.JointMotor' )
  var i1407 = data
  i1406.m_TargetVelocity = i1407[0]
  i1406.m_Force = i1407[1]
  i1406.m_FreeSpin = i1407[2]
  return i1406
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1408 = root || request.c( 'UnityEngine.JointLimits' )
  var i1409 = data
  i1408.m_Min = i1409[0]
  i1408.m_Max = i1409[1]
  i1408.m_Bounciness = i1409[2]
  i1408.m_BounceMinVelocity = i1409[3]
  i1408.m_ContactDistance = i1409[4]
  i1408.minBounce = i1409[5]
  i1408.maxBounce = i1409[6]
  return i1408
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1410 = root || request.c( 'UnityEngine.JointDrive' )
  var i1411 = data
  i1410.m_PositionSpring = i1411[0]
  i1410.m_PositionDamper = i1411[1]
  i1410.m_MaximumForce = i1411[2]
  i1410.m_UseAcceleration = i1411[3]
  return i1410
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1412 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1413 = data
  i1412.m_Spring = i1413[0]
  i1412.m_Damper = i1413[1]
  return i1412
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1414 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1415 = data
  i1414.m_Limit = i1415[0]
  i1414.m_Bounciness = i1415[1]
  i1414.m_ContactDistance = i1415[2]
  return i1414
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1416 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1417 = data
  i1416.m_ExtremumSlip = i1417[0]
  i1416.m_ExtremumValue = i1417[1]
  i1416.m_AsymptoteSlip = i1417[2]
  i1416.m_AsymptoteValue = i1417[3]
  i1416.m_Stiffness = i1417[4]
  return i1416
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1418 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1419 = data
  i1418.m_LowerAngle = i1419[0]
  i1418.m_UpperAngle = i1419[1]
  return i1418
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1420 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1421 = data
  i1420.m_MotorSpeed = i1421[0]
  i1420.m_MaximumMotorTorque = i1421[1]
  return i1420
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1423 = data
  i1422.m_DampingRatio = i1423[0]
  i1422.m_Frequency = i1423[1]
  i1422.m_Angle = i1423[2]
  return i1422
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1424 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1425 = data
  i1424.m_LowerTranslation = i1425[0]
  i1424.m_UpperTranslation = i1425[1]
  return i1424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1426 = root || new pc.UnityMaterial()
  var i1427 = data
  i1426.name = i1427[0]
  request.r(i1427[1], i1427[2], 0, i1426, 'shader')
  i1426.renderQueue = i1427[3]
  i1426.enableInstancing = !!i1427[4]
  var i1429 = i1427[5]
  var i1428 = []
  for(var i = 0; i < i1429.length; i += 1) {
    i1428.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1429[i + 0]) );
  }
  i1426.floatParameters = i1428
  var i1431 = i1427[6]
  var i1430 = []
  for(var i = 0; i < i1431.length; i += 1) {
    i1430.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1431[i + 0]) );
  }
  i1426.colorParameters = i1430
  var i1433 = i1427[7]
  var i1432 = []
  for(var i = 0; i < i1433.length; i += 1) {
    i1432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1433[i + 0]) );
  }
  i1426.vectorParameters = i1432
  var i1435 = i1427[8]
  var i1434 = []
  for(var i = 0; i < i1435.length; i += 1) {
    i1434.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1435[i + 0]) );
  }
  i1426.textureParameters = i1434
  var i1437 = i1427[9]
  var i1436 = []
  for(var i = 0; i < i1437.length; i += 1) {
    i1436.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1437[i + 0]) );
  }
  i1426.materialFlags = i1436
  return i1426
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1440 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1441 = data
  i1440.name = i1441[0]
  i1440.value = i1441[1]
  return i1440
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1444 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1445 = data
  i1444.name = i1445[0]
  i1444.value = new pc.Color(i1445[1], i1445[2], i1445[3], i1445[4])
  return i1444
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1448 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1449 = data
  i1448.name = i1449[0]
  i1448.value = new pc.Vec4( i1449[1], i1449[2], i1449[3], i1449[4] )
  return i1448
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1452 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1453 = data
  i1452.name = i1453[0]
  request.r(i1453[1], i1453[2], 0, i1452, 'value')
  return i1452
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1456 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1457 = data
  i1456.name = i1457[0]
  i1456.enabled = !!i1457[1]
  return i1456
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1459 = data
  i1458.name = i1459[0]
  i1458.width = i1459[1]
  i1458.height = i1459[2]
  i1458.mipmapCount = i1459[3]
  i1458.anisoLevel = i1459[4]
  i1458.filterMode = i1459[5]
  i1458.hdr = !!i1459[6]
  i1458.format = i1459[7]
  i1458.wrapMode = i1459[8]
  i1458.alphaIsTransparency = !!i1459[9]
  i1458.alphaSource = i1459[10]
  i1458.graphicsFormat = i1459[11]
  i1458.sRGBTexture = !!i1459[12]
  i1458.desiredColorSpace = i1459[13]
  i1458.wrapU = i1459[14]
  i1458.wrapV = i1459[15]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1460 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1461 = data
  i1460.name = i1461[0]
  i1460.atlasId = i1461[1]
  i1460.mipmapCount = i1461[2]
  i1460.hdr = !!i1461[3]
  i1460.size = i1461[4]
  i1460.anisoLevel = i1461[5]
  i1460.filterMode = i1461[6]
  var i1463 = i1461[7]
  var i1462 = []
  for(var i = 0; i < i1463.length; i += 4) {
    i1462.push( UnityEngine.Rect.MinMaxRect(i1463[i + 0], i1463[i + 1], i1463[i + 2], i1463[i + 3]) );
  }
  i1460.rects = i1462
  i1460.wrapU = i1461[8]
  i1460.wrapV = i1461[9]
  return i1460
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1467 = data
  i1466.name = i1467[0]
  i1466.index = i1467[1]
  i1466.startup = !!i1467[2]
  return i1466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1469 = data
  i1468.aspect = i1469[0]
  i1468.orthographic = !!i1469[1]
  i1468.orthographicSize = i1469[2]
  i1468.backgroundColor = new pc.Color(i1469[3], i1469[4], i1469[5], i1469[6])
  i1468.nearClipPlane = i1469[7]
  i1468.farClipPlane = i1469[8]
  i1468.fieldOfView = i1469[9]
  i1468.depth = i1469[10]
  i1468.clearFlags = i1469[11]
  i1468.cullingMask = i1469[12]
  i1468.rect = i1469[13]
  request.r(i1469[14], i1469[15], 0, i1468, 'targetTexture')
  i1468.usePhysicalProperties = !!i1469[16]
  i1468.focalLength = i1469[17]
  i1468.sensorSize = new pc.Vec2( i1469[18], i1469[19] )
  i1468.lensShift = new pc.Vec2( i1469[20], i1469[21] )
  i1468.gateFit = i1469[22]
  i1468.commandBufferCount = i1469[23]
  i1468.cameraType = i1469[24]
  i1468.enabled = !!i1469[25]
  return i1468
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1470 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1471 = data
  i1470.name = i1471[0]
  i1470.tagId = i1471[1]
  i1470.enabled = !!i1471[2]
  i1470.isStatic = !!i1471[3]
  i1470.layer = i1471[4]
  return i1470
}

Deserializers["MobControlAd.MobControlGame"] = function (request, data, root) {
  var i1472 = root || request.c( 'MobControlAd.MobControlGame' )
  var i1473 = data
  i1472.fireRate = i1473[0]
  i1472.yellowBlockStartHp = i1473[1]
  i1472.enemyBaseStartHp = i1473[2]
  i1472.ctaText = i1473[3]
  i1472.backgroundTheme = i1473[4]
  return i1472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Light"] = function (request, data, root) {
  var i1474 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Light' )
  var i1475 = data
  i1474.type = i1475[0]
  i1474.color = new pc.Color(i1475[1], i1475[2], i1475[3], i1475[4])
  i1474.cullingMask = i1475[5]
  i1474.intensity = i1475[6]
  i1474.range = i1475[7]
  i1474.spotAngle = i1475[8]
  i1474.shadows = i1475[9]
  i1474.shadowNormalBias = i1475[10]
  i1474.shadowBias = i1475[11]
  i1474.shadowStrength = i1475[12]
  i1474.shadowResolution = i1475[13]
  i1474.lightmapBakeType = i1475[14]
  i1474.renderMode = i1475[15]
  request.r(i1475[16], i1475[17], 0, i1474, 'cookie')
  i1474.cookieSize = i1475[18]
  i1474.shadowNearPlane = i1475[19]
  i1474.occlusionMaskChannel = i1475[20]
  i1474.isBaked = !!i1475[21]
  i1474.mixedLightingMode = i1475[22]
  i1474.enabled = !!i1475[23]
  return i1474
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1476 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1477 = data
  i1476.ambientIntensity = i1477[0]
  i1476.reflectionIntensity = i1477[1]
  i1476.ambientMode = i1477[2]
  i1476.ambientLight = new pc.Color(i1477[3], i1477[4], i1477[5], i1477[6])
  i1476.ambientSkyColor = new pc.Color(i1477[7], i1477[8], i1477[9], i1477[10])
  i1476.ambientGroundColor = new pc.Color(i1477[11], i1477[12], i1477[13], i1477[14])
  i1476.ambientEquatorColor = new pc.Color(i1477[15], i1477[16], i1477[17], i1477[18])
  i1476.fogColor = new pc.Color(i1477[19], i1477[20], i1477[21], i1477[22])
  i1476.fogEndDistance = i1477[23]
  i1476.fogStartDistance = i1477[24]
  i1476.fogDensity = i1477[25]
  i1476.fog = !!i1477[26]
  request.r(i1477[27], i1477[28], 0, i1476, 'skybox')
  i1476.fogMode = i1477[29]
  var i1479 = i1477[30]
  var i1478 = []
  for(var i = 0; i < i1479.length; i += 1) {
    i1478.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1479[i + 0]) );
  }
  i1476.lightmaps = i1478
  i1476.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1477[31], i1476.lightProbes)
  i1476.lightmapsMode = i1477[32]
  i1476.mixedBakeMode = i1477[33]
  i1476.environmentLightingMode = i1477[34]
  i1476.ambientProbe = new pc.SphericalHarmonicsL2(i1477[35])
  request.r(i1477[36], i1477[37], 0, i1476, 'customReflection')
  request.r(i1477[38], i1477[39], 0, i1476, 'defaultReflection')
  i1476.defaultReflectionMode = i1477[40]
  i1476.defaultReflectionResolution = i1477[41]
  i1476.sunLightObjectId = i1477[42]
  i1476.pixelLightCount = i1477[43]
  i1476.defaultReflectionHDR = !!i1477[44]
  i1476.hasLightDataAsset = !!i1477[45]
  i1476.hasManualGenerate = !!i1477[46]
  return i1476
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1482 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1483 = data
  request.r(i1483[0], i1483[1], 0, i1482, 'lightmapColor')
  request.r(i1483[2], i1483[3], 0, i1482, 'lightmapDirection')
  request.r(i1483[4], i1483[5], 0, i1482, 'shadowMask')
  return i1482
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1484 = root || new UnityEngine.LightProbes()
  var i1485 = data
  return i1484
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1492 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1493 = data
  i1492.pivot = new pc.Vec2( i1493[0], i1493[1] )
  i1492.anchorMin = new pc.Vec2( i1493[2], i1493[3] )
  i1492.anchorMax = new pc.Vec2( i1493[4], i1493[5] )
  i1492.sizeDelta = new pc.Vec2( i1493[6], i1493[7] )
  i1492.anchoredPosition3D = new pc.Vec3( i1493[8], i1493[9], i1493[10] )
  i1492.rotation = new pc.Quat(i1493[11], i1493[12], i1493[13], i1493[14])
  i1492.scale = new pc.Vec3( i1493[15], i1493[16], i1493[17] )
  return i1492
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1494 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1495 = data
  i1494.cullTransparentMesh = !!i1495[0]
  return i1494
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1496 = root || request.c( 'UnityEngine.UI.Text' )
  var i1497 = data
  i1496.m_FontData = request.d('UnityEngine.UI.FontData', i1497[0], i1496.m_FontData)
  i1496.m_Text = i1497[1]
  request.r(i1497[2], i1497[3], 0, i1496, 'm_Material')
  i1496.m_Maskable = !!i1497[4]
  i1496.m_Color = new pc.Color(i1497[5], i1497[6], i1497[7], i1497[8])
  i1496.m_RaycastTarget = !!i1497[9]
  i1496.m_RaycastPadding = new pc.Vec4( i1497[10], i1497[11], i1497[12], i1497[13] )
  return i1496
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1498 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1499 = data
  request.r(i1499[0], i1499[1], 0, i1498, 'm_Font')
  i1498.m_FontSize = i1499[2]
  i1498.m_FontStyle = i1499[3]
  i1498.m_BestFit = !!i1499[4]
  i1498.m_MinSize = i1499[5]
  i1498.m_MaxSize = i1499[6]
  i1498.m_Alignment = i1499[7]
  i1498.m_AlignByGeometry = !!i1499[8]
  i1498.m_RichText = !!i1499[9]
  i1498.m_HorizontalOverflow = i1499[10]
  i1498.m_VerticalOverflow = i1499[11]
  i1498.m_LineSpacing = i1499[12]
  return i1498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i1500 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i1501 = data
  i1500.position = new pc.Vec3( i1501[0], i1501[1], i1501[2] )
  i1500.scale = new pc.Vec3( i1501[3], i1501[4], i1501[5] )
  i1500.rotation = new pc.Quat(i1501[6], i1501[7], i1501[8], i1501[9])
  return i1500
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1502 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1503 = data
  request.r(i1503[0], i1503[1], 0, i1502, 'additionalVertexStreams')
  i1502.enabled = !!i1503[2]
  request.r(i1503[3], i1503[4], 0, i1502, 'sharedMaterial')
  var i1505 = i1503[5]
  var i1504 = []
  for(var i = 0; i < i1505.length; i += 2) {
  request.r(i1505[i + 0], i1505[i + 1], 2, i1504, '')
  }
  i1502.sharedMaterials = i1504
  i1502.receiveShadows = !!i1503[6]
  i1502.shadowCastingMode = i1503[7]
  i1502.sortingLayerID = i1503[8]
  i1502.sortingOrder = i1503[9]
  i1502.lightmapIndex = i1503[10]
  i1502.lightmapSceneIndex = i1503[11]
  i1502.lightmapScaleOffset = new pc.Vec4( i1503[12], i1503[13], i1503[14], i1503[15] )
  i1502.lightProbeUsage = i1503[16]
  i1502.reflectionProbeUsage = i1503[17]
  return i1502
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i1508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i1509 = data
  i1508.m_Alignment = i1509[0]
  i1508.m_Anchor = i1509[1]
  i1508.m_CharacterSize = i1509[2]
  request.r(i1509[3], i1509[4], 0, i1508, 'm_Font')
  i1508.m_FontSize = i1509[5]
  i1508.m_FontStyle = i1509[6]
  i1508.m_LineSpacing = i1509[7]
  i1508.m_OffsetZ = i1509[8]
  i1508.m_RichText = !!i1509[9]
  i1508.m_TabSize = i1509[10]
  i1508.m_Text = i1509[11]
  return i1508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1510 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1511 = data
  request.r(i1511[0], i1511[1], 0, i1510, 'sharedMesh')
  return i1510
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1512 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1513 = data
  i1512.name = i1513[0]
  i1512.halfPrecision = !!i1513[1]
  i1512.useSimplification = !!i1513[2]
  i1512.useUInt32IndexFormat = !!i1513[3]
  i1512.vertexCount = i1513[4]
  i1512.aabb = i1513[5]
  var i1515 = i1513[6]
  var i1514 = []
  for(var i = 0; i < i1515.length; i += 1) {
    i1514.push( !!i1515[i + 0] );
  }
  i1512.streams = i1514
  i1512.vertices = i1513[7]
  var i1517 = i1513[8]
  var i1516 = []
  for(var i = 0; i < i1517.length; i += 1) {
    i1516.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1517[i + 0]) );
  }
  i1512.subMeshes = i1516
  var i1519 = i1513[9]
  var i1518 = []
  for(var i = 0; i < i1519.length; i += 16) {
    i1518.push( new pc.Mat4().setData(i1519[i + 0], i1519[i + 1], i1519[i + 2], i1519[i + 3],  i1519[i + 4], i1519[i + 5], i1519[i + 6], i1519[i + 7],  i1519[i + 8], i1519[i + 9], i1519[i + 10], i1519[i + 11],  i1519[i + 12], i1519[i + 13], i1519[i + 14], i1519[i + 15]) );
  }
  i1512.bindposes = i1518
  var i1521 = i1513[10]
  var i1520 = []
  for(var i = 0; i < i1521.length; i += 1) {
    i1520.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1521[i + 0]) );
  }
  i1512.blendShapes = i1520
  return i1512
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1526 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1527 = data
  i1526.triangles = i1527[0]
  return i1526
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1533 = data
  i1532.name = i1533[0]
  var i1535 = i1533[1]
  var i1534 = []
  for(var i = 0; i < i1535.length; i += 1) {
    i1534.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1535[i + 0]) );
  }
  i1532.frames = i1534
  return i1532
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

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1553 = data
  i1552.weight = i1553[0]
  i1552.vertices = i1553[1]
  i1552.normals = i1553[2]
  i1552.tangents = i1553[3]
  return i1552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1555 = data
  i1554.center = new pc.Vec3( i1555[0], i1555[1], i1555[2] )
  i1554.radius = i1555[3]
  i1554.enabled = !!i1555[4]
  i1554.isTrigger = !!i1555[5]
  request.r(i1555[6], i1555[7], 0, i1554, 'material')
  return i1554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i1556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i1557 = data
  i1556.center = new pc.Vec3( i1557[0], i1557[1], i1557[2] )
  i1556.radius = i1557[3]
  i1556.height = i1557[4]
  i1556.direction = i1557[5]
  i1556.enabled = !!i1557[6]
  i1556.isTrigger = !!i1557[7]
  request.r(i1557[8], i1557[9], 0, i1556, 'material')
  return i1556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1559 = data
  i1558.center = new pc.Vec3( i1559[0], i1559[1], i1559[2] )
  i1558.size = new pc.Vec3( i1559[3], i1559[4], i1559[5] )
  i1558.enabled = !!i1559[6]
  i1558.isTrigger = !!i1559[7]
  request.r(i1559[8], i1559[9], 0, i1558, 'material')
  return i1558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i1560 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i1561 = data
  request.r(i1561[0], i1561[1], 0, i1560, 'sharedMesh')
  i1560.convex = !!i1561[2]
  i1560.enabled = !!i1561[3]
  i1560.isTrigger = !!i1561[4]
  request.r(i1561[5], i1561[6], 0, i1560, 'material')
  return i1560
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1562 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1563 = data
  var i1565 = i1563[0]
  var i1564 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1565[i + 0]));
  }
  i1562.ShaderCompilationErrors = i1564
  i1562.name = i1563[1]
  i1562.guid = i1563[2]
  var i1567 = i1563[3]
  var i1566 = []
  for(var i = 0; i < i1567.length; i += 1) {
    i1566.push( i1567[i + 0] );
  }
  i1562.shaderDefinedKeywords = i1566
  var i1569 = i1563[4]
  var i1568 = []
  for(var i = 0; i < i1569.length; i += 1) {
    i1568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1569[i + 0]) );
  }
  i1562.passes = i1568
  var i1571 = i1563[5]
  var i1570 = []
  for(var i = 0; i < i1571.length; i += 1) {
    i1570.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1571[i + 0]) );
  }
  i1562.usePasses = i1570
  var i1573 = i1563[6]
  var i1572 = []
  for(var i = 0; i < i1573.length; i += 1) {
    i1572.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1573[i + 0]) );
  }
  i1562.defaultParameterValues = i1572
  request.r(i1563[7], i1563[8], 0, i1562, 'unityFallbackShader')
  i1562.readDepth = !!i1563[9]
  i1562.hasDepthOnlyPass = !!i1563[10]
  i1562.isCreatedByShaderGraph = !!i1563[11]
  i1562.disableBatching = !!i1563[12]
  i1562.compiled = !!i1563[13]
  return i1562
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1576 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1577 = data
  i1576.shaderName = i1577[0]
  i1576.errorMessage = i1577[1]
  return i1576
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1582 = root || new pc.UnityShaderPass()
  var i1583 = data
  i1582.id = i1583[0]
  i1582.subShaderIndex = i1583[1]
  i1582.name = i1583[2]
  i1582.passType = i1583[3]
  i1582.grabPassTextureName = i1583[4]
  i1582.usePass = !!i1583[5]
  i1582.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[6], i1582.zTest)
  i1582.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[7], i1582.zWrite)
  i1582.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[8], i1582.culling)
  i1582.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1583[9], i1582.blending)
  i1582.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1583[10], i1582.alphaBlending)
  i1582.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[11], i1582.colorWriteMask)
  i1582.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[12], i1582.offsetUnits)
  i1582.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[13], i1582.offsetFactor)
  i1582.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[14], i1582.stencilRef)
  i1582.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[15], i1582.stencilReadMask)
  i1582.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1583[16], i1582.stencilWriteMask)
  i1582.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1583[17], i1582.stencilOp)
  i1582.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1583[18], i1582.stencilOpFront)
  i1582.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1583[19], i1582.stencilOpBack)
  var i1585 = i1583[20]
  var i1584 = []
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1585[i + 0]) );
  }
  i1582.tags = i1584
  var i1587 = i1583[21]
  var i1586 = []
  for(var i = 0; i < i1587.length; i += 1) {
    i1586.push( i1587[i + 0] );
  }
  i1582.passDefinedKeywords = i1586
  var i1589 = i1583[22]
  var i1588 = []
  for(var i = 0; i < i1589.length; i += 1) {
    i1588.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1589[i + 0]) );
  }
  i1582.passDefinedKeywordGroups = i1588
  var i1591 = i1583[23]
  var i1590 = []
  for(var i = 0; i < i1591.length; i += 1) {
    i1590.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1591[i + 0]) );
  }
  i1582.variants = i1590
  var i1593 = i1583[24]
  var i1592 = []
  for(var i = 0; i < i1593.length; i += 1) {
    i1592.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1593[i + 0]) );
  }
  i1582.excludedVariants = i1592
  i1582.hasDepthReader = !!i1583[25]
  return i1582
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1595 = data
  i1594.val = i1595[0]
  i1594.name = i1595[1]
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1596 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1597 = data
  i1596.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1597[0], i1596.src)
  i1596.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1597[1], i1596.dst)
  i1596.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1597[2], i1596.op)
  return i1596
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1599 = data
  i1598.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1599[0], i1598.pass)
  i1598.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1599[1], i1598.fail)
  i1598.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1599[2], i1598.zFail)
  i1598.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1599[3], i1598.comp)
  return i1598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1603 = data
  i1602.name = i1603[0]
  i1602.value = i1603[1]
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1606 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1607 = data
  var i1609 = i1607[0]
  var i1608 = []
  for(var i = 0; i < i1609.length; i += 1) {
    i1608.push( i1609[i + 0] );
  }
  i1606.keywords = i1608
  i1606.hasDiscard = !!i1607[1]
  return i1606
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1612 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1613 = data
  i1612.passId = i1613[0]
  i1612.subShaderIndex = i1613[1]
  var i1615 = i1613[2]
  var i1614 = []
  for(var i = 0; i < i1615.length; i += 1) {
    i1614.push( i1615[i + 0] );
  }
  i1612.keywords = i1614
  i1612.vertexProgram = i1613[3]
  i1612.fragmentProgram = i1613[4]
  i1612.exportedForWebGl2 = !!i1613[5]
  i1612.readDepth = !!i1613[6]
  return i1612
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1619 = data
  request.r(i1619[0], i1619[1], 0, i1618, 'shader')
  i1618.pass = i1619[2]
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1623 = data
  i1622.name = i1623[0]
  i1622.type = i1623[1]
  i1622.value = new pc.Vec4( i1623[2], i1623[3], i1623[4], i1623[5] )
  i1622.textureValue = i1623[6]
  i1622.shaderPropertyFlag = i1623[7]
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1624 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1625 = data
  i1624.name = i1625[0]
  return i1624
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1626 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1627 = data
  i1626.name = i1627[0]
  i1626.wrapMode = i1627[1]
  i1626.isLooping = !!i1627[2]
  i1626.length = i1627[3]
  var i1629 = i1627[4]
  var i1628 = []
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1629[i + 0]) );
  }
  i1626.curves = i1628
  var i1631 = i1627[5]
  var i1630 = []
  for(var i = 0; i < i1631.length; i += 1) {
    i1630.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1631[i + 0]) );
  }
  i1626.events = i1630
  i1626.halfPrecision = !!i1627[6]
  i1626._frameRate = i1627[7]
  i1626.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1627[8], i1626.localBounds)
  i1626.hasMuscleCurves = !!i1627[9]
  var i1633 = i1627[10]
  var i1632 = []
  for(var i = 0; i < i1633.length; i += 1) {
    i1632.push( i1633[i + 0] );
  }
  i1626.clipMuscleConstant = i1632
  i1626.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1627[11], i1626.clipBindingConstant)
  return i1626
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1636 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1637 = data
  i1636.path = i1637[0]
  i1636.hash = i1637[1]
  i1636.componentType = i1637[2]
  i1636.property = i1637[3]
  i1636.keys = i1637[4]
  var i1639 = i1637[5]
  var i1638 = []
  for(var i = 0; i < i1639.length; i += 1) {
    i1638.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1639[i + 0]) );
  }
  i1636.objectReferenceKeys = i1638
  return i1636
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1643 = data
  i1642.time = i1643[0]
  request.r(i1643[1], i1643[2], 0, i1642, 'value')
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1646 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1647 = data
  i1646.functionName = i1647[0]
  i1646.floatParameter = i1647[1]
  i1646.intParameter = i1647[2]
  i1646.stringParameter = i1647[3]
  request.r(i1647[4], i1647[5], 0, i1646, 'objectReferenceParameter')
  i1646.time = i1647[6]
  return i1646
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1649 = data
  i1648.center = new pc.Vec3( i1649[0], i1649[1], i1649[2] )
  i1648.extends = new pc.Vec3( i1649[3], i1649[4], i1649[5] )
  return i1648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1652 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1653 = data
  var i1655 = i1653[0]
  var i1654 = []
  for(var i = 0; i < i1655.length; i += 1) {
    i1654.push( i1655[i + 0] );
  }
  i1652.genericBindings = i1654
  var i1657 = i1653[1]
  var i1656 = []
  for(var i = 0; i < i1657.length; i += 1) {
    i1656.push( i1657[i + 0] );
  }
  i1652.pptrCurveMapping = i1656
  return i1652
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1658 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1659 = data
  i1658.name = i1659[0]
  i1658.ascent = i1659[1]
  i1658.originalLineHeight = i1659[2]
  i1658.fontSize = i1659[3]
  var i1661 = i1659[4]
  var i1660 = []
  for(var i = 0; i < i1661.length; i += 1) {
    i1660.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1661[i + 0]) );
  }
  i1658.characterInfo = i1660
  request.r(i1659[5], i1659[6], 0, i1658, 'texture')
  i1658.originalFontSize = i1659[7]
  return i1658
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1664 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1665 = data
  i1664.index = i1665[0]
  i1664.advance = i1665[1]
  i1664.bearing = i1665[2]
  i1664.glyphWidth = i1665[3]
  i1664.glyphHeight = i1665[4]
  i1664.minX = i1665[5]
  i1664.maxX = i1665[6]
  i1664.minY = i1665[7]
  i1664.maxY = i1665[8]
  i1664.uvBottomLeftX = i1665[9]
  i1664.uvBottomLeftY = i1665[10]
  i1664.uvBottomRightX = i1665[11]
  i1664.uvBottomRightY = i1665[12]
  i1664.uvTopLeftX = i1665[13]
  i1664.uvTopLeftY = i1665[14]
  i1664.uvTopRightX = i1665[15]
  i1664.uvTopRightY = i1665[16]
  return i1664
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1666 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1667 = data
  i1666.name = i1667[0]
  i1666.bytes64 = i1667[1]
  i1666.data = i1667[2]
  return i1666
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1668 = root || request.c( 'TMPro.TMP_Settings' )
  var i1669 = data
  i1668.assetVersion = i1669[0]
  i1668.m_TextWrappingMode = i1669[1]
  i1668.m_enableKerning = !!i1669[2]
  var i1671 = i1669[3]
  var i1670 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1671.length; i += 1) {
    i1670.add(i1671[i + 0]);
  }
  i1668.m_ActiveFontFeatures = i1670
  i1668.m_enableExtraPadding = !!i1669[4]
  i1668.m_enableTintAllSprites = !!i1669[5]
  i1668.m_enableParseEscapeCharacters = !!i1669[6]
  i1668.m_EnableRaycastTarget = !!i1669[7]
  i1668.m_GetFontFeaturesAtRuntime = !!i1669[8]
  i1668.m_missingGlyphCharacter = i1669[9]
  i1668.m_ClearDynamicDataOnBuild = !!i1669[10]
  i1668.m_warningsDisabled = !!i1669[11]
  request.r(i1669[12], i1669[13], 0, i1668, 'm_defaultFontAsset')
  i1668.m_defaultFontAssetPath = i1669[14]
  i1668.m_defaultFontSize = i1669[15]
  i1668.m_defaultAutoSizeMinRatio = i1669[16]
  i1668.m_defaultAutoSizeMaxRatio = i1669[17]
  i1668.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1669[18], i1669[19] )
  i1668.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1669[20], i1669[21] )
  i1668.m_autoSizeTextContainer = !!i1669[22]
  i1668.m_IsTextObjectScaleStatic = !!i1669[23]
  var i1673 = i1669[24]
  var i1672 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1673.length; i += 2) {
  request.r(i1673[i + 0], i1673[i + 1], 1, i1672, '')
  }
  i1668.m_fallbackFontAssets = i1672
  i1668.m_matchMaterialPreset = !!i1669[25]
  i1668.m_HideSubTextObjects = !!i1669[26]
  request.r(i1669[27], i1669[28], 0, i1668, 'm_defaultSpriteAsset')
  i1668.m_defaultSpriteAssetPath = i1669[29]
  i1668.m_enableEmojiSupport = !!i1669[30]
  i1668.m_MissingCharacterSpriteUnicode = i1669[31]
  var i1675 = i1669[32]
  var i1674 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1675.length; i += 2) {
  request.r(i1675[i + 0], i1675[i + 1], 1, i1674, '')
  }
  i1668.m_EmojiFallbackTextAssets = i1674
  i1668.m_defaultColorGradientPresetsPath = i1669[33]
  request.r(i1669[34], i1669[35], 0, i1668, 'm_defaultStyleSheet')
  i1668.m_StyleSheetsResourcePath = i1669[36]
  request.r(i1669[37], i1669[38], 0, i1668, 'm_leadingCharacters')
  request.r(i1669[39], i1669[40], 0, i1668, 'm_followingCharacters')
  i1668.m_UseModernHangulLineBreakingRules = !!i1669[41]
  return i1668
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1682 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1683 = data
  i1682.normalStyle = i1683[0]
  i1682.normalSpacingOffset = i1683[1]
  i1682.boldStyle = i1683[2]
  i1682.boldSpacing = i1683[3]
  i1682.italicStyle = i1683[4]
  i1682.tabSize = i1683[5]
  request.r(i1683[6], i1683[7], 0, i1682, 'atlas')
  i1682.m_SourceFontFileGUID = i1683[8]
  i1682.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1683[9], i1682.m_CreationSettings)
  request.r(i1683[10], i1683[11], 0, i1682, 'm_SourceFontFile')
  i1682.m_SourceFontFilePath = i1683[12]
  i1682.m_AtlasPopulationMode = i1683[13]
  i1682.InternalDynamicOS = !!i1683[14]
  var i1685 = i1683[15]
  var i1684 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1685.length; i += 1) {
    i1684.add(request.d('UnityEngine.TextCore.Glyph', i1685[i + 0]));
  }
  i1682.m_GlyphTable = i1684
  var i1687 = i1683[16]
  var i1686 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1687.length; i += 1) {
    i1686.add(request.d('TMPro.TMP_Character', i1687[i + 0]));
  }
  i1682.m_CharacterTable = i1686
  var i1689 = i1683[17]
  var i1688 = []
  for(var i = 0; i < i1689.length; i += 2) {
  request.r(i1689[i + 0], i1689[i + 1], 2, i1688, '')
  }
  i1682.m_AtlasTextures = i1688
  i1682.m_AtlasTextureIndex = i1683[18]
  i1682.m_IsMultiAtlasTexturesEnabled = !!i1683[19]
  i1682.m_GetFontFeatures = !!i1683[20]
  i1682.m_ClearDynamicDataOnBuild = !!i1683[21]
  i1682.m_AtlasWidth = i1683[22]
  i1682.m_AtlasHeight = i1683[23]
  i1682.m_AtlasPadding = i1683[24]
  i1682.m_AtlasRenderMode = i1683[25]
  var i1691 = i1683[26]
  var i1690 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1691.length; i += 1) {
    i1690.add(request.d('UnityEngine.TextCore.GlyphRect', i1691[i + 0]));
  }
  i1682.m_UsedGlyphRects = i1690
  var i1693 = i1683[27]
  var i1692 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1693.length; i += 1) {
    i1692.add(request.d('UnityEngine.TextCore.GlyphRect', i1693[i + 0]));
  }
  i1682.m_FreeGlyphRects = i1692
  i1682.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1683[28], i1682.m_FontFeatureTable)
  i1682.m_ShouldReimportFontFeatures = !!i1683[29]
  var i1695 = i1683[30]
  var i1694 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1695.length; i += 2) {
  request.r(i1695[i + 0], i1695[i + 1], 1, i1694, '')
  }
  i1682.m_FallbackFontAssetTable = i1694
  var i1697 = i1683[31]
  var i1696 = []
  for(var i = 0; i < i1697.length; i += 1) {
    i1696.push( request.d('TMPro.TMP_FontWeightPair', i1697[i + 0]) );
  }
  i1682.m_FontWeightTable = i1696
  var i1699 = i1683[32]
  var i1698 = []
  for(var i = 0; i < i1699.length; i += 1) {
    i1698.push( request.d('TMPro.TMP_FontWeightPair', i1699[i + 0]) );
  }
  i1682.fontWeights = i1698
  i1682.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1683[33], i1682.m_fontInfo)
  var i1701 = i1683[34]
  var i1700 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1701.length; i += 1) {
    i1700.add(request.d('TMPro.TMP_Glyph', i1701[i + 0]));
  }
  i1682.m_glyphInfoList = i1700
  i1682.m_KerningTable = request.d('TMPro.KerningTable', i1683[35], i1682.m_KerningTable)
  var i1703 = i1683[36]
  var i1702 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1703.length; i += 2) {
  request.r(i1703[i + 0], i1703[i + 1], 1, i1702, '')
  }
  i1682.fallbackFontAssets = i1702
  i1682.m_Version = i1683[37]
  i1682.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1683[38], i1682.m_FaceInfo)
  request.r(i1683[39], i1683[40], 0, i1682, 'm_Material')
  return i1682
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1704 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1705 = data
  i1704.sourceFontFileName = i1705[0]
  i1704.sourceFontFileGUID = i1705[1]
  i1704.faceIndex = i1705[2]
  i1704.pointSizeSamplingMode = i1705[3]
  i1704.pointSize = i1705[4]
  i1704.padding = i1705[5]
  i1704.paddingMode = i1705[6]
  i1704.packingMode = i1705[7]
  i1704.atlasWidth = i1705[8]
  i1704.atlasHeight = i1705[9]
  i1704.characterSetSelectionMode = i1705[10]
  i1704.characterSequence = i1705[11]
  i1704.referencedFontAssetGUID = i1705[12]
  i1704.referencedTextAssetGUID = i1705[13]
  i1704.fontStyle = i1705[14]
  i1704.fontStyleModifier = i1705[15]
  i1704.renderMode = i1705[16]
  i1704.includeFontFeatures = !!i1705[17]
  return i1704
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1708 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1709 = data
  i1708.m_Index = i1709[0]
  i1708.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1709[1], i1708.m_Metrics)
  i1708.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1709[2], i1708.m_GlyphRect)
  i1708.m_Scale = i1709[3]
  i1708.m_AtlasIndex = i1709[4]
  i1708.m_ClassDefinitionType = i1709[5]
  return i1708
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1710 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1711 = data
  i1710.m_Width = i1711[0]
  i1710.m_Height = i1711[1]
  i1710.m_HorizontalBearingX = i1711[2]
  i1710.m_HorizontalBearingY = i1711[3]
  i1710.m_HorizontalAdvance = i1711[4]
  return i1710
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1712 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1713 = data
  i1712.m_X = i1713[0]
  i1712.m_Y = i1713[1]
  i1712.m_Width = i1713[2]
  i1712.m_Height = i1713[3]
  return i1712
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1716 = root || request.c( 'TMPro.TMP_Character' )
  var i1717 = data
  i1716.m_ElementType = i1717[0]
  i1716.m_Unicode = i1717[1]
  i1716.m_GlyphIndex = i1717[2]
  i1716.m_Scale = i1717[3]
  return i1716
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1722 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1723 = data
  var i1725 = i1723[0]
  var i1724 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1725.length; i += 1) {
    i1724.add(request.d('TMPro.MultipleSubstitutionRecord', i1725[i + 0]));
  }
  i1722.m_MultipleSubstitutionRecords = i1724
  var i1727 = i1723[1]
  var i1726 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1727.length; i += 1) {
    i1726.add(request.d('TMPro.LigatureSubstitutionRecord', i1727[i + 0]));
  }
  i1722.m_LigatureSubstitutionRecords = i1726
  var i1729 = i1723[2]
  var i1728 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1729.length; i += 1) {
    i1728.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1729[i + 0]));
  }
  i1722.m_GlyphPairAdjustmentRecords = i1728
  var i1731 = i1723[3]
  var i1730 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1731.length; i += 1) {
    i1730.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1731[i + 0]));
  }
  i1722.m_MarkToBaseAdjustmentRecords = i1730
  var i1733 = i1723[4]
  var i1732 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1733.length; i += 1) {
    i1732.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1733[i + 0]));
  }
  i1722.m_MarkToMarkAdjustmentRecords = i1732
  return i1722
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1736 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1737 = data
  i1736.m_TargetGlyphID = i1737[0]
  i1736.m_SubstituteGlyphIDs = i1737[1]
  return i1736
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1740 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1741 = data
  i1740.m_ComponentGlyphIDs = i1741[0]
  i1740.m_LigatureGlyphID = i1741[1]
  return i1740
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1744 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1745 = data
  i1744.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1745[0], i1744.m_FirstAdjustmentRecord)
  i1744.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1745[1], i1744.m_SecondAdjustmentRecord)
  i1744.m_FeatureLookupFlags = i1745[2]
  return i1744
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1746 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1747 = data
  i1746.m_GlyphIndex = i1747[0]
  i1746.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1747[1], i1746.m_GlyphValueRecord)
  return i1746
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1748 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1749 = data
  i1748.m_XPlacement = i1749[0]
  i1748.m_YPlacement = i1749[1]
  i1748.m_XAdvance = i1749[2]
  i1748.m_YAdvance = i1749[3]
  return i1748
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1752 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1753 = data
  i1752.m_BaseGlyphID = i1753[0]
  i1752.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1753[1], i1752.m_BaseGlyphAnchorPoint)
  i1752.m_MarkGlyphID = i1753[2]
  i1752.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1753[3], i1752.m_MarkPositionAdjustment)
  return i1752
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1756 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1757 = data
  i1756.m_BaseMarkGlyphID = i1757[0]
  i1756.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1757[1], i1756.m_BaseMarkGlyphAnchorPoint)
  i1756.m_CombiningMarkGlyphID = i1757[2]
  i1756.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1757[3], i1756.m_CombiningMarkPositionAdjustment)
  return i1756
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1760 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1761 = data
  request.r(i1761[0], i1761[1], 0, i1760, 'regularTypeface')
  request.r(i1761[2], i1761[3], 0, i1760, 'italicTypeface')
  return i1760
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1762 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1763 = data
  i1762.Name = i1763[0]
  i1762.PointSize = i1763[1]
  i1762.Scale = i1763[2]
  i1762.CharacterCount = i1763[3]
  i1762.LineHeight = i1763[4]
  i1762.Baseline = i1763[5]
  i1762.Ascender = i1763[6]
  i1762.CapHeight = i1763[7]
  i1762.Descender = i1763[8]
  i1762.CenterLine = i1763[9]
  i1762.SuperscriptOffset = i1763[10]
  i1762.SubscriptOffset = i1763[11]
  i1762.SubSize = i1763[12]
  i1762.Underline = i1763[13]
  i1762.UnderlineThickness = i1763[14]
  i1762.strikethrough = i1763[15]
  i1762.strikethroughThickness = i1763[16]
  i1762.TabWidth = i1763[17]
  i1762.Padding = i1763[18]
  i1762.AtlasWidth = i1763[19]
  i1762.AtlasHeight = i1763[20]
  return i1762
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1766 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1767 = data
  i1766.id = i1767[0]
  i1766.x = i1767[1]
  i1766.y = i1767[2]
  i1766.width = i1767[3]
  i1766.height = i1767[4]
  i1766.xOffset = i1767[5]
  i1766.yOffset = i1767[6]
  i1766.xAdvance = i1767[7]
  i1766.scale = i1767[8]
  return i1766
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1768 = root || request.c( 'TMPro.KerningTable' )
  var i1769 = data
  var i1771 = i1769[0]
  var i1770 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1771.length; i += 1) {
    i1770.add(request.d('TMPro.KerningPair', i1771[i + 0]));
  }
  i1768.kerningPairs = i1770
  return i1768
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1774 = root || request.c( 'TMPro.KerningPair' )
  var i1775 = data
  i1774.xOffset = i1775[0]
  i1774.m_FirstGlyph = i1775[1]
  i1774.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1775[2], i1774.m_FirstGlyphAdjustments)
  i1774.m_SecondGlyph = i1775[3]
  i1774.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1775[4], i1774.m_SecondGlyphAdjustments)
  i1774.m_IgnoreSpacingAdjustments = !!i1775[5]
  return i1774
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1776 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1777 = data
  i1776.m_FaceIndex = i1777[0]
  i1776.m_FamilyName = i1777[1]
  i1776.m_StyleName = i1777[2]
  i1776.m_PointSize = i1777[3]
  i1776.m_Scale = i1777[4]
  i1776.m_UnitsPerEM = i1777[5]
  i1776.m_LineHeight = i1777[6]
  i1776.m_AscentLine = i1777[7]
  i1776.m_CapLine = i1777[8]
  i1776.m_MeanLine = i1777[9]
  i1776.m_Baseline = i1777[10]
  i1776.m_DescentLine = i1777[11]
  i1776.m_SuperscriptOffset = i1777[12]
  i1776.m_SuperscriptSize = i1777[13]
  i1776.m_SubscriptOffset = i1777[14]
  i1776.m_SubscriptSize = i1777[15]
  i1776.m_UnderlineOffset = i1777[16]
  i1776.m_UnderlineThickness = i1777[17]
  i1776.m_StrikethroughOffset = i1777[18]
  i1776.m_StrikethroughThickness = i1777[19]
  i1776.m_TabWidth = i1777[20]
  return i1776
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1778 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1779 = data
  request.r(i1779[0], i1779[1], 0, i1778, 'spriteSheet')
  var i1781 = i1779[2]
  var i1780 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1781.length; i += 1) {
    i1780.add(request.d('TMPro.TMP_Sprite', i1781[i + 0]));
  }
  i1778.spriteInfoList = i1780
  var i1783 = i1779[3]
  var i1782 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1783.length; i += 2) {
  request.r(i1783[i + 0], i1783[i + 1], 1, i1782, '')
  }
  i1778.fallbackSpriteAssets = i1782
  var i1785 = i1779[4]
  var i1784 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1785.length; i += 1) {
    i1784.add(request.d('TMPro.TMP_SpriteCharacter', i1785[i + 0]));
  }
  i1778.m_SpriteCharacterTable = i1784
  var i1787 = i1779[5]
  var i1786 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1787.length; i += 1) {
    i1786.add(request.d('TMPro.TMP_SpriteGlyph', i1787[i + 0]));
  }
  i1778.m_GlyphTable = i1786
  i1778.m_Version = i1779[6]
  i1778.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1779[7], i1778.m_FaceInfo)
  request.r(i1779[8], i1779[9], 0, i1778, 'm_Material')
  return i1778
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1790 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1791 = data
  i1790.name = i1791[0]
  i1790.hashCode = i1791[1]
  i1790.unicode = i1791[2]
  i1790.pivot = new pc.Vec2( i1791[3], i1791[4] )
  request.r(i1791[5], i1791[6], 0, i1790, 'sprite')
  i1790.id = i1791[7]
  i1790.x = i1791[8]
  i1790.y = i1791[9]
  i1790.width = i1791[10]
  i1790.height = i1791[11]
  i1790.xOffset = i1791[12]
  i1790.yOffset = i1791[13]
  i1790.xAdvance = i1791[14]
  i1790.scale = i1791[15]
  return i1790
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1796 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1797 = data
  i1796.m_Name = i1797[0]
  i1796.m_ElementType = i1797[1]
  i1796.m_Unicode = i1797[2]
  i1796.m_GlyphIndex = i1797[3]
  i1796.m_Scale = i1797[4]
  return i1796
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1800 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1801 = data
  request.r(i1801[0], i1801[1], 0, i1800, 'sprite')
  i1800.m_Index = i1801[2]
  i1800.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1801[3], i1800.m_Metrics)
  i1800.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1801[4], i1800.m_GlyphRect)
  i1800.m_Scale = i1801[5]
  i1800.m_AtlasIndex = i1801[6]
  i1800.m_ClassDefinitionType = i1801[7]
  return i1800
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1802 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1803 = data
  var i1805 = i1803[0]
  var i1804 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1805.length; i += 1) {
    i1804.add(request.d('TMPro.TMP_Style', i1805[i + 0]));
  }
  i1802.m_StyleList = i1804
  return i1802
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1808 = root || request.c( 'TMPro.TMP_Style' )
  var i1809 = data
  i1808.m_Name = i1809[0]
  i1808.m_HashCode = i1809[1]
  i1808.m_OpeningDefinition = i1809[2]
  i1808.m_ClosingDefinition = i1809[3]
  i1808.m_OpeningTagArray = i1809[4]
  i1808.m_ClosingTagArray = i1809[5]
  return i1808
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1810 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1811 = data
  var i1813 = i1811[0]
  var i1812 = []
  for(var i = 0; i < i1813.length; i += 1) {
    i1812.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1813[i + 0]) );
  }
  i1810.files = i1812
  i1810.componentToPrefabIds = i1811[1]
  return i1810
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1816 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1817 = data
  i1816.path = i1817[0]
  request.r(i1817[1], i1817[2], 0, i1816, 'unityObject')
  return i1816
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1818 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1819 = data
  var i1821 = i1819[0]
  var i1820 = []
  for(var i = 0; i < i1821.length; i += 1) {
    i1820.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1821[i + 0]) );
  }
  i1818.scriptsExecutionOrder = i1820
  var i1823 = i1819[1]
  var i1822 = []
  for(var i = 0; i < i1823.length; i += 1) {
    i1822.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1823[i + 0]) );
  }
  i1818.sortingLayers = i1822
  var i1825 = i1819[2]
  var i1824 = []
  for(var i = 0; i < i1825.length; i += 1) {
    i1824.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1825[i + 0]) );
  }
  i1818.cullingLayers = i1824
  i1818.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1819[3], i1818.timeSettings)
  i1818.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1819[4], i1818.physicsSettings)
  i1818.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1819[5], i1818.physics2DSettings)
  i1818.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1819[6], i1818.qualitySettings)
  i1818.enableRealtimeShadows = !!i1819[7]
  i1818.enableAutoInstancing = !!i1819[8]
  i1818.enableStaticBatching = !!i1819[9]
  i1818.enableDynamicBatching = !!i1819[10]
  i1818.usePreservativeDynamicBatching = !!i1819[11]
  i1818.lightmapEncodingQuality = i1819[12]
  i1818.desiredColorSpace = i1819[13]
  var i1827 = i1819[14]
  var i1826 = []
  for(var i = 0; i < i1827.length; i += 1) {
    i1826.push( i1827[i + 0] );
  }
  i1818.allTags = i1826
  return i1818
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1831 = data
  i1830.name = i1831[0]
  i1830.value = i1831[1]
  return i1830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1835 = data
  i1834.id = i1835[0]
  i1834.name = i1835[1]
  i1834.value = i1835[2]
  return i1834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1839 = data
  i1838.id = i1839[0]
  i1838.name = i1839[1]
  return i1838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1840 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1841 = data
  i1840.fixedDeltaTime = i1841[0]
  i1840.maximumDeltaTime = i1841[1]
  i1840.timeScale = i1841[2]
  i1840.maximumParticleTimestep = i1841[3]
  return i1840
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1842 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1843 = data
  i1842.gravity = new pc.Vec3( i1843[0], i1843[1], i1843[2] )
  i1842.defaultSolverIterations = i1843[3]
  i1842.bounceThreshold = i1843[4]
  i1842.autoSyncTransforms = !!i1843[5]
  i1842.autoSimulation = !!i1843[6]
  var i1845 = i1843[7]
  var i1844 = []
  for(var i = 0; i < i1845.length; i += 1) {
    i1844.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1845[i + 0]) );
  }
  i1842.collisionMatrix = i1844
  return i1842
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1848 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1849 = data
  i1848.enabled = !!i1849[0]
  i1848.layerId = i1849[1]
  i1848.otherLayerId = i1849[2]
  return i1848
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1850 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1851 = data
  request.r(i1851[0], i1851[1], 0, i1850, 'material')
  i1850.gravity = new pc.Vec2( i1851[2], i1851[3] )
  i1850.positionIterations = i1851[4]
  i1850.velocityIterations = i1851[5]
  i1850.velocityThreshold = i1851[6]
  i1850.maxLinearCorrection = i1851[7]
  i1850.maxAngularCorrection = i1851[8]
  i1850.maxTranslationSpeed = i1851[9]
  i1850.maxRotationSpeed = i1851[10]
  i1850.baumgarteScale = i1851[11]
  i1850.baumgarteTOIScale = i1851[12]
  i1850.timeToSleep = i1851[13]
  i1850.linearSleepTolerance = i1851[14]
  i1850.angularSleepTolerance = i1851[15]
  i1850.defaultContactOffset = i1851[16]
  i1850.autoSimulation = !!i1851[17]
  i1850.queriesHitTriggers = !!i1851[18]
  i1850.queriesStartInColliders = !!i1851[19]
  i1850.callbacksOnDisable = !!i1851[20]
  i1850.reuseCollisionCallbacks = !!i1851[21]
  i1850.autoSyncTransforms = !!i1851[22]
  var i1853 = i1851[23]
  var i1852 = []
  for(var i = 0; i < i1853.length; i += 1) {
    i1852.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1853[i + 0]) );
  }
  i1850.collisionMatrix = i1852
  return i1850
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1856 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1857 = data
  i1856.enabled = !!i1857[0]
  i1856.layerId = i1857[1]
  i1856.otherLayerId = i1857[2]
  return i1856
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1858 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1859 = data
  var i1861 = i1859[0]
  var i1860 = []
  for(var i = 0; i < i1861.length; i += 1) {
    i1860.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1861[i + 0]) );
  }
  i1858.qualityLevels = i1860
  var i1863 = i1859[1]
  var i1862 = []
  for(var i = 0; i < i1863.length; i += 1) {
    i1862.push( i1863[i + 0] );
  }
  i1858.names = i1862
  i1858.shadows = i1859[2]
  i1858.anisotropicFiltering = i1859[3]
  i1858.antiAliasing = i1859[4]
  i1858.lodBias = i1859[5]
  i1858.shadowCascades = i1859[6]
  i1858.shadowDistance = i1859[7]
  i1858.shadowmaskMode = i1859[8]
  i1858.shadowProjection = i1859[9]
  i1858.shadowResolution = i1859[10]
  i1858.softParticles = !!i1859[11]
  i1858.softVegetation = !!i1859[12]
  i1858.activeColorSpace = i1859[13]
  i1858.desiredColorSpace = i1859[14]
  i1858.masterTextureLimit = i1859[15]
  i1858.maxQueuedFrames = i1859[16]
  i1858.particleRaycastBudget = i1859[17]
  i1858.pixelLightCount = i1859[18]
  i1858.realtimeReflectionProbes = !!i1859[19]
  i1858.shadowCascade2Split = i1859[20]
  i1858.shadowCascade4Split = new pc.Vec3( i1859[21], i1859[22], i1859[23] )
  i1858.streamingMipmapsActive = !!i1859[24]
  i1858.vSyncCount = i1859[25]
  i1858.asyncUploadBufferSize = i1859[26]
  i1858.asyncUploadTimeSlice = i1859[27]
  i1858.billboardsFaceCameraPosition = !!i1859[28]
  i1858.shadowNearPlaneOffset = i1859[29]
  i1858.streamingMipmapsMemoryBudget = i1859[30]
  i1858.maximumLODLevel = i1859[31]
  i1858.streamingMipmapsAddAllCameras = !!i1859[32]
  i1858.streamingMipmapsMaxLevelReduction = i1859[33]
  i1858.streamingMipmapsRenderersPerFrame = i1859[34]
  i1858.resolutionScalingFixedDPIFactor = i1859[35]
  i1858.streamingMipmapsMaxFileIORequests = i1859[36]
  i1858.currentQualityLevel = i1859[37]
  return i1858
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1866 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1867 = data
  i1866.m_XCoordinate = i1867[0]
  i1866.m_YCoordinate = i1867[1]
  return i1866
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1868 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1869 = data
  i1868.m_XPositionAdjustment = i1869[0]
  i1868.m_YPositionAdjustment = i1869[1]
  return i1868
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1870 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1871 = data
  i1870.xPlacement = i1871[0]
  i1870.yPlacement = i1871[1]
  i1870.xAdvance = i1871[2]
  i1870.yAdvance = i1871[3]
  return i1870
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"32":[33],"34":[33],"35":[33],"36":[33],"37":[33],"38":[33],"39":[19],"40":[1],"41":[42],"43":[42],"44":[42],"45":[42],"46":[42],"47":[42],"48":[49],"50":[49],"51":[49],"52":[49],"53":[49],"54":[49],"55":[49],"56":[49],"57":[49],"58":[49],"59":[49],"60":[49],"61":[49],"62":[1],"16":[15],"63":[64],"65":[64],"66":[9],"67":[68],"69":[5],"70":[5],"71":[9],"72":[15,9],"73":[9,10],"74":[9],"75":[10,9],"76":[15],"77":[10,9],"78":[9],"79":[9],"80":[9],"81":[66],"82":[10,9],"83":[9],"84":[66],"85":[9],"86":[9],"87":[9],"88":[9],"89":[9],"90":[9],"91":[9],"92":[9],"93":[9],"94":[10,9],"95":[9],"96":[9],"97":[9],"98":[9],"12":[10,9],"99":[9],"100":[101],"102":[101],"103":[101],"104":[101],"105":[1],"106":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","MobControlAd.MobControlGame","UnityEngine.Light","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AnimationClip","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

Deserializers.unityVersion = "6000.0.51f1";

Deserializers.productName = "Jelly Puzzle Playable";

Deserializers.lunaInitializationTime = "11/20/2026 14:21:11";

Deserializers.lunaDaysRunning = "1.3";

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1693";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4609";

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

Deserializers.buildID = "07ca1dd0-cf1d-4aa1-a722-813a1fb65684";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

