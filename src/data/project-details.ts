/** Supporting content verified against the projects' public source repositories. */
export const projectDetails = {
  "stockpredict-ai": {
    seoTitle: "StockPredict AI: Explainable Stock Forecasts",
    descriptor: "Explainable stock forecasting with LightGBM, LSTM, and SHAP",
    category: "FinanceApplication",
    flow: [
      { title: "Market data", detail: "Prices, fundamentals, news, sentiment" },
      { title: "Daily ML pipeline", detail: "GitHub Actions · LightGBM · LSTM · SHAP" },
      { title: "Stored predictions", detail: "MongoDB Atlas → Express API" },
      { title: "Web dashboard", detail: "Next.js · charts · AI explanations" },
    ],
    nextSteps: "Extend walk-forward evaluation across more market regimes and make backtest assumptions easier to inspect alongside each forecast.",
    note: "The +13.71% 30-day-horizon result is from the project's September 2025–March 2026 market-neutral backtest. It is a historical simulation, not a live trading return or a guarantee of future performance. This is a research and demonstration project, not investment advice.",
  },
  expensevision: {
    seoTitle: "ExpenseVision: AI Expense Tracker PWA",
    descriptor: "Installable expense tracker with AI receipt scanning and budgets",
    category: "FinanceApplication",
    flow: [
      { title: "Upload a receipt", detail: "Camera, file upload, or mobile share" },
      { title: "OCR fallback chain", detail: "Veryfi → Gemini → OpenRouter" },
      { title: "Review extracted data", detail: "Check merchant, amount, date, category" },
      { title: "Save and track", detail: "Supabase · budgets · spending insights" },
    ],
    nextSteps: "Expand receipt fixtures across currencies and image quality levels, and measure extraction quality field by field before publishing an accuracy claim.",
    note: "OCR providers are tried as a fallback chain, depending on configuration and availability. Extracted fields can be reviewed before saving; no measured accuracy percentage is claimed.",
    demoUrl: "https://expensevision.tech/demo",
  },
  "verdict-games": {
    seoTitle: "Verdict Games: Game Discovery & Scoring",
    descriptor: "Multi-source game discovery, reviews, and confidence-weighted scores",
    category: "EntertainmentApplication",
    flow: [
      { title: "Discover games", detail: "RAWG · scheduled GitHub Actions jobs" },
      { title: "Enrich in parallel", detail: "Steam · IGDB · deals · playtime · news" },
      { title: "Score and store", detail: "Community + critics + confidence → Supabase" },
      { title: "Explore the catalog", detail: "Next.js · search · reviews · libraries" },
    ],
    nextSteps: "Expose more of the source and confidence breakdown on game pages and broaden regression fixtures for sparse or conflicting rating data.",
    note: "Verdict Scoring v2 combines a Wilson lower bound for community reviews with normalized critic ratings and a confidence weight. Scores are aggregated signals, not an independent editorial rating. RAWG, Steam, IGDB, CheapShark, Wikipedia, HowLongToBeat, and GX Corner provide core data; Google Play and App Store support mobile listing verification.",
  },
} satisfies Record<string, { seoTitle: string; descriptor: string; category: string; flow: { title: string; detail: string }[]; nextSteps: string; note: string; demoUrl?: string }>;

export type ProjectSlug = keyof typeof projectDetails;
