import profileImg from "../assets/profile.jpg";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

export default function ProfileImage(props: any) {
  const imageTexture = useTexture(profileImg);
  const ref = useRef<any>();

  useFrame(() => {
    if (ref.current) {
      gsap.to(ref.current.rotation, {
        x: Math.PI * 2,
        y: 0,
        duration: 2,
        repeat: Infinity,
        yoyo: true,
      });
    }
  });

  return (
    <>
      <group {...props} ref={ref}>
        <mesh>
          <planeGeometry args={[2, 2.75, 2]} />
          <meshStandardMaterial map={imageTexture} />
        </mesh>
        <mesh rotation={[Math.PI, 0, 0]}>
          <planeGeometry args={[2, 2.75, 2]} />
          <meshStandardMaterial map={imageTexture} />
        </mesh>
      </group>
    </>
  );
}
