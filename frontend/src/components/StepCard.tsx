type StepCardProps = {
  icon: string;
  title: string;
  description: string;
};

function StepCard({
  icon,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="group bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20">

      <div className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110">
  {icon}
</div>

      <h3 className="text-white text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-gray-400">
        {description}
      </p>

    </div>
  );
}

export default StepCard;