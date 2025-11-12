// src/utils/api.js
// Always go through the Netlify Function proxy (same-origin → no CORS).
// Set BACKEND_CHAT_URL in Netlify env to your real webhook (n8n.cloud or ngrok).
const CHAT_FN = "/.netlify/functions/chat";

export async function sendToWebhook(message) {
  const res = await fetch(CHAT_FN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Adjust payload shape if your n8n expects something else
    body: JSON.stringify({ message }),
  });

  // Handle non-2xx
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 404) {
      throw new Error("Function/chat not found. Check netlify.toml and file path.");
    }
    if (res.status === 502) {
      // Usually upstream webhook error/timeout
      throw new Error(text || "Upstream error (webhook timeout or unreachable).");
    }
    throw new Error(text || `HTTP ${res.status}`);
  }

  // Try JSON first; fall back to text
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    const data = await res.json();
    // If your n8n returns { reply: "..." }, prefer that
    if (data && typeof data.reply === "string") return data.reply;
    // Otherwise stringify whatever came back
    return typeof data === "string" ? data : JSON.stringify(data);
  }

  return await res.text();
}
