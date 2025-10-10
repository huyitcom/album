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
