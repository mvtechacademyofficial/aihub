import React, { useState } from 'react';
import type { ProjectConfig } from '../types';
import { Upload, Sparkles, Globe, Mic, User, Clock, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
  config: ProjectConfig;
  setConfig: React.Dispatch<React.SetStateAction<ProjectConfig>>;
  onProceedToScripts: () => void;
}

const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  'Malaysia': 'Bahasa Melayu / English',
  'United States': 'English (US)',
  'United Kingdom': 'English (UK)',
  'Indonesia': 'Bahasa Indonesia',
  'Singapore': 'English / Mandarin / Malay',
  'Japan': 'Japanese',
  'South Korea': 'Korean',
  'Thailand': 'Thai',
  'Vietnam': 'Vietnamese',
  'Germany': 'German',
  'France': 'French',
  'Spain': 'Spanish',
  'Saudi Arabia': 'Arabic',
};

const CONTENT_OPTIONS = {
  ecommerce: ['Unboxing', 'Shoppable Ad', 'Before & After', 'TikTok Viral Hook', 'Product Demo'],
  nonEcommerce: ['Brand Awareness', 'Educational How-To', 'VSL (Video Sales Letter)', 'Founder Story', 'Testimonial Showcase']
};

export default function Page1Strategy({ config, setConfig, onProceedToScripts }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategyGenerated, setStrategyGenerated] = useState(false);

  const toggleContentType = (type: string) => {
    setConfig(prev => ({
      ...prev,
      contentTypes: (prev.contentTypes || []).includes(type)
        ? (prev.contentTypes || []).filter(t => t !== type)
        : [...(prev.contentTypes || []), type]
    }));
  };

  const handleCountryChange = (country: string) => {
    setConfig(prev => ({
      ...prev,
      country,
      language: COUNTRY_LANGUAGE_MAP[country] || 'English'
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'productPhotos' | 'reviewPhotos') => {
    if (!e.target.files) return;
    const urls = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setConfig(prev => ({ 
      ...prev, 
      [field]: [...(prev[field] || []), ...urls] 
    }));
  };

  const handleSingleFile = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarPhoto' | 'voiceFile') => {
    if (!e.target.files?.[0]) return;
    const url = URL.createObjectURL(e.target.files[0]);
    setConfig(prev => ({
      ...prev,
      [field]: url,
      ...(field === 'voiceFile' ? { voiceMode: 'cloned' } : {})
    }));
  };

  const handleAutoGenerateStrategy = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const countryName = prevCountry => prevCountry || 'Target Region';
      setConfig(prev => ({
        ...prev,
        strategy: {
          audience: `• Gen Z Students & Young Adults (Ages 18-24): Seeking affordable, fast, trendy solutions.\n• Working Professionals & Millennials (Ages 25-40): Looking for time-saving, premium quality and convenience in ${prev.country || 'Malaysia'}.\n• Gender Demographics: High appeal across both men and women focused on self-care and lifestyle upgrades.\n• Intent Shoppers: Active social media buyers responding to ${(prev.contentTypes || []).join(', ') || 'viral video'} angles.`,
          problemSolution: `• Pain Point 1: High cost and inefficiency of traditional alternatives in the market.\n• Pain Point 2: Lack of time and complicated setup for daily routines.\n• Solution 1: ${prev.productName || 'Our product'} delivers fast, verified results with zero hassle.\n• Solution 2: Backed by real customer feedback and optimized for maximum durability and ease of use.`,
          useCases: `• 1. Morning Daily Routine: Quick integration into early morning schedules for instant energy/results.\n• 2. On-the-Go & Travel: Compact design perfect for busy lifestyles and commuters.\n• 3. Gift & Bundle Value: Ideal for sharing with family, friends, or special occasions.\n• 4. Side-by-Side Comparison: Demonstrating clear superiority against generic competitors.`
        }
      }));
      setIsGenerating(false);
      setStrategyGenerated(true);
    }, 900);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-2xl font-bold text-white">Page 1: Strategy, Persona, Avatar & Voice Studio</h2>
        <p className="text-slate-400 text-sm mt-1">Configure your product intelligence, localization, avatar presenter, and generate your editable 3-column strategy.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Product & Reviews */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
            <Layers className="w-5 h-5" /> 1. Product Intelligence & Social Proof
          </h3>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Product Name</label>
            <input
              type="text"
              placeholder="e.g., HydraGlow Vitamin C Serum"
              value={config.productName}
              onChange={e => setConfig({ ...config, productName: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Product Details & Specifications</label>
            <textarea
              rows={3}
              placeholder="Key ingredients, materials, dimensions, core benefits..."
              value={config.productDetails}
              onChange={e => setConfig({ ...config, productDetails: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Unique Selling Proposition (USP)</label>
            <textarea
              rows={3}
              placeholder="Enter multiple unique selling points or key differentiators..."
              value={config.usp}
              onChange={(e) => setConfig({ ...config, usp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none resize-y"
            />
          </div>

          {/* Uploads */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-slate-700 rounded-lg p-4 text-center hover:border-indigo-500 transition">
              <Upload className="w-5 h-5 text-indigo-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-300">Product Photos</p>
              <p className="text-[11px] text-slate-500 mb-2">{config.productPhotos?.length || 0} uploaded</p>
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1.5 rounded text-white">
                Select Files
                <input type="file" multiple accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'productPhotos')} />
              </label>
            </div>

            <div className="border border-dashed border-slate-700 rounded-lg p-4 text-center hover:border-emerald-500 transition">
              <Upload className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-300">Reviews & Feedback Photos</p>
              <p className="text-[11px] text-slate-500 mb-2">{config.reviewPhotos?.length || 0} uploaded</p>
              <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1.5 rounded text-white">
                Upload Reviews
                <input type="file" multiple accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'reviewPhotos')} />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Custom AI Instruction / Prompt Box</label>
            <textarea
              rows={2}
              placeholder="Specific scene notes, call-to-action rules, or angle priorities..."
              value={config.customPrompt}
              onChange={e => setConfig({ ...config, customPrompt: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Right Card: Content Types, Localization, Avatar & Voice */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
            <User className="w-5 h-5" /> 2. Funnel Formats, Region, Avatar & Voice
          </h3>

          {/* Multi Content Type Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Content Types (Multi-Select Enabled)</label>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-wider text-slate-500">E-Commerce</p>
              <div className="flex flex-wrap gap-1.5">
                {CONTENT_OPTIONS.ecommerce.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleContentType(type)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition ${
                      config.contentTypes?.includes(type)
                        ? 'bg-indigo-600 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 pt-1">Non-E-Commerce</p>
              <div className="flex flex-wrap gap-1.5">
                {CONTENT_OPTIONS.nonEcommerce.map(type => (
                  <button
                    key={type}
                    onClick={() => toggleContentType(type)}
                    className={`text-xs px-2.5 py-1 rounded-md border transition ${
                      config.contentTypes?.includes(type)
                        ? 'bg-purple-600 border-purple-500 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Country & Auto Language */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Target Country
              </label>
              <select
                value={config.country}
                onChange={e => handleCountryChange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white outline-none"
              >
                {Object.keys(COUNTRY_LANGUAGE_MAP).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Language</label>
              <input
                type="text"
                value={config.language || ''}
                onChange={(e) => setConfig({ ...config, language: e.target.value })}
                placeholder="e.g., Bahasa Melayu / English / Tamil"
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Duration Range */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Duration Range (Seconds)
            </label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <span className="text-[10px] text-slate-400 mb-0.5 block">Min Seconds</span>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={config.minDuration || 15}
                  onChange={(e) => setConfig({ ...config, minDuration: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 mb-0.5 block">Max Seconds</span>
                <input
                  type="number"
                  min={10}
                  max={120}
                  value={config.maxDuration || 30}
                  onChange={(e) => setConfig({ ...config, maxDuration: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Batch Video Quantity */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Batch Video Quantity</label>
            <input
              type="number"
              min={1}
              max={100}
              value={config.batchCount || 5}
              onChange={(e) => setConfig({ ...config, batchCount: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Avatar & Voice Settings */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
              <p className="text-xs font-medium text-slate-300 mb-1">AI Presenter Avatar</p>
              <p className="text-[11px] text-slate-500 mb-2">
                {config.avatarPhoto ? 'Custom Avatar Loaded' : 'No avatar uploaded'}
              </p>
              <label className="cursor-pointer inline-block bg-indigo-600 hover:bg-indigo-500 text-xs px-3 py-1.5 rounded text-white">
                Upload Avatar
                <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleFile(e, 'avatarPhoto')} />
              </label>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 space-y-2">
              <label className="block text-xs font-medium text-slate-300 mb-1">Voice Mode</label>
              <div className="flex items-center gap-2">
                <select
                  value={config.voiceMode}
                  onChange={(e) => setConfig({ ...config, voiceMode: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:border-indigo-500 outline-none"
                >
                  <option value="auto-default">Auto Default Voice</option>
                  <option value="cloned">Cloned Voice</option>
                </select>
                {config.voiceMode === 'cloned' && (
                  <button
                    onClick={() => setConfig({ ...config, voiceFile: null, voiceMode: 'auto-default' })}
                    className="text-[10px] text-slate-400 hover:text-white underline whitespace-nowrap"
                  >
                    Reset
                  </button>
                )}
              </div>

              {config.voiceMode === 'cloned' && (
                <div className="pt-1">
                  <p className="text-[11px] text-slate-500 mb-1.5">
                    {config.voiceFile ? 'Audio sample loaded' : 'Upload MP3/WAV reference'}
                  </p>
                  <label className="cursor-pointer inline-block bg-purple-600 hover:bg-purple-500 text-xs px-3 py-1.5 rounded text-white font-medium">
                    Upload Audio Sample
                    <input 
                      type="file" 
                      accept="audio/*" 
                      className="hidden" 
                      onChange={e => handleSingleFile(e, 'voiceFile')} 
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Submit Trigger */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleAutoGenerateStrategy}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              {isGenerating ? 'Analyzing Inputs with VLM...' : 'Submit & Auto-Generate 3-Column Strategy'}
            </button>
          </div>
        </div>
      </div>

      {/* 3-Column Editable Strategy Review Suite */}
      {(strategyGenerated || config.strategy?.audience) && (
        <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Editable 3-Column Strategy Review Suite
            </h3>
            <span className="text-xs text-slate-400">Click inside any column below to edit before generating scripts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">
                Column 1: Target Audience
              </label>
              <textarea
                rows={8}
                value={config.strategy.audience}
                onChange={e => setConfig({ ...config, strategy: { ...config.strategy, audience: e.target.value } })}
                className="w-full bg-transparent text-sm text-slate-200 outline-none resize-none whitespace-pre-line"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-purple-400 mb-2">
                Column 2: Problem & Solution
              </label>
              <textarea
                rows={8}
                value={config.strategy.problemSolution}
                onChange={e => setConfig({ ...config, strategy: { ...config.strategy, problemSolution: e.target.value } })}
                className="w-full bg-transparent text-sm text-slate-200 outline-none resize-none whitespace-pre-line"
              />
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Column 3: Use Cases
              </label>
              <textarea
                rows={8}
                value={config.strategy.useCases}
                onChange={e => setConfig({ ...config, strategy: { ...config.strategy, useCases: e.target.value } })}
                className="w-full bg-transparent text-sm text-slate-200 outline-none resize-none whitespace-pre-line"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onProceedToScripts}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg transition cursor-pointer"
            >
              Confirm Strategy & Generate Scripts on Page 2 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}