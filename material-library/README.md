# Material Library（素材库）

把简历中的每条经历拆成带能力标签的结构化「素材卡片」。遇到新 JD 时，AI 自动从素材库中匹配最相关的经历、选取、改写、填充简历模板。

## 为什么用素材库

- **一次入库，反复使用**：不用每次从 PDF 重新提取和对齐
- **一段经历，多种叙事**：同一段实习可以按产品/增长/运营/商业化等不同角度改写
- **标签驱动匹配**：每条经历绑定能力维度标签，匹配不是关键词撞运气，而是岗位模型 × 证据矩阵
- **证据溯源**：每条经历记录 ownership level 和量化指标，改写时不越级不编造

## 文件结构

```
material-library/
└── library-data.js  ← 唯一数据文件，AI 读写，你也可以手动编辑
```

## 数据模型概览

### `profile` — 不变的个人背景
- `basics`：姓名、求职意向、学校、联系方式
- `education`：教育经历列表

### `experiences[]` — 核心素材卡片
每条经历包含：
| 字段 | 说明 |
|------|------|
| `id` | 唯一标识（exp-001, proj-001 ...），交叉引用用 |
| `source` | 来源信息：公司/项目名、岗位、时间 |
| `content` | 原文内容：achievements（实习）或 points（项目） |
| `tags.capability` | 能力标签，格式 `{ role: "岗位模型", dimension: "具体维度" }` |
| `tags.industry` | 行业标签 |
| `tags.roleLevel` | 级别：intern / junior / mid / senior / lead |
| `tags.ownership` | 参与程度：主导 / 推动 / 协同 / 落地 / 参与 / 协助 / 支持 / 负责 |
| `evidence` | 证据评估：strength、是否有量化数据、关键指标摘要 |
| `usage` | 使用追踪：被多少份定制简历用过、最近使用时间、投过哪些岗位 |
| `notes` | AI 备注：适配弹性、改写建议、注意事项 |

### `skills[]` — 技能清单
- `proficiency`：精通 / 熟练 / 掌握 / 了解
- `evidenceRefs`：引用经历 ID，证明这项技能有对应经历支撑

### `tagDictionary` — 标签字典
从 `references/role-competency-library.md` 提取所有岗位模型和对应的能力维度。编辑标签时应优先使用已有标签，避免同义不同名。

## AI 工作流

1. **入库**：说「把简历存入素材库」，AI 会读取当前 `resume-data.js`，逐条打标签后写入 `library-data.js`
2. **匹配**：说「从素材库匹配这个 JD」，AI 会解析 JD → 匹配经历 → 排序呈现 → 你确认 → 改写 → 填模板
3. **管理**：说「查看素材库」「删除 exp-XXX」「编辑 exp-XXX 标签」「素材库统计」

## 手动编辑

`library-data.js` 是标准 JS 文件，可以直接用文本编辑器修改。注意：

- 保持 `window.materialLibrary = { ... }` 外层结构不变
- 新增经历时，`id` 建议沿用 `exp-NNN` / `proj-NNN` 格式
- 标签尽量从 `tagDictionary` 中选取，保持一致性
- 修改后 AI 读取时如遇语法错误会提示
