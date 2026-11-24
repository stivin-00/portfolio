"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
  eventParams?: Record<string, string>;
  /** Opens in a new tab with safe rel attributes and a screen-reader note. */
  external?: boolean;
};

/** A plain <a> that also records an analytics event; usable from server components. */
export default function TrackedLink({ event, eventParams, external, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
      onClick={() => trackEvent(event, eventParams)}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
