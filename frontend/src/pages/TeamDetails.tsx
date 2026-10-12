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

  const [showAddMember, setShowAddMember] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const [memberError, setMemberError] = useState("");
  const [memberSuccess, setMemberSuccess] = useState("");

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
        const loadedTeam = { id: teamSnapshot.id, ...teamData } as Team;

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
      setTeam({ ...team, memberIds: updatedMemberIds });
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
      setTeam({ ...team, memberIds: updatedMemberIds });
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
      <div className="min-h-screen bg-dot-grid flex items-center justify-center font-body">
        <p className="text-[#A9A6C2]">Loading team...</p>
      </div>
    );
  }

  if (error || !team) {
    return (
      <div className="min-h-screen bg-dot-grid p-6 font-body">
        <div className="max-w-225 mx-auto">
          <Link to="/dashboard" className="text-[#7C5CFF] font-semibold text-sm hover:text-[#9b85ff]">
            ← Back to Dashboard
          </Link>

          <div className="mt-10 border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] p-8 text-center">
            <div className="text-5xl mb-4">😕</div>
            <h1 className="font-display text-2xl font-bold mb-2 text-white">Team Not Found</h1>
            <p className="text-[#A9A6C2]">{error || "We couldn't find this team."}</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.uid === team.ownerId;
  const isMember = user ? team.memberIds.includes(user.uid) : false;

  return (
    <div className="min-h-screen bg-dot-grid text-white p-6 md:p-12 font-body">
      <div className="max-w-225 mx-auto">

        <Link to="/dashboard" className="inline-block text-[#7C5CFF] font-semibold text-sm hover:text-[#9b85ff] mb-6">
          ← Back to Dashboard
        </Link>

        {/* Header */}
        <section className="border border-[rgba(255,255,255,0.14)] border-t-[3px] border-t-[#7C5CFF] bg-[rgba(255,255,255,0.02)] p-8 mb-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-bold text-[#0B0D17] bg-[#4BD6C2] px-3 py-1.5 rounded-full mb-3 font-display">
                TEAM
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2.5">
                {team.name}
              </h1>
              <p className="text-[#A9A6C2]">
                {team.description || "No description provided."}
              </p>
            </div>
            <div className="text-4xl">🚀</div>
          </div>

          {!isMember && user && (
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.14)]">
              <button
                onClick={handleJoinTeam}
                disabled={joiningTeam}
                className="font-display font-bold text-sm border-2 border-white bg-[#FFC857] text-[#0B0D17] px-6 py-2.5 shadow-[4px_4px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0_#7C5CFF] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {joiningTeam ? "Joining..." : "Join Team 🚀"}
              </button>

              {joinSuccess && (
                <div className="mt-4 p-3 border border-green-800 bg-green-950/40 text-green-400 text-sm">
                  {joinSuccess}
                </div>
              )}
              {joinError && (
                <div className="mt-4 p-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
                  {joinError}
                </div>
              )}
            </div>
          )}

          {isMember && (
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.14)]">
              <span className="inline-flex items-center gap-2 border-2 border-[#4BD6C2] bg-[rgba(75,214,194,0.12)] text-[#4BD6C2] font-bold text-sm px-4 py-2">
                ✓ You are a member of this team
              </span>
            </div>
          )}
        </section>

        {/* Owner / Members */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div className="border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#FFC857] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="text-2xl mb-3">👑</div>
            <h2 className="font-display text-base font-bold mb-3">Team Owner</h2>
            <p className="text-white font-semibold">{team.ownerName}</p>
            <p className="text-[#A9A6C2] text-sm mt-1">{team.ownerEmail}</p>
          </div>

          <div className="border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#7C5CFF] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="text-2xl mb-3">👥</div>
            <h2 className="font-display text-base font-bold mb-3">Members</h2>
            <p className="font-display text-3xl font-extrabold text-[#7C5CFF]">{team.memberIds.length}</p>
            <p className="text-[#A9A6C2] text-sm mt-1">
              {team.memberIds.length === 1 ? "team member" : "team members"}
            </p>
          </div>
        </section>

        {/* Add Member */}
        {isOwner && (
          <section className="mb-5 border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">Add Team Member</h2>
                <p className="text-[#A9A6C2] text-sm mt-1">Add an existing TeamForge user using their email.</p>
              </div>
              <button
                onClick={() => {
                  setShowAddMember(!showAddMember);
                  setMemberError("");
                  setMemberSuccess("");
                }}
                className="font-display font-bold text-sm border-2 border-white bg-[#FFC857] text-[#0B0D17] px-5 py-2.5 shadow-[3px_3px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0_#7C5CFF] transition-all"
              >
                {showAddMember ? "Cancel" : "+ Add Member"}
              </button>
            </div>

            {memberSuccess && (
              <div className="mt-5 p-3 border border-green-800 bg-green-950/40 text-green-400 text-sm">
                {memberSuccess}
              </div>
            )}

            {showAddMember && (
              <form onSubmit={handleAddMember} className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.14)]">
                <label htmlFor="memberEmail" className="block text-sm font-semibold text-[#F4F2FF] mb-2">
                  User Email
                </label>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    id="memberEmail"
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="e.g. teammate@example.com"
                    className="flex-1 px-4 py-3 rounded-lg bg-[#0B0D17] border border-[rgba(255,255,255,0.14)] text-white placeholder-[#5A5774] outline-none focus:border-[#7C5CFF] transition"
                  />
                  <button
                    type="submit"
                    disabled={addingMember}
                    className="font-display font-bold text-sm border-2 border-white bg-[#FFC857] text-[#0B0D17] px-6 py-3 shadow-[3px_3px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {addingMember ? "Adding..." : "Add Member"}
                  </button>
                </div>

                {memberError && (
                  <div className="mt-4 p-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
                    {memberError}
                  </div>
                )}
              </form>
            )}
          </section>
        )}

        {/* Team Members */}
        <section className="mb-5 border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] p-8">
          <h2 className="font-display text-xl font-bold mb-1">Team Members</h2>
          <p className="text-[#A9A6C2] text-sm">People currently part of this team.</p>

          {loadingMembers ? (
            <p className="text-[#A9A6C2] mt-6">Loading members...</p>
          ) : members.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-[rgba(255,255,255,0.14)] mt-6">
              <p className="text-[#A9A6C2]">No member profiles found.</p>
            </div>
          ) : (
            <div className="space-y-3 mt-5">
              {members.map((member) => (
                <div key={member.uid} className="border border-[rgba(255,255,255,0.14)] bg-[#13162B] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display font-bold">{member.name || "Unnamed User"}</h3>
                      <p className="text-[#A9A6C2] text-sm mt-1">{member.email}</p>
                    </div>
                    {member.uid === user?.uid && (
                      <span className="text-xs font-bold text-[#7C5CFF] border border-[#7C5CFF] px-3 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </div>

                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs uppercase tracking-wide text-[#A9A6C2] mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <span key={skill} className="text-xs font-semibold border border-[rgba(255,255,255,0.14)] px-3 py-1">
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
        <section className="border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] p-8">
          <h2 className="font-display text-xl font-bold">🚀 Projects</h2>
          <p className="text-[#A9A6C2] text-sm mt-1.5">Projects for this team will appear here.</p>
          <div className="mt-6 p-7 border border-dashed border-[rgba(255,255,255,0.14)] text-center">
            <p className="text-[#A9A6C2] text-sm">Project management coming soon...</p>
          </div>
        </section>

      </div>
    </div>
  );
}

export default TeamDetails;