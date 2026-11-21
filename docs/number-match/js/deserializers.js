var Deserializers = {}
Deserializers["UnityEngine.JointSpring"] = function (request, data, root) {
  var i1402 = root || request.c( 'UnityEngine.JointSpring' )
  var i1403 = data
  i1402.spring = i1403[0]
  i1402.damper = i1403[1]
  i1402.targetPosition = i1403[2]
  return i1402
}

Deserializers["UnityEngine.JointMotor"] = function (request, data, root) {
  var i1404 = root || request.c( 'UnityEngine.JointMotor' )
  var i1405 = data
  i1404.m_TargetVelocity = i1405[0]
  i1404.m_Force = i1405[1]
  i1404.m_FreeSpin = i1405[2]
  return i1404
}

Deserializers["UnityEngine.JointLimits"] = function (request, data, root) {
  var i1406 = root || request.c( 'UnityEngine.JointLimits' )
  var i1407 = data
  i1406.m_Min = i1407[0]
  i1406.m_Max = i1407[1]
  i1406.m_Bounciness = i1407[2]
  i1406.m_BounceMinVelocity = i1407[3]
  i1406.m_ContactDistance = i1407[4]
  i1406.minBounce = i1407[5]
  i1406.maxBounce = i1407[6]
  return i1406
}

Deserializers["UnityEngine.JointDrive"] = function (request, data, root) {
  var i1408 = root || request.c( 'UnityEngine.JointDrive' )
  var i1409 = data
  i1408.m_PositionSpring = i1409[0]
  i1408.m_PositionDamper = i1409[1]
  i1408.m_MaximumForce = i1409[2]
  i1408.m_UseAcceleration = i1409[3]
  return i1408
}

Deserializers["UnityEngine.SoftJointLimitSpring"] = function (request, data, root) {
  var i1410 = root || request.c( 'UnityEngine.SoftJointLimitSpring' )
  var i1411 = data
  i1410.m_Spring = i1411[0]
  i1410.m_Damper = i1411[1]
  return i1410
}

Deserializers["UnityEngine.SoftJointLimit"] = function (request, data, root) {
  var i1412 = root || request.c( 'UnityEngine.SoftJointLimit' )
  var i1413 = data
  i1412.m_Limit = i1413[0]
  i1412.m_Bounciness = i1413[1]
  i1412.m_ContactDistance = i1413[2]
  return i1412
}

Deserializers["UnityEngine.WheelFrictionCurve"] = function (request, data, root) {
  var i1414 = root || request.c( 'UnityEngine.WheelFrictionCurve' )
  var i1415 = data
  i1414.m_ExtremumSlip = i1415[0]
  i1414.m_ExtremumValue = i1415[1]
  i1414.m_AsymptoteSlip = i1415[2]
  i1414.m_AsymptoteValue = i1415[3]
  i1414.m_Stiffness = i1415[4]
  return i1414
}

Deserializers["UnityEngine.JointAngleLimits2D"] = function (request, data, root) {
  var i1416 = root || request.c( 'UnityEngine.JointAngleLimits2D' )
  var i1417 = data
  i1416.m_LowerAngle = i1417[0]
  i1416.m_UpperAngle = i1417[1]
  return i1416
}

Deserializers["UnityEngine.JointMotor2D"] = function (request, data, root) {
  var i1418 = root || request.c( 'UnityEngine.JointMotor2D' )
  var i1419 = data
  i1418.m_MotorSpeed = i1419[0]
  i1418.m_MaximumMotorTorque = i1419[1]
  return i1418
}

Deserializers["UnityEngine.JointSuspension2D"] = function (request, data, root) {
  var i1420 = root || request.c( 'UnityEngine.JointSuspension2D' )
  var i1421 = data
  i1420.m_DampingRatio = i1421[0]
  i1420.m_Frequency = i1421[1]
  i1420.m_Angle = i1421[2]
  return i1420
}

Deserializers["UnityEngine.JointTranslationLimits2D"] = function (request, data, root) {
  var i1422 = root || request.c( 'UnityEngine.JointTranslationLimits2D' )
  var i1423 = data
  i1422.m_LowerTranslation = i1423[0]
  i1422.m_UpperTranslation = i1423[1]
  return i1422
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material"] = function (request, data, root) {
  var i1424 = root || new pc.UnityMaterial()
  var i1425 = data
  i1424.name = i1425[0]
  request.r(i1425[1], i1425[2], 0, i1424, 'shader')
  i1424.renderQueue = i1425[3]
  i1424.enableInstancing = !!i1425[4]
  var i1427 = i1425[5]
  var i1426 = []
  for(var i = 0; i < i1427.length; i += 1) {
    i1426.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter', i1427[i + 0]) );
  }
  i1424.floatParameters = i1426
  var i1429 = i1425[6]
  var i1428 = []
  for(var i = 0; i < i1429.length; i += 1) {
    i1428.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter', i1429[i + 0]) );
  }
  i1424.colorParameters = i1428
  var i1431 = i1425[7]
  var i1430 = []
  for(var i = 0; i < i1431.length; i += 1) {
    i1430.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter', i1431[i + 0]) );
  }
  i1424.vectorParameters = i1430
  var i1433 = i1425[8]
  var i1432 = []
  for(var i = 0; i < i1433.length; i += 1) {
    i1432.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter', i1433[i + 0]) );
  }
  i1424.textureParameters = i1432
  var i1435 = i1425[9]
  var i1434 = []
  for(var i = 0; i < i1435.length; i += 1) {
    i1434.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag', i1435[i + 0]) );
  }
  i1424.materialFlags = i1434
  return i1424
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter"] = function (request, data, root) {
  var i1438 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter' )
  var i1439 = data
  i1438.name = i1439[0]
  i1438.value = i1439[1]
  return i1438
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter"] = function (request, data, root) {
  var i1442 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter' )
  var i1443 = data
  i1442.name = i1443[0]
  i1442.value = new pc.Color(i1443[1], i1443[2], i1443[3], i1443[4])
  return i1442
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter"] = function (request, data, root) {
  var i1446 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter' )
  var i1447 = data
  i1446.name = i1447[0]
  i1446.value = new pc.Vec4( i1447[1], i1447[2], i1447[3], i1447[4] )
  return i1446
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter"] = function (request, data, root) {
  var i1450 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter' )
  var i1451 = data
  i1450.name = i1451[0]
  request.r(i1451[1], i1451[2], 0, i1450, 'value')
  return i1450
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag"] = function (request, data, root) {
  var i1454 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag' )
  var i1455 = data
  i1454.name = i1455[0]
  i1454.enabled = !!i1455[1]
  return i1454
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Texture2D"] = function (request, data, root) {
  var i1456 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Texture2D' )
  var i1457 = data
  i1456.name = i1457[0]
  i1456.width = i1457[1]
  i1456.height = i1457[2]
  i1456.mipmapCount = i1457[3]
  i1456.anisoLevel = i1457[4]
  i1456.filterMode = i1457[5]
  i1456.hdr = !!i1457[6]
  i1456.format = i1457[7]
  i1456.wrapMode = i1457[8]
  i1456.alphaIsTransparency = !!i1457[9]
  i1456.alphaSource = i1457[10]
  i1456.graphicsFormat = i1457[11]
  i1456.sRGBTexture = !!i1457[12]
  i1456.desiredColorSpace = i1457[13]
  i1456.wrapU = i1457[14]
  i1456.wrapV = i1457[15]
  return i1456
}

Deserializers["Luna.Unity.DTO.UnityEngine.Textures.Cubemap"] = function (request, data, root) {
  var i1458 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Textures.Cubemap' )
  var i1459 = data
  i1458.name = i1459[0]
  i1458.atlasId = i1459[1]
  i1458.mipmapCount = i1459[2]
  i1458.hdr = !!i1459[3]
  i1458.size = i1459[4]
  i1458.anisoLevel = i1459[5]
  i1458.filterMode = i1459[6]
  var i1461 = i1459[7]
  var i1460 = []
  for(var i = 0; i < i1461.length; i += 4) {
    i1460.push( UnityEngine.Rect.MinMaxRect(i1461[i + 0], i1461[i + 1], i1461[i + 2], i1461[i + 3]) );
  }
  i1458.rects = i1460
  i1458.wrapU = i1459[8]
  i1458.wrapV = i1459[9]
  return i1458
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.Scene"] = function (request, data, root) {
  var i1464 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.Scene' )
  var i1465 = data
  i1464.name = i1465[0]
  i1464.index = i1465[1]
  i1464.startup = !!i1465[2]
  return i1464
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Camera"] = function (request, data, root) {
  var i1466 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Camera' )
  var i1467 = data
  i1466.aspect = i1467[0]
  i1466.orthographic = !!i1467[1]
  i1466.orthographicSize = i1467[2]
  i1466.backgroundColor = new pc.Color(i1467[3], i1467[4], i1467[5], i1467[6])
  i1466.nearClipPlane = i1467[7]
  i1466.farClipPlane = i1467[8]
  i1466.fieldOfView = i1467[9]
  i1466.depth = i1467[10]
  i1466.clearFlags = i1467[11]
  i1466.cullingMask = i1467[12]
  i1466.rect = i1467[13]
  request.r(i1467[14], i1467[15], 0, i1466, 'targetTexture')
  i1466.usePhysicalProperties = !!i1467[16]
  i1466.focalLength = i1467[17]
  i1466.sensorSize = new pc.Vec2( i1467[18], i1467[19] )
  i1466.lensShift = new pc.Vec2( i1467[20], i1467[21] )
  i1466.gateFit = i1467[22]
  i1466.commandBufferCount = i1467[23]
  i1466.cameraType = i1467[24]
  i1466.enabled = !!i1467[25]
  return i1466
}

Deserializers["Luna.Unity.DTO.UnityEngine.Scene.GameObject"] = function (request, data, root) {
  var i1468 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Scene.GameObject' )
  var i1469 = data
  i1468.name = i1469[0]
  i1468.tagId = i1469[1]
  i1468.enabled = !!i1469[2]
  i1468.isStatic = !!i1469[3]
  i1468.layer = i1469[4]
  return i1468
}

