import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import type { Team } from "../types/team";

function TeamDetails() {
  const { teamId } = useParams<{ teamId: string }>();

  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTeam = async () => {
      if (!teamId) {
        setError("Team not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const teamRef = doc(db, "teams", teamId);
        const teamSnapshot = await getDoc(teamRef);

        if (!teamSnapshot.exists()) {
          setError("This team does not exist.");
          return;
        }

        const teamData = teamSnapshot.data();

        setTeam({
          id: teamSnapshot.id,
          ...teamData,
        } as Team);
      } catch (error) {
        console.error("Error loading team:", error);
        setError("Unable to load this team.");
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [teamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">
          Loading team...
        </p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-4xl mx-auto">

          <Link
            to="/dashboard"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">
              😕
            </div>

            <h1 className="text-2xl font-bold mb-2">
              Team Not Found
            </h1>

            <p className="text-slate-400">
              {error || "We couldn't find this team."}
            </p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-block text-blue-400 hover:text-blue-300 transition mb-8"
        >
          ← Back to Dashboard
        </Link>

        {/* Team Header */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-6">

          <div className="flex items-start justify-between gap-6">

            <div>
              <p className="text-blue-400 text-sm font-medium mb-2">
                TEAM
              </p>

              <h1 className="text-4xl font-bold mb-4">
                {team.name}
              </h1>

              <p className="text-slate-400">
                {team.description || "No description provided."}
              </p>
            </div>

            <div className="text-5xl">
              🚀
            </div>

          </div>

        </section>

        {/* Team Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Owner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl mb-4">
              👑
            </div>

            <h2 className="text-xl font-semibold mb-4">
              Team Owner
            </h2>

            <p className="text-white font-medium">
              {team.ownerName}
            </p>

            <p className="text-slate-400 text-sm mt-1">
              {team.ownerEmail}
            </p>
          </div>

          {/* Members */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl mb-4">
              👥
            </div>

            <h2 className="text-xl font-semibold mb-4">
              Members
            </h2>

            <p className="text-3xl font-bold text-blue-400">
              {team.memberIds.length}
            </p>

            <p className="text-slate-400 text-sm mt-1">
              {team.memberIds.length === 1
                ? "team member"
                : "team members"}
            </p>
          </div>

        </section>

        {/* Future Projects Section */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="text-3xl mb-4">
            🚀
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            Projects
          </h2>

          <p className="text-slate-400">
            Projects for this team will appear here.
          </p>

          <div className="mt-6 p-5 border border-dashed border-slate-700 rounded-xl text-center">
            <p className="text-slate-500">
              Project management coming soon...
            </p>
          </div>

        </section>

      </div>
    </div>
  );
}

export default TeamDetails;
