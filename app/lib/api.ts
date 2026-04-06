const API_BASE = "/api";

async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      credentials: "include",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.error || result.message || `HTTP error ${response.status}`,
      );
    }

    return result as T;
  } catch (err: any) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      throw new Error("Request timeout - please try again");
    }

    throw new Error(err?.message || "An unexpected error occurred");
  }
}

export async function postTours(data: any) {
  return apiRequest("/tours", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getReports() {
  return apiRequest("/tours");
}

export async function getReportById(id: string) {
  if (!id) throw new Error("Report ID is required");
  return apiRequest(`/tours/${id}`);
}

export async function removeReport(id: string) {
  if (!id) throw new Error("Report ID is required");
  return apiRequest(`/tours/${id}`, { method: "DELETE" });
}

export async function updateReport(id: string, data: any) {
  if (!id) throw new Error("Report ID is required");
  return apiRequest(`/tours/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
