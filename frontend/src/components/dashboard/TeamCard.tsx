import { Link } from "react-router-dom";
import type { Team } from "../../types/team";

interface TeamCardProps {
  team: Team;
  accent?: "citrus" | "violet";
}

function TeamCard({ team, accent = "citrus" }: TeamCardProps) {
  const borderColor = accent === "citrus" ? "#FFC857" : "#7C5CFF";

  return (
    <Link to={`/teams/${team.id}`} className="block">
      <div
        className="bg-[#13162B] border border-[rgba(255,255,255,0.14)] p-5 hover:border-[#7C5CFF] transition"
        style={{ borderLeft: `3px solid ${borderColor}` }}
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

        <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.14)]">
          <p className="text-sm text-[#A9A6C2]">
            👥 {team.memberIds.length} {team.memberIds.length === 1 ? "member" : "members"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default TeamCard;
