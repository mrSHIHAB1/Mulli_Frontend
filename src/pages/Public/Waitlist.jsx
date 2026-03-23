import React, { useState } from 'react';
import background from "../../assets/background.png";
import phoneImage from "../../assets/phoneImage.png";
import mulli from "../../assets/Mullii.png";
import { toast } from 'react-toastify';

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

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
      setEmail(""); // clear input
    } catch (err) {
    
      toast.error("Failed to submit email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white font-sans overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full mx-auto container flex flex-col min-h-screen">
        {/* Header / Logo */}
        <nav className="flex items-center gap-2 mb-20">
          <img className="w-28" src={mulli} alt="Mulli Logo" />
        </nav>

        {/* Hero Section */}
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Copy & Form */}
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              What if the golf world was one big clubhouse?
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Because mismatched partners are the real hazard.
            </p>

            {/* Email Form */}
            <form className="flex flex-col sm:flex-row gap-3 mb-8" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/95 text-gray-900 px-6 py-4 rounded-xl w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#4FD1C5] hover:bg-[#3dbbb0] text-gray-900 font-bold px-8 py-4 rounded-xl transition-colors cursor-pointer"
              >
                {loading ? "Submitting..." : "Join Waitlist"}
              </button>
            </form>

            {/* Social Proof */}
            <div className="flex items-center gap-3 mb-12">
              <div className="flex -space-x-2">
                {['DK', 'MT', 'JC', 'RW'].map((initials, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold 
                    ${i === 0 ? 'bg-emerald-800' : i === 1 ? 'bg-teal-700' : i === 2 ? 'bg-blue-900' : 'bg-amber-700'}`}>
                    {initials}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center text-[10px]">+</div>
              </div>
              <p className="text-sm text-gray-400">
                <span className="text-[#4FD1C5] font-bold">147</span> golfers already on the waitlist
              </p>
            </div>

            {/* Launch Info */}
            <div className="mb-10">
              <p className="text-sm font-medium text-gray-400 mb-1">
                <span className="bg-gray-800 px-1.5 py-0.5 rounded text-xs mr-2">CA</span> Launching in Vancouver
              </p>
              <p className="text-[#4FD1C5] text-lg font-medium">Spring 2026</p>
            </div>

            {/* Verification Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[11px] text-gray-400">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Mulli Technologies Inc. · D-U-N-S® Verified · Surrey, BC
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div className="relative flex justify-center ">
            <div className="relative w-[280px] md:w-[320px] transform rotate">
              <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[6px] border-zinc-800">
                <div className="bg-white rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                  <img 
                    src={phoneImage} 
                    alt="App preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-12 pb-2 flex flex-col md:flex-row justify-between items-end text-[10px] text-gray-400 uppercase tracking-wider">
          <div className="flex flex-col gap-1">
            <p>© 2026 Mulli Technologies Inc. · Corporation (CA) · DUNS #243360978</p>
          </div>
          <div className="text-right">
            <p>10667 Arbutus Wynd, Surrey BC V4N 1W5 · CEO: Doyeon Kim</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Waitlist;