import React from 'react';

interface HeroMessageDisplayProps {
  title: string;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

const HeroMessageDisplay: React.FC<HeroMessageDisplayProps> = ({
  title,
  subtitle,
  titleClassName = "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center",
  subtitleClassName = "mt-4 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto",
}) => {
  console.log("Rendering HeroMessageDisplay with title:", title);

  return (
    <div className="py-8 md:py-12">
      <h1 className={titleClassName}>
        {title}
      </h1>
      {subtitle && (
        <p className={subtitleClassName}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default HeroMessageDisplay;