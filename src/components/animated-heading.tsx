import { useState, type ReactNode } from "react";

export function AnimatedHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [bouncing, setBouncing] = useState(false);

  const trigger = () => {
    setBouncing(false);
    setTimeout(() => {
      setBouncing(true);
      setTimeout(() => setBouncing(false), 700);
    }, 20);
  };

  return (
    <h1
      className={`cursor-pointer select-none ${className} ${bouncing ? "heading-bounce" : ""}`}
      onClick={trigger}
    >
      {children}
    </h1>
  );
}
