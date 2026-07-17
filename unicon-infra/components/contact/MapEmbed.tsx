export default function MapEmbed({
  lat,
  lng,
  label = "Unicon Infra",
}: {
  lat: number;
  lng: number;
  label?: string;
}) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

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
