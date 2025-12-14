import React, { useState } from 'react';
import { AspectRatio, GeneratedContent, GenerationSettings, ImageSize, SocialPlatform, Tone } from './types';
import { PLATFORMS, TONES } from './constants';
import { generatePlatformText, generatePlatformImage } from './services/geminiService';
import PlatformCard from './components/PlatformCard';
import SettingsBar from './components/SettingsBar';
import { Sparkles, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Settings State
  const [tone, setTone] = useState<Tone>(Tone.Professional);
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [forcedAspectRatio, setForcedAspectRatio] = useState<AspectRatio | null>(null);

  // Content State
  const [contents, setContents] = useState<GeneratedContent[]>([]);

  const handleGenerate = async () => {
    if (!idea.trim()) return;

    setIsGenerating(true);
    
    // Initialize placeholders
    const initialContents: GeneratedContent[] = PLATFORMS.map(platform => ({
      platform,
      text: '',
      isLoading: true
    }));
    setContents(initialContents);

    // Launch requests in parallel but independent of each other
    const promises = PLATFORMS.map(async (platform) => {
      try {
        // Parallelize Text and Image generation for this platform
        const [text, imageUrl] = await Promise.all([
          generatePlatformText(platform, idea, tone),
          generatePlatformImage(platform, idea, tone, imageSize, forcedAspectRatio)
        ]);

        setContents(prev => prev.map(p => {
          if (p.platform === platform) {
            return {
              ...p,
              text,
              imageUrl,
              isLoading: false
            };
          }
          return p;
        }));
      } catch (error) {
        setContents(prev => prev.map(p => {
          if (p.platform === platform) {
            return {
              ...p,
              isLoading: false,
              error: 'Failed to generate content'
            };
          }
          return p;
        }));
      }
    });

    await Promise.all(promises);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            SocialEcho
          </h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Input Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Turn ideas into <span className="text-indigo-400">impact.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Generate tailored content and visuals for LinkedIn, X, and Instagram in seconds.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-2 shadow-2xl shadow-black/50 border border-slate-800">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="What do you want to post about? e.g., 'The future of remote work using AI tools'..."
              className="w-full bg-slate-950 text-slate-200 p-6 rounded-xl border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none resize-none text-lg min-h-[120px] placeholder:text-slate-600 transition-all"
              disabled={isGenerating}
            />
          </div>
        </section>

        {/* Controls */}
        <section className="max-w-4xl mx-auto mb-12">
           <SettingsBar 
              tone={tone}
              setTone={setTone}
              imageSize={imageSize}
              setImageSize={setImageSize}
              forcedAspectRatio={forcedAspectRatio}
              setForcedAspectRatio={setForcedAspectRatio}
              disabled={isGenerating}
           />

           <button
              onClick={handleGenerate}
              disabled={!idea.trim() || isGenerating}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                !idea.trim() || isGenerating
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.01]'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate All Content
                </>
              )}
            </button>
        </section>

        {/* Output Grid */}
        {contents.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {contents.map((content) => (
              <div key={content.platform} className="h-[600px]">
                <PlatformCard content={content} />
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default App;