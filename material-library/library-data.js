// ============================================================
// 素材库 (Material Library) — 结构化简历数据 + 能力标签
// AI 从素材库匹配 JD，自动选取最相关经历定制简历
// ============================================================

window.materialLibrary = {

  // ========== META ==========
  meta: {
    version:          "1.0",
    lastModified:     "2026-05-24",
    lastModifiedBy:   "AI",
    candidateName:    "李小明",
    primaryRoles:     ["产品运营", "AI产品运营"],
    primaryIndustries: ["互联网", "AI", "快消"],
    targetLevel:      "intern"
  },

  // ========== PROFILE (稳定不变的个人背景) ==========
  profile: {
    basics: {
      name:           "李小明",
      intent:         "求职意向：产品运营实习生",
      location:       "上海",
      undergraduate:  "复旦大学 新闻学院 传播学",
      graduate:       "上海交通大学 媒体与传播学院 新闻与传播",
      graduationYear: "2026",
      email:          "lixiaoming@example.com",
      phone:          "13900001111"
    },
    education: [
      { degree: "硕士", school: "上海交通大学", college: "媒体与传播学院", major: "新闻与传播", period: "2024.09-2026.06" },
      { degree: "本科", school: "复旦大学",         college: "新闻学院",         major: "传播学",     period: "2020.09-2024.06" }
    ]
  },

  // ========== EXPERIENCES ==========
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

      // 累积改写：每次 Path D 定制完成后自动存回
      // 下次投相同岗位模型时优先复用，微调即可
      rewrites: [],

      notes: "最有JD适配弹性的经历，含SQL+PRD+跨团队协同证据。可面向内容运营、数据运营、AI产品运营三种角色改写。"
    },

    {
      id:   "exp-002",
      type: "internship",

      source: {
        company: "某快消品牌-市场部",
        role:    "品牌营销实习生",
        period:  "2025.02-2025.05"
      },

      content: {
        achievements: [
          {
            label: "新品上市推广与用户增长",
            text:  "负责新品上市的用户增长与内容触达策略：基于目标客群画像设计社交媒体种草内容矩阵，筛选50+垂类KOL并按粉丝画像分层投放，最终触达用户超500万，新品首月销售额超额20%达成目标。"
          },
          {
            label: "用户洞察与竞品分析",
            text:  "开展消费者深度访谈与问卷调研（N=200+），结合电商评论挖掘与竞品动态追踪，定位消费者核心决策因子，输出品类机会报告，驱动产品卖点提炼与包装优化，新品上市后复购率提升15个百分点。"
          }
        ]
      },

      tags: {
        capability: [
          { role: "市场营销", dimension: "用户洞察力" },
          { role: "市场营销", dimension: "渠道策略力" },
          { role: "市场营销", dimension: "内容创意力" },
          { role: "市场营销", dimension: "ROI验证力" }
        ],
        industry:  ["快消"],
        roleLevel: "intern",
        ownership: "推动"
      },

      evidence: {
        strength:          "strong",
        hasQuantifiedData: true,
        keyMetrics:        "500W+触达, 超额20%, N=200+调研, 复购率+15%"
      },

      usage: {
        timesUsed:   0,
        lastUsed:    null,
        usedInRoles: []
      },

      rewrites: [],

      notes: "营销/快消方向核心证据。投非营销岗时可压缩为1条achievement，突出用户洞察和数据分析部分。"
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

  // ========== SKILLS ==========
  skills: [
    {
      id:           "sk-001",
      label:        "产品技能",
      proficiency:  "熟练",
      evidenceRefs: ["exp-001", "exp-003"],
      text:         "熟练使用Axure、墨刀进行原型设计，具备PRD撰写与需求管理经验；熟悉Scrum开发流程与跨团队项目协同；掌握用户访谈、问卷调研、可用性测试等用户研究方法。",
      tags: {
        capability: [
          { role: "产品运营", dimension: "策略执行力" },
          { role: "产品运营", dimension: "效率优化力" }
        ]
      }
    },
    {
      id:           "sk-002",
      label:        "数据技能",
      proficiency:  "熟练",
      evidenceRefs: ["exp-001"],
      text:         "熟练使用SQL进行日常数据提取与分析；精通Excel数据透视表与可视化；具备Python基础编程与自动化脚本编写能力；熟悉神策、GrowingIO等数据分析平台。",
      tags: {
        capability: [
          { role: "产品运营", dimension: "数据驱动" },
          { role: "数据分析", dimension: "取数处理力" }
        ]
      }
    },
    {
      id:           "sk-003",
      label:        "AI工具",
      proficiency:  "掌握",
      evidenceRefs: ["exp-003", "proj-002"],
      text:         "熟悉LLM应用与Prompt工程，有AI辅助内容审核与内容生成质量评估的实践经验；掌握Claude Code、Coze等AI开发工具的基础使用。",
      tags: {
        capability: [
          { role: "AI产品经理", dimension: "模型理解力" },
          { role: "AI产品运营", dimension: "模型理解力" }
        ]
      }
    },
    {
      id:           "sk-004",
      label:        "语言能力",
      proficiency:  "熟练",
      evidenceRefs: [],
      text:         "CET-4、CET-6；英语读写流利，可独立完成英文文档撰写与跨文化业务沟通；具备中英双语内容策划与编辑能力。",
      tags: {
        capability: []
      }
    }
  ],

  // ========== TAG DICTIONARY ==========
  // 所有可用标签均从 role-competency-library.md 提取
  // 编辑素材库时优先使用已有标签，避免同义不同名

  tagDictionary: {
    // ---- 运营大类 ----
    "产品运营":    { dimensions: ["数据驱动", "策略执行力", "效果验证力", "效率优化力"] },
    "用户运营":    { dimensions: ["用户洞察力", "分层触达力", "留存策略力", "数据验证力"] },
    "内容运营":    { dimensions: ["内容策略力", "供应链管理力", "质量把控力", "消费效果力"] },
    "活动运营":    { dimensions: ["创意策划力", "执行落地力", "资源协调力", "效果复盘力"] },
    "商家运营":    { dimensions: ["招募策略力", "培育赋能力", "分层管理力", "GMV驱动力"] },
    "电商运营":    { dimensions: ["货品策略力", "流量获取力", "转化优化力", "复购留存力"] },
    "AI产品运营":  { dimensions: ["产品运营基础", "模型理解力", "数据质量力", "合规风控力"] },
    "增长运营":    { dimensions: ["增长模型力", "渠道实验力", "转化优化力", "规模化力"] },
    "商业化运营":  { dimensions: ["变现策略力", "定价优化力", "付费转化力", "收入驱动力"] },
    "策略运营":    { dimensions: ["规则设计力", "数据建模力", "策略调优力", "效果验证力"] },
    "新媒体运营":  { dimensions: ["内容创作力", "平台理解力", "粉丝增长力", "流量转化力"] },
    "渠道运营":    { dimensions: ["渠道拓展力", "投放优化力", "商务谈判力", "ROI分析力"] },
    "社群运营":    { dimensions: ["社群搭建力", "活跃维护力", "用户粘性力", "私域转化力"] },
    "数据运营":    { dimensions: ["指标体系力", "分析洞察力", "策略建议力", "业务联动力"] },
    "生态运营":    { dimensions: ["平台治理力", "资源整合力", "生态合作力", "规则设计力"] },

    // ---- 产品大类 ----
    "C端产品经理":  { dimensions: ["用户洞察力", "体验设计力", "AB验证力", "数据驱动力"] },
    "B端产品经理":  { dimensions: ["业务理解力", "效率设计力", "权限模型力", "客户落地力"] },
    "商业化产品经理": { dimensions: ["变现设计力", "定价策略力", "广告系统力", "收入驱动力"] },
    "AI产品经理":   { dimensions: ["模型理解力", "能力定义力", "体验设计力", "效果评估力"] },
    "策略产品经理": { dimensions: ["算法理解力", "策略设计力", "效果实验力", "系统优化力"] },
    "数据产品经理": { dimensions: ["业务理解力", "数据基建力", "工具设计力", "效率提升力"] },

    // ---- 市场大类 ----
    "渠道拓展": { dimensions: ["渠道策略力", "商务开拓力", "合作关系力", "增长贡献力"] },
    "市场推广": { dimensions: ["品牌策略力", "整合传播力", "内容营销力", "效果衡量力"] },
    "商务合作": { dimensions: ["合作策略力", "谈判执行力", "资源整合力", "价值创造力"] },

    // ---- 技术大类 ----
    "架构师":     { dimensions: ["系统设计力", "技术选型力", "性能优化力", "技术治理力"] },
    "前端工程师": { dimensions: ["技术深度力", "工程化能力", "用户体验力", "业务价值力"] },
    "后端工程师": { dimensions: ["技术深度力", "系统可靠性力", "数据设计力", "业务支撑力"] },
    "移动端工程师": { dimensions: ["平台能力力", "性能优化力", "用户体验力", "工程效率力"] },
    "测试工程师": { dimensions: ["质量体系建设力", "自动化能力", "风险防控力", "效率提升力"] },
    "运维工程师": { dimensions: ["基础架构力", "稳定性保障力", "自动化能力", "成本优化力"] },

    // ---- 分析大类 ----
    "数据分析": { dimensions: ["问题定义力", "取数处理力", "分析洞察力", "业务影响力"] },
    "商业分析": { dimensions: ["行业研究力", "商业建模力", "战略建议力", "决策推动力"] },
    "战略分析": { dimensions: ["战略思维力", "系统性研究力", "高层视野力", "长期价值力"] },

    // ---- 营销大类 ----
    "市场营销": { dimensions: ["用户洞察力", "渠道策略力", "内容创意力", "ROI验证力"] },

    // ---- 设计大类 ----
    "产品设计": { dimensions: ["用户研究力", "交互设计力", "视觉产出力", "落地验证力"] },

    // ---- 人力大类 ----
    "人力资源": { dimensions: ["招聘交付力", "员工关系力", "组织建设力", "数据运营力"] },

    // ---- 通用标签 ----
    "industry":  ["互联网", "AI", "内容平台", "快消", "电商", "教育", "医疗", "汽车", "金融", "企业服务", "游戏"],
    "ownership": ["主导", "参与", "协助", "支持", "推动", "协同", "落地", "负责"],
    "roleLevel": ["intern", "junior", "mid", "senior", "lead"]
  }
};
