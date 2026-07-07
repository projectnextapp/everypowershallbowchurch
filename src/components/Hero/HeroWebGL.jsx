import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { smokeVertexShader, smokeFragmentShader } from './smokeShader';

// Generates a soft radial-gradient sprite for glowing particles.
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, 'rgba(255, 236, 179, 1)');
  gradient.addColorStop(0.4, 'rgba(230, 200, 102, 0.7)');
  gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

const PARTICLE_COUNT = 220;

export default function HeroWebGL({ className }) {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // --- smoke plane ------------------------------------------------------
    // Sized to fill the camera frustum at z = 0 so it always covers the hero.
    const smokeUniforms = { uTime: { value: 0 } };
    const smokeMaterial = new THREE.ShaderMaterial({
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      uniforms: smokeUniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NormalBlending,
    });
    const smokeGeometry = new THREE.PlaneGeometry(1, 1);
    const smokePlane = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smokePlane.position.z = 0;
    smokePlane.renderOrder = 0;
    scene.add(smokePlane);

    function fitSmokePlane() {
      const distance = camera.position.z - smokePlane.position.z;
      const vFov = (camera.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFov / 2) * distance;
      const width = height * camera.aspect;
      smokePlane.scale.set(width, height, 1);
    }

    // --- particle field -------------------------------------------------
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const sways = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      speeds[i] = 0.4 + Math.random() * 1.1;
      sways[i] = Math.random() * Math.PI * 2;
      sizes[i] = 0.35 + Math.random() * 0.9;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const glowTexture = makeGlowTexture();

    const material = new THREE.PointsMaterial({
      size: 0.9,
      map: glowTexture,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color('#e8c765'),
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    points.renderOrder = 1;
    scene.add(points);

    // a few larger, brighter "ember" particles
    const emberCount = 18;
    const emberPositions = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 30;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 + 4;
    }
    const emberGeometry = new THREE.BufferGeometry();
    emberGeometry.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMaterial = new THREE.PointsMaterial({
      size: 2.2,
      map: glowTexture,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: new THREE.Color('#fff1c4'),
      sizeAttenuation: true,
    });
    const embers = new THREE.Points(emberGeometry, emberMaterial);
    embers.renderOrder = 2;
    scene.add(embers);

    function resize() {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      fitSmokePlane();
    }
    resize();
    window.addEventListener('resize', resize);

    function onPointerMove(e) {
      const rect = mount.getBoundingClientRect();
      mouseRef.current.targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }
    window.addEventListener('pointermove', onPointerMove);

    const clock = new THREE.Clock();
    let rafId;

    function animate() {
      const t = clock.getElapsedTime();

      smokeUniforms.uTime.value = t;

      const posAttr = geometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        let y = posAttr.array[idx + 1] + speeds[i] * 0.01;
        if (y > 12) y = -12;
        posAttr.array[idx + 1] = y;
        posAttr.array[idx] += Math.sin(t * 0.5 + sways[i]) * 0.003;
      }
      posAttr.needsUpdate = true;

      const emberAttr = emberGeometry.attributes.position;
      for (let i = 0; i < emberCount; i++) {
        const idx = i * 3;
        let y = emberAttr.array[idx + 1] + 0.006;
        if (y > 11) y = -11;
        emberAttr.array[idx + 1] = y;
        emberAttr.array[idx] += Math.sin(t * 0.3 + i) * 0.004;
      }
      emberAttr.needsUpdate = true;

      // gentle parallax toward pointer
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;
      camera.position.x = mouseRef.current.x * 1.2;
      camera.position.y = -mouseRef.current.y * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      geometry.dispose();
      material.dispose();
      emberGeometry.dispose();
      emberMaterial.dispose();
      smokeGeometry.dispose();
      smokeMaterial.dispose();
      glowTexture.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
