import { describe, it, expect } from "vitest";
import { getInitialName } from "../utils";

describe("Utility Functions Test", () => {
  it("should return initial from full name", () => {
    const result = getInitialName("Misbah");
    expect(result).toBe("M");
  });
});
