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
   * Opens public "read" access on the article content type so the
   * front-end can fetch articles without authentication.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    // 允许匿名(public)用户读取 article 内容类型的 find(列表) 与 findOne(详情)
    // 参考 Strapi 权限注册：插件 users-permissions 的 public 角色
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } })

    if (publicRole) {
      const articleUid = 'api::article.article'
      const actions = ['find', 'findOne']

      for (const action of actions) {
        const count = await strapi
          .query('plugin::users-permissions.permission')
          .count({
            where: {
              action: `api::article.article.${action}`,
              role: publicRole.id,
            },
          })

        if (count === 0) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({
              data: {
                action: `api::article.article.${action}`,
                role: publicRole.id,
              },
            })
        }
      }
    }
  },
}
