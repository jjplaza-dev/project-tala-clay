import type { ArtKind, ArtView, TextureKind } from "@/domain";

// Original illustration, not a photograph. Always give it a descriptive `label`.
interface CeramicArtProps {
  artKind: ArtKind;
  glazeHex: string;
  textureKind?: TextureKind;
  view?: ArtView;
  /** Scales the piece around its base so sizes can read differently. */
  scale?: number;
  label: string;
  className?: string;
}

const INK = "#292A26";
const mix = (hex: string, pct: number) =>
  `color-mix(in srgb, ${hex} ${100 - pct}%, ${INK} ${pct}%)`;

// Fixed points so the texture never changes between renders.
const DOTS: [number, number, number][] = [
  [48, 78, 1.6], [66, 104, 1.2], [84, 70, 1.4], [98, 122, 1.8], [118, 88, 1.2], [132, 112, 1.6],
  [150, 74, 1.4], [58, 138, 1.4], [78, 152, 1.2], [104, 100, 1.2], [124, 146, 1.6], [142, 132, 1.2],
  [90, 90, 1, ], [112, 66, 1.2], [70, 124, 1], [138, 98, 1],
];

function Texture({ kind, hex }: { kind: TextureKind; hex: string }) {
  if (kind === "matte") return null;
  if (kind === "reactive")
    return (
      <g fill={mix(hex, 45)} opacity={0.35}>
        <ellipse cx={70} cy={110} rx={26} ry={18} />
        <ellipse cx={128} cy={140} rx={30} ry={14} />
        <ellipse cx={120} cy={80} rx={18} ry={10} />
      </g>
    );
  if (kind === "satin") return <rect x={44} y={50} width={26} height={130} fill="#F4EFE6" opacity={0.16} />;
  return (
    <g fill={kind === "raw" ? "#8A4A33" : INK} opacity={kind === "raw" ? 0.45 : 0.38}>
      {DOTS.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

// Silhouettes for the front/side view, in a 200 x 200 box with the base near y = 168.
function Front({ kind, hex }: { kind: ArtKind; hex: string }) {
  const dark = mix(hex, 28);
  switch (kind) {
    case "mug":
      return (
        <>
          <path d="M138 82 C178 80 178 140 134 134" fill="none" stroke={hex} strokeWidth={13} strokeLinecap="round" />
          <path d="M58 60 H138 L132 160 Q131 168 123 168 H73 Q65 168 64 160 Z" fill={hex} />
          <ellipse cx={98} cy={60} rx={40} ry={7} fill={dark} />
        </>
      );
    case "bowl":
      return (
        <>
          <path d="M28 82 H172 C172 140 142 168 100 168 C58 168 28 140 28 82 Z" fill={hex} />
          <ellipse cx={100} cy={82} rx={72} ry={11} fill={dark} />
        </>
      );
    case "plate":
      return (
        <>
          <ellipse cx={100} cy={132} rx={82} ry={28} fill={hex} />
          <ellipse cx={100} cy={130} rx={58} ry={17} fill={dark} opacity={0.55} />
        </>
      );
    case "platter":
      return (
        <>
          <ellipse cx={100} cy={134} rx={90} ry={24} fill={hex} />
          <ellipse cx={100} cy={132} rx={72} ry={14} fill={dark} opacity={0.55} />
        </>
      );
    case "planter":
      return (
        <>
          <path d="M54 76 H146 L136 160 Q135 168 127 168 H73 Q65 168 64 160 Z" fill={hex} />
          <rect x={46} y={62} width={108} height={18} fill={hex} />
          <rect x={46} y={62} width={108} height={4} fill={dark} />
          <ellipse cx={100} cy={170} rx={48} ry={6} fill={dark} />
        </>
      );
  }
}

function Top({ kind, hex }: { kind: ArtKind; hex: string }) {
  const dark = mix(hex, 40);
  const rx = kind === "platter" ? 92 : kind === "plate" ? 80 : kind === "bowl" ? 72 : kind === "mug" ? 52 : 62;
  const ry = kind === "platter" ? 52 : rx;
  return (
    <>
      {kind === "mug" && <rect x={rx + 98} y={92} width={28} height={16} fill={hex} />}
      <ellipse cx={100} cy={100} rx={rx} ry={ry} fill={hex} />
      <ellipse cx={100} cy={100} rx={rx * 0.78} ry={ry * 0.78} fill={dark} opacity={kind === "plate" || kind === "platter" ? 0.4 : 0.85} />
    </>
  );
}

function Detail({ hex }: { hex: string }) {
  return (
    <>
      <rect width={200} height={200} fill={mix(hex, 30)} />
      <path d="M0 110 Q100 40 200 110 V200 H0 Z" fill={hex} />
      <path d="M0 110 Q100 40 200 110" fill="none" stroke={mix(hex, 55)} strokeWidth={3} />
    </>
  );
}

export function CeramicArt({
  artKind,
  glazeHex,
  textureKind = "matte",
  view = "primary",
  scale = 1,
  label,
  className,
}: CeramicArtProps) {
  const clipId = `ca-${artKind}-${view}-${glazeHex.replace("#", "")}-${textureKind}`;
  const isDetail = view === "detail";
  const shape =
    view === "top" ? <Top kind={artKind} hex={glazeHex} /> : isDetail ? <Detail hex={glazeHex} /> : <Front kind={artKind} hex={glazeHex} />;

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={label}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{label}</title>
      <defs>
        <clipPath id={clipId}>{shape}</clipPath>
      </defs>
      <g transform={`translate(100 170) scale(${scale}) translate(-100 -170)`}>
        {view !== "top" && !isDetail && <ellipse cx={100} cy={172} rx={62} ry={5} fill={INK} opacity={0.12} />}
        {shape}
        <g clipPath={`url(#${clipId})`}>
          <g transform={isDetail ? "translate(-40 -10) scale(1.4)" : undefined}>
            <Texture kind={textureKind} hex={glazeHex} />
          </g>
        </g>
      </g>
    </svg>
  );
}
