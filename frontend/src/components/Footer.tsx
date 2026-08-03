function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-24">
      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">
  Team<span className="text-cyan-400">Forge AI</span>
</h2>
          <p className="text-gray-400 mt-4 leading-7">
            Helping students discover the perfect teammates for
            hackathons through AI-powered matching.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="#home" className="hover:text-cyan-400 transition">
                Home
              </a>
            </li>

            <li>
              <a href="#features" className="hover:text-cyan-400 transition">
                Features
              </a>
            </li>

            <li>
              <a href="#how-it-works" className="hover:text-cyan-400 transition">
                How It Works
              </a>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-white font-semibold text-xl mb-5">
            Connect
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                GitHub
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition"
              >
                LinkedIn
              </a>
            </li>

            <li>
              <a
                href="mailto:contact@teamforgeai.com"
                className="hover:text-cyan-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-gray-500">
        © 2026 TeamForge AI. Built with ❤️ using React & Tailwind CSS.
      </div>
    </footer>
  );
}

export default Footer;