// netlify/functions/chat.js
export async function handler(event) {
  const TARGET = process.env.BACKEND_CHAT_URL; // set this in Netlify dashboard later

  if (!TARGET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing BACKEND_CHAT_URL env var" }),
    };
  }

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
      body: "",
    };
  }

  try {
    const res = await fetch(TARGET, {
      method: event.httpMethod,
      headers: {
        "Content-Type": event.headers["content-type"] || "application/json",
      },
      body: ["POST", "PUT", "PATCH"].includes(event.httpMethod)
        ? event.body
        : undefined,
    });

    const data = await res.text();
    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": res.headers.get("content-type") || "application/json",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
