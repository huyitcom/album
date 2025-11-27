/**
 * Fetches content from a URL (including blob URLs) and converts it to a base64 data URI.
 * This is useful for saving images to localStorage or sending them to an API.
 */
export const urlContentToDataUri = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};

/**
 * Converts a Blob object to a base64 encoded string, without the data URI prefix.
 * This format is required for the Gemini API's inlineData.
 */
export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.error) {
        return reject(reader.error);
      }
      const result = reader.result as string;
      // result is "data:mime/type;base64,thebase64string"
      // we need to strip the prefix for the API
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(blob);
  });
};

/**
 * Compresses and resizes an image blob to ensure it fits within API payload limits.
 * Returns base64 string without prefix.
 */
export const compressImage = (blob: Blob, maxWidth: number, quality: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.src = url;
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      
      // If height is still too big (e.g. panorama), constrain by height too
      if (height > maxWidth) {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }
      
      // Draw white background to handle transparent PNGs converting to JPEG
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      
      ctx.drawImage(img, 0, 0, width, height);
      
      // Export as JPEG with reduced quality
      const dataUrl = canvas.toDataURL('image/jpeg', quality);
      
      // Remove prefix "data:image/jpeg;base64,"
      resolve(dataUrl.split(',')[1]);
    };
    
    img.onerror = (err) => {
        URL.revokeObjectURL(url);
        reject(err);
    };
  });
};