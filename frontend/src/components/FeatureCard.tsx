type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  accent?: "violet" | "citrus" | "mint";
};

const accentMap = {
  violet: "#7C5CFF",
  citrus: "#FFC857",
  mint: "#4BD6C2",
};

function FeatureCard({ title, description, icon, accent = "violet" }: FeatureCardProps) {
  const color = accentMap[accent];

  return (
    <div
      className="border border-[rgba(255,255,255,0.14)] p-7 bg-[rgba(255,255,255,0.02)]"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div
        className="w-10 h-10 rounded-[9px] flex items-center justify-center text-xl mb-5"
        style={{ background: color }}
      >
        {icon}
      </div>

      <h3 className="font-display text-white text-lg font-bold mb-2.5">
        {title}
      </h3>

      <p className="text-[#A9A6C2] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;