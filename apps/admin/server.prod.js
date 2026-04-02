import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { join, extname } from "node:path"
import { fileURLToPath } from "node:url"

const PORT = parseInt(process.env.PORT || "3001", 10)
const __dirname = fileURLToPath(new URL(".", import.meta.url))
const distDir = join(__dirname, "dist")

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
}

async function serveFile(filePath, res, cacheControl) {
  try {
    const stats = await stat(filePath)
    if (!stats.isFile()) return false
    const content = await readFile(filePath)
    const ext = extname(filePath)
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": cacheControl,
    })
    res.end(content)
    return true
  } catch {
    return false
  }
}

const indexHtml = await readFile(join(distDir, "index.html"), "utf-8")

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`)
  const pathname = url.pathname

  // API proxy is handled by Railway's service networking, not here
  // Static assets with hashed filenames
  if (pathname.startsWith("/assets/")) {
    const served = await serveFile(
      join(distDir, pathname),
      res,
      "public, max-age=31536000, immutable"
    )
    if (served) return
  }

  // Other static files
  if (pathname !== "/" && pathname.indexOf(".") !== -1) {
    const served = await serveFile(
      join(distDir, pathname),
      res,
      "public, max-age=3600"
    )
    if (served) return
  }

  // SPA fallback — serve index.html for all routes
  res.writeHead(200, { "Content-Type": "text/html" })
  res.end(indexHtml)
})

server.listen(PORT, () => {
  console.log(`Quartex Admin running on http://localhost:${PORT}`)
})
