"use client";
import { RoleTagInput } from "./RoleTagInput";
import type { UserPreferences as JobPreferences, JobBoard } from "../types";

interface PreferencesFormProps {
  preferences: JobPreferences;
  addRole: (r: string) => void;
  removeRole: (r: string) => void;
  addLocation: (l: string) => void;
  removeLocation: (l: string) => void;
  updatePrefs: (p: Partial<JobPreferences>) => void;
}

const JOB_BOARDS: JobBoard[] = ["remoteok", "arbeitnow", "themuse"];

const JOB_BOARD_LABELS: Record<JobBoard, string> = {
  remoteok: "RemoteOK",
  arbeitnow: "Arbeitnow",
  themuse: "The Muse",
};

export function PreferencesForm({
  preferences,
  addRole,
  removeRole,
  addLocation,
  removeLocation,
  updatePrefs,
}: PreferencesFormProps) {
  const toggleJobBoard = (board: JobBoard) => {
    const current = preferences.jobBoards;
    const updated = current.includes(board)
      ? current.filter((b) => b !== board)
      : [...current, board];
    updatePrefs({ jobBoards: updated });
  };

  return (
    <div className="space-y-5">
      <RoleTagInput
        label="Target Roles"
        tags={preferences.targetRoles}
        onAdd={addRole}
        onRemove={removeRole}
        placeholder="e.g. Software Engineer"
      />
      <RoleTagInput
        label="Locations"
        tags={preferences.locations}
        onAdd={addLocation}
        onRemove={removeLocation}
        placeholder="e.g. London, Remote"
      />

      {/* Salary + Score Threshold */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
            Min Salary (£)
          </label>
          <input
            type="number"
            value={preferences.minSalary}
            onChange={(e) => updatePrefs({ minSalary: Number(e.target.value) })}
            placeholder="e.g. 60000"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 font-mono"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
            Score Threshold (%)
          </label>
          <input
            type="number"
            min={0}
            max={100}
            value={preferences.scoreThreshold}
            onChange={(e) =>
              updatePrefs({ scoreThreshold: Number(e.target.value) })
            }
            placeholder="e.g. 70"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-emerald-500/50 font-mono"
          />
        </div>
      </div>

      {/* Job Boards */}
      <div>
        <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
          Job Boards
        </label>
        <div className="flex flex-wrap gap-2">
          {JOB_BOARDS.map((board) => {
            const active = preferences.jobBoards.includes(board);
            return (
              <button
                key={board}
                type="button"
                onClick={() => toggleJobBoard(board)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                  active
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                    : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                }`}
              >
                {JOB_BOARD_LABELS[board]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto Apply toggle */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            checked={preferences.autoApply}
            onChange={(e) => updatePrefs({ autoApply: e.target.checked })}
            className="sr-only"
          />
          <div
            className={`w-9 h-5 rounded-full border transition-all ${
              preferences.autoApply
                ? "bg-emerald-500/30 border-emerald-500/50"
                : "bg-white/5 border-white/10"
            }`}
          >
            <div
              className={`w-3.5 h-3.5 rounded-full mt-0.5 transition-all ${
                preferences.autoApply
                  ? "translate-x-4 bg-emerald-400"
                  : "translate-x-0.5 bg-white/30"
              }`}
            />
          </div>
        </div>
        <span className="text-sm font-mono text-white/60 group-hover:text-white/80 transition-colors">
          Auto Apply
        </span>
      </label>
    </div>
  );
}
