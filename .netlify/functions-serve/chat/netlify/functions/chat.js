var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/chat.js
var chat_exports = {};
__export(chat_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(chat_exports);
async function handler(event) {
  const TARGET = process.env.BACKEND_CHAT_URL;
  if (!TARGET) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing BACKEND_CHAT_URL env var" })
    };
  }
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
      },
      body: ""
    };
  }
  try {
    const res = await fetch(TARGET, {
      method: event.httpMethod,
      headers: {
        "Content-Type": event.headers["content-type"] || "application/json"
      },
      body: ["POST", "PUT", "PATCH"].includes(event.httpMethod) ? event.body : void 0
    });
    const data = await res.text();
    return {
      statusCode: res.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": res.headers.get("content-type") || "application/json"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=chat.js.map
