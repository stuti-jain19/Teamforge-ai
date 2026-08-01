import Navbar from "../components/Navbar";
function Home() {
  return (
    
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <section className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
        <h1 className="text-6xl font-bold text-white">
          Find Your Perfect
        </h1>

        <h1 className="text-6xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mt-3">
          Hackathon Team
        </h1>

        <p className="text-gray-400 text-xl mt-8 max-w-2xl">
          TeamForge AI helps students discover teammates based on skills,
          interests, and hackathon goals.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="bg-blue-600 px-8 py-4 rounded-xl text-white hover:bg-blue-700">
            Get Started
          </button>

          <button className="border border-gray-600 px-8 py-4 rounded-xl text-white hover:bg-gray-800">
            Explore Teams
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
