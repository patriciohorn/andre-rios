const API_URL = import.meta.env.PUBLIC_API_URL;
console.log("API_URL", API_URL);

export const uploadPhoto = async (
  file: File,
): Promise<{ photoUrl: string }> => {
  const formData = new FormData();
  formData.append("photo", file);

  const res = await fetch(`${API_URL}/api/uploads`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};
