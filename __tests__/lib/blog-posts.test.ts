import { getSortedPosts, parsePostDate } from '@/lib/blog-posts'

describe('getSortedPosts', () => {
  it('returns posts sorted by date descending', () => {
    const sortedPosts = getSortedPosts()

    for (let i = 0; i < sortedPosts.length - 1; i++) {
      const current = parsePostDate(sortedPosts[i].date).getTime()
      const next = parsePostDate(sortedPosts[i + 1].date).getTime()
      expect(current).toBeGreaterThanOrEqual(next)
    }
  })

  it('contains all original posts', () => {
    // Check if we didn't lose any posts
    const { blogPosts } = require('@/lib/blog-posts')
    expect(getSortedPosts().length).toBe(blogPosts.length)
  })
})
