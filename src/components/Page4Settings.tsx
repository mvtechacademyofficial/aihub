import React, { useState } from 'react';
import type { ProjectConfig } from '../types';
import { Settings, Cpu, HardDrive, CheckCircle, Save, ToggleLeft, ToggleRight, FolderSync, ShieldCheck } from 'lucide-react';

interface Props {
  config: ProjectConfig;
  onSaveConfig: (updated: ProjectConfig) => void;
}

export default function Page4Settings({ config, onSaveConfig }: Props) {
  // API Endpoints State
  const [llmEndpoint, setLlmEndpoint] = useState('https://api.openai.com/v1/chat/completions');
  const [llmApiKey, setLlmApiKey] = useState('sk-proj-*********************');
  const [llmModel, setLlmModel] = useState('gpt-4o');

  const [scriptingEndpoint, setScriptingEndpoint] = useState('https://api.anthropic.com/v1/messages');
  const [scriptingModel, setScriptingModel] = useState('claude-3-5-sonnet');

  const [avatarEndpoint, setAvatarEndpoint] = useState('https://api.heygen.com/v2/video/generate');
  const [linuxVpsIp, setLinuxVpsIp] = useState('192.168.1.180:8000');

  // Google Drive & Storage Integration State
  const [driveConnected, setDriveConnected] = useState(true);
  const [targetVideoFolder, setTargetVideoFolder] = useState('AI_Marketing_Videos_Root');
  const [targetBrainFolder, setTargetBrainFolder] = useState('AI_Brain_Weights_Backup');
  const [autoSyncBrainDrive, setAutoSyncBrainDrive] = useState(true);

  // Feature Flags & Toggles
  const [autoCleanup, setAutoCleanup] = useState(true);
  const [enablePerProduct, setEnablePerProduct] = useState(true);
  const [strictNegative, setStrictNegative] = useState(true);
  const [autoBackupToggle, setAutoBackupToggle] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-500" /> Page 4: Settings & Dynamic Logic Console
        </h2>
        <p className="text-slate-400 text-sm mt-1">Configure API endpoints, model weights, Google Drive destination folders for both video exports and AI brain backups.</p>
      </div>

      {/* 1. API Endpoints & Models */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-400" /> API Endpoints & Models
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-medium text-slate-400">LLM Endpoint & Model</label>
            <input
              type="text"
              value={llmEndpoint}
              onChange={e => setLlmEndpoint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">Model Selector</label>
            <input
              type="text"
              value={llmModel}
              onChange={e => setLlmModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-400">LLM API Key</label>
          <input
            type="password"
            value={llmApiKey}
            onChange={e => setLlmApiKey(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-1">
            <label className="block text-xs font-medium text-slate-400">LLM Scripting Endpoint & Model</label>
            <input
              type="text"
              value={scriptingEndpoint}
              onChange={e => setScriptingEndpoint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">Script Model</label>
            <input
              type="text"
              value={scriptingModel}
              onChange={e => setScriptingModel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">TTS & Avatar Rendering Endpoint</label>
            <input
              type="text"
              value={avatarEndpoint}
              onChange={e => setAvatarEndpoint(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-400">Linux VPS Base IP</label>
            <input
              type="text"
              value={linuxVpsIp}
              onChange={e => setLinuxVpsIp(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 2. Google Drive & Storage Integration (Updated with Brain Backup Folders) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-emerald-400" /> Google Drive & Storage Integration
          </h3>
          <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full font-medium flex items-center gap-1 border border-emerald-500/30">
            <CheckCircle className="w-3.5 h-3.5" /> Connected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <FolderSync className="w-4 h-4 text-indigo-400" /> Target Video Export Folder
            </label>
            <input
              type="text"
              value={targetVideoFolder}
              onChange={e => setTargetVideoFolder(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
            />
            <p className="text-[11px] text-slate-500">Destination folder for rendered batch marketing videos.</p>
          </div>

          <div className="space-y-2 bg-slate-950 p-4 rounded-lg border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> Target Brain & Memory Backup Folder
            </label>
            <input
              type="text"
              value={targetBrainFolder}
              onChange={e => setTargetBrainFolder(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none font-mono"
            />
            <p className="text-[11px] text-slate-500">Destination folder for AI weights, memory partitions & prompt history.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            checked={autoSyncBrainDrive}
            onChange={e => setAutoSyncBrainDrive(e.target.checked)}
            className="accent-indigo-500"
          />
          <span className="text-xs text-slate-300">Automatically backup brain weights to Google Drive upon completion of training delta shifts</span>
        </div>
      </div>

      {/* 3. Feature Flags & Logic Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-400" /> Feature Flags & Logic Toggles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300 font-medium">Auto Cleanup Temp Files</span>
            <input type="checkbox" checked={autoCleanup} onChange={e => setAutoCleanup(e.target.checked)} className="accent-indigo-500 w-4 h-4" />
          </label>
          <label className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300 font-medium">Enable Per-Product Memory</span>
            <input type="checkbox" checked={enablePerProduct} onChange={e => setEnablePerProduct(e.target.checked)} className="accent-indigo-500 w-4 h-4" />
          </label>
          <label className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300 font-medium">Strict Negative Prompts Guardrail</span>
            <input type="checkbox" checked={strictNegative} onChange={e => setStrictNegative(e.target.checked)} className="accent-indigo-500 w-4 h-4" />
          </label>
          <label className="flex items-center justify-between bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
            <span className="text-xs text-slate-300 font-medium">Auto Backup to Drive</span>
            <input type="checkbox" checked={autoBackupToggle} onChange={e => setAutoBackupToggle(e.target.checked)} className="accent-indigo-500 w-4 h-4" />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
        {savedSuccess && (
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1 animate-pulse">
            <CheckCircle className="w-4 h-4" /> Settings and Google Drive sync targets saved successfully!
          </span>
        )}
        <button
          onClick={handleSaveAll}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 transition cursor-pointer text-xs"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}