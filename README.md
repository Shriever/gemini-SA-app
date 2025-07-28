# Gemini-SA Prompt Generator

This project automates the process of gathering accurate and up-to-date earnings data from **Seeking Alpha** and uses that data to generate prompts for **Gemini**, enabling high-quality stock analysis.

---

## 🚀 Why This Project?

When using Gemini to analyze stocks, it would frequently pull outdated or incorrect financial data from the web — often quoting old earnings reports or mixing up press releases. This made the analysis unreliable and forced users to manually search, copy, and paste fresh data into the prompt.

That manual workflow was:
- Time-consuming
- Error-prone
- Inconsistent

---

## ✅ The Solution

This project solves the problem by:

1. **Using the Seeking Alpha API** to retrieve the latest:
   - Earnings data
   - Press releases
   - Call transcripts

2. **Generating a well-structured prompt** with this real-time data.

3. **Optionally sending the prompt to Gemini**, allowing the user to get a clean, accurate stock analysis response without relying on Gemini's unreliable web-sourced data.

---

## 🛠️ How to Use

### Environment Variables
Create a `.env` file in the root with the following:
```bash
RAPID_API_KEY=your_seeking_alpha_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Install dependencies
```bash
npm install
```
### Run tests
```bash
npm run test
```
### Run the program
```bash
npm run start
```
## 📁 Project Structure
```bash
/src
  /api            # Handles Seeking Alpha & Gemini API logic
  /utils          # Prompt generation, HTML-to-text, etc.
  index.ts        # Program entry point
/test
  /mocks          # Mock API responses
  *.test.ts       # Unit tests
/types          # Shared TypeScript interfaces
```
## Example Output
```bash
npm run start

> gemini-sa-app@1.0.0 start
> ts-node src/main.ts

[dotenv@17.2.0] injecting env (2) from .env (tip: ⚙️  enable debug logging with { debug: true })
        Welcome to the Seeking Alpha Gemini Assistant.
--------------------------------------------------------------

Choose output mode (1 = Gemini Prompt only, 2 = Gemini Prompt + Gemini Output): 2

        You Selected: Gemini Prompt + Gemini Output

Enter the stock symbol (e.g. AAPL): intc
        ✅ Earnings data retrieved.
        ✅ Call transcript retrieved.
        ✅ Press release retrieved.


--- Gemini Prompt ---


🟦 EP‑PEADS UNIVERSAL EXECUTION PROMPT

If the press release and transcript are provided, use them
as the primary source of truth for EPS, revenue, margins, and guidance.

If either is missing, search the web to fill in gaps:
- Confirmed beat/miss data (EPS, sales)
- Forward guidance (EPS and revenue)
- Analyst reactions (PT changes, upgrades)
- Macro or sector news influencing results

Use only official post‑earnings sources:
- Press release: PR Newswire / IR site
- Transcript: Motley Fool / Nasdaq
- Analyst data: regional analysts, MarketBeat

✅ Prefer press release > third‑party summaries
✅ Link all web‑sourced data directly
✅ If a PDF is needed, alert PM
✅ If no primary data, mark NA and proceed
⛔ Ignore pre‑earnings content

✅ Ticker:  INTC
✅ Earnings Date: 2025-07-24T20:01:00.000-04:00

Earnings data:
      announcementDate: 2025-07-24T20:01:00.000-04:00
      epsNormalizedActual: $-0.1
      epsGAAPActual: $-0.67
      revenueActual: $12859000000
      revenueSurprise: $977207630


Call Transcript: Intel Corporation (NASDAQ:INTC) Q2 2025 Earnings Conference Call July 24, 2025 5:00 PM ET Company Participants David A. Zinsner - Executive VP & CFO John William Pitzer - Corporate Vice President of Corporate Planning & Investor Relations Lip-Bu Tan - CEO & Director Conference Call Participants Aaron Christopher Rakers - Wells Fargo Securities, LLC, Research Division Benjamin Alexander Reitzes - Melius Research LLC Joseph Lawrence Moore - Morgan Stanley, Research Division Ross Clark Seymore - Deutsche Bank AG, Research Division Stacy Aaron Rasgon - Sanford C. Bernstein & Co., LLC., Research Division Timothy Michael Arcuri - UBS Investment Bank, Research Division Vivek Arya - BofA Securities, Research Division William Stein - Truist Securities, Inc., Research Division Operator Thank you for standing by, and welcome to Intel Corporation's Second Quarter 2025 Earnings Conference Call. [Operator Instructions] As a reminder, today's program is being recorded. And now I'd like to introduce your host for today's program, Mr. John Pitzer, Vice President, Investor Relations. Please go ahead, sir. John William Pitzer Thank you, Jonathan, and good afternoon to everyone joining us today. By now, you should have received a copy of the Q2 earnings release and earnings presentation, both of which are available...

