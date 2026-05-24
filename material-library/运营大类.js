// ============================================================
// 素材库 — 运营大类
// 覆盖 15 个子模型：产品运营 / 用户运营 / 内容运营 / 活动运营 /
//   商家运营 / 电商运营 / AI产品运营 / 增长运营 / 商业化运营 /
//   策略运营 / 新媒体运营 / 渠道运营 / 社群运营 / 数据运营 / 生态运营
// ============================================================

window.materialLibrary_运营大类 = {
  category:   "运营大类",
  version:    "1.0",
  lastModified: "2026-05-24",

  experiences: [
    {
      id:   "exp-001",
      type: "internship",

      source: {
        company: "某头部互联网公司-内容生态部",
        role:    "产品运营实习生",
        period:  "2025.06-2025.09"
      },

      content: {
        achievements: [
          {
            label: "内容供给策略优化",
            text:  "负责短视频内容池的供给侧分析，通过SQL提取6个月消费与互动数据（样本量50W+条），识别出低互动率且高曝光的「高曝低效」内容类型4类，输出供给质量分析报告并推动汰换机制上线。优质内容曝光占比从31%提升至38%，人均消费时长从12.4min提升至14.6min，日均低质内容曝光量下降约40W次。"
          },
          {
            label: "创作者激励体系搭建",
            text:  "主导创作者激励体系的产品化设计：分析10W+创作者行为数据，按投稿频次与互动表现划分为4个等级，设计对应成长任务（新手引导→进阶挑战→高阶权益）与阶梯式流量激励。输出PRD初稿并协同研发、运营、设计团队推动上线，周活跃创作者数从8,200提升至11,100，头部创作者月流失率从18%降至6%。"
          },
          {
            label: "产品工具搭建与体验优化",
            text:  "针对SKU认知门槛高、推荐不准的业务卡点，0-1搭建内容产品导航平台，实现「内容类型×用户分层」交叉定位与一键跳转。单次运营决策时长降低30min，上线当周核心业务线渗透率达60%，人均周检索7次，信息查找效率提升显著。"
          }
        ]
      },

      tags: {
        capability: [
          { role: "产品运营", dimension: "数据驱动" },
          { role: "产品运营", dimension: "策略执行力" },
          { role: "产品运营", dimension: "效率优化力" },
          { role: "产品运营", dimension: "效果验证力" },
          { role: "AI产品运营", dimension: "数据质量力" }
        ],
        industry:  ["互联网", "内容平台"],
        roleLevel: "intern",
        ownership: "推动"
      },

      evidence: {
        strength:          "strong",
        hasQuantifiedData: true,
        keyMetrics:        "50W+样本量, 31%→38%曝光占比, 12.4→14.6min, 40W次低质曝光下降"
      },

      usage: {
        timesUsed:   0,
        lastUsed:    null,
        usedInRoles: []
      },

      rewrites: [],

      notes: "最有JD适配弹性的经历，含SQL+PRD+跨团队协同证据。可面向内容运营、数据运营、AI产品运营三种角色改写。"
    },

    {
      id:   "exp-003",
      type: "internship",

      source: {
        company: "某AI初创公司-产品部",
        role:    "AI产品实习生",
        period:  "2024.10-2025.01"
      },

      content: {
        achievements: [
          {
            label: "AI内容审核工作流搭建",
            text:  "发现审核团队日均处理量瓶颈（300条/人）导致审核时效不达标，分析工作流中可自动化环节，设计LLM预审方案并撰写PRD协调工程团队落地。人工审核量从300条/人降至120条/人，审核时效从4h缩短至1.5h，内容合规风险事件发生率降低80%。"
          },
          {
            label: "数据标注体系与质量标准建设",
            text:  "为解决AI模型训练数据质量不稳定的问题，设计涵盖基础体验（一致性、记忆力）与策略表现（合规度、准确度）等12维量化评分矩阵的标注SOP。标注结果二次加权Kappa系数达0.7，数据标注一致性提升40%，模型训练效果提升12%。"
          }
        ]
      },

      tags: {
        capability: [
          { role: "AI产品运营", dimension: "模型理解力" },
          { role: "AI产品运营", dimension: "数据质量力" },
          { role: "AI产品运营", dimension: "合规风控力" },
          { role: "产品运营",   dimension: "效率优化力" }
        ],
        industry:  ["AI", "内容平台"],
        roleLevel: "intern",
        ownership: "推动"
      },

      evidence: {
        strength:          "strong",
        hasQuantifiedData: true,
        keyMetrics:        "300→120条/人, 4h→1.5h, 合规风险-80%, Kappa 0.7, 标注一致性+40%"
      },

      usage: {
        timesUsed:   0,
        lastUsed:    null,
        usedInRoles: []
      },

      rewrites: [],

      notes: "AI岗核心证据。LLM预审+PRD+SOP+数据标注闭环，也适合策略运营岗。ownership标注为'推动'而非'主导'，因PRD为初稿且标注SOP是设计而非全链路owner。"
    },

    {
      id:   "proj-001",
      type: "project",

      source: {
        title:  "短视频热点预测模型",
        role:   "核心成员",
        period: "2025.07-2025.09"
      },

      content: {
        points: [
          "项目背景：内容运营团队在热点选题上高度依赖人工经验判断，选题成功率仅35%，且响应速度落后竞品2-3小时，导致流量流失。",
          "关键产出：（1）构建基于历史爆款内容的12维特征指标体系，结合时序分析预测热点趋势，选题命中率从35%提升至49%；（2）搭建自动化热点监控看板，实现分钟级异动预警，响应速度缩短至30min以内。"
        ]
      },

      tags: {
        capability: [
          { role: "产品运营", dimension: "数据驱动" },
          { role: "产品运营", dimension: "效率优化力" },
          { role: "策略产品经理", dimension: "策略设计力" }
        ],
        industry:  ["互联网", "内容平台"],
        roleLevel: "intern",
        ownership: "推动"
      },

      evidence: {
        strength:          "moderate",
        hasQuantifiedData: true,
        keyMetrics:        "35%→49%命中率, 响应30min以内, 12维特征体系"
      },

      usage: {
        timesUsed:   0,
        lastUsed:    null,
        usedInRoles: []
      },

      rewrites: [],

      notes: "技术含量较高的项目，role为核心成员而非独立owner。适合数据运营、策略产品岗。投非数据岗时可压缩或砍掉。"
    },

    {
      id:   "proj-002",
      type: "project",

      source: {
        title:  "AI 产品内容生态优化项目",
        role:   "负责人",
        period: "2025.10-2025.12"
      },

      content: {
        points: [
          "项目背景：AI对话产品在多场景下内容生成质量不稳定，用户投诉率高，且缺乏系统性的效果评估机制。",
          "关键产出：（1）搭建多语言平行语料库与自动化评估管线，实现内容质量的分钟级监控；（2）设计3类递进式Prompt约束规则，通过人工测评迭代3版Prompt，内容OOC率降低85%，用户对话续写率提升30%。"
        ]
      },

      tags: {
        capability: [
          { role: "AI产品经理", dimension: "模型理解力" },
          { role: "AI产品经理", dimension: "效果评估力" },
          { role: "AI产品运营", dimension: "数据质量力" },
          { role: "产品运营",    dimension: "策略执行力" }
        ],
        industry:  ["AI", "内容平台"],
        roleLevel: "intern",
        ownership: "推动"
      },

      evidence: {
        strength:          "moderate",
        hasQuantifiedData: true,
        keyMetrics:        "OOC率-85%, 续写率+30%, 3版Prompt迭代, 多语言评估管线"
      },

      usage: {
        timesUsed:   0,
        lastUsed:    null,
        usedInRoles: []
      },

      rewrites: [],

      notes: "AI产品/运营方向核心证据。role为负责人但ownership标注为'推动'因为项目范围不明确。适合AI产品、AI运营、内容策略岗。"
    }
  ],

  // 跨界引用：对产品大类的可迁移经历
  crossRefs: {
    "产品大类": {
      entries: [
        {
          id: "exp-001",
          crossId: "cross-op-prod-001",
          reason: "数据驱动+效率优化 → C端PM数据驱动力 · 策略产品经理策略设计力",
          summary: "通过SQL分析50W+数据驱动内容策略优化，独立推动PRD上线。"
        },
        {
          id: "exp-003",
          crossId: "cross-op-prod-002",
          reason: "LLM预审+PRD+标注SOP → AI产品经理模型理解力+效果评估力",
          summary: "设计LLM预审方案+12维标注SOP，协调工程团队落地。"
        },
        {
          id: "proj-002",
          crossId: "cross-op-prod-003",
          reason: "Prompt迭代+评估管线+OOC降低 → AI产品经理效果评估力",
          summary: "设计3类递进式Prompt约束规则，搭建自动化评估管线。"
        }
      ]
    }
  }
};
