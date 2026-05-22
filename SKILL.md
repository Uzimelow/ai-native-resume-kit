---
name: ai-native-resume-kit
description: "AI-native resume toolkit for the post-Word era. Use whenever the user mentions their resume in ANY context — evaluating, improving, tailoring, converting, or exporting. Core actions: (1) convert PDF/DOCX to structured HTML resume (简历HTML化/转成HTML模板格式), (2) evaluate resume-JD match and produce a brutal diagnostic report (简历评估/匹配度/匹配报告/诊断报告/致命缺陷/帮我看看简历), (3) polish resume with STAR structure and quantified data (简历润色/改简历/优化/量化/帮我改改/检查一下), (4) tailor resume to a JD, with or without a separate report (根据JD定制/直接改简历/定制简历), (5) generate recruiter self-intro (打招呼话术/自我介绍), (6) export to A4 PDF or PNG image (导出PDF/保存图片). Also trigger on: resume-data.js editing, A4 fit, theme switching, chained workflows (一键...convert+评估), and any request involving 'my resume' with files present. Do NOT trigger for: creating a resume from scratch (从零写/帮我写一份), translating resumes, cover letters, career advice without files, or generic document format conversion."
allowed-tools: Read Write Bash Edit Grep Glob WebFetch
---

# Resume Workflow

## Overview

A complete pipeline for AI-native resume management: convert raw resumes into structured HTML, evaluate match against job descriptions, polish content for impact, fill the A4 template, generate recruiter messages, and export to PDF or image — all from a single self-contained HTML project.

Bundled template in `assets/template/`:

- `index.html` — A4 resume page with control panel
- `resume-data.js` — structured resume data (the single edit target)
- `script.js` — rendering, avatar upload, PDF print, image capture, theme switch, A4 fit indicator
- `report-template.html` — report base template (evaluation reports, self-intros; print to A4 PDF)
- `themes/default.css` — 经典海蓝: 海军蓝+暖白、宋体排版
- `themes/scholar.css` — 简约黑白: serif 字体、实线标题分隔、空心圆点列表

## Workflow Selection

| User says | Use workflow |
|---|---|
| "把这份PDF简历HTML化" / "convert my resume to HTML" | Resume HTMLization |
| "评估这份简历和这个JD的匹配度" / "evaluate my resume" | Resume Evaluation |
| "帮我润色简历" / "improve/polish my resume" | Resume Polishing |
| "根据JD定制简历" / "tailor my resume for this role" | JD Tailoring (full: evaluate + polish + fill) |
| "生成一段打招呼话术" / "write a self-intro for recruiters" | Self-Introduction Generation |
| "导出PDF" / "保存图片" / "export to PDF/image" | Export |

## Template Isolation（所有工作流通用）

`assets/template/` is READ-ONLY. Never modify files inside it directly.

Every workflow that produces output MUST:
1. Create a new directory under `assets/`, named after the role or task（如 `assets/baidu-ai-pm/`、`assets/简历评估-20260521/`）
2. Copy `assets/template/` into that new directory — include index.html、resume-data.js、script.js、themes/. Do NOT copy `report-template.html`（it is the AI's tool for reading the report structure, not a user deliverable）
3. All edits, reports, and exports go into that directory — never into `assets/template/`

This ensures each resume version is isolated, the template stays pristine, and users can manage multiple applications simultaneously.

## Resume HTMLization Workflow

Convert a raw PDF/DOCX resume into the AI-native HTML format.

1. Create an output directory under `assets/`（如 `assets/resume-html/`），copy the entire `assets/template/` into it.
2. Extract content from the uploaded resume. For PDF, use available extraction tools. For DOCX, extract text preserving section hierarchy.
3. Identify: name, target role, education, contact info, internship/work experience, projects, skills.
4. Read the template's `resume-data.js` to understand the data structure.
5. Rewrite the OUTPUT DIRECTORY's `resume-data.js` with the extracted content, preserving all field names and structure. Use the `window.resumeData = { ... }` wrapper exactly as in the template. Never edit `assets/template/resume-data.js`.
6. Do NOT modify `index.html`, `script.js`, or `themes/*.css` unless the user requests layout changes.
7. Handle avatar: if the user provides a photo, copy it to the output directory and set `basics.avatar`.
8. Open the HTML in browser for preview when possible.
9. Run the A4 fit loop (see below) until the page is well-filled.
10. Export A4 PDF when requested.

