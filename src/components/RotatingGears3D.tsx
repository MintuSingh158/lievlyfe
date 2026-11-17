"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RotatingGears3D({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let isDisposed = false;

    // Dimensions
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 140;

    // 1. Scene
    const scene = new THREE.Scene();

    // 2. Camera: Exact ~32° isometric perspective matching reference photo
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 3.2, 5.6);
    camera.lookAt(0, -0.06, 0);

    // 3. WebGL Renderer with full alpha transparency
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 4. STUDIO ENVIRONMENT MAP: Essential for photorealistic metal reflections!
    // Creates realistic softbox studio reflections on all gold surfaces
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();

    // Dark moody studio backdrop
    const envBgGeo = new THREE.SphereGeometry(25, 16, 16);
    const envBgMat = new THREE.MeshBasicMaterial({
      color: 0x120e06,
      side: THREE.BackSide,
    });
    envScene.add(new THREE.Mesh(envBgGeo, envBgMat));

    // Large top softbox (white-hot diffuse highlight across horizontal gear rims)
    const topSoftboxGeo = new THREE.PlaneGeometry(16, 16);
    const topSoftboxMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topSoftbox = new THREE.Mesh(topSoftboxGeo, topSoftboxMat);
    topSoftbox.position.set(0, 12, 2);
    topSoftbox.rotation.x = Math.PI / 2;
    envScene.add(topSoftbox);

    // Bright front-right strip light (sharp specular streaks along tooth faces)
    const rightStripGeo = new THREE.PlaneGeometry(5, 18);
    const rightStripMat = new THREE.MeshBasicMaterial({ color: 0xfffaea });
    const rightStrip = new THREE.Mesh(rightStripGeo, rightStripMat);
    rightStrip.position.set(12, 6, 10);
    rightStrip.lookAt(0, 0, 0);
    envScene.add(rightStrip);

    // Warm golden front-left strip light (rich gold reflection)
    const leftStripGeo = new THREE.PlaneGeometry(6, 18);
    const leftStripMat = new THREE.MeshBasicMaterial({ color: 0xffd978 });
    const leftStrip = new THREE.Mesh(leftStripGeo, leftStripMat);
    leftStrip.position.set(-12, 5, 8);
    leftStrip.lookAt(0, 0, 0);
    envScene.add(leftStrip);

    // Back rim light (razor-sharp edge glints)
    const backRimGeo = new THREE.PlaneGeometry(16, 6);
    const backRimMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const backRim = new THREE.Mesh(backRimGeo, backRimMat);
    backRim.position.set(0, 10, -14);
    backRim.lookAt(0, 0, 0);
    envScene.add(backRim);

    // Bottom bounce panel (warms crevices)
    const bottomBounceGeo = new THREE.PlaneGeometry(12, 12);
    const bottomBounceMat = new THREE.MeshBasicMaterial({ color: 0x8a5812 });
    const bottomBounce = new THREE.Mesh(bottomBounceGeo, bottomBounceMat);
    bottomBounce.position.set(0, -10, 0);
    bottomBounce.rotation.x = -Math.PI / 2;
    envScene.add(bottomBounce);

    const envMap = pmremGenerator.fromScene(envScene);
    scene.environment = envMap.texture;

    // 5. Direct Scene Lights for physical shading
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 4.0);
    keyLight.position.set(6, 10, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xedf4ff, 1.8);
    fillLight.position.set(-7, 5, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffe699, 3.5);
    rimLight.position.set(0, 9, -7);
    scene.add(rimLight);

    // 6. Photorealistic Watchmaker Materials (MeshPhysicalMaterial)
    const goldTierMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xebb236,
      metalness: 0.98,
      roughness: 0.16,
      clearcoat: 0.35,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    const goldTopMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5c74e,
      metalness: 0.96,
      roughness: 0.13,
      clearcoat: 0.45,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
    });

    const darkCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x4a3208,
      metalness: 0.95,
      roughness: 0.38,
    });

    const strutMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xdba228,
      metalness: 0.98,
      roughness: 0.18,
    });

    // 7. REALISTIC INVOLUTE / TAPERED GEAR SHAPE GENERATOR
    // Real mechanical gears have tapered teeth (wider base, narrower tip) with rounded bevels!
    function createRealGearShape(
      teeth: number,
      outerR: number,
      innerR: number,
      rootR: number
    ): THREE.Shape {
      const shape = new THREE.Shape();
      const step = (Math.PI * 2) / teeth;
      // Base tooth width is ~42% of tooth pitch, tip is ~26% of tooth pitch (tapered!)
      const baseHalfWidth = step * 0.22;
      const tipHalfWidth = step * 0.14;
      const rootFlank = step * 0.05;

      for (let i = 0; i < teeth; i++) {
        const a = i * step;

        // Root fillet left
        const r1x = rootR * Math.cos(a - baseHalfWidth - rootFlank);
        const r1y = rootR * Math.sin(a - baseHalfWidth - rootFlank);

        // Tooth base left
        const b1x = innerR * Math.cos(a - baseHalfWidth);
        const b1y = innerR * Math.sin(a - baseHalfWidth);

        // Tooth tip left (tapered inward!)
        const t1x = outerR * Math.cos(a - tipHalfWidth);
        const t1y = outerR * Math.sin(a - tipHalfWidth);

        // Tooth tip right
        const t2x = outerR * Math.cos(a + tipHalfWidth);
        const t2y = outerR * Math.sin(a + tipHalfWidth);

        // Tooth base right
        const b2x = innerR * Math.cos(a + baseHalfWidth);
        const b2y = innerR * Math.sin(a + baseHalfWidth);

        // Root fillet right
        const r2x = rootR * Math.cos(a + baseHalfWidth + rootFlank);
        const r2y = rootR * Math.sin(a + baseHalfWidth + rootFlank);

        if (i === 0) shape.moveTo(r1x, r1y);
        else shape.lineTo(r1x, r1y);

        shape.lineTo(b1x, b1y);
        shape.lineTo(t1x, t1y);
        shape.lineTo(t2x, t2y);
        shape.lineTo(b2x, b2y);
        shape.lineTo(r2x, r2y);
      }
      shape.closePath();
      return shape;
    }

    // 8. ASSEMBLE PHOTOREALISTIC CASSETTE CLUSTER
    const masterAssembly = new THREE.Group();
    masterAssembly.scale.set(0.96, 0.96, 0.96);
    scene.add(masterAssembly);

    // =========================================================================
    // TIER 1 (BOTTOM GEAR CLUSTER): 32 tapered teeth, widest base
    // =========================================================================
    const bottomGroup = new THREE.Group();
    masterAssembly.add(bottomGroup);

    const shapeBottom = createRealGearShape(32, 2.24, 1.88, 1.84);
    const bottomHole = new THREE.Path();
    bottomHole.absarc(0, 0, 0.44, 0, Math.PI * 2, true);
    shapeBottom.holes.push(bottomHole);

    const geoBottom = new THREE.ExtrudeGeometry(shapeBottom, {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    });
    geoBottom.center();

    const meshBottom = new THREE.Mesh(geoBottom, goldTierMaterial);
    meshBottom.rotation.x = Math.PI / 2;
    meshBottom.position.y = -0.56;
    bottomGroup.add(meshBottom);

    // Bottom raised rim ring
    const bottomFlangeGeo = new THREE.TorusGeometry(1.82, 0.045, 14, 48);
    const bottomFlange = new THREE.Mesh(bottomFlangeGeo, goldTopMaterial);
    bottomFlange.rotation.x = Math.PI / 2;
    bottomFlange.position.y = -0.38;
    bottomGroup.add(bottomFlange);

    // Bottom dark core hub
    const bottomCoreGeo = new THREE.CylinderGeometry(1.56, 1.56, 0.26, 36);
    const bottomCore = new THREE.Mesh(bottomCoreGeo, darkCoreMaterial);
    bottomCore.position.y = -0.40;
    bottomGroup.add(bottomCore);

    // 12 Vertical support struts inside bottom gap
    const strutGeo = new THREE.BoxGeometry(0.08, 0.24, 0.16);
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI * 2) / 12;
      const strut = new THREE.Mesh(strutGeo, strutMaterial);
      strut.position.set(1.48 * Math.cos(a), -0.38, 1.48 * Math.sin(a));
      strut.rotation.y = -a;
      bottomGroup.add(strut);
    }

    // =========================================================================
    // TIER 2 (MIDDLE GEAR CLUSTER): 26 tapered teeth, medium diameter
    // =========================================================================
    const middleGroup = new THREE.Group();
    masterAssembly.add(middleGroup);

    const shapeMiddle = createRealGearShape(26, 1.94, 1.60, 1.56);
    const middleHole = new THREE.Path();
    middleHole.absarc(0, 0, 0.42, 0, Math.PI * 2, true);
    shapeMiddle.holes.push(middleHole);

    const geoMiddle = new THREE.ExtrudeGeometry(shapeMiddle, {
      depth: 0.30,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    });
    geoMiddle.center();

    const meshMiddle = new THREE.Mesh(geoMiddle, goldTierMaterial);
    meshMiddle.rotation.x = Math.PI / 2;
    meshMiddle.position.y = -0.10;
    middleGroup.add(meshMiddle);

    // Middle raised rim ring
    const middleFlangeGeo = new THREE.TorusGeometry(1.54, 0.045, 14, 44);
    const middleFlange = new THREE.Mesh(middleFlangeGeo, goldTopMaterial);
    middleFlange.rotation.x = Math.PI / 2;
    middleFlange.position.y = 0.07;
    middleGroup.add(middleFlange);

    // Middle core cylinder
    const middleCoreGeo = new THREE.CylinderGeometry(1.28, 1.28, 0.24, 32);
    const middleCore = new THREE.Mesh(middleCoreGeo, darkCoreMaterial);
    middleCore.position.y = 0.05;
    middleGroup.add(middleCore);

    // 10 Vertical support struts inside middle gap
    for (let i = 0; i < 10; i++) {
      const a = (i * Math.PI * 2) / 10;
      const strut = new THREE.Mesh(strutGeo, strutMaterial);
      strut.position.set(1.22 * Math.cos(a), 0.09, 1.22 * Math.sin(a));
      strut.rotation.y = -a;
      middleGroup.add(strut);
    }

    // =========================================================================
    // TIER 3 (TOP GEAR CLUSTER): 18 tapered teeth + 4 skeletonized curved windows
    // =========================================================================
    const topGroup = new THREE.Group();
    masterAssembly.add(topGroup);

    const shapeTop = createRealGearShape(18, 1.52, 1.22, 1.18);

    // Center Axle Hole
    const topCenterHole = new THREE.Path();
    topCenterHole.absarc(0, 0, 0.32, 0, Math.PI * 2, true);
    shapeTop.holes.push(topCenterHole);

    // 4 Curved Kidney Spoke Windows with rounded corners
    for (let i = 0; i < 4; i++) {
      const startAngle = i * (Math.PI / 2) + 0.18;
      const endAngle = (i + 1) * (Math.PI / 2) - 0.18;
      const hole = new THREE.Path();
      hole.absarc(0, 0, 0.96, startAngle, endAngle, false);
      hole.lineTo(0.54 * Math.cos(endAngle), 0.54 * Math.sin(endAngle));
      hole.absarc(0, 0, 0.54, endAngle, startAngle, true);
      hole.closePath();
      shapeTop.holes.push(hole);
    }

    const geoTop = new THREE.ExtrudeGeometry(shapeTop, {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    geoTop.center();

    const meshTop = new THREE.Mesh(geoTop, goldTopMaterial);
    meshTop.rotation.x = Math.PI / 2;
    meshTop.position.y = 0.34;
    topGroup.add(meshTop);

    // Top Rim Bevel Ring
    const topRimGeo = new THREE.TorusGeometry(1.02, 0.045, 14, 40);
    const topRim = new THREE.Mesh(topRimGeo, goldTierMaterial);
    topRim.rotation.x = Math.PI / 2;
    topRim.position.y = 0.49;
    topGroup.add(topRim);

    // Center Hub Bushing / Brass Ring
    const hubBushingGeo = new THREE.TorusGeometry(0.34, 0.055, 16, 32);
    const hubBushing = new THREE.Mesh(hubBushingGeo, goldTopMaterial);
    hubBushing.rotation.x = Math.PI / 2;
    hubBushing.position.y = 0.50;
    topGroup.add(hubBushing);

    // Center axle bore
    const axleGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.28, 24);
    const axleMesh = new THREE.Mesh(axleGeo, darkCoreMaterial);
    axleMesh.position.y = 0.42;
    topGroup.add(axleMesh);

    // Ground Contact Shadow
    const shadowGeo = new THREE.CircleGeometry(2.1, 36);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x14141e,
      transparent: true,
      opacity: 0.26,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.74;
    masterAssembly.add(shadowMesh);

    // =========================================================================
    // 9. ANIMATION LOOP: SLOW INDEPENDENT SPEEDS
    // =========================================================================
    const speedBottom = 0.0014;  // Slow Clockwise (~115s per rotation)
    const speedMiddle = -0.0009; // Very Slow Counter-Clockwise (~180s per rotation)
    const speedTop = 0.0020;     // Slow Clockwise (~80s per rotation)

    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      bottomGroup.rotation.y += speedBottom;
      middleGroup.rotation.y += speedMiddle;
      topGroup.rotation.y += speedTop;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || 240;
      const newH = container.clientHeight || 140;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      pmremGenerator.dispose();
      envMap.dispose();

      envBgGeo.dispose();
      envBgMat.dispose();
      topSoftboxGeo.dispose();
      topSoftboxMat.dispose();
      rightStripGeo.dispose();
      rightStripMat.dispose();
      leftStripGeo.dispose();
      leftStripMat.dispose();
      backRimGeo.dispose();
      backRimMat.dispose();
      bottomBounceGeo.dispose();
      bottomBounceMat.dispose();

      geoBottom.dispose();
      bottomFlangeGeo.dispose();
      bottomCoreGeo.dispose();
      strutGeo.dispose();
      geoMiddle.dispose();
      middleFlangeGeo.dispose();
      middleCoreGeo.dispose();
      geoTop.dispose();
      topRimGeo.dispose();
      hubBushingGeo.dispose();
      axleGeo.dispose();
      shadowGeo.dispose();
      goldTierMaterial.dispose();
      goldTopMaterial.dispose();
      darkCoreMaterial.dispose();
      strutMaterial.dispose();
      shadowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center overflow-visible select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full object-contain pointer-events-none" />
    </div>
  );
}
