import React from 'react';
import { useEditorStore } from './store';
import { BLOCK_PRESETS, BlockType, EditorMode } from './types';

const MODE_BUTTONS: { mode: EditorMode; label: string; icon: string; shortcut: string }[] = [
  { mode: 'place', label: 'Place', icon: '✚', shortcut: 'P' },
  { mode: 'select', label: 'Select', icon: '◇', shortcut: 'S' },
  { mode: 'delete', label: 'Delete', icon: '✕', shortcut: 'D' },
  { mode: 'orbit', label: 'Orbit', icon: '◎', shortcut: 'O' },
];

export default function Toolbar() {
  const {
    mode,
    setMode,
    activeBlockType,
    setActiveBlockType,
    rotateBlock,
    undo,
    redo,
    clearAll,
    toggleGrid,
    showGrid,
    undoStack,
    redoStack,
    blocks,
    selectedBlockId,
    deleteSelected,
  } = useEditorStore();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case 'p': setMode('place'); break;
        case 's': setMode('select'); break;
        case 'd': setMode('delete'); break;
        case 'o': setMode('orbit'); break;
        case 'r': rotateBlock(); break;
        case 'g': toggleGrid(); break;
        case 'delete':
        case 'backspace':
          deleteSelected();
          break;
        case 'z':
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) redo();
            else undo();
          }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="absolute top-0 left-0 bottom-0 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 flex flex-col z-20 shadow-xl overflow-y-auto">
      {/* Header */}
      <div className="px-4 py-4 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-black tracking-tight text-slate-900 dark:text-white uppercase">3D Building Editor</h2>
        <p className="text-[10px] text-slate-400 mt-0.5 tracking-wide">WebGPU-Accelerated</p>
      </div>

      {/* Mode selector */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Mode</span>
        <div className="grid grid-cols-4 gap-1">
          {MODE_BUTTONS.map((btn) => (
            <button
              key={btn.mode}
              onClick={() => setMode(btn.mode)}
              className={`flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                mode === btn.mode
                  ? 'bg-[#1978e5] text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={`${btn.label} (${btn.shortcut})`}
            >
              <span className="text-base">{btn.icon}</span>
              <span className="text-[9px]">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Block types */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Components</span>
        <div className="grid grid-cols-2 gap-1.5">
          {(Object.keys(BLOCK_PRESETS) as BlockType[]).map((type) => {
            const preset = BLOCK_PRESETS[type];
            return (
              <button
                key={type}
                onClick={() => setActiveBlockType(type)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeBlockType === type && mode === 'place'
                    ? 'bg-[#1978e5] text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-sm flex-shrink-0 border border-slate-300 dark:border-slate-600"
                  style={{ backgroundColor: preset.color }}
                />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Actions</span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={rotateBlock}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all cursor-pointer"
            title="Rotate (R)"
          >
            ↻ Rotate
          </button>
          <button
            onClick={toggleGrid}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              showGrid
                ? 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
            } hover:bg-slate-100 dark:hover:bg-slate-700`}
            title="Toggle Grid (G)"
          >
            # Grid
          </button>
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            ↩ Undo
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            title="Redo (Ctrl+Shift+Z)"
          >
            ↪ Redo
          </button>
        </div>
      </div>

      {/* Selected block info */}
      {selectedBlock && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">Selected</span>
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Type</span>
              <span className="font-medium text-slate-700 dark:text-slate-200">{BLOCK_PRESETS[selectedBlock.type].label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Position</span>
              <span className="font-mono text-slate-700 dark:text-slate-200 text-[10px]">
                {selectedBlock.position.map((v) => v.toFixed(1)).join(', ')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Color</span>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-4 h-4 rounded border border-slate-300"
                  style={{ backgroundColor: selectedBlock.color }}
                />
                <span className="font-mono text-[10px] text-slate-500">{selectedBlock.color}</span>
              </div>
            </div>
            <button
              onClick={() => deleteSelected()}
              className="w-full mt-1 px-3 py-1.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors cursor-pointer"
            >
              Delete Block
            </button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-3 mt-auto border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Blocks: {blocks.length}</span>
          <span>Snap: 0.5m</span>
        </div>
      </div>

      {/* Clear */}
      {blocks.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              if (window.confirm('Clear all blocks?')) clearAll();
            }}
            className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Keyboard shortcuts */}
      <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">Shortcuts</span>
        <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px] text-slate-400">
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">P</kbd> Place</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">S</kbd> Select</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">D</kbd> Delete</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">O</kbd> Orbit</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">R</kbd> Rotate</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">G</kbd> Grid</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">Del</kbd> Remove</span>
          <span><kbd className="bg-slate-100 dark:bg-slate-800 px-1 rounded">⌘Z</kbd> Undo</span>
        </div>
      </div>
    </div>
  );
}
