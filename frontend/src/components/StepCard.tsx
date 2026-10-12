type StepCardProps = {
  icon: string;
  title: string;
  description: string;
  number?: string;
};

function StepCard({ icon, title, description, number }: StepCardProps) {
  return (
    <div className="relative pt-2">
      {number && (
        <span
          className="absolute -top-8 -left-1 font-display font-extrabold text-[76px] leading-none select-none"
          style={{ color: "rgba(255,255,255,0.05)" }}
          aria-hidden="true"
        >
          {number}
        </span>
      )}

      <div className="relative z-10">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-white text-lg font-display font-bold mb-2">
          {title}
        </h3>
        <p className="text-[#A9A6C2] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default StepCard;