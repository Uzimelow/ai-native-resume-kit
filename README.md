# AI Native Resume Kit

> 把 PDF / DOCX 简历转换成 AI 可编辑、可预览、可导出 A4 PDF 的 HTML 简历，并支持根据 JD 定制、评估匹配度、润色优化、生成打招呼话术。

在线 Demo：[简历模板](https://uzimelow.github.io/ai-native-resume-kit/assets/template/index.html) · [评估报告](https://uzimelow.github.io/ai-native-resume-kit/assets/template/report-template.html)

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

本工具设计为配合 AI 编程助手使用（Claude Code、Codex、Trae 等均可）。

1. 将 `ai-native-resume-kit.skill` 安装到 AI 助手的 Skills 目录
2. 上传你的 PDF/DOCX 简历和目标岗位 JD
3. AI 会自动读取简历内容，抽取姓名、教育、实习、项目、技能等信息，填充到 `resume-data.js` 中，并在浏览器中打开预览
4. 如果提供了 JD，AI 会进一步：
   - 对 JD 做六维解析（核心职责、硬性条件、加分能力、隐含偏好、关键词、业务语境）
   - 建立 JD 要求与简历证据的匹配矩阵，逐项打分
   - 生成一份带批判性诊断的 `jd-match-report.html` 评估报告
   - 基于评估结果定制 HTML 简历：重排经历顺序、强化匹配关键词、压缩弱相关内容
   - 所有修改基于真实经历，不编造、不夸大
5. 导出最终成果（见下方导出说明）

如果不想使用 AI，也可以直接编辑 `assets/template/resume-data.js`，手动替换示例数据为你的真实经历，浏览器打开 `index.html` 即可预览。

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
- `SKILL.md` — 完整工作流文档（HTML 化 / 评估 / 润色 / 定制 / 话术 / 导出）

---

## 导出

模板提供两种导出方式，使用场景不同：

| 方式 | 格式 | 适用场景 |
|------|------|---------|
| **打印 / 导出 PDF** | 矢量 PDF，文字可选、链接可点击 | 正式投递，发给 HR 或招聘系统 |
| **保存图片并复制** | 2x PNG，渲染到剪贴板 | 快速分享，粘贴到微信、BOSS 直聘等聊天窗口，打招呼时发送快照 |

> PNG 图片文字不可选中，不建议作为正式投递格式。

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
