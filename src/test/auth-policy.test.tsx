import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContentGate } from "@/components/cv/ContentGate";
import { defaultDoc, loadDoc, saveDoc, loadCredits, saveCredits } from "@/lib/cv/storage";

afterEach(cleanup);
beforeEach(() => localStorage.clear());

describe("Account-required editing", () => {
  it("blocks pointer editing intent before any input and requests sign-in", () => {
    const request = vi.fn();
    render(<ContentGate locked onRequestAuth={request}><input aria-label="name" defaultValue="Sample" /></ContentGate>);
    const input = screen.getByRole("textbox");
    expect(fireEvent.pointerDown(input)).toBe(false);
    expect(request).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("Sample");
  });
  it("requests sign-in when a locked field receives keyboard focus", () => {
    const request = vi.fn();
    render(<ContentGate locked onRequestAuth={request}><textarea aria-label="summary" /></ContentGate>);
    fireEvent.focus(screen.getByRole("textbox"));
    expect(request).toHaveBeenCalledTimes(1);
  });
  it("prevents locked form actions from modifying content", () => {
    const action = vi.fn();
    render(<ContentGate locked onRequestAuth={vi.fn()}><button onClick={action}>Add</button></ContentGate>);
    fireEvent.click(screen.getByRole("button"));
    expect(action).not.toHaveBeenCalled();
  });
  it("allows editing actions after sign-in", () => {
    const action = vi.fn();
    const request = vi.fn();
    render(<ContentGate locked={false} onRequestAuth={request}><button onClick={action}>Add</button></ContentGate>);
    fireEvent.click(screen.getByRole("button"));
    expect(action).toHaveBeenCalledTimes(1);
    expect(request).not.toHaveBeenCalled();
  });
});

describe("Local account isolation", () => {
  it("never loads account A's document into account B or discovery", () => {
    const doc = defaultDoc();
    saveDoc({ ...doc, cv: { ...doc.cv, personal: { ...doc.cv.personal, name: "Private A" } } }, "account-a");
    expect(loadDoc("account-a").cv.personal.name).toBe("Private A");
    expect(loadDoc("account-b").cv.personal.name).not.toBe("Private A");
    expect(loadDoc().cv.personal.name).not.toBe("Private A");
  });
  it("does not silently assign a legacy unowned draft to a signed-in account", () => {
    const doc = defaultDoc();
    localStorage.setItem("cvflow.doc.v1", JSON.stringify({ ...doc, cv: { ...doc.cv, title: "Legacy private" } }));
    expect(loadDoc("account-b").cv.title).not.toBe("Legacy private");
    expect(localStorage.getItem("cvflow.doc.v1")).not.toBeNull();
  });
  it("keeps local AI trial counters separate between accounts", () => {
    saveCredits(2, "account-a");
    expect(loadCredits("account-a")).toBe(2);
    expect(loadCredits("account-b")).toBe(5);
  });
  it("preserves intentionally deleted CV sections after reload", () => {
    const doc = defaultDoc();
    saveDoc({ ...doc, cv: { ...doc.cv, experiences: [], education: [], skills: [], languages: [], interests: [] } }, "account-a");
    expect(loadDoc("account-a").cv.experiences).toEqual([]);
    expect(loadDoc("account-a").cv.education).toEqual([]);
    expect(loadDoc("account-a").cv.skills).toEqual([]);
    expect(loadDoc("account-a").cv.languages).toEqual([]);
    expect(loadDoc("account-a").cv.interests).toEqual([]);
  });
});