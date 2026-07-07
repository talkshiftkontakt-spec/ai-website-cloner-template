"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { cn } from "@/lib/utils";

function MinecraftHead({ textureUrl }: { textureUrl: string }) {
 const meshRef = useRef<THREE.Mesh>(null);
 const texture = useMemo(() => {
 const loader = new THREE.TextureLoader();
 const tex = loader.load(textureUrl);
 tex.magFilter = THREE.NearestFilter;
 tex.minFilter = THREE.NearestFilter;
 tex.colorSpace = THREE.SRGBColorSpace;
 return tex;
 }, [textureUrl]);

 useFrame((_, delta) => {
 if (meshRef.current) {
 meshRef.current.rotation.y += delta * 0.4;
 }
 });

 const materials = useMemo(() => {
 const mat = new THREE.MeshStandardMaterial({ map: texture });
 return Array.from({ length: 6 }, () => mat);
 }, [texture]);

 return (
 <mesh ref={meshRef} material={materials}>
 <boxGeometry args={[1, 1, 1]} />
 </mesh>
 );
}

interface HeadPreview3DCanvasProps {
 textureUrl: string;
 className?: string;
}

export function HeadPreview3DCanvas({
 textureUrl,
 className,
}: HeadPreview3DCanvasProps) {
 return (
 <div
 className={cn(
 "aspect-square overflow-hidden rounded-xl border border-border bg-surface",
 className,
 )}
 >
 <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
 <ambientLight intensity={0.6} />
 <directionalLight position={[5, 5, 5]} intensity={1.2} />
 <directionalLight position={[-3, 2, -2]} intensity={0.4} />
 <MinecraftHead textureUrl={textureUrl} />
 <OrbitControls
 enableZoom={false}
 enablePan={false}
 autoRotate
 autoRotateSpeed={1.5}
 />
 </Canvas>
 </div>
 );
}
