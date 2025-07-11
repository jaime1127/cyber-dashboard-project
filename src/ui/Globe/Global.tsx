"use client";

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";
import type { GlobeMethods } from "react-globe.gl";

// Country label data with lat/lng
const labelsData = [
  { id: 1, country: "china", lat: 35.8617, lng: 104.1954, text: "China" },
  { id: 2, country: "russia", lat: 61.524, lng: 105.3188, text: "Russia" },
  { id: 3, country: "india", lat: 20.5937, lng: 78.9629, text: "India" },
  { id: 4, country: "germany", lat: 51.1657, lng: 10.4515, text: "Germany" },
  { id: 5, country: "pakistan", lat: 30.3753, lng: 69.3451, text: "Pakistan" },
];

export default function DayNightGlobe() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  useEffect(() => {
    if (!globeEl.current) return;

    // Auto-rotate
    globeEl.current.controls().autoRotate = true;
    globeEl.current.controls().autoRotateSpeed = 0.4;

    // Add clouds
    const CLOUDS_IMG_URL =
      "https://raw.githubusercontent.com/vasturiano/globe.gl/master/example/clouds/clouds.png";
    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(100.5, 75, 75),
        new THREE.MeshPhongMaterial({
          map: cloudsTexture,
          transparent: true,
          opacity: 0.4,
        })
      );
      clouds.name = "clouds";
      if (globeEl.current) {
        globeEl.current.scene().add(clouds);
      }
    });

    // Cleanup
    return () => {
      if (globeEl.current) {
        const scene = globeEl.current.scene();
        const clouds = scene.getObjectByName("clouds");
        if (clouds) scene.remove(clouds);
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Globe
        ref={globeEl}
        width={1400}
        height={1000}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl={
          "https://unpkg.com/three-globe/example/img/night-sky.png"
        }
        backgroundColor="#000011"
        labelsData={labelsData}
        labelColor={() => "#FFA500"}
        labelSize={2}
        labelDotRadius={2}
        labelAltitude={0.01}
      />
    </div>
  );
}
