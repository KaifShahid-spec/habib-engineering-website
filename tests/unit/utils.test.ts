import { describe, it, expect } from "vitest";
import { slugify, formatDate, formatDateTime, truncate, getInitials, slugToTitle } from "@/lib/utils";

describe("Utils", () => {
  describe("slugify", () => {
    it("converts text to URL-friendly slug", () => {
      expect(slugify("Oil Immersed Transformer")).toBe("oil-immersed-transformer");
      expect(slugify("  Extra   Spaces  ")).toBe("extra-spaces");
    });

    it("removes special characters", () => {
      expect(slugify("Hello & World!")).toBe("hello-world");
    });
  });

  describe("truncate", () => {
    it("truncates long text", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("returns short text unchanged", () => {
      expect(truncate("Hi", 10)).toBe("Hi");
    });
  });

  describe("getInitials", () => {
    it("extracts initials from name", () => {
      expect(getInitials("Habib Engineering")).toBe("HE");
      expect(getInitials("Kaif Shahid")).toBe("KS");
      expect(getInitials("Single")).toBe("S");
    });
  });

  describe("slugToTitle", () => {
    it("converts slug back to title case", () => {
      expect(slugToTitle("oil-immersed")).toBe("Oil Immersed");
    });
  });

  describe("formatDate", () => {
    it("formats date correctly", () => {
      const date = new Date("2024-01-15");
      expect(formatDate(date)).toBe("15 Jan 2024");
    });

    it("handles null safely", () => {
      expect(formatDate(null)).toBe("");
    });
  });
});