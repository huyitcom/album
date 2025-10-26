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
