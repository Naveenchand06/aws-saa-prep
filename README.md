# AWS Certs Prep — SAA-C03 Practice Exams

A lightweight, fully local practice-exam app for the **AWS Solutions Architect – Associate (SAA-C03)** exam. No dependencies, no build step, no internet required.

## Run it

Option 1 — just open the file:

```
open index.html
```

Option 2 — serve it (nicer URLs, same thing):

```
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Features

- Choose session length: 5, 10, 15, 25, or all questions
- Questions and option order are randomized every session, like the real exam
- Single-answer and "Choose TWO" multiple-response questions — multi questions are clearly flagged with an orange **Multiple response** badge and checkbox-style options
- Timer and progress bar while you practice
- Results screen with:
  - Overall score against the real exam pass mark (~72%)
  - Three-way grading: **Correct**, **Partially correct** (some but not all right answers on a multiple-response question), and **Incorrect** — with missed correct answers called out. Note: the real exam gives no credit for partial answers; the % score here counts fully correct answers only.
  - Per-domain breakdown (the four SAA-C03 exam domains)
  - Full answer review — every option annotated with a one-liner on why it's right or wrong
- Last 5 session scores kept in browser localStorage

## Question bank

All questions live in [questions.js](questions.js) — currently 60 questions covering the four SAA-C03 domains, including newer exam-emphasis topics (Transit Gateway, PrivateLink, EventBridge, Step Functions, Aurora Global Database / Serverless v2, ECS Fargate, Storage Gateway, DataSync, Snowball, DMS/SCT, Athena, Macie, Object Lock, permissions boundaries):

1. Design Secure Architectures (~30% of the real exam)
2. Design Resilient Architectures (~26%)
3. Design High-Performing Architectures (~24%)
4. Design Cost-Optimized Architectures (~20%)

### Adding questions

Append an object to `QUESTION_BANK` in `questions.js`:

```js
{
  domain: "Design Secure Architectures",   // one of the four domains above
  pick: 1,                                  // 1 = single answer, 2 = "Choose TWO"
  question: "Your question text?",
  options: [
    { text: "Right answer", correct: true,  why: "One-liner why it's correct." },
    { text: "Wrong answer", correct: false, why: "One-liner why it's wrong." },
    // ... 4-5 options total
  ],
}
```

The app picks up new questions automatically — no other changes needed.
