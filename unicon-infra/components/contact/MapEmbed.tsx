export default function MapEmbed({
  label = "Unicon Infra",
}: {
  lat?: number;
  lng?: number;
  label?: string;
}) {
  const src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4354.834286674461!2d72.51889109999999!3d23.051134100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9bc6ab22f6ff%3A0x6a9fba069a933bb9!2sUNICORN%20INFRA!5e1!3m2!1sen!2sin!4v1784466734629!5m2!1sen!2sin";

  return (
    <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden gold-border">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        width="100%"
        height="100%"
        loading="lazy"
        style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) contrast(90%)" }}
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
