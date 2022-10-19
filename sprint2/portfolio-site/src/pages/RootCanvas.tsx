import {
  OrbitControls,
  Scroll,
  ScrollControls,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CubeMesh from "../components/CubeMesh";
import ProfileImage from "../components/ProfileImage";

export default function RootCanvas() {
  return (
    <Canvas id="root">
      <Suspense>
        <ScrollControls pages={2} damping={4}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {/* <OrbitControls /> */}

          <Scroll>
            <CubeMesh />
            <ProfileImage position={[-4.5, 0, 0]} />
          </Scroll>

          {/* <Stats /> */}
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
