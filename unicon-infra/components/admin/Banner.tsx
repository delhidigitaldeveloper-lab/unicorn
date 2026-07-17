import { HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

export default function Banner({ type, message }: { type: "success" | "error"; message: string }) {
  if (!message) return null;
  const isSuccess = type === "success";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm mb-6 border ${
        isSuccess
          ? "bg-luxury-gold/10 border-luxury-gold/30 text-luxury-gold"
          : "bg-red-500/10 border-red-500/30 text-red-400"
      }`}
    >
      {isSuccess ? <HiCheckCircle size={18} /> : <HiExclamationCircle size={18} />}
      {message}
    </div>
  );
}
