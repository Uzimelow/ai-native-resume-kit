# 产品迭代日志

记录 ai-native-resume-kit 从 v1 起的所有产品优化决策与改动。

---

## 2026-05-24 — v1 实验性分支启动

### 决策：建立安全开发分支

- **问题**：v1 已上线 GitHub 作为稳定版本，直接在 main 上迭代有破坏风险
- **决策**：创建 `v1-dev` 分支，所有实验性改动在此进行，稳定后再合入 main
- **结果**：main 分支保持可用状态，v1-dev 可自由实验

### 优化 1：SKILL.md 精简

- **问题**：SKILL.md 长达 604 行，其中 ~230 行是评估报告的 Markdown 伪代码，与 `report-template.html` 功能重复。AI 执行长指令容易漂移
- **决策**：删除伪代码结构，将分散的报告规则浓缩为 ~30 行的 Report Rules 章节；合并 Template Features → Overview；合并 Versioning and Output → Template Isolation；删除未实现的 Candidate Material Library 引用
- **结果**：604 行 → 302 行（-50%），所有工作流逻辑完整保留

### 优化 2：aiProjects → projects 字段重命名

- **问题**：模板简历数据字段叫 `aiProjects`，非 AI 岗位用户（咨询/金融/快消）会误以为工具不适用
- **决策**：重命名为 `projects`，同步修改 resume-data.js、script.js、index.html、SKILL.md
- **结果**：5 处引用全部更新，模板对全岗位通用

### 优化 3：CSS 主题架构重构

- **问题**：default.css（687 行）和 scholar.css（687 行）存在大量重复（控制面板、布局骨架、responsive、print 等 ~340 行完全或高度相同）。新增主题需复制 680+ 行
- **决策**：拆为三层 — `base.css`（366 行，共享结构）+ `default.css`（303 行，仅视觉差异）+ `scholar.css`（317 行，仅视觉差异）。index.html 加载 base.css + 主题 CSS
- **修复**：重构后 education-* 元素丢失 `margin: 0` 导致行距异常，补回 base.css
- **结果**：总行数 1374 → 986（-28%）。新增主题仅需写 ~300 行视觉代码

### 优化 4：素材库模式 (Material Library)

- **问题**：当前工作流是「一次性」的：每次新 JD 都要从原始 PDF/DOCX 重新提取、重新评估。一段实习经历在不同 JD 定制时无法复用
- **决策**：设计完整版素材库模式
  1. 创建 `material-library/library-data.js` — 结构化经历存储，每条携带能力标签（从 role-competency-library.md 的 36 类岗位模型提取）、行业标签、ownership level、证据强度、使用追踪
  2. SKILL.md 新增「Save to Material Library」工作流（AI 自动打标签入库）
  3. SKILL.md 新增「Library Management」工作流（查看/增删改/统计/重打标签）
  4. JD Tailoring 新增 Path D：素材库匹配（标签重叠 40% + 行业 15% + 级别 10% + 证据 15% + AI 语义 20% → 排序 → 用户确认 → 定制 → usage 追踪）
  5. 删除旧的 `references/candidate-material-library.md`（被完整实现替代）
- **结果**：用户三条路径 — A：一次性投递 / B：建素材库长期复用 / C：已有简历直接操刀

### 优化 5：用户指引体系

- **问题**：素材库模式引入后，用户有三条路径可选，但 README 是线性说明，AI 也没有路径判断逻辑，用户容易迷茫
- **决策**：三层指引
  1. README 快速开始改为场景→路径决策表（5 行，30 秒找到入口），替代原来的线性步骤说明
  2. SKILL.md 新增 Path Selection Logic：9 条优先级规则，AI 根据用户输入和环境状态自动判断走哪条路径
  3. 每个工作流末尾加内联提示（blockquote），引导用户走下一步
- **结果**：新用户打开 README 即知怎么开始；AI 能自动推路径，不再依赖用户说对 trigger 词

### 优化 6：累积改写 (rewrites)

- **问题**：素材库只存「元数据」（原文 + 标签），每次投不同岗位都要从同一段原始文本重新改写。AI 重复劳动，上一次改写出的好句子也浪费了
- **决策**：采用「元数据 + 累积改写」模式。素材库每条经历新增 `rewrites[]` 数组
  - 每次 Path D 定制完成后，改写版自动存回对应经历的 `rewrites[]`
  - 下次匹配时，如果某条经历有历史改写且目标岗位模型相同 → 匹配分 +0.10 → 标记「复用」→ AI 优先复用微调，不从零写
  - 原文 `content` 永不覆写，始终作为新岗位类型的改写起点
- **结果**：每次投递都在帮你积累素材。同一个岗位模型投 3 次，后 2 次几乎不用改写

### 优化 7：素材库按大类拆分

- **问题**：单体 `library-data.js` 所有经历混在一起。每投一个运营岗，AI 也要加载营销、技术等无关经历 — 浪费 token。且随着 `rewrites` 累积，单文件会越来越膨胀
- **决策**：按岗位大类拆分为独立文件
  1. `_profile.js` — 共享层（basics、education、skills、tagDictionary、categoryIndex）
  2. `<category>.js` — 每个大类独立文件（如 `运营大类.js`、`营销大类.js`），只含该方向的经历
  3. AI 加载策略：读 `_profile.js` → JD 匹配大类 → 只加载对应大类文件
  4. `crossRefs` 机制：如果经历标签覆盖多个大类（如运营经历也适用于产品），在本文件记录跨类引用。大类内匹配不足时跨文件补充
- **结果**：单个大类文件始终精简。AI 只加载 1 个 category file（~200 行）而非全量库（~400 行）。随着经历增多，token 节省效果递增

---

## 设计决策原则

以下原则贯穿所有迭代：

1. **真实性底线**：所有工作流不做经历编造、指标虚构、ownership 升级
2. **模板隔离**：`assets/template/` 只读，所有输出写入独立目录
3. **一次一处编辑**：简历内容集中在 `resume-data.js`（短期）/ `library-data.js`（长期）
4. **标签可溯源**：每条能力标签必须指向经历中的具体证据
