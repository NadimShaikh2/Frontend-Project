import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}) {
  const alignment =
    align === "left" ? "text-left items-start" : "text-center items-center";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title text-balance max-w-3xl">
        {title} {highlight ? <span className="heading-gradient">{highlight}</span> : null}
      </h2>
      {subtitle ? (
        <p
          className={`max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
