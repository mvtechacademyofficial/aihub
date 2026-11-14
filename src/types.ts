export interface StrategyColumns {
  audience: string;
  problemSolution: string;
  useCases: string;
}

export interface ProjectConfig {
  productName: string;
  productDetails: string;
  usp: string;
  productPhotos: string[];
  reviewPhotos: string[];
  contentTypes: string[];
  customPrompt: string;
  country: string;
  language: string;
  duration: number;
  avatarPhoto: string | null;
  voiceFile: string | null;
  voiceMode: 'cloned' | 'auto-default';
  batchCount: number;
  strategy: StrategyColumns;
}

export interface VideoScriptItem {
  id: string;
  title: string;
  contentType: string;
  scriptText: string;
  storyboard: string;
  status: 'draft' | 'queued' | 'rendering' | 'completed';
  progress: number;
  videoUrl?: string;
  selectedForDrive: boolean;
}

export interface IntegrationItem {
  id: string;
  platformName: string;
  apiKey: string;
  instructionPrompt: string;
  active: boolean;
}

export interface AppSettings {
  vlmEndpoint: string;
  vlmModel: string;
  vlmApiKey: string;
  llmEndpoint: string;
  llmModel: string;
  llmApiKey: string;
  ttsEndpoint: string;
  avatarEndpoint: string;
  vpsBaseUrl: string;
  driveConnected: boolean;
  driveFolder: string;
  featureFlags: {
    autoCleanupTempFiles: boolean;
    enablePerProductMemory: boolean;
    strictNegativePrompts: boolean;
    autoBackupToDrive: boolean;
  };
}