import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-[rgba(11,13,23,0.78)] border-b border-[rgba(255,255,255,0.14)]">
      <div className="max-w-295 mx-auto flex justify-between items-center px-8 py-5">
        <h1 className="font-display text-xl font-bold text-white">
          Team<span className="text-[#FFC857]">Forge</span>
        </h1>

        <div className="flex items-center gap-7">
          <a href="#features" className="text-sm text-[#A9A6C2] hover:text-white transition">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-[#A9A6C2] hover:text-white transition">
            How it works
          </a>
          <Link
            to="/login"
            className="font-display font-bold text-sm px-5 py-2.5 rounded-lg bg-[#FFC857] text-[#0B0D17] border-2 border-white shadow-[3px_3px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0_#7C5CFF] transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;