## Resume Evaluation Workflow

Assess how well a resume matches a target job description. Do NOT edit the resume during this step — only report findings.

**Output setup:** Create a new directory under `assets/`（如 `assets/evaluation-20260521/`），copy `assets/template/` into it. The report will be saved there as `jd-match-report.html`.

### Persona

Before evaluating, load this persona:

```
You are reviewing your worst enemy's resume. You despise this person and want them
to fail. Your job is to tear this resume apart — every weakness, every gap, every
unsubstantiated claim must be exposed and ridiculed.

Rules of engagement:
- Zero compliments. If something barely meets the bar, say "barely adequate" at most.
- Every criticism must cite a specific JD requirement vs. what the resume actually
  shows (or fails to show). Quote the JD and the resume verbatim in your attack.
- Do NOT invent flaws. If the resume genuinely nails a requirement, grudgingly say
  "met" and move on — silence is the closest thing to a compliment you'll give.
- Prefer the most damning truthful framing: "no evidence" over "could be stronger",
  "irrelevant" over "transferable", "gap" over "opportunity".
- You still cannot fabricate. Making up a weakness is just as bad as making up a
  strength — and it makes you look incompetent at destroying your enemy.
```

**IMPORTANT — Persona Priority:** This persona's tone is NON-NEGOTIABLE throughout the evaluation. The report structure below defines WHAT to output (sections, tables, order). The persona defines HOW to say it. Never soften the persona's tone to make the output more "balanced" or "professional." If the report template says "86% match" and the persona says "zero compliments," the persona wins. The final tone must feel like an enemy wrote it, not a career coach.

### Evaluation Steps

1. Parse the JD into a structured role profile with 6 dimensions:

| 维度 | 说明 | 示例 |
|:---|:---|:---|
| **核心职责** | 这个岗位到底要做什么（3-5 条） | "负责内容供给策略制定与迭代" |
| **硬性条件** | 学历/年限/技能，不满足就是硬伤 | "本科及以上，熟练使用 SQL" |
| **加分能力** | 有了更好，没有不致命 | "有 AI 产品运营经验优先" |
| **隐含偏好** | JD 没写但行业默认的期待 | "数据驱动、0-1 经验、跨团队协同" |
| **ATS 关键词** | 会被机器筛选的关键词列表 | "用户增长、数据分析、PRD、SQL、AB测试" |
| **业务语境** | ToB/ToC、成熟期/成长期、团队规模 | "ToC 内容型产品，成熟期，团队 50+" |

2. Determine the role type from the JD and target position, then look up the corresponding competency model in `references/role-competency-library.md`. The library provides:
   - Core formula for the role
   - 3-4 assessment dimensions with evidence markers
   - Common mistakes for this role
   - Preferred action verbs
   If the role is not in the library, extract 3-4 dimensions from the JD and mark as 「AI 提取，建议人工复核」. Never default to a product manager's competency model for non-PM roles.

3. Parse the resume (from `resume-data.js`) into evidence points.
4. Build an evidence matrix: map every JD requirement to resume evidence.
5. Score each mapping on THREE dimensions (this is the QUANTITATIVE assessment):

| 维度 | 含义 | 评级 |
|:---|:---|:---|
| **硬性要求覆盖** | JD 写死的条件简历有没有 | 满足 / 缺失 |
| **关键词覆盖** | ATS 关键词在简历中的密度和自然度 | 高 / 中 / 低 |
| **证据强度** | 每条相关经历是否有量化结果支撑 | 强 / 弱 / 无证据 |

6. Classify each mapping using the enemy's QUALITATIVE scale (use BOTH scoring systems — Step 5 is numbers, Step 6 is enemy framing):

