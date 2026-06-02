# Material Library（素材库）

把简历中的每条经历拆成带能力标签的结构化「素材卡片」。遇到新 JD 时，AI 自动从素材库中匹配最相关的经历、选取、改写、填充简历模板。

## 文件结构

```
material-library/
└── library.html     # 唯一的文件 — 既是数据存储，也是可视化编辑器
```

浏览器打开 `library.html` 可以：
- 查看所有经历和技能，按大类筛选
- 展开/折叠每条经历的详情（achievements、标签、证据评估、使用追踪、累积改写）
- 通过 File System Access API 直接保存修改（或下载替换）

AI 读取时：解析 `<script id="library-data">` 块中的 JSON，和以前读 `.js` 文件完全一样。

## 数据模型

### `profile` — 不变的个人背景
- `basics`：姓名、求职意向、学校、联系方式
- `education`：教育经历列表

### `experiences[]` — 核心素材卡片
每条经历包含：id、type、source（公司/项目名/岗位/时间）、content（原文）、tags（能力标签/行业/级别/ownership）、evidence（证据强度/量化数据）、usage（使用追踪）、rewrites（累积改写）、notes（AI备注）

### `skills[]` — 技能清单
每条技能含：proficiency（精通/熟练/掌握/了解）、evidenceRefs（引用经历ID）

### `tagDictionary` + `categoryIndex`
所有可用标签 + 大类索引（用于侧边栏导航和 JD 匹配）

## AI 工作流

1. **入库**：AI 读取 `library.html` → 解析 `<script id="library-data">` → 追加经历 → 序列化写回
2. **匹配**：AI 读取数据 → JD 匹配 → 选取经历 → 定制 → 改写版自动存回 `rewrites[]`
3. **管理**：说「查看素材库」「删除 exp-XXX」→ AI 操作数据后写回

## 手动编辑

浏览器打开 `library.html` → 可视化浏览/编辑 → 点击「保存到文件」→ 选择同一个 `library.html` → 直接写入。如果浏览器不支持直接写入，自动触发下载。
