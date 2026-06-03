export const NODE_LABELS: Record<string, string> = {
  cvParser: "Parsing CV",
  scraper: "Scraping Jobs",
  scorer: "Scoring Jobs",
  filter: "Filtering Results",
  coverLetter: "Writing Cover Letters",
  humanCheck: "Awaiting Your Review",
  applicator: "Applying to Jobs",
  tracker: "Logging Applications",
  digestSummary: "Generating Summary",
}

export const NODE_ORDER = [
  "cvParser",
  "scraper",
  "scorer",
  "filter",
  "coverLetter",
  "humanCheck",
  "applicator",
  "tracker",
  "digestSummary",
]

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"