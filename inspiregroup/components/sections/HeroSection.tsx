"use client";

import { useEffect, useRef } from "react";
// import { useLanguage } from "@/context/LanguageContext"; 

export default function HeroSection() {
  // const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-12 lg:pt-20 bg-main"
    >
      {/* Playful Background Atmosphere based on Logo Colors */}
      <div className="orb-drift absolute rounded-full pointer-events-none opacity-10 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] -top-[10%] -right-[10%] blur-[100px] lg:blur-[140px] bg-red-500" />
      <div className="orb-drift-delayed absolute rounded-full pointer-events-none opacity-10 w-[70vw] h-[70vw] max-w-[700px] max-h-[700px] -bottom-[10%] -left-[5%] blur-[100px] lg:blur-[140px] bg-yellow-400" />
      <div className="absolute rounded-full pointer-events-none opacity-[0.08] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] top-[40%] left-[30%] blur-[120px] bg-emerald-500" />

      <div className="relative z-[2] w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center max-lg:text-center">
          
          {/* Text Content */}
          <div className="hero-animate mx-auto lg:mx-0 w-full max-w-2xl lg:max-w-none">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-inset border border-content/10 mb-6 max-lg:mx-auto shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted">
                Explore Our World
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-content">
              Welcome to
              <br />
              <span className="text-inspire-logo-gradient drop-shadow-sm pb-2">
                The Inspire Group
              </span>
            </h1>

            {/* UPDATED DESCRIPTION HERE */}
            <p className="text-[clamp(1.05rem,2.5vw,1.25rem)] text-muted leading-relaxed max-w-[540px] mb-10 font-normal max-lg:mx-auto">
              Step into our world. Discover how we operate, connect global talent, and drive innovation across our network.
            </p>

            <div className="flex items-center gap-4 max-lg:justify-center">
              <a
                href="#departments"
                className="inline-flex items-center justify-center gap-2.5 py-4 px-8 text-base md:text-lg font-bold rounded-full bg-content text-main shadow-[var(--shadow-lg)] transition-all hover:scale-105 hover:shadow-[var(--shadow-xl)] hover:-translate-y-1"
              >
                Explore Departments <i className="ph-bold ph-buildings text-xl" /> 
              </a>
            </div>
          </div>

          {/* Playful Portal Visual */}
          <div className="hero-visual-animate relative w-full flex items-center justify-center h-[400px] sm:h-[450px] lg:h-[600px] mt-8 lg:mt-0">
            <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center scale-[0.85] sm:scale-90 md:scale-100">
              
              {/* Central Portal Hub */}
              <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-card border border-content/5 shadow-[var(--shadow-xl)] flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-red-500/5 to-purple-600/10 opacity-70" />
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-main flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <i className="ph-fill ph-house-line text-4xl text-blue-500" />
                  </div>
                  <span className="font-serif font-bold text-lg sm:text-xl block text-content">Welcome Home</span>
                  <span className="text-[10px] sm:text-xs text-muted uppercase tracking-tighter font-bold">Enter the Portal</span>
                </div>
                {/* Scanning Light Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-transparent via-emerald-400/10 to-transparent -translate-y-full animate-[scan_3s_linear_infinite]" />
              </div>

              {/* Floating Value Card: Innovation */}
              <div className="absolute top-4 sm:top-10 -right-4 sm:right-0 w-44 sm:w-48 p-4 bg-card/90 backdrop-blur-md rounded-2xl shadow-[var(--shadow-lg)] border border-content/5 card-bob z-20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <i className="ph-bold ph-lightbulb text-red-500" />
                  </div>
                  <span className="font-bold text-sm text-content">Innovation</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full bg-inset rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-yellow-400" />
                  </div>
                  <div className="h-1.5 w-[60%] bg-inset rounded-full" />
                </div>
              </div>

              {/* Floating Value Card: Global Presence */}
              <div className="absolute bottom-4 sm:bottom-10 -left-4 sm:-left-10 w-48 sm:w-56 p-4 sm:p-5 bg-card/90 backdrop-blur-md rounded-2xl shadow-[var(--shadow-lg)] border border-content/5 card-bob-delayed z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <i className="ph-bold ph-globe-hemisphere-west text-blue-500 text-xl" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block text-content">Global Network</span>
                    <span className="text-[10px] text-muted tracking-wide font-semibold">12+ COUNTRIES</span>
                  </div>
                </div>
              </div>

              {/* Decorative Geometric Portal Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[100%] h-[100%] sm:w-[110%] sm:h-[110%] rounded-full border border-purple-500/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[85%] h-[85%] sm:w-[90%] sm:h-[90%] rounded-full border border-dashed border-emerald-500/20 animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* Playful Orbiting Particles */}
                <div className="absolute w-full h-full animate-[spin_12s_linear_infinite]">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
                </div>
                <div className="absolute w-full h-full animate-[spin_8s_linear_infinite_reverse]">
                   <div className="absolute bottom-10 right-10 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Smooth Color Wheel Order Gradient: Red -> Yellow -> Green -> Blue -> Purple */
        .text-inspire-logo-gradient {
          background-image: linear-gradient(
            to right,
            #EF4444, /* Red */
            #EAB308, /* Yellow */
            #10B981, /* Green */
            #3B82F6, /* Blue */
            #8B5CF6  /* Purple */
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          display: inline-block;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .card-bob {
          animation: bob 5s ease-in-out infinite;
        }
        .card-bob-delayed {
          animation: bob 6s ease-in-out infinite 2s;
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}