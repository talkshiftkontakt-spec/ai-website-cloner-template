export interface HeadPreviewResult {
  success: boolean;
  textureUrl?: string;
  error?: string;
}

export async function fetchHeadFromNick(
  nick: string,
): Promise<HeadPreviewResult> {
  const trimmed = nick.trim();
  if (!trimmed) {
    return { success: false, error: "Wpisz nick Minecraft." };
  }

  if (!/^[a-zA-Z0-9_]{3,16}$/.test(trimmed)) {
    return {
      success: false,
      error: "Nick musi mieć 3–16 znaków (litery, cyfry, _).",
    };
  }

  try {
    const response = await fetch(
      `https://mc-heads.net/avatar/${encodeURIComponent(trimmed)}/128`,
      { method: "HEAD" },
    );

    if (!response.ok) {
      return { success: false, error: "Nie znaleziono gracza o tym nicku." };
    }

    return {
      success: true,
      textureUrl: `https://mc-heads.net/skin/${encodeURIComponent(trimmed)}`,
    };
  } catch {
    return {
      success: false,
      error: "Nie udało się połączyć z serwisem podglądu. Spróbuj ponownie.",
    };
  }
}
