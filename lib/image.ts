// Utilitaire navigateur : redimensionne et compresse une image avant envoi,
// pour garder des fichiers légers (catalogue rapide, stockage réduit).

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Lecture du fichier impossible"));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Image invalide"));
    img.src = src;
  });
}

/**
 * Redimensionne l'image (côté max = maxSize) et la compresse en JPEG.
 * Renvoie une data URL (aperçu / repli local) et un Blob (envoi serveur).
 * En cas d'échec (format exotique), repli sur le fichier d'origine.
 */
export async function resizeImage(
  file: File,
  maxSize = 1200,
  quality = 0.82
): Promise<{ dataUrl: string; blob: Blob }> {
  try {
    const original = await readAsDataURL(file);
    const img = await loadImage(original);

    let { width, height } = img;
    if (width > maxSize || height > maxSize) {
      if (width >= height) {
        height = Math.round((height * maxSize) / width);
        width = maxSize;
      } else {
        width = Math.round((width * maxSize) / height);
        height = maxSize;
      }
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas indisponible");
    // Fond blanc (évite le noir sur les PNG transparents convertis en JPEG).
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", quality);
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/jpeg", quality)
    );
    if (!blob) throw new Error("Compression impossible");

    return { dataUrl, blob };
  } catch {
    // Repli : on renvoie le fichier tel quel.
    const dataUrl = await readAsDataURL(file);
    return { dataUrl, blob: file };
  }
}
