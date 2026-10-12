function Footer() {
  return (
    <footer className="border-t-[3px] border-[#FFC857] bg-[#0B0D17] mt-20">
      <div className="max-w-295 mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="font-display text-2xl font-bold text-white whitespace-nowrap">
            Team<span className="text-[#FFC857]">Forge AI</span>
          </h2>
          <p className="text-[#A9A6C2] mt-3 leading-relaxed text-sm">
            Helping students discover the perfect teammates for hackathons through skill-based matching.
          </p>
        </div>

        <div>
          <h3 className="text-white font-display font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2.5 text-[#A9A6C2] text-sm">
            <li><a href="#home" className="hover:text-[#FFC857] transition">Home</a></li>
            <li><a href="#features" className="hover:text-[#FFC857] transition">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-[#FFC857] transition">How It Works</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-display font-bold mb-4">Connect</h3>
          <ul className="space-y-2.5 text-[#A9A6C2] text-sm">
            <li><a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFC857] transition">GitHub</a></li>
            <li><a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFC857] transition">LinkedIn</a></li>
            <li><a href="mailto:contact@teamforgeai.com" className="hover:text-[#FFC857] transition">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[rgba(255,255,255,0.14)] py-5 text-center text-[#A9A6C2] text-sm">
        © 2026 TeamForge AI. Built with ❤️ using React & Tailwind CSS.
      </div>
    </footer>
  );
}

export default Footer;