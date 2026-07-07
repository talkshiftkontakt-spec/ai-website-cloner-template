"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

import { CanvasPrintPreview } from "@/components/configurator/CanvasPrintPreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analyticsEvents } from "@/lib/analytics/events";
import { fetchHeadFromNick } from "@/lib/skin/fetchHeadFromNick";
import { readFileAsDataUrl, validateSkinPng } from "@/lib/skin/validateSkinPng";
import { cn } from "@/lib/utils";

interface SkinUploaderProps {
 onTextureChange: (url: string | null) => void;
 className?: string;
}

export function SkinUploader({ onTextureChange, className }: SkinUploaderProps) {
 const [nick, setNick] = useState("");
 const [error, setError] = useState<string | null>(null);
 const [textureUrl, setTextureUrl] = useState<string | null>(null);
 const [loading, setLoading] = useState(false);

 const handleFile = useCallback(
 async (file: File) => {
 setError(null);
 const result = await validateSkinPng(file);
 if (!result.valid) {
 setError(result.error ?? "Nieprawidłowy plik");
 analyticsEvents.skinUpload(false);
 return;
 }
 const dataUrl = await readFileAsDataUrl(file);
 setTextureUrl(dataUrl);
 onTextureChange(dataUrl);
 analyticsEvents.skinUpload(true);
 analyticsEvents.skinPreview3d();
 },
 [onTextureChange],
 );

 const handleNickPreview = async () => {
 setLoading(true);
 setError(null);
 const result = await fetchHeadFromNick(nick);
 setLoading(false);
 if (!result.success || !result.textureUrl) {
 setError(result.error ?? "Błąd podglądu");
 return;
 }
 setTextureUrl(result.textureUrl);
 onTextureChange(result.textureUrl);
 analyticsEvents.skinPreview3d();
 };

 return (
 <div className={cn("space-y-6", className)}>
 <div>
 <Label htmlFor="skin-upload">Wgraj skin (PNG)</Label>
 <label
 htmlFor="skin-upload"
 className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-surface p-8 transition-colors hover:border-primary/50 hover:bg-surface-elevated"
 >
 <Upload className="mb-3 size-10 text-muted-foreground" />
 <p className="font-medium text-foreground">
 Przeciągnij plik lub kliknij, aby wybrać
 </p>
 <p className="mt-1 text-sm text-muted-foreground">
 PNG, 64×64 lub 128×128 px, max 5 MB
 </p>
 <input
 id="skin-upload"
 type="file"
 accept=".png"
 className="sr-only"
 onChange={(e) => {
 const file = e.target.files?.[0];
 if (file) void handleFile(file);
 }}
 />
 </label>
 {error && (
 <p className="mt-2 text-sm text-destructive" role="alert">
 {error}
 </p>
 )}
 </div>

 <div>
 <Label htmlFor="minecraft-nick">Podgląd z nicku (opcjonalnie)</Label>
 <div className="mt-2 flex gap-2">
 <Input
 id="minecraft-nick"
 placeholder="np. Steve"
 value={nick}
 onChange={(e) => setNick(e.target.value)}
 />
 <Button
 type="button"
 variant="outline"
 onClick={() => void handleNickPreview()}
 disabled={loading}
 >
 {loading ? "Ładowanie…" : "Podgląd"}
 </Button>
 </div>
 </div>

 <CanvasPrintPreview textureUrl={textureUrl} />
 </div>
 );
}
