import { describe, expect, it } from "vitest";
import { parentElementKey } from "@/components/cv/ElementToolbar";

describe("sélection de la section parente", () => {
  it("remonte d'un niveau", () => expect(parentElementKey("modern:0.1.2")).toBe("modern:0.1"));
  it("s'arrête au niveau racine", () => expect(parentElementKey("modern:3")).toBeNull());
});
