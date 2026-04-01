import type { SeoMeta } from "../types/seo.js"

const SITE_NAME = "Quartex Technologies"
const DEFAULT_IMAGE = "/og-default.png"

export function buildMeta(opts: SeoMeta) {
  const title = `${opts.title} — ${SITE_NAME}`
  const image = opts.image ?? DEFAULT_IMAGE

  return [
    { title },
    { name: "description", content: opts.description },
    { property: "og:title", content: title },
    { property: "og:description", content: opts.description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:type", content: "website" },
    { property: "og:image", content: image },
    ...(opts.url ? [{ property: "og:url", content: opts.url }] : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ]
}