Deserializers["NumberMatchAd.NumberMatchGame"] = function (request, data, root) {
  var i1470 = root || request.c( 'NumberMatchAd.NumberMatchGame' )
  var i1471 = data
  request.r(i1471[0], i1471[1], 0, i1470, 'sourceImage')
  i1470.gridSize = i1471[2]
  i1470.colorTolerance = i1471[3]
  i1470.missingPerGroup = i1471[4]
  i1470.gameTitle = i1471[5]
  i1470.introBanner = i1471[6]
  i1470.endcardTitle = i1471[7]
  i1470.ctaText = i1471[8]
  i1470.storeUrl = i1471[9]
  i1470.endcardAfterSeconds = i1471[10]
  i1470.nearMissEnding = !!i1471[11]
  i1470.showTutorial = !!i1471[12]
  i1470.autoPlay = !!i1471[13]
  i1470.autoMoveInterval = i1471[14]
  i1470.autoPlayOneMistake = !!i1471[15]
  i1470.randomSeed = i1471[16]
  return i1470
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings"] = function (request, data, root) {
  var i1472 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings' )
  var i1473 = data
  i1472.ambientIntensity = i1473[0]
  i1472.reflectionIntensity = i1473[1]
  i1472.ambientMode = i1473[2]
  i1472.ambientLight = new pc.Color(i1473[3], i1473[4], i1473[5], i1473[6])
  i1472.ambientSkyColor = new pc.Color(i1473[7], i1473[8], i1473[9], i1473[10])
  i1472.ambientGroundColor = new pc.Color(i1473[11], i1473[12], i1473[13], i1473[14])
  i1472.ambientEquatorColor = new pc.Color(i1473[15], i1473[16], i1473[17], i1473[18])
  i1472.fogColor = new pc.Color(i1473[19], i1473[20], i1473[21], i1473[22])
  i1472.fogEndDistance = i1473[23]
  i1472.fogStartDistance = i1473[24]
  i1472.fogDensity = i1473[25]
  i1472.fog = !!i1473[26]
  request.r(i1473[27], i1473[28], 0, i1472, 'skybox')
  i1472.fogMode = i1473[29]
  var i1475 = i1473[30]
  var i1474 = []
  for(var i = 0; i < i1475.length; i += 1) {
    i1474.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap', i1475[i + 0]) );
  }
  i1472.lightmaps = i1474
  i1472.lightProbes = request.d('Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes', i1473[31], i1472.lightProbes)
  i1472.lightmapsMode = i1473[32]
  i1472.mixedBakeMode = i1473[33]
  i1472.environmentLightingMode = i1473[34]
  i1472.ambientProbe = new pc.SphericalHarmonicsL2(i1473[35])
  request.r(i1473[36], i1473[37], 0, i1472, 'customReflection')
  request.r(i1473[38], i1473[39], 0, i1472, 'defaultReflection')
  i1472.defaultReflectionMode = i1473[40]
  i1472.defaultReflectionResolution = i1473[41]
  i1472.sunLightObjectId = i1473[42]
  i1472.pixelLightCount = i1473[43]
  i1472.defaultReflectionHDR = !!i1473[44]
  i1472.hasLightDataAsset = !!i1473[45]
  i1472.hasManualGenerate = !!i1473[46]
  return i1472
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap"] = function (request, data, root) {
  var i1478 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap' )
  var i1479 = data
  request.r(i1479[0], i1479[1], 0, i1478, 'lightmapColor')
  request.r(i1479[2], i1479[3], 0, i1478, 'lightmapDirection')
  request.r(i1479[4], i1479[5], 0, i1478, 'shadowMask')
  return i1478
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes"] = function (request, data, root) {
  var i1480 = root || new UnityEngine.LightProbes()
  var i1481 = data
  return i1480
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.RectTransform"] = function (request, data, root) {
  var i1488 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.RectTransform' )
  var i1489 = data
  i1488.pivot = new pc.Vec2( i1489[0], i1489[1] )
  i1488.anchorMin = new pc.Vec2( i1489[2], i1489[3] )
  i1488.anchorMax = new pc.Vec2( i1489[4], i1489[5] )
  i1488.sizeDelta = new pc.Vec2( i1489[6], i1489[7] )
  i1488.anchoredPosition3D = new pc.Vec3( i1489[8], i1489[9], i1489[10] )
  i1488.rotation = new pc.Quat(i1489[11], i1489[12], i1489[13], i1489[14])
  i1488.scale = new pc.Vec3( i1489[15], i1489[16], i1489[17] )
  return i1488
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer"] = function (request, data, root) {
  var i1490 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer' )
  var i1491 = data
  i1490.cullTransparentMesh = !!i1491[0]
  return i1490
}

Deserializers["UnityEngine.UI.Text"] = function (request, data, root) {
  var i1492 = root || request.c( 'UnityEngine.UI.Text' )
  var i1493 = data
  i1492.m_FontData = request.d('UnityEngine.UI.FontData', i1493[0], i1492.m_FontData)
  i1492.m_Text = i1493[1]
  request.r(i1493[2], i1493[3], 0, i1492, 'm_Material')
  i1492.m_Maskable = !!i1493[4]
  i1492.m_Color = new pc.Color(i1493[5], i1493[6], i1493[7], i1493[8])
  i1492.m_RaycastTarget = !!i1493[9]
  i1492.m_RaycastPadding = new pc.Vec4( i1493[10], i1493[11], i1493[12], i1493[13] )
  return i1492
}

Deserializers["UnityEngine.UI.FontData"] = function (request, data, root) {
  var i1494 = root || request.c( 'UnityEngine.UI.FontData' )
  var i1495 = data
  request.r(i1495[0], i1495[1], 0, i1494, 'm_Font')
  i1494.m_FontSize = i1495[2]
  i1494.m_FontStyle = i1495[3]
  i1494.m_BestFit = !!i1495[4]
  i1494.m_MinSize = i1495[5]
  i1494.m_MaxSize = i1495[6]
  i1494.m_Alignment = i1495[7]
  i1494.m_AlignByGeometry = !!i1495[8]
  i1494.m_RichText = !!i1495[9]
  i1494.m_HorizontalOverflow = i1495[10]
  i1494.m_VerticalOverflow = i1495[11]
  i1494.m_LineSpacing = i1495[12]
  return i1494
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.Transform"] = function (request, data, root) {
  var i1496 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.Transform' )
  var i1497 = data
  i1496.position = new pc.Vec3( i1497[0], i1497[1], i1497[2] )
  i1496.scale = new pc.Vec3( i1497[3], i1497[4], i1497[5] )
  i1496.rotation = new pc.Quat(i1497[6], i1497[7], i1497[8], i1497[9])
  return i1496
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshRenderer"] = function (request, data, root) {
  var i1498 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshRenderer' )
  var i1499 = data
  request.r(i1499[0], i1499[1], 0, i1498, 'additionalVertexStreams')
  i1498.enabled = !!i1499[2]
  request.r(i1499[3], i1499[4], 0, i1498, 'sharedMaterial')
  var i1501 = i1499[5]
  var i1500 = []
  for(var i = 0; i < i1501.length; i += 2) {
  request.r(i1501[i + 0], i1501[i + 1], 2, i1500, '')
  }
  i1498.sharedMaterials = i1500
  i1498.receiveShadows = !!i1499[6]
  i1498.shadowCastingMode = i1499[7]
  i1498.sortingLayerID = i1499[8]
  i1498.sortingOrder = i1499[9]
  i1498.lightmapIndex = i1499[10]
  i1498.lightmapSceneIndex = i1499[11]
  i1498.lightmapScaleOffset = new pc.Vec4( i1499[12], i1499[13], i1499[14], i1499[15] )
  i1498.lightProbeUsage = i1499[16]
  i1498.reflectionProbeUsage = i1499[17]
  return i1498
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.TextMesh"] = function (request, data, root) {
  var i1504 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.TextMesh' )
  var i1505 = data
  i1504.m_Alignment = i1505[0]
  i1504.m_Anchor = i1505[1]
  i1504.m_CharacterSize = i1505[2]
  request.r(i1505[3], i1505[4], 0, i1504, 'm_Font')
  i1504.m_FontSize = i1505[5]
  i1504.m_FontStyle = i1505[6]
  i1504.m_LineSpacing = i1505[7]
  i1504.m_OffsetZ = i1505[8]
  i1504.m_RichText = !!i1505[9]
  i1504.m_TabSize = i1505[10]
  i1504.m_Text = i1505[11]
  return i1504
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshFilter"] = function (request, data, root) {
  var i1506 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshFilter' )
  var i1507 = data
  request.r(i1507[0], i1507[1], 0, i1506, 'sharedMesh')
  return i1506
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh"] = function (request, data, root) {
  var i1508 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh' )
  var i1509 = data
  i1508.name = i1509[0]
  i1508.halfPrecision = !!i1509[1]
  i1508.useSimplification = !!i1509[2]
  i1508.useUInt32IndexFormat = !!i1509[3]
  i1508.vertexCount = i1509[4]
  i1508.aabb = i1509[5]
  var i1511 = i1509[6]
  var i1510 = []
  for(var i = 0; i < i1511.length; i += 1) {
    i1510.push( !!i1511[i + 0] );
  }
  i1508.streams = i1510
  i1508.vertices = i1509[7]
  var i1513 = i1509[8]
  var i1512 = []
  for(var i = 0; i < i1513.length; i += 1) {
    i1512.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh', i1513[i + 0]) );
  }
  i1508.subMeshes = i1512
  var i1515 = i1509[9]
  var i1514 = []
  for(var i = 0; i < i1515.length; i += 16) {
    i1514.push( new pc.Mat4().setData(i1515[i + 0], i1515[i + 1], i1515[i + 2], i1515[i + 3],  i1515[i + 4], i1515[i + 5], i1515[i + 6], i1515[i + 7],  i1515[i + 8], i1515[i + 9], i1515[i + 10], i1515[i + 11],  i1515[i + 12], i1515[i + 13], i1515[i + 14], i1515[i + 15]) );
  }
  i1508.bindposes = i1514
  var i1517 = i1509[10]
  var i1516 = []
  for(var i = 0; i < i1517.length; i += 1) {
    i1516.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape', i1517[i + 0]) );
  }
  i1508.blendShapes = i1516
  return i1508
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh"] = function (request, data, root) {
  var i1522 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh' )
  var i1523 = data
  i1522.triangles = i1523[0]
  return i1522
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape"] = function (request, data, root) {
  var i1528 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape' )
  var i1529 = data
  i1528.name = i1529[0]
  var i1531 = i1529[1]
  var i1530 = []
  for(var i = 0; i < i1531.length; i += 1) {
    i1530.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame', i1531[i + 0]) );
  }
  i1528.frames = i1530
  return i1528
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer"] = function (request, data, root) {
  var i1532 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer' )
  var i1533 = data
  request.r(i1533[0], i1533[1], 0, i1532, 'sharedMesh')
  var i1535 = i1533[2]
  var i1534 = []
  for(var i = 0; i < i1535.length; i += 2) {
  request.r(i1535[i + 0], i1535[i + 1], 2, i1534, '')
  }
  i1532.bones = i1534
  i1532.updateWhenOffscreen = !!i1533[3]
  i1532.localBounds = i1533[4]
  request.r(i1533[5], i1533[6], 0, i1532, 'rootBone')
  var i1537 = i1533[7]
  var i1536 = []
  for(var i = 0; i < i1537.length; i += 1) {
    i1536.push( request.d('Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight', i1537[i + 0]) );
  }
  i1532.blendShapesWeights = i1536
  i1532.enabled = !!i1533[8]
  request.r(i1533[9], i1533[10], 0, i1532, 'sharedMaterial')
  var i1539 = i1533[11]
  var i1538 = []
  for(var i = 0; i < i1539.length; i += 2) {
  request.r(i1539[i + 0], i1539[i + 1], 2, i1538, '')
  }
  i1532.sharedMaterials = i1538
  i1532.receiveShadows = !!i1533[12]
  i1532.shadowCastingMode = i1533[13]
  i1532.sortingLayerID = i1533[14]
  i1532.sortingOrder = i1533[15]
  i1532.lightmapIndex = i1533[16]
  i1532.lightmapSceneIndex = i1533[17]
  i1532.lightmapScaleOffset = new pc.Vec4( i1533[18], i1533[19], i1533[20], i1533[21] )
  i1532.lightProbeUsage = i1533[22]
  i1532.reflectionProbeUsage = i1533[23]
  return i1532
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight"] = function (request, data, root) {
  var i1544 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight' )
  var i1545 = data
  i1544.weight = i1545[0]
  return i1544
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame"] = function (request, data, root) {
  var i1548 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame' )
  var i1549 = data
  i1548.weight = i1549[0]
  i1548.vertices = i1549[1]
  i1548.normals = i1549[2]
  i1548.tangents = i1549[3]
  return i1548
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.SphereCollider"] = function (request, data, root) {
  var i1550 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.SphereCollider' )
  var i1551 = data
  i1550.center = new pc.Vec3( i1551[0], i1551[1], i1551[2] )
  i1550.radius = i1551[3]
  i1550.enabled = !!i1551[4]
  i1550.isTrigger = !!i1551[5]
  request.r(i1551[6], i1551[7], 0, i1550, 'material')
  return i1550
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider"] = function (request, data, root) {
  var i1552 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider' )
  var i1553 = data
  i1552.center = new pc.Vec3( i1553[0], i1553[1], i1553[2] )
  i1552.radius = i1553[3]
  i1552.height = i1553[4]
  i1552.direction = i1553[5]
  i1552.enabled = !!i1553[6]
  i1552.isTrigger = !!i1553[7]
  request.r(i1553[8], i1553[9], 0, i1552, 'material')
  return i1552
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.BoxCollider"] = function (request, data, root) {
  var i1554 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.BoxCollider' )
  var i1555 = data
  i1554.center = new pc.Vec3( i1555[0], i1555[1], i1555[2] )
  i1554.size = new pc.Vec3( i1555[3], i1555[4], i1555[5] )
  i1554.enabled = !!i1555[6]
  i1554.isTrigger = !!i1555[7]
  request.r(i1555[8], i1555[9], 0, i1554, 'material')
  return i1554
}

