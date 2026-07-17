import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

const inputClass =
  "w-full bg-white/5 border border-white/15 focus:border-luxury-gold rounded-lg px-4 py-3 text-sm outline-none transition-colors placeholder:text-white/30 text-white";

export function FieldWrapper({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/50 mb-2">{label}</label>
      {children}
      {hint && <p className="text-white/30 text-xs mt-1.5">{hint}</p>}
    </div>
  );
}

export function TextField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <input {...props} className={inputClass} />
    </FieldWrapper>
  );
}

export function TextAreaField({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <textarea {...props} className={`${inputClass} resize-none`} />
    </FieldWrapper>
  );
}

export function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-14 shrink-0 rounded-lg border border-white/15 bg-transparent p-1 cursor-pointer"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#C8A96A"
          className={inputClass}
        />
      </div>
    </FieldWrapper>
  );
}

export function SelectField({
  label,
  hint,
  children,
  ...props
}: { label: string; hint?: string; children: ReactNode } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <select {...props} className={inputClass}>
        {children}
      </select>
    </FieldWrapper>
  );
}
