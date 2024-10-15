import { cn } from "../lib/utils";
import React from "react";

type Props = {
  className?: string;
  size?: number;
};

export default function Loading({ className, size = 40 }: Props) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "mx-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
        className
      )}
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size }}
    >
    </svg>
  );
}
