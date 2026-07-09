interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-brown mb-3 tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-brown-mid tracking-widest uppercase">{subtitle}</p>
      )}
    </div>
  );
}
