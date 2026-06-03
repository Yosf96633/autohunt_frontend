"use client";
import { useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CVUploaderProps {
  file: File | null;
  onFile: (f: File | null) => void;
}

export function CVUploader({ file, onFile }: CVUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped?.type === "application/pdf") onFile(dropped);
  };

  return (
    <div>
      <label className="block text-xs font-mono text-white/50 uppercase tracking-wider mb-2">
        CV / Resume
      </label>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-emerald-500/30 bg-emerald-500/5">
          <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-sm text-white/80 truncate flex-1">
            {file.name}
          </span>
          <button
            type="button"
            onClick={() => onFile(null)}
            className="text-white/30 hover:text-white/70 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center gap-2 py-8 rounded-lg border border-dashed border-white/10",
            "bg-white/2 hover:bg-white/4 hover:border-white/20 cursor-pointer transition-all",
          )}
        >
          <Upload className="w-5 h-5 text-white/30" />
          <p className="text-xs font-mono text-white/40">
            Drop PDF here or click to upload
          </p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
