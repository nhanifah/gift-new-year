import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, Sparkles, Volume2, VolumeX, Scissors } from 'lucide-react';

// URL Audio Terompet/Perayaan (Short sound effect)
const TRUMPET_SOUND_URL = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_12b0c7443c.mp3?filename=tada-fanfare-a-6313.mp3";

// --- Custom Styles untuk Font & Texture ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Courier+Prime:wght@400;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
    
    .font-hand { font-family: 'Caveat', cursive; }
    .font-typewriter { font-family: 'Courier Prime', monospace; }
    .font-serif-display { font-family: 'Playfair Display', serif; }

    /* Paper Texture Effect */
    .bg-paper-texture {
      background-color: #fdfbf7;
      background-image: url("https://www.transparenttextures.com/patterns/cream-paper.png");
    }
    
    .bg-card-texture {
      background-color: #fffefb;
      background-image: url("https://www.transparenttextures.com/patterns/sketch-pad.png");
    }

    /* Jagged Edge / Torn Paper Effect using CSS mask */
    .torn-edge-bottom {
      mask-image: linear-gradient(to bottom, transparent 50%, black 50%),
        linear-gradient(to bottom right, transparent 50%, black 50%),
        linear-gradient(to bottom left, transparent 50%, black 50%);
      mask-size: 100% 20px;
      mask-position: bottom;
      mask-repeat: repeat-x;
    }
    
    .shadow-layered {
      box-shadow: 
        0 1px 1px rgba(0,0,0,0.05), 
        0 10px 0 -5px #eee, 
        0 10px 1px -4px rgba(0,0,0,0.05),
        0 20px 0 -10px #e5e5e5,
        0 20px 1px -9px rgba(0,0,0,0.05);
    }
  `}</style>
);

export function Welcome() {
	const [isOpened, setIsOpened] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  // Ref untuk Audio
  const audioRef = useRef(null);

  // Load Canvas Confetti dari CDN secara dinamis
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Setup Audio
    audioRef.current = new Audio(TRUMPET_SOUND_URL);
    audioRef.current.volume = 0.5;

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const triggerConfetti = () => {
    if (window.confetti) {
      // Ledakan Utama - Emas & Merah Elegan
      window.confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#8B0000', '#F5F5DC', '#2F4F4F'],
        zIndex: 9999,
        scalar: 1.2
      });
    }
  };

  const handleOpenGift = () => {
    setIsOpened(true);
    triggerConfetti();
    
    if (audioEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.log("Audio play failed (user interaction needed):", e));
    }
  };

  return (
    <div className="min-h-screen bg-paper-texture flex items-center justify-center p-6 relative overflow-hidden text-slate-800">
      <GlobalStyles />

      {/* Background Elements (Polaroids scattered) */}
      <div className="absolute top-10 left-10 w-32 h-40 bg-white shadow-md rotate-[-12deg] p-2 opacity-40 hidden md:block">
        <div className="w-full h-24 bg-slate-200 mb-2"></div>
        <div className="h-2 w-16 bg-slate-200 rounded"></div>
      </div>
      <div className="absolute bottom-20 right-10 w-40 h-32 bg-white shadow-md rotate-[8deg] p-2 opacity-40 hidden md:block">
         <div className="w-full h-full border-2 border-dashed border-slate-300"></div>
      </div>

      {/* Audio Toggle (Styled as a sticker) */}
      <button 
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-6 right-6 z-50 p-3 bg-white shadow-md rounded-full border-2 border-slate-100 hover:scale-110 transition-transform rotate-6"
      >
        {audioEnabled ? <Volume2 size={20} className="text-slate-600" /> : <VolumeX size={20} className="text-slate-400" />}
      </button>

      <div className="relative z-10 w-full max-w-md perspective-1000">
        <AnimatePresence mode='wait'>
          {!isOpened ? (
            <InitialState key="initial" onOpen={handleOpenGift} />
          ) : (
            <VoucherState key="voucher" />
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 text-center w-full font-typewriter text-slate-400 text-xs tracking-widest">
        DRAFT_NO_2026 // HANDCRAFTED
      </div>
    </div>
  );
}

// --- VIEW 1: State Awal (Amplop Vintage) ---
function InitialState({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card-texture p-1 rounded-sm shadow-xl relative transform rotate-1 border border-slate-200"
    >
      {/* Washi Tape Top */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-10 bg-yellow-200/80 rotate-1 shadow-sm backdrop-blur-[1px]" style={{clipPath: "polygon(0% 10%, 100% 0%, 98% 100%, 2% 90%)"}}></div>

      <div className="bg-white/50 p-8 border border-slate-100 h-full flex flex-col items-center text-center relative overflow-hidden">
        {/* Stamp Effect */}
        <div className="absolute top-4 right-4 border-2 border-red-800/30 text-red-800/30 rounded-full w-20 h-20 flex items-center justify-center rotate-[-25deg] pointer-events-none">
          <span className="font-typewriter text-[10px] font-bold uppercase text-center leading-tight">Post<br/>Office<br/>2026</span>
        </div>

        <div className="space-y-4 mb-8 mt-4 relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-block px-4 py-1 bg-slate-800 text-white font-typewriter text-xs tracking-[0.2em] mb-2"
          >
            CONFIDENTIAL
          </motion.div>
          
          <h1 className="text-5xl font-serif-display text-slate-800 leading-tight">
            Happy <br/><span className="italic text-red-700">New Year</span>
          </h1>
          
          <div className="w-16 h-1 bg-red-700 mx-auto my-4 rounded-full opacity-80"></div>

          {/* Handwritten Note */}
          <div className="font-hand text-2xl text-slate-600 leading-relaxed -rotate-1 transform mt-2 relative">
            <span className="absolute -left-4 -top-4 text-4xl text-slate-300">"</span>
            Makan nasi lauknya itik,<br/>
            Minumnya es kelapa muda.<br/>
            Kado Alif isinya irit,<br/>
            Cukup buat beli seblak aja.
            <span className="absolute -bottom-8 -right-2 text-4xl text-slate-300">"</span>
          </div>
        </div>

        {/* Interactive Wax Seal / Button */}
        <div className="relative mt-2 mb-6">
           <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 group"
          >
            <div className="relative">
              <Gift size={80} className="text-red-800 drop-shadow-md" strokeWidth={1} />
              {/* String tie */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-900/40 -z-10"></div>
              <div className="absolute top-0 left-1/2 h-full w-[2px] bg-red-900/40 -z-10"></div>
            </div>
            
            <motion.div 
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-max font-hand text-xl text-slate-500 font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ( Buka Disini )
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// --- VIEW 2: State Akhir (Voucher / Letter) ---
function VoucherState() {
  const [copied, setCopied] = useState(false);
  const voucherCode = "72737449";

  const handleCopy = () => {
    // Fallback safe copy
    const textArea = document.createElement("textarea");
    textArea.value = voucherCode;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="bg-paper-texture max-w-sm mx-auto shadow-2xl relative"
      style={{
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
    >
      {/* Torn Edge Top */}
      <div className="h-4 w-full bg-[#2c3e50]" style={{
         maskImage: "linear-gradient(45deg, transparent 50%, black 50%), linear-gradient(-45deg, transparent 50%, black 50%)",
         maskSize: "15px 15px",
         maskRepeat: "repeat-x",
         maskPosition: "bottom"
      }}></div>

      <div className="p-8 border-x border-slate-200/50">
        
        {/* Header Elegant */}
        <div className="text-center mb-8 border-b-2 border-double border-slate-200 pb-6">
           <div className="flex justify-center mb-4 text-yellow-600">
             <Sparkles size={32} strokeWidth={1.5} />
           </div>
           <h2 className="font-serif-display text-3xl font-bold text-slate-800 mb-2">Voucher Eksklusif</h2>
           <p className="font-typewriter text-xs text-slate-500 tracking-widest uppercase">Edisi Tahun Baru 2026</p>
        </div>

        {/* Voucher Cutout Area */}
        <div className="relative bg-white border-2 border-dashed border-slate-300 p-6 rounded-sm mb-8 group">
           {/* Scissors Icon */}
           <div className="absolute -top-3 -right-3 bg-paper-texture p-1 text-slate-400 rotate-90">
             <Scissors size={16} />
           </div>

           <p className="text-center font-hand text-xl text-slate-500 mb-2">Kode THR Anda:</p>
           
           <div className="flex flex-col items-center gap-4">
             <div className="bg-slate-100 px-6 py-3 rounded-sm border border-slate-200 shadow-inner w-full text-center">
                <code className="font-typewriter text-3xl font-bold text-slate-800 tracking-wider block">
                  {voucherCode}
                </code>
             </div>
             
             <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2 bg-slate-800 text-white font-typewriter text-sm hover:bg-slate-700 transition-colors shadow-lg active:translate-y-1 w-full justify-center"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                {copied ? "TERSALIN" : "SALIN KODE"}
              </button>
           </div>
        </div>

        {/* Instructions - Typewriter style */}
        <div className="space-y-4">
           <h3 className="font-serif-display text-lg font-bold text-slate-800 border-l-4 border-red-700 pl-3">
             Instruksi Pencairan
           </h3>
           <ol className="list-decimal list-inside font-typewriter text-xs text-slate-600 space-y-3 leading-relaxed">
             <li className="pl-2"><strong className="text-slate-800">Buka myBCA</strong> di smartphone Anda.</li>
             <li className="pl-2">Pilih menu <strong className="text-slate-800">Transfer</strong> &gt; <strong className="text-slate-800">BagiBagi</strong> &gt; <strong className="text-slate-800">Klaim kode BagiBagi</strong>.</li>
             <li className="pl-2">Tempel kode di atas untuk klaim.</li>
           </ol>
        </div>

      </div>

      {/* Footer Torn Edge */}
      <div className="h-6 w-full bg-slate-100 torn-edge-bottom opacity-50"></div>
      
      {/* Footer Note */}
      <div className="bg-slate-800 text-slate-300 p-4 text-center font-typewriter text-[10px] tracking-widest">
         VALID UNTIL: JAN 2, 2026
      </div>
    </motion.div>
  );
}