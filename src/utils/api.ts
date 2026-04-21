const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const request = async (path: string, options: RequestInit = {}, withAuth = false) => {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (withAuth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
};

export const authApi = {
  register: (payload: { email: string; password: string; name: string; profession?: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: { email: string; password: string }) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
};

export const usersApi = {
  getMe: () => request("/users/me", { method: "GET" }, true),
  updateMe: (payload: { name: string; profession: string }) =>
    request("/users/me", { method: "PATCH", body: JSON.stringify(payload) }, true),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    return request("/users/me/avatar", { method: "POST", body: formData }, true);
  },
};

export const cardsApi = {
  getAll: () => request("/cards", { method: "GET" }),
  create: (payload: { title: string; imageUrl: string; content?: string }) =>
    request("/cards", { method: "POST", body: JSON.stringify(payload) }, true),
  createWithFile: (payload: { title: string; content?: string; image: File }) => {
    const formData = new FormData();
    formData.append("title", payload.title);
    if (payload.content) formData.append("content", payload.content);
    formData.append("image", payload.image);
    return request("/cards", { method: "POST", body: formData }, true);
  },
  delete: (id: string) => request(`/cards/${id}`, { method: "DELETE" }, true),
};

export const likesApi = {
  toggle: (cardId: string) => request(`/cards/${cardId}/like`, { method: "POST" }, true),
  mine: () => request("/users/me/likes", { method: "GET" }, true),
};

export const commentsApi = {
  getByCardId: (cardId: string) => request(`/card/${cardId}/comments`, { method: "GET" }),
  create: (cardId: string, payload: { content: string }) =>
    request(`/card/${cardId}/comments`, { method: "POST", body: JSON.stringify(payload) }, true),
  delete: (commentId: string) => request(`/comments/${commentId}`, { method: "DELETE" }, true),
};

