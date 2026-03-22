import React, { Suspense } from 'react';
import EditorScene from './Scene';
import Toolbar from './Toolbar';

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-[#1978e5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-medium text-slate-500">Loading 3D Editor...</p>
      </div>
    </div>
  );
}

export default function BuildingEditor({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] bg-slate-100 dark:bg-slate-900 flex">
      {/* Toolbar */}
      <Toolbar />

      {/* Canvas area */}
      <div className="flex-1 ml-64 relative">
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              ← Back to Site
            </button>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-xs font-medium text-slate-400">Right-click to pan · Scroll to zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              WebGPU Ready
            </span>
          </div>
        </div>

        {/* 3D Canvas */}
        <Suspense fallback={<LoadingFallback />}>
          <EditorScene />
        </Suspense>
      </div>
    </div>
  );
}
