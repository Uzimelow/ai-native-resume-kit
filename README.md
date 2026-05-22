# AI Native Resume Kit

> 把 PDF / DOCX 简历转换成 AI 可编辑、可预览、可导出 A4 PDF 的 HTML 简历，并支持根据 JD 定制、评估匹配度、润色优化、生成打招呼话术。

[在线 Demo](https://uzimelow.github.io/ai-native-resume-kit/assets/template/index.html)

---

## 它能做什么

- **简历 HTML 化** — PDF / DOCX → 结构化 HTML，内容集中在 `resume-data.js`，AI 一键修改
- **JD 匹配评估** — 六维 JD 解析 + 岗位能力模型 + 证据矩阵，产出带批判性诊断的评估报告
- **简历润色** — STAR 结构重写 + 量化数据补全，每段经历可审核可追溯
- **JD 定制** — 基于评估结果重排经历顺序、强化匹配关键词、压缩弱相关内容，生成定制版简历
- **打招呼话术** — 生成 180-280 字的中文招聘平台自我介绍
- **A4 PDF 导出** — 严格 210mm×297mm，一页填充，矢量文字可选
- **PNG 图片复制** — 一键渲染 2x 分辨率图片到剪贴板，快速分享
- **双主题切换** — 经典海蓝 / 简约黑白，在线切换即时预览

---

## 快速开始

### 如果你是 Claude Code 用户

1. 将 `ai-native-resume-kit.skill` 安装到 Claude Code 的 Skills 目录
2. 把你的 PDF/DOCX 简历拖进对话，说：

   > 帮我把这份简历 HTML 化

3. 有目标岗位时，继续：

   > 这是 JD，帮我评估匹配度 / 定制一版简历

Skill 会自动读取、填充模板、在浏览器中预览，并调整内容至 A4 一页填满。详细用法见 [SKILL.md](SKILL.md)。

### 如果你是普通用户（不用 AI）

1. 复制 `assets/template/` 到新目录
2. 编辑 `resume-data.js`，替换示例数据为你的真实经历
3. 浏览器打开 `index.html`，即可预览
4. 点击「打印 / 导出 PDF」保存 A4 PDF

---

## 仓库结构

```text
.
├── ai-native-resume-kit.skill   # 打包的 Skill 文件
├── SKILL.md                     # Skill 完整说明（工作流细节）
├── references/
│   └── role-competency-library.md  # 岗位能力模型库
└── assets/
    └── template/
        ├── index.html            # A4 简历页面 + 控制面板
        ├── resume-data.js        # 结构化简历数据（唯一编辑目标）
        ├── script.js             # 渲染、上传、导出、主题切换
        ├── report-template.html  # 评估报告模板
        └── themes/
            ├── default.css       # 经典海蓝
            └── scholar.css       # 简约黑白
```

- `resume-data.js` — 你和 AI 只改这一个文件
- `index.html` — 打开即预览，导出即投递
- `SKILL.md` — 完整工作流文档（HTML 化 / 评估 / 润色 / 定制 / 话术 / 导出），仅 Claude Code 用户需要关注

---

## 导出 PDF

1. 浏览器打开 `index.html`
2. 点击左侧「打印 / 导出 PDF」
3. 纸张选 A4，边距选「无」，开启「背景图形」
4. 保存为 PDF

> 注意：背景色/横条没显示 → 确认勾选了「背景图形」；导出成两页 → 回 SKILL.md 看 A4 Fit Loop 调整策略

---

## 真实性原则

所有工作流遵循同一底线：

- 不编造经历、不虚构指标
- 不把「参与」升级为「主导」
- 不添加候选人没用过的工具或平台
- 无法验证的能力缺口在报告中标注，不在简历中强行堆砌

---

## License

MIT
