import {
  BarChart3,
  Cpu,
  Layers,
  Calendar,
  Sparkles,
  Gamepad2,
  Database,
  Globe,
} from "lucide-react";
import type { Project } from "./projects";

export const projects: Project[] = [
  {
    slug: "stockpredict-ai",
    title: "StockPredict AI",
    tagline:
      "Full-stack ML platform that predicts, explains, and tracks S&P 100 stocks daily",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – Present",
    description:
      "An end-to-end stock prediction system that runs a fully automated daily pipeline: fetching market data, training LightGBM models, generating price forecasts for 1-day, 7-day, and 30-day horizons, and writing plain-English AI explanations. Everything is served through a real-time Next.js dashboard with live WebSocket prices, TradingView charts, and interactive heatmaps.",
    highlights: [
      "Automated daily pipeline via GitHub Actions: data ingestion, model training, predictions, and AI explanations with zero manual intervention",
      "50+ engineered features per stock including price technicals, macro indicators, insider trades, short interest, and multi-source sentiment",
      "Sentiment analysis from 10+ sources (Finnhub, RSS, Reddit, Seeking Alpha) scored by FinBERT, RoBERTa, and VADER NLP models",
      "SHAP-based explainability decomposes each prediction into exactly which features drove it, then an LLM writes a stock-specific plain-English briefing",
      "Real-time WebSocket price streaming, TradingView advanced charts, market heatmaps, and an economic calendar",
      "Prediction history tracking with model evaluation and drift monitoring to measure accuracy over time",
    ],
    metrics: [
      { icon: <BarChart3 size={14} />, label: "Stocks", value: "100" },
      { icon: <Layers size={14} />, label: "Horizons", value: "3" },
      { icon: <Cpu size={14} />, label: "Features", value: "50+" },
      { icon: <Calendar size={14} />, label: "Pipeline", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "Insights", value: "AI-powered" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "LightGBM",
      "SHAP",
      "MongoDB",
      "Redis",
      "WebSocket",
      "Tailwind",
      "GitHub Actions",
    ],
    image: "/stock_predict_img/stockpredict-ai.png",
    gallery: [
      { src: "/stock_predict_img/stockpredict-ai.png", alt: "StockPredict AI Market Dashboard with top gainers, losers, and market overview" },
      { src: "/stock_predict_img/stock-details_page.png", alt: "Stock detail page with TradingView chart and AI prediction" },
      { src: "/stock_predict_img/stock-details_page2.png", alt: "Stock detail page with AI explanation and SHAP analysis" },
      { src: "/stock_predict_img/financial_flow_page.png", alt: "Financial flow Sankey diagram showing revenue breakdown" },
      { src: "/stock_predict_img/news_page.png", alt: "Unified news feed with multi-source financial news" },
      { src: "/stock_predict_img/watchlist_page.png", alt: "Watchlist with real-time price alerts" },
      { src: "/stock_predict_img/fundamentals_page.png", alt: "Stock fundamentals and financial data" },
    ],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
    caseStudy: {
      problem:
        "Individual investors lack access to institutional-grade stock analysis tools combining ML predictions with explainable AI. Existing retail platforms offer charts but no predictive intelligence or transparent reasoning behind forecasts.",
      approach:
        "Built an end-to-end automated pipeline: daily data ingestion from 10+ sources, LightGBM model training across 100 tickers, SHAP-based prediction decomposition, and LLM-powered plain-English explanations. Zero manual intervention required.",
      architecture:
        "The system uses three distinct AI/ML models working together, each with a completely different role. The Predictor (LightGBM) is the only component that actually predicts prices using 77 numeric features. The Sentiment Scorers (FinBERT, RoBERTa, VADER) read news from 10+ sources and produce input features. The Explainer (SHAP + LLM) decomposes the prediction and translates it into plain English.",
      architectureCards: [
        { label: "Frontend", detail: "Next.js 14 + React 18 with TradingView charts, ECharts Sankey diagrams, and Framer Motion", icon: "🖥️" },
        { label: "API Gateway", detail: "Node.js/Express backend that proxies the ML backend, aggregates news from 10+ sources, and manages WebSocket prices", icon: "🔌" },
        { label: "ML Backend", detail: "FastAPI (Python) serving predictions, running SHAP analysis, and generating AI-powered plain-English explanations", icon: "🧠" },
        { label: "Database", detail: "MongoDB Atlas for all persistent data including predictions, sentiment, features, and explanations across 9+ collections", icon: "🗄️" },
        { label: "Cache", detail: "Redis for prediction caching (60s TTL), rate limiting (sliding window), and holiday data (1yr TTL)", icon: "⚡" },
        { label: "Automation", detail: "GitHub Actions runs the full pipeline every weeknight at 10:15 PM UTC, completely autonomous", icon: "🔄" },
      ],
      howItWorks: [
        { title: "Gather the News", description: "The sentiment cron scans 100 stocks across Finviz, Yahoo RSS, Reddit, Finnhub, FMP, SEC filings, and Seeking Alpha. Each headline is scored by FinBERT, RoBERTa, and VADER, then blended into one composite sentiment score per stock." },
        { title: "Crunch the Numbers", description: "The training pipeline fetches OHLCV prices from Yahoo Finance, insider trades from Finnhub, and macro indicators from FRED. It engineers 77 features per stock (price returns, volatility, RSI, sentiment, insider activity, earnings, fundamentals, and short interest) then trains one LightGBM model per horizon." },
        { title: "Make Predictions", description: "The pipeline loads freshly trained models and runs them on all 100 stocks in batches of 10. Each stock gets a predicted return, predicted price, confidence score, and trade recommendation. A verification step checks 8 canary tickers to ensure predictions are fresh." },
        { title: "Explain Why", description: "SHAP analysis decomposes each prediction into 'which features pushed the price up vs down.' Then an LLM reads all the data (predictions, SHAP values, sentiment, news, macro indicators, insider trades) and writes a plain-English briefing for each stock." },
        { title: "Check Our Work", description: "The evaluation script compares the last 60 days of predictions to actual prices. The drift monitor checks if predictions are drifting or features losing power. A quality gate enforces ≥80% ticker coverage and ≤20% data failure rate to prevent silent degradation." },
      ],
      challenges: [
        "Rate-limiting across 10+ APIs with different quotas. Built retry logic with exponential backoff, jitter, and fallback chains for each provider",
        "AI explanation quota management: implemented a multi-provider fallback chain with per-model rate tracking and automatic failover to maximize free-tier API usage",
        "Ensuring pipeline reliability by adding quality gates that fail the job if <80% of tickers are predicted or >20% data fetches fail, preventing silent degradation",
        "Real-time price streaming via Finnhub WebSocket with in-memory price cache (60s TTL), volume tracking, and automatic reconnection on disconnect",
      ],
      results:
        "Fully automated daily pipeline running in production with zero manual intervention. 100 S&P stocks predicted across 3 horizons with SHAP explainability and AI-generated briefings. Integrates 15+ external APIs, 9+ MongoDB collections, and serves real-time data through WebSocket streaming. Model evaluation and drift monitoring track accuracy over time.",
    },
  },
  {
    slug: "expensevision",
    title: "ExpenseVision",
    tagline:
      "AI-powered expense tracker with receipt scanning and spending insights",
    featured: false,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025",
    description:
      "A full-stack expense management app that lets you snap or upload a receipt, automatically reads it with OCR, extracts the amount and vendor using AI, and categorizes it with a classifier that learns from your habits. Interactive Chart.js dashboards break down spending by category, month, and day. An AI coach gives personalized tips on your budget.",
    highlights: [
      "Dual OCR pipeline: Veryfi cloud API for production speed, Tesseract local fallback so receipt scanning always works offline",
      "AI-powered receipt parsing via DeepSeek R1 extracts amount, vendor, date, and category from raw OCR text",
      "ML keyword classifier trained on your data that gets smarter the more you use it",
      "AI spending insights: a DeepSeek-powered finance coach analyzes your transactions and gives actionable advice",
      "Interactive Chart.js dashboards: category breakdown, monthly trends, and daily spending patterns",
      "Background job + polling architecture to handle 60-90s AI response times within Render's 30s proxy timeout",
    ],
    tech: [
      "Flask",
      "Python",
      "JavaScript",
      "SQLite",
      "PostgreSQL",
      "Chart.js",
      "Tesseract OCR",
      "Veryfi API",
      "DeepSeek R1",
    ],
    image: "/expensevision_img/expensevision.png",
    gallery: [
      { src: "/expensevision_img/expensevision.png", alt: "ExpenseVision Dashboard overview with AI spending insights and charts" },
      { src: "/expensevision_img/expenses_page.png", alt: "Expenses list with filters and search" },
      { src: "/expensevision_img/add_expenses_page.png", alt: "Add expense form with auto-categorization" },
      { src: "/expensevision_img/scan_receipt_page.png", alt: "Receipt scanning with OCR and AI parsing" },
    ],
    liveUrl: "https://expensevision.tech",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
    caseStudy: {
      problem:
        "Manual expense tracking is tedious and error-prone. Receipt data is unstructured text that's difficult to parse reliably. Users need automated extraction and intelligent categorization, but most tools are either too complex or too expensive.",
      approach:
        "Built a dual OCR pipeline (Veryfi cloud + Tesseract local) with AI-powered parsing via DeepSeek R1. Added an ML keyword classifier that learns from user behavior to auto-categorize future expenses. Designed a background job architecture to handle long AI response times within hosting constraints.",
      architecture:
        "Flask monolith serving a responsive vanilla JS frontend. Dual-database support with SQLite for local development and PostgreSQL (Supabase) for production. The AI layer uses DeepSeek R1 via OpenRouter for both receipt parsing and spending insights, with a background threading pattern to handle 60-90s response times within Render's 30s proxy timeout.",
      architectureCards: [
        { label: "Backend", detail: "Flask 3.0 with Gunicorn handling auth, expense CRUD, OCR processing, AI integration, and CSV export", icon: "🐍" },
        { label: "Database", detail: "SQLite (local) / PostgreSQL via Supabase (production) for users, expenses, categories, and AI insights tables", icon: "🗄️" },
        { label: "OCR Engine", detail: "Dual pipeline with Veryfi cloud API for speed and Tesseract local fallback for offline reliability", icon: "📷" },
        { label: "AI Layer", detail: "DeepSeek R1 via OpenRouter, parsing receipt text into structured JSON and generating personalized spending insights", icon: "🧠" },
        { label: "ML Classifier", detail: "Keyword-based auto-categorizer that trains on your data and learns new category associations from every expense you add", icon: "🏷️" },
        { label: "Analytics", detail: "Chart.js 4.x dashboards with interactive doughnut, bar, and line charts for category, monthly, and daily spending", icon: "📊" },
      ],
      howItWorks: [
        { title: "Snap or Upload", description: "Drag-and-drop or click to upload a receipt image. The file is sent to the OCR engine (Veryfi cloud API in production, Tesseract locally) which extracts raw text from the image." },
        { title: "AI Parses the Receipt", description: "The raw OCR text is sent to DeepSeek R1 with a structured prompt asking it to extract amount, vendor, date, category, and description as JSON. If AI is unavailable, regex patterns handle the most common receipt formats as a fallback." },
        { title: "Smart Categorization", description: "A keyword-based ML classifier predicts the expense category based on vendor name and description. It trains on every expense you add, and the more you use it, the smarter it gets at categorizing your spending." },
        { title: "AI Spending Coach", description: "On demand, the system sends your last 200 expenses and category totals to DeepSeek R1, which acts as a friendly finance coach: summarizing what stands out, giving actionable tips, and encouraging progress. Uses background threading with frontend polling to handle the 60-90s response time." },
      ],
      challenges: [
        "Render free tier has a ~30s proxy timeout, but AI spending insights can take 60-90+ seconds. Solved with background job + polling architecture (POST starts thread, GET polls every 4s)",
        "OCR accuracy varies dramatically with image quality. Dual pipeline (Veryfi cloud + Tesseract local) provides reliable fallback with AI-powered parsing on top",
        "AI rate limits on free tier (20 req/min, 50 req/day). Implemented retry with 60s backoff on 429 responses and response caching in database",
        "Database portability: built a SQL abstraction layer that converts ? placeholders to %s for PostgreSQL, enabling seamless SQLite/PostgreSQL switching",
      ],
      results:
        "Full-featured expense tracker deployed on Render with AI-powered receipt scanning, auto-categorization, personalized spending insights, and interactive Chart.js analytics dashboards. Supports drag-and-drop upload, CSV export, date/category filters, dark/light theme, and fully responsive mobile layout.",
    },
  },
  {
    slug: "verdict-games",
    title: "Verdict Games",
    tagline:
      "A premium game reviews and discovery platform with data from 5+ APIs and 293+ games",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – Present",
    description:
      "A full-stack game reviews platform that aggregates data from RAWG, Steam, IGDB, CheapShark, and Wikipedia to build rich game profiles with 1000+ games. Features auto-discovery cron jobs, multi-source scoring with verdict badges, community reviews, curated lists, live player counts, price tracking, and a pixel-art gaming aesthetic with dark/light mode.",
    highlights: [
      "1000+ games ingested from RAWG and enriched with Steam reviews, IGDB ratings, CheapShark deals, and Wikipedia summaries",
      "Multi-source scoring algorithm that picks the best available score from Steam, IGDB, Metacritic, or RAWG and assigns a verdict label",
      "Auto-discovery cron jobs that find trending, new, and top-rated games from RAWG and IGDB PopScore signals",
      "Rich game pages with trailer embeds, screenshot galleries, Steam achievements, news feeds, pros/cons, and live player counts",
      "Community reviews with helpful voting, curated game lists, and full-text search with on-demand ingestion",
      "Pixel-art gaming aesthetic with Framer Motion scroll-reveal animations, hero carousel, and responsive mobile-first design",
      "1000+ games across PC and Android with live player counts, price tracking, and daily automated discovery",
    ],
    metrics: [
      { icon: <Gamepad2 size={14} />, label: "Games", value: "1000+" },
      { icon: <Database size={14} />, label: "APIs", value: "5" },
      { icon: <Globe size={14} />, label: "Pages", value: "7" },
      { icon: <Calendar size={14} />, label: "Cron", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "Scoring", value: "Multi-src" },
    ],
    tech: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Supabase",
      "PostgreSQL",
      "React Query",
      "Vercel",
    ],
    image: "/verdict_games_img/verdict_homepage.png",
    gallery: [
      { src: "/verdict_games_img/verdict_homepage.png", alt: "Verdict Games homepage with hero carousel, trending games, and new releases" },
      { src: "/verdict_games_img/game_page.png", alt: "Game detail page with verdict score, pros and cons, and pricing sidebar" },
      { src: "/verdict_games_img/game_page_mediasection.png", alt: "Game page media section with trailer, screenshot gallery, and achievements" },
      { src: "/verdict_games_img/game_page_newssection.png", alt: "Game page news section with latest Steam news and community reviews" },
    ],
    liveUrl: "https://www.verdict.games",
    githubUrl: "https://github.com/Yogesh-VG0/VerdictGames",
    caseStudy: {
      problem:
        "Finding honest, data-driven game reviews in one place is hard. Most review sites rely on a single score source or subjective editorial takes. Players have to visit Steam, IGDB, Metacritic, and deal sites separately just to decide if a game is worth buying.",
      approach:
        "Built a multi-source ingestion pipeline that pulls game data from RAWG (primary metadata), then enriches it in parallel with Steam reviews, IGDB ratings and trailers, CheapShark price deals, and Wikipedia descriptions. A scoring algorithm picks the best available score and auto-generates verdict badges, summaries, pros, and cons. Cron jobs keep the database fresh by discovering new games and updating trending flags daily.",
      architecture:
        "Next.js App Router handles both the frontend and API routes. Supabase (PostgreSQL) stores all game data with Row Level Security. The ingestion pipeline runs a 13-step process: search RAWG, fetch full details, fire all enrichment calls in parallel (Steam, IGDB, CheapShark, Wikipedia), compute scores, generate verdicts, and upsert into the database. React Query caches everything on the client side.",
      architectureCards: [
        { label: "Frontend", detail: "Next.js 16 + React 19 with Framer Motion animations, hero carousel, and pixel-art gaming theme", icon: "🖥️" },
        { label: "API Layer", detail: "Next.js Route Handlers serving game data, search, reviews, lists, and ingestion endpoints", icon: "🔌" },
        { label: "Database", detail: "Supabase PostgreSQL with 6 tables, RLS policies, triggers, and 20+ indexes for fast queries", icon: "🗄️" },
        { label: "Ingestion", detail: "13-step pipeline that searches RAWG, enriches from 4 sources in parallel, computes scores, and upserts", icon: "🔄" },
        { label: "External APIs", detail: "RAWG, Steam, IGDB/Twitch, CheapShark, and Wikipedia REST APIs with caching and rate-limit handling", icon: "🌐" },
        { label: "Cron Jobs", detail: "Auto-discover games from 5 RAWG categories and refresh trending flags using IGDB PopScore signals", icon: "⏰" },
      ],
      howItWorks: [
        { title: "Search and Match", description: "The pipeline searches RAWG for the best match, scores results by release date, rating, and review count, then generates a URL slug and checks for duplicates in the database." },
        { title: "Enrich from 5 Sources", description: "In parallel, the pipeline fetches Steam review summaries and player counts, IGDB ratings and trailers, CheapShark price deals, and Wikipedia descriptions. Each source is optional and fails gracefully." },
        { title: "Score and Verdict", description: "A priority chain picks the best score: Steam review percentage, then IGDB aggregated rating, then Metacritic, then RAWG user rating. The score maps to a verdict label (Must Play, Worth It, Mixed, or Skip) and an auto-generated summary." },
        { title: "Generate Pros and Cons", description: "The system reads signals like Steam sentiment, player counts, IGDB critic scores, and genre tags to auto-generate a pros and cons list for each game. Negative signals like microtransactions or mixed reviews get flagged too." },
        { title: "Keep It Fresh", description: "Daily cron jobs discover new games from 5 RAWG categories (trending, new releases, upcoming, top-rated, popular). A separate cron refreshes trending and featured flags using a weighted IGDB PopScore composite." },
      ],
      challenges: [
        "Coordinating 5 external APIs with different auth methods (API keys, OAuth, no auth) and rate limits. Built per-source caching and graceful fallbacks so the pipeline never fails completely",
        "On-demand ingestion during search: when a user searches for a game that is not in the database, the search endpoint triggers real-time ingestion from external sources before returning results",
        "Computing a fair score from wildly different rating systems (Steam percentage, IGDB 0-100, Metacritic 0-100, RAWG 0-5). Built a priority chain with normalization so scores are comparable",
        "Keeping 1000+ game profiles current with daily cron jobs that discover new games and refresh trending flags without hitting API rate limits",
      ],
      results:
        "Production game reviews platform at verdict.games with 1000+ games, data from 5 external APIs, auto-discovery cron jobs, multi-source scoring, community reviews, curated lists, and a responsive pixel-art design. Deployed on Vercel with Supabase backend and daily automated updates.",
    },
  },
];
