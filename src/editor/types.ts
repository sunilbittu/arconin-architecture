import * as THREE from 'three';

export type BlockType = 'wall' | 'floor' | 'roof' | 'door' | 'window' | 'stairs' | 'column';

export type EditorMode = 'place' | 'select' | 'delete' | 'orbit';

export interface BuildingBlock {
  id: string;
  type: BlockType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

export interface BlockPreset {
  type: BlockType;
  label: string;
  defaultScale: [number, number, number];
  color: string;
  icon: string;
}

export const BLOCK_PRESETS: Record<BlockType, BlockPreset> = {
  wall: {
    type: 'wall',
    label: 'Wall',
    defaultScale: [2, 3, 0.2],
    color: '#e8e0d4',
    icon: '▬',
  },
  floor: {
    type: 'floor',
    label: 'Floor',
    defaultScale: [4, 0.15, 4],
    color: '#c4b59d',
    icon: '⬜',
  },
  roof: {
    type: 'roof',
    label: 'Roof',
    defaultScale: [4.5, 0.15, 4.5],
    color: '#7a6e5d',
    icon: '△',
  },
  door: {
    type: 'door',
    label: 'Door',
    defaultScale: [1, 2.5, 0.15],
    color: '#8b6f4e',
    icon: '🚪',
  },
  window: {
    type: 'window',
    label: 'Window',
    defaultScale: [1.2, 1.2, 0.1],
    color: '#a8d8ea',
    icon: '⊞',
  },
  stairs: {
    type: 'stairs',
    label: 'Stairs',
    defaultScale: [1.5, 0.3, 2],
    color: '#b0a090',
    icon: '⊿',
  },
  column: {
    type: 'column',
    label: 'Column',
    defaultScale: [0.4, 3, 0.4],
    color: '#d4cfc7',
    icon: '▮',
  },
};

export const GRID_SIZE = 20;
export const GRID_SNAP = 0.5;
