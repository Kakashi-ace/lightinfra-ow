export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * Opens public "read" access on the research-article and news-article
   * content types, and public "create" access on contact-submission,
   * so the front-end can use them without authentication.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    // 允许匿名(public)用户按需访问指定内容类型的指定动作
    // 参考 Strapi 权限注册：插件 users-permissions 的 public 角色
    // contact-submission 只给 create，绝不给 find/findOne，避免访客信息被公开读取
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } })

    if (publicRole) {
      const permissionGrants = [
        { uid: 'api::research-article.research-article', actions: ['find', 'findOne'] },
        { uid: 'api::news-article.news-article', actions: ['find', 'findOne'] },
        { uid: 'api::contact-submission.contact-submission', actions: ['create'] },
      ]

      for (const { uid, actions } of permissionGrants) {
        for (const action of actions) {
          const count = await strapi
            .query('plugin::users-permissions.permission')
            .count({
              where: {
                action: `${uid}.${action}`,
                role: publicRole.id,
              },
            })

          if (count === 0) {
            await strapi
              .query('plugin::users-permissions.permission')
              .create({
                data: {
                  action: `${uid}.${action}`,
                  role: publicRole.id,
                },
              })
          }
        }
      }
    }

    // 首次启动时内置几条测试数据，方便前端联调；已有数据（真实或之前种过）时跳过
    const researchCount = await strapi.documents('api::research-article.research-article').count()
    if (researchCount === 0) {
      const researchSeeds = [
        {
          title: '指数剪枝可学习数字反向传播实现低复杂度光纤非线性补偿',
          excerpt: '上海交通大学电子信息与电气工程学院义理林教授课题组提出了一种低复杂度指数剪枝可学习数字反向传播方法，在保证补偿精度的同时大幅降低了计算复杂度。',
          body: '上海交通大学电子信息与电气工程学院义理林教授课题组提出了一种低复杂度指数剪枝可学习数字反向传播方法，用于光纤非线性补偿。\n\n该方法通过对传统数字反向传播算法中的滤波器进行指数剪枝，在几乎不损失补偿精度的前提下，将计算复杂度降低了一个数量级，为高速相干光通信系统的实时非线性补偿提供了可行方案。\n\n实验结果表明，该方法在多种传输距离和调制格式下均展现出良好的鲁棒性和补偿效果，具备工程落地的潜力。',
        },
        {
          title: 'Agent赋能光网络运维智能化',
          excerpt: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究，探索大模型与Agent技术在光网络场景下的落地路径。',
          body: '光之宇智能科技有限公司长期开展智能光传输及光网络运维管理研究，致力于将大模型与Agent技术引入光网络运维的日常场景。\n\n通过构建面向光网络故障诊断、性能预测与参数优化的专用Agent，系统能够自动分析历史告警与性能数据，辅助运维人员快速定位问题根因，并给出可执行的优化建议。\n\n该方案已在多个实际网络场景中完成验证，显著缩短了故障处理时间，降低了人工排查成本。',
        },
      ]
      for (const seed of researchSeeds) {
        await strapi.documents('api::research-article.research-article').create({ data: seed, status: 'published' })
      }
    }

    const newsSeeds = [
      {
        title: '全自研国产！交大发布这一AI大模型',
        excerpt: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学举行，标志着我国在光学专业大模型领域取得重要突破。',
        externalUrl: 'https://www.sjtu.edu.cn',
      },
      {
        title: '上海交大义理林教授团队发布智能光传输开源仿真平台',
        excerpt: '由中国通信学会光通信委员会、鹏城实验室、区域光纤通信网与新型光通信系统国家重点实验室联合主办的智能光传输专题活动上，团队正式发布开源仿真平台。',
        externalUrl: 'https://www.sjtu.edu.cn',
      },
      {
        title: '光之宇完成新一轮融资，加速光学大模型商业化落地',
        excerpt: '本轮融资将用于OpticsGPT大模型的持续迭代与智能仪器仪表产品线的规模化生产，进一步拓展光学行业智能化应用场景。',
        externalUrl: 'https://www.sjtu.edu.cn',
      },
      {
        title: 'IFTS开源仿真工具正式上线社区版，助力光通信教学与科研',
        excerpt: 'IFTS社区版面向高校师生与科研人员免费开放，提供完整的信道建模、信号传输与算法验证能力，降低光通信仿真门槛。',
        externalUrl: 'https://www.sjtu.edu.cn',
      },
    ]
    for (const seed of newsSeeds) {
      const existing = await strapi
        .documents('api::news-article.news-article')
        .findFirst({ filters: { title: seed.title } })

      if (!existing) {
        await strapi.documents('api::news-article.news-article').create({ data: seed, status: 'published' })
      }
    }
  },
}
