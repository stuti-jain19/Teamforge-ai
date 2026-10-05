import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import {
  getTeamMembers,
  addMemberToTeam,
  joinTeam,
} from "../lib/teamService";
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

  // Add Member states
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const [memberError, setMemberError] = useState("");
  const [memberSuccess, setMemberSuccess] = useState("");

  // Join Team states
  const [joiningTeam, setJoiningTeam] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinSuccess, setJoinSuccess] = useState("");

  const loadMembers = async (memberIds: string[]) => {
    try {
      setLoadingMembers(true);

      const teamMembers = await getTeamMembers(memberIds);

      setMembers(teamMembers as UserProfile[]);
    } catch (error) {
      console.error("Error loading members:", error);
      setMemberError("Unable to load team members.");
    } finally {
      setLoadingMembers(false);
    }
  };

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

        await loadMembers(loadedTeam.memberIds);
      } catch (error) {
        console.error("Error loading team:", error);
        setError("Unable to load this team.");
      } finally {
        setLoading(false);
      }
    };

    loadTeam();
  }, [teamId]);

  // Join Team
  const handleJoinTeam = async () => {
    if (!team || !user) {
      setJoinError("Unable to join team.");
      return;
    }

    if (team.memberIds.includes(user.uid)) {
      setJoinError("You are already a member of this team.");
      return;
    }

    try {
      setJoiningTeam(true);
      setJoinError("");
      setJoinSuccess("");

      await joinTeam(team.id, user.uid);

      const updatedMemberIds = [...team.memberIds, user.uid];

      setTeam({
        ...team,
        memberIds: updatedMemberIds,
      });

      await loadMembers(updatedMemberIds);

      setJoinSuccess("You joined the team successfully! 🎉");
    } catch (error) {
      console.error("Error joining team:", error);

      if (error instanceof Error) {
        setJoinError(error.message);
      } else {
        setJoinError("Something went wrong while joining the team.");
      }
    } finally {
      setJoiningTeam(false);
    }
  };

  // Add Member
  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!team || !user) {
      setMemberError("Unable to add member.");
      return;
    }

    if (team.ownerId !== user.uid) {
      setMemberError("Only the team owner can add members.");
      return;
    }

    const email = memberEmail.trim().toLowerCase();

    if (!email) {
      setMemberError("Please enter a user's email.");
      return;
    }

    try {
      setAddingMember(true);
      setMemberError("");
      setMemberSuccess("");

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setMemberError("No user found with this email.");
        return;
      }

      const userDoc = snapshot.docs[0];
      const userId = userDoc.id;

      if (team.memberIds.includes(userId)) {
        setMemberError("This user is already a member of the team.");
        return;
      }

      await addMemberToTeam(team.id, userId);

      const updatedMemberIds = [...team.memberIds, userId];

      setTeam({
        ...team,
        memberIds: updatedMemberIds,
      });

      await loadMembers(updatedMemberIds);

      setMemberEmail("");
      setMemberSuccess("Member added successfully! 🎉");
    } catch (error) {
      console.error("Error adding member:", error);

      if (error instanceof Error) {
        setMemberError(error.message);
      } else {
        setMemberError("Something went wrong while adding the member.");
      }
    } finally {
      setAddingMember(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="text-slate-400">Loading team...</p>
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
            <div className="text-5xl mb-4">😕</div>

            <h1 className="text-2xl font-bold mb-2">Team Not Found</h1>

            <p className="text-slate-400">
              {error || "We couldn't find this team."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.uid === team.ownerId;
  const isMember = user ? team.memberIds.includes(user.uid) : false;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">

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

            <div className="text-5xl">🚀</div>
          </div>

          {/* Join Team */}
          {!isMember && user && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={handleJoinTeam}
                disabled={joiningTeam}
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition"
              >
                {joiningTeam ? "Joining..." : "Join Team 🚀"}
              </button>

              {joinSuccess && (
                <div className="mt-4 p-4 rounded-lg border border-green-800 bg-green-950/40 text-green-400">
                  {joinSuccess}
                </div>
              )}

              {joinError && (
                <div className="mt-4 p-4 rounded-lg border border-red-800 bg-red-950/40 text-red-400">
                  {joinError}
                </div>
              )}
            </div>
          )}

          {isMember && (
            <div className="mt-8 pt-6 border-t border-slate-800">
              <span className="inline-block px-4 py-2 rounded-lg bg-green-950/40 border border-green-800 text-green-400">
                ✓ You are a member of this team
              </span>
            </div>
          )}
        </section>

        {/* Team Information */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Owner */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="text-3xl mb-4">👑</div>

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
            <div className="text-3xl mb-4">👥</div>

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

        {/* Add Member */}
        {isOwner && (
          <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  Add Team Member
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                  Add an existing TeamForge user using their email.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowAddMember(!showAddMember);
                  setMemberError("");
                  setMemberSuccess("");
                }}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
              >
                {showAddMember ? "Cancel" : "+ Add Member"}
              </button>
            </div>

            {memberSuccess && (
              <div className="mt-5 p-4 rounded-lg border border-green-800 bg-green-950/40 text-green-400">
                {memberSuccess}
              </div>
            )}

            {showAddMember && (
              <form
                onSubmit={handleAddMember}
                className="mt-6 pt-6 border-t border-slate-800"
              >
                <label
                  htmlFor="memberEmail"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  User Email
                </label>

                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    id="memberEmail"
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="e.g. teammate@example.com"
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                  />

                  <button
                    type="submit"
                    disabled={addingMember}
                    className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition"
                  >
                    {addingMember ? "Adding..." : "Add Member"}
                  </button>
                </div>

                {memberError && (
                  <div className="mt-4 p-4 rounded-lg border border-red-800 bg-red-950/40 text-red-400">
                    {memberError}
                  </div>
                )}
              </form>
            )}
          </section>
        )}

        {/* Team Members */}
        <section className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-6">
            <div className="text-3xl">👥</div>

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

        {/* Projects */}
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