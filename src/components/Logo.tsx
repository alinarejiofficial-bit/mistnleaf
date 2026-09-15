import Image from "next/image";
import Link from "next/link";
import { media } from "@/lib/media";

/** Tight-cropped lockup aspect (987 × 584) */
const LOGO_ASPECT = 987 / 584;

const sizes = {
  header: {
    width: Math.round(96 * LOGO_ASPECT),
    height: 96,
    className: "h-16 w-auto sm:h-[4.5rem] md:h-20",
  },
  footer: {
    width: Math.round(112 * LOGO_ASPECT),
    height: 112,
    className: "h-[5.5rem] w-auto sm:h-24 md:h-[6.5rem]",
  },
  hero: {
    width: Math.round(180 * LOGO_ASPECT),
    height: 180,
    className: "h-36 w-auto sm:h-44 md:h-52",
  },
  about: {
    width: Math.round(150 * LOGO_ASPECT),
    height: 150,
    className: "h-32 w-auto sm:h-36 md:h-40",
  },
} as const;

type LogoProps = {
  size?: keyof typeof sizes;
  /** dark = forest green on light; light = tan on dark */
  variant?: "dark" | "light";
  href?: string | null;
  className?: string;
  priority?: boolean;
  onClick?: () => void;
};

export function Logo({
  size = "header",
  variant = "dark",
  href = "/",
  className = "",
  priority = false,
  onClick,
}: LogoProps) {
  const { width, height, className: sizeClass } = sizes[size];
  const src = variant === "light" ? media.logoLight : media.logo;

  const image = (
    <Image
      src={`${src}?v=6`}
      alt="Mistnleaf — Nature in Every Breath"
      width={width}
      height={height}
      className={`object-contain object-left ${sizeClass} ${className}`.trim()}
      priority={priority}
      unoptimized
    />
  );

  const wrapClass = `site-logo inline-flex shrink-0 items-center${
    variant === "light" ? " site-logo--light" : ""
  }`;

  if (href) {
    return (
      <Link href={href} className={wrapClass} onClick={onClick}>
        {image}
      </Link>
    );
  }

  return <span className={wrapClass}>{image}</span>;
}
