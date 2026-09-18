import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hands, Results } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

interface Props {
  modelPath?: string;
}

export function HandARViewer({ modelPath }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [gestureStatus, setGestureStatus] = useState<string>("Инициализация Three.js...");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const drawerMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current || !containerRef.current) return;

    let cameraUtils: Camera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number;

    // 1. Инициализация Three.js (вынесена отдельно от сетевых запросов)
    try {
      const width = containerRef.current.clientWidth || 640;
      const height = containerRef.current.clientHeight || 480;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111827);

      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 2.5);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Освещение
      const light = new THREE.DirectionalLight(0xffffff, 1.5);
      light.position.set(2, 2, 2);
      scene.add(light);
      scene.add(new THREE.AmbientLight(0xffffff, 0.8));

      // Создание стола
      const tableGroup = new THREE.Group();
      const bodyGeo = new THREE.BoxGeometry(1.2, 0.6, 0.6);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
      const tableBody = new THREE.Mesh(bodyGeo, bodyMat);
      tableGroup.add(tableBody);

      // Ящик
      const drawerGeo = new THREE.BoxGeometry(1.1, 0.25, 0.55);
      const drawerMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
      const drawerMesh = new THREE.Mesh(drawerGeo, drawerMat);
      drawerMesh.position.set(0, 0.1, 0.05);
      drawerMeshRef.current = drawerMesh;
      tableGroup.add(drawerMesh);

      scene.add(tableGroup);

      // Цикл рендеринга
      const renderLoop = () => {
        if (renderer) renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();

      setGestureStatus("Подключение камеры и нейросети...");
    } catch (err) {
      console.error("Ошибка при создании Three.js сцены:", err);
      setErrorMsg(`Ошибка 3D-графики: ${err instanceof Error ? err.message : String(err)}`);
      return;
    }

    // 2. Инициализация MediaPipe и Камеры
        try {
        const hands = new Hands({
            locateFile: (file) => `${import.meta.env.BASE_URL}mediapipe/${file}`,
        });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults((results: Results) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          const landmarks = results.multiHandLandmarks[0];
          const thumb = landmarks[4];
          const index = landmarks[8];

          const distance = Math.hypot(
            thumb.x - index.x,
            thumb.y - index.y,
            thumb.z - index.z
          );

          if (distance < 0.08) {
            setGestureStatus("🟢 Захват (Ящик открывается)");
            if (drawerMeshRef.current && drawerMeshRef.current.position.z < 0.45) {
              drawerMeshRef.current.position.z += 0.02;
            }
          } else {
            setGestureStatus("🟡 Ладонь открыта (Ящик закрывается)");
            if (drawerMeshRef.current && drawerMeshRef.current.position.z > 0.05) {
              drawerMeshRef.current.position.z -= 0.02;
            }
          }
        } else {
          setGestureStatus("👋 Покажите руку в камеру");
        }
      });

      if (videoRef.current) {
        cameraUtils = new Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await hands.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        cameraUtils
          .start()
          .then(() => setGestureStatus("Камера готова. Покажите руку"))
          .catch((err) => {
            console.error("Ошибка запуска камеры:", err);
            setErrorMsg("Разрешите доступ к веб-камере в браузере.");
          });
      }
    } catch (err) {
      console.error("Ошибка загрузки MediaPipe:", err);
      setErrorMsg("Ошибка загрузки нейросети MediaPipe (проверьте интернет-соединение).");
    }

    return () => {
      if (cameraUtils) cameraUtils.stop();
      if (renderer) renderer.dispose();
      cancelAnimationFrame(animationFrameId);
    };
  }, [modelPath]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        background: "#111827",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      <video ref={videoRef} style={{ display: "none" }} playsInline muted />
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "rgba(0, 0, 0, 0.75)",
          color: "#fff",
          padding: "10px 16px",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        {gestureStatus}
      </div>

      {errorMsg && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          {errorMsg}
        </div>
      )}
    </div>
  );
}