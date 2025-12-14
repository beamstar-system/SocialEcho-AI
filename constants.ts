import { AspectRatio, ImageSize, SocialPlatform, Tone } from "./types";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export const PLATFORMS = [
  SocialPlatform.LinkedIn,
  SocialPlatform.Twitter,
  SocialPlatform.Instagram,
];

export const TONES: Tone[] = [
  Tone.Professional,
  Tone.Witty,
  Tone.Urgent,
  Tone.Inspirational,
  Tone.Casual,
];

export const IMAGE_SIZES: ImageSize[] = ['1K', '2K', '4K'];

export const ASPECT_RATIOS: AspectRatio[] = [
  '1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'
];

export const PLATFORM_CONFIG = {
  [SocialPlatform.LinkedIn]: {
    icon: Linkedin,
    color: 'text-blue-500',
    borderColor: 'border-blue-500/50',
    defaultAspectRatio: '16:9' as AspectRatio,
    charLimit: 3000,
    description: "Long-form, professional insights"
  },
  [SocialPlatform.Twitter]: {
    icon: Twitter,
    color: 'text-sky-400',
    borderColor: 'border-sky-400/50',
    defaultAspectRatio: '16:9' as AspectRatio,
    charLimit: 280,
    description: "Short, punchy, trending tags"
  },
  [SocialPlatform.Instagram]: {
    icon: Instagram,
    color: 'text-pink-500',
    borderColor: 'border-pink-500/50',
    defaultAspectRatio: '3:4' as AspectRatio,
    charLimit: 2200,
    description: "Visual-focused, hashtag heavy"
  },
};