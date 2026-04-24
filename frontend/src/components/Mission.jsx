export default function Mission() {
  return (
    <div className="py-28 text-center bg-deepnavy-light relative overflow-hidden">
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-babyblue/50 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-babyblue/50 to-transparent"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sapphire/20 border border-babyblue/20">
          <span className="text-sm font-semibold text-babyblue">Our Purpose</span>
        </div>

        <h2 className="text-4xl font-bold mb-8 text-babyblue">
          Our Mission
        </h2>

        <p className="text-xl text-periwinkle/80 leading-relaxed">
          We aim to simplify research understanding for everyone. ResearchMate uses AI
          and plain language explanations to help students and professionals easily
          understand complex research papers and extract meaningful insights.
        </p>

        <div className="mt-10 flex justify-center gap-12">
          <div className="text-center">
            <div className="text-3xl font-black text-babyblue">10K+</div>
            <div className="text-sm text-periwinkle/60 mt-1">Papers Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-babyblue">5K+</div>
            <div className="text-sm text-periwinkle/60 mt-1">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-babyblue">99%</div>
            <div className="text-sm text-periwinkle/60 mt-1">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}