Deserializers["Luna.Unity.DTO.UnityEngine.Components.MeshCollider"] = function (request, data, root) {
  var i1556 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Components.MeshCollider' )
  var i1557 = data
  request.r(i1557[0], i1557[1], 0, i1556, 'sharedMesh')
  i1556.convex = !!i1557[2]
  i1556.enabled = !!i1557[3]
  i1556.isTrigger = !!i1557[4]
  request.r(i1557[5], i1557[6], 0, i1556, 'material')
  return i1556
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader"] = function (request, data, root) {
  var i1558 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader' )
  var i1559 = data
  var i1561 = i1559[0]
  var i1560 = new (System.Collections.Generic.List$1(Bridge.ns('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError')))
  for(var i = 0; i < i1561.length; i += 1) {
    i1560.add(request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError', i1561[i + 0]));
  }
  i1558.ShaderCompilationErrors = i1560
  i1558.name = i1559[1]
  i1558.guid = i1559[2]
  var i1563 = i1559[3]
  var i1562 = []
  for(var i = 0; i < i1563.length; i += 1) {
    i1562.push( i1563[i + 0] );
  }
  i1558.shaderDefinedKeywords = i1562
  var i1565 = i1559[4]
  var i1564 = []
  for(var i = 0; i < i1565.length; i += 1) {
    i1564.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass', i1565[i + 0]) );
  }
  i1558.passes = i1564
  var i1567 = i1559[5]
  var i1566 = []
  for(var i = 0; i < i1567.length; i += 1) {
    i1566.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass', i1567[i + 0]) );
  }
  i1558.usePasses = i1566
  var i1569 = i1559[6]
  var i1568 = []
  for(var i = 0; i < i1569.length; i += 1) {
    i1568.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue', i1569[i + 0]) );
  }
  i1558.defaultParameterValues = i1568
  request.r(i1559[7], i1559[8], 0, i1558, 'unityFallbackShader')
  i1558.readDepth = !!i1559[9]
  i1558.hasDepthOnlyPass = !!i1559[10]
  i1558.isCreatedByShaderGraph = !!i1559[11]
  i1558.disableBatching = !!i1559[12]
  i1558.compiled = !!i1559[13]
  return i1558
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError"] = function (request, data, root) {
  var i1572 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError' )
  var i1573 = data
  i1572.shaderName = i1573[0]
  i1572.errorMessage = i1573[1]
  return i1572
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass"] = function (request, data, root) {
  var i1578 = root || new pc.UnityShaderPass()
  var i1579 = data
  i1578.id = i1579[0]
  i1578.subShaderIndex = i1579[1]
  i1578.name = i1579[2]
  i1578.passType = i1579[3]
  i1578.grabPassTextureName = i1579[4]
  i1578.usePass = !!i1579[5]
  i1578.zTest = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[6], i1578.zTest)
  i1578.zWrite = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[7], i1578.zWrite)
  i1578.culling = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[8], i1578.culling)
  i1578.blending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1579[9], i1578.blending)
  i1578.alphaBlending = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending', i1579[10], i1578.alphaBlending)
  i1578.colorWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[11], i1578.colorWriteMask)
  i1578.offsetUnits = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[12], i1578.offsetUnits)
  i1578.offsetFactor = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[13], i1578.offsetFactor)
  i1578.stencilRef = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[14], i1578.stencilRef)
  i1578.stencilReadMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[15], i1578.stencilReadMask)
  i1578.stencilWriteMask = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1579[16], i1578.stencilWriteMask)
  i1578.stencilOp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1579[17], i1578.stencilOp)
  i1578.stencilOpFront = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1579[18], i1578.stencilOpFront)
  i1578.stencilOpBack = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp', i1579[19], i1578.stencilOpBack)
  var i1581 = i1579[20]
  var i1580 = []
  for(var i = 0; i < i1581.length; i += 1) {
    i1580.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag', i1581[i + 0]) );
  }
  i1578.tags = i1580
  var i1583 = i1579[21]
  var i1582 = []
  for(var i = 0; i < i1583.length; i += 1) {
    i1582.push( i1583[i + 0] );
  }
  i1578.passDefinedKeywords = i1582
  var i1585 = i1579[22]
  var i1584 = []
  for(var i = 0; i < i1585.length; i += 1) {
    i1584.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup', i1585[i + 0]) );
  }
  i1578.passDefinedKeywordGroups = i1584
  var i1587 = i1579[23]
  var i1586 = []
  for(var i = 0; i < i1587.length; i += 1) {
    i1586.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1587[i + 0]) );
  }
  i1578.variants = i1586
  var i1589 = i1579[24]
  var i1588 = []
  for(var i = 0; i < i1589.length; i += 1) {
    i1588.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant', i1589[i + 0]) );
  }
  i1578.excludedVariants = i1588
  i1578.hasDepthReader = !!i1579[25]
  return i1578
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value"] = function (request, data, root) {
  var i1590 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value' )
  var i1591 = data
  i1590.val = i1591[0]
  i1590.name = i1591[1]
  return i1590
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending"] = function (request, data, root) {
  var i1592 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending' )
  var i1593 = data
  i1592.src = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1593[0], i1592.src)
  i1592.dst = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1593[1], i1592.dst)
  i1592.op = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1593[2], i1592.op)
  return i1592
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp"] = function (request, data, root) {
  var i1594 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp' )
  var i1595 = data
  i1594.pass = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1595[0], i1594.pass)
  i1594.fail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1595[1], i1594.fail)
  i1594.zFail = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1595[2], i1594.zFail)
  i1594.comp = request.d('Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value', i1595[3], i1594.comp)
  return i1594
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag"] = function (request, data, root) {
  var i1598 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag' )
  var i1599 = data
  i1598.name = i1599[0]
  i1598.value = i1599[1]
  return i1598
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup"] = function (request, data, root) {
  var i1602 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup' )
  var i1603 = data
  var i1605 = i1603[0]
  var i1604 = []
  for(var i = 0; i < i1605.length; i += 1) {
    i1604.push( i1605[i + 0] );
  }
  i1602.keywords = i1604
  i1602.hasDiscard = !!i1603[1]
  return i1602
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant"] = function (request, data, root) {
  var i1608 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant' )
  var i1609 = data
  i1608.passId = i1609[0]
  i1608.subShaderIndex = i1609[1]
  var i1611 = i1609[2]
  var i1610 = []
  for(var i = 0; i < i1611.length; i += 1) {
    i1610.push( i1611[i + 0] );
  }
  i1608.keywords = i1610
  i1608.vertexProgram = i1609[3]
  i1608.fragmentProgram = i1609[4]
  i1608.exportedForWebGl2 = !!i1609[5]
  i1608.readDepth = !!i1609[6]
  return i1608
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass"] = function (request, data, root) {
  var i1614 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass' )
  var i1615 = data
  request.r(i1615[0], i1615[1], 0, i1614, 'shader')
  i1614.pass = i1615[2]
  return i1614
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue"] = function (request, data, root) {
  var i1618 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue' )
  var i1619 = data
  i1618.name = i1619[0]
  i1618.type = i1619[1]
  i1618.value = new pc.Vec4( i1619[2], i1619[3], i1619[4], i1619[5] )
  i1618.textureValue = i1619[6]
  i1618.shaderPropertyFlag = i1619[7]
  return i1618
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.AudioClip"] = function (request, data, root) {
  var i1620 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.AudioClip' )
  var i1621 = data
  i1620.name = i1621[0]
  return i1620
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip"] = function (request, data, root) {
  var i1622 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip' )
  var i1623 = data
  i1622.name = i1623[0]
  i1622.wrapMode = i1623[1]
  i1622.isLooping = !!i1623[2]
  i1622.length = i1623[3]
  var i1625 = i1623[4]
  var i1624 = []
  for(var i = 0; i < i1625.length; i += 1) {
    i1624.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve', i1625[i + 0]) );
  }
  i1622.curves = i1624
  var i1627 = i1623[5]
  var i1626 = []
  for(var i = 0; i < i1627.length; i += 1) {
    i1626.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent', i1627[i + 0]) );
  }
  i1622.events = i1626
  i1622.halfPrecision = !!i1623[6]
  i1622._frameRate = i1623[7]
  i1622.localBounds = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds', i1623[8], i1622.localBounds)
  i1622.hasMuscleCurves = !!i1623[9]
  var i1629 = i1623[10]
  var i1628 = []
  for(var i = 0; i < i1629.length; i += 1) {
    i1628.push( i1629[i + 0] );
  }
  i1622.clipMuscleConstant = i1628
  i1622.clipBindingConstant = request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant', i1623[11], i1622.clipBindingConstant)
  return i1622
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve"] = function (request, data, root) {
  var i1632 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve' )
  var i1633 = data
  i1632.path = i1633[0]
  i1632.hash = i1633[1]
  i1632.componentType = i1633[2]
  i1632.property = i1633[3]
  i1632.keys = i1633[4]
  var i1635 = i1633[5]
  var i1634 = []
  for(var i = 0; i < i1635.length; i += 1) {
    i1634.push( request.d('Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey', i1635[i + 0]) );
  }
  i1632.objectReferenceKeys = i1634
  return i1632
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey"] = function (request, data, root) {
  var i1638 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey' )
  var i1639 = data
  i1638.time = i1639[0]
  request.r(i1639[1], i1639[2], 0, i1638, 'value')
  return i1638
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent"] = function (request, data, root) {
  var i1642 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent' )
  var i1643 = data
  i1642.functionName = i1643[0]
  i1642.floatParameter = i1643[1]
  i1642.intParameter = i1643[2]
  i1642.stringParameter = i1643[3]
  request.r(i1643[4], i1643[5], 0, i1642, 'objectReferenceParameter')
  i1642.time = i1643[6]
  return i1642
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds"] = function (request, data, root) {
  var i1644 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds' )
  var i1645 = data
  i1644.center = new pc.Vec3( i1645[0], i1645[1], i1645[2] )
  i1644.extends = new pc.Vec3( i1645[3], i1645[4], i1645[5] )
  return i1644
}

