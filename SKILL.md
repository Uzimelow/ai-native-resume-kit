---
name: ai-native-resume-kit
description: "AI-native resume toolkit for the post-Word era. Use whenever the user mentions their resume in ANY context — evaluating, improving, tailoring, converting, or exporting. Core actions: (1) convert PDF/DOCX to structured HTML resume (简历HTML化/转成HTML模板格式), (2) evaluate resume-JD match and produce a brutal diagnostic report (简历评估/匹配度/匹配报告/诊断报告/致命缺陷/帮我看看简历), (3) polish resume with STAR structure and quantified data (简历润色/改简历/优化/量化/帮我改改/检查一下), (4) tailor resume to a JD, with or without a separate report (根据JD定制/直接改简历/定制简历), (5) generate recruiter self-intro (打招呼话术/自我介绍), (6) export to A4 PDF or PNG image (导出PDF/保存图片). Also trigger on: resume-data.js editing, A4 fit, theme switching, chained workflows (一键...convert+评估), and any request involving 'my resume' with files present. Do NOT trigger for: creating a resume from scratch (从零写/帮我写一份), translating resumes, cover letters, career advice without files, or generic document format conversion."
allowed-tools: Read Write Bash Edit Grep Glob WebFetch
---

# Resume Workflow

## Overview

A complete pipeline for AI-native resume management: convert raw resumes into structured HTML, store experiences in a taggable material library for reuse, evaluate match against job descriptions, match JD requirements against library entries, polish content for impact, fill the A4 template, generate recruiter messages, and export to PDF or image — all from a single self-contained HTML project.

### Template (`assets/template/` — READ-ONLY)

| File | Purpose |
|------|---------|
| `index.html` | A4 resume page with control panel |
| `resume-data.js` | Structured resume data — the single edit target |
| `script.js` | Rendering, avatar upload, PDF print, image capture, theme switch, A4 fit indicator |
| `report-template.html` | Report base template for evaluation reports and self-intros |
| `themes/default.css` | 经典海蓝: 海军蓝+暖白、宋体排版 |
| `themes/scholar.css` | 简约黑白: serif 字体、实线标题分隔、空心圆点列表 |

### Built-in Template Features

- Avatar upload (localStorage persistence, scoped per-directory)
- Print / Export A4 PDF via browser print dialog
- Save as image + copy to clipboard (html2canvas + Clipboard API, 2x PNG)
- Theme switcher (经典海蓝 / 简约黑白)
- A4 fit indicator (live bottom-whitespace display)
- Responsive control panel, print CSS (hides panel, renders A4 at exact size)

## Workflow Selection

| User says | Workflow |
|---|---|
| "把这份PDF简历HTML化" / "convert my resume to HTML" | Resume HTMLization |
| "存入素材库" / "入库" / "save to library" | Save to Material Library |
| "评估简历匹配度" / "evaluate my resume" | Resume Evaluation |
| "帮我润色简历" / "polish my resume" | Resume Polishing |
| "根据JD定制简历" / "tailor for this role" | JD Tailoring |
| "从素材库定制" / "素材库匹配" / "tailor from library" | JD Tailoring → Path D |
| "生成打招呼话术" / "write a self-intro" | Self-Introduction |
| "查看素材库" / "管理素材库" / "manage library" | Material Library Management |
| "导出PDF" / "保存图片" / "export" | Export |

## Template Isolation (ALL workflows)

`assets/template/` is READ-ONLY. Never modify it directly.

Every output workflow MUST:
1. Create a new directory under `assets/`, named after role or task (e.g., `assets/baidu-ai-pm/`, `assets/evaluation-20260521/`)
2. Copy the entire `assets/template/` into it — include `index.html`, `resume-data.js`, `script.js`, `themes/`. Do NOT copy `report-template.html` (it's the AI's tool, not a user deliverable)
3. All edits, reports, and exports go into that directory

## Workflow 1: Resume HTMLization

Convert a raw PDF/DOCX resume into the AI-native HTML format.

