import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { Suspense } from "react";
const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;
  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"Portfolio"}
        title={"Patrick Dunn"}
        text={text}
        textColor={"text-white"}
        blendMode={true}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [23, 1, 5], fov: 25, near: 2.1, far: 50 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.25} />
            <Float speed={0.5}>
              <Planet scale={isMobile ? 0.9 : 2.5} />
            </Float>
            <Environment resolution={1080}>
              <group rotation={[-Math.PI / 30, 4, 71]}>
                <Lightformer
                  form={"circle"}
                  intensity={1.001}
                  position={[0, 1, -2]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={0.01}
                  position={[0, 3, 1]}
                  scale={4}
                />
                <Lightformer
                  form={"circle"}
                  intensity={0.01}
                  position={[-5, -1, -1]}
                  scale={2}
                />
                <Lightformer
                  form={"circle"}
                  intensity={20}
                  position={[10, 1, 20]}
                  scale={25}
                />
              </group>
            </Environment>
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

export default Hero;
