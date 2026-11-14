import React, { useState } from 'react';
import Page1Strategy from './components/Page1Strategy';
import Page2Scripts from './components/Page2Scripts';
import Page3Memory from './components/Page3Memory';
import Page4Settings from './components/Page4Settings';
import { LayoutDashboard, FileText, Database, Settings } from 'lucide-react';
import type { ProjectConfig, VideoScriptItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState(1);
  
  const [config, setConfig] = useState<ProjectConfig>({
    businessName: 'AI Marketing Pro',
    productName: '',
    productDetails: '',
    usp: '',
    targetAudience: 'SaaS Founders',
    tone: 'Professional & Authoritative',
    apiKey: 'sk-ant-api03-test-key',
    country: 'Malaysia',
    language: 'Bahasa Melayu / English',
    minDuration: 15,
    maxDuration: 30,
    batchCount: 5,
    contentTypes: ['TikTok Viral Hook', 'Unboxing', 'Product Demo'],
    productPhotos: [],
    reviewPhotos: [],
    avatarPhoto: null,
    voiceMode: 'auto-default',
    voiceFile: null,
    customPrompt: '',
    strategy: {
      audience: '',
      problemSolution: '',
      useCases: ''
    }
  });

  const [scripts, setScripts] = useState<VideoScriptItem[]>([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6 text-indigo-500" />
          AI Marketing Dashboard
        </h1>
        <nav className="flex gap-2">
          <button 
            onClick={() => setActiveTab(1)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Strategy
          </button>
          <button 
            onClick={() => setActiveTab(2)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <FileText className="w-4 h-4" /> Scripts
          </button>
          <button 
            onClick={() => setActiveTab(3)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Database className="w-4 h-4" /> Memory
          </button>
          <button 
            onClick={() => setActiveTab(4)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${activeTab === 4 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
        </nav>
      </header>
      
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 1 && (
          <Page1Strategy 
            config={config} 
            setConfig={setConfig} 
            onProceedToScripts={() => setActiveTab(2)} 
          />
        )}
        {activeTab === 2 && (
          <Page2Scripts 
            config={config} 
            scripts={scripts} 
            setScripts={setScripts} 
            onProceedToMemory={() => setActiveTab(3)} 
          />
        )}
        {activeTab === 3 && (
          <Page3Memory 
            config={config} 
            onProceedToSettings={() => setActiveTab(4)} 
          />
        )}
        {activeTab === 4 && (
          <Page4Settings 
            config={config} 
            setConfig={setConfig} 
          />
        )}
      </main>
    </div>
  );
}