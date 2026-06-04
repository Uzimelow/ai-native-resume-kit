# AI Native Resume Kit

> 把 PDF / DOCX 简历转换成 AI 可编辑的 HTML 简历。支持素材库管理、JD 匹配评估、简历定制、招呼话术、A4 PDF 导出。

在线 Demo：[简历模板](https://uzimelow.github.io/ai-native-resume-kit/assets/template/index.html) · [素材库](https://uzimelow.github.io/ai-native-resume-kit/assets/template/library-demo.html) · [评估报告](https://uzimelow.github.io/ai-native-resume-kit/assets/template/report-template.html) · [招呼话术](https://uzimelow.github.io/ai-native-resume-kit/assets/template/self-intro-template.html)

---

## 它能做什么

- **简历 HTML 化** — PDF / DOCX → 结构化 HTML，内容集中在 `resume-data.js`，AI 一键修改
- **素材库** — 你的经历仓库。所有实习和项目集中管理，每个岗位下独立保存改写版本。新 JD 来了 → AI 自动匹配最相关经历 → 润色 → 组合成简历。一段经历复用多个岗位，不用每次从头改。
- **JD 匹配评估** — 六维 JD 解析 + 岗位能力模型 + 证据矩阵，产出带批判性诊断的评估报告
- **简历润色** — STAR 结构重写 + 量化数据补全，每段经历可审核可追溯
- **JD 定制** — 基于评估结果重排经历顺序、强化匹配关键词、压缩弱相关内容，生成定制版简历
- **打招呼话术** — 生成 180-280 字的中文招聘平台自我介绍
- **A4 PDF 导出** — 严格 210mm×297mm，一页填充，矢量文字可选
- **PNG 图片复制** — 一键渲染 2x 分辨率图片到剪贴板，快速分享
- **双主题切换** — 经典海蓝 / 简约黑白，在线切换即时预览

---

## 快速开始

本工具配合 AI 编程助手使用（Claude Code、Codex、Trae 等均可）。

在 AI 编程助手中输入：

> 帮我安装这个 skill：https://github.com/Uzimelow/ai-native-resume-kit

### 选一条适合你的路径

| 你的情况 | 对 AI 说 |
|---------|---------|
| 第一次用，有 PDF 简历 + JD | > 「帮我把这份简历 HTML 化，再评估匹配度」 |
| 想长期投多个岗位 | > 「把简历存入素材库，以后每次给我匹配 JD 就行」 |
| 投完一个岗，换了个新 JD | > 「从素材库定制」+ 发 JD |
| 想手动查看/编辑素材库 | 浏览器打开 `material-library/library.html`，选择 `library-data.json` 加载数据 |
| 已有 HTML 简历，只想改改 | > 「帮我润色这段实习经历」 |
| 已有 HTML 简历 + 新 JD | > 「根据这个 JD 定制一版简历」 |
| 只想看看模板长什么样 | 打开 [简历](https://uzimelow.github.io/ai-native-resume-kit/assets/template/index.html) · [素材库](https://uzimelow.github.io/ai-native-resume-kit/assets/template/library-demo.html) · [报告](https://uzimelow.github.io/ai-native-resume-kit/assets/template/report-template.html) · [招呼](https://uzimelow.github.io/ai-native-resume-kit/assets/template/self-intro-template.html) |

AI 会自动读取文件、识别意图、走对应的处理流程。全过程由 AI 完成——你只需上传文件和确认改动。

> 如果不想使用 AI，也可以直接编辑 `assets/template/resume-data.js`，替换示例数据为你的真实经历，浏览器打开 `index.html` 即可预览。

---

## 仓库结构

```text
.
├── ai-native-resume-kit.skill   # 打包的 Skill 文件
├── SKILL.md                     # Skill 完整说明（工作流细节）
├── references/
│   ├── role-competency-library.md  # 岗位能力模型库（36 类）
│   └── skill-taxonomy.md           # 技能分类与推断字典
├── material-library/
│   ├── library.html              # 素材库编辑器 UI
│   └── library-data.json         # 结构化素材数据（Demo：李小明）
├── assets/
│   └── template/
│       ├── index.html           # A4 简历页面 + 控制面板
│       ├── resume-data.js       # 结构化简历数据
│       ├── script.js            # 渲染、上传、导出、主题切换
│       ├── report-template.html # 评估报告模板
│       ├── self-intro-template.html # 打招呼话术模板
│       ├── library-demo.html     # 素材库只读 Demo
│       └── themes/
│           ├── base.css         # 共享结构样式
│           ├── default.css      # 经典海蓝
│           └── scholar.css      # 简约黑白
```

- `resume-data.js` — 单次简历的直接编辑目标
- `index.html` — 打开即预览，导出即投递
- `SKILL.md` — 完整工作流文档（HTML 化 / 入库 / 评估 / 润色 / 定制 / 素材库匹配 / 话术 / 导出）

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

## 致谢

本项目修改自 [zebrazjx/ai-native-resume](https://github.com/zebrazjx/ai-native-resume)，原始 HTML 模板和「经典海蓝」主题由其创建。在此感谢原作者的开源贡献。

---

## License

MIT
