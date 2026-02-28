import {
  BarChart3,
  Cpu,
  Layers,
  Calendar,
  Sparkles,
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
    liveUrl: "https://expensevision-ip5u.onrender.com",
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
    slug: "weatherwise",
    title: "WeatherWise",
    tagline:
      "Command-line weather reports with styled HTML output (CS50P final project)",
    featured: false,
    status: "Open Source",
    statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    year: "2025",
    description:
      "A Python CLI app that fetches live weather data from OpenWeatherMap and generates a clean, styled HTML report you can open in any browser. Built as a CS50P final project with input validation and full test coverage.",
    highlights: [
      "Live weather data from OpenWeatherMap with city search and error handling",
      "Generates a styled HTML report you can save and share",
      "Input validation for graceful handling of typos and bad queries",
      "Fully tested with automated unit tests",
    ],
    tech: ["Python", "OpenWeatherMap API", "HTML/CSS", "unittest"],
    githubUrl: "https://github.com/Yogesh-VG0/weather-dashboard",
  },
];