Deserializers["Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant"] = function (request, data, root) {
  var i1648 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant' )
  var i1649 = data
  var i1651 = i1649[0]
  var i1650 = []
  for(var i = 0; i < i1651.length; i += 1) {
    i1650.push( i1651[i + 0] );
  }
  i1648.genericBindings = i1650
  var i1653 = i1649[1]
  var i1652 = []
  for(var i = 0; i < i1653.length; i += 1) {
    i1652.push( i1653[i + 0] );
  }
  i1648.pptrCurveMapping = i1652
  return i1648
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font"] = function (request, data, root) {
  var i1654 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font' )
  var i1655 = data
  i1654.name = i1655[0]
  i1654.ascent = i1655[1]
  i1654.originalLineHeight = i1655[2]
  i1654.fontSize = i1655[3]
  var i1657 = i1655[4]
  var i1656 = []
  for(var i = 0; i < i1657.length; i += 1) {
    i1656.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo', i1657[i + 0]) );
  }
  i1654.characterInfo = i1656
  request.r(i1655[5], i1655[6], 0, i1654, 'texture')
  i1654.originalFontSize = i1655[7]
  return i1654
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo"] = function (request, data, root) {
  var i1660 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo' )
  var i1661 = data
  i1660.index = i1661[0]
  i1660.advance = i1661[1]
  i1660.bearing = i1661[2]
  i1660.glyphWidth = i1661[3]
  i1660.glyphHeight = i1661[4]
  i1660.minX = i1661[5]
  i1660.maxX = i1661[6]
  i1660.minY = i1661[7]
  i1660.maxY = i1661[8]
  i1660.uvBottomLeftX = i1661[9]
  i1660.uvBottomLeftY = i1661[10]
  i1660.uvBottomRightX = i1661[11]
  i1660.uvBottomRightY = i1661[12]
  i1660.uvTopLeftX = i1661[13]
  i1660.uvTopLeftY = i1661[14]
  i1660.uvTopRightX = i1661[15]
  i1660.uvTopRightY = i1661[16]
  return i1660
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.TextAsset"] = function (request, data, root) {
  var i1662 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.TextAsset' )
  var i1663 = data
  i1662.name = i1663[0]
  i1662.bytes64 = i1663[1]
  i1662.data = i1663[2]
  return i1662
}

Deserializers["TMPro.TMP_Settings"] = function (request, data, root) {
  var i1664 = root || request.c( 'TMPro.TMP_Settings' )
  var i1665 = data
  i1664.assetVersion = i1665[0]
  i1664.m_TextWrappingMode = i1665[1]
  i1664.m_enableKerning = !!i1665[2]
  var i1667 = i1665[3]
  var i1666 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.OTL_FeatureTag')))
  for(var i = 0; i < i1667.length; i += 1) {
    i1666.add(i1667[i + 0]);
  }
  i1664.m_ActiveFontFeatures = i1666
  i1664.m_enableExtraPadding = !!i1665[4]
  i1664.m_enableTintAllSprites = !!i1665[5]
  i1664.m_enableParseEscapeCharacters = !!i1665[6]
  i1664.m_EnableRaycastTarget = !!i1665[7]
  i1664.m_GetFontFeaturesAtRuntime = !!i1665[8]
  i1664.m_missingGlyphCharacter = i1665[9]
  i1664.m_ClearDynamicDataOnBuild = !!i1665[10]
  i1664.m_warningsDisabled = !!i1665[11]
  request.r(i1665[12], i1665[13], 0, i1664, 'm_defaultFontAsset')
  i1664.m_defaultFontAssetPath = i1665[14]
  i1664.m_defaultFontSize = i1665[15]
  i1664.m_defaultAutoSizeMinRatio = i1665[16]
  i1664.m_defaultAutoSizeMaxRatio = i1665[17]
  i1664.m_defaultTextMeshProTextContainerSize = new pc.Vec2( i1665[18], i1665[19] )
  i1664.m_defaultTextMeshProUITextContainerSize = new pc.Vec2( i1665[20], i1665[21] )
  i1664.m_autoSizeTextContainer = !!i1665[22]
  i1664.m_IsTextObjectScaleStatic = !!i1665[23]
  var i1669 = i1665[24]
  var i1668 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1669.length; i += 2) {
  request.r(i1669[i + 0], i1669[i + 1], 1, i1668, '')
  }
  i1664.m_fallbackFontAssets = i1668
  i1664.m_matchMaterialPreset = !!i1665[25]
  i1664.m_HideSubTextObjects = !!i1665[26]
  request.r(i1665[27], i1665[28], 0, i1664, 'm_defaultSpriteAsset')
  i1664.m_defaultSpriteAssetPath = i1665[29]
  i1664.m_enableEmojiSupport = !!i1665[30]
  i1664.m_MissingCharacterSpriteUnicode = i1665[31]
  var i1671 = i1665[32]
  var i1670 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Asset')))
  for(var i = 0; i < i1671.length; i += 2) {
  request.r(i1671[i + 0], i1671[i + 1], 1, i1670, '')
  }
  i1664.m_EmojiFallbackTextAssets = i1670
  i1664.m_defaultColorGradientPresetsPath = i1665[33]
  request.r(i1665[34], i1665[35], 0, i1664, 'm_defaultStyleSheet')
  i1664.m_StyleSheetsResourcePath = i1665[36]
  request.r(i1665[37], i1665[38], 0, i1664, 'm_leadingCharacters')
  request.r(i1665[39], i1665[40], 0, i1664, 'm_followingCharacters')
  i1664.m_UseModernHangulLineBreakingRules = !!i1665[41]
  return i1664
}

Deserializers["TMPro.TMP_FontAsset"] = function (request, data, root) {
  var i1678 = root || request.c( 'TMPro.TMP_FontAsset' )
  var i1679 = data
  i1678.normalStyle = i1679[0]
  i1678.normalSpacingOffset = i1679[1]
  i1678.boldStyle = i1679[2]
  i1678.boldSpacing = i1679[3]
  i1678.italicStyle = i1679[4]
  i1678.tabSize = i1679[5]
  request.r(i1679[6], i1679[7], 0, i1678, 'atlas')
  i1678.m_SourceFontFileGUID = i1679[8]
  i1678.m_CreationSettings = request.d('TMPro.FontAssetCreationSettings', i1679[9], i1678.m_CreationSettings)
  request.r(i1679[10], i1679[11], 0, i1678, 'm_SourceFontFile')
  i1678.m_SourceFontFilePath = i1679[12]
  i1678.m_AtlasPopulationMode = i1679[13]
  i1678.InternalDynamicOS = !!i1679[14]
  var i1681 = i1679[15]
  var i1680 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.Glyph')))
  for(var i = 0; i < i1681.length; i += 1) {
    i1680.add(request.d('UnityEngine.TextCore.Glyph', i1681[i + 0]));
  }
  i1678.m_GlyphTable = i1680
  var i1683 = i1679[16]
  var i1682 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Character')))
  for(var i = 0; i < i1683.length; i += 1) {
    i1682.add(request.d('TMPro.TMP_Character', i1683[i + 0]));
  }
  i1678.m_CharacterTable = i1682
  var i1685 = i1679[17]
  var i1684 = []
  for(var i = 0; i < i1685.length; i += 2) {
  request.r(i1685[i + 0], i1685[i + 1], 2, i1684, '')
  }
  i1678.m_AtlasTextures = i1684
  i1678.m_AtlasTextureIndex = i1679[18]
  i1678.m_IsMultiAtlasTexturesEnabled = !!i1679[19]
  i1678.m_GetFontFeatures = !!i1679[20]
  i1678.m_ClearDynamicDataOnBuild = !!i1679[21]
  i1678.m_AtlasWidth = i1679[22]
  i1678.m_AtlasHeight = i1679[23]
  i1678.m_AtlasPadding = i1679[24]
  i1678.m_AtlasRenderMode = i1679[25]
  var i1687 = i1679[26]
  var i1686 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1687.length; i += 1) {
    i1686.add(request.d('UnityEngine.TextCore.GlyphRect', i1687[i + 0]));
  }
  i1678.m_UsedGlyphRects = i1686
  var i1689 = i1679[27]
  var i1688 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.GlyphRect')))
  for(var i = 0; i < i1689.length; i += 1) {
    i1688.add(request.d('UnityEngine.TextCore.GlyphRect', i1689[i + 0]));
  }
  i1678.m_FreeGlyphRects = i1688
  i1678.m_FontFeatureTable = request.d('TMPro.TMP_FontFeatureTable', i1679[28], i1678.m_FontFeatureTable)
  i1678.m_ShouldReimportFontFeatures = !!i1679[29]
  var i1691 = i1679[30]
  var i1690 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1691.length; i += 2) {
  request.r(i1691[i + 0], i1691[i + 1], 1, i1690, '')
  }
  i1678.m_FallbackFontAssetTable = i1690
  var i1693 = i1679[31]
  var i1692 = []
  for(var i = 0; i < i1693.length; i += 1) {
    i1692.push( request.d('TMPro.TMP_FontWeightPair', i1693[i + 0]) );
  }
  i1678.m_FontWeightTable = i1692
  var i1695 = i1679[32]
  var i1694 = []
  for(var i = 0; i < i1695.length; i += 1) {
    i1694.push( request.d('TMPro.TMP_FontWeightPair', i1695[i + 0]) );
  }
  i1678.fontWeights = i1694
  i1678.m_fontInfo = request.d('TMPro.FaceInfo_Legacy', i1679[33], i1678.m_fontInfo)
  var i1697 = i1679[34]
  var i1696 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Glyph')))
  for(var i = 0; i < i1697.length; i += 1) {
    i1696.add(request.d('TMPro.TMP_Glyph', i1697[i + 0]));
  }
  i1678.m_glyphInfoList = i1696
  i1678.m_KerningTable = request.d('TMPro.KerningTable', i1679[35], i1678.m_KerningTable)
  var i1699 = i1679[36]
  var i1698 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_FontAsset')))
  for(var i = 0; i < i1699.length; i += 2) {
  request.r(i1699[i + 0], i1699[i + 1], 1, i1698, '')
  }
  i1678.fallbackFontAssets = i1698
  i1678.m_Version = i1679[37]
  i1678.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1679[38], i1678.m_FaceInfo)
  request.r(i1679[39], i1679[40], 0, i1678, 'm_Material')
  return i1678
}

Deserializers["TMPro.FontAssetCreationSettings"] = function (request, data, root) {
  var i1700 = root || request.c( 'TMPro.FontAssetCreationSettings' )
  var i1701 = data
  i1700.sourceFontFileName = i1701[0]
  i1700.sourceFontFileGUID = i1701[1]
  i1700.faceIndex = i1701[2]
  i1700.pointSizeSamplingMode = i1701[3]
  i1700.pointSize = i1701[4]
  i1700.padding = i1701[5]
  i1700.paddingMode = i1701[6]
  i1700.packingMode = i1701[7]
  i1700.atlasWidth = i1701[8]
  i1700.atlasHeight = i1701[9]
  i1700.characterSetSelectionMode = i1701[10]
  i1700.characterSequence = i1701[11]
  i1700.referencedFontAssetGUID = i1701[12]
  i1700.referencedTextAssetGUID = i1701[13]
  i1700.fontStyle = i1701[14]
  i1700.fontStyleModifier = i1701[15]
  i1700.renderMode = i1701[16]
  i1700.includeFontFeatures = !!i1701[17]
  return i1700
}

