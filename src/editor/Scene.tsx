import React, { useRef, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useEditorStore } from './store';
import { BLOCK_PRESETS, GRID_SIZE, BlockType } from './types';

function BlockMesh({
  id,
  type,
  position,
  rotation,
  scale,
  color,
}: {
  id: string;
  type: BlockType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mode, selectedBlockId, setSelectedBlockId, deleteBlock } = useEditorStore();
  const isSelected = selectedBlockId === id;

  const handleClick = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (mode === 'select') {
      setSelectedBlockId(isSelected ? null : id);
    } else if (mode === 'delete') {
      deleteBlock(id);
    }
  };

  const geometry = useMemo(() => {
    switch (type) {
      case 'column':
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
      case 'roof':
        return new THREE.ConeGeometry(0.7, 1, 4);
      case 'stairs': {
        const group = new THREE.BoxGeometry(1, 1, 1);
        return group;
      }
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [type]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={scale}
      geometry={geometry}
      onClick={handleClick as any}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (mode === 'select' || mode === 'delete') {
          document.body.style.cursor = mode === 'delete' ? 'crosshair' : 'pointer';
        }
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={isSelected ? '#1978e5' : color}
        transparent={type === 'window'}
        opacity={type === 'window' ? 0.5 : 1}
        roughness={type === 'window' ? 0.1 : 0.7}
        metalness={type === 'window' ? 0.3 : 0.05}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[geometry]} />
          <lineBasicMaterial color="#1978e5" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
}

function GhostBlock() {
  const { ghostPosition, activeBlockType, rotationY, mode } = useEditorStore();

  if (!ghostPosition || mode !== 'place') return null;

  const preset = BLOCK_PRESETS[activeBlockType];

  const geometry = useMemo(() => {
    switch (activeBlockType) {
      case 'column':
        return new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
      case 'roof':
        return new THREE.ConeGeometry(0.7, 1, 4);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [activeBlockType]);

  return (
    <mesh
      position={ghostPosition}
      rotation={[0, rotationY, 0]}
      scale={preset.defaultScale}
      geometry={geometry}
    >
      <meshStandardMaterial
        color={preset.color}
        transparent
        opacity={0.4}
        depthWrite={false}
      />
    </mesh>
  );
}

function GroundPlane() {
  const { mode, placeBlock, setGhostPosition } = useEditorStore();

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      onPointerMove={(e) => {
        if (mode === 'place') {
          e.stopPropagation();
          const { activeBlockType } = useEditorStore.getState();
          const preset = BLOCK_PRESETS[activeBlockType];
          setGhostPosition([e.point.x, preset.defaultScale[1] / 2, e.point.z]);
        }
      }}
      onPointerOut={() => setGhostPosition(null)}
      onClick={(e) => {
        if (mode === 'place') {
          e.stopPropagation();
          const { activeBlockType } = useEditorStore.getState();
          const preset = BLOCK_PRESETS[activeBlockType];
          placeBlock([e.point.x, preset.defaultScale[1] / 2, e.point.z]);
        }
      }}
    >
      <planeGeometry args={[GRID_SIZE * 2, GRID_SIZE * 2]} />
      <meshStandardMaterial color="#f0ece4" transparent opacity={0.3} />
    </mesh>
  );
}

function EditorGrid() {
  const { showGrid } = useEditorStore();
  if (!showGrid) return null;

  return (
    <Grid
      args={[GRID_SIZE * 2, GRID_SIZE * 2]}
      cellSize={0.5}
      cellThickness={0.5}
      cellColor="#c0c0c0"
      sectionSize={2}
      sectionThickness={1}
      sectionColor="#808080"
      fadeDistance={30}
      fadeStrength={1}
      position={[0, 0.001, 0]}
      infiniteGrid
    />
  );
}

export default function EditorScene() {
  const { blocks, mode } = useEditorStore();

  return (
    <Canvas
      shadows
      camera={{ position: [12, 10, 12], fov: 50 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'linear-gradient(180deg, #e8edf5 0%, #d0d8e8 100%)' }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <hemisphereLight args={['#b1e1ff', '#b97a20', 0.3]} />

      <EditorGrid />
      <GroundPlane />

      {blocks.map((block) => (
        <BlockMesh key={block.id} {...block} />
      ))}

      <GhostBlock />

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.4}
        scale={40}
        blur={2}
        far={10}
      />

      <OrbitControls
        makeDefault
        enablePan
        enableRotate={mode === 'orbit' || mode === 'select'}
        enableZoom
        maxPolarAngle={Math.PI / 2.1}
        minDistance={3}
        maxDistance={50}
        mouseButtons={{
          LEFT: mode === 'orbit' ? THREE.MOUSE.ROTATE : undefined as any,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
      />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport labelColor="white" axisHeadScale={1} />
      </GizmoHelper>

      <Environment preset="city" />
    </Canvas>
  );
}
