export async function postTours(data: any) {
  try {
    const response = await fetch("/api/tours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to post tours");
    }
    return result;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to post tours");
  }
}

export async function getReports() {
  try {
    const response = await fetch("/api/tours");
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.error || "Failed to fetch reports");
    return result;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch tours");
  }
}

export async function getReportById(id: string) {
  try {
    const response = await fetch(`/api/tours/${id}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to fetch report");
    }
    return result;
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch tours");
  }
}

export async function removeReport(id: string) {
  try {
    const response = await fetch(`/api/tours/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok)
      throw new Error(result.error || "Failed to delete report");
    console.log(result.message);
    return result;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Failed to delete report");
  }
}

export async function updateReport(id: string, data: any) {
  try {
    const response = await fetch(`/api/tours/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || "Failed to update report");
    }

    const result = await response.json();
    return result;
  } catch (err: any) {
    console.error(err);
    throw new Error(err?.message || "Failed to update report");
  }
}
