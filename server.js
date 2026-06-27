const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8766);
const apiKey = process.env.XIAOJI_API_KEY;
const upstream = "https://xiaoji.baziapi.site/v1/images/generations";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml"
};

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 128 * 1024) {
        reject(new Error("请求内容太大。"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("请求 JSON 格式不正确。"));
      }
    });
    req.on("error", reject);
  });
}

function cleanPayload(input) {
  const allowedSizes = new Set(["1024x1024", "1024x1792", "1792x1024"]);
  const allowedQuality = new Set(["standard", "hd"]);
  const allowedStyle = new Set(["vivid", "natural"]);
  const allowedFormat = new Set(["url", "b64_json"]);
  const allowedModels = new Set(["image2", "gpt-image-2", "dall-e-3"]);

  const prompt = String(input.prompt || "").trim();
  if (!prompt) throw new Error("请填写提示词。");
  if (prompt.length > 3000) throw new Error("提示词太长，请控制在 3000 字以内。");

  const referenceImages = Array.isArray(input.reference_images)
    ? input.reference_images.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (referenceImages.length > 4) throw new Error("参考图最多 4 张。");
  for (const url of referenceImages) {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("参考图必须是 http 或 https 公网 URL。");
    }
  }

  const payload = {
    model: allowedModels.has(input.model) ? input.model : "image2",
    prompt,
    n: Math.min(Math.max(Number(input.n || 1), 1), 3),
    size: allowedSizes.has(input.size) ? input.size : "1024x1024",
    quality: allowedQuality.has(input.quality) ? input.quality : "standard",
    response_format: allowedFormat.has(input.response_format) ? input.response_format : "url"
  };

  if (allowedStyle.has(input.style)) payload.style = input.style;
  if (referenceImages.length) payload.reference_images = referenceImages;
  return payload;
}

async function handleImageGeneration(req, res) {
  if (!apiKey) {
    sendJson(res, 500, {
      error: {
        message: "服务器没有配置 XIAOJI_API_KEY 环境变量。",
        type: "missing_api_key"
      }
    });
    return;
  }

  let payload;
  try {
    payload = cleanPayload(await readJson(req));
  } catch (error) {
    sendJson(res, 400, {
      error: {
        message: error.message,
        type: "invalid_request_error"
      }
    });
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);
  try {
    let upstreamResponse;
    let text = "";
    for (let attempt = 0; attempt < 3; attempt += 1) {
      upstreamResponse = await fetch(upstream, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
      text = await upstreamResponse.text();
      if (!(upstreamResponse.status === 429 || /当前请求较多/.test(text))) break;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }

    const contentType = upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8";
    if (upstreamResponse.status === 429 || /当前请求较多/.test(text)) {
      sendJson(res, 200, {
        object: "image.generation.fallback",
        fallback: true,
        message: "当前请求较多，请稍后重试。",
        data: []
      });
      return;
    }

    res.writeHead(upstreamResponse.status, { "Content-Type": contentType });
    res.end(text);
  } catch (error) {
    sendJson(res, 200, {
      object: "image.generation.fallback",
      fallback: true,
      message: error.name === "AbortError" ? "图片生成请求超时，先展示本地预览图。" : "上游生图接口暂时不可用，先展示本地预览图。",
      data: []
    });
  } finally {
    clearTimeout(timeout);
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const safePath = path.normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath === "/" ? "index.html" : safePath);
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/generate-image") {
    handleImageGeneration(req, res);
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    serveStatic(req, res);
    return;
  }
  sendJson(res, 405, { error: { message: "Method not allowed", type: "method_not_allowed" } });
});

server.listen(port, "0.0.0.0", () => {
  console.log(`会算账官网已启动：http://127.0.0.1:${port}/`);
  console.log("生图接口代理：POST /api/generate-image");
});
