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
