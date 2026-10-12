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

  // Discover Teams
  const [discoverTeams, setDiscoverTeams] = useState<Team[]>([]);
  const [loadingDiscoverTeams, setLoadingDiscoverTeams] = useState(false);
  const [showDiscoverTeams, setShowDiscoverTeams] = useState(false);

  // Load user's teams
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

      await createTeam(
        teamName.trim(),
        teamDescription.trim(),
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        }
      );

      // Refresh teams after creating a new team
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

  // Discover teams that the current user has not joined
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
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">
              TeamForge AI 🚀
            </h1>

            <p className="text-slate-400 mt-1">
              Build your dream team.
            </p>
          </div>

          <button
            onClick={signOutUser}
            className="px-5 py-2.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            Logout
          </button>
        </header>

        {/* Welcome Section */}
        <section className="mb-10">
          <p className="text-blue-400 text-sm font-medium mb-2">
            YOUR DASHBOARD
          </p>

          <h2 className="text-4xl font-bold mb-3">
            Welcome{user?.displayName ? `, ${user.displayName}` : ""}! 👋
          </h2>

          <p className="text-slate-400">
            Find the right people, build amazing projects, and create
            something great together.
          </p>
        </section>

        {/* Teams Section */}
        <section className="mb-10">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            {/* Teams Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  Your Teams
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Create a team and start building together.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowCreateTeam(!showCreateTeam);
                  setTeamError("");
                  setTeamSuccess("");
                }}
                className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
              >
                {showCreateTeam ? "Cancel" : "+ Create Team"}
              </button>
            </div>

            {/* Success Message */}
            {teamSuccess && (
              <div className="mt-5 p-4 rounded-lg border border-green-800 bg-green-950/40 text-green-400">
                {teamSuccess}
              </div>
            )}

            {/* Create Team Form */}
            {showCreateTeam && (
              <form
                onSubmit={handleCreateTeam}
                className="mt-6 pt-6 border-t border-slate-800"
              >
                <div className="space-y-5">

                  {/* Team Name */}
                  <div>
                    <label
                      htmlFor="teamName"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Team Name
                    </label>

                    <input
                      id="teamName"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. TeamForge Developers"
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  {/* Team Description */}
                  <div>
                    <label
                      htmlFor="teamDescription"
                      className="block text-sm font-medium text-slate-300 mb-2"
                    >
                      Description
                    </label>

                    <textarea
                      id="teamDescription"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)}
                      placeholder="What is this team working on?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition resize-none"
                    />
                  </div>

                  {/* Error */}
                  {teamError && (
                    <div className="p-4 rounded-lg border border-red-800 bg-red-950/40 text-red-400">
                      {teamError}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={creatingTeam}
                    className="w-full md:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition"
                  >
                    {creatingTeam ? "Creating Team..." : "Create Team 🚀"}
                  </button>
                </div>
              </form>
            )}

            {/* Team List */}
            <div className="mt-8 pt-6 border-t border-slate-800">

              {loadingTeams ? (
                <p className="text-slate-400">
                  Loading your teams...
                </p>
              ) : teams.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">
                    👥
                  </div>

                  <p className="text-slate-400">
                    You haven't created or joined any teams yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {teams.map((team) => (
                    <TeamCard
                      key={team.id}
                      team={team}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        </section>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              👤
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Your Profile
            </h3>

            <p className="text-slate-400 text-sm">
              Tell TeamForge about your skills, interests, and experience.
            </p>

            <Link
              to="/profile"
              className="inline-block mt-5 text-blue-400 font-medium hover:text-blue-300 transition"
            >
              Complete Profile →
            </Link>
          </div>

          {/* Find Team Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              🤝
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Find Your Team
            </h3>

            <p className="text-slate-400 text-sm">
              Discover teammates whose skills complement yours.
            </p>

            <button
              onClick={handleDiscoverTeams}
              disabled={loadingDiscoverTeams}
              className="mt-5 text-blue-400 font-medium hover:text-blue-300 transition disabled:text-slate-600"
            >
              {loadingDiscoverTeams
                ? "Finding Teams..."
                : "Find Teammates →"}
            </button>
          </div>

          {/* Projects Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition">
            <div className="text-3xl mb-4">
              🚀
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Your Projects
            </h3>

            <p className="text-slate-400 text-sm">
              Keep track of the teams and projects you're working on.
            </p>

            <button className="mt-5 text-blue-400 font-medium hover:text-blue-300 transition">
              View Projects →
            </button>
          </div>

        </section>

        {/* Discover Teams */}
        {showDiscoverTeams && (
          <section className="mt-10">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-semibold">
                    Discover Teams 🔎
                  </h3>

                  <p className="text-slate-400 text-sm mt-1">
                    Find teams looking for members like you.
                  </p>
                </div>

                <button
                  onClick={() => setShowDiscoverTeams(false)}
                  className="text-slate-400 hover:text-white transition"
                >
                  Close
                </button>
              </div>

              {discoverTeams.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">
                    😕
                  </div>

                  <p className="text-slate-400">
                    No teams are currently available to join.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {discoverTeams.map((team) => (
                    <div
                      key={team.id}
                      className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-blue-700 transition"
                    >
                      <div className="flex items-start justify-between gap-4">

                        <div>
                          <h4 className="text-xl font-semibold">
                            {team.name}
                          </h4>

                          <p className="text-slate-400 text-sm mt-2">
                            {team.description ||
                              "No description provided."}
                          </p>
                        </div>

                        <span className="text-2xl">
                          🚀
                        </span>

                      </div>

                      <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-800">

                        <span className="text-sm text-slate-500">
                          👥 {team.memberIds.length}{" "}
                          {team.memberIds.length === 1
                            ? "member"
                            : "members"}
                        </span>

                        <Link
                          to={`/team/${team.id}`}
                          className="text-blue-400 hover:text-blue-300 font-medium transition"
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