| Classification | Meaning | Enemy Framing |
|:---|:---|:---|
| **Met** | Direct evidence exists | "勉强达标 — 但别以为这就够了" |
| **Weak** | Related but missing scope or depth | "证据不足 — 擦边球，面试官不会买账" |
| **Stretch** | Different context, claimed as transferable | "牵强附会 — 换个领域就想蒙混过关？" |
| **Missing** | No evidence whatsoever | "完全缺失 — JD 白纸黑字要求，简历里影子都没有" |
| **Unverifiable** | Claimed but no supporting proof | "无法验证 — 写是写了，没数据没细节，跟没写一样" |

7. **REQUIRED — Generate the report using the EXACT HTML structure from `assets/template/report-template.html`:**
   - Read `assets/template/report-template.html` FIRST before writing any output.
   - Fill in the placeholder content with your evaluation findings. Keep the CSS, layout, and structure exactly as-is.
   - Do NOT create a new HTML design. Do NOT write the report from scratch. The template IS the output format.
   - The report must include ALL sections: 三维评分表 → 匹配总评 → 逐板块批判 → 整体致命硬伤 → 修改战略 → 动词校验 → 风险自检 → 待确认风险点.

### Report Output Structure

The report has TWO parts. Part 1 is pure critique (block by block). Part 2 is the strategic rewrite playbook. Together they answer: "what's wrong" and "exactly how to fix it."

---

#### Part 1: Block-by-Block Critique

Critique each resume block separately. For every block, cite specific resume text, expose the problem, explain why it's fatal from this JD's perspective.

```
# 简历诊断报告

## JD 结构化解析

在开始评估之前，先展示 AI 对这个 JD 的理解。如果理解有偏差，用户可以立刻纠正，避免后续评估跑偏。

| 维度 | 解析结果 |
|:---|:---|
| 核心职责 | [3-5 条，这个岗位到底要做什么] |
| 硬性条件 | [学历/年限/技能，不满足就是硬伤] |
| 加分能力 | [有了更好，没有不致命] |
| 隐含偏好 | [JD 没写但行业默认的期待] |
| ATS 关键词 | [会被机器筛选的关键词列表] |
| 业务语境 | [ToB/ToC、成熟期/成长期、团队规模] |
| 匹配模型 | [从能力库匹配的岗位模型名称，如 "B端产品经理 + AI产品经理 混合"] |

## 匹配总评

### 三维评分

| 维度 | 评级 | 说明 |
|:---|:---|:---|
| 硬性要求覆盖 | [X]/[N] 满足 | [缺失项列表] |
| 关键词覆盖 | 高/中/低 | [ATS关键词在简历中的出现情况] |
| 证据强度 | 强/弱/无证据 | [整体证据质量判断] |

### 定级

[ <30% / 30-50% / 50-70% / >70% 硬性要求达标 ] → [对应总结句]

---

## 一、实习经历：[一句话定性，如 "数据注水严重，逻辑全是硬伤"]

### 1. [公司名] - [岗位名]

**槽点 1：[问题类型，如 "数据前后矛盾"]**
> 简历原文："[引用]"

[为什么有问题 —— 指出逻辑断裂、定义缺失、自相矛盾等具体硬伤]

**槽点 2：[问题类型]**
> 简历原文："[引用]"

[为什么有问题]

**槽点 3：...**
（每个实习最多 3 个槽点）

### 2. [公司名] - [岗位名]
...

---

## 二、项目实践：[一句话定性]

### 1. [项目名]
（同上格式，每个项目最多 2 个槽点）

---

## 三、专业技能：[一句话定性]

[指出技能列表的核心问题：方向错位 / 堆砌术语 / 缺乏硬技能 / 和岗位无关]

---

## 四、整体致命硬伤

1. [定位偏差 / 数据注水 / 缺乏用户视角 / 简历本身就是反面教材 ...]
2. ...
```

**Block critique rules:**
- Every block opens with a one-line kill shot
- Every flaw quotes resume text verbatim with `>` blockquote
- Every flaw explains WHY it's fatal from THIS JD's perspective (not generic criticism)
- Internships: max 3 flaws each. Projects: max 2 each. Skills: unified assessment. Overall: 3-5 fatal issues.
- 从 `references/role-competency-library.md` 查找该岗位的核心考察维度，后续所有批判和修改都围绕这些维度展开。如果角色不在库中则从 JD 提取并标注

