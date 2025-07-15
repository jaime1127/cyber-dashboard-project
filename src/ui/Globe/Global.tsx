"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";
import * as THREE from "three";

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  } as T;
}

export default function DayNightGlobe() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [containerRef, { width, height }] = useContainerSize();

  const labelsData = useMemo(
    () => [
      { id: 1, country: "china", lat: 35.8617, lng: 104.1954, text: "China" },
      { id: 2, country: "russia", lat: 61.524, lng: 105.3188, text: "Russia" },
      { id: 3, country: "india", lat: 20.5937, lng: 78.9629, text: "India" },
      {
        id: 4,
        country: "germany",
        lat: 51.1657,
        lng: 10.4515,
        text: "Germany",
      },
      {
        id: 5,
        country: "pakistan",
        lat: 30.3753,
        lng: 69.3451,
        text: "Pakistan",
      },
    ],
    []
  );

  const arcsData = useMemo(
    () =>
      labelsData.map((label) => ({
        startLat: label.lat,
        startLng: label.lng,
        endLat: 27.9506,
        endLng: -82.4572,
      })),
    [labelsData]
  );

  // Responsive container size hook
  function useContainerSize() {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 300, height: 300 });

    useEffect(() => {
      const updateSize = () => {
        if (ref.current) {
          setSize({
            width: ref.current.offsetWidth,
            height: ref.current.offsetHeight,
          });
        }
      };

      const debounceUpdateSize = debounce(updateSize, 200);
      updateSize();
      window.addEventListener("resize", debounceUpdateSize);
      return () => window.removeEventListener("resize", debounceUpdateSize);
    }, []);

    return [ref, size] as const;
  }

  useEffect(() => {
    const currentGlobeEl = globeEl.current;
    if (!currentGlobeEl) return;

    // Auto-rotate
    const controls = currentGlobeEl.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4;
      controls.enableZoom = false;
    }

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
      currentGlobeEl.scene().add(clouds);
    });

    // Cleanup
    return () => {
      if (currentGlobeEl) {
        const scene = currentGlobeEl.scene();
        const clouds = scene.getObjectByName("clouds");
        if (clouds) scene.remove(clouds);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-lvh">
      <Globe
        ref={globeEl}
        width={width}
        height={height}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="https://unpkg.com/three-globe/example/img/night-sky.png"
        backgroundColor="#000011"
        labelsData={labelsData}
        labelColor={() => "#FFA500"}
        labelSize={2}
        labelDotRadius={2}
        labelAltitude={0.01}
        globeOffset={[0, -100]}
        arcsData={arcsData}
        arcColor={["#FF0000", "#0000FF"]}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
      />
    </div>
  );
}
