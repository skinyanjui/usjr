import { Star, ExternalLink, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { getSortedPosts } from '@/lib/blog-posts'

const STAR_ICONS = [0, 1, 2, 3, 4]

export function ReviewsAndBlog() {
    const posts = getSortedPosts().slice(0, 3)

    return (
        <section className="bg-card px-4 py-10">
            <div className="mx-auto max-w-6xl">
                {/* Google Reviews Summary - Compact */}
                <div className="mb-8 flex flex-wrap items-center justify-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:gap-4">
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="flex">
                            {STAR_ICONS.map(i => (
                                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            ))}
                        </span>
                        <span className="text-sm sm:text-base">4.7/5 from 6 verified reviews</span>
                    </div>
                    <span className="hidden h-1 w-1 rounded-full bg-border sm:block"></span>
                    <a
                        href="https://www.google.com/maps/search/?api=1&query=Uncle+Sam+Junk+Removal+Evansville"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline-offset-2 transition-all hover:text-primary/80 hover:underline sm:text-base"
                    >
                        View All Reviews on Google
                        <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>

                {/* Blog Posts */}
                <div className="text-center">
                    <h2 className="mb-1 text-2xl font-bold text-foreground sm:text-3xl">
                        Helpful Resources
                    </h2>
                    <p className="mb-6 text-sm text-muted-foreground sm:text-base">
                        Tips and guides for your next cleanout project
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.map(post => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-md"
                        >
                            {post.image && (
                                <div className="relative h-36 w-full overflow-hidden bg-muted">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                            )}
                            <div className="flex flex-1 flex-col p-4">
                                <span className="mb-1 text-xs font-medium text-primary">
                                    {post.category}
                                </span>
                                <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary sm:text-base">
                                    {post.title}
                                </h3>
                                <p className="mb-3 line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 text-center">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                        View All Articles
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    )
}
