export const decodeToken = (token: string) => {
  try {
    // Ensure the token has three parts
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token structure");
    }

    // Decode the payload (second part)
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    // Parse and return the decoded payload
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Token decoding failed:", e);
    return null;
  }
};
