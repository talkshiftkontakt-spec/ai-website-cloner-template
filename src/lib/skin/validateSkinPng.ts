export interface SkinValidationResult {
  valid: boolean;
  error?: string;
  width?: number;
  height?: number;
}

const VALID_SIZES = [64, 128] as const;

export async function validateSkinPng(file: File): Promise<SkinValidationResult> {
  if (!file.name.toLowerCase().endsWith(".png")) {
    return { valid: false, error: "Plik musi być w formacie PNG." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "Plik jest za duży (max 5 MB)." };
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const { width, height } = img;
      const validSize = VALID_SIZES.includes(
        width as (typeof VALID_SIZES)[number],
      );

      if (!validSize || width !== height) {
        resolve({
          valid: false,
          error: "Skin musi mieć wymiary 64×64 lub 128×128 pikseli.",
          width,
          height,
        });
        return;
      }

      resolve({ valid: true, width, height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ valid: false, error: "Nie udało się odczytać pliku obrazu." });
    };

    img.src = url;
  });
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
