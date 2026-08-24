/**
 * Research-article lifecycles
 * 保证同一时间最多只有一篇 featured=true：新建/更新时若把某篇设为 featured，
 * 顺带把其余篇目的 featured 清空，避免管理员手滑同时标了多篇。
 */
declare const strapi: any

const UID = 'api::research-article.research-article'

async function enforceSingleFeatured(result: { documentId?: string; featured?: boolean } | null) {
  if (!result?.featured) return
  await strapi.db.query(UID).updateMany({
    where: { documentId: { $ne: result.documentId }, featured: true },
    data: { featured: false },
  })
}

export default {
  async afterCreate(event: { result: any }) {
    await enforceSingleFeatured(event.result)
  },
  async afterUpdate(event: { result: any }) {
    await enforceSingleFeatured(event.result)
  },
}
