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
    cardTagline:
      "AI stock platform that predicts S&P 100 moves and explains them daily",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – 2026",
    description:
      "An end-to-end stock prediction system that runs a fully automated daily pipeline: fetching market data, training a LightGBM + LSTM hybrid, generating price forecasts for 1-day, 7-day, and 30-day horizons, and writing plain-English AI explanations via Groq with Gemini fallback. Everything is served through a real-time Next.js dashboard with live prices, TradingView charts, technical indicators, Sankey financial flow diagrams, and multi-source market news.",
    cardDescription:
      "Forecasts 100 S&P stocks across 3 time horizons with a LightGBM + LSTM pipeline, explains each prediction with AI, and shows everything in a live dashboard.",
    highlights: [
      "Automated daily pipeline via GitHub Actions: data ingestion, model training, predictions, and AI explanations with zero manual intervention",
      "113 engineered features per stock including price technicals, macro indicators, insider trades, short interest, earnings, fundamentals, and multi-source sentiment",
      "Sentiment analysis from 10+ news and social sources scored by FinBERT, RoBERTa, and VADER NLP models",
      "SHAP-based explainability decomposes each prediction, then Groq AI with Gemini fallback writes a stock-specific plain-English briefing",
      "Live prices, TradingView charts, technical indicators, and interactive Sankey financial flow charts provide deep context around each prediction",
      "Latest production backtests reached +13.71% on the 30-day horizon and +8.05% on the 7-day horizon, with drift monitoring tracking reliability over time",
    ],
    cardHighlights: [
      "Automated daily pipeline for data, training, predictions, and AI explanations",
      "Covers 100 S&P stocks across 1-day, 7-day, and 30-day forecasts",
      "Uses 113 features per stock plus sentiment from 10+ news and social sources",
      "Live dashboard includes charts, SHAP breakdowns, news, and Sankey flows",
    ],
    metrics: [
      { icon: <BarChart3 size={14} />, label: "Stocks", value: "100" },
      { icon: <Layers size={14} />, label: "Horizons", value: "3" },
      { icon: <Cpu size={14} />, label: "Features", value: "113" },
      { icon: <Calendar size={14} />, label: "Pipeline", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "30d Return", value: "+13.71%" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "LightGBM",
      "LSTM",
      "SHAP",
      "Groq",
      "MongoDB",
      "Redis",
      "Tailwind",
      "GitHub Actions",
    ],
    image: "/stock_predict_img/landing_page.png",
    gallery: [
      { src: "/stock_predict_img/landing_page.png", alt: "StockPredict AI landing page with feature overview" },
      { src: "/stock_predict_img/stockpredict-ai.png", alt: "StockPredict AI Market Dashboard with top gainers, losers, and market overview" },
      { src: "/stock_predict_img/stock-details_page.png", alt: "Stock detail page with TradingView chart and AI prediction" },
      { src: "/stock_predict_img/stock-details_page2.png", alt: "Stock detail page with AI explanation and SHAP analysis" },
      { src: "/stock_predict_img/financial_flow_page.png", alt: "Financial flow Sankey diagram showing revenue breakdown" },
      { src: "/stock_predict_img/news_page.png", alt: "Unified news feed with multi-source financial news" },
      { src: "/stock_predict_img/watchlist_page.png", alt: "Watchlist with real-time price alerts" },
      { src: "/stock_predict_img/fundamentals_page.png", alt: "Stock fundamentals and financial data" },
      { src: "/stock_predict_img/tradinghours_popup.png", alt: "Trading hours popup with market session info" },
    ],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
    caseStudy: {
      problem:
        "Individual investors lack access to institutional-grade stock analysis tools combining ML predictions with explainable AI. Existing retail platforms offer charts but no predictive intelligence or transparent reasoning behind forecasts.",
      approach:
        "Built an end-to-end automated pipeline: daily data ingestion from 10+ sources, LightGBM + LSTM hybrid training across 100 tickers, cross-sectional ranking, SHAP-based prediction decomposition, and Groq-powered plain-English explanations with Gemini fallback. Zero manual intervention required.",
      architecture:
        "The system uses three distinct AI/ML layers working together, each with a different role. The Predictor (LightGBM + LSTM hybrid) is the only component that actually predicts prices, using 113 numeric features. The Sentiment Scorers (FinBERT, RoBERTa, VADER) read news from 10+ sources and produce input features. The Explainer (SHAP + Groq/Gemini) decomposes each prediction and translates it into plain English.",
      architectureCards: [
        { label: "Frontend", detail: "Next.js 15 + React 18 with TradingView charts, ECharts Sankey diagrams, and Framer Motion", icon: "🖥️" },
        { label: "API Gateway", detail: "Node.js/Express backend that proxies the ML backend, aggregates news from 10+ sources, and serves live prices from a server-side Finnhub WebSocket cache", icon: "🔌" },
        { label: "ML Backend", detail: "FastAPI (Python) serving predictions, running SHAP analysis, and generating AI-powered plain-English explanations with Groq primary and Gemini fallback", icon: "🧠" },
        { label: "Database", detail: "MongoDB Atlas for all persistent data including predictions, sentiment, features, explanations, and market context across 12+ collections", icon: "🗄️" },
        { label: "Cache", detail: "Redis for prediction caching (60s TTL), rate limiting (sliding window), and holiday data (1yr TTL)", icon: "⚡" },
        { label: "Automation", detail: "GitHub Actions runs the full pipeline every weeknight at 10:15 PM UTC, with quality gates, backtests, drift monitoring, and artifact uploads", icon: "🔄" },
      ],
      howItWorks: [
        { title: "Gather the News", description: "The sentiment cron scans 100 stocks across Finviz, Yahoo RSS, Reddit, Finnhub, FMP, SEC filings, and Seeking Alpha. Each headline is scored by FinBERT, RoBERTa, and VADER, then blended into one composite sentiment score per stock." },
        { title: "Crunch the Numbers", description: "The training pipeline fetches OHLCV prices from Yahoo Finance, insider trades from Finnhub, and macro indicators from FRED. It engineers 113 features per stock and trains one LightGBM model per horizon while an LSTM extractor supplies temporal embeddings." },
        { title: "Make Predictions", description: "The pipeline loads freshly trained models and runs them on all 100 stocks in batches of 10. Cross-sectional ranking boosts the top quintile and suppresses the bottom quintile. Each stock gets a predicted return, predicted price, confidence score, and trade recommendation." },
        { title: "Explain Why", description: "SHAP analysis decomposes each prediction into which features pushed the price up versus down. Then Groq AI, with Gemini fallback, reads predictions, SHAP values, sentiment, news, macro indicators, and insider activity to write a plain-English briefing for each stock." },
        { title: "Check Our Work", description: "Stored evaluation compares recent predictions to actual prices. Drift monitoring tracks distribution shifts, calibration, and feature decay. A quality gate enforces ≥80% ticker coverage and ≤20% data failure rate to prevent silent degradation." },
      ],
      challenges: [
        "Rate-limiting across 10+ APIs with different quotas. Built retry logic with exponential backoff, jitter, and fallback chains for each provider",
        "AI explanation quota management: built a Groq-primary, Gemini-fallback chain with per-model rate tracking and graceful stopping on quota exhaustion",
        "Ensuring pipeline reliability by adding quality gates that fail the job if <80% of tickers are predicted or >20% data fetches fail, preventing silent degradation",
        "Live price delivery uses a server-side Finnhub WebSocket plus 5-second frontend polling, with in-memory caches and automatic reconnection to keep the UI responsive",
      ],
      results:
        "Fully automated daily pipeline running in production with zero manual intervention. S&P 100 stocks are predicted across 3 horizons with 113-feature modeling, SHAP explainability, Groq/Gemini briefings, and a live dashboard for charts, news, and Sankey financial flows. Latest market-neutral backtests reached +13.71% over 30 days and +8.05% over 7 days while evaluation and drift monitoring track reliability over time.",
    },
  },
  {
    slug: "expensevision",
    title: "ExpenseVision",
    tagline:
      "AI-powered expense tracker with receipt scanning, smart budgets, and spending insights. Installable as a mobile app.",
    cardTagline:
      "AI expense tracker you can install like a phone app. Scan receipts, set budgets, and get spending tips.",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – 2026",
    description:
      "A personal finance app you can install on your phone or desktop like a native app. Snap a photo of any receipt and AI automatically reads the amount, vendor, date, and category. Set monthly budgets per category and get notified when you're close to your limit. Import bank statements via CSV. Ask the AI for personalized spending tips based on your real data. Built with Next.js, React, and Supabase with sign-in via email, Google, or GitHub.",
    cardDescription:
      "Snap a receipt, let AI read it, track your spending, set budgets with alerts, import bank data, and get personalized AI tips. All in an app you can install on your phone.",
    highlights: [
      "AI receipt scanner tries 3 providers automatically (Veryfi, Google Gemini, OpenRouter). If one fails, the next picks up so scanning always works",
      "AI spending coach analyzes your last 90 days and gives you a summary, savings tips, budget warnings, and spending trends",
      "Set monthly budgets per category and get notified at 80% and again when you go over, so you never overspend by surprise",
      "Import bank statements via CSV with automatic column detection, date/amount parsing, and duplicate warnings before import",
      "Installable as a Progressive Web App that works like a native app on your phone with push notifications and the ability to share receipts directly to the app",
      "Secured with 3 layers of protection: route guards, API authentication, and database-level access rules on every table, plus rate limiting on all endpoints",
    ],
    cardHighlights: [
      "Snap a receipt and 3 AI providers work together to read it automatically",
      "Set budgets per category and get alerts before you overspend",
      "AI analyzes 90 days of spending and gives personalized tips",
      "Install it like a phone app with push notifications and receipt sharing",
    ],
    metrics: [
      { icon: <Layers size={14} />, label: "AI Providers", value: "3" },
      { icon: <Database size={14} />, label: "Tables", value: "6" },
      { icon: <Cpu size={14} />, label: "API Routes", value: "17" },
      { icon: <Sparkles size={14} />, label: "AI Models", value: "5+" },
      { icon: <Globe size={14} />, label: "PWA", value: "Installable" },
    ],
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS v4",
      "Veryfi API",
      "Google Gemini",
      "OpenRouter",
      "Upstash Redis",
      "Zod",
      "Recharts",
      "Render",
    ],
    image: "/expensevision_img/landing_page.png",
    gallery: [
      { src: "/expensevision_img/landing_page.png", alt: "ExpenseVision landing page" },
      { src: "/expensevision_img/signup-login.png", alt: "Sign up and login with email, Google, or GitHub" },
      { src: "/expensevision_img/dashboard_page.png", alt: "Dashboard with spending charts and recent activity" },
      { src: "/expensevision_img/expenses_page.png", alt: "Expense list with filters and search" },
      { src: "/expensevision_img/budgets_page.png", alt: "Budget progress bars with spending alerts" },
      { src: "/expensevision_img/recipts_page.png", alt: "Receipt scanner with AI-extracted details" },
      { src: "/expensevision_img/ai_insights_page.png", alt: "AI spending insights and savings tips" },
    ],
    liveUrl: "https://expensevision.tech",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
    caseStudy: {
      problem:
        "Tracking expenses manually is tedious and people forget. Receipts pile up. Most expense apps either can't read receipts well, don't warn you about budgets, or cost money. People need something simple that does the work for them.",
      approach:
        "Built a full-stack web app with Next.js and Supabase that handles everything: user accounts, expense storage, receipt file uploads, and AI processing. Designed the receipt scanner to try 3 different AI providers in sequence so it works reliably. Made it installable as a phone app so users can access it from their home screen and get push notifications.",
      architecture:
        "Next.js handles both the frontend and 17 backend API endpoints. Supabase provides the database (PostgreSQL), user authentication (email + Google + GitHub), and private file storage for receipts. The receipt scanner tries Veryfi first, then Google Gemini, then OpenRouter as a fallback. AI insights use Gemini to analyze spending patterns. Upstash Redis rate-limits every endpoint to prevent abuse. Deployed on Render.",
      architectureCards: [
        { label: "Frontend", detail: "Next.js 15 + React 19 with server-side rendering for fast page loads and interactive dashboards with Recharts", icon: "🖥️" },
        { label: "Backend", detail: "17 API endpoints handling expenses, budgets, receipt scanning, AI insights, notifications, CSV import, and user accounts", icon: "🔌" },
        { label: "Database", detail: "Supabase PostgreSQL with 6 tables, row-level security on every table, and 7 schema migrations", icon: "🗄️" },
        { label: "Receipt AI", detail: "3 providers in sequence: Veryfi for speed, Google Gemini for accuracy, and OpenRouter as a free fallback. Scanning always works.", icon: "📷" },
        { label: "Spending AI", detail: "Google Gemini analyzes 90 days of your spending and returns personalized tips, budget warnings, and trend insights", icon: "🧠" },
        { label: "Installable App", detail: "Progressive Web App you can install on your phone with push notifications, receipt sharing from other apps, and home screen access", icon: "📱" },
      ],
      howItWorks: [
        { title: "Snap a Receipt", description: "Take a photo, pick a file, or share an image from another app. The image is compressed and validated before uploading to make sure it's a real image file." },
        { title: "AI Reads It", description: "The server sends the receipt through up to 3 AI providers. If the first one fails or gives a bad result, the next one tries automatically. You get the amount, vendor, date, and category extracted." },
        { title: "Review and Save", description: "The AI-extracted details are pre-filled into an expense form. You can review, edit if needed, and save. The receipt stays attached to the expense for reference." },
        { title: "Budget Alerts", description: "Set a monthly spending limit for any category. When you hit 80%, you get a warning. When you go over, you get an alert. Push notifications keep you informed even when you're not in the app." },
        { title: "AI Spending Tips", description: "Ask the AI to analyze your spending. It looks at your last 90 days, finds patterns, and gives you a summary, savings tips, and warnings about categories where you're overspending." },
      ],
      challenges: [
        "Making receipt scanning reliable: each AI provider has different response formats and error modes, so each one needed its own parsing logic with graceful fallthrough to the next provider",
        "Handling diverse bank CSV formats: built auto-detection for column names, support for multiple date and currency formats, and a scoring system to flag likely duplicate entries before import",
        "Securing user data with 3 independent layers: route guards redirect unauthenticated users, every API endpoint verifies the session, and the database itself rejects unauthorized queries",
        "Rate limiting every endpoint: 8 different rate limit tiers prevent abuse across AI calls, data mutations, imports, and account actions, with graceful fallback if the rate limiter is unavailable",
      ],
      results:
        "Live at expensevision.tech. A full-featured personal finance app with AI receipt scanning across 3 providers, monthly budgets with push alerts, CSV bank import, AI spending insights, and installable PWA experience. Serves 17 API endpoints across 6 database tables with 3-layer security and rate limiting on every route.",
    },
  },
  {
    slug: "verdict-games",
    title: "Verdict Games",
    tagline:
      "A premium game reviews and discovery platform aggregating data from 7 APIs with 8000+ games",
    cardTagline:
      "Game discovery platform built from 7 APIs and 8000+ titles",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – 2026",
    description:
      "A full-stack game reviews platform that aggregates data from 7 external APIs (RAWG, Steam, IGDB, CheapShark, Wikipedia, HowLongToBeat, GX Corner) to build rich game profiles with 8000+ games. Features a 13-step ingestion pipeline, Heroku-scheduled discovery and re-enrichment jobs, Verdict Scoring v2 with community/critic/confidence blending, 22 editorial curated lists, compare and developer hub pages, user accounts with library tracking, and a pixel-art gaming aesthetic with dark/light mode.",
    cardDescription:
      "Combines reviews, ratings, prices, trailers, and discovery tools into one platform with rich game pages, curated lists, and daily refreshes.",
    highlights: [
      "8000+ games ingested via a 13-step pipeline from RAWG, enriched in parallel with Steam, IGDB, CheapShark, Wikipedia, and HowLongToBeat data",
      "Verdict Scoring v2: Wilson Lower Bound community score + normalized critic average, blended with confidence weighting for fair rankings",
      "Heroku-scheduled discovery, trending refresh, and re-enrichment jobs keep the catalog fresh using RAWG categories, IGDB PopScore, GX Top Liked, and freshness scoring",
      "Rich game pages with trailer embeds, screenshot galleries, Steam achievements, Steam player reviews, news feeds, pros/cons, live player counts, and price tracking",
      "Full user system: accounts, game library (wishlist/playing/completed), follows, community reviews with helpful voting, and curated lists",
      "Admin dashboard with game editor, review moderation, user management, audit logging, and one-click re-ingestion",
      "8 GX Corner feeds powering homepage sections: deals, free-to-play, PS Plus/Game Pass, release calendar, and gaming news",
    ],
    cardHighlights: [
      "Aggregates 8000+ games from 7 APIs into one searchable catalog",
      "Verdict Scoring v2 blends community and critic signals fairly",
      "Daily scheduled jobs keep games, trends, and curated lists fresh",
      "Includes trailers, screenshots, reviews, price tracking, and user libraries",
    ],
    metrics: [
      { icon: <Gamepad2 size={14} />, label: "Games", value: "8000+" },
      { icon: <Database size={14} />, label: "APIs", value: "7" },
      { icon: <Globe size={14} />, label: "Pages", value: "15+" },
      { icon: <Calendar size={14} />, label: "Cron", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "Scoring", value: "Multi-src" },
    ],
    tech: [
      "Next.js 16",
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
      { src: "/verdict_games_img/verdict_homepage.png", alt: "Verdict Games homepage with hero carousel and trending games" },
      { src: "/verdict_games_img/verdict_home_trendsection.png", alt: "Homepage trending section with game cards and scores" },
      { src: "/verdict_games_img/verdict_gamepage.png", alt: "Game detail page with verdict score, pros/cons, and media" },
      { src: "/verdict_games_img/verdict_gamepage_2.png", alt: "Game page with pricing, achievements, and Steam reviews" },
      { src: "/verdict_games_img/verdict_browse_page.png", alt: "Browse page with filters for platform, genre, and year" },
      { src: "/verdict_games_img/game_deals_page.png", alt: "Game Deals page with live discounts, store filters, and discounted game cards" },
      { src: "/verdict_games_img/free2play_page.png", alt: "Free to Play page highlighting free games with genre filters and browse shortcuts" },
      { src: "/verdict_games_img/verdict_explore_page.png", alt: "Explore page with curated RAWG lists and genre browser" },
      { src: "/verdict_games_img/verdict_reviews_page.png", alt: "Global reviews feed with community and Steam player reviews" },
      { src: "/verdict_games_img/verdict_lists.png", alt: "Curated game lists with editorial collections" },
      { src: "/verdict_games_img/verdict_calendar.png", alt: "Release calendar with upcoming game dates by platform" },
      { src: "/verdict_games_img/verdict_news_section.png", alt: "Gaming news section powered by GX Corner feeds" },
      { src: "/verdict_games_img/verdict_admin.png", alt: "Admin dashboard with game management and audit log" },
    ],
    liveUrl: "https://www.verdict.games",
    githubUrl: "https://github.com/Yogesh-VG0/VerdictGames",
    caseStudy: {
      problem:
        "Finding honest, data-driven game reviews in one place is hard. Most review sites rely on a single score source or subjective editorial takes. Players have to visit Steam, IGDB, Metacritic, and deal sites separately just to decide if a game is worth buying.",
      approach:
        "Built a 13-step multi-source ingestion pipeline that pulls game data from RAWG (primary metadata), then enriches it in parallel with Steam reviews and player counts, IGDB ratings and trailers, CheapShark price deals, Wikipedia descriptions, and HowLongToBeat playtime data. Verdict Scoring v2 blends a Wilson Lower Bound community score with a normalized critic average, weighted by confidence. GX Corner feeds power 8 homepage sections, while Heroku Scheduler keeps discovery, trending, re-enrichment, and editorial list seeding jobs running automatically.",
      architecture:
        "Next.js App Router handles the frontend and 30+ API routes. Supabase PostgreSQL stores data across 20+ tables with Row Level Security on every table, 20+ migrations, and 30+ indexes. The ingestion pipeline runs a 13-step process: search RAWG, fetch full details, fire all enrichment calls in parallel (Steam, IGDB, CheapShark, Wikipedia, HowLongToBeat), compute v2 scores, generate verdicts, upsert, and verify mobile store listings. Vercel serves the app while Heroku Scheduler runs recurring discovery, trending refresh, and re-enrichment jobs.",
      architectureCards: [
        { label: "Frontend", detail: "Next.js 16 + React 19 with Framer Motion animations, hero carousel, 11 homepage sections, and pixel-art gaming theme", icon: "🖥️" },
        { label: "API Layer", detail: "30+ Next.js Route Handlers serving games, search, reviews, lists, library, profiles, calendar, compare, and admin endpoints", icon: "🔌" },
        { label: "Database", detail: "Supabase PostgreSQL with 20+ tables, RLS on all tables, 20+ migrations, triggers, and 30+ indexes", icon: "🗄️" },
        { label: "Ingestion", detail: "13-step pipeline enriching from 7 sources in parallel, with Verdict Scoring v2 and mobile store verification", icon: "🔄" },
        { label: "External APIs", detail: "RAWG, Steam, IGDB/Twitch, CheapShark, Wikipedia, HowLongToBeat, and GX Corner (8 feeds) with caching", icon: "🌐" },
        { label: "Cron Jobs", detail: "Heroku Scheduler runs discover, refresh-trending, re-enrich, and curated-list seeding jobs while API cron routes remain fallback-only", icon: "⏰" },
      ],
      howItWorks: [
        { title: "Search and Match", description: "The pipeline searches RAWG for the best match, scores results by release date, rating, and review count, then generates a URL slug and checks for duplicates in the database." },
        { title: "Enrich from 7 Sources", description: "In parallel, the pipeline fetches Steam reviews and player counts, IGDB ratings and trailers, CheapShark price deals, Wikipedia descriptions, and HowLongToBeat playtime data. Each source is optional and fails gracefully." },
        { title: "Verdict Scoring v2", description: "Community score uses Wilson Lower Bound on Steam review counts. Critic score normalizes and averages IGDB + Metacritic ratings. A confidence level (0-1) based on review count and source count weights the final blended verdict score." },
        { title: "Generate Pros and Cons", description: "The system reads signals like Steam sentiment, player counts, IGDB critic scores, and genre tags to auto-generate a pros and cons list for each game. Negative signals like microtransactions or mixed reviews get flagged." },
        { title: "Keep It Fresh", description: "Heroku Scheduler runs discover, refresh-trending, and re-enrich jobs. Trending uses IGDB PopScore (weighted: visits 25%, want-to-play 30%, playing 30%, Steam peak 15%) + GX Top Liked + freshnessScore ranking, and a seed job keeps 22 editorial curated lists up to date." },
      ],
      challenges: [
        "Coordinating 7 external APIs with different auth methods (API keys, OAuth, no auth) and rate limits. Built per-source caching, retry logic, and graceful fallbacks so the pipeline never fails completely",
        "On-demand ingestion during search: a 3-layer search pipeline (DB → RAWG preview → background ingest) makes search feel instant and unlimited",
        "Verdict Scoring v2: computing a fair score from wildly different rating systems using Wilson Lower Bound for community scores and normalized critic averages, blended with a confidence weight",
        "Security: 20+ schema and RLS hardening migrations, auth_profile_id() optimization, and audit logging for every admin mutation",
      ],
      results:
        "Production game reviews platform at verdict.games with 8000+ games, data from 7 external APIs, 20+ database tables, 22 editorial curated lists, compare and developer hub pages, a full user and admin system, and automated discovery plus re-enrichment jobs. Deployed on Vercel with Supabase backend and Heroku Scheduler automation.",
    },
  },
];
