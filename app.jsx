import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, Zap, User, Mail, ChevronRight, Star, Clock, FileText, Menu, X, Globe, Layers, ArrowRight, ExternalLink, ArrowLeft, AlertTriangle, Download, Brain, Target, Coffee, Shield } from 'lucide-react';

// --- Custom Animations & Global Styles ---
const CustomStyles = () => (
  <style>{`
    :root {
      --glass-border: rgba(226, 232, 240, 0.6);
      --glass-bg: rgba(255, 255, 255, 0.7);
      --accent-rose: #fb7185;
      --accent-slate: #475569;
    }

    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-in-right {
      from { opacity: 0; transform: translateX(20px); }
      to { opacity: 1; transform: translateX(0); }
    }

    .animate-float { animation: float 8s ease-in-out infinite; }
    .animate-fade-in { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-slide-in { animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }
    
    .glass-card {
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .glass-card:hover {
      transform: translateY(-5px);
      border-color: var(--accent-rose);
      box-shadow: 0 15px 30px -5px rgba(251, 113, 133, 0.15);
      background: rgba(255, 255, 255, 0.9);
    }

    .hero-bg {
      background: 
        radial-gradient(circle at 10% 10%, rgba(253, 164, 175, 0.15), transparent 40%),
        radial-gradient(circle at 90% 90%, rgba(186, 230, 253, 0.15), transparent 40%),
        #f8fafc; /* Slate 50 base */
    }
    
    .stagger-1 { animation-delay: 100ms; }
    .stagger-2 { animation-delay: 200ms; }
    .stagger-3 { animation-delay: 300ms; }
    .stagger-4 { animation-delay: 400ms; }

    /* Soft scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f1f5f9; }
    ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  `}</style>
);

// --- Components ---

const NavButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 text-sm tracking-wide ${
      active
        ? 'bg-rose-400 text-white shadow-lg shadow-rose-200 font-bold transform scale-105'
        : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50 font-medium'
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12 md:mb-16 text-center animate-fade-in px-4">
    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-slate-800 tracking-tight">{title}</h2>
    <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200 mx-auto rounded-full mb-6"></div>
    <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">{subtitle}</p>
  </div>
);

const FeatureCard = ({ title, description, icon: Icon, delay }) => (
  <div className={`glass-card p-6 md:p-8 rounded-3xl h-full flex flex-col group cursor-default animate-fade-in ${delay}`}>
    <div className="mb-6 p-4 bg-rose-50 rounded-2xl w-fit group-hover:bg-rose-100 transition-colors border border-rose-100">
      <Icon className="text-rose-400 group-hover:text-rose-500 transition-colors duration-300" size={28} />
    </div>
    <h3 className="text-2xl font-bold text-slate-800 mb-3 tracking-wide">{title}</h3>
    <p className="text-slate-500 leading-relaxed font-light">{description}</p>
  </div>
);

const ResourceLink = ({ title, url, desc, delay }) => (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`block glass-card p-5 rounded-2xl hover:bg-white group animate-slide-in ${delay}`}>
        <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold text-lg text-slate-700 group-hover:text-rose-500 transition-colors">{title}</h4>
            <ExternalLink size={16} className="text-slate-400 group-hover:text-rose-400 transition-colors" />
        </div>
        {desc && <p className="text-sm text-slate-500 group-hover:text-slate-600 transition-colors">{desc}</p>}
    </a>
);

// --- Sub-Page Components ---

