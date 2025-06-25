"use client";

import {cn} from "@/shared/utils/cn";
import {cva} from "class-variance-authority";
import {createContext, use} from "react";
import {Heading as AriaHeading, HeadingProps} from "react-aria-components";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingLevelContext = createContext<Level>(1);

const heading = cva(
  "text-base-text font-primary text-base leading-tight font-semibold",
  {
    variants: {
      level: {
        1: "text-extra-large font-secondary font-bold",
        2: "text-medium font-secondary font-bold",
      } satisfies Partial<Record<Level, string>>,
    },
  },
);

export function Heading({children, ...props}: HeadingProps) {
  const level = use(HeadingLevelContext);
  return (
    <AriaHeading
      {...props}
      level={props.level ?? level}
      className={cn(
        heading(level === 1 || level === 2 ? {level} : {}),
        props.className,
      )}>
      {children}
    </AriaHeading>
  );
}

export function HeadingGroup({children}: {children: React.ReactNode}) {
  const level = use(HeadingLevelContext);
  const nextLevel = Math.min(level + 1, 6) as Level;
  return (
    <HeadingLevelContext value={nextLevel}>{children}</HeadingLevelContext>
  );
}
