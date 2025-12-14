import React from 'react';
import { GeneratedContent } from '../types';
import { PLATFORM_CONFIG } from '../constants';
import { Copy, Download, RefreshCw, AlertCircle, Share2 } from 'lucide-react';

interface PlatformCardProps {
  content: GeneratedContent;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ content }) => {
  const config = PLATFORM_CONFIG[content.platform];
  const Icon = config.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(content.text);
    // Could add toast here
  };

  const handleDownloadImage = () => {
    if (content.imageUrl) {
      const link = document.createElement('a');
      link.href = content.imageUrl;
      link.download = `${content.platform.toLowerCase()}_post.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (content.error) {
    return (
        <div className={`h-full bg-slate-800/30 rounded-2xl border border-red-900/50 p-6 flex flex-col items-center justify-center text-center gap-4`}>
            <AlertCircle className="w-10 h-10 text-red-500" />
            <p className="text-red-400 text-sm">{content.error}</p>
        </div>
    )
  }

  return (
    <div className={`h-full bg-slate-800/40 rounded-2xl border ${config.borderColor} flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:bg-slate-800/60 group`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-3">
          <Icon className={`w-5 h-5 ${config.color}`} />
          <span className="font-semibold text-slate-200">{content.platform}</span>
        </div>
        <div className="text-xs text-slate-500 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700">
           {content.isLoading ? 'Generating...' : 'Ready'}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-5 flex flex-col gap-5 overflow-y-auto">
        
        {/* Text Section */}
        <div className="relative">
          {content.isLoading ? (
            <div className="space-y-2 animate-pulse">
               <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
               <div className="h-4 bg-slate-700/50 rounded w-full"></div>
               <div className="h-4 bg-slate-700/50 rounded w-5/6"></div>
            </div>
          ) : (
            <>
              <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed font-light">
                {content.text}
              </div>
              <button 
                onClick={handleCopy}
                className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-white bg-slate-800 hover:bg-indigo-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title="Copy Text"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>

        {/* Image Section */}
        <div className="flex-grow flex flex-col min-h-[200px]">
             {content.isLoading ? (
                <div className="flex-grow rounded-xl bg-slate-700/20 border border-white/5 animate-pulse flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-slate-600 animate-spin" />
                </div>
             ) : content.imageUrl ? (
                 <div className="relative rounded-xl overflow-hidden border border-white/10 group/image">
                    <img 
                        src={content.imageUrl} 
                        alt={`${content.platform} content`}
                        className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                            onClick={handleDownloadImage}
                            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-900 rounded-full font-medium hover:bg-slate-200 transition-colors transform scale-95 group-hover/image:scale-100 duration-200"
                        >
                            <Download className="w-4 h-4" /> Download
                        </button>
                    </div>
                 </div>
             ) : (
                 <div className="flex-grow rounded-xl bg-slate-900/30 border border-dashed border-slate-700 flex items-center justify-center text-slate-500 text-sm">
                     No image generated
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;