import { Link } from 'react-router-dom';

export default function Hero({ user }) {
  return (
    <div className="relative flex items-center justify-between px-16 py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-deepnavy via-deepnavy-light/40 to-sapphire/5 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sapphire/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cornflower/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* LEFT */}
      <div className="relative max-w-xl animate-fade-in-up z-10">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sapphire/20 border border-babyblue/20">
          <span className="text-sm font-semibold text-babyblue">✨ AI-Powered Research Assistant</span>
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
          <span className="text-white">Simplifying Research</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire to-cornflower animate-pulse">Understanding</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cornflower to-babyblue">for Everyone</span>
        </h1>

        <p className="text-xl text-periwinkle/80 mb-10 leading-relaxed">
          ResearchMate helps you understand research papers with AI-powered summaries,
          Q&A, and smart recommendations.
        </p>

        <div className="flex gap-6" style={{ animationDelay: '0.4s' }}>
          {user ? (
            <Link to="/upload" className="btn shadow-xl shadow-sapphire/20 hover:shadow-2xl hover:shadow-sapphire/30 transform hover:-translate-y-1">
              🚀 Upload PDF
            </Link>
          ) : (
            <Link to="/login" className="btn shadow-xl shadow-sapphire/20 hover:shadow-2xl hover:shadow-sapphire/30 transform hover:-translate-y-1">
              🎯 Get Started
            </Link>
          )}

          <button className="px-8 py-3 rounded-2xl font-semibold bg-deepnavy/40 border border-babyblue/30 text-babyblue hover:bg-deepnavy/60 transition-all duration-300">
            ✨ Explore Features
          </button>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative animate-float hover:animate-pulse z-10">
        <div className="absolute inset-0 bg-gradient-to-tr from-sapphire/5 to-cornflower/5 rounded-3xl blur-2xl"></div>
        <img
          src="\robot-hand-touching-glowing-dna-strand-with-human-hand-futuristic-setting.jpg"
          className="relative w-[500px] h-[450px] drop-shadow-2xl transition-all duration-500 rounded-3xl hover:rotate-2 hover:scale-105 hover-lift"
          alt="AI Research Assistant"
        />
      </div>
    </div>
  );
}