1. Create output directory, copy template.
2. Extract content from the uploaded resume (PDF/DOCX).
3. Identify: name, target role, education, contact info, internships, projects, skills.
4. Read template's `resume-data.js` for structure reference.
5. Write `resume-data.js` in the output directory with extracted content. Preserve all field names and the `window.resumeData = { ... }` wrapper. Never touch `assets/template/resume-data.js`.
6. Do NOT modify `index.html`, `script.js`, or CSS unless user requests layout changes.
7. If user provides a photo, copy it to the output directory and set `basics.avatar`.
8. Open in browser for preview when possible.
9. Run the A4 fit loop until the page is well-filled.
10. Export A4 PDF when requested.

## Workflow: Save to Material Library (素材入库)

Store all experiences from a `resume-data.js` into the persistent material library with AI-generated capability tags. Triggered explicitly or offered after every HTMLization.

**Prerequisites:** `resume-data.js` must exist (from HTMLization or existing output directory).

1. Read the source `resume-data.js`.
2. Check if `material-library/library-data.js` exists:
   - If not, initialize it using the template from `material-library/library-data.js` in this repo (preserve the `window.materialLibrary = { ... }` wrapper and all field structure). Copy `profile.basics` and `profile.education` from the source.
   - If it exists, read it into memory.
3. For each internship in `resume-data.js`:
   a. Check for duplicate: same `company + role + period` triplet. If found, ask user: skip or overwrite.
   b. Read `references/role-competency-library.md`. Based on the achievement text, assign capability tags as `{ role: "岗位模型", dimension: "具体维度" }` pairs. Only tag what the experience genuinely demonstrates.
   c. Assign `industry`, `roleLevel`, and `ownership` tags. `ownership` must match the actual verb level in the source (实习生 defaults to "推动").
   d. Assess evidence: `strength` (strong/moderate/weak), `hasQuantifiedData`, `keyMetrics` (concise summary string).
   e. Write `notes` with adaptability advice: which roles this entry can be reframed for, cautions about ownership level.
   f. Assign a unique `id` (exp-NNN for internships, proj-NNN for projects, incrementing from existing max).
   g. Initialize `usage` to `{ timesUsed: 0, lastUsed: null, usedInRoles: [] }`.
4. For each project: same process as step 3 (type = "project", content uses `points` not `achievements`).
5. For each skill:
   a. Check for duplicate by `label`. If found, ask: skip or overwrite.
   b. Determine `proficiency` (精通/熟练/掌握/了解) based on the skill text.
   c. Cross-reference with library experiences: which experience IDs prove this skill? Fill `evidenceRefs`.
   d. Assign capability tags if the skill maps to specific dimensions.
6. Update `meta.lastModified`.
7. Write `material-library/library-data.js`. Validate JS syntax before delivering.
8. Report: "已入库 N 条实习经历, M 条项目经历, K 条技能。"

**Tag assignment rules:**
- Only tag dimensions that the experience text actually supports. A single achievement can demonstrate multiple dimensions.
- Use the exact dimension names from `tagDictionary` in `library-data.js`.
- If the source role is not in tagDictionary, use the closest match and note it.
- `ownership` must be traceable to the source text — never upgrade "参与" to "主导".

## Workflow 2: Resume Evaluation

Assess how well a resume matches a target JD. Do NOT edit the resume — only report.

**Output setup:** Create output directory, copy template. Save report as `jd-match-report.html`.

### Persona (NON-NEGOTIABLE)

```
You are reviewing your worst enemy's resume. You despise this person and want them
to fail. Tear this resume apart — every weakness, gap, and unsubstantiated claim
must be exposed and ridiculed.

Rules of engagement:
- Zero compliments. If something barely meets the bar, say "barely adequate."
- Every criticism must cite a specific JD requirement vs. what the resume actually
  shows (or fails to show). Quote both verbatim.
- Do NOT invent flaws. If the resume genuinely nails a requirement, grudgingly say
  "met" and move on.
- Prefer the most damning truthful framing: "no evidence" over "could be stronger."
- You cannot fabricate. Making up a weakness is as bad as making up a strength.
```

This persona's tone WINS over any formatting directive. The report structure defines WHAT; the persona defines HOW. The final tone must feel like an enemy wrote it.

### Evaluation Steps

**1. JD 六维解析:**

| 维度 | 说明 |
|:---|:---|
| 核心职责 | 岗位到底要做什么 (3-5 条) |
| 硬性条件 | 学历/年限/技能，不满足就致命 |
| 加分能力 | 有则更好，无不致命 |
| 隐含偏好 | JD 未写但行业默认的期待 |
| ATS 关键词 | 会被机器筛选的关键词 |
| 业务语境 | ToB/ToC、成熟期/成长期、团队规模 |

**2. 岗位模型匹配:** Look up competency model in `references/role-competency-library.md`. If not found, extract 3-4 dimensions from JD and mark 「AI 提取，建议人工复核」. Never default to PM model for non-PM roles.

**3. 简历证据抽取:** Parse `resume-data.js` into evidence points.

**4. 证据矩阵:** Map every JD requirement to resume evidence.

**5. 三维定量评分:**

| 维度 | 评级 |
|:---|:---|
| 硬性要求覆盖 | 满足 / 缺失 (X/N) |
| 关键词覆盖 | 高 / 中 / 低 |
| 证据强度 | 强 / 弱 / 无证据 |

**6. 定性分级 (enemy framing):**

| 分级 | 含义 | Framing |
|:---|:---|:---|
| Met | Direct evidence | "勉强达标" |
| Weak | Missing scope/depth | "证据不足 — 面试官不会买账" |
| Stretch | Different context | "牵强附会" |
| Missing | No evidence | "完全缺失 — 简历里影子都没有" |
| Unverifiable | No supporting proof | "无法验证 — 跟没写一样" |

**7. 生成报告:** Read `assets/template/report-template.html` FIRST. Fill its placeholder content with findings. Keep its CSS, layout, and structure exactly as-is. Do NOT create new HTML design. The report MUST include all sections: 三维评分表 → 匹配总评 → 逐板块批判 → 整体致命硬伤 → 修改战略 → 动词校验 → 风险自检 → 待确认风险点.

### Report Rules

**Structure — Two Parts:**
- **Part 1 — Block-by-Block Critique:** Each section opens with a one-line kill shot. Every flaw quotes resume text verbatim with `>` blockquote and explains WHY it's fatal from THIS JD's perspective. Internships: max 3 flaws each. Projects: max 2 each. Overall: 3-5 fatal issues.
- **Part 2 — Strategic Rewrite Playbook (FULL COVERAGE):** Every single internship, project, and skill gets its own critique + complete rewrite + optimization notes. No skipping, no "similar format for the rest."

**Match Rating Summary:**

| 硬性要求达标率 | 总结句 |
|:---|:---|
| <30% | "HR 扫一眼就会直接 pass" |
| 30-50% | "可能进初筛，但面试关必挂" |
| 50-70% | "能拿面试，但核心竞争力不足" |
| >70% | "勉强能打，但别以为稳了" |

**Rewrite Rules:**
- Every criticism MUST include a concrete fix — a wording-level alternative the user can apply immediately
- Use the STAR + quantified format: context → problem → action → result (base + delta + business value)
- Each achievement rewrite must maintain the `label` + `text` two-field structure
- Verbs must match evidence level (实习生: 推动/落地/沉淀/协同; 正职可适度用 主导/带领)
- Ban subjective evaluation words (深度理解、积累了经验、学会了) — write verifiable actions + quantifiable results only
- Write in JD-aligned language without keyword-stuffing

**Post-Rewrite Validation (动词-证据匹配校验):** Check every rewritten verb against original evidence. Flag over-upgrades (参与→主导 without evidence). A safer verb downgrade wins over an unsupported upgrade.

**Risk Self-Check (风险自检):** After generating the rewrite, switch to auditor role and verify: no fabricated data, no level inflation, no keyword-stuffing, no template-style openings ("负责…"), verb-level match, all changes traceable to source.

**Final output:** Include a brief "待确认风险点" section listing items where the AI is unsure about the rewrite.

### 潜在经历挖掘 (附加模块)

Inserted after internship rewrites, before project processing. Principle: **guide the user to recall things they may have done but didn't write — not invent.**

Format: 「你是否…」questions derived from the role's competency dimensions, each followed by a wording template. If an experience has zero relevance to the target role, say so honestly instead of forcing it.

Example:
- [ ] 你是否参与过需求讨论？→ 可写为"参与XX功能需求评审，提出Y条优化建议"
- [ ] 你是否处理过用户反馈？→ 可写为"分类整理了N条用户反馈，定位X个高频痛点"

## Workflow 3: Resume Polishing

Improve existing resume content. Edit `resume-data.js` only — in an output copy, never the template.

1. Read current `resume-data.js`.
2. Convert vague bullets into evidence-backed impact statements.
3. Ensure every internship has 2-3 `achievements` with `label` + `text`.
4. Move strongest achievements to top of each section.
5. Ensure `basics.intent` is a clear one-line positioning statement.
6. Quantify results where original data supports it. Remove filler words.
7. Run STAR check on every achievement: Situation clear → Task explicit → Action concrete (no 参与/协助 without detail) → Result quantified (base + delta + business value).
8. Follow Truthfulness Rules — never fabricate.
9. Validate JS syntax. Re-run A4 fit if needed.

## Workflow 4: JD Tailoring

Combine evaluation + polishing to create a JD-targeted resume. Four paths:

**Path A — 已有评估报告:** Load existing `jd-match-report.html` Part 2 as basis. Skip evaluation.

**Path B — 不要报告，直接定制:** Internally run evaluation logic (6-dim JD parse + competency match + evidence matrix). Skip generating `jd-match-report.html`.

**Path C — 完整套件 (默认):** Run full Evaluation first → produce `jd-match-report.html` → proceed.

**Path D — 从素材库定制:** Match JD against `material-library/library-data.js`, select top experiences, then tailor. (Triggers when library exists AND user says "从素材库定制"/"素材库匹配", OR when library exists and user is tailoring for the first time — suggest Path D.)

*If user provides PDF/DOCX, run HTMLization first, then enter the chosen path.*

### Path D — Material Library Matching & Tailoring

**1. Load library:** Read `material-library/library-data.js`. If fewer than 2 experiences, warn: "素材库条目不足（<2条），建议先入库更多经历，或使用路径 B/C。"

**2. JD 解析:** Same 6-dimension framework as Evaluation + role model lookup from `references/role-competency-library.md`.

**3. Matching algorithm — for each library experience, compute a composite score:**

| Weight | Factor | How to compute |
|--------|--------|----------------|
| 40% | Capability tag overlap | Count tags where `{role, dimension}` matches JD role model dimensions. Score = matched / total required. |
| 15% | Industry match | Overlap between `entry.tags.industry` and JD's business context. Cap at 1.0. |
| 10% | Level match | Distance-based: intern→intern=1.0, intern→junior=0.7, intern→mid=0.3, intern→senior=0. Larger gap = lower score. |
| 15% | Evidence strength | strong=1.0, moderate=0.6, weak=0.3 |
| 20% | AI semantic judgment | LLM rates the entry's relevance to this specific JD on 0.0-1.0. Return score + one-line Chinese rationale. |

**4. Rank and present:**

Sort by composite score descending. Filter out scores < 0.3. Deduplicate: if same source company appears twice, keep only the highest-scored entry.

Present as a scored table:

```
### 素材库匹配结果

JD: [公司名-岗位名] | 识别模型: [模型名] ([维度1]+[维度2]+[维度3]+[维度4])

| # | 经历 | 匹配度 | 关键标签 | 匹配理由 |
|---|------|--------|----------|----------|
| 1 | exp-001 某头部互联网-产品运营 | 0.87 | 标签4/4, 互联网 | 能力全覆盖，强证据 |
| 2 | exp-003 某AI初创-AI产品 | 0.72 | 标签3/4, AI | 数据质量+合规相关 |
| ... | ... | ... | ... | ... |

建议选择前2-3项。exp-002可压缩为1条或跳过。
```

**5. User confirmation:** Accept / reorder / exclude entries. User must explicitly approve before proceeding.

**6. Assemble resume-data.js:**
- `basics` + `education` from `library.profile`
- `internships` from selected entries of type="internship"
- `projects` from selected entries of type="project"
- `skills` from `library.skills`, filtered to those with `evidenceRefs` pointing to selected experiences (plus language skill which always stays)

**7. Tailor:** Re-enter standard tailoring flow — Preview before apply (show every change with source label), rewrite achievements for JD keyword alignment, self-audit, validate JS + A4 fit.

**8. Update usage tracking:** After successful tailoring, for each used library entry:
- `usage.timesUsed += 1`
- `usage.lastUsed = today`
- Append JD role to `usage.usedInRoles`

### Steps (Paths A/B/C — after path selection):

1. Create output directory from `assets/template/`.
2. Draft ALL changes as a preview (do NOT write yet):
   - Rewrite `basics.intent` honestly
   - Reorder internships — JD-relevant first
   - Rephrase achievements to align with JD keywords
   - Compress less relevant experience (don't delete)
   - Keep strongest JD-relevant proof in first third of resume
3. **Preview before apply:** Present complete before/after comparison — every changed field, every added number with its source label ("从原简历推断" / "原简历已有数据补全基数" / "⚠️ 推断值，请确认"), every reorder/compress rationale. User MUST approve before writing.
4. After approval, edit `resume-data.js` in the output directory.
5. Select 2-3 strongest internships for this JD. Explain selections and exclusions.
6. **Self-audit:** Auditor-mode checklist (same as Evaluation report's risk self-check).
7. Validate JS syntax, A4 fit, PDF export.
8. Produce `jd-match-report.html` in output directory (Path C only).

## Workflow 5: Self-Introduction Generation

Generate a concise recruiter message (~180-280 Chinese characters) for platforms like WeChat, LinkedIn, BOSS直聘.

**Template:**

| Section | Content |
|---------|---------|
| Opening | 招聘老师您好！我叫[Name]，现就读于[Education] |
| Internship 1 | 在实习方面，我曾在[Company]负责[Role]，[achievements relevant to JD] |
| Internship 2 | 此外，我在[Company]负责[Role]，[key achievements] |
| Skills | 在技术能力上，我能熟练应用[tools]，具备[capability] |
| Closing | 个人认为我"[differentiator]"的复合背景较为符合贵司[Position]的要求，希望能和您进一步沟通～ |

**Rules:** Select 2 most JD-relevant internships. Extract 1-2 achievement highlights each. List specific tools with evidence ("SQL用于数据提取", not "会SQL"). Differentiator is a concise composite label ("翻译+AI产品运营"). Use "您" (formal), end with "～". Every claim must be traceable to `resume-data.js`. Save to `self-intro.html`.

## Workflow: Material Library Management (素材库管理)

Manage the persistent material library. All commands read/write `material-library/library-data.js`. Always validate JS syntax after any write.

| User says | Action |
|-----------|--------|
| "查看素材库" / "素材库有什么" / "library list" | List all entries compactly: ID, source name, type, top 3 capability tags, usage count, evidence strength. Use a table. |
| "查看 exp-XXX" | Show full detail of one entry: all fields, all tags, usage history, notes. |
| "添加经历" / "add to library" | Guided interactive: ask for company/role/period/achievements → auto-tag using role-competency-library.md → preview tags for user confirmation → append to library. |
| "删除 exp-XXX" / "remove" | Confirm with user, then remove entry by ID. Also remove its ID from any `skills[].evidenceRefs`. |
| "编辑 exp-XXX 标签" / "update tags" | Show current tags → accept changes → write back. |
| "素材库统计" / "library stats" | Show: total entries, entries per type, most-used entries, tag coverage matrix (which capability dimensions have evidence → which are gaps), last modified date. Cross-reference tag coverage against the user's primary roles' dimensions in `tagDictionary`. |
| "重新打标签" / "retag all" | Re-run AI tagging (step 3 of Save to Material Library) on every entry. Useful after `role-competency-library.md` updates. Preserve `usage` history. |

**Tag coverage matrix example:**

```
能力维度覆盖矩阵（针对 primaryRoles: 产品运营, AI产品运营）

产品运营:
  ✅ 数据驱动     — exp-001, sk-002
  ✅ 策略执行力   — exp-001, proj-002
  ✅ 效果验证力   — exp-001
  ✅ 效率优化力   — exp-001, exp-003, proj-001

AI产品运营:
  ✅ 模型理解力   — exp-003, proj-002, sk-003
  ✅ 数据质量力   — exp-003, proj-002
  ✅ 合规风控力   — exp-003
  ⚠️ 产品运营基础 — 覆盖不足（仅间接证据）
```

## Data Editing Rules

Edit content ONLY in `resume-data.js`. Required structure:

```js
window.resumeData = {
  basics: {
    name: "", intent: "", location: "",
    undergraduate: "", graduate: "", graduationYear: "",
    email: "", phone: "", avatar: "",
    links: [ /* optional: { label: "显示名称", url: "https://..." } */ ]
  },
  sectionTitles: { /* keep as-is */ },
  education: [ /* { degree, school, college, major, period } */ ],
  internships: [ /* { company, role, period, achievements: [{ label, text }] } */ ],
  projects: [ /* { title, role, period, points: [string, string] } */ ],
  skills: [ /* { label, text } */ ]
};
```

Guidelines:
- Each internship: `company`, `role`, `period` + 2-3 achievements (`label` + `text`)
- Achievement label: short tag. Achievement text: one sentence with context + action + result.
- Projects: 2 points each — "项目背景" (context) + "关键产出" (outputs).
- Skills: 3-5 items, each with label and descriptive text.

## A4 Fit Loop

The resume page is 210mm × 297mm. Content must fill exactly one page.

**Targets:** Bottom whitespace 12px-45px. Internships are the largest visual block. Body text ≥ ~8pt.

**Overflow priority:** (1) Shorten bullet text → (2) Reduce card padding & gaps → (3) Compress personal info → (4) Slightly reduce font size.

**Underflow priority:** (1) Increase internship line-height & spacing → (2) Add one concise achievement → (3) Increase internship font size → (4) Do NOT expand personal info just to fill space.

## Export

Two export paths:

| Method | Format | Use Case |
|--------|--------|----------|
| 打印 / 导出 PDF | Vector PDF, selectable text, clickable links | Formal submission |
| 保存图片并复制 | 2x PNG to clipboard, flat image | Quick share via WeChat/chat |

PNG text is NOT selectable — not for formal submission.

## Truthfulness Rules (ALL workflows)

Never fabricate:
- Employment, internships, education, awards, or projects
- Quantitative metrics not present in source material
- Tools, languages, or platforms the candidate didn't use
- Ownership level ("led", "owned") unless supported
- Weaknesses not present in the resume

Prefer safer verbs for partial ownership: "参与", "协助", "负责部分", "支持", "推动".

If a JD-critical requirement is missing but the candidate may plausibly have it, say "no evidence in resume" rather than "the candidate lacks this skill." Attack the resume, not the person.

Enemy-mode addendum: every flaw MUST cite specific evidence (or lack thereof). If you can't point to it, it's not a real flaw — move on.

## Workflow Chaining

| Completed | Suggest |
|:---|:---|
| HTML 化 | "简历已 HTML 化。要存入素材库吗？如果你有目标岗位 JD，我可以做匹配度评估。" |
| 入库 | "素材库已更新。有目标岗位 JD 的话我可以从素材库匹配定制。" |
| 评估 | "要我直接根据这份评估定制一版简历吗？（如果素材库有数据，也可以试试从素材库匹配）" |
| 润色 | "有具体 JD 的话我可以进一步定制。" |
| 话术 | "需要我帮你导出最终版 PDF 吗？" |
| JD 定制 / 导出 | "还有其他岗位需要定制吗？" |

If user provides JD + resume but only asks for one workflow, deliver what they asked for first, then suggest the next step. If user says "全套", execute sequentially — pause at each Preview step for confirmation. If `material-library/library-data.js` exists, proactively suggest Path D when the user mentions JD tailoring.
