// AWS SAA practice exam — all state lives in this session object.
const state = {
  questions: [],   // selected questions for this session (with shuffled options)
  answers: [],     // per question: Set of selected option indexes
  current: 0,
  startedAt: null,
  timerId: null,
  count: 10,
};

const $ = (id) => document.getElementById(id);
const screens = { start: $("screen-start"), exam: $("screen-exam"), results: $("screen-results") };

function showScreen(name) {
  Object.entries(screens).forEach(([k, el]) => (el.hidden = k !== name));
  window.scrollTo(0, 0);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Start screen ----------
const COUNT_CHOICES = [5, 10, 15, 25, QUESTION_BANK.length];

function renderStart() {
  $("bank-size").textContent = `${QUESTION_BANK.length} questions`;
  const wrap = $("count-options");
  wrap.innerHTML = "";
  COUNT_CHOICES.forEach((n, i) => {
    const label = n === QUESTION_BANK.length ? `All (${n})` : String(n);
    const btn = document.createElement("button");
    btn.className = "count-btn" + (n === state.count ? " selected" : "");
    btn.textContent = label;
    btn.onclick = () => {
      state.count = n;
      wrap.querySelectorAll(".count-btn").forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
    };
    wrap.appendChild(btn);
  });
  renderHistory();
}

function renderHistory() {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("saa-history") || "[]");
  } catch (_) {}
  const card = $("history-card");
  if (!history.length) { card.hidden = true; return; }
  card.hidden = false;
  $("history-list").innerHTML = history
    .slice(-5)
    .reverse()
    .map((h) => {
      const pct = Math.round((h.score / h.total) * 100);
      const cls = pct >= 72 ? "pass" : "fail";
      return `<li><span class="hist-score ${cls}">${pct}%</span> ${h.score}/${h.total} correct <span class="muted">· ${h.date}</span></li>`;
    })
    .join("");
}

function saveHistory(score, total) {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem("saa-history") || "[]");
  } catch (_) {}
  history.push({ score, total, date: new Date().toLocaleString() });
  localStorage.setItem("saa-history", JSON.stringify(history.slice(-20)));
}

// ---------- Exam ----------
function startExam() {
  state.questions = shuffle(QUESTION_BANK)
    .slice(0, state.count)
    .map((q) => ({ ...q, options: shuffle(q.options) }));
  state.answers = state.questions.map(() => new Set());
  state.current = 0;
  state.startedAt = Date.now();
  state.timerId = setInterval(updateTimer, 1000);
  updateTimer();
  renderQuestion();
  showScreen("exam");
}

function updateTimer() {
  const secs = Math.floor((Date.now() - state.startedAt) / 1000);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  $("exam-timer").textContent = `${mm}:${ss}`;
}

function renderQuestion() {
  const q = state.questions[state.current];
  const selected = state.answers[state.current];
  const total = state.questions.length;

  $("exam-progress-text").textContent = `Question ${state.current + 1} of ${total}`;
  $("progress-fill").style.width = `${((state.current + 1) / total) * 100}%`;
  $("q-domain").textContent = q.domain;
  const typeTag = $("q-type");
  if (q.pick > 1) {
    typeTag.textContent = `Multiple response — choose ${q.pick === 2 ? "TWO" : q.pick}`;
    typeTag.className = "type-tag multi";
  } else {
    typeTag.textContent = "Single choice";
    typeTag.className = "type-tag";
  }
  $("q-text").textContent = q.question;
  $("q-hint").textContent = q.pick > 1
    ? `This question has ${q.pick} correct answers — select ${q.pick === 2 ? "TWO" : q.pick}.`
    : "Select one answer.";

  const wrap = $("q-options");
  wrap.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option" + (selected.has(i) ? " selected" : "");
    const marker = q.pick > 1 ? (selected.has(i) ? "☑" : "☐") : (selected.has(i) ? "●" : "○");
    div.innerHTML = `<span class="option-marker">${marker}</span><span>${opt.text}</span>`;
    div.onclick = () => toggleOption(i);
    wrap.appendChild(div);
  });

  $("btn-prev").disabled = state.current === 0;
  const isLast = state.current === total - 1;
  $("btn-next").hidden = isLast;
  $("btn-finish").hidden = !isLast;
}

function toggleOption(i) {
  const q = state.questions[state.current];
  const selected = state.answers[state.current];
  if (q.pick === 1) {
    selected.clear();
    selected.add(i);
  } else if (selected.has(i)) {
    selected.delete(i);
  } else {
    if (selected.size >= q.pick) {
      // Replace the oldest selection so the user never exceeds the limit.
      selected.delete(selected.values().next().value);
    }
    selected.add(i);
  }
  renderQuestion();
}