const StudyTipsPage = ({ goBack }) => (
  <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 min-h-screen">
    <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-10 transition-colors group">
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
    </button>
    
    <SectionHeader title="The Art of Distinction" subtitle="Success isn't accidental. It's engineered through strategy and discipline." />

    <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Active Recall */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-1 relative overflow-hidden bg-white/50">
            <div className="absolute top-0 right-0 p-24 bg-rose-100/50 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-rose-500">
                    <Brain size={24} />
                    <h3 className="text-2xl font-bold text-slate-800">Active Recall</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                    Stop re-reading your notes. It's the illusion of competence. Instead, close the book and force your brain to retrieve information.
                </p>
                <div className="space-y-3">
                    <div className="flex items-start gap-3 text-sm text-slate-500">
                        <span className="text-rose-400 font-bold">01.</span>
                        <p>Write questions based on your notes, then answer them without looking.</p>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-slate-500">
                        <span className="text-rose-400 font-bold">02.</span>
                        <p>Teach the concept to an empty chair (The Feynman Technique).</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Spaced Repetition */}
        <div className="glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-2 relative overflow-hidden bg-white/50">
             <div className="absolute top-0 right-0 p-24 bg-blue-100/50 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4 text-blue-500">
                    <Clock size={24} />
                    <h3 className="text-2xl font-bold text-slate-800">Spaced Repetition</h3>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6">
                    Combat the forgetting curve. Review material at increasing intervals to move it from short-term to long-term memory.
                </p>
                <div className="p-4 bg-white/60 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-sm font-mono text-center text-slate-500">
                        Day 1 <span className="text-rose-400">→</span> Day 3 <span className="text-rose-400">→</span> Day 7 <span className="text-rose-400">→</span> Day 21
                    </p>
                </div>
            </div>
        </div>
    </div>

    {/* The Mindset Block */}
    <div className="glass-card p-6 md:p-10 rounded-3xl mb-16 animate-fade-in stagger-3 border-l-4 border-l-rose-400 bg-white">
        <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-rose-50 rounded-2xl shrink-0">
                <Target size={40} className="text-rose-400" />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">The "Paper 6" Mentality</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                    In IGCSE sciences, Paper 6 (Alternative to Practical) is often the easiest to score full marks in, yet many students neglect it. 
                    <span className="text-slate-900 font-semibold"> Treat easy marks with the same respect as hard ones.</span>
                </p>
                <p className="text-slate-500 italic text-sm">
                    "I only did the stuff from the textbook that was included in the syllabus. The syllabus is your bible. If it's not there, don't learn it."
                </p>
            </div>
        </div>
    </div>

    {/* Quick Tips Grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in stagger-4">
        {[
            { icon: Coffee, title: "Deep Work", desc: "No phone. 90m blocks." },
            { icon: Shield, title: "Past Papers", desc: "The only true metric." },
            { icon: FileText, title: "Syllabus", desc: "Your checklist." },
            { icon: Zap, title: "Sleep", desc: "Memory consolidation." }
        ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl text-center border border-slate-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all">
                <item.icon size={24} className="mx-auto mb-3 text-slate-400" />
                <h4 className="text-slate-800 font-bold mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
        ))}
    </div>
  </div>
);

const BiologyPage = ({ goBack }) => (
  <div className="max-w-5xl mx-auto px-4 md:px-6 pt-12 min-h-screen">
    <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-10 transition-colors group">
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to IGCSE
    </button>
    
    <SectionHeader title="Biology (0610)" subtitle="Master the science of life with syllabus-aligned precision." />

    {/* Exam Structure */}
    <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-6 md:p-8 rounded-3xl border-t-2 border-slate-300 animate-fade-in stagger-1">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Core <span className="text-sm font-sans font-normal text-slate-400 ml-2">(Grades C-G)</span></h3>
            <ul className="space-y-4 text-slate-600">
                <li className="flex gap-3 items-center"><span className="text-slate-400 font-mono">P1</span> Multiple Choice (45m)</li>
                <li className="flex gap-3 items-center"><span className="text-slate-400 font-mono">P3</span> Theory (1h 15m)</li>
                <li className="flex gap-3 items-center"><span className="text-slate-400 font-mono">P5</span> Practical Skills (1h 15m)</li>
            </ul>
        </div>
        <div className="glass-card p-6 md:p-8 rounded-3xl border-t-2 border-rose-400 relative overflow-hidden animate-fade-in stagger-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Extended <span className="text-sm font-sans font-normal text-rose-500 ml-2">(Grades A*-E)</span></h3>
                <ul className="space-y-4 text-slate-700">
                    <li className="flex gap-3 items-center"><span className="text-rose-500 font-mono font-bold">P2</span> Multiple Choice (45m)</li>
                    <li className="flex gap-3 items-center"><span className="text-rose-500 font-mono font-bold">P4</span> Theory (1h 15m)</li>
                    <li className="flex gap-3 items-center"><span className="text-rose-500 font-mono font-bold">P6</span> Alt. to Practical (1h 15m)</li>
                </ul>
            </div>
        </div>
    </div>

    {/* Syllabus Topics */}
    <div className="glass-panel p-6 md:p-10 rounded-3xl mb-12 animate-fade-in stagger-3 bg-white/70">
        <h3 className="text-2xl font-bold text-slate-800 mb-8 border-b border-slate-200 pb-4">The 15 Pillars of 0610</h3>
        <div className="grid md:grid-cols-3 gap-y-4 gap-x-8 text-slate-500 text-sm">
            {[
                "Characteristics of living organisms", "Cells & microscopy", "Biological molecules",
                "Enzymes", "Plant & human nutrition", "Transport (plants + humans)",
                "Respiration", "Gas exchange", "Excretion",
                "Coordination & responses", "Reproduction", "Genetics + inheritance",
                "Variation & selection", "Ecology", "Human influences on ecosystems"
            ].map((topic, i) => (
                <div key={i} className="flex gap-3 items-center hover:text-rose-500 transition-colors cursor-default">
                    <span className="text-xs font-mono text-slate-300 font-bold">{(i+1).toString().padStart(2, '0')}</span>
                    {topic}
                </div>
            ))}
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
             <a href="https://www.cambridgeinternational.org/Images/595426-2023-2025-syllabus.pdf" target="_blank" className="text-rose-500 hover:text-rose-600 font-medium tracking-wide text-sm uppercase">Access Official Syllabus PDF</a>
        </div>
    </div>

    {/* Downloads */}
    <div className="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in stagger-4 bg-white">
        <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-50 rounded-lg text-rose-500"><FileText size={24}/></div>
            <div>
                <h4 className="font-bold text-slate-800">Paper 6 Master Guide</h4>
                <p className="text-sm text-slate-500">Personal revision scheme for the Alternative to Practical.</p>
            </div>
        </div>
        <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors text-sm w-full md:w-auto shadow-lg shadow-slate-200">
            Download PDF
        </button>
    </div>
  </div>
);

