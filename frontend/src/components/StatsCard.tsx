type StatsCardProps = {
  number: string;
  label: string;
};

function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div
      className="rounded-2xl border border-slate-700 bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-3 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
    >
      <h2 className="text-5xl font-bold text-cyan-400 mb-4">
  {number}
</h2>

<p className="text-gray-400 text-lg">
  {label}
</p>
    </div>
  );
}

export default StatsCard;