function finishExam() {
  const unanswered = state.answers.filter((s) => s.size === 0).length;
  if (unanswered > 0 && !confirm(`${unanswered} question(s) are unanswered and will be marked wrong. Finish anyway?`)) {
    return;
  }
  clearInterval(state.timerId);
  renderResults();
  showScreen("results");
}

// ---------- Results ----------
// Returns "correct" | "partial" | "incorrect".
// "partial" applies only to multiple-response questions where the selection
// includes at least one correct option but is not exactly the correct set
// (e.g., one right + one wrong, or only one of the two right answers).
function gradeQuestion(q, selected) {
  const correctIdx = q.options.map((o, i) => (o.correct ? i : -1)).filter((i) => i >= 0);
  const hits = [...selected].filter((i) => q.options[i].correct).length;
  const wrongPicks = selected.size - hits;
  if (hits === correctIdx.length && wrongPicks === 0) return "correct";
  if (q.pick > 1 && hits > 0) return "partial";
  return "incorrect";
}

function renderResults() {
  const total = state.questions.length;
  let score = 0;
  let partials = 0;
  const domainStats = {};

  const grades = state.questions.map((q, qi) => {
    const grade = gradeQuestion(q, state.answers[qi]);
    if (grade === "correct") score++;
    if (grade === "partial") partials++;
    domainStats[q.domain] = domainStats[q.domain] || { ok: 0, total: 0 };
    domainStats[q.domain].total++;
    if (grade === "correct") domainStats[q.domain].ok++;
    return grade;
  });

  const pct = Math.round((score / total) * 100);
  const passed = pct >= 72; // real exam pass mark is ~720/1000
  $("score-headline").textContent = passed ? "Nice work — passing score! 🎉" : "Keep practicing — you'll get there.";
  $("score-big").textContent = `${pct}%`;
  $("score-big").className = "score-big " + (passed ? "pass" : "fail");
  const mins = Math.round((Date.now() - state.startedAt) / 60000);
  const wrong = total - score - partials;
  const parts = [`${score} correct`];
  if (partials) parts.push(`${partials} partially correct`);
  parts.push(`${wrong} incorrect`);
  $("score-detail").textContent =
    `${parts.join(" · ")} · ${mins < 1 ? "under a minute" : mins + " min"} · pass mark ≈ 72%` +
    (partials ? " (the real exam gives no credit for partial answers)" : "");

  $("domain-breakdown").innerHTML = Object.entries(domainStats)
    .map(([d, s]) => {
      const p = Math.round((s.ok / s.total) * 100);
      return `<div class="domain-row">
        <span class="domain-name">${d}</span>
        <div class="domain-bar"><div class="domain-bar-fill ${p >= 72 ? "pass" : "fail"}" style="width:${p}%"></div></div>
        <span class="domain-pct">${s.ok}/${s.total}</span>
      </div>`;
    })
    .join("");

  const VERDICT = {
    correct:   { cardCls: "ok",      verdictCls: "pass",    label: "Correct" },
    partial:   { cardCls: "partial", verdictCls: "partial", label: "Partially correct" },
    incorrect: { cardCls: "not-ok",  verdictCls: "fail",    label: "Incorrect" },
  };

  $("review-list").innerHTML = state.questions
    .map((q, qi) => {
      const selected = state.answers[qi];
      const v = VERDICT[grades[qi]];
      const multi = q.pick > 1;
      const optionsHtml = q.options
        .map((opt, oi) => {
          const chosen = selected.has(oi);
          let cls = "review-option";
          let badge = "";
          if (opt.correct && chosen) { cls += " right"; badge = "✔ Your answer — correct"; }
          else if (opt.correct) { cls += " right"; badge = multi ? "✔ Correct answer — you missed this" : "✔ Correct answer"; }
          else if (chosen) { cls += " wrong"; badge = "✘ Your answer — wrong"; }
          return `<div class="${cls}">
            <div class="review-option-text">${opt.text}${badge ? `<span class="badge">${badge}</span>` : ""}</div>
            <div class="review-why">${opt.why}</div>
          </div>`;
        })
        .join("");
      return `<div class="card review-card ${v.cardCls}">
        <div class="review-head">
          <span class="review-verdict ${v.verdictCls}">${v.label}</span>
          <span class="domain-tag">${q.domain}</span>
          ${multi ? `<span class="type-tag multi">Multiple response</span>` : ""}
        </div>
        <h3>Q${qi + 1}. ${q.question}</h3>
        ${optionsHtml}
      </div>`;
    })
    .join("");

  saveHistory(score, total);
}

// ---------- Wire up ----------
$("btn-start").onclick = startExam;
$("btn-prev").onclick = () => { state.current--; renderQuestion(); };
$("btn-next").onclick = () => { state.current++; renderQuestion(); };
$("btn-finish").onclick = finishExam;
$("btn-restart").onclick = () => { renderStart(); showScreen("start"); };

renderStart();
