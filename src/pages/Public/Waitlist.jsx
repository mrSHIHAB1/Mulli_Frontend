import React, { useState } from 'react';
import background from "../../assets/background.png";
import phoneImage from "../../assets/phoneImage.png";
import mulli from "../../assets/MulliLogo.png";
import { toast } from 'react-toastify';

import phoneImage2 from "../../assets/m2.png";
import phoneImage3 from "../../assets/m3.png";
import phoneImage4 from "../../assets/m4.png";
import phoneImage5 from "../../assets/m5.png";
import canada from "../../assets/canada.png";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(0);
  const [visible, setVisible] = useState(true);

  const screens = [phoneImage, phoneImage2, phoneImage3, phoneImage4, phoneImage5];

  const navigate = (dir) => {
    setVisible(false);
    setTimeout(() => {
      setCurrentScreen((prev) =>
        dir === 'right'
          ? (prev + 1) % screens.length
          : (prev - 1 + screens.length) % screens.length
      );
      setVisible(true);
    }, 250);
  };

  const goTo = (i) => {
    if (i === currentScreen) return;
    setVisible(false);
    setTimeout(() => { setCurrentScreen(i); setVisible(true); }, 250);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter a valid email");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/v1/waitlists/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      toast.success(data.message || "Email submitted!");
      setEmail("");
    } catch (err) {
      toast.error("Failed to submit email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full bg-black text-white font-sans overflow-x-hidden
                    min-h-screen
                    lg:h-screen lg:max-h-screen lg:overflow-hidden">
      <style>{`
        .arrow-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(79,209,197,0.15);
          border: 1.5px solid rgba(79,209,197,0.4);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          backdrop-filter: blur(6px);
          flex-shrink: 0;
        }
        @media (min-width: 1024px) {
          .arrow-btn { width: 40px; height: 40px; }
        }
        .arrow-btn:hover {
          background: rgba(79,209,197,0.3);
          border-color: rgba(79,209,197,0.8);
          transform: scale(1.1);
        }
        .arrow-btn:active { transform: scale(0.95); }
        .arrow-btn svg {
          width: 16px; height: 16px;
          stroke: #4FD1C5; stroke-width: 2.2;
          fill: none; stroke-linecap: round; stroke-linejoin: round;
        }
        @media (min-width: 1024px) {
          .arrow-btn svg { width: 18px; height: 18px; }
        }
        .dot {
          width: 6px; height: 6px;
          border-radius: 50%; border: none; padding: 0;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .phone-screen-img {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .fade-out { opacity: 0; transform: scale(0.97); }
        .fade-in  { opacity: 1; transform: scale(1); }
      `}</style>

      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-0 lg:container flex flex-col
                      min-h-screen lg:h-full">

        {/* Nav */}
        <nav className="flex items-center gap-2 pt-6 pb-8 lg:pt-0 lg:pb-0 lg:mb-20">
          <img className="w-22 sm:w-24 lg:w-28" src={mulli} alt="Mulli Logo" />
        </nav>

        {/* Hero */}
        <main className="flex-grow flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center pb-6 lg:pb-0">

          {/* Left: Copy & Form */}
          <div className="w-full max-w-4xl mb-10 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 lg:mb-6">
              What if the golf world was one big clubhouse?
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 lg:mb-10">
              Because mismatched partners are the real hazard.
            </p>

            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-6 lg:mb-8" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 text-gray-900 px-4 sm:px-6 py-3 lg:py-4 rounded-xl w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#4FD1C5] text-sm lg:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4FD1C5] hover:bg-[#3dbbb0] text-gray-900 font-bold px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-colors cursor-pointer text-sm lg:text-base whitespace-nowrap"
              >
                {loading ? "Submitting..." : "Get Early Access"}
              </button>
            </form>

            <div className="mb-3 lg:mb-4">

              <p className="text-sm lg:text-base font-medium text-gray-400 mb-1 ">
                Be among first golfers in Vancouver
              </p>



              <p className="text-[#4FD1C5] text-base lg:text-lg font-medium">
                Join golfers getting early access
              </p>
              <hr className="border-gray-700 mt-4 w-1/2" />
            </div>

            {/* Launch Info */}
            <div className="mb-6 lg:mb-10">
              <div className="flex items-center gap-2">
                <p className="text-xl lg:text-2xl font-medium text-white-400 mb-1">
                  Launching in Vancouver
                </p>
                <img src={canada} className="w-8" />
              </div>

              <p className="text-[#4FD1C5] text-lg lg:text-xl font-medium mb-3">
                Spring 2026
              </p>
              <p className="text-base lg:text-lg font-medium text-gray-400 ">
                Bulit for golfers, Designed for real connections
              </p>
            </div>

            {/* Verification Badge */}

          </div>

          {/* Right: Phone Carousel */}
          <div className="flex flex-col items-center gap-3 lg:gap-4 w-full">

            <div className="flex items-center gap-3 lg:gap-4 w-full justify-center">

              {/* Left Arrow */}
              <button className="arrow-btn" onClick={() => navigate('left')} aria-label="Previous screen">
                <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
              </button>

              {/* Phone Mockup */}
              <div className="relative w-[220px] sm:w-[260px] lg:w-[280px] xl:w-[320px]">
                <div className="bg-zinc-900 rounded-[2.5rem] lg:rounded-[3rem] p-2.5 lg:p-3 shadow-2xl border-[5px] lg:border-[6px] border-zinc-800">
                  <div className="bg-white rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden aspect-[9/19] relative">
                    <img
                      src={screens[currentScreen]}
                      alt={`App screen ${currentScreen + 1}`}
                      className={`phone-screen-img w-full h-full object-cover absolute inset-0 ${visible ? 'fade-in' : 'fade-out'}`}
                    />
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-[24px] lg:top-[28px] left-1/2 -translate-x-1/2 w-16 lg:w-20 h-4 lg:h-5 bg-zinc-900 rounded-full z-10" />
              </div>

              {/* Right Arrow */}
              <button className="arrow-btn" onClick={() => navigate('right')} aria-label="Next screen">
                <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="flex items-center gap-2 mt-1">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to screen ${i + 1}`}
                  className="dot"
                  style={{
                    background: i === currentScreen ? '#4FD1C5' : 'rgba(255,255,255,0.25)',
                    transform: i === currentScreen ? 'scale(1.3)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-6 lg:pt-12 pb-4 lg:pb-2 flex flex-col gap-1 lg:flex-row lg:justify-between lg:items-end text-[9px] lg:text-[10px] text-gray-400 uppercase tracking-wider">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 lg:px-4 py-2 rounded-full text-[10px] lg:text-[11px] text-gray-400">

            © 2026 Mulli Technologies Inc.
          </div>

        </footer>

      </div>
    </div>
  );
};

export default Waitlist;