export default function Features() {
  const features = [
    {
      icon: "🧠",
      title: "Summarization",
      desc: "Understand papers quickly with AI summaries.",
      color: "from-sapphire/10 to-cornflower/10",
    },
    {
      icon: "💬",
      title: "Q&A",
      desc: "Ask questions directly from your document.",
      color: "from-cornflower/10 to-babyblue/10",
    },
    {
      icon: "🔍",
      title: "Recommendations",
      desc: "Discover similar research papers instantly.",
      color: "from-babyblue/10 to-periwinkle/10",
    },
    {
      icon: "💡",
      title: "Idea Generator",
      desc: "Generate innovative research and project ideas.",
      color: "from-periwinkle/10 to-lightcyan/10",
      action: () => {
        document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  return (
    <div className="py-24 bg-deepnavy text-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-cornflower/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-sapphire/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-sapphire/20 border border-babyblue/20 backdrop-blur-sm">
          <span className="text-sm font-semibold text-babyblue">What We Offer</span>
        </div>

        <h2 className="text-4xl font-bold mb-4 text-babyblue">
          Core Features
        </h2>

        <p className="mb-16 max-w-xl mx-auto text-periwinkle/70">
          Powerful tools designed to simplify your research workflow and boost productivity
        </p>

        <div className="flex justify-center gap-6 flex-wrap px-8">
          {features.map((f, i) => (
            <div
              key={i}
              onClick={f.action}
              className="group relative bg-deepnavy-light/80 backdrop-blur-sm border border-babyblue/10 p-8 rounded-3xl shadow-xl shadow-sapphire/5 hover:shadow-2xl hover:shadow-sapphire/10 transition-all duration-500 hover:-translate-y-2 w-72 text-center cursor-pointer"
            >
              <div className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-3xl shadow-inner`}>
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-babyblue group-hover:text-cornflower transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-periwinkle/70 leading-relaxed">
                {f.desc}
              </p>
              <div className="mt-4 w-8 h-1 bg-gradient-to-r from-sapphire to-cornflower rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

