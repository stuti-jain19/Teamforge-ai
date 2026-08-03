type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer">
      <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110">
  {icon}
</div>

      <h3 className="text-white text-2xl font-bold mb-4">
        {title}
      </h3>

      <p className="text-gray-400 leading-7">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;