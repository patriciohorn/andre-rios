// components/PhotoSlot.tsx
import { useRef, useState } from "react";
import { Loader2, Plus, RefreshCw, X } from "lucide-react";
import { uploadPhoto } from "@/lib/api";
import { Button } from "@/components/ui/button";

type PhotoSlotProps = {
  value: string | null;
  onChange: (url: string | null) => void;
  label: string;
  removable?: boolean;
};

export function PhotoSlot({
  value,
  onChange,
  label,
  removable,
}: PhotoSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ""; // allow re-picking the same file

    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB");
      return;
    }

    setError(null);
    setUploading(true);
    try {
      const { photoUrl } = await uploadPhoto(file);
      onChange(photoUrl);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFile}
      />

      {value ? (
        <div className="group relative aspect-[3/4] overflow-hidden rounded-lg border border-border">
          <img src={value} alt={label} className="h-full w-full object-cover" />

          <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 hover:bg-white"
              aria-label={`Replace ${label}`}
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
            {removable && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 hover:bg-white hover:text-destructive"
                aria-label={`Remove ${label}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex aspect-[3/4] flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/50"
        >
          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </button>
      )}

      <p className="text-center text-xs text-muted-foreground">{label}</p>
      {error && <p className="text-center text-xs text-destructive">{error}</p>}
    </div>
  );
}
