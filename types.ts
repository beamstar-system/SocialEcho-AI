export enum SocialPlatform {
  LinkedIn = 'LinkedIn',
  Twitter = 'Twitter',
  Instagram = 'Instagram',
}

export enum Tone {
  Professional = 'Professional',
  Witty = 'Witty',
  Urgent = 'Urgent',
  Inspirational = 'Inspirational',
  Casual = 'Casual'
}

export type AspectRatio = '1:1' | '3:4' | '4:3' | '9:16' | '16:9' | '2:3' | '3:2' | '21:9';
export type ImageSize = '1K' | '2K' | '4K';

export interface GenerationSettings {
  tone: Tone;
  imageSize: ImageSize;
  // If null, we use platform optimal defaults
  forcedAspectRatio: AspectRatio | null; 
}

export interface GeneratedContent {
  platform: SocialPlatform;
  text: string;
  imageUrl?: string;
  isLoading: boolean;
  error?: string;
}

export interface GenerationRequest {
  idea: string;
  settings: GenerationSettings;
}