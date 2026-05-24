# Material Library（素材库）

把简历中的每条经历拆成带能力标签的结构化「素材卡片」。遇到新 JD 时，AI 自动从素材库中匹配最相关的经历、选取、改写、填充简历模板。

## 文件结构

```
material-library/
├── _profile.js      # 共享元数据：basics、education、skills、tagDictionary、categoryIndex
├── 运营大类.js       # 运营方向经历（产品运营/用户运营/内容运营/AI产品运营 等 15 个子模型）
├── 营销大类.js       # 营销方向经历（市场营销 等）
├── 产品大类.js       # 产品方向经历（C端/B端/AI/策略/数据产品经理 等 6 个子模型）
│ ...                 # 其他大类按需创建：市场大类、技术大类、分析大类、设计大类、人力大类
└── README.md
```

- `_profile.js`：所有类别共用，只加载一次
- `<category>.js`：AI 按 JD 岗位模型只加载对应的大类文件，精准控制 token 消耗
- 新大类文件在 AI 入库时按需创建

## 数据模型

### `_profile.js` — 共享层
- `basics` + `education`：稳定不变的个人背景
- `skills[]`：技能清单，每条标记 `category`（归属大类）或 `_universal`（所有岗位通用）
- `categoryIndex`：所有大类文件的索引，AI 通过它找到正确的类别文件
- `tagDictionary`：所有可用标签，从 `references/role-competency-library.md` 提取

### `<category>.js` — 经历层
每条经历包含：
| 字段 | 说明 |
|------|------|
| `source` | 来源信息：公司/项目名、岗位、时间 |
| `content` | 原始经历文本 |
| `tags` | 能力标签、行业、级别、ownership |
| `evidence` | 证据强度、量化数据、关键指标 |
| `rewrites[]` | 累积改写：每次 JD 定制后自动存回，下次同类型岗位微调复用 |
| `usage` | 使用追踪 |
| `notes` | AI 备注 |
| `crossRefs` | 跨界引用：如果经历标签也覆盖其他大类，在此记录以便跨类匹配 |

## AI 工作流

1. **入库**：说「把简历存入素材库」→ AI 逐条打标签 → 按岗位模型分入对应大类文件 → 自动生成 crossRefs
2. **匹配**：说「从素材库匹配这个 JD」→ 加载 `_profile.js` + 对应大类文件 → 匹配（有历史改写自动加分）→ 排序 → 你确认 → 改写 → 填模板 → **改写版自动存回**
3. **管理**：说「查看素材库」「删除 exp-XXX」「编辑 exp-XXX 标签」「素材库统计」

## 为什么按大类拆分

- **Token 精准**：投运营岗只加载运营大类文件，不加载无关的技术、设计经历
- **上限可控**：每个大类文件仅包含对应方向的经历和改写，不会无限制膨胀
- **跨界支持**：crossRefs 机制让可迁移经历在多个大类间复用，不割裂

## 手动编辑

所有文件都是标准 JS，可以直接编辑。注意保持对应的 `window.materialProfile` / `window.materialLibrary_<category>` 外层结构不变。
