import { create } from 'zustand';
import { BlockType, BuildingBlock, EditorMode, BLOCK_PRESETS, GRID_SNAP } from './types';

let idCounter = 0;
const generateId = () => `block-${++idCounter}-${Date.now()}`;

interface EditorState {
  blocks: BuildingBlock[];
  selectedBlockId: string | null;
  mode: EditorMode;
  activeBlockType: BlockType;
  ghostPosition: [number, number, number] | null;
  rotationY: number;
  showGrid: boolean;
  undoStack: BuildingBlock[][];
  redoStack: BuildingBlock[][];

  setMode: (mode: EditorMode) => void;
  setActiveBlockType: (type: BlockType) => void;
  setGhostPosition: (pos: [number, number, number] | null) => void;
  setSelectedBlockId: (id: string | null) => void;
  rotateBlock: () => void;
  placeBlock: (position: [number, number, number]) => void;
  deleteBlock: (id: string) => void;
  deleteSelected: () => void;
  updateBlockColor: (id: string, color: string) => void;
  clearAll: () => void;
  undo: () => void;
  redo: () => void;
  toggleGrid: () => void;
}

function snapToGrid(value: number): number {
  return Math.round(value / GRID_SNAP) * GRID_SNAP;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  mode: 'place',
  activeBlockType: 'floor',
  ghostPosition: null,
  rotationY: 0,
  showGrid: true,
  undoStack: [],
  redoStack: [],

  setMode: (mode) => set({ mode, selectedBlockId: mode !== 'select' ? null : get().selectedBlockId }),

  setActiveBlockType: (type) => set({ activeBlockType: type, mode: 'place' }),

  setGhostPosition: (pos) => set({
    ghostPosition: pos ? [snapToGrid(pos[0]), snapToGrid(pos[1]), snapToGrid(pos[2])] : null,
  }),

  setSelectedBlockId: (id) => set({ selectedBlockId: id }),

  rotateBlock: () => set((s) => ({ rotationY: (s.rotationY + Math.PI / 2) % (Math.PI * 2) })),

  placeBlock: (position) => {
    const state = get();
    const preset = BLOCK_PRESETS[state.activeBlockType];
    const snapped: [number, number, number] = [
      snapToGrid(position[0]),
      snapToGrid(position[1]),
      snapToGrid(position[2]),
    ];

    const block: BuildingBlock = {
      id: generateId(),
      type: state.activeBlockType,
      position: snapped,
      rotation: [0, state.rotationY, 0],
      scale: [...preset.defaultScale],
      color: preset.color,
    };

    set((s) => ({
      blocks: [...s.blocks, block],
      undoStack: [...s.undoStack, s.blocks],
      redoStack: [],
    }));
  },

  deleteBlock: (id) =>
    set((s) => ({
      blocks: s.blocks.filter((b) => b.id !== id),
      selectedBlockId: s.selectedBlockId === id ? null : s.selectedBlockId,
      undoStack: [...s.undoStack, s.blocks],
      redoStack: [],
    })),

  deleteSelected: () => {
    const { selectedBlockId } = get();
    if (selectedBlockId) get().deleteBlock(selectedBlockId);
  },

  updateBlockColor: (id, color) =>
    set((s) => ({
      blocks: s.blocks.map((b) => (b.id === id ? { ...b, color } : b)),
    })),

  clearAll: () =>
    set((s) => ({
      blocks: [],
      selectedBlockId: null,
      undoStack: [...s.undoStack, s.blocks],
      redoStack: [],
    })),

  undo: () =>
    set((s) => {
      if (s.undoStack.length === 0) return s;
      const prev = s.undoStack[s.undoStack.length - 1];
      return {
        blocks: prev,
        undoStack: s.undoStack.slice(0, -1),
        redoStack: [...s.redoStack, s.blocks],
        selectedBlockId: null,
      };
    }),

  redo: () =>
    set((s) => {
      if (s.redoStack.length === 0) return s;
      const next = s.redoStack[s.redoStack.length - 1];
      return {
        blocks: next,
        redoStack: s.redoStack.slice(0, -1),
        undoStack: [...s.undoStack, s.blocks],
        selectedBlockId: null,
      };
    }),

  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),
}));
