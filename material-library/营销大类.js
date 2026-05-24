// ============================================================
// 素材库 — 营销大类
// 覆盖子模型：市场营销
// ============================================================

window.materialLibrary_营销大类 = {
  category:   "营销大类",
  version:    "1.0",
  lastModified: "2026-05-24",

  experiences: [
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
    }
  ],

  crossRefs: {}
};
