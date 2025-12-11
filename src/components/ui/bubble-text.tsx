import { useState } from "react";

interface BubbleTextProps {
  text: string;
  className?: string;
}

export const BubbleText = ({ text, className = "" }: BubbleTextProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <h1
      onMouseLeave={() => setHoveredIndex(null)}
      className={className}
    >
      {text.split("").map((char, idx) => {
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - idx) : null;
        
        let classes = "transition-all duration-300 ease-in-out cursor-default inline-block";
        
        switch (distance) {
          case 0:
            classes += " font-black scale-125 text-primary";
            break;
          case 1:
            classes += " font-bold scale-110";
            break;
          case 2:
            classes += " font-semibold scale-105";
            break;
          default:
            break;
        }

        return (
          <span
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={classes}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </h1>
  );
};

