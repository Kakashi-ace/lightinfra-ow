import type { StrapiMedia, StrapiMediaFormat } from '@/types/strapi'

/**
 * 卡片位 384x216。优先用够大的生成变体，避免把几 MB 原图塞进小图位置。
 * 不含 thumbnail：它被压到 156px，比卡片还小，用了会放大发虚，
 * 这种情况宁可回退原图。Strapi 只生成比原图小的变体，所以源图偏小时
 * 这几档都不存在，自然走到原图。
 */
const COVER_FORMAT_PREFERENCE: StrapiMediaFormat[] = ['medium', 'small', 'large']

/**
 * 取封面图 URL。
 * local provider 给的是 /uploads/xxx.jpg 这类站内相对路径，
 * 开发期由 vite proxy 转发，线上由 nginx 反代，所以原样返回即可。
 */
export function resolveCoverUrl(cover: StrapiMedia | null | undefined): string | null {
  if (!cover) return null

  const formats = cover.formats
  if (formats) {
    for (const name of COVER_FORMAT_PREFERENCE) {
      const url = formats[name]?.url
      if (url) return url
    }
  }

  return cover.url || null
}
