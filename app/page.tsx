import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Head from 'next/head';

const Page: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let geometry: THREE.BoxGeometry;
    let material: THREE.MeshNormalMaterial;
    let mesh: THREE.Mesh;

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
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      if (mesh) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
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
        <title>Three.js with Next.js</title>
        <meta name="description" content="A Three.js application in Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Three.js with Next.js</h1>
        <div ref={mountRef} style={{ width: '100vw', height: '100vh' }}></div>
      </main>
    </div>
  );
};

export default Page;
