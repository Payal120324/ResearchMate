import Upload from "./Upload";

export default function Workspace({ user, setUser }) {
  return (
    <div className="px-8 py-16 bg-deepnavy min-h-screen relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cornflower/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sapphire/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-sapphire/20 border border-babyblue/20">
            <span className="text-sm font-semibold text-babyblue">Your Dashboard</span>
          </div>
          <h2 className="text-4xl font-bold text-babyblue">
            Research Workspace
          </h2>
          <p className="text-periwinkle/60 mt-2">Upload papers, ask questions, and discover insights</p>
        </div>

        <div className="bg-deepnavy-light border border-babyblue/10 p-10 rounded-3xl shadow-xl shadow-black/20">
          <Upload user={user} setUser={setUser} />
        </div>
      </div>
    </div>
  );
}