Press Release: Stocks climbed to more records on Wall Street. The S&P 500 rose 0.4% Friday, setting an all-time high for the fifth time this week. The Dow Jones Industrial Average rose 0.5%, and the Nasdaq composite added 0.2% to its own record set the day before. Deckers helped lead the way with a gain of 11.3%. The company behind Ugg boots and Hoka shoes reported stronger profit and revenue than analysts expected. That helped offset a sharp drop for Intel (INTC), which sank 8.5% after saying it would cut thousands of jobs as it tries to turn around its struggling fortunes. On Friday: The S&P 500 rose 25.29 points, or 0.4%, to 6,388.64. The Dow Jones Industrial Average rose 208.01 points, or 0.5%, to 44,901.92. The Nasdaq composite rose 50.36 points, or 0.2%, to 21,108.32. The Russell 2000 index of smaller companies rose 8.94 points, or 0.4%, to 2,261.07. For the week: The S&P 500 is up 91.85 points, or 1.5%. The Dow is up 559.73 points, or 1.3%. The Nasdaq is up 212.66 points, or 1%. The Russell 2000 is up 21.06 points, or 0.9%. For the year: The S&P 500 is up 507.01 points, or 8.6%. The Dow is...


Proceed with sending to Gemini? (y, N): y

--- Gemini Output ---

Intel (INTC) Q2 2025 Earnings Summary

Intel reported its Q2 2025 earnings on July 24, 2025, with revenue above the high end of its guidance, driven by strong demand across client and data center segments. Headline profitability was impacted by one-time items and impairments, but underlying operating performance showed improvement.

Q2 2025 Financial Highlights (Actuals):

   Revenue: $12.859 billion
       Surprise: Beat by $977.2 million
   Non-GAAP EPS: $-0.10
   GAAP EPS: $-0.67
   Non-GAAP Gross Margin: 29.7%
       Excluding one-time charges and impairments, non-GAAP gross margin would have been 37.5%, and non-GAAP EPS would have been $0.10.
   Operating Cash Flow: $2.1 billion
   Gross CapEx: $4.5 billion
   Net CapEx: $3.1 billion
   Adjusted Free Cash Flow: Negative $1.1 billion

Source: Provided Earnings Data, Intel Q2 2025 Earnings Conference Call Transcript

Q3 2025 Guidance (Non-GAAP):

   Revenue: $12.6 billion to $13.6 billion
       Midpoint: $13.1 billion
   Gross Margin: Approximately 36%
   EPS: Breakeven
   Tax Rate: 12%

Source: Intel Q2 2025 Earnings Conference Call Transcript

Full-Year 2025 Guidance:

   Operating Expenses (OpEx): $17 billion (on track)
   Gross Capital Investment (CapEx): Approximately $18 billion
   Net CapEx: $8 billion to $11 billion

Full-Year 2026 Targets:

   Operating Expenses (OpEx): $16 billion (on track)
   CapEx: Expected to be lower than 2025 (meaningfully higher than $9 billion, but less than $18 billion) 

Source: Intel Q2 2025 Earnings Conference Call Transcript

Analyst Reactions:
   No specific analyst rating changes or price target adjustments were mentioned in the provided press release or transcript. (NA)

Macro or Sector News Influencing Results:

   Economic Landscape: While Q1 2025 saw increased economic uncertainty due to shifting trade policies, persistent inflation, and regulatory risks, Q2 markets "largely functioned normally," allowing fundamental demand drivers to manifest.
   Tariff Uncertainty: Q2 revenue likely benefited from customer purchasing behavior to mitigate tariff uncertainty, although the exact quantification remains difficult.
   PC Market: Continued solid demand in the client segment was driven by the end of service for Windows 10 and the aging COVID-era installed base. AI PCs are also growing as a percentage of the mix.
   Server Market: Hyperscalers and enterprises continued to refresh their CPU installed base to leverage newer, more performance-per-watt efficient products.
   Broader Market Performance: The broader Wall Street market saw significant gains, with the S&P 500, Dow Jones Industrial Average, and Nasdaq composite reaching new all-time highs during the week of Intel's earnings, reflecting a generally positive market sentiment.

Source: Intel Q2 2025 Earnings Conference Call Transcript, Press Release
```
