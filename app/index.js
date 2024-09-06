import Head from 'next/head';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Home() {
  const mountRef = useRef(null);

  useEffect(() => {
    let camera, scene, renderer;
    let geometry, material, mesh;

    function init() {
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
      camera.position.z = 1;

      scene = new THREE.Scene();

      geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      material = new THREE.MeshNormalMaterial();

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
    }

    function animate() {
      requestAnimationFrame(animate);

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.02;

      renderer.render(scene, camera);
    }

    init();
    animate();

    return () => {
      // Cleanup code if necessary
    };
  }, []);

  return (
    <div>
      <Head>
        <title>Hello World</title>
        <meta name="description" content="A basic Next.js application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Hello World</h1>
        <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>
      </main>
    </div>
  );
}
