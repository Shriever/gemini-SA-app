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
```bash
**Intel Corporation (INTC) Q2 2025 Earnings Summary**

Intel (NASDAQ: INTC) reported its second-quarter 2025 financial results on July 24, 2025, exceeding revenue expectations and demonstrating underlying operational strength despite one-time charges. The company continued to advance its strategic priorities, focusing on organizational efficiency, foundry transformation, core x86 performance, and AI strategy.

**Q2 2025 Financial Highlights:**

*   **Revenue:** $12.9 billion, exceeding the high end of guidance and representing a surprise of $977.2 million above consensus estimates.
*   **Non-GAAP EPS:** -$0.10 per share. Excluding approximately $800 million in non-cash impairment and accelerated depreciation charges and $200 million in one-time period costs, non-GAAP EPS would have been $0.10, which was ahead of the company\'s Q2 guidance for breakeven.
*   **GAAP EPS:** -$0.67 per share.
*   **Non-GAAP Gross Margin:** 29.7%. Excluding the aforementioned one-time charges, non-GAAP gross margin would have been 37.5%, ahead of Q2 guidance of 36.5%.
*   **Operating Cash Flow:** $2.1 billion.
*   **Adjusted Free Cash Flow:** -$1.1 billion, reflecting gross CapEx of $4.5 billion and net CapEx of $3.1 billion.
*   **Cash and Short-term Investments:** $21.2 billion.

**Segment Performance (Q2 2025):**

*   **Intel Products:** Revenue of $11.8 billion, up slightly quarter-over-quarter and above expectations, driven by strength in client and server. Operating profit was $2.7 billion (23% of revenue), down sequentially due to period costs.
    *   **Client Computing Group (CCG):** Revenue up 3% quarter-over-quarter, benefiting from PC refresh demand, growth in AI PCs, and upside in edge deployments.
    *   **Data Center and AI (DCAI):** Revenue down 5% sequentially but above expectations, driven by variability in hyperscale demand partially offset by continued strength in host CPUs for AI servers and storage compute, and the ramp of Xeon 6 (Granite Rapids).
*   **Intel Foundry:** Revenue of $4.4 billion, down 5% sequentially but above expectations, driven by better-than-forecasted output of Intel 7 wafers and increased advanced packaging services. The segment reported an operating loss of $3.2 billion, primarily due to $800 million in impairment charges.
*   **All Other:** Revenue came in at $1.1 billion, up 12% sequentially, with an operating profit of $69 million from Mobileye, Altera, and IMS.

**Guidance & Outlook:**

*   **Q3 2025 Revenue:** Forecasted range of $12.6 billion to $13.6 billion (midpoint $13.1 billion), reflecting an expected below-seasonal second half of 2025 due to potential customer purchasing behavior to mitigate tariff uncertainty.
*   **Q3 2025 Non-GAAP Gross Margin:** Approximately 36%, primarily impacted by an increased mix of outsourced products (Lunar Lake ramp), the early ramp of Panther Lake, and increased costs associated with tariffs.
*   **Q3 2025 Non-GAAP EPS:** Breakeven.
*   **2025 OpEx:** On track for $17 billion.
*   **2026 OpEx Target:** $16 billion.
*   **2025 Gross Capital Investment:** Approximately $18 billion.
*   **2025 Net CapEx:** $8 billion to $11 billion.
*   **2026 CapEx:** Expected to be lower than $18 billion (but higher than $9 billion maintenance CapEx), driven by better utilization of construction in progress.

**Key Strategic Updates & Commentary (CEO Lip-Bu Tan):**

*   **Organization and Culture:** Completed reviews to reduce inefficiencies and redundancies, aiming for a streamlined organization. Reduced management layers by approximately 50% and on track for a year-end target of 75,000 employees. Return-to-office mandate begins September.
*   **Foundry Strategy:** Committed to transforming the manufacturing asset into a robust foundry business based on trust and consistent execution. Capacity growth will be based solely on volume commitments, deploying CapEx in lockstep with tangible milestones.
    *   Canceled manufacturing projects in Germany and Poland.
    *   Consolidating assembly/test operations from Costa Rica to Vietnam and Malaysia.
    *   Slowing construction pace in Ohio, maintaining flexibility to accelerate if needed.
    *   **Intel 18A:** Making steady progress on yield and performance targets, foundational for the next three generations of Intel client and server products. Panther Lake on track for launch this year.        
    *   **Intel 14A:** Focus on foundational building blocks, designed as a foundry node from the ground up with direct input from external and internal customers. CapEx will only be deployed when confident of attractive returns driven by both Intel products and meaningful external customer demand.
*   **Core x86 Franchise:**
    *   **Client:** Top priority is delivering the first Panther Lake SKU by year-end, followed by more SKUs in 1H 2026. Encouraged by progress on Nova Lake (due end of 2026).
    *   **Servers:** Granite Rapids ramping as planned. Focused on improving performance per watt for hyperscale workloads, correcting multi-threading capabilities, and bringing in new leadership for the data center business. Directing silicon and platform teams to define products with clean architectures, better cost structures, and simplified SKU stacks. Every major chip design requires CEO review and approval before tape-out.
*   **AI Strategy:** Evolving approach beyond traditional silicon and training-centric mindset to a cohesive silicon-systems-software stack and strategy. Concentrating efforts on inference and agentic AI. Aiming to become the compute platform of choice and work towards a full-stack AI solution.
*   **Balance Sheet:** Improving the balance sheet is paramount. Successfully monetized a portion of Mobileye ownership and on track to close the Altera transaction with Silver Lake. Last full fiscal year of positive adjusted free cash flow was 2021, which is unacceptable. Confidence in hitting OpEx targets and working to reduce capital spending in 2026.

**Market Conditions:**
While the economic landscape was uncertain in Q1, markets largely functioned normally in Q2. Strong demand in client was driven by the end of service for Windows 10 and aging COVID-era installed base, with AI PCs growing as a percentage of mix. In traditional servers, hyperscalers and enterprises continued CPU refreshes. The company noted that Q2 revenue likely benefited from customer purchasing behavior to mitigate tariff uncertainty.

**Post-Earnings Stock Movement:**
Following the earnings announcement, Intel\'s stock (INTC) sank 8.5%, as reported by The Associated Press, which noted the company's announcement of job cuts as part of its turnaround efforts.
```
