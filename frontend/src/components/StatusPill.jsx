export default function StatusPill({ status }) {
  const label = !status
    ? "Connecting…"
    : status.ok
      ? status.mongo
        ? "Live"
        : "API up · database waking"
      : "Waking server…";

  const color = status?.ok && status?.mongo
    ? "bg-tide"
    : status?.ok
      ? "bg-gold"
      : "bg-amber-400";

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
      <span className={`h-1.5 w-1.5 rounded-full ${color} ${status?.ok && status?.mongo ? "" : "animate-pulse"}`} />
      {label}
    </span>
  );
}
