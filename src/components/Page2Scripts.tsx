import React, { useState, useEffect } from 'react';
import type { ProjectConfig, VideoScriptItem } from '../types';
import { FileText, Play, RotateCw, CheckCircle, Send, Film, HardDrive, RefreshCw } from 'lucide-react';

interface Props {
  config: ProjectConfig;
  scripts: VideoScriptItem[];
  setScripts: React.Dispatch<React.SetStateAction<VideoScriptItem[]>>;
  onProceedToMemory: () => void;
}

export default function Page2Scripts({ config, scripts, setScripts, onProceedToMemory }: Props) {
  const [isGeneratingScripts, setIsGeneratingScripts] = useState(false);
  const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);
  const [userEditPrompt, setUserEditPrompt] = useState('');
  const [isReEditing, setIsReEditing] = useState(false);
  const [isPushingDrive, setIsPushingDrive] = useState(false);
  const [drivePushSuccess, setDrivePushSuccess] = useState(false);
  const [postRenderFeedback, setPostRenderFeedback] = useState('');
  const [isReRendering, setIsReRendering] = useState(false);

  useEffect(() => {
    if (!scripts || scripts.length === 0) {
      handleGenerateScripts();
    } else if (!selectedScriptId && scripts.length > 0) {
      setSelectedScriptId(scripts[0].id);
    }
  }, []);

  const handleGenerateScripts = () => {
    setIsGeneratingScripts(true);
    setTimeout(() => {
      const count = Number(config.batchCount) > 0 ? Number(config.batchCount) : 5;
      const formats = config.contentTypes && config.contentTypes.length > 0 
        ? config.contentTypes 
        : ['Viral Hook', 'Unboxing', 'Problem Solver', 'Testimonial', 'Product Demo'];

      const generated: VideoScriptItem[] = Array.from({ length: count }).map((_, i) => {
        const format = formats[i % formats.length];
        return {
          id: `script-${Date.now()}-${i}`,
          title: `${config.productName || 'Product'} - Variation ${i + 1} (${format})`,
          contentType: format,
          scriptText: `[HOOK - 0-3s]: Stop scrolling if you want real results with ${config.productName || 'this product'}!\n\n[PROBLEM & VALUE - 3-15s]: ${config.strategy?.problemSolution || '• Addresses daily challenges\n• Delivers fast, verified results'}\n\n[CTA - 15-${config.maxDuration || 30}s]: Tap below to claim yours in ${config.country || 'Malaysia'}.`,
          storyboard: `Scene 1 (0-3s): Close-up product showcase with dynamic text overlay in ${config.country || 'Malaysia'}.\nScene 2 (3-15s): Presenter avatar explaining core problem & solution benefits.\nScene 3 (15s+): Customer feedback showcase with trust badges and CTA button.`,
          status: 'draft',
          progress: 0,
          selectedForDrive: true,
        };
      });

      setScripts(generated);
      setSelectedScriptId(generated[0]?.id || null);
      setIsGeneratingScripts(false);
    }, 800);
  };

  const currentScript = scripts.find(s => s.id === selectedScriptId) || scripts[0];

  const handleSimulateRender = (id: string) => {
    setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'rendering', progress: 20 } : s));
    
    let progress = 20;
    const interval = setInterval(() => {
      progress += 30;
      if (progress >= 100) {
        clearInterval(interval);
        setScripts(prev => prev.map(s => s.id === id ? { ...s, status: 'completed', progress: 100, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' } : s));
      } else {
        setScripts(prev => prev.map(s => s.id === id ? { ...s, progress } : s));
      }
    }, 600);
  };

  const handleAiReEdit = () => {
    if (!currentScript || !userEditPrompt) return;
    setIsReEditing(true);
    setTimeout(() => {
      setScripts(prev => prev.map(s => s.id === currentScript.id ? {
        ...s,
        scriptText: s.scriptText + `\n\n[AI RE-EDIT APPLIED]: ${userEditPrompt}`
      } : s));
      setUserEditPrompt('');
      setIsReEditing(false);
    }, 800);
  };

  const handlePostRenderCorrection = () => {
    if (!currentScript || !postRenderFeedback) return;
    setIsReRendering(true);
    setScripts(prev => prev.map(s => s.id === currentScript.id ? {
      ...s,
      status: 'rendering',
      progress: 20,
      storyboard: s.storyboard + `\n\n[CORRECTION APPLIED]: ${postRenderFeedback}`
    } : s));

    setTimeout(() => {
      setIsReRendering(false);
      setPostRenderFeedback('');
      let progress = 20;
      const interval = setInterval(() => {
        progress += 30;
        if (progress >= 100) {
          clearInterval(interval);
          setScripts(prev => prev.map(s => s.id === currentScript.id ? { ...s, status: 'completed', progress: 100, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' } : s));
        } else {
          setScripts(prev => prev.map(s => s.id === currentScript.id ? { ...s, progress } : s));
        }
      }, 600);
    }, 1000);
  };

  const handleSelectAllDrive = (checked: boolean) => {
    setScripts(prev => prev.map(s => ({ ...s, selectedForDrive: checked })));
  };

  const handlePushToDrive = () => {
    const selectedCount = scripts.filter(s => s.selectedForDrive).length;
    if (selectedCount === 0) return;

    setIsPushingDrive(true);
    setDrivePushSuccess(false);
    setTimeout(() => {
      setIsPushingDrive(false);
      setDrivePushSuccess(true);
    }, 1200);
  };

  const allSelected = scripts.length > 0 && scripts.every(s => s.selectedForDrive);
  const selectedCount = scripts.filter(s => s.selectedForDrive).length;

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Page 2: Scripting, Rendering, Storyboard & Google Drive</h2>
        <p className="text-slate-400 text-sm mt-1">Generate multi-variation video scripts & storyboards from your strategy, simulate rendering, and push to Google Drive.</p>
      </div>

      {isGeneratingScripts && (!scripts || scripts.length === 0) ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-indigo-400 animate-pulse mx-auto" />
          <h3 className="text-lg font-semibold text-white">Generating Your Batch of {config.batchCount || 5} Scripts...</h3>
          <p className="text-slate-400 text-sm">Synthesizing strategy, localization, and content formats.</p>
        </div>
      ) : (!scripts || scripts.length === 0) ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center space-y-4">
          <FileText className="w-12 h-12 text-indigo-400 mx-auto" />
          <h3 className="text-lg font-semibold text-white">No Scripts Generated Yet</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Click below to generate your batch of {config.batchCount || 5} video scripts.</p>
          <button
            onClick={handleGenerateScripts}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Generate {config.batchCount || 5} Video Scripts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left List: Script Variations with Bulk Drive Select */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">Script Variations ({scripts.length})</h3>
              <button onClick={handleGenerateScripts} className="text-xs text-indigo-400 hover:underline">Regenerate All</button>
            </div>

            {/* Bulk Selection Header */}
            <div className="flex items-center justify-between bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-xs">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={e => handleSelectAllDrive(e.target.checked)}
                  className="accent-indigo-500"
                />
                Select All for Drive ({selectedCount}/{scripts.length})
              </label>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {scripts.map(s => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScriptId(s.id)}
                  className={`p-3 rounded-lg border cursor-pointer transition flex items-start gap-2.5 ${
                    (selectedScriptId === s.id || (!selectedScriptId && s === scripts[0]))
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                  onClickCapture={(e) => {
                    if ((e.target as HTMLElement).tagName === 'INPUT') return;
                    setSelectedScriptId(s.id);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={s.selectedForDrive}
                    onChange={e => {
                      const checked = e.target.checked;
                      setScripts(prev => prev.map(item => item.id === s.id ? { ...item, selectedForDrive: checked } : item));
                    }}
                    className="mt-0.5 accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold truncate">{s.title}</p>
                    <div className="flex items-center justify-between mt-2 text-[11px]">
                      <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">{s.contentType}</span>
                      <span className={`capitalize font-medium ${
                        s.status === 'completed' ? 'text-emerald-400' : s.status === 'rendering' ? 'text-amber-400' : 'text-slate-500'
                      }`}>
                        {s.status} {s.progress > 0 && s.progress < 100 ? `${s.progress}%` : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dedicated Bulk Google Drive Push Action Button */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={handlePushToDrive}
                disabled={isPushingDrive || selectedCount === 0}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold py-2.5 rounded-lg transition cursor-pointer"
              >
                <HardDrive className="w-4 h-4" />
                {isPushingDrive ? `Pushing ${selectedCount} Items to Drive...` : `Push ${selectedCount} Selected to Google Drive`}
              </button>
              {drivePushSuccess && (
                <p className="text-xs text-emerald-400 text-center font-medium flex items-center justify-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Successfully pushed batch to Google Drive!
                </p>
              )}
            </div>
          </div>

          {/* Right Area: Script Viewer, Storyboard Editor, AI Re-Edit & Render */}
          {currentScript && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">{currentScript.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded">{currentScript.contentType}</span>
                    {currentScript.status !== 'completed' && (
                      <button
                        onClick={() => handleSimulateRender(currentScript.id)}
                        disabled={currentScript.status === 'rendering'}
                        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs text-white px-3 py-1.5 rounded-lg transition cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        {currentScript.status === 'rendering' ? 'Rendering...' : 'Render Video'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Two-Column Grid for Script Text & Storyboard */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Script Text Editor */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" /> Generated Script & Timing
                    </label>
                    <textarea
                      rows={8}
                      value={currentScript.scriptText}
                      onChange={e => {
                        const val = e.target.value;
                        setScripts(prev => prev.map(s => s.id === currentScript.id ? { ...s, scriptText: val } : s));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 whitespace-pre-line resize-y"
                    />
                  </div>

                  {/* Storyboard Editor */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1 flex items-center gap-1">
                      <Film className="w-3.5 h-3.5 text-purple-400" /> Storyboard & Visual Scenes
                    </label>
                    <textarea
                      rows={8}
                      value={currentScript.storyboard || ''}
                      onChange={e => {
                        const val = e.target.value;
                        setScripts(prev => prev.map(s => s.id === currentScript.id ? { ...s, storyboard: val } : s));
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-purple-500 whitespace-pre-line resize-y"
                    />
                  </div>
                </div>

                {/* AI Re-Edit Box */}
                <div className="bg-slate-950 border border-indigo-500/30 rounded-lg p-4 space-y-2">
                  <label className="block text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" /> AI Re-Edit Instruction Box
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Make hook punchier, add urgency, shorten intro..."
                      value={userEditPrompt}
                      onChange={e => setUserEditPrompt(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleAiReEdit}
                      disabled={isReEditing || !userEditPrompt}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> {isReEditing ? 'Re-editing...' : 'Apply Re-Edit'}
                    </button>
                  </div>
                </div>

                {/* Video Preview Player & Post-Render Correction Box if Completed */}
                {currentScript.status === 'completed' && (
                  <div className="bg-slate-950 border border-emerald-500/40 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" /> Render Successful & Ready for Drive Export
                      </p>
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={currentScript.selectedForDrive}
                          onChange={e => {
                            const checked = e.target.checked;
                            setScripts(prev => prev.map(s => s.id === currentScript.id ? { ...s, selectedForDrive: checked } : s));
                          }}
                          className="accent-indigo-500"
                        />
                        Include in Google Drive Batch Push
                      </label>
                    </div>
                    <video src={currentScript.videoUrl} controls className="w-full h-48 rounded-lg bg-black object-contain" />

                    {/* Post-Render Error Correction & Re-Render Box */}
                    <div className="bg-slate-900 border border-amber-500/30 rounded-lg p-3 space-y-2">
                      <label className="block text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5" /> Post-Render AI Error Correction & Re-Render Box
                      </label>
                      <p className="text-[11px] text-slate-400">Notice a visual mistake or lighting issue in the rendered video? Type what needs to be fixed and re-render.</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g., Fix avatar eye contact in scene 2, brighten background lighting..."
                          value={postRenderFeedback}
                          onChange={e => setPostRenderFeedback(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
                        />
                        <button
                          onClick={handlePostRenderCorrection}
                          disabled={isReRendering || !postRenderFeedback}
                          className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1 cursor-pointer whitespace-nowrap"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isReRendering ? 'animate-spin' : ''}`} /> 
                          {isReRendering ? 'Re-rendering...' : 'Apply & Re-Render'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}