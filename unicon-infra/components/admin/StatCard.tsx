import Link from "next/link";
import { IconType } from "react-icons";

export default function StatCard({
  label,
  value,
  icon: Icon,
  href,
}: {
  label: string;
  value: number | string;
  icon: IconType;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="glass rounded-2xl p-6 hover:border-luxury-gold/60 hover:-translate-y-1 transition-all duration-300 block"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-full gold-border flex items-center justify-center">
          <Icon className="text-luxury-gold" size={20} />
        </div>
      </div>
      <p className="font-display text-3xl text-gold-gradient">{value}</p>
      <p className="text-white/50 text-sm mt-1">{label}</p>
    </Link>
  );
}
