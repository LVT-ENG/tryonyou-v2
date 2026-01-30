import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, ChevronRight, Sparkles, User, Ruler, Briefcase, Heart, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/virtual-tryon-pro.css';

type Step = 'welcome' | 'camera' | 'scanning' | 'inputs' | 'result';

export default function Demo() {
  const [step, setStep] = useState<Step>('welcome');
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [occasion, setOccasion] = useState('casual');
  const [fit, setFit] = useState('comfortable');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStep('camera');
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback for demo if camera fails
      setStep('camera');
    }
  };

  const handleScan = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('inputs');
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-gold/20 bg-black/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">TY</span>
          </div>
          <span className="font-bold tracking-tighter text-xl">TRYONYOU</span>
        </div>
        <div className="text-[10px] uppercase tracking-widest text-gold/60 font-medium">
          Pilot Experience v1.0
        </div>
      </header>

      <main className="flex-1 relative flex flex-col items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-md"
            >
              <div className="mb-8 relative">
                <div className="w-24 h-24 bg-gold/10 rounded-full mx-auto flex items-center justify-center border border-gold/30">
                  <Sparkles className="w-10 h-10 text-gold" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gold/20 rounded-full blur-2xl"
                />
              </div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Activate your Digital Twin
              </h1>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Experience the future of fashion. Our AI will analyze your silhouette to recommend the perfect garment.
              </p>
              <Button 
                onClick={startCamera}
                className="w-full py-8 bg-gold hover:bg-yellow-500 text-black font-bold text-lg rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02]"
              >
                Start Experience
              </Button>
            </motion.div>
          )}

          {step === 'camera' && (
            <motion.div 
              key="camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg aspect-[3/4] relative rounded-3xl overflow-hidden border-2 border-gold/30 bg-gray-900"
            >
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[70%] h-[85%] border-2 border-dashed border-gold/40 rounded-[100px] relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 py-1 border border-gold/40 rounded-full text-[10px] text-gold uppercase tracking-widest">
                    Align Body
                  </div>
                </div>
              </div>

              <div className="absolute bottom-8 left-0 right-0 px-8">
                <Button 
                  onClick={handleScan}
                  className="w-full py-6 bg-white text-black hover:bg-gray-200 font-bold rounded-xl flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Capture Silhouette
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'scanning' && (
            <motion.div 
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-lg aspect-[3/4] relative rounded-3xl overflow-hidden border-2 border-gold/50 bg-black"
            >
              {/* Fake Scanning Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
              
              <motion.div 
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-1 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative mb-6">
                  <User className="w-32 h-32 text-gold/20" />
                  <motion.div 
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-full h-full border-2 border-gold rounded-full animate-ping opacity-20" />
                  </motion.div>
                </div>
                <h2 className="text-gold font-mono tracking-[0.2em] text-sm uppercase">
                  Analyzing Body Metrics...
                </h2>
                <div className="mt-4 flex gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ scaleY: [1, 2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 h-4 bg-gold/60 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Data points */}
              <div className="absolute top-10 left-10 font-mono text-[10px] text-gold/40">
                X: 42.093<br/>Y: 12.842<br/>Z: 0.002
              </div>
              <div className="absolute bottom-10 right-10 font-mono text-[10px] text-gold/40 text-right">
                FRAME_ID: 9421<br/>SENS_LVL: HIGH
              </div>
            </motion.div>
          )}

          {step === 'inputs' && (
            <motion.div 
              key="inputs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md space-y-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Refine your Profile</h2>
                <p className="text-gray-500 text-sm">Help us personalize your recommendation</p>
              </div>

              <div className="space-y-6">
                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Ruler className="w-3 h-3" /> Height (cm)
                    </label>
                    <input 
                      type="number" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 focus:border-gold/50 outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                      <Maximize className="w-3 h-3" /> Weight (kg)
                    </label>
                    <input 
                      type="number" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-gray-900 border border-white/10 rounded-xl p-4 focus:border-gold/50 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Occasion */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Briefcase className="w-3 h-3" /> Occasion
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['work', 'event', 'casual'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setOccasion(opt)}
                        className={`py-3 rounded-xl text-xs font-medium border transition-all ${
                          occasion === opt 
                            ? 'bg-gold/10 border-gold text-gold' 
                            : 'bg-gray-900 border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit Feeling */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center gap-2">
                    <Heart className="w-3 h-3" /> Fit Feeling
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['comfortable', 'fitted', 'fluid'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => setFit(opt)}
                        className={`py-3 rounded-xl text-xs font-medium border transition-all ${
                          fit === opt 
                            ? 'bg-gold/10 border-gold text-gold' 
                            : 'bg-gray-900 border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setStep('result')}
                className="w-full py-8 bg-gold hover:bg-yellow-500 text-black font-bold text-lg rounded-2xl mt-8"
              >
                Generate Recommendation
              </Button>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md text-center"
            >
              <div className="mb-8 relative inline-block">
                <div className="w-64 h-80 bg-gray-900 rounded-[40px] overflow-hidden border-2 border-gold/30 relative group">
                  <img 
                    src="/assets/garments/white-blazer-hyperrealistic.jpg" 
                    alt="Recommended Garment" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0">
                    <span className="bg-gold text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                      98% Match
                    </span>
                  </div>
                </div>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-black border border-gold/30 rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                </motion.div>
              </div>

              <h2 className="text-3xl font-bold mb-4">Your Perfect Match</h2>
              <p className="text-gold text-lg font-medium mb-8 italic">
                “This is the garment that fits you best.”
              </p>

              <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-6 mb-8 text-left">
                <h3 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">Why this works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5" />
                    <span>The structured shoulders complement your silhouette.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full mt-1.5" />
                    <span>The {fit} fit aligns with your preference for {occasion} use.</span>
                  </li>
                </ul>
              </div>

              <Button 
                onClick={() => setStep('welcome')}
                variant="outline"
                className="w-full py-6 border-gold/30 text-gold hover:bg-gold/5 rounded-xl"
              >
                Restart Experience
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
          Powered by TRYONYOU AI Engine
        </p>
      </footer>
    </div>
  );
}
