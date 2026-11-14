import React, { useState } from 'react';
import type { ProjectConfig } from '../types';
import { Database, Plus, Trash2, ShieldAlert, Upload, HardDrive, Cpu, Activity, CheckCircle, RefreshCw, Key, Save, Edit3, Eye, FileText, Globe, CloudSync } from 'lucide-react';

interface Props {
  config: ProjectConfig;
  onProceedToSettings?: () => void;
}

interface Integration {
  id: string;
  name: string;
  type: string;
  apiKey: string;
  prompt: string;
  saved?: boolean;
}

interface PlatformRule {
  id: string;
  platformName: string;
  files: string[];
  enforced: boolean;
}

export default function Page3Memory({ config }: Props) {
  // Integrations state
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: '1', name: 'Shopify Store API', type: 'E-commerce', apiKey: 'shpat_sample_key_12345', prompt: 'Pull daily sales, top products, and customer purchase notes to refine hook angles.', saved: true },
    { id: '2', name: 'TikTok Shop Analytics', type: 'Social Commerce', apiKey: 'tt_live_key_98765', prompt: 'Analyze viral video performance metrics and audience retention curves.', saved: true }
  ]);
  const [newIntegrationName, setNewIntegrationName] = useState('');
  const [newIntegrationType, setNewIntegrationType] = useState('Analytics');
  const [newApiKey, setNewApiKey] = useState('');
  const [newPrompt, setNewPrompt] = useState('');

  // Platform Rules & Regulations State
  const [platformRules, setPlatformRules] = useState<PlatformRule[]>([
    { id: 'rule-1', platformName: 'TikTok Shop', files: ['TikTok_Shop_Guidelines.pdf', 'Ad_Policy_2026.pdf'], enforced: true },
    { id: 'rule-2', platformName: 'Shopee', files: ['Shopee_Listing_Compliance.pdf'], enforced: true },
    { id: 'rule-3', platformName: 'Lazada', files: ['Lazada_Content_Rules.pdf'], enforced: true }
  ]);
  const [customPlatformName, setCustomPlatformName] = useState('');

  // Memory Tier State & Global/Product Inspectors
  const [memoryTier, setMemoryTier] = useState<'global' | 'product'>('global');
  const [selectedProductPartition, setSelectedProductPartition] = useState(config.productName || 'Default Product');
  
  const [globalMemoryText, setGlobalMemoryText] = useState(
    `1. Brand Tone: Professional & Authoritative\n2. Target Market Compliance: Malaysia (Bahasa Melayu / English mix rules)\n3. Core USP Guardrails: High-converting hooks, fast results, verified trust badges.`
  );
  const [isGlobalMemorySaved, setIsGlobalMemorySaved] = useState(false);

  // Per-Product Backend Memory Data Store State
  const [productMemoryStore, setProductMemoryStore] = useState<Record<string, string>>({
    [config.productName || 'Default Product']: `• Top Winning Hook Angles: "Stop scrolling if you want real results...", "The secret to daily challenges..."\n• Post-Render Corrections Log: 3 adjustments applied (Lighting & Avatar pose).\n• Conversion Weight Score: 94.2% (High performance in Malaysia market).`,
    'SaaS Growth Accelerator': `• Top Winning Hook Angles: "Scale your revenue 10x with zero friction..."\n• Post-Render Corrections Log: 1 adjustment applied (Subtitle speed).\n• Conversion Weight Score: 88.5%.`,
    'AI Lead Gen Suite': `• Top Winning Hook Angles: "Automate your customer acquisition instantly..."\n• Post-Render Corrections Log: 0 adjustments applied.\n• Conversion Weight Score: 91.0%.`
  });
  const [isProductMemorySaved, setIsProductMemorySaved] = useState(false);

  // Global Negative Prompts & Append State
  const [negativePrompts, setNegativePrompts] = useState(
    'Extra fingers, deformed hands, blurry face-morphing, unnatural eye glaring, low-res artifacts, distorted product labels.'
  );
  const [appendNegativeInput, setAppendNegativeInput] = useState('');
  const [isNegativeSaved, setIsNegativeSaved] = useState(false);

  // Knowledge Base & Auto-Cleanup
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['Brand_Guidelines_2026.pdf', 'Winning_Hooks_Swipefile.txt']);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Delta Shift Log
  const [deltaLogs, setDeltaLogs] = useState([
    { id: 1, timestamp: '2026-11-14 14:32', product: config.productName || 'Main Product', action: 'Manual edit in review room: Hook shortened by 2s', weightShift: '+0.15 (Urgency)' },
    { id: 2, timestamp: '2026-11-14 11:15', product: config.productName || 'Main Product', action: 'Negative prompt enforcement updated', weightShift: '-0.30 (Artifacts)' }
  ]);

  // Google Drive Backup & Memory Sync State
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState(false);
  const [autoSyncDrive, setAutoSyncDrive] = useState(true);

  const handleAddIntegration = () => {
    if (!newIntegrationName) return;
    const newItem: Integration = {
      id: `int-${Date.now()}`,
      name: newIntegrationName,
      type: newIntegrationType,
      apiKey: newApiKey,
      prompt: newPrompt || 'Analyze performance data and train script generation weights.',
      saved: true
    };
    setIntegrations([...integrations, newItem]);
    setNewIntegrationName('');
    setNewApiKey('');
    setNewPrompt('');
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter(item => item.id !== id));
  };

  const handleSaveIntegration = (id: string) => {
    setIntegrations(integrations.map(i => i.id === id ? { ...i, saved: true } : i));
    setTimeout(() => {
      setIntegrations(prev => prev.map(i => i.id === id ? { ...i, saved: false } : i));
    }, 2500);
  };

  const handleAddCustomPlatformRule = () => {
    if (!customPlatformName.trim()) return;
    const newRule: PlatformRule = {
      id: `rule-${Date.now()}`,
      platformName: customPlatformName.trim(),
      files: ['Compliance_Standard.pdf'],
      enforced: true
    };
    setPlatformRules([...platformRules, newRule]);
    setCustomPlatformName('');
  };

  const handleAddFileToPlatform = (ruleId: string, fileName: string) => {
    setPlatformRules(prev => prev.map(r => r.id === ruleId ? { ...r, files: [...r.files, fileName] } : r));
  };

  const handleTogglePlatformEnforced = (ruleId: string) => {
    setPlatformRules(prev => prev.map(r => r.id === ruleId ? { ...r, enforced: !r.enforced } : r));
  };

  const handleDeletePlatformRule = (ruleId: string) => {
    setPlatformRules(prev => prev.filter(r => r.id !== ruleId));
  };

  const handleAppendNegativePrompts = () => {
    if (!appendNegativeInput.trim()) return;
    const updated = negativePrompts.trim().endsWith(',') 
      ? `${negativePrompts} ${appendNegativeInput.trim()}`
      : `${negativePrompts}, ${appendNegativeInput.trim()}`;
    
    setNegativePrompts(updated);
    setAppendNegativeInput('');
    setIsNegativeSaved(true);
    setTimeout(() => setIsNegativeSaved(false), 2500);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadStatus(`Ingesting ${file.name}...`);
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, file.name]);
      setUploadStatus(`Successfully ingested ${file.name}. (Local temporary source auto-purged).`);
      setTimeout(() => setUploadStatus(null), 4000);
    }, 1000);
  };

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setBackupSuccess(false);
    setTimeout(() => {
      setIsBackingUp(false);
      setBackupSuccess(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Database className="w-6 h-6 text-indigo-500" /> Page 3: The AI Self-Evaluation & Training Brain Panel
        </h2>
        <p className="text-slate-400 text-sm mt-1">Manage modular integrations, platform compliance rules, dual-tier memory partitions, negative prompts, and backups.</p>
      </div>

      {/* 1. Modular Multi-Platform Data Integration Hub */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" /> Modular Multi-Platform Data Integration Hub
            </h3>
            <p className="text-xs text-slate-400">Connect external platforms, manage API credentials, and write paragraph-level training instructions.</p>
          </div>
        </div>

        {/* Add Integration Form */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Platform Name (e.g., Meta Ads)"
              value={newIntegrationName}
              onChange={e => setNewIntegrationName(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
            />
            <select
              value={newIntegrationType}
              onChange={e => setNewIntegrationType(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
            >
              <option value="Analytics">Analytics</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Social Commerce">Social Commerce</option>
              <option value="Ad Network">Ad Network</option>
            </select>
            <input
              type="password"
              placeholder="API Key / Secret Token"
              value={newApiKey}
              onChange={e => setNewApiKey(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 font-mono"
            />
          </div>
          <div>
            <textarea
              rows={2}
              placeholder="Paragraph training prompt instructions for this integration..."
              value={newPrompt}
              onChange={e => setNewPrompt(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddIntegration}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Integration
            </button>
          </div>
        </div>

        {/* Integration Cards List */}
        <div className="space-y-4">
          {integrations.map(item => (
            <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">{item.type}</span>
                </div>
                <button
                  onClick={() => handleDeleteIntegration(item.id)}
                  className="text-slate-500 hover:text-rose-400 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <Key className="w-3 h-3 text-indigo-400" /> API Key / Secret Token (Editable)
                  </label>
                  <input
                    type="text"
                    value={item.apiKey}
                    onChange={e => {
                      const val = e.target.value;
                      setIntegrations(integrations.map(i => i.id === item.id ? { ...i, apiKey: val } : i));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1 flex items-center gap-1">
                    <Edit3 className="w-3 h-3 text-indigo-400" /> Paragraph Instruction & Training Prompt
                  </label>
                  <textarea
                    rows={2}
                    value={item.prompt}
                    onChange={e => {
                      const val = e.target.value;
                      setIntegrations(integrations.map(i => i.id === item.id ? { ...i, prompt: val } : i));
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>

              {/* Confirmation & Save Button Bar */}
              <div className="flex items-center justify-between pt-1">
                {item.saved ? (
                  <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Changes saved & confirmed successfully!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-500">Unsaved changes will be applied to next training cycle.</span>
                )}
                <button
                  onClick={() => handleSaveIntegration(item.id)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" /> Save & Confirm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform Rules & Regulations Compliance Hub */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-400" /> Platform Rules, Regulations & Compliance Hub
            </h3>
            <p className="text-xs text-slate-400">Enforce strict formatting, policy, and compliance standards for TikTok Shop, Shopee, Lazada, Meta, and custom platforms.</p>
          </div>
        </div>

        {/* Add Custom Platform Form */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex items-center gap-3">
          <input
            type="text"
            placeholder="Add Custom Platform (e.g., Instagram Reels, YouTube Shorts)..."
            value={customPlatformName}
            onChange={e => setCustomPlatformName(e.target.value)}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleAddCustomPlatformRule}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> Add Platform Rules
          </button>
        </div>

        {/* Platform Rule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platformRules.map(rule => (
            <div key={rule.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${rule.enforced ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
                  <h4 className="text-sm font-bold text-white">{rule.platformName} Compliance</h4>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-[11px] text-slate-400 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rule.enforced}
                      onChange={() => handleTogglePlatformEnforced(rule.id)}
                      className="accent-emerald-500"
                    />
                    Strictly Enforce
                  </label>
                  <button
                    onClick={() => handleDeletePlatformRule(rule.id)}
                    className="text-slate-500 hover:text-rose-400 transition cursor-pointer ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Attached Compliance Files */}
              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-400 font-medium">Attached Policy & Regulation Files:</p>
                <div className="flex flex-wrap gap-1.5">
                  {rule.files.map((file, idx) => (
                    <span key={idx} className="bg-slate-900 border border-slate-800 px-2 py-1 rounded text-[11px] text-slate-300 flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-400" /> {file}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upload Compliance Document Button */}
              <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                <span className="text-[10px] text-slate-500">AI automatically verifies video scripts against these rules.</span>
                <label className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3" /> Attach Rule File
                  <input
                    type="file"
                    onChange={e => {
                      const f = e.target.files?.[0];
                      if (f) handleAddFileToPlatform(rule.id, f.name);
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Dual-Tier Memory Architecture & 3. Global Negative Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dual-Tier Memory Architecture Inspector */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" /> Dual-Tier Memory Architecture
          </h3>
          <p className="text-xs text-slate-400">Inspect, view backend data, and customize overarching global brand memory or product partitions.</p>

          <div className="flex gap-2">
            <button
              onClick={() => setMemoryTier('global')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                memoryTier === 'global' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Global Main Memory
            </button>
            <button
              onClick={() => setMemoryTier('product')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                memoryTier === 'product' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
              }`}
            >
              Per-Product Partitions
            </button>
          </div>

          {memoryTier === 'global' ? (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3 text-xs">
              <label className="block text-indigo-400 font-semibold flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Global Main Memory Content Inspector (Editable):
              </label>
              <textarea
                rows={4}
                value={globalMemoryText}
                onChange={e => setGlobalMemoryText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 resize-none font-mono"
              />
              <div className="flex items-center justify-between">
                {isGlobalMemorySaved ? (
                  <span className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Global memory updated successfully!
                  </span>
                ) : <span className="text-[11px] text-slate-500">Applies across all product script generations.</span>}
                <button
                  onClick={() => {
                    setIsGlobalMemorySaved(true);
                    setTimeout(() => setIsGlobalMemorySaved(false), 2500);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> Save Global Memory
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3 text-xs">
              <div className="space-y-1">
                <label className="block text-slate-400 font-medium">Select Product Partition:</label>
                <select
                  value={selectedProductPartition}
                  onChange={e => setSelectedProductPartition(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white outline-none"
                >
                  <option value={config.productName || 'Main Product'}>{config.productName || 'Main Product'} (Active Partition)</option>
                  <option value="SaaS Growth Accelerator">SaaS Growth Accelerator</option>
                  <option value="AI Lead Gen Suite">AI Lead Gen Suite</option>
                </select>
              </div>

              {/* Backend Product Memory Inspector & Editor Box */}
              <div className="space-y-2 pt-2">
                <label className="block text-purple-400 font-semibold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> Backend Per-Product Memory Inspector (Editable):
                </label>
                <textarea
                  rows={4}
                  value={productMemoryStore[selectedProductPartition] || 'No backend memory logged yet for this product.'}
                  onChange={e => {
                    const val = e.target.value;
                    setProductMemoryStore({ ...productMemoryStore, [selectedProductPartition]: val });
                  }}
                  className="w-full bg-slate-900 border border-purple-500/30 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-purple-500 resize-none font-mono"
                />
                <div className="flex items-center justify-between">
                  {isProductMemorySaved ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Product partition memory updated!
                    </span>
                  ) : <span className="text-[11px] text-slate-500">Isolates winning hooks and feedback history for this product.</span>}
                  <button
                    onClick={() => {
                      setIsProductMemorySaved(true);
                      setTimeout(() => setIsProductMemorySaved(false), 2500);
                    }}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Product Partition
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Negative Prompts Panel with Append Logic & Update Button */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" /> Global Negative Prompts Panel
          </h3>
          <p className="text-xs text-slate-400">Permanent guardrail rules to block visual generation errors and rendering artifacts. New rules automatically combine/append.</p>

          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Current Active Negative Prompts:</label>
              <textarea
                rows={3}
                value={negativePrompts}
                onChange={e => setNegativePrompts(e.target.value)}
                className="w-full bg-slate-950 border border-rose-500/30 rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-rose-500 resize-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Add & Append New Negative Constraints:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g., asymmetrical eyes, distorted background..."
                  value={appendNegativeInput}
                  onChange={e => setAppendNegativeInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-rose-500"
                />
                <button
                  onClick={handleAppendNegativePrompts}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
                >
                  <Save className="w-3.5 h-3.5" /> Update & Combine
                </button>
              </div>
            </div>

            {isNegativeSaved && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> New negative constraints successfully combined and updated!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 4. Knowledge Base File Uploader & 5. Auto-Cleanup */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" /> Knowledge Base File Uploader & Auto-Cleanup
            </h3>
            <p className="text-xs text-slate-400">Upload training documents (PDFs, audio, videos, URLs). Temporary files are auto-purged immediately upon ingestion.</p>
          </div>
          <label className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1.5 transition">
            <Upload className="w-3.5 h-3.5" /> Upload Training File
            <input type="file" onChange={handleSimulateUpload} className="hidden" />
          </label>
        </div>

        {uploadStatus && (
          <div className="bg-slate-950 border border-emerald-500/40 text-emerald-400 p-3 rounded-lg text-xs flex items-center gap-2 animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin" /> {uploadStatus}
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 text-slate-300">
              <span>📄 {file}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded">Ingested & Cleaned</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Live Weight & Delta Shift Log & 7. Google Drive Brain & Memory Backup Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Delta Shift Log */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" /> Live Weight & Delta Shift Log
          </h3>
          <p className="text-xs text-slate-400">Activity table displaying manual review room edits, prompt weight shifts, and learning logs.</p>

          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Action / Edit</th>
                  <th className="p-3">Weight Shift</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {deltaLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-950/50">
                    <td className="p-3 font-mono text-[11px] text-slate-400">{log.timestamp}</td>
                    <td className="p-3">{log.product}</td>
                    <td className="p-3">{log.action}</td>
                    <td className="p-3 text-indigo-400 font-mono">{log.weightShift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Google Drive Brain & Memory Backup Console */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-400" /> Google Drive Brain & Memory Backup
            </h3>
            <p className="text-xs text-slate-400">Securely back up and sync your trained AI brain weights, memory partitions, and custom prompt configurations to Google Drive.</p>
            
            <label className="flex items-center gap-2 text-xs text-slate-300 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={autoSyncDrive}
                onChange={e => setAutoSyncDrive(e.target.checked)}
                className="accent-indigo-500"
              />
              Auto-sync memory weights after every training delta shift
            </label>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleTriggerBackup}
              disabled={isBackingUp}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <HardDrive className="w-4 h-4" /> {isBackingUp ? 'Syncing Memory to Drive...' : 'Backup Memory & Brain to Google Drive'}
            </button>
            {backupSuccess && (
              <p className="text-xs text-emerald-400 text-center font-medium flex items-center justify-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Brain weights & memory successfully synced!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}