export const hashData = async (data) => {
  try {
    const encoder = new TextEncoder();
    const dataEncode = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataEncode);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return hashHex;
  } catch (error) {
    reportError({ error });
    return data;
  }
};
