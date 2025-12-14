import React from 'react';
import { AspectRatio, ImageSize, Tone } from '../types';
import { IMAGE_SIZES, TONES, ASPECT_RATIOS } from '../constants';
import { Settings2, Monitor, Image as ImageIcon } from 'lucide-react';

interface SettingsBarProps {
  tone: Tone;
  setTone: (t: Tone) => void;
  imageSize: ImageSize;
  setImageSize: (s: ImageSize) => void;
  forcedAspectRatio: AspectRatio | null;
  setForcedAspectRatio: (r: AspectRatio | null) => void;
  disabled: boolean;
}

const SettingsBar: React.FC<SettingsBarProps> = ({
  tone,
  setTone,
  imageSize,
  setImageSize,
  forcedAspectRatio,
  setForcedAspectRatio,
  disabled
}) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6 backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-6">
        
        {/* Tone Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Settings2 className="w-3 h-3" /> Tone
          </label>
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-700">
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              disabled={disabled}
              className="bg-transparent text-sm text-white focus:outline-none px-2 py-1 w-full cursor-pointer"
            >
              {TONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-slate-700"></div>

        {/* Image Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <ImageIcon className="w-3 h-3" /> Image Resolution
          </label>
          <div className="flex gap-1">
            {IMAGE_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setImageSize(size)}
                disabled={disabled}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  imageSize === size
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-10 bg-slate-700"></div>

        {/* Aspect Ratio Selector */}
        <div className="flex flex-col gap-2 flex-grow">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Monitor className="w-3 h-3" /> Aspect Ratio
          </label>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
               onClick={() => setForcedAspectRatio(null)}
               disabled={disabled}
               className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                 forcedAspectRatio === null
                   ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                   : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
               }`}
            >
              Auto (Best for Platform)
            </button>
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setForcedAspectRatio(ratio)}
                disabled={disabled}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  forcedAspectRatio === ratio
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:bg-slate-800'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsBar;