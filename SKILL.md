---
name: ai-native-resume-kit
description: "AI-native resume toolkit. TRIGGER when the user mentions their resume, CV, JD, job application, 简历, 岗位匹配, 定制简历, 润色, 诊断报告, 匹配度, 招呼, 导出PDF, 素材库, resume-data.js, or A4 fit. Core: (1) PDF/DOCX → structured HTML resume, (2) resume-JD evaluation with enemy-persona diagnostic report, (3) STAR polish with quantified data, (4) JD-tailored resume with evidence matrix, (5) recruiter self-intro generation, (6) A4 PDF/PNG export. Also: material library save/match, role profiles, theme switch, chained workflows."
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
| `script.js` | Rendering, export, theme switch, A4 fit indicator |
| `report-template.html` | Evaluation report base |
| `self-intro-template.html` | Self-intro base (5-paragraph, Charter/Georgia) |
| `themes/default.css` | 经典海蓝 |
| `themes/scholar.css` | 简约黑白 |
| `references/role-competency-library.md` | 岗位能力模型库（36 类） |
| `references/skill-taxonomy.md` | 技能分类与推断字典 |

Built-in: avatar upload (localStorage), A4 PDF print, PNG capture (html2canvas, 2x), theme switch, live A4 fit indicator.

## Routing（路由决策）

Detect the user's starting point and route to the correct workflow. Each chain suggests the next natural step after completion.

### 起点 1: 用户上传了 PDF/DOCX 简历

```
PDF/DOCX → HTML化 → 建议入库
                  → 有 JD？→ 评估（可选）→ 定制 → 导出 / 招呼
```
Trigger: user attaches a `.pdf`/`.docx` file and mentions 简历/HTML化.

### 起点 2: 用户有 JD，素材库已有数据

```
JD + library-data.json 存在 → 从素材库定制 (Path D) → 导出 / 招呼 / 回存画像
```
Trigger: user sends a JD and `material-library/library-data.json` exists. Proactively suggest Path D. If user declines, fall back to Path B/C.

### 起点 3: 用户已有 HTML 简历（resume-data.js 已存在）

| 用户说 | → 执行 | 完成后建议 |
|--------|-------|-----------|
| "润色" | Resume Polishing | "有 JD 可以进一步定制" |
| "评估" + JD | Resume Evaluation | "直接根据这份评估定制一版简历？" |
| "定制" + JD | JD Tailoring (Path A/B/C) | "导出 PDF？需要打招呼话术吗？" |
| "从素材库定制" + JD | JD Tailoring → Path D | "导出 PDF？需要回存到素材库吗？" |
| "招呼" + JD | Self-Introduction | "需要导出最终版 PDF 吗？" |
| "导出" | Export | - |

### 起点 4: 用户无简历无文件

Ask what they have. Suggest:
- 「有 PDF/DOCX 吗？我可以帮你 HTML 化」
- 「有 JD 吗？如果素材库有数据，可以直接从素材库定制」

### 素材库独立操作

| 用户说 | → 执行 |
|--------|-------|
| "入库" / "save to library" | Save to Material Library |
| "查看素材库" / "管理素材库" | Material Library Management |

### "全套"模式

If user says "全套", execute sequentially: HTML化(if needed) → 入库 → 评估 → 定制 → 招呼 → 导出. Pause at each Preview step for confirmation.

## Template Isolation (ALL workflows)

`assets/template/` is READ-ONLY. Never modify it directly.

Every output workflow MUST:
1. Create a new directory under `assets/`, named after role or task (e.g., `assets/baidu-ai-pm/`, `assets/evaluation-20260521/`)
2. Copy ONLY these files from `assets/template/` into the output directory: `index.html`, `resume-data.js`, `script.js`, `themes/`. Do NOT copy `report-template.html` or `self-intro-template.html` — those are AI tool files, not rendering dependencies. The output directory must contain exactly: `index.html` + `resume-data.js` + `script.js` + `themes/` + generated reports. No extra template files.
3. All edits, reports, and exports go into that directory
4. Each output directory contains exactly **one** `resume-data.js` — the current version. Deliverables: `index.html` (resume preview), `jd-match-report.html` (evaluation), `self-intro.html` (recruiter message). If tailoring produces a new version, overwrite `resume-data.js` (only keep a backup if the user asks).

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

> After HTMLization: suggest saving to the material library. If the user has a JD ready, offer evaluation.

## Workflow: Save to Material Library (素材入库)

Store all experiences from a `resume-data.js` into the persistent material library with AI-generated capability tags. Triggered explicitly or offered after every HTMLization.

**Prerequisites:** `resume-data.js` must exist (from HTMLization or existing output directory).

1. Read the source `resume-data.js`.
2. Check if `material-library/library-data.json` exists:
   - If not, initialize from the repo template (`library-data.json`). Fill `profile.basics` and `profile.education` from the source.
   - If exists, read and parse the JSON file directly.
3. For each internship and project, read `references/role-competency-library.md` to understand the target role's dimensions — this context helps the AI write richer achievement descriptions, but no formal tags are stored.
4. Assign unique `id` (exp-NNN / proj-NNN). Append to `experiences[]`. Projects and internships share the unified `content.achievements[{label, text}]` format.
5. For skills: read `references/skill-taxonomy.md`. Split each skill into `skillDimensions[{name, items[{name, proficiency, description}]]}`. Store in `skillDimensions[]`.
6. Serialize the updated data to JSON. Update `meta.lastModified`. Write to `library-data.json`.
7. Validate the JSON is valid.
8. Report: "已入库 N 条经历, M 个能力大类。"

**Achievement-level dedup:** For each new achievement within the SAME entry, AI judges semantic similarity. >80% similar → ask user: replace / keep both / discard. Cross-entry duplication is allowed (same skill in different companies is different context).

> After saving to library: remind user that future JD tailoring can now use Path D (library matching). Ask if they have a JD ready.

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

### ⚠️ PRE-GENERATION CHECKLIST (MANDATORY — verify BEFORE writing jd-match-report.html)

Before generating the report, confirm ALL items are planned. Generate nothing until every item is accounted for:

| # | Section | Requirement |
|---|---------|-------------|
| ☐ 1 | **Enemy persona** | Every section uses enemy tone. Zero compliments. "勉强达标" at best. Kill-shot opening sentence for each internship/project critique. |
| ☐ 2 | **JD 六维解析** | Table with all 6 dimensions filled. |
| ☐ 3 | **岗位模型匹配** | Name the model from role-competency-library.md, or mark 「AI 提取」. |
| ☐ 4 | **三维评分** | 硬性要求覆盖 + 关键词覆盖 + 证据强度 — all 3 rated. |
| ☐ 5 | **定性分级** | Each JD requirement → Met/Weak/Stretch/Missing/Unverifiable. Enemy framing per the table in step 6. |
| ☐ 6 | **匹配总评** | Match Rating Summary table with 4-tier verdict (<30%/30-50%/50-70%/>70%). |
| ☐ 7 | **逐板块批判 (Part 1)** | Internships: max 3 flaws each, each with `>` blockquote quoting resume text verbatim. Projects: max 2 each. Overall: 3-5 fatal issues. |
| ☐ 8 | **重写手册 (Part 2 — FULL COVERAGE)** | Every single internship, project, and skill gets its own rewrite. No skipping, no merging. Each rewrite: STAR + quantified, `label` + `text` format, verbs match evidence level. |
| ☐ 9 | **潜在经历挖掘** | 「你是否…」questions per competency dimension, with wording templates. If experience has zero relevance, say so honestly. |
| ☐ 10 | **动词校验** | Check every rewritten verb against original evidence. Flag over-upgrades. |
| ☐ 11 | **风险自检** | Auditor-mode: no fabricated data, no level inflation, no keyword-stuffing, all changes traceable. |
| ☐ 12 | **待确认风险点** | List items where AI is unsure about the rewrite. |

**Match Rating Summary:**

| 硬性要求达标率 | 总结句 |
|:---|:---|
| <30% | "HR 扫一眼就会直接 pass" |
| 30-50% | "可能进初筛，但面试关必挂" |
| 50-70% | "能拿面试，但核心竞争力不足" |
| >70% | "勉强能打，但别以为稳了" |

**Rewrite Rules:** Every criticism must include a concrete wording-level fix. STAR + quantified format. Maintain `label` + `text` structure. Verbs match evidence level (实习生: 推动/落地/沉淀/协同). Ban subjective words (深度理解、积累了经验). Write in JD-aligned language without keyword-stuffing. Flag over-upgrades (参与→主导).

**After report**: offer to proceed directly to JD Tailoring. If library exists, mention Path D.

### Evaluation Steps

**1. JD 六维解析:** 核心职责(3-5条) / 硬性条件 / 加分能力 / 隐含偏好 / ATS关键词 / 业务语境(ToB/ToC/成熟期)

**2. 岗位模型匹配:** Look up in `references/role-competency-library.md`. Not found → extract 3-4 dimensions, mark 「AI 提取」. Never default to PM model for non-PM roles.

**3. 证据矩阵:** Parse `resume-data.js` → map every JD requirement to resume evidence.

**4. 三维评分 + 定性分级:** Score on 硬性要求覆盖(满足/缺失) + 关键词覆盖(高/中/低) + 证据强度(强/弱/无). Then grade each requirement: Met("勉强达标") / Weak("证据不足") / Stretch("牵强附会") / Missing("完全缺失") / Unverifiable("无法验证").

**5. 生成报告:** Read `assets/template/report-template.html` FIRST — keep its CSS and layout exactly. Fill its placeholders. The deliverable is ALWAYS `jd-match-report.html`, NEVER plain chat text. Must include: 三维评分 → 匹配总评 → 逐板块批判(Part 1, max 3 flaws per internship, `>` blockquotes) → 重写手册(Part 2, FULL COVERAGE, every internship/project/skill) → 整体致命硬伤 → 修改战略 → 动词校验 → 风险自检 → 待确认风险点.

**6. 潜在经历挖掘:** After internship rewrites, before projects. 「你是否…」questions per competency dimension, with wording templates. Principle: guide recall, don't invent.

> After evaluation: offer JD Tailoring. If library exists, mention Path D.

## Workflow 3: Resume Polishing

Improve existing resume content. Edit `resume-data.js` only — in an output copy, never the template.

1. Read current `resume-data.js`. Ensure every internship has 2-3 `achievements`.
2. Convert vague bullets into STAR + quantified: context → action → result (base + delta). Move strongest achievements to top.
3. Ensure `basics.intent` is a clear one-line positioning statement. Remove filler words.
4. Follow Truthfulness Rules. Validate JS syntax and A4 fit.

> After polishing: suggest saving to library. Ask if user has a JD for tailoring.

## Workflow 4: JD Tailoring

Combine evaluation + polishing to create a JD-targeted resume. Four paths:

**Path A — 已有评估报告:** Load existing `jd-match-report.html` Part 2 as basis. Skip evaluation.

**Path B — 不要报告，直接定制:** Internally run evaluation logic (6-dim JD parse + competency match + evidence matrix). Skip generating `jd-match-report.html`.

**Path C — 完整套件 (默认):** Run full Evaluation first → produce `jd-match-report.html` → proceed.

**Path D — 从素材库定制:** Match JD against `material-library/library-data.json`, select top experiences, then tailor. (Triggers when library exists AND user says "从素材库定制"/"素材库匹配", OR when library exists and user is tailoring for the first time — suggest Path D.)

*If user provides PDF/DOCX, run HTMLization first, then enter the chosen path.*

### Path D — Material Library Matching & Tailoring

**0. Role profile selection:**
   a. Read `material-library/library-data.json` — parse as JSON.
   b. If `experiences.length < 2`, warn: "素材库条目不足（<2条），建议先入库更多经历，或使用路径 B/C。"
   c. Check `roleProfiles` — if non-empty, list available profiles (e.g., "默认素材 / 产品经理 / 产品运营") and ask user which to use. When a role is selected, use its achievement overrides. Experiences without an override fall back to master achievements. If empty, use master directly.

**1. JD 解析:** Same 6-dimension framework + role model lookup from `references/role-competency-library.md`.

**2. Matching algorithm — capability-first, not industry-first:**

For each library experience, score on TWO dimensions:

| Weight | Factor | How to compute |
|--------|--------|----------------|
| 80% | Capability match | Does this experience demonstrate the generic skills the JD requires? (data analysis, strategy execution, effect validation, cross-team coordination, etc.) Industry context does NOT gate this score. |
| 20% | Industry context | How close is the business context? (e.g., e-commerce vs publishing) A mismatch lowers this weight but does not disqualify. |

Key principle: **The same operational capability (funnel analysis, A/B testing, layered targeting, data-driven decision-making) is cross-industry.** Do not dismiss an experience because the industry differs. Score the capability, not the domain.

Filter out total scores < 0.3.

**3. Phase A — Internship matching (present first, confirm before proceeding):**

```
### 实习经历匹配

JD: [公司-岗位] | 画像: [选中的 role profile]

| # | 经历 | 能力匹配 | 体现的能力 | 
|---|------|---------|-----------|
| 1 | exp-002 某公司 · 某岗位 | 0.85 | 数据分析、策略优化、效果验证、跨团队协同 |
| 2 | exp-003 某公司 · 某岗位 | 0.68 | 漏斗搭建、A/B测试、数据驱动、分层触达 |
| ... | ... | ... | ... |

请确认：选择哪几段？排序如何？是否压缩某段（减少 achievement 条数）？
```

User MUST approve internship selection before proceeding to projects.

**4. Phase B — Project matching (separate from internships):**

Same format as Phase A. Present ALL projects, each with score + capability tags. User selects which to include.

**5. Phase C — Skill selection (separate from projects):**

Filter `library.skillDimensions` to skills with evidence in selected experiences. Present as a flat list with proficiency levels. User confirms.

**6. Assemble resume-data.js:**
- `basics` + `education` from `library.profile`
- `internships` / `projects` from user-selected entries
- `skills` from `library.skillDimensions`, flattened to `skills[{label, text}]` format

**7. Tailor — rewrite principles:**

| Rule | Explanation |
|------|-------------|
| **Facts stay** | Company names, job titles, dates, and quantitative data are NOT modified. |
| **Capability mapping, not role dressing** | Highlight the generic capability the experience demonstrates (e.g., "strategy refinement", "data-driven optimization"), NOT by pretending the job was the JD's role. Do NOT change "NSFW compliance" to "e-commerce governance." Do NOT replace the actual context. |
| **JD keywords woven naturally** | Before rewriting: extract JD-specific terms (策略精细化, 治理准确性, 风险漏放, 指标监控, 全链路, 业务痛点, 标准迭代). During rewrite: embed these terms where they genuinely describe what was done — adjust sentence framing to surface the capability the JD cares about, not to invent new facts. The reader should recognize JD language without feeling it's keyword-stuffed. |
| **Keyword coverage table** | After rewrite, output a table showing which JD keywords appear in which experiences. Ensures the user can see at a glance that JD requirements are covered across the resume, not concentrated in one section. |
| **Granularity preserved** | Original has 3 achievements → rewrite produces 3 achievements. Do not merge or split. If the user finds it too detailed, they can ask to compress later. |
| **Star + quantified format** | Context → Action → Result, with base + delta + business impact. |
| **Verb-level honesty** | Use verbs matching actual ownership level. Never upgrade "参与" to "主导." |

**8. Output directory — per job posting:**

Each JD tailoring produces a new directory under `assets/`, named after the target role:

```
assets/douyin-strategy-ops/     ← per-job output
├── index.html
├── resume-data.js              ← tailored resume for THIS posting
├── script.js
└── themes/
```

`material-library/library-data.json` is global — it lives outside any single output and accumulates across all job applications.

**9. Preview before apply:** Present complete before/after comparison. Every changed field, every added number with its source label. User MUST approve before writing.

**10. After tailoring:** Update `meta.lastModified`. Write back to `library-data.json`.

**11. Save-back to role profile:**

After the user confirms the tailored resume, offer to save the rewritten achievements back to the library:

| Situation | Prompt | Action |
|-----------|--------|--------|
| Matched an existing role (e.g., "产品运营") | "是否用本次改写更新「产品运营」画像？" | If yes: overwrite that role's achievement overrides with tailored versions. If no: skip. |
| JD is a new role direction (e.g., "策略运营" not in library) | "是否新建「策略运营」画像并保存本次改写？" | If yes: create `roleProfiles["策略运营"]`, copy tailored achievements. If no: skip. |

This makes every job application an asset — next time the same role is targeted, Step 0 selects the role and retrieves the previously-tailored version, needing only minor tweaks.

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

> After JD tailoring: remind user to export PDF for submission. Mention self-intro generation for recruiter outreach.

## Workflow 5: Self-Introduction Generation

Generate a recruiter message (~240 Chinese characters) for BOSS直聘/WeChat/LinkedIn. **FIRST read `assets/template/self-intro-template.html`** — keep its CSS and layout exactly, replace placeholders with real data. Save to `self-intro.html`.

**5-paragraph structure:** P1 "招聘老师您好！" 姓名+学校+意向岗位 / P2 "在实习方面" 最JD相关实习 2-3条数据 / P3 "在项目上" 第二段实习+项目 / P4 "在技术能力上" 工具+cert / P5 "个人认为" 差异化标签×3 + "希望能和您进一步沟通～"

**Rules:** 2 most JD-relevant internships in P2, strongest first. Side projects distinct from work in P3. Every skill claim traceable to `resume-data.js`. Differentiator: 3-part "×" label with verifiable evidence. Include data traceability table and design notes (4 items max). End with "～". Formal "您".

> After self-intro: offer to export final PDF/PNG.

## Workflow: Material Library Management (素材库管理)

Manage the persistent material library. Read `material-library/library-data.json` → parse as JSON → operate on the data → validate JSON → write back. Data is a standalone JSON file, decoupled from the HTML editor shell.

| User says | Action |
|-----------|--------|
| "查看素材库" / "素材库有什么" / "library list" | List all entries compactly: ID, source name, type, top 3 capability tags, usage count, evidence strength. Use a table. |
| "查看 exp-XXX" | Show full detail of one entry: all fields, all tags, usage history, notes. |
| "添加经历" / "add to library" | Guided interactive: ask for company/role/period/achievements → auto-tag using role-competency-library.md → preview tags for user confirmation → append to library. |
| "删除 exp-XXX" / "remove" | Confirm with user, then remove entry by ID from `experiences[]`. |
| "素材库统计" / "library stats" | Show: total entries, entries per type, skill dimensions count, last modified date. |
| "新建岗位画像" / "create role profile" | Create a new role profile (e.g., "AI产品经理", "B端运营"). Experiences initialize from master. |
| "切换到 XX 岗位" / "switch role" | Switch active role profile. Subsequent edits save to that role's achievement overrides. |
| "从原始复制" / "copy from master" | Copy master achievements for a specific entry into the current role profile, so they can be rewritten independently. |

### Role Profiles（岗位画像）

Each role profile stores achievement overrides for experiences, keyed by experience ID. Profile doesn't exist = master achievements are used. This enables the same experience to have different narrative angles for different job types, without duplicating entries. Skill dimensions are shared across all roles.

```
roleProfiles: {
  "AI产品经理": {
    "exp-001": [{ label: "...", text: "产品视角描述..." }]
  }
}
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
  projects: [ /* { title, role, period, achievements: [{ label, text }] } */ ],
  skills: [ /* { label, text } */ ]
};
```

Guidelines:
- Each internship: `company`, `role`, `period` + **at least 2** achievements (2-3 total). Never let an internship appear with only 1 achievement — it makes months of work look like a single task. If compressing for space, compress the text length, not the achievement count. Each achievement covers one work activity; split mega-achievements that span multiple unrelated actions.
- Achievement label: short tag. Achievement text: one sentence with context + action + result.
- Projects: at least 2 achievements each — "项目背景" (context) + "关键产出" (outputs). Same `label` + `text` structure as internships.
- Skills (resume `skills[]`): 3-5 items with label + text. When writing skill descriptions, consult `references/skill-taxonomy.md` to enrich with specific application scenarios.
- Skills (library `skillDimensions[]`): Organized as capability dimensions with sub-skills. Each dimension: `{ name, items: [{ name, proficiency, description }] }`. This format is for the library editor UI — AI flattens to `skills[{label, text}]` when assembling resume-data.js.

## A4 Fit

The resume page is 210mm wide, min-height 297mm. Content flows naturally across multiple A4 pages when needed — no forced single-page constraint.

**A4 fit indicator (control panel):** The page calculates whether content fits within one A4 page. If content overflows, the indicator shows the estimated page count and a note that PNG capture only saves the first page.

**Content density guideline (single-page goal):** Internships should be the largest visual block. Body text ≥ ~8pt. If content fits in one page, ensure bottom whitespace is 12-45mm. Do NOT expand personal info just to fill space.

## Export

| Method | Format | Use Case |
|--------|--------|----------|
| 打印 / 导出 PDF | Vector PDF, multi-page A4, selectable text | Formal submission |
| 保存图片并复制 | 2x PNG of **first A4 page only** | Quick share via WeChat/chat |

PNG text is NOT selectable — not for formal submission. If content exceeds 1 page, remind the user to use PDF export for the full version.

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

