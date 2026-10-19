import type { ReactNode } from "react";

// Read-only controls remain focusable, so an attempt to edit opens sign-in.
export function ContentGate({ locked, onRequestAuth, children }: {
  locked: boolean;
  onRequestAuth: () => void;
  children: ReactNode;
}) {
  const isControl = (target: EventTarget) =>
    target instanceof Element && Boolean(target.closest("input, textarea, select, button, label"));
  return (
    <div
      onPointerDownCapture={(event) => {
        if (!locked || !isControl(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        onRequestAuth();
      }}
      onFocusCapture={(event) => {
        if (!locked || !isControl(event.target)) return;
        event.target.blur();
        onRequestAuth();
      }}
      onClickCapture={(event) => {
        if (!locked || !isControl(event.target)) return;
        event.preventDefault();
        event.stopPropagation();
        onRequestAuth();
      }}
      onKeyDownCapture={(event) => {
        if (!locked || !isControl(event.target) || event.key === "Tab") return;
        event.preventDefault();
        event.stopPropagation();
        onRequestAuth();
      }}
    >{children}</div>
  );
}