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

export async function getReports(
  limit = 31,
  cursor: string | null = null,
  month?: number,
  year?: number,
) {
  const params = new URLSearchParams({
    limit: String(limit),
  });
  if (cursor) {
    params.append("cursor", cursor);
  }
  if (month !== undefined) {
    params.append("month", String(month));
  }

  if (year !== undefined) {
    params.append("year", String(year));
  }
  return apiRequest(`/tours?${params.toString()}`);
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

export async function getPrivateRequests() {
  return apiRequest("/private-tour");
}

export async function postPrivateRequest(data: any) {
  return apiRequest("/private-tour", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getOvertimeAnalytics(
  month?: number,
  year?: number,
  tour?: string,
) {
  const params = new URLSearchParams();

  if (month !== undefined) {
    params.append("month", String(month));
  }

  if (year !== undefined) {
    params.append("year", String(year));
  }
  if (tour) params.append("tour", tour);
  return apiRequest(`/tours/analytics?${params.toString()}`);
}

export async function getDepartureScreen() {
  return apiRequest("/departure-screen");
}

export async function saveDepartureScreen(rows: any) {
  return apiRequest("/departure-screen", {
    method: "POST",
    body: JSON.stringify(rows),
  });
}