const IGCSEResourcesPage = ({ goBack }) => (
  <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 min-h-screen">
    <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-10 transition-colors group">
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to IGCSE
    </button>
    
    <SectionHeader title="The IGCSE Repository" subtitle="Curated external tools for high-performance students." />

    <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Column 1: Essentials */}
        <div className="space-y-8">
            <div className="glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-1">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <Star size={18} className="text-rose-400"/> Essentials
                </h3>
                <div className="space-y-4">
                    <ResourceLink title="Cognito" url="https://cognitoedu.org/home" desc="Best for Science & Math visualization." delay="stagger-1" />
                    <ResourceLink title="Save My Exams" url="https://www.savemyexams.com/" desc="The gold standard for notes." delay="stagger-2" />
                    <ResourceLink title="IGCSENotes" url="https://igcsenotes.net/IGCSE/index.html" desc="Quick-fire summary sheets." delay="stagger-3" />
                </div>
            </div>

            <div className="glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-2">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FileText size={18} className="text-blue-400"/> Past Papers
                </h3>
                <div className="space-y-4">
                    <ResourceLink title="Cambridge Official" url="https://www.cambridgeinternational.org/" desc="Direct from the source." delay="stagger-1" />
                    <ResourceLink title="PapaCambridge" url="https://pastpapers.papacambridge.com/" desc="Extensive archive." delay="stagger-2" />
                </div>
            </div>
        </div>

        {/* Column 2 & 3: Subject Specific */}
        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-3">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Subject Libraries</h3>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h4 className="font-bold text-rose-400 mb-4 pb-2 border-b border-slate-100 text-sm tracking-widest uppercase">Biology</h4>
                    <div className="space-y-3">
                        <ResourceLink title="TeachMeAnatomy" url="https://teachmeanatomy.info/" delay="stagger-1"/>
                        <ResourceLink title="Tutor2u Biology" url="https://www.tutor2u.net/biology/reference" delay="stagger-2"/>
                        <ResourceLink title="IGCSE Pro" url="https://igcsepro.org/igcse-biology" delay="stagger-3"/>
                        <ResourceLink title="PMT Biology" url="https://www.physicsandmathstutor.com/" delay="stagger-4"/>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-rose-400 mb-4 pb-2 border-b border-slate-100 text-sm tracking-widest uppercase">English & Econ</h4>
                    <div className="space-y-3">
                        <ResourceLink title="SparkNotes" url="https://www.sparknotes.com/" delay="stagger-1"/>
                        <ResourceLink title="Mr Salles English" url="https://www.youtube.com/c/MrSallesTeachesEnglish" delay="stagger-2"/>
                        <ResourceLink title="EconPlusDal" url="https://econplusdal.com/" delay="stagger-3"/>
                        <ResourceLink title="Tutor2u Economics" url="https://www.tutor2u.net/economics" delay="stagger-4"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

