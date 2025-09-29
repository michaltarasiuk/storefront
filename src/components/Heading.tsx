"use client";

import {cva} from "class-variance-authority";
import {createContext, use} from "react";
import {Heading as AriaHeading, type HeadingProps} from "react-aria-components";

import {cn} from "@/utils/cn";

import {Skeleton} from "./Skeleton";

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const HeadingLevelContext = createContext<Level>(1);

export function HeadingGroup({children}: {children: React.ReactNode}) {
  const level = use(HeadingLevelContext);
  const nextLevel = Math.min(level + 1, 6) as Level;
  return (
    <HeadingLevelContext value={nextLevel}>{children}</HeadingLevelContext>
  );
}

const heading = cva(
  "text-base-text font-primary text-base leading-tight font-semibold",
  {
    variants: {
      level: {
        1: "text-extra-large font-secondary font-semibold",
        2: "text-medium font-secondary font-semibold",
      } satisfies Partial<Record<Level, string>>,
    },
  },
);

export function Heading({children, ...props}: HeadingProps) {
  const contextLevel = use(HeadingLevelContext);
  const level = props.level ?? contextLevel;
  return (
    <AriaHeading
      {...props}
      level={level}
      className={cn(
        heading(level === 1 || level === 2 ? {level} : {}),
        props.className,
      )}>
      {children}
    </AriaHeading>
  );
}

export function SkeletonHeading(props: Pick<HeadingProps, "level">) {
  const contextLevel = use(HeadingLevelContext);
  const level = props.level ?? contextLevel;
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-[1lh] w-full max-w-42 items-center",
        heading(level === 1 || level === 2 ? {level} : {}),
      )}>
      <Skeleton className={cn("h-[1em] w-full")} />
    </div>
  );
}
