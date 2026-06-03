# Material Library（素材库）

浏览器打开 `library.html` 进入编辑器，选择 `library-data.json` 加载数据。数据与 UI 分离。

## 文件结构

```
material-library/
├── library.html          # 编辑器 UI（纯壳，无内嵌数据）
└── library-data.json     # 结构化素材数据（JSON）
```

## 首次使用

1. 浏览器打开 `library.html`
2. 页面显示引导：点击「选择 library-data.json」
3. 选中 `library-data.json` → 进入编辑器
4. 之后所有编辑自动保存，再次打开时自动恢复

## 编辑器

两个 Tab：
- **素材条目** — 全部 / 实习 / 项目 筛选 + 岗位画像切换
- **技能画像** — 按能力大类分组，可折叠，子技能上下排列

编辑通过 File System Access API 直接写入 JSON 文件。不支持 FSA 的浏览器可下载文件手动替换。

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
