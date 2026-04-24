export default function Footer() {
  return (
    <div className="bg-deepnavy-light border-t border-babyblue/10 py-16 px-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-4 gap-12">
          <div className="col-span-1">
            <h3 className="font-bold text-xl mb-3 text-babyblue">
              Research<span className="text-sapphire">Mate</span>
            </h3>
            <p className="text-periwinkle/60 text-sm leading-relaxed">
              AI-powered research assistant for students and professionals. Making research accessible to everyone.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-babyblue text-sm uppercase tracking-wider">Features</h4>
            <div className="space-y-2">
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Summarization</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Q&A</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Recommendations</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Idea Generator</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-babyblue text-sm uppercase tracking-wider">Resources</h4>
            <div className="space-y-2">
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Documentation</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Blog</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Tutorials</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-babyblue text-sm uppercase tracking-wider">Company</h4>
            <div className="space-y-2">
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">About</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Contact</p>
              <p className="text-periwinkle/60 text-sm hover:text-babyblue cursor-pointer transition-colors">Privacy</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-babyblue/10 flex justify-between items-center">
          <p className="text-periwinkle/40 text-sm">© 2025 ResearchMate. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="w-8 h-8 rounded-full bg-babyblue/10 flex items-center justify-center text-babyblue/60 hover:bg-babyblue/20 cursor-pointer transition-colors text-xs font-bold">𝕏</span>
            <span className="w-8 h-8 rounded-full bg-babyblue/10 flex items-center justify-center text-babyblue/60 hover:bg-babyblue/20 cursor-pointer transition-colors text-xs font-bold">in</span>
            <span className="w-8 h-8 rounded-full bg-babyblue/10 flex items-center justify-center text-babyblue/60 hover:bg-babyblue/20 cursor-pointer transition-colors">📧</span>
          </div>
        </div>
      </div>
    </div>
  );
}

