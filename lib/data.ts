export const businessType = [
  {
    label: "Commerce",
    types: ["Retail Store", "E-commerce", "Wholesale / Distribution"],
  },
  {
    label: "Food & Beverage",
    types: ["Restaurant", "Café", "Cloud Kitchen / Delivery-only"],
  },
  {
    label: "Services",
    types: [
      "Consulting",
      "Marketing Agency",
      "Freelance / Solo Business",
      "Legal / Accounting Firm",
    ],
  },
  {
    category: "healthcare",
    label: "Healthcare",
    types: ["Clinic", "Pharmacy", "Wellness / Fitness Center"],
  },
  {
    category: "education",
    label: "Education",
    types: ["School / College", "Online Course / EdTech", "Training Center"],
  },
  {
    category: "hospitality",
    label: "Hospitality",
    types: ["Hotel / Resort", "Travel Agency", "Event Management"],
  },
  {
    category: "operations",
    label: "Operations",
    types: ["Manufacturing", "Logistics / Supply Chain", "Construction"],
  },
  {
    category: "technology",
    label: "Technology",
    types: ["SaaS", "Startup", "IT Services"],
  },
  {
    category: "finance",
    label: "Finance",
    types: ["Financial Services", "Insurance", "Investment / Trading"],
  },
  {
    category: "creative",
    label: "Creative",
    types: [
      "Design Studio",
      "Media / Content Creation",
      "Photography / Videography",
    ],
  },
];

export const agents = [
  {
    name: "Sales Predictor",
    slug: "sales-predictor",
    description:
      "Forecasts future sales trends based on your business data and patterns.",
  },
  {
    name: "Pain Point Analyser",
    slug: "pain-point-analyser",
    description:
      "Identifies weaknesses and inefficiencies affecting your business performance.",
  },
  {
    name: "Profit Optimiser",
    slug: "profit-optimiser",
    description:
      "Recommends strategies to maximise profit and improve cost efficiency.",
  },
  {
    name: "Decision Recommendation",
    slug: "decision-recommendation",
    description:
      "Suggests data-driven actions to support smarter business decisions.",
  },
  {
    name: "Risk Identifier",
    slug: "risk-identifier",
    description:
      "Detects potential risks and highlights areas that may impact your success.",
  },
  {
    name: "Scenario Simulator",
    slug: "scenario-simulator",
    description:
      "Simulates different business scenarios to evaluate possible outcomes.",
  },
  {
    name: "Resource Optimiser",
    slug: "resource-optimiser",
    description:
      "Helps allocate resources effectively to improve productivity and results.",
  },
];

export const allowedFileTypes = [
  // Images
  { type: "image/", label: "IMG" },

  // Documents
  { type: "application/pdf", label: "PDF" },
  {
    type: "application/msword",
    label: "Word",
  },
  {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    label: "Word",
  },
  { type: "text/plain", label: "TXT" },
  { type: "application/rtf", label: "RTF" },

  // Data / spreadsheets
  { type: "text/csv", label: "CSV" },
  { type: "application/vnd.ms-excel", label: "Excel" },
  {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    label: "Sheet",
  },
  { type: "application/json", label: "JSON" },

  // Archives
  { type: "application/zip", label: "ZIP" },
  { type: "application/x-rar-compressed", label: "RAR" },
  { type: "application/x-7z-compressed", label: "7Z" },

  // Code files
  { type: "text/javascript", label: "JS" },
  { type: "application/javascript", label: "JS" },
  { type: "text/typescript", label: "TS" },
  { type: "text/html", label: "HTML" },
  { type: "text/css", label: "CSS" },
];
