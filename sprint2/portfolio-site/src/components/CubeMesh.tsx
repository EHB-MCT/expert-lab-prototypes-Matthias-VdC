import Cube from "./Cube";
import { useTexture } from "@react-three/drei";
import tile from "../assets/backgroundTile.jpg";

export default function CubeMesh() {
  const tileTexture = useTexture(tile);
  console.log();
  const rows = [];
  let count = 0;
  for (let i = 0; i < 18; i++) {
    for (let j = 0; j < Math.ceil(window.innerWidth / 50); j++) {
      rows.push(
        <Cube
          key={count}
          x={-5 - Math.ceil(window.innerWidth / 100) + j}
          y={4.4 - i}
          z={-1}
          tileTexture={tileTexture}
        ></Cube>
      );
      count++;
    }
  }
  return <>{rows}</>;
}
