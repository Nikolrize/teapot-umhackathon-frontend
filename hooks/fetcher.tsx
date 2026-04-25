const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetcher = async (url: string, options?: RequestInit) => {
  const res = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "API Error");
  }

  return res.json();
};

export const uploadFetcher = async (url: string, formData: FormData) => {
  const res = await fetch(`${API_URL}${url}`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "Upload failed");
  }

  return res.json();
};