import { removeReport } from "./api";

export async function handleDeleteReport(id: string, router: any) {
  try {
    const result = await removeReport(id);
    alert(result?.message || "Report deleted");
    router.push("/reports");
  } catch (err) {
    console.error(err);
  }
}




