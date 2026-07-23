export default function Backdrop() {
  return (
    <div className="fixed inset-0 z-0 bg-black" aria-hidden="true">
      {/* faint warm glow behind the sign */}
      <div
        className="absolute right-0 top-0 h-[55%] w-[70%]"
        style={{
          background:
            "radial-gradient(80% 80% at 80% 20%, rgba(120,80,30,0.28) 0%, transparent 60%)",
        }}
      />

      {/* faint star seal, bottom-right */}
      <span
        className="pointer-events-none absolute -bottom-32 -right-24 select-none text-gold/[0.04]"
        style={{ fontSize: "40rem", lineHeight: 1, transform: "rotate(-12deg)" }}
      >
        ★
      </span>
    </div>
  );
}