Deserializers["UnityEngine.TextCore.Glyph"] = function (request, data, root) {
  var i1704 = root || request.c( 'UnityEngine.TextCore.Glyph' )
  var i1705 = data
  i1704.m_Index = i1705[0]
  i1704.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1705[1], i1704.m_Metrics)
  i1704.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1705[2], i1704.m_GlyphRect)
  i1704.m_Scale = i1705[3]
  i1704.m_AtlasIndex = i1705[4]
  i1704.m_ClassDefinitionType = i1705[5]
  return i1704
}

Deserializers["UnityEngine.TextCore.GlyphMetrics"] = function (request, data, root) {
  var i1706 = root || request.c( 'UnityEngine.TextCore.GlyphMetrics' )
  var i1707 = data
  i1706.m_Width = i1707[0]
  i1706.m_Height = i1707[1]
  i1706.m_HorizontalBearingX = i1707[2]
  i1706.m_HorizontalBearingY = i1707[3]
  i1706.m_HorizontalAdvance = i1707[4]
  return i1706
}

Deserializers["UnityEngine.TextCore.GlyphRect"] = function (request, data, root) {
  var i1708 = root || request.c( 'UnityEngine.TextCore.GlyphRect' )
  var i1709 = data
  i1708.m_X = i1709[0]
  i1708.m_Y = i1709[1]
  i1708.m_Width = i1709[2]
  i1708.m_Height = i1709[3]
  return i1708
}

Deserializers["TMPro.TMP_Character"] = function (request, data, root) {
  var i1712 = root || request.c( 'TMPro.TMP_Character' )
  var i1713 = data
  i1712.m_ElementType = i1713[0]
  i1712.m_Unicode = i1713[1]
  i1712.m_GlyphIndex = i1713[2]
  i1712.m_Scale = i1713[3]
  return i1712
}

Deserializers["TMPro.TMP_FontFeatureTable"] = function (request, data, root) {
  var i1718 = root || request.c( 'TMPro.TMP_FontFeatureTable' )
  var i1719 = data
  var i1721 = i1719[0]
  var i1720 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MultipleSubstitutionRecord')))
  for(var i = 0; i < i1721.length; i += 1) {
    i1720.add(request.d('TMPro.MultipleSubstitutionRecord', i1721[i + 0]));
  }
  i1718.m_MultipleSubstitutionRecords = i1720
  var i1723 = i1719[1]
  var i1722 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.LigatureSubstitutionRecord')))
  for(var i = 0; i < i1723.length; i += 1) {
    i1722.add(request.d('TMPro.LigatureSubstitutionRecord', i1723[i + 0]));
  }
  i1718.m_LigatureSubstitutionRecords = i1722
  var i1725 = i1719[2]
  var i1724 = new (System.Collections.Generic.List$1(Bridge.ns('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord')))
  for(var i = 0; i < i1725.length; i += 1) {
    i1724.add(request.d('UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord', i1725[i + 0]));
  }
  i1718.m_GlyphPairAdjustmentRecords = i1724
  var i1727 = i1719[3]
  var i1726 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToBaseAdjustmentRecord')))
  for(var i = 0; i < i1727.length; i += 1) {
    i1726.add(request.d('TMPro.MarkToBaseAdjustmentRecord', i1727[i + 0]));
  }
  i1718.m_MarkToBaseAdjustmentRecords = i1726
  var i1729 = i1719[4]
  var i1728 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.MarkToMarkAdjustmentRecord')))
  for(var i = 0; i < i1729.length; i += 1) {
    i1728.add(request.d('TMPro.MarkToMarkAdjustmentRecord', i1729[i + 0]));
  }
  i1718.m_MarkToMarkAdjustmentRecords = i1728
  return i1718
}

Deserializers["TMPro.MultipleSubstitutionRecord"] = function (request, data, root) {
  var i1732 = root || request.c( 'TMPro.MultipleSubstitutionRecord' )
  var i1733 = data
  i1732.m_TargetGlyphID = i1733[0]
  i1732.m_SubstituteGlyphIDs = i1733[1]
  return i1732
}

Deserializers["TMPro.LigatureSubstitutionRecord"] = function (request, data, root) {
  var i1736 = root || request.c( 'TMPro.LigatureSubstitutionRecord' )
  var i1737 = data
  i1736.m_ComponentGlyphIDs = i1737[0]
  i1736.m_LigatureGlyphID = i1737[1]
  return i1736
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord"] = function (request, data, root) {
  var i1740 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphPairAdjustmentRecord' )
  var i1741 = data
  i1740.m_FirstAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1741[0], i1740.m_FirstAdjustmentRecord)
  i1740.m_SecondAdjustmentRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord', i1741[1], i1740.m_SecondAdjustmentRecord)
  i1740.m_FeatureLookupFlags = i1741[2]
  return i1740
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord"] = function (request, data, root) {
  var i1742 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphAdjustmentRecord' )
  var i1743 = data
  i1742.m_GlyphIndex = i1743[0]
  i1742.m_GlyphValueRecord = request.d('UnityEngine.TextCore.LowLevel.GlyphValueRecord', i1743[1], i1742.m_GlyphValueRecord)
  return i1742
}

Deserializers["UnityEngine.TextCore.LowLevel.GlyphValueRecord"] = function (request, data, root) {
  var i1744 = root || request.c( 'UnityEngine.TextCore.LowLevel.GlyphValueRecord' )
  var i1745 = data
  i1744.m_XPlacement = i1745[0]
  i1744.m_YPlacement = i1745[1]
  i1744.m_XAdvance = i1745[2]
  i1744.m_YAdvance = i1745[3]
  return i1744
}

Deserializers["TMPro.MarkToBaseAdjustmentRecord"] = function (request, data, root) {
  var i1748 = root || request.c( 'TMPro.MarkToBaseAdjustmentRecord' )
  var i1749 = data
  i1748.m_BaseGlyphID = i1749[0]
  i1748.m_BaseGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1749[1], i1748.m_BaseGlyphAnchorPoint)
  i1748.m_MarkGlyphID = i1749[2]
  i1748.m_MarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1749[3], i1748.m_MarkPositionAdjustment)
  return i1748
}

Deserializers["TMPro.MarkToMarkAdjustmentRecord"] = function (request, data, root) {
  var i1752 = root || request.c( 'TMPro.MarkToMarkAdjustmentRecord' )
  var i1753 = data
  i1752.m_BaseMarkGlyphID = i1753[0]
  i1752.m_BaseMarkGlyphAnchorPoint = request.d('TMPro.GlyphAnchorPoint', i1753[1], i1752.m_BaseMarkGlyphAnchorPoint)
  i1752.m_CombiningMarkGlyphID = i1753[2]
  i1752.m_CombiningMarkPositionAdjustment = request.d('TMPro.MarkPositionAdjustment', i1753[3], i1752.m_CombiningMarkPositionAdjustment)
  return i1752
}

Deserializers["TMPro.TMP_FontWeightPair"] = function (request, data, root) {
  var i1756 = root || request.c( 'TMPro.TMP_FontWeightPair' )
  var i1757 = data
  request.r(i1757[0], i1757[1], 0, i1756, 'regularTypeface')
  request.r(i1757[2], i1757[3], 0, i1756, 'italicTypeface')
  return i1756
}

Deserializers["TMPro.FaceInfo_Legacy"] = function (request, data, root) {
  var i1758 = root || request.c( 'TMPro.FaceInfo_Legacy' )
  var i1759 = data
  i1758.Name = i1759[0]
  i1758.PointSize = i1759[1]
  i1758.Scale = i1759[2]
  i1758.CharacterCount = i1759[3]
  i1758.LineHeight = i1759[4]
  i1758.Baseline = i1759[5]
  i1758.Ascender = i1759[6]
  i1758.CapHeight = i1759[7]
  i1758.Descender = i1759[8]
  i1758.CenterLine = i1759[9]
  i1758.SuperscriptOffset = i1759[10]
  i1758.SubscriptOffset = i1759[11]
  i1758.SubSize = i1759[12]
  i1758.Underline = i1759[13]
  i1758.UnderlineThickness = i1759[14]
  i1758.strikethrough = i1759[15]
  i1758.strikethroughThickness = i1759[16]
  i1758.TabWidth = i1759[17]
  i1758.Padding = i1759[18]
  i1758.AtlasWidth = i1759[19]
  i1758.AtlasHeight = i1759[20]
  return i1758
}

Deserializers["TMPro.TMP_Glyph"] = function (request, data, root) {
  var i1762 = root || request.c( 'TMPro.TMP_Glyph' )
  var i1763 = data
  i1762.id = i1763[0]
  i1762.x = i1763[1]
  i1762.y = i1763[2]
  i1762.width = i1763[3]
  i1762.height = i1763[4]
  i1762.xOffset = i1763[5]
  i1762.yOffset = i1763[6]
  i1762.xAdvance = i1763[7]
  i1762.scale = i1763[8]
  return i1762
}

Deserializers["TMPro.KerningTable"] = function (request, data, root) {
  var i1764 = root || request.c( 'TMPro.KerningTable' )
  var i1765 = data
  var i1767 = i1765[0]
  var i1766 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.KerningPair')))
  for(var i = 0; i < i1767.length; i += 1) {
    i1766.add(request.d('TMPro.KerningPair', i1767[i + 0]));
  }
  i1764.kerningPairs = i1766
  return i1764
}

Deserializers["TMPro.KerningPair"] = function (request, data, root) {
  var i1770 = root || request.c( 'TMPro.KerningPair' )
  var i1771 = data
  i1770.xOffset = i1771[0]
  i1770.m_FirstGlyph = i1771[1]
  i1770.m_FirstGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1771[2], i1770.m_FirstGlyphAdjustments)
  i1770.m_SecondGlyph = i1771[3]
  i1770.m_SecondGlyphAdjustments = request.d('TMPro.GlyphValueRecord_Legacy', i1771[4], i1770.m_SecondGlyphAdjustments)
  i1770.m_IgnoreSpacingAdjustments = !!i1771[5]
  return i1770
}

Deserializers["UnityEngine.TextCore.FaceInfo"] = function (request, data, root) {
  var i1772 = root || request.c( 'UnityEngine.TextCore.FaceInfo' )
  var i1773 = data
  i1772.m_FaceIndex = i1773[0]
  i1772.m_FamilyName = i1773[1]
  i1772.m_StyleName = i1773[2]
  i1772.m_PointSize = i1773[3]
  i1772.m_Scale = i1773[4]
  i1772.m_UnitsPerEM = i1773[5]
  i1772.m_LineHeight = i1773[6]
  i1772.m_AscentLine = i1773[7]
  i1772.m_CapLine = i1773[8]
  i1772.m_MeanLine = i1773[9]
  i1772.m_Baseline = i1773[10]
  i1772.m_DescentLine = i1773[11]
  i1772.m_SuperscriptOffset = i1773[12]
  i1772.m_SuperscriptSize = i1773[13]
  i1772.m_SubscriptOffset = i1773[14]
  i1772.m_SubscriptSize = i1773[15]
  i1772.m_UnderlineOffset = i1773[16]
  i1772.m_UnderlineThickness = i1773[17]
  i1772.m_StrikethroughOffset = i1773[18]
  i1772.m_StrikethroughThickness = i1773[19]
  i1772.m_TabWidth = i1773[20]
  return i1772
}

