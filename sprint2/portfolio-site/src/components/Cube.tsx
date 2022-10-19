import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function Cube(args: any) {
  const ref = useRef<any>();
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (hovered && ref.current.position.z <= -0.51) {
      ref.current.position.z += 0.01;
    } else if (!hovered && ref.current.position.z > -0.7) {
      ref.current.position.z -= 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      position={[args.x, args.y, args.z]}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxGeometry scale={[50, 50, 50]} />
      <meshStandardMaterial map={args.tileTexture} />
    </mesh>
  );
}
