# Material Library（素材库）

浏览器打开 `library.html` — 既是数据存储，也是可视化编辑器。

## 文件结构

```
material-library/
└── library.html     # 唯一的文件 — 数据 + 编辑器
```

## 编辑器

两个 Tab：
- **素材条目** — 全部 / 实习 / 项目 筛选，点击卡片可直接编辑 achievements
- **技能画像** — 按能力大类分组，每条子技能带名称、熟练度、描述

编辑后通过 File System Access API 直接保存（或下载替换）。

## 数据模型

### `profile` — 不变的个人背景
- `basics`：姓名、求职意向、学校、联系方式
- `education`：教育经历列表

### `experiences[]` — 素材条目
统一使用 `content.achievements[{label, text}]` 格式，实习和项目结构一致。
- `id`、`type`（internship | project）、`source`（公司/项目名/岗位/时间）
- AI 入库时读 `references/role-competency-library.md` 了解岗位语境，但不存储形式化标签

### `skillDimensions[]` — 技能画像
- `{ name: "产品技能", items: [{ name: "PRD撰写", proficiency: "熟练", description: "..." }] }`

## AI 工作流

1. **入库**：AI 读取 `resume-data.js` → 解析 achievements → 写入 `experiences[]` → 拆分技能树写入 `skillDimensions[]`
2. **匹配**：JD 解析 → AI 逐条语义判断经历相关性 → 排序 → 用户确认 → 定制 → 输出
3. **管理**：说「查看素材库」「删除 exp-XXX」→ AI 操作 library.html
