import axios from "../config/axios";

export async function pingApi(timeoutMs = 45000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const { data } = await axios.get("/health", { signal: controller.signal });
    if (data && typeof data === "object" && "ok" in data) {
      return {
        ok: Boolean(data.ok),
        mongo: Boolean(data.mongo),
        ai: Boolean(data.ai),
      };
    }
  } catch {
    // Older API builds may not have /health yet.
  }

  try {
    await axios.get("/", { signal: controller.signal });
    return { ok: true, mongo: false, ai: false };
  } catch {
    return { ok: false, mongo: false, ai: false };
  } finally {
    clearTimeout(timer);
  }
}
