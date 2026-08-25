import { Link } from "react-router-dom";
import type { Team } from "../../types/team";

interface TeamCardProps {
  team: Team;
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="block"
    >
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 hover:border-blue-600 transition">

        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">
              {team.name}
            </h4>

            <p className="text-slate-400 text-sm mt-2">
              {team.description || "No description provided."}
            </p>
          </div>

          <span className="text-2xl">
            🚀
          </span>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-800">
          <p className="text-sm text-slate-500">
            {team.memberIds.length}{" "}
            {team.memberIds.length === 1
              ? "member"
              : "members"}
          </p>
        </div>

      </div>
    </Link>
  );
}

export default TeamCard;
