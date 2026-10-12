import TeamCard from "../components/dashboard/TeamCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createTeam,
  getUserTeams,
  getAllTeams,
} from "../lib/teamService";
import type { Team } from "../types/team";

function Dashboard() {
  const { user, signOutUser } = useAuth();

  const [teams, setTeams] = useState<Team[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(true);

  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [teamError, setTeamError] = useState("");
  const [teamSuccess, setTeamSuccess] = useState("");

  const [discoverTeams, setDiscoverTeams] = useState<Team[]>([]);
  const [loadingDiscoverTeams, setLoadingDiscoverTeams] = useState(false);
  const [showDiscoverTeams, setShowDiscoverTeams] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      if (!user) {
        setTeams([]);
        setLoadingTeams(false);
        return;
      }

      try {
        setLoadingTeams(true);
        const userTeams = await getUserTeams(user.uid);
        setTeams(userTeams);
      } catch (error) {
        console.error("Error loading teams:", error);
        setTeamError("Unable to load your teams.");
      } finally {
        setLoadingTeams(false);
      }
    };

    loadTeams();
  }, [user]);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setTeamError("You must be logged in to create a team.");
      return;
    }

    if (!teamName.trim()) {
      setTeamError("Please enter a team name.");
      return;
    }

    try {
      setCreatingTeam(true);
      setTeamError("");
      setTeamSuccess("");

      await createTeam(teamName.trim(), teamDescription.trim(), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });

      const updatedTeams = await getUserTeams(user.uid);
      setTeams(updatedTeams);

      setTeamName("");
      setTeamDescription("");
      setShowCreateTeam(false);
      setTeamSuccess("Team created successfully! 🎉");
    } catch (error) {
      console.error("Error creating team:", error);
      setTeamError("Something went wrong while creating your team.");
    } finally {
      setCreatingTeam(false);
    }
  };

  const handleDiscoverTeams = async () => {
    if (!user) {
      setTeamError("You must be logged in to discover teams.");
      return;
    }

    try {
      setLoadingDiscoverTeams(true);
      setTeamError("");

      const allTeams = await getAllTeams();
      const availableTeams = allTeams.filter(
        (team) => !team.memberIds.includes(user.uid)
      );

      setDiscoverTeams(availableTeams);
      setShowDiscoverTeams(true);
    } catch (error) {
      console.error("Error loading available teams:", error);
      setTeamError("Unable to load available teams.");
    } finally {
      setLoadingDiscoverTeams(false);
    }
  };

  return (
    <div className="min-h-screen bg-dot-grid text-white p-6 font-body">
      <div className="max-w-260 mx-auto">

        {/* Header */}
        <header className="flex items-start justify-between mb-10">
          <div>
            <h1 className="font-display text-2xl font-extrabold">
              Team<span className="text-[#FFC857]">Forge</span> AI 🚀
            </h1>
            <p className="text-[#A9A6C2] mt-1 text-sm">Build your dream team.</p>
          </div>

          <button
            onClick={signOutUser}
            className="font-display font-bold text-sm border-2 border-[rgba(255,255,255,0.14)] text-white px-5 py-2.5 hover:border-[#7C5CFF] transition"
          >
            Logout
          </button>
        </header>

        {/* Welcome */}
        <section className="mb-8">
          <span className="inline-block text-xs font-bold text-[#0B0D17] bg-[#4BD6C2] px-3 py-1.5 rounded-full mb-3 font-display">
            YOUR DASHBOARD
          </span>
          <h2 className="font-display text-4xl font-extrabold mb-2.5">
            Welcome{user?.displayName ? `, ${user.displayName}` : ""}! 👋
          </h2>
          <p className="text-[#A9A6C2]">
            Find the right people, build amazing projects, and create something great together.
          </p>
        </section>

        {/* Your Teams */}
        <section className="mb-6">
          <div className="border border-[rgba(255,255,255,0.14)] border-t-[3px] border-t-[#7C5CFF] bg-[rgba(255,255,255,0.02)] p-7">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="font-display text-lg font-bold">Your Teams</h3>
                <p className="text-[#A9A6C2] text-sm mt-1">Create a team and start building together.</p>
              </div>

              <button
                onClick={() => {
                  setShowCreateTeam(!showCreateTeam);
                  setTeamError("");
                  setTeamSuccess("");
                }}
                className="font-display font-bold text-sm border-2 border-white bg-[#FFC857] text-[#0B0D17] px-5 py-2.5 shadow-[3px_3px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0_#7C5CFF] transition-all"
              >
                {showCreateTeam ? "Cancel" : "+ Create Team"}
              </button>
            </div>

            {teamSuccess && (
              <div className="mt-5 p-3 border border-green-800 bg-green-950/40 text-green-400 text-sm">
                {teamSuccess}
              </div>
            )}

            {showCreateTeam && (
              <form onSubmit={handleCreateTeam} className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.14)]">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="teamName" className="block text-sm font-semibold text-[#F4F2FF] mb-2">
                      Team Name
                    </label>
                    <input
                      id="teamName"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. TeamForge Developers"
                      className="w-full px-4 py-3 rounded-lg bg-[#0B0D17] border border-[rgba(255,255,255,0.14)] text-white placeholder-[#5A5774] outline-none focus:border-[#7C5CFF] transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="teamDescription" className="block text-sm font-semibold text-[#F4F2FF] mb-2">
                      Description
                    </label>
                    <textarea
                      id="teamDescription"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)}
                      placeholder="What is this team working on?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B0D17] border border-[rgba(255,255,255,0.14)] text-white placeholder-[#5A5774] outline-none focus:border-[#7C5CFF] transition resize-none"
                    />
                  </div>

                  {teamError && (
                    <div className="p-3 border border-red-800 bg-red-950/40 text-red-400 text-sm">
                      {teamError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={creatingTeam}
                    className="w-full md:w-auto font-display font-bold text-sm border-2 border-white bg-[#FFC857] text-[#0B0D17] px-6 py-3 shadow-[4px_4px_0_#7C5CFF] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {creatingTeam ? "Creating Team..." : "Create Team 🚀"}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.14)]">
              {loadingTeams ? (
                <p className="text-[#A9A6C2]">Loading your teams...</p>
              ) : teams.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">👥</div>
                  <p className="text-[#A9A6C2]">You haven't created or joined any teams yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teams.map((team, i) => (
                    <TeamCard key={team.id} team={team} accent={i % 2 === 0 ? "citrus" : "violet"} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bottom cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="border border-[rgba(255,255,255,0.14)] border-t-[3px] border-t-[#7C5CFF] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="w-10 h-10 rounded-[9px] flex items-center justify-center text-lg mb-4" style={{ background: "#7C5CFF" }}>👤</div>
            <h3 className="font-display text-base font-bold mb-2">Your Profile</h3>
            <p className="text-[#A9A6C2] text-sm mb-3">Tell TeamForge about your skills, interests, and experience.</p>
            <Link to="/profile" className="font-display font-bold text-sm text-[#7C5CFF] hover:text-[#9b85ff]">
              Complete Profile →
            </Link>
          </div>

          <div className="border border-[rgba(255,255,255,0.14)] border-t-[3px] border-t-[#4BD6C2] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="w-10 h-10 rounded-[9px] flex items-center justify-center text-lg mb-4" style={{ background: "#4BD6C2" }}>🤝</div>
            <h3 className="font-display text-base font-bold mb-2">Find Your Team</h3>
            <p className="text-[#A9A6C2] text-sm mb-3">Discover teammates whose skills complement yours.</p>
            <button
              onClick={handleDiscoverTeams}
              disabled={loadingDiscoverTeams}
              className="font-display font-bold text-sm text-[#4BD6C2] hover:text-[#6fe3d2] disabled:text-[#A9A6C2]"
            >
              {loadingDiscoverTeams ? "Finding Teams..." : "Find Teammates →"}
            </button>
          </div>

          <div className="border border-[rgba(255,255,255,0.14)] border-t-[3px] border-t-[#FFC857] bg-[rgba(255,255,255,0.02)] p-6">
            <div className="w-10 h-10 rounded-[9px] flex items-center justify-center text-lg mb-4" style={{ background: "#FFC857" }}>🚀</div>
            <h3 className="font-display text-base font-bold mb-2">Your Projects</h3>
            <p className="text-[#A9A6C2] text-sm mb-3">Keep track of the teams and projects you're working on.</p>
            <button className="font-display font-bold text-sm text-[#FFC857] hover:text-[#ffd683]">
              View Projects →
            </button>
          </div>
        </section>

        {/* Discover Teams */}
        {showDiscoverTeams && (
          <section className="mt-8">
            <div className="border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] p-7">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-xl font-bold">Discover Teams 🔎</h3>
                  <p className="text-[#A9A6C2] text-sm mt-1">Find teams looking for members like you.</p>
                </div>
                <button
                  onClick={() => setShowDiscoverTeams(false)}
                  className="text-[#A9A6C2] hover:text-white transition text-sm font-semibold"
                >
                  Close
                </button>
              </div>

              {discoverTeams.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">😕</div>
                  <p className="text-[#A9A6C2]">No teams are currently available to join.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {discoverTeams.map((team) => (
                    <div
                      key={team.id}
                      className="bg-[#13162B] border border-[rgba(255,255,255,0.14)] border-l-[3px] border-l-[#FFC857] p-5 hover:border-[#7C5CFF] transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-display text-base font-bold">{team.name}</h4>
                          <p className="text-[#A9A6C2] text-sm mt-2">
                            {team.description || "No description provided."}
                          </p>
                        </div>
                        <span className="text-2xl">🚀</span>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-[rgba(255,255,255,0.14)]">
                        <span className="text-sm text-[#A9A6C2]">
                          👥 {team.memberIds.length} {team.memberIds.length === 1 ? "member" : "members"}
                        </span>
                        <Link
                          to={`/teams/${team.id}`}
                          className="font-display font-bold text-sm text-[#7C5CFF] hover:text-[#9b85ff]"
                        >
                          View Team →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default Dashboard;