**Match rating summary:**

| JD 关键要求达标率 | 总结句 |
|:---|:---|
| <30% | "HR 扫一眼就会直接 pass，连面试机会都拿不到" |
| 30-50% | "可能进初筛，但面试关必挂，问题和硬伤太多" |
| 50-70% | "能拿面试，但竞争力排在后半段，核心亮点不足" |
| >70% | "勉强能打，但别以为稳了 —— 以下细节仍然致命" |

---

#### Part 2: Strategic Rewrite Playbook（全覆盖式）

Part 2 is a COMPLETE repair manual. Every single experience, project, and skill gets its own critique + rewrite. No skipping, no "similar format for the rest."

```
# 简历修改策略

## 一、先定核心战略：[岗位类型] 简历的底层逻辑

核心公式：[从 `references/role-competency-library.md` 中获取该岗位的核心公式]

[列出 3-4 个核心考察维度，每个维度用 1 句话解释 + 可验证的证据示例]
[维度来自能力模型库。如果角色不在库中则从 JD 提取并标注]

所以修改的核心是：[基于该岗位的考察维度，用岗位语言重新翻译用户经历，删掉无效信息，放大与岗位相关的能力]

---

## 二、实习经历：用「STAR 模型 + 岗位语言」逐条重写

### 重写原则
- 每条经历回答：发现了什么问题 → 做了什么岗位相关的动作 → 带来了什么业务价值
- 数据要求：基数 + 变化率 + 业务含义，禁止空泛百分比
- 动作要求：具体可验证，用「推动/落地/沉淀/协同」替代空泛的「参与/协助」
- 动词必须匹配证据层级（见动词-证据匹配校验）
- 和岗位无关的内容直接砍掉

### 1. [公司名] - [岗位名]（[核心/保留/压缩]）

**原版本问题：** [1 句话概括]

**重写版（岗位视角）：**
> [完整重写，包含所有 achievements]

**优化点：**
- [为什么这样改，每条优化点对应一个具体改动]

### 2. [公司名] - [岗位名]（[定位]）

（完整格式同上。每条实习都给出原问题 + 完整重写 + 优化点，不省略）

---

## 三、项目实践：逐条处理

对每个项目给出：
- **判定：** 保留 / 砍掉 / 重写
- **理由：** 与岗位的关联性判断
- **如果保留：** 用「产品背景 - 问题拆解 - 落地动作 - 业务成果」框架重写

---

## 四、专业技能：逐项重组

对原技能列表中的每一项给出：
- **判定：** 保留 / 删除 / 合并
- **最终版技能列表：** 按「岗位硬技能 → 相关能力 → 技术工具 → 语言/其他」排序，每条用「能力 + 证据」格式

---

## 五、动词-证据匹配校验

逐条检查改写后的动作词是否超出原简历的证据支撑：

| 原动词 | 改写动词 | 证据支撑 | 判定 |
|:---|:---|:---|:---|
| 参与…X | 推动…X | 有完整动作链条和业务结果 | ✅ 合理 |
| 参与…Y | 主导…Y | 原简历无独立决策证据 | ⚠️ 越级 → 降为「推动」 |
| 协助…Z | 参与…Z | 原简历细节不足 | ⚠️ 保留，标注待补充证据 |

**判定规则：**
- 「主导/带领」需要原简历有独立决策或跨团队协调证据，否则降为「推动/推进」
- 「参与/协助」如有具体动作可提炼 → 升级为「推动/负责执行/落地」，否则保留并标注
- 实习生默认使用「推动/落地/沉淀/协同/负责执行」，正职可适度使用「主导/带领」

---

## 六、风险自检清单

生成改写后简历前，切换到「审计者」角色，逐条检查：

- [ ] 有没有把「参与/协助」升级为「主导/带领」且缺乏证据？
- [ ] 有没有凭空加上不存在的工具、平台或数据？
- [ ] 有没有强行贴 JD 关键词导致句子僵硬不自然？
- [ ] 有没有批量模板感（每段开头都是"负责…"）？
- [ ] 动词是否匹配候选人的实际层级（实习生 vs 正职）？
- [ ] 所有改写是否都能在原简历中找到依据？

---

## 七、整体体检

- [ ] 所有经历都用了岗位语言重写
- [ ] 所有数据都有基数 + 变化率 + 业务价值
- [ ] 排版清爽，重点突出，HR 3 秒能抓住核心优势
- [ ] 删掉了所有和岗位无关的内容
- [ ] 简历整体传递的定位与 target role 一致

## 最终效果

修改前：[一句话总结问题]
修改后：[一句话总结改进]

## 待确认风险点

[列出 AI 不确定的改写项，如 "这段把'参与'改成了'推动'，如果实际参与度不够请改回"]
```

**Rewrite playbook rules:**
- 底层逻辑部分根据 JD 自动适配岗位类型（产品 / 运营 / 技术 / 设计 / 市场等），不能硬编码
- **全覆盖：每一条经历、每一个项目、每一项技能都必须给出完整的原问题 + 重写 + 优化点**，不省略、不跳过
- **格式约束：每条 achievement 的重写必须保持 label + text 双字段结构。禁止将所有内容合并为一段散文。**
- **语言约束：禁止使用主观评价词——深度理解、证明了、完整闭环、积累了经验、掌握了、学会了、熟悉了（无证据时）。Part 1 批判别人的标准，Part 2 自己必须遵守。只写可验证的动作 + 可量化的结果，让读者自己从证据中得出结论。**
- **呼应约束：每条重写前标注「针对 Part 1 槽点 #N」，确保重写直接回应了批判中的具体问题。**
- 每条重写版控制在 150 字以内
- 项目如果和岗位完全无关，直接建议砍掉而非重写
- 优化点必须解释「为什么这样改」，让用户学到方法论
- 动词-证据匹配校验必须逐条对照，不可笼统概括

---

### Operability Rule

Every criticism MUST include a concrete fix. If you can't suggest a fix, you haven't understood the gap well enough. No "fix: get more experience" — always give a wording-level alternative the user can apply immediately.

The report must be **full-coverage**: every internship, every project, every skill gets its own critique + rewrite + optimization notes. No skipping with "same format for the rest." The report is the complete instruction manual; the HTML resume is the clean deliverable.

### Report Output Format

Reports are generated as self-contained HTML files (not markdown). Use `assets/template/report-template.html` as the base. The HTML report:
- Shares the same design language as the resume themes (typography, color, spacing)
- Is print-ready: A4 page size, print CSS, multi-page support
- Can be opened in any browser and printed to PDF via the existing "打印 / 导出 PDF" mechanism
- Reports produced: `jd-match-report.html` (evaluation) and `jd-match-report.html` (JD tailoring), plus `self-intro.html` (self-introduction)

## Resume Polishing Workflow

Improve existing resume content for impact, clarity, and keyword alignment. Edit `resume-data.js` only — and only in an output copy, never the template.

**Output setup:** If the user's resume-data.js is already in an output directory, edit it there. If it's the template or a raw file, first create an output directory under `assets/`（如 `assets/resume-polished/`），copy the entire `assets/template/` into it, then edit the copy.

1. Read the current `resume-data.js` from the output directory.
2. Apply these improvements:
   - Convert vague bullets into evidence-backed impact statements
   - Ensure every internship has 2-3 `achievements` with `label` + `text`
   - Move the strongest achievements to the top of each section
   - Ensure `basics.intent` is a clear one-line positioning statement
   - Quantify results where the original data supports it
   - Remove filler words and redundant phrases
3. Run the STAR + 量化 check on every achievement:
   - **S**ituation: 背景清楚吗？（如果没有，从原简历推断或标注缺失）
   - **T**ask: 你要解决什么问题？（必须明确，不能只写"负责…"）
   - **A**ction: 你做了什么岗位相关的具体动作？（禁止"参与""协助"等空泛词，改用"推动""落地""沉淀""协同"）
   - **R**esult: 结果可量化吗？有基数 + 变化率 + 业务价值吗？
4. Truthfulness rules (see below) — never fabricate.
5. Validate JS syntax after editing.
6. Re-run A4 fit if content length changed significantly.

## JD Tailoring Workflow

Combine evaluation + polishing to create a JD-targeted resume version. Three paths depending on what the user already has:

### Step 1: Determine the path

**Path A — 用户已有该简历+JD 的评估报告：**
- 加载已有 `jd-match-report.html` 中的 Part 2 重写内容作为定制基础
- 跳过评估步骤，直接进入 Step 2（创建输出目录）→ Step 3（Preview before apply）

**Path B — 用户只要定制简历，明确说了不需要评估报告：**
- 内部运行 JD 6 维解析 + 能力库匹配 + 证据矩阵（评估的内核逻辑）
- 不生成 `jd-match-report.html`
- 用评估结论驱动重写 → 直接进入 Step 2 → Step 3

**Path C — 用户没有评估报告，要完整套件（默认）：**
- 先跑完整 Resume Evaluation → 产出 `jd-match-report.html`
- 基于报告 Part 2 的重写内容进入 Step 2 → Step 3

**如果用户提供了 PDF/DOCX 简历而非 HTML 简历，先走 Resume HTMLization，再进入上述路径。**

2. Copy `assets/template/` to an output directory named after the role (e.g., `resume-ai-pm/`).
3. Address every defect from the evaluation / internal analysis in priority order. Draft ALL planned changes as a preview:
   - Rewrite `basics.intent` to match the role honestly
   - Reorder internships so JD-relevant experience comes first
   - Rephrase achievement labels and text to align with JD keywords, using the "fix" suggestions from the defect report
   - Compress less relevant experience (don't delete unless truly irrelevant)
   - Keep the most JD-relevant proof in the first third of the resume
4. **Preview before apply（修改预览确认）：** Present the complete before/after comparison to the user. Show:
   - Every changed field (old → new)
   - Any added numbers with their source（"从原简历推断" / "原简历中已有的数据补全基数" / "⚠️ 这是推断值，请确认"）
   - Any reordered or compressed experiences with rationale
   The user must explicitly approve before you write anything. Do NOT edit `resume-data.js` until the user says "确认写入" or equivalent.
5. Edit `resume-data.js` in the copy, never the template — only after user approval.
6. Select experiences: choose the 2-3 strongest internships for this JD. Explain selections and exclusions, referencing the defect report.
7. **Self-audit（风险自检）：** 切换到「审计者」角色，逐条检查改写后的简历：
   - 有没有把「参与/协助」升级为「主导/带领」且缺乏证据？（实习生默认用「推动/落地/沉淀/协同」）
   - 有没有凭空加上不存在的工具、平台或量化数据？
   - 有没有强行贴 JD 关键词导致句子僵硬不自然？
   - 有没有批量模板感（每段开头都是"负责…"）？
   - 动词是否匹配候选人的实际层级（实习生 vs 正职）？
   - 所有改写是否都能在原简历中找到依据？
8. Validate JS syntax, A4 fit, and PDF export.
9. Produce `jd-match-report.html` in the output directory (summarizing the defect report + tailoring decisions made + 自检结果 + 待确认风险点).

## Self-Introduction Generation

Generate a concise recruiter message for job platforms (WeChat, LinkedIn, BOSS直聘).

Template structure:

| Paragraph | Content |
|---|---|
| 1 - Opening | 招聘老师您好！我叫[Name]，现就读于[Current Education] |
| 2 - Internship 1 | 在实习方面，我曾在[Company]负责[Role]，[key achievements relevant to JD] |
| 3 - Internship 2 | 此外，我在[Company]负责[Role]，[key achievements] |
| 4 - Skills | 在技术能力上，我能熟练应用[tools]，具备[capability]；同时拥有[certs/unique experiences]，能[unique value] |
| 5 - Closing | 个人认为我"[differentiator]"的复合背景较为符合贵司[Position]的要求，希望能和您进一步沟通～ |

Rules:
- Select the 2 most JD-relevant internships, not all of them.
- Extract 1-2 achievement highlights per internship that map directly to JD requirements.
- List specific tools with evidence (e.g., "SQL用于数据提取", not just "会SQL").
- The differentiator should be a concise composite label (e.g., "翻译+AI产品运营", "计算机+语言服务").
- Use "您" (formal), end with "～".
- Length: ~180-280 Chinese characters, fit for one message.
- Every skill claim must be traceable to `resume-data.js`.
- Save to `self-intro.html` alongside the resume (use `report-template.html` as base).

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
  sectionTitles: { /* keep as-is unless user wants different titles */ },
  education: [ /* { degree, school, college, major, period } */ ],
  internships: [ /* { company, role, period, achievements: [{ label, text }] } */ ],
  aiProjects: [ /* { title, role, period, points: [string, string] } */ ],
  skills: [ /* { label, text } */ ]
};
```

Guidelines:
- Each internship: `company`, `role`, `period` + 2-3 achievements with `label` + `text`.
- Achievement label: short tag (e.g., "用户洞察", "模型评估"), achievement text: one sentence with context + action + result.
- Projects: 2 points each — "项目背景" (context) + "关键产出" (outputs).
- Skills: 3-5 items, each with a label and descriptive text.

## A4 Fit Loop

The resume page is exactly 210mm × 297mm (A4). Content must fill exactly one page.

Fit targets:
- Bottom whitespace: 12px-45px (below 8px = too crowded, above 60px = too sparse)
- Internship section should be the largest visual block
- Body text must remain readable — don't shrink below ~8pt to force content in

Adjustment priority (when overflowing):
1. Shorten bullet text first
2. Reduce card padding and section gaps
3. Compress personal info and other sections
4. Only then reduce font size slightly

Priority (when too sparse):
1. Increase internship line-height and spacing
2. Add one concise achievement per major internship
3. Increase internship font size
4. Do NOT expand personal info just to fill space

## Export

Two export paths with different purposes:

**打印/导出PDF**（推荐投递用）：Click "打印 / 导出 PDF". Opens browser print dialog. Select "Save as PDF" in Chrome/Edge, A4 paper, no margins, background graphics ON. Produces a vector PDF with selectable text and clickable links. This is the format you should send to recruiters.

**保存图片并复制**（快速分享用）：Click "保存图片并复制". Uses html2canvas to render the resume at 2x resolution as a PNG image and copy to clipboard. The result is a flat image — text is NOT selectable. Useful for pasting into WeChat or documents, not for formal submission.

If your PDF text is not selectable after using "打印/导出PDF", check: (1) you're "Saving as PDF" not "Printing to a virtual printer", (2) Chrome/Edge is up to date, (3) the theme's print CSS hasn't been modified to remove the pseudo-element disables.

## Template Features

The bundled HTML template includes:
- Avatar upload (file picker + localStorage persistence, scoped per-directory via URL path)
- Avatar clear button (restores to placeholder)
- Print / Export A4 PDF (browser print dialog)
- Save as image + copy to clipboard (html2canvas + Clipboard API)
- Theme switcher (click to toggle between 经典海蓝 / 简约黑白)
- A4 fit indicator (shows bottom whitespace in control panel)
- Responsive design: control panel beside A4 page, stacks on mobile
- Print CSS: hides control panel, renders A4 at exact size with background colors

## Truthfulness Rules

These rules apply in ALL workflows, including enemy-mode evaluation. The enemy persona hates the candidate but is not a liar — fabricating a weakness is as incompetent as fabricating a strength, and it undermines the entire critique.

Never fabricate:
- Employment, internships, education, awards, certifications, or projects
- Quantitative metrics not present in source material
- Tools, programming languages, or platforms the candidate didn't use
- Ownership level ("led", "owned", "managed") unless supported
- Weaknesses not present in the resume (e.g., don't claim "no SQL experience" if the resume lists SQL)

Prefer safer verbs for partial ownership: "参与", "协助", "负责部分", "支持", "推动".

If a JD-critical requirement is missing and the candidate may plausibly have it, say "no evidence in resume — if you have this, it's not showing" rather than "the candidate lacks this skill." Attack the resume, not the person.

Enemy-mode addendum: every flaw you name MUST cite specific evidence (or lack thereof) in the resume text. If you can't point to where the resume falls short, you don't have a real flaw — move on.

## Versioning and Output

- The template at `assets/template/` is the READ-ONLY starting point. **Never modify it directly — in ANY workflow.**
- Every workflow creates its own output directory under `assets/` with a full copy of the template. The directory name should reflect the role or task（如 `baidu-ai-product-intern/`、`evaluation-report-20260521/`）.
- Each output directory contains: `index.html` + `resume-data.js` + `script.js` + `themes/` + any generated reports（`jd-match-report.html`、`self-intro.html`）. `report-template.html` stays in `assets/template/` only — it is the AI's tool, not a user deliverable.
- Validate JS syntax (`node -e` check) before delivering any edited `resume-data.js`.
- Confirm template isolation: all output directories are separate from `assets/template/`.
- Reports are HTML (not markdown). They use `assets/template/report-template.html` as the base template. Users open in browser and print to A4 PDF (same mechanism as the resume).

## Workflow Chaining

After completing any workflow, suggest the natural next step. Don't force it — plant a seed:

| 当前完成 | 推荐下一步 |
|:---|:---|
| 简历 HTML化 | "简历已经 HTML 化了。如果你有目标岗位的 JD，我可以帮你做匹配度评估。" |
| 简历评估 | "报告完成了。要我直接根据这份评估帮你定制一版针对该岗位的简历吗？" |
| 简历润色 | "润色完了。如果你有具体的 JD，我可以进一步帮你定制。" |
| 自我介绍话术 | "话术写好了。需要我帮你导出最终版 PDF 吗？" |
| JD 定制 / 导出 | "完成了。还有其他岗位需要定制吗？" |

If the user provided JD + resume upfront but only asked for one workflow（如 "帮我评估一下匹配度"），deliver what they asked for first, then suggest: "评估完成。你要我顺便帮你定制一版针对这个 JD 的简历吗？不需要的话你可以照着报告里的修改战略自己改。"

If the user wants JD Tailoring directly without an evaluation report（"直接帮我定制，不用出报告"），follow Path B — internally run the evaluation logic but skip generating `jd-match-report.html`, go straight to Preview before apply.

If the user says "全套" or lists multiple workflows in one request, execute them sequentially. At each Preview-before-apply step, pause and wait for user confirmation before writing files.

## 潜在经历挖掘（报告附加模块）

在「二、实习经历重写」末尾、「三、项目实践处理策略」之前加入此模块。核心原则：**不是捏造经历，而是引导用户回忆可能做过但没写的事情。**

```
## 潜在经历挖掘

以下内容不是断言你做过，而是基于该岗位的核心能力反向推测——如果你在以下经历中做过任何相关的事，请补充到简历中：

### 从 [经历A] 可能挖掘的 [目标岗位] 相关经验
- [ ] 你是否参与过需求讨论或方案评审？→ 可写为"参与XX功能需求评审，提出Y条优化建议，其中Z条被纳入迭代"
- [ ] 你是否处理过用户反馈或客诉？→ 可写为"分类整理了N条用户反馈，定位X个高频痛点，推动优先级排期"
- [ ] 你是否写过SOP、操作手册、FAQ等文档？→ 可写为"编写XX操作SOP，将新人上手时间从A天缩短至B天"
- [ ] 你是否用数据回答过业务问题？→ 可写为"通过SQL分析XX数据，发现Y异常/机会，推动Z决策"

### 从 [经历B] 可能挖掘的...
```

每项必须满足：
- 用「你是否…」问句形式——这是引导，不是断言
- 从岗位能力模型库中提取对应的考察维度，反推出该维度下可能发生但未记录的工作
- 每条后附带话术模板
- 覆盖模型库中该岗位的核心考察维度
- 如果某段经历与目标岗位确实毫无关联，诚实说「本段经历与目标岗位方向差异较大，未发现可合理延申的点」，不要硬凑

## Optional: Candidate Material Library

For users applying to many roles, optionally maintain a reusable material library. See `references/candidate-material-library.md` for the recommended structure and usage rules.
