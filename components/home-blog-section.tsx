import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getSortedPosts } from '@/lib/blog-posts'

export function HomeBlogSection() {
    const posts = getSortedPosts().slice(0, 3)

    return (
        <section className="bg-card px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
                        Helpful Resources
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Tips and guides for your next cleanout project
                    </p>
                </div>

                {/* Blog Grid - Text Only */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <div
                            key={post.slug}
                            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all hover:shadow-md hover:border-primary/20"
                        >
                            <div className="flex flex-1 flex-col p-6">
                                <span className="mb-3 text-xs font-medium text-primary uppercase tracking-wider">
                                    {post.category}
                                </span>
                                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <Clock className="h-3.5 w-3.5" />
                                        <span>{post.readTime}</span>
                                    </div>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
                                    >
                                        Read
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-10 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-muted"
                    >
                        View All Articles
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