Deserializers["TMPro.TMP_SpriteAsset"] = function (request, data, root) {
  var i1774 = root || request.c( 'TMPro.TMP_SpriteAsset' )
  var i1775 = data
  request.r(i1775[0], i1775[1], 0, i1774, 'spriteSheet')
  var i1777 = i1775[2]
  var i1776 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Sprite')))
  for(var i = 0; i < i1777.length; i += 1) {
    i1776.add(request.d('TMPro.TMP_Sprite', i1777[i + 0]));
  }
  i1774.spriteInfoList = i1776
  var i1779 = i1775[3]
  var i1778 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteAsset')))
  for(var i = 0; i < i1779.length; i += 2) {
  request.r(i1779[i + 0], i1779[i + 1], 1, i1778, '')
  }
  i1774.fallbackSpriteAssets = i1778
  var i1781 = i1775[4]
  var i1780 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteCharacter')))
  for(var i = 0; i < i1781.length; i += 1) {
    i1780.add(request.d('TMPro.TMP_SpriteCharacter', i1781[i + 0]));
  }
  i1774.m_SpriteCharacterTable = i1780
  var i1783 = i1775[5]
  var i1782 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_SpriteGlyph')))
  for(var i = 0; i < i1783.length; i += 1) {
    i1782.add(request.d('TMPro.TMP_SpriteGlyph', i1783[i + 0]));
  }
  i1774.m_GlyphTable = i1782
  i1774.m_Version = i1775[6]
  i1774.m_FaceInfo = request.d('UnityEngine.TextCore.FaceInfo', i1775[7], i1774.m_FaceInfo)
  request.r(i1775[8], i1775[9], 0, i1774, 'm_Material')
  return i1774
}

Deserializers["TMPro.TMP_Sprite"] = function (request, data, root) {
  var i1786 = root || request.c( 'TMPro.TMP_Sprite' )
  var i1787 = data
  i1786.name = i1787[0]
  i1786.hashCode = i1787[1]
  i1786.unicode = i1787[2]
  i1786.pivot = new pc.Vec2( i1787[3], i1787[4] )
  request.r(i1787[5], i1787[6], 0, i1786, 'sprite')
  i1786.id = i1787[7]
  i1786.x = i1787[8]
  i1786.y = i1787[9]
  i1786.width = i1787[10]
  i1786.height = i1787[11]
  i1786.xOffset = i1787[12]
  i1786.yOffset = i1787[13]
  i1786.xAdvance = i1787[14]
  i1786.scale = i1787[15]
  return i1786
}

Deserializers["TMPro.TMP_SpriteCharacter"] = function (request, data, root) {
  var i1792 = root || request.c( 'TMPro.TMP_SpriteCharacter' )
  var i1793 = data
  i1792.m_Name = i1793[0]
  i1792.m_ElementType = i1793[1]
  i1792.m_Unicode = i1793[2]
  i1792.m_GlyphIndex = i1793[3]
  i1792.m_Scale = i1793[4]
  return i1792
}

Deserializers["TMPro.TMP_SpriteGlyph"] = function (request, data, root) {
  var i1796 = root || request.c( 'TMPro.TMP_SpriteGlyph' )
  var i1797 = data
  request.r(i1797[0], i1797[1], 0, i1796, 'sprite')
  i1796.m_Index = i1797[2]
  i1796.m_Metrics = request.d('UnityEngine.TextCore.GlyphMetrics', i1797[3], i1796.m_Metrics)
  i1796.m_GlyphRect = request.d('UnityEngine.TextCore.GlyphRect', i1797[4], i1796.m_GlyphRect)
  i1796.m_Scale = i1797[5]
  i1796.m_AtlasIndex = i1797[6]
  i1796.m_ClassDefinitionType = i1797[7]
  return i1796
}

Deserializers["TMPro.TMP_StyleSheet"] = function (request, data, root) {
  var i1798 = root || request.c( 'TMPro.TMP_StyleSheet' )
  var i1799 = data
  var i1801 = i1799[0]
  var i1800 = new (System.Collections.Generic.List$1(Bridge.ns('TMPro.TMP_Style')))
  for(var i = 0; i < i1801.length; i += 1) {
    i1800.add(request.d('TMPro.TMP_Style', i1801[i + 0]));
  }
  i1798.m_StyleList = i1800
  return i1798
}

Deserializers["TMPro.TMP_Style"] = function (request, data, root) {
  var i1804 = root || request.c( 'TMPro.TMP_Style' )
  var i1805 = data
  i1804.m_Name = i1805[0]
  i1804.m_HashCode = i1805[1]
  i1804.m_OpeningDefinition = i1805[2]
  i1804.m_ClosingDefinition = i1805[3]
  i1804.m_OpeningTagArray = i1805[4]
  i1804.m_ClosingTagArray = i1805[5]
  return i1804
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources"] = function (request, data, root) {
  var i1806 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources' )
  var i1807 = data
  var i1809 = i1807[0]
  var i1808 = []
  for(var i = 0; i < i1809.length; i += 1) {
    i1808.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.Resources+File', i1809[i + 0]) );
  }
  i1806.files = i1808
  i1806.componentToPrefabIds = i1807[1]
  return i1806
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.Resources+File"] = function (request, data, root) {
  var i1812 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.Resources+File' )
  var i1813 = data
  i1812.path = i1813[0]
  request.r(i1813[1], i1813[2], 0, i1812, 'unityObject')
  return i1812
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings"] = function (request, data, root) {
  var i1814 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings' )
  var i1815 = data
  var i1817 = i1815[0]
  var i1816 = []
  for(var i = 0; i < i1817.length; i += 1) {
    i1816.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder', i1817[i + 0]) );
  }
  i1814.scriptsExecutionOrder = i1816
  var i1819 = i1815[1]
  var i1818 = []
  for(var i = 0; i < i1819.length; i += 1) {
    i1818.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer', i1819[i + 0]) );
  }
  i1814.sortingLayers = i1818
  var i1821 = i1815[2]
  var i1820 = []
  for(var i = 0; i < i1821.length; i += 1) {
    i1820.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer', i1821[i + 0]) );
  }
  i1814.cullingLayers = i1820
  i1814.timeSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings', i1815[3], i1814.timeSettings)
  i1814.physicsSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings', i1815[4], i1814.physicsSettings)
  i1814.physics2DSettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings', i1815[5], i1814.physics2DSettings)
  i1814.qualitySettings = request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1815[6], i1814.qualitySettings)
  i1814.enableRealtimeShadows = !!i1815[7]
  i1814.enableAutoInstancing = !!i1815[8]
  i1814.enableStaticBatching = !!i1815[9]
  i1814.enableDynamicBatching = !!i1815[10]
  i1814.usePreservativeDynamicBatching = !!i1815[11]
  i1814.lightmapEncodingQuality = i1815[12]
  i1814.desiredColorSpace = i1815[13]
  var i1823 = i1815[14]
  var i1822 = []
  for(var i = 0; i < i1823.length; i += 1) {
    i1822.push( i1823[i + 0] );
  }
  i1814.allTags = i1822
  return i1814
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder"] = function (request, data, root) {
  var i1826 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder' )
  var i1827 = data
  i1826.name = i1827[0]
  i1826.value = i1827[1]
  return i1826
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer"] = function (request, data, root) {
  var i1830 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer' )
  var i1831 = data
  i1830.id = i1831[0]
  i1830.name = i1831[1]
  i1830.value = i1831[2]
  return i1830
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer"] = function (request, data, root) {
  var i1834 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer' )
  var i1835 = data
  i1834.id = i1835[0]
  i1834.name = i1835[1]
  return i1834
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings"] = function (request, data, root) {
  var i1836 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings' )
  var i1837 = data
  i1836.fixedDeltaTime = i1837[0]
  i1836.maximumDeltaTime = i1837[1]
  i1836.timeScale = i1837[2]
  i1836.maximumParticleTimestep = i1837[3]
  return i1836
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings"] = function (request, data, root) {
  var i1838 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings' )
  var i1839 = data
  i1838.gravity = new pc.Vec3( i1839[0], i1839[1], i1839[2] )
  i1838.defaultSolverIterations = i1839[3]
  i1838.bounceThreshold = i1839[4]
  i1838.autoSyncTransforms = !!i1839[5]
  i1838.autoSimulation = !!i1839[6]
  var i1841 = i1839[7]
  var i1840 = []
  for(var i = 0; i < i1841.length; i += 1) {
    i1840.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask', i1841[i + 0]) );
  }
  i1838.collisionMatrix = i1840
  return i1838
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask"] = function (request, data, root) {
  var i1844 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask' )
  var i1845 = data
  i1844.enabled = !!i1845[0]
  i1844.layerId = i1845[1]
  i1844.otherLayerId = i1845[2]
  return i1844
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings"] = function (request, data, root) {
  var i1846 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings' )
  var i1847 = data
  request.r(i1847[0], i1847[1], 0, i1846, 'material')
  i1846.gravity = new pc.Vec2( i1847[2], i1847[3] )
  i1846.positionIterations = i1847[4]
  i1846.velocityIterations = i1847[5]
  i1846.velocityThreshold = i1847[6]
  i1846.maxLinearCorrection = i1847[7]
  i1846.maxAngularCorrection = i1847[8]
  i1846.maxTranslationSpeed = i1847[9]
  i1846.maxRotationSpeed = i1847[10]
  i1846.baumgarteScale = i1847[11]
  i1846.baumgarteTOIScale = i1847[12]
  i1846.timeToSleep = i1847[13]
  i1846.linearSleepTolerance = i1847[14]
  i1846.angularSleepTolerance = i1847[15]
  i1846.defaultContactOffset = i1847[16]
  i1846.autoSimulation = !!i1847[17]
  i1846.queriesHitTriggers = !!i1847[18]
  i1846.queriesStartInColliders = !!i1847[19]
  i1846.callbacksOnDisable = !!i1847[20]
  i1846.reuseCollisionCallbacks = !!i1847[21]
  i1846.autoSyncTransforms = !!i1847[22]
  var i1849 = i1847[23]
  var i1848 = []
  for(var i = 0; i < i1849.length; i += 1) {
    i1848.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask', i1849[i + 0]) );
  }
  i1846.collisionMatrix = i1848
  return i1846
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask"] = function (request, data, root) {
  var i1852 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask' )
  var i1853 = data
  i1852.enabled = !!i1853[0]
  i1852.layerId = i1853[1]
  i1852.otherLayerId = i1853[2]
  return i1852
}

