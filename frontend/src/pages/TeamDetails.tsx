import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { getTeamMembers } from "../lib/teamService";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase/firebase";
import type { Team } from "../types/team";
import type { UserProfile } from "../types/user";

function TeamDetails() {
  const { teamId } = useParams<{ teamId: string }>();
  const { user } = useAuth();

  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMembers, setLoadingMembers] = useState(false);
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

        const loadedTeam = {
          id: teamSnapshot.id,
          ...teamData,
        } as Team;

        setTeam(loadedTeam);

        setLoadingMembers(true);

        const teamMembers = await getTeamMembers(loadedTeam.memberIds);

        setMembers(teamMembers as UserProfile[]);
      } catch (error) {
        console.error("Error loading team:", error);
        setError("Unable to load this team.");
      } finally {
        setLoading(false);
        setLoadingMembers(false);
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

          {/* Members Count */}
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

        {/* Team Members */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">
              👥
            </div>

            <div>
              <h2 className="text-2xl font-semibold">
                Team Members
              </h2>

              <p className="text-slate-400 text-sm mt-1">
                People currently part of this team.
              </p>
            </div>
          </div>

          {loadingMembers ? (
            <p className="text-slate-400">
              Loading members...
            </p>
          ) : members.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-slate-700 rounded-xl">
              <p className="text-slate-500">
                No member profiles found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <div
                  key={member.uid}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <h3 className="text-lg font-semibold">
                        {member.name || "Unnamed User"}
                      </h3>

                      <p className="text-slate-400 text-sm mt-1">
                        {member.email}
                      </p>
                    </div>

                    {member.uid === user?.uid && (
                      <span className="text-xs px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                        You
                      </span>
                    )}

                  </div>

                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                        Skills
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}

        </section>

        {/* Projects Section */}
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