"use client";
import { useState } from "react";
import type {
  SetupFormData,
  UserPreferences as JobPreferences,
  JobBoard,
} from "../types";

const DEFAULT_PREFS: JobPreferences = {
  targetRoles: [],
  locations: [],
  minSalary: 0,
  scoreThreshold: 70,
  autoApply: false,
  jobBoards: ["remoteok", "arbeitnow", "themuse"] as JobBoard[],
  email: "",
};

export function useSetupForm() {
  const [cv, setCv] = useState<File | null>(null);
  const [preferences, setPreferences] = useState<JobPreferences>(DEFAULT_PREFS);

  const updatePrefs = (partial: Partial<JobPreferences>) =>
    setPreferences((p) => ({ ...p, ...partial }));

  const addRole = (role: string) => {
    const trimmed = role.trim();
    if (trimmed && !preferences.targetRoles.includes(trimmed))
      updatePrefs({ targetRoles: [...preferences.targetRoles, trimmed] });
  };

  const removeRole = (role: string) =>
    updatePrefs({
      targetRoles: preferences.targetRoles.filter((r) => r !== role),
    });

  const addLocation = (loc: string) => {
    const trimmed = loc.trim();
    if (trimmed && !preferences.locations.includes(trimmed))
      updatePrefs({ locations: [...preferences.locations, trimmed] });
  };

  const removeLocation = (loc: string) =>
    updatePrefs({ locations: preferences.locations.filter((l) => l !== loc) });

  const isValid =
    cv !== null &&
    preferences.targetRoles.length > 0;

  const getFormData = (): SetupFormData => ({ cv, preferences });

  return {
    cv,
    setCv,
    preferences,
    updatePrefs,
    addRole,
    removeRole,
    addLocation,
    removeLocation,
    isValid,
    getFormData,
  };
}
