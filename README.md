# AWS Certs Prep — SAA-C03 Practice Exams

A lightweight, fully local practice-exam app for the **AWS Solutions Architect – Associate (SAA-C03)** exam. No dependencies, no build step, no internet required.

## Run it

Option 1 — just open the file:

```
open index.html
```

Option 2 — serve it (nicer URLs, same thing):

```
python3 -m http.server 8111
# then visit http://localhost:8111
```

## Pages

| Page | What it's for |
|---|---|
| [index.html](index.html) | The practice exam &mdash; topic filter, no-repeat question selection, partial-credit grading |
| [study-guide.html](study-guide.html) | Course triage: which lectures to Study / Skim / Drop |
| [cheatsheet.html](cheatsheet.html) | One-stop SAA-C03 cheatsheet for people who already use AWS &mdash; exam format and Oct 2026 scope changes, constraint words, keyword &rarr; service, scenario patterns, cost ladders, per-domain deep facts (S3, storage, DBs, compute, integration, networking, security, DR/migration, analytics, governance), numbers to memorise, traps, exam-day playbook. Searchable. |

## Features

- **Topic filter** — practice one or more of the 12 study topics (e.g. just Databases + VPC), or all topics. Question counts adapt to the filtered pool.
- **No repeats until you've seen everything** — each question has a stable id and the app tracks how many times you've been served it. New sessions draw from the least-seen questions first, so you cycle the entire (filtered) bank before anything comes back. A coverage bar on the start screen shows how much you've worked through, with a reset button.
- Choose session length: 5, 10, 15, 25, 50, or the whole pool
- Option order is randomized every session, like the real exam
- Single-answer and "Choose TWO" multiple-response questions — multi questions are clearly flagged with an orange **Multiple response** badge and checkbox-style options
- Timer and progress bar while you practice
- Results screen with:
  - Overall score against the real exam pass mark (~72%)
  - Three-way grading: **Correct**, **Partially correct** (some but not all right answers on a multiple-response question), and **Incorrect** — with missed correct answers called out. Note: the real exam gives no credit for partial answers; the % score here counts fully correct answers only.
  - Breakdown by exam domain **and by topic (weakest first)**, so you know exactly what to filter on next session
  - Full answer review — every option annotated with a one-liner on why it's right or wrong
- Last 5 session scores kept in browser localStorage

## Question bank

All questions live in [questions.js](questions.js) — currently **184 questions**, organized by topic and tagged with their exam domain.

**Topics** (the filter chips on the start screen):

| Topic | Qs | Topic | Qs |
|---|---|---|---|
| IAM & Identity | 14 | Storage | 19 |
| Data Protection & Encryption | 13 | Databases | 19 |
| Network & Edge Security | 14 | Decoupling & Integration | 16 |
| VPC & Hybrid Connectivity | 16 | Analytics & Data Pipelines | 12 |
| DNS, CDN & Global Traffic | 13 | Migration & Transfer | 12 |
| Compute, Containers & Scaling | 18 | Cost Management & Governance | 18 |

**Exam domains** (used for the results breakdown, weighted like the real exam):

1. Design Secure Architectures (~30% of the real exam)
2. Design Resilient Architectures (~26%)
3. Design High-Performing Architectures (~24%)
4. Design Cost-Optimized Architectures (~20%)

### Adding questions

Append an object to `QUESTION_BANK` in `questions.js`:

```js
{
  topic: "Databases",                      // one of the TOPICS listed at the top of the file
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

`pick` must equal the number of options marked `correct: true`. The app picks up new questions automatically — no other changes needed. Question ids are hashed from the question text, so editing a question's wording makes the app treat it as unseen.