Deserializers["Luna.Unity.DTO.UnityEngine.Assets.QualitySettings"] = function (request, data, root) {
  var i1854 = root || request.c( 'Luna.Unity.DTO.UnityEngine.Assets.QualitySettings' )
  var i1855 = data
  var i1857 = i1855[0]
  var i1856 = []
  for(var i = 0; i < i1857.length; i += 1) {
    i1856.push( request.d('Luna.Unity.DTO.UnityEngine.Assets.QualitySettings', i1857[i + 0]) );
  }
  i1854.qualityLevels = i1856
  var i1859 = i1855[1]
  var i1858 = []
  for(var i = 0; i < i1859.length; i += 1) {
    i1858.push( i1859[i + 0] );
  }
  i1854.names = i1858
  i1854.shadows = i1855[2]
  i1854.anisotropicFiltering = i1855[3]
  i1854.antiAliasing = i1855[4]
  i1854.lodBias = i1855[5]
  i1854.shadowCascades = i1855[6]
  i1854.shadowDistance = i1855[7]
  i1854.shadowmaskMode = i1855[8]
  i1854.shadowProjection = i1855[9]
  i1854.shadowResolution = i1855[10]
  i1854.softParticles = !!i1855[11]
  i1854.softVegetation = !!i1855[12]
  i1854.activeColorSpace = i1855[13]
  i1854.desiredColorSpace = i1855[14]
  i1854.masterTextureLimit = i1855[15]
  i1854.maxQueuedFrames = i1855[16]
  i1854.particleRaycastBudget = i1855[17]
  i1854.pixelLightCount = i1855[18]
  i1854.realtimeReflectionProbes = !!i1855[19]
  i1854.shadowCascade2Split = i1855[20]
  i1854.shadowCascade4Split = new pc.Vec3( i1855[21], i1855[22], i1855[23] )
  i1854.streamingMipmapsActive = !!i1855[24]
  i1854.vSyncCount = i1855[25]
  i1854.asyncUploadBufferSize = i1855[26]
  i1854.asyncUploadTimeSlice = i1855[27]
  i1854.billboardsFaceCameraPosition = !!i1855[28]
  i1854.shadowNearPlaneOffset = i1855[29]
  i1854.streamingMipmapsMemoryBudget = i1855[30]
  i1854.maximumLODLevel = i1855[31]
  i1854.streamingMipmapsAddAllCameras = !!i1855[32]
  i1854.streamingMipmapsMaxLevelReduction = i1855[33]
  i1854.streamingMipmapsRenderersPerFrame = i1855[34]
  i1854.resolutionScalingFixedDPIFactor = i1855[35]
  i1854.streamingMipmapsMaxFileIORequests = i1855[36]
  i1854.currentQualityLevel = i1855[37]
  return i1854
}

Deserializers["TMPro.GlyphAnchorPoint"] = function (request, data, root) {
  var i1862 = root || request.c( 'TMPro.GlyphAnchorPoint' )
  var i1863 = data
  i1862.m_XCoordinate = i1863[0]
  i1862.m_YCoordinate = i1863[1]
  return i1862
}

Deserializers["TMPro.MarkPositionAdjustment"] = function (request, data, root) {
  var i1864 = root || request.c( 'TMPro.MarkPositionAdjustment' )
  var i1865 = data
  i1864.m_XPositionAdjustment = i1865[0]
  i1864.m_YPositionAdjustment = i1865[1]
  return i1864
}

Deserializers["TMPro.GlyphValueRecord_Legacy"] = function (request, data, root) {
  var i1866 = root || request.c( 'TMPro.GlyphValueRecord_Legacy' )
  var i1867 = data
  i1866.xPlacement = i1867[0]
  i1866.yPlacement = i1867[1]
  i1866.xAdvance = i1867[2]
  i1866.yAdvance = i1867[3]
  return i1866
}

