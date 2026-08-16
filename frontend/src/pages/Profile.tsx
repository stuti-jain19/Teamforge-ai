import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.displayName || "");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    try {
      setSaving(true);
      setMessage("");

      await setDoc(doc(db, "users", user.uid), {
        name,
        email: user.email,
        skills: skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        interests: interests
          .split(",")
          .map((interest) => interest.trim())
          .filter(Boolean),
        experience,
        bio,
        updatedAt: new Date(),
      });

      setMessage("Profile saved successfully! 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-400 hover:text-white transition mb-6"
          >
            ← Back to Dashboard
          </button>

          <p className="text-blue-400 text-sm font-medium mb-2">
            YOUR PROFILE
          </p>

          <h1 className="text-4xl font-bold mb-3">
            Build your TeamForge profile 👤
          </h1>

          <p className="text-slate-400">
            Tell us about yourself so TeamForge can find teammates who
            complement your skills.
          </p>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Skills
            </label>

            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="C++, React, Python, Cybersecurity"
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            <p className="text-xs text-slate-500 mt-2">
              Separate skills with commas.
            </p>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Interests
            </label>

            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="AI, Hackathons, Web Development"
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />

            <p className="text-xs text-slate-500 mt-2">
              Separate interests with commas.
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Experience Level
            </label>

            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">Select your experience</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Short Bio
            </label>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell potential teammates a little about yourself..."
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Message */}
          {message && (
            <div className="text-sm text-center text-blue-400">
              {message}
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
          >
            {saving ? "Saving Profile..." : "Save Profile 🚀"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Profile;