const IBResourcesPage = ({ goBack }) => (
  <div className="max-w-6xl mx-auto px-4 md:px-6 pt-12 min-h-screen">
    <button onClick={goBack} className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-10 transition-colors group">
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to IB
    </button>
    
    <SectionHeader title="IB Resource Vault" subtitle="Tools designed for the rigour of the Diploma Programme." />

    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-12 flex gap-4 items-start animate-fade-in">
        <AlertTriangle className="text-amber-500 shrink-0 mt-1" size={20} />
        <p className="text-amber-800 text-sm leading-relaxed">
            <strong className="text-amber-600 block mb-1">Under Construction</strong>
            The IB section is currently being expanded as the academic year progresses. Expect regular updates to the repository.
        </p>
    </div>

    <div className="grid lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 md:p-8 rounded-3xl h-fit animate-fade-in stagger-1">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Layers size={18} className="text-purple-400"/> Core
            </h3>
            <div className="space-y-4">
                <ResourceLink title="Save My Exams" url="https://www.savemyexams.com/" desc="Essential notes." delay="stagger-1"/>
                <ResourceLink title="Revision Dojo" url="https://www.revisiondojo.com/" desc="AI Question Bank." delay="stagger-2"/>
            </div>
        </div>

        <div className="lg:col-span-2 glass-panel p-6 md:p-8 rounded-3xl animate-fade-in stagger-2">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Subject Specific</h3>
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <h4 className="font-bold text-purple-400 mb-4 pb-2 border-b border-slate-100 text-sm tracking-widest uppercase">Geography & Bio</h4>
                    <div className="space-y-3">
                         <ResourceLink title="IB Geography Pods" url="https://www.ibgeographypods.org/" delay="stagger-1"/>
                         <ResourceLink title="Bio-Letters" url="https://bio-letters.com/" delay="stagger-2"/>
                         <ResourceLink title="PhET Simulations" url="https://phet.colorado.edu/" delay="stagger-3"/>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-purple-400 mb-4 pb-2 border-b border-slate-100 text-sm tracking-widest uppercase">Chemistry</h4>
                    <div className="space-y-3">
                        <ResourceLink title="Master Organic Chem" url="https://www.masterorganicchemistry.com/" delay="stagger-1"/>
                        <ResourceLink title="ChemTube3D" url="https://www.chemtube3d.com/" delay="stagger-2"/>
                        <ResourceLink title="IB Your Way Out" url="https://ibyourwayout.wordpress.com/" delay="stagger-3"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

// --- Main Pages ---

const HomeSection = ({ setPage }) => (
  <div className="space-y-24 md:space-y-32">
    {/* Hero */}
    <div className="relative min-h-[75vh] flex items-center justify-center text-center px-4 md:px-6">
      <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-rose-200/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-200/20 rounded-full blur-[80px] md:blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10 max-w-5xl space-y-8 md:space-y-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 shadow-sm text-slate-500 text-xs font-semibold tracking-wide uppercase">
          <Zap size={12} className="text-rose-400" />
          <span>Latest: 0610 Biology Module Live</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-slate-800 leading-[1.1]">
          Bridge the gap to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 animate-shimmer bg-[length:200%_auto]">Excellence.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
          The ultimate resource hub for IGCSE & IB. Curated by distinction achievers to help you bypass the struggle.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-8">
          <button 
            onClick={() => setPage('igcse')}
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-slate-800 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-slate-300"
          >
            Explore IGCSE <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => setPage('ib')}
            className="px-8 py-4 bg-white text-slate-800 rounded-full font-bold text-lg hover:bg-slate-50 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-md border border-slate-100"
          >
            Explore IB <Layers size={20} />
          </button>
        </div>
      </div>
    </div>

    {/* Features Grid */}
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <SectionHeader title="The Study Bridge Standard" subtitle="Built by students, for students. We cut through the noise." />
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        <FeatureCard 
          icon={Star}
          title="Distinction Quality"
          description="Materials derived from proven success strategies. Created by an ICE Distinction graduate."
          delay="stagger-1"
        />
        <FeatureCard 
          icon={Clock}
          title="Time Efficient"
          description="Don't waste hours searching. We've consolidated the most effective resources in one hub."
          delay="stagger-2"
        />
        <FeatureCard 
          icon={Globe}
          title="Zero Cost Access"
          description="Education should be accessible. No paywalls, no hidden fees. Just pure value."
          delay="stagger-3"
        />
      </div>
    </div>

    {/* Author Section */}
    <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24">
      <div className="glass-panel rounded-[2rem] p-6 md:p-16 relative overflow-hidden group bg-white">
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-rose-50 to-blue-50 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-rose-100/50 transition-colors duration-1000 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-rose-100 to-blue-100 p-1 shadow-xl shrink-0 flex items-center justify-center border border-white">
             <User size={64} className="text-slate-400" />
          </div>
          
          <div className="text-center md:text-left space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">About The Founder</h2>
              <p className="text-rose-400 font-bold tracking-wide uppercase text-sm">Class of 2025 • Distinction (ICE) Awardee</p>
            </div>
            <p className="text-slate-500 leading-relaxed text-base md:text-lg font-light">
              IGIB Study Bridge was established in Oct 2025 as a CAS service project. With top scores in History (94), Spanish (94), and Literature (91), the goal is simple: to democratize academic success. Currently pursuing IB HL Geography, Chemistry, and English.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              {['Biology (85)', 'History (94)', 'Spanish (94)', 'Lit (91)'].map((score, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600 font-bold">
                  {score}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const IGCSEPage = ({ setPage }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 min-h-screen animate-fade-in">
    <SectionHeader title="IGCSE Pathway" subtitle="Comprehensive resources for the Cambridge IGCSE curriculum." />
    
    <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-24">
      
      {/* Biology */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border-t-4 border-emerald-400 hover:border-emerald-300 group bg-white">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Biology (0610)</h3>
          <span className="bg-emerald-50 text-emerald-600 text-xs px-2 py-1 rounded border border-emerald-100">Updated</span>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed">Complete revision notes, diagram breakdowns, and definitions for the 0610 syllabus.</p>
        <button 
          onClick={() => setPage('igcse-biology')}
          className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-emerald-200"
        >
          Access Module <ChevronRight size={16} />
        </button>
      </div>

      {/* Resources */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border-t-4 border-blue-400 hover:border-blue-300 group bg-white">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-800">IGCSE Resources</h3>
          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded border border-blue-100">Repository</span>
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed">General revision guides, past paper links, and subject-wide tools available now.</p>
        <button 
          onClick={() => setPage('igcse-resources')}
          className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-blue-200"
        >
          Open Repository <ChevronRight size={16} />
        </button>
      </div>

      {/* Study Tips - UPDATED */}
       <div className="glass-card p-6 md:p-8 rounded-3xl border-t-4 border-rose-400 hover:border-rose-300 group bg-white">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Strategy & Tips</h3>
          <Zap size={20} className="text-rose-400" />
        </div>
        <p className="text-slate-500 mb-8 leading-relaxed">Active recall, spaced repetition, and the "Distinction" mindset.</p>
        <button 
            onClick={() => setPage('study-tips')}
            className="w-full py-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-rose-200"
        >
            Read Guide <ChevronRight size={16} />
        </button>
      </div>
    </div>
  </div>
);

const IBPage = ({ setPage }) => (
  <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 min-h-screen animate-fade-in">
    <SectionHeader title="International Baccalaureate" subtitle="The gold standard of pre-university education." />
    
    <div className="grid md:grid-cols-2 gap-8 mb-24">
      <div className="glass-card p-6 md:p-10 rounded-3xl relative overflow-hidden group bg-white">
        {/* FIX: Ensure z-index is lower than text and pointer events are removed */}
        <div className="absolute top-0 right-0 p-40 bg-purple-50 rounded-full blur-3xl group-hover:bg-purple-100 transition-all duration-700 pointer-events-none z-0"></div>
        {/* FIX: Ensure content has higher z-index */}
        <div className="relative z-10">
            <h3 className="text-3xl font-bold text-slate-800 mb-6">IB Resources</h3>
            <p className="text-slate-500 mb-10 leading-relaxed text-lg">
                Curated internal assessment (IA) examples, Theory of Knowledge (TOK) essay structures, and HL/SL specific revision guides.
            </p>
            <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm"></div>
                    <span>HL Geography Notes</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm"></div>
                    <span>Chemistry Data Booklet Breakdown</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-sm"></div>
                    <span>English A: Lang & Lit Analysis</span>
                </div>
            </div>
            <button 
              onClick={() => setPage('ib-resources')}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-purple-600 transition-all hover:scale-105 flex items-center gap-2 shadow-lg shadow-purple-200"
            >
                Enter Library <ChevronRight size={18} />
            </button>
        </div>
      </div>

       <div className="glass-panel p-6 md:p-10 rounded-3xl flex flex-col justify-center text-center relative overflow-hidden bg-white/60">
        <div className="absolute inset-0 bg-white/40 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="relative z-10">
            <GraduationCap size={56} className="text-slate-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-800 mb-3">More Content Loading...</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
                The IB section is currently under active development. Expect major updates in Q1 2026.
            </p>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                    <BookOpen className="text-rose-400" />
                    <span className="text-xl font-bold text-slate-800 tracking-widest">IGIB STUDY BRIDGE</span>
                </div>
                <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
                    A non-commercial, student-run educational project designed to help you bridge the gap to your academic goals.
                </p>
            </div>
            
            <div>
                <h4 className="text-slate-800 font-bold mb-6">Roadmap</h4>
                <ul className="space-y-3 text-sm text-slate-500">
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Oct 2025: Launch</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>Dec 2025: Bio 0610</li>
                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>Jan 2026: Experience Tab</li>
                </ul>
            </div>

            <div>
                <h4 className="text-slate-800 font-bold mb-6">Contact</h4>
                <div className="flex items-center gap-3 text-slate-500 mb-3 group cursor-pointer">
                    <Mail size={18} className="group-hover:text-rose-400 transition-colors" />
                    <a href="mailto:igibstudybridge@gmail.com" className="group-hover:text-slate-800 transition-colors">igibstudybridge@gmail.com</a>
                </div>
                <p className="text-xs text-slate-400">
                    Managed by a student. Please allow a few days for responses.
                </p>
            </div>
        </div>
        <div className="text-center text-xs text-slate-400 pt-8 border-t border-slate-200">
            <p>© 2025 IGIB Study Bridge. Not affiliated with Cambridge Assessment or IB Organization.</p>
        </div>
    </footer>
);

// --- Main App Component ---

export default function App() {
  const [page, setPage] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (p) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-900 flex flex-col overflow-x-hidden">
      <CustomStyles />
      
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass-panel py-3 shadow-sm' : 'bg-transparent py-4 md:py-8'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('home')}
          >
            <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
                <BookOpen className="text-rose-400" size={20} />
            </div>
            <span className="text-lg font-bold text-slate-800 tracking-wider hidden sm:inline">IGIB <span className="text-slate-400 font-sans text-xs ml-1 font-normal tracking-normal uppercase">Study Bridge</span></span>
            <span className="text-lg font-bold text-slate-800 tracking-wider sm:hidden">IGIB</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2 bg-white/80 rounded-full p-1.5 border border-slate-200 shadow-sm backdrop-blur-md">
            <NavButton active={page === 'home'} label="Home" icon={User} onClick={() => navigate('home')} />
            <NavButton active={page.includes('igcse') || page === 'study-tips'} label="IGCSE" icon={BookOpen} onClick={() => navigate('igcse')} />
            <NavButton active={page.includes('ib')} label="IB Diploma" icon={GraduationCap} onClick={() => navigate('ib')} />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-500 hover:text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-slate-200 p-6 flex flex-col gap-4 animate-fade-in bg-white/95">
             <button onClick={() => navigate('home')} className="p-4 text-left bg-slate-50 rounded-xl text-slate-800 font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors">Home</button>
             <button onClick={() => navigate('igcse')} className="p-4 text-left bg-slate-50 rounded-xl text-slate-800 font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors">IGCSE</button>
             <button onClick={() => navigate('ib')} className="p-4 text-left bg-slate-50 rounded-xl text-slate-800 font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors">IB Diploma</button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 md:pt-32 flex-grow hero-bg">
        {page === 'home' && <HomeSection setPage={navigate} />}
        {page === 'igcse' && <IGCSEPage setPage={navigate} />}
        {page === 'ib' && <IBPage setPage={navigate} />}
        
        {/* Render Sub-Pages */}
        {page === 'igcse-biology' && <BiologyPage goBack={() => navigate('igcse')} />}
        {page === 'igcse-resources' && <IGCSEResourcesPage goBack={() => navigate('igcse')} />}
        {page === 'ib-resources' && <IBResourcesPage goBack={() => navigate('ib')} />}
        {page === 'study-tips' && <StudyTipsPage goBack={() => navigate('igcse')} />}
      </main>

      <Footer />
    </div>
  );
}
