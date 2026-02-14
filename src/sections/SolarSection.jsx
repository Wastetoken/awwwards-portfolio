import { Canvas } from "@react-three/fiber";
import { SolarSystem } from "../components/SolarSystem";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense } from "react";

const SolarSection = () => {
    return (
        <section className="relative flex flex-col justify-center min-h-screen bg-black overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{ position: [223, -500, -35], fov: 35, near: 0.1, far: 20000 }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.6} />
                        <pointLight position={[0, 0, 0]} intensity={5} />

                        <SolarSystem scale={50} position={[0, 0, 0]} />

                        <Environment resolution={1024}>
                            <group rotation={[-Math.PI / 10, 43, 14]}>
                                <Lightformer form="circle" intensity={4} position={[5, -5, -2]} scale={692} />
                                <Lightformer form="circle" intensity={10} position={[22, 0, 2]} scale={50} />
                                <Lightformer form="circle" intensity={30} position={[10, 1, 220]} scale={40} />
                            </group>
                        </Environment>
                    </Suspense>
                </Canvas>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center pointer-events-none mb-40 mix-blend-difference">
                <h2 className="text-white font-eunomia-bold text-5xl md:text-8xl uppercase tracking-[0.3em] mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    The Universe
                </h2>
                <div className="w-20 h-px bg-white/40 mb-6" />
                <p className="text-white font-light tracking-[0.4em] text-xs md:text-sm uppercase">
                    Infinite possibilities in every line of code
                </p>
            </div>
        </section>
    );
};

export default SolarSection;