Deserializers.fields = {"Luna.Unity.DTO.UnityEngine.Assets.Material":{"name":0,"shader":1,"renderQueue":3,"enableInstancing":4,"floatParameters":5,"colorParameters":6,"vectorParameters":7,"textureParameters":8,"materialFlags":9},"Luna.Unity.DTO.UnityEngine.Assets.Material+FloatParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+ColorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+VectorParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+TextureParameter":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Material+MaterialFlag":{"name":0,"enabled":1},"Luna.Unity.DTO.UnityEngine.Textures.Texture2D":{"name":0,"width":1,"height":2,"mipmapCount":3,"anisoLevel":4,"filterMode":5,"hdr":6,"format":7,"wrapMode":8,"alphaIsTransparency":9,"alphaSource":10,"graphicsFormat":11,"sRGBTexture":12,"desiredColorSpace":13,"wrapU":14,"wrapV":15},"Luna.Unity.DTO.UnityEngine.Textures.Cubemap":{"name":0,"atlasId":1,"mipmapCount":2,"hdr":3,"size":4,"anisoLevel":5,"filterMode":6,"rects":7,"wrapU":8,"wrapV":9},"Luna.Unity.DTO.UnityEngine.Scene.Scene":{"name":0,"index":1,"startup":2},"Luna.Unity.DTO.UnityEngine.Components.Camera":{"aspect":0,"orthographic":1,"orthographicSize":2,"backgroundColor":3,"nearClipPlane":7,"farClipPlane":8,"fieldOfView":9,"depth":10,"clearFlags":11,"cullingMask":12,"rect":13,"targetTexture":14,"usePhysicalProperties":16,"focalLength":17,"sensorSize":18,"lensShift":20,"gateFit":22,"commandBufferCount":23,"cameraType":24,"enabled":25},"Luna.Unity.DTO.UnityEngine.Scene.GameObject":{"name":0,"tagId":1,"enabled":2,"isStatic":3,"layer":4},"Luna.Unity.DTO.UnityEngine.Components.Light":{"type":0,"color":1,"cullingMask":5,"intensity":6,"range":7,"spotAngle":8,"shadows":9,"shadowNormalBias":10,"shadowBias":11,"shadowStrength":12,"shadowResolution":13,"lightmapBakeType":14,"renderMode":15,"cookie":16,"cookieSize":18,"shadowNearPlane":19,"occlusionMaskChannel":20,"isBaked":21,"mixedLightingMode":22,"enabled":23},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings":{"ambientIntensity":0,"reflectionIntensity":1,"ambientMode":2,"ambientLight":3,"ambientSkyColor":7,"ambientGroundColor":11,"ambientEquatorColor":15,"fogColor":19,"fogEndDistance":23,"fogStartDistance":24,"fogDensity":25,"fog":26,"skybox":27,"fogMode":29,"lightmaps":30,"lightProbes":31,"lightmapsMode":32,"mixedBakeMode":33,"environmentLightingMode":34,"ambientProbe":35,"customReflection":36,"defaultReflection":38,"defaultReflectionMode":40,"defaultReflectionResolution":41,"sunLightObjectId":42,"pixelLightCount":43,"defaultReflectionHDR":44,"hasLightDataAsset":45,"hasManualGenerate":46},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+Lightmap":{"lightmapColor":0,"lightmapDirection":2,"shadowMask":4},"Luna.Unity.DTO.UnityEngine.Assets.RenderSettings+LightProbes":{"bakedProbes":0,"positions":1,"hullRays":2,"tetrahedra":3,"neighbours":4,"matrices":5},"Luna.Unity.DTO.UnityEngine.Components.RectTransform":{"pivot":0,"anchorMin":2,"anchorMax":4,"sizeDelta":6,"anchoredPosition3D":8,"rotation":11,"scale":15},"Luna.Unity.DTO.UnityEngine.Components.CanvasRenderer":{"cullTransparentMesh":0},"Luna.Unity.DTO.UnityEngine.Components.Transform":{"position":0,"scale":3,"rotation":6},"Luna.Unity.DTO.UnityEngine.Components.MeshRenderer":{"additionalVertexStreams":0,"enabled":2,"sharedMaterial":3,"sharedMaterials":5,"receiveShadows":6,"shadowCastingMode":7,"sortingLayerID":8,"sortingOrder":9,"lightmapIndex":10,"lightmapSceneIndex":11,"lightmapScaleOffset":12,"lightProbeUsage":16,"reflectionProbeUsage":17},"Luna.Unity.DTO.UnityEngine.Components.TextMesh":{"m_Alignment":0,"m_Anchor":1,"m_CharacterSize":2,"m_Font":3,"m_FontSize":5,"m_FontStyle":6,"m_LineSpacing":7,"m_OffsetZ":8,"m_RichText":9,"m_TabSize":10,"m_Text":11},"Luna.Unity.DTO.UnityEngine.Components.MeshFilter":{"sharedMesh":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh":{"name":0,"halfPrecision":1,"useSimplification":2,"useUInt32IndexFormat":3,"vertexCount":4,"aabb":5,"streams":6,"vertices":7,"subMeshes":8,"bindposes":9,"blendShapes":10},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+SubMesh":{"triangles":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShape":{"name":0,"frames":1},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer":{"sharedMesh":0,"bones":2,"updateWhenOffscreen":3,"localBounds":4,"rootBone":5,"blendShapesWeights":7,"enabled":8,"sharedMaterial":9,"sharedMaterials":11,"receiveShadows":12,"shadowCastingMode":13,"sortingLayerID":14,"sortingOrder":15,"lightmapIndex":16,"lightmapSceneIndex":17,"lightmapScaleOffset":18,"lightProbeUsage":22,"reflectionProbeUsage":23},"Luna.Unity.DTO.UnityEngine.Components.SkinnedMeshRenderer+BlendShapeWeight":{"weight":0},"Luna.Unity.DTO.UnityEngine.Assets.Mesh+BlendShapeFrame":{"weight":0,"vertices":1,"normals":2,"tangents":3},"Luna.Unity.DTO.UnityEngine.Components.SphereCollider":{"center":0,"radius":3,"enabled":4,"isTrigger":5,"material":6},"Luna.Unity.DTO.UnityEngine.Components.CapsuleCollider":{"center":0,"radius":3,"height":4,"direction":5,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.BoxCollider":{"center":0,"size":3,"enabled":6,"isTrigger":7,"material":8},"Luna.Unity.DTO.UnityEngine.Components.MeshCollider":{"sharedMesh":0,"convex":2,"enabled":3,"isTrigger":4,"material":5},"Luna.Unity.DTO.UnityEngine.Assets.Shader":{"ShaderCompilationErrors":0,"name":1,"guid":2,"shaderDefinedKeywords":3,"passes":4,"usePasses":5,"defaultParameterValues":6,"unityFallbackShader":7,"readDepth":9,"hasDepthOnlyPass":10,"isCreatedByShaderGraph":11,"disableBatching":12,"compiled":13},"Luna.Unity.DTO.UnityEngine.Assets.Shader+ShaderCompilationError":{"shaderName":0,"errorMessage":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass":{"id":0,"subShaderIndex":1,"name":2,"passType":3,"grabPassTextureName":4,"usePass":5,"zTest":6,"zWrite":7,"culling":8,"blending":9,"alphaBlending":10,"colorWriteMask":11,"offsetUnits":12,"offsetFactor":13,"stencilRef":14,"stencilReadMask":15,"stencilWriteMask":16,"stencilOp":17,"stencilOpFront":18,"stencilOpBack":19,"tags":20,"passDefinedKeywords":21,"passDefinedKeywordGroups":22,"variants":23,"excludedVariants":24,"hasDepthReader":25},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Value":{"val":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Blending":{"src":0,"dst":1,"op":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+StencilOp":{"pass":0,"fail":1,"zFail":2,"comp":3},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Tag":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+KeywordGroup":{"keywords":0,"hasDiscard":1},"Luna.Unity.DTO.UnityEngine.Assets.Shader+Pass+Variant":{"passId":0,"subShaderIndex":1,"keywords":2,"vertexProgram":3,"fragmentProgram":4,"exportedForWebGl2":5,"readDepth":6},"Luna.Unity.DTO.UnityEngine.Assets.Shader+UsePass":{"shader":0,"pass":2},"Luna.Unity.DTO.UnityEngine.Assets.Shader+DefaultParameterValue":{"name":0,"type":1,"value":2,"textureValue":6,"shaderPropertyFlag":7},"Luna.Unity.DTO.UnityEngine.Assets.AudioClip":{"name":0},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip":{"name":0,"wrapMode":1,"isLooping":2,"length":3,"curves":4,"events":5,"halfPrecision":6,"_frameRate":7,"localBounds":8,"hasMuscleCurves":9,"clipMuscleConstant":10,"clipBindingConstant":11},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve":{"path":0,"hash":1,"componentType":2,"property":3,"keys":4,"objectReferenceKeys":5},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationCurve+ObjectReferenceKey":{"time":0,"value":1},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationEvent":{"functionName":0,"floatParameter":1,"intParameter":2,"stringParameter":3,"objectReferenceParameter":4,"time":6},"Luna.Unity.DTO.UnityEngine.Animation.Data.Bounds":{"center":0,"extends":3},"Luna.Unity.DTO.UnityEngine.Animation.Data.AnimationClip+AnimationClipBindingConstant":{"genericBindings":0,"pptrCurveMapping":1},"Luna.Unity.DTO.UnityEngine.Assets.Font":{"name":0,"ascent":1,"originalLineHeight":2,"fontSize":3,"characterInfo":4,"texture":5,"originalFontSize":7},"Luna.Unity.DTO.UnityEngine.Assets.Font+CharacterInfo":{"index":0,"advance":1,"bearing":2,"glyphWidth":3,"glyphHeight":4,"minX":5,"maxX":6,"minY":7,"maxY":8,"uvBottomLeftX":9,"uvBottomLeftY":10,"uvBottomRightX":11,"uvBottomRightY":12,"uvTopLeftX":13,"uvTopLeftY":14,"uvTopRightX":15,"uvTopRightY":16},"Luna.Unity.DTO.UnityEngine.Assets.TextAsset":{"name":0,"bytes64":1,"data":2},"Luna.Unity.DTO.UnityEngine.Assets.Resources":{"files":0,"componentToPrefabIds":1},"Luna.Unity.DTO.UnityEngine.Assets.Resources+File":{"path":0,"unityObject":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings":{"scriptsExecutionOrder":0,"sortingLayers":1,"cullingLayers":2,"timeSettings":3,"physicsSettings":4,"physics2DSettings":5,"qualitySettings":6,"enableRealtimeShadows":7,"enableAutoInstancing":8,"enableStaticBatching":9,"enableDynamicBatching":10,"usePreservativeDynamicBatching":11,"lightmapEncodingQuality":12,"desiredColorSpace":13,"allTags":14},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+ScriptsExecutionOrder":{"name":0,"value":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+SortingLayer":{"id":0,"name":1,"value":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+CullingLayer":{"id":0,"name":1},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+TimeSettings":{"fixedDeltaTime":0,"maximumDeltaTime":1,"timeScale":2,"maximumParticleTimestep":3},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings":{"gravity":0,"defaultSolverIterations":3,"bounceThreshold":4,"autoSyncTransforms":5,"autoSimulation":6,"collisionMatrix":7},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+PhysicsSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings":{"material":0,"gravity":2,"positionIterations":4,"velocityIterations":5,"velocityThreshold":6,"maxLinearCorrection":7,"maxAngularCorrection":8,"maxTranslationSpeed":9,"maxRotationSpeed":10,"baumgarteScale":11,"baumgarteTOIScale":12,"timeToSleep":13,"linearSleepTolerance":14,"angularSleepTolerance":15,"defaultContactOffset":16,"autoSimulation":17,"queriesHitTriggers":18,"queriesStartInColliders":19,"callbacksOnDisable":20,"reuseCollisionCallbacks":21,"autoSyncTransforms":22,"collisionMatrix":23},"Luna.Unity.DTO.UnityEngine.Assets.ProjectSettings+Physics2DSettings+CollisionMask":{"enabled":0,"layerId":1,"otherLayerId":2},"Luna.Unity.DTO.UnityEngine.Assets.QualitySettings":{"qualityLevels":0,"names":1,"shadows":2,"anisotropicFiltering":3,"antiAliasing":4,"lodBias":5,"shadowCascades":6,"shadowDistance":7,"shadowmaskMode":8,"shadowProjection":9,"shadowResolution":10,"softParticles":11,"softVegetation":12,"activeColorSpace":13,"desiredColorSpace":14,"masterTextureLimit":15,"maxQueuedFrames":16,"particleRaycastBudget":17,"pixelLightCount":18,"realtimeReflectionProbes":19,"shadowCascade2Split":20,"shadowCascade4Split":21,"streamingMipmapsActive":24,"vSyncCount":25,"asyncUploadBufferSize":26,"asyncUploadTimeSlice":27,"billboardsFaceCameraPosition":28,"shadowNearPlaneOffset":29,"streamingMipmapsMemoryBudget":30,"maximumLODLevel":31,"streamingMipmapsAddAllCameras":32,"streamingMipmapsMaxLevelReduction":33,"streamingMipmapsRenderersPerFrame":34,"resolutionScalingFixedDPIFactor":35,"streamingMipmapsMaxFileIORequests":36,"currentQualityLevel":37}}

Deserializers.requiredComponents = {"31":[32],"33":[32],"34":[32],"35":[32],"36":[32],"37":[32],"38":[18],"39":[1],"40":[41],"42":[41],"43":[41],"44":[41],"45":[41],"46":[41],"47":[48],"49":[48],"50":[48],"51":[48],"52":[48],"53":[48],"54":[48],"55":[48],"56":[48],"57":[48],"58":[48],"59":[48],"60":[48],"61":[1],"15":[14],"62":[63],"64":[63],"65":[8],"66":[67],"68":[69],"70":[69],"71":[8],"72":[14,8],"73":[8,9],"74":[8],"75":[9,8],"76":[14],"77":[9,8],"78":[8],"79":[8],"80":[8],"81":[65],"82":[9,8],"83":[8],"84":[65],"85":[8],"86":[8],"87":[8],"88":[8],"89":[8],"90":[8],"91":[8],"92":[8],"93":[8],"94":[9,8],"95":[8],"96":[8],"97":[8],"98":[8],"11":[9,8],"99":[8],"100":[101],"102":[101],"103":[101],"104":[101],"105":[1],"106":[1]}

Deserializers.types = ["UnityEngine.Shader","UnityEngine.Camera","UnityEngine.AudioListener","UnityEngine.MonoBehaviour","NumberMatchAd.NumberMatchGame","UnityEngine.Material","UnityEngine.Cubemap","UnityEngine.Texture2D","UnityEngine.RectTransform","UnityEngine.CanvasRenderer","UnityEngine.EventSystems.UIBehaviour","UnityEngine.UI.Text","UnityEngine.Font","UnityEngine.Transform","UnityEngine.MeshRenderer","UnityEngine.TextMesh","UnityEngine.MeshFilter","UnityEngine.Mesh","UnityEngine.SkinnedMeshRenderer","UnityEngine.SphereCollider","UnityEngine.CapsuleCollider","UnityEngine.BoxCollider","UnityEngine.MeshCollider","TMPro.TMP_Settings","TMPro.TMP_FontAsset","TMPro.TMP_SpriteAsset","TMPro.TMP_StyleSheet","UnityEngine.TextAsset","UnityEngine.AudioClip","UnityEngine.GameObject","UnityEngine.AnimationClip","UnityEngine.AudioLowPassFilter","UnityEngine.AudioBehaviour","UnityEngine.AudioHighPassFilter","UnityEngine.AudioReverbFilter","UnityEngine.AudioDistortionFilter","UnityEngine.AudioEchoFilter","UnityEngine.AudioChorusFilter","UnityEngine.Cloth","UnityEngine.FlareLayer","UnityEngine.CharacterJoint","UnityEngine.Rigidbody","UnityEngine.ConfigurableJoint","UnityEngine.ConstantForce","UnityEngine.FixedJoint","UnityEngine.HingeJoint","UnityEngine.SpringJoint","UnityEngine.CompositeCollider2D","UnityEngine.Rigidbody2D","UnityEngine.Joint2D","UnityEngine.AnchoredJoint2D","UnityEngine.SpringJoint2D","UnityEngine.DistanceJoint2D","UnityEngine.FrictionJoint2D","UnityEngine.HingeJoint2D","UnityEngine.RelativeJoint2D","UnityEngine.SliderJoint2D","UnityEngine.TargetJoint2D","UnityEngine.FixedJoint2D","UnityEngine.WheelJoint2D","UnityEngine.ConstantForce2D","UnityEngine.StreamingController","UnityEngine.Tilemaps.TilemapRenderer","UnityEngine.Tilemaps.Tilemap","UnityEngine.Tilemaps.TilemapCollider2D","UnityEngine.Canvas","CFX_AutoDestructShuriken","UnityEngine.ParticleSystem","CFX_LightFlicker","UnityEngine.Light","CFX_LightIntensityFade","TMPro.TextContainer","TMPro.TextMeshPro","TMPro.TextMeshProUGUI","TMPro.TMP_Dropdown","TMPro.TMP_SelectionCaret","TMPro.TMP_SubMesh","TMPro.TMP_SubMeshUI","TMPro.TMP_Text","UnityEngine.UI.Dropdown","UnityEngine.UI.Graphic","UnityEngine.UI.GraphicRaycaster","UnityEngine.UI.Image","UnityEngine.UI.AspectRatioFitter","UnityEngine.UI.CanvasScaler","UnityEngine.UI.ContentSizeFitter","UnityEngine.UI.GridLayoutGroup","UnityEngine.UI.HorizontalLayoutGroup","UnityEngine.UI.HorizontalOrVerticalLayoutGroup","UnityEngine.UI.LayoutElement","UnityEngine.UI.LayoutGroup","UnityEngine.UI.VerticalLayoutGroup","UnityEngine.UI.Mask","UnityEngine.UI.MaskableGraphic","UnityEngine.UI.RawImage","UnityEngine.UI.RectMask2D","UnityEngine.UI.Scrollbar","UnityEngine.UI.ScrollRect","UnityEngine.UI.Slider","UnityEngine.UI.Toggle","UnityEngine.EventSystems.BaseInputModule","UnityEngine.EventSystems.EventSystem","UnityEngine.EventSystems.PointerInputModule","UnityEngine.EventSystems.StandaloneInputModule","UnityEngine.EventSystems.TouchInputModule","UnityEngine.EventSystems.Physics2DRaycaster","UnityEngine.EventSystems.PhysicsRaycaster"]

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

Deserializers.runtimeAnalysisExcludedClassesCount = "1719";

Deserializers.runtimeAnalysisExcludedMethodsCount = "4545";

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

Deserializers.buildID = "57d1ffe4-60c5-4748-b03a-27f625346f68";

Deserializers.runtimeInitializeOnLoadInfos = [[["UnityEditor","Recorder","RecorderWindow","RuntimeInit"],["UnityEngine","Experimental","Rendering","ScriptableRuntimeReflectionSystemSettings","ScriptingDirtyReflectionSystemInstance"]],[["UnityEngine","AI","NavMesh","ClearPreUpdateListeners"]],[["$BurstDirectCallInitializer","Initialize"]],[],[]];

Deserializers.typeNameToIdMap = function(){ var i = 0; return Deserializers.types.reduce( function( res, item ) { res[ item ] = i++; return res; }, {} ) }()

