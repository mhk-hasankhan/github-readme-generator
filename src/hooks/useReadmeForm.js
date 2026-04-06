"use client";

import { useState, useCallback } from "react";
import { generateReadme } from "@/utils/readmeGenerator";

const INITIAL_STATE = {
  username: "",
  name: "",
  subtitle: "",
  about: "",
  pronouns: "",
  workingOn: "",
  learningNow: "",
  collaborateOn: "",
  funFact: "",
  techStack: [],
  socials: {},
  donations: {},
  githubStats: true,
  showStreak: true,
  showLangs: true,
  showTrophies: false,
  showVisitors: true,
  statTheme: "tokyonight",
  funComponents: { quotes: false, memes: false },
};

export function useReadmeForm() {
  const [form, setForm] = useState(INITIAL_STATE);

  const updateField = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateNested = useCallback((parent, key, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: { ...prev[parent], [key]: value },
    }));
  }, []);

  const toggleTech = useCallback((tech) => {
    setForm((prev) => {
      const exists = prev.techStack.find((t) => t.id === tech.id);
      return {
        ...prev,
        techStack: exists
          ? prev.techStack.filter((t) => t.id !== tech.id)
          : [...prev.techStack, tech],
      };
    });
  }, []);

  const resetForm = useCallback(() => {
    setForm(INITIAL_STATE);
  }, []);

  const readme = generateReadme(form);

  return { form, readme, updateField, updateNested, toggleTech, resetForm };
}
