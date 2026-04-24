export default function CTA({ user }) {
  return (
    <div className="py-28 text-center bg-deepnavy relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cornflower/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-sapphire/20 border border-babyblue/20">
          <span className="text-sm font-semibold text-babyblue">Start Today</span>
        </div>

        <h2 className="text-4xl font-bold mb-5 text-babyblue">
          Ready to Simplify Research?
        </h2>

        <p className="text-lg text-periwinkle/70 mb-10 max-w-lg mx-auto">
          Join thousands of students and professionals using ResearchMate to understand research papers with ease.
        </p>

        <div className="flex justify-center gap-4">
          {user ? (
            <a href="/upload" className="btn shadow-xl shadow-sapphire/20 hover:shadow-2xl hover:shadow-sapphire/30 inline-block transform hover:-translate-y-1">
              Upload PDF
            </a>
          ) : (
            <a href="/login" className="btn shadow-xl shadow-sapphire/20 hover:shadow-2xl hover:shadow-sapphire/30 inline-block transform hover:-translate-y-1">
              Get Started Free
            </a>
          )}
          <button className="px-8 py-3 rounded-2xl font-semibold bg-deepnavy/40 border border-babyblue/30 text-babyblue hover:bg-deepnavy/60 transition-all duration-300">
            Learn More
          </button>
        </div>

        <div className="mt-8 text-sm text-periwinkle/50 flex justify-center gap-8">
          <span className="flex items-center gap-2">✔ Free access</span>
          <span className="flex items-center gap-2">✔ No credit card</span>
          <span className="flex items-center gap-2">✔ Cancel anytime</span>
        </div>
      </div>
    </div>
  );
}

