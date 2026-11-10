import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { LazyImage } from "@/components/shared/LazyImage";

// Hum BlogPostRow type import kar sakte hain, lekin filhal flexible rakhte hain
interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    cover_image_url: string | null;
    published_at: string | null;
    created_at: string;
  };
}

export function PostCard({ post }: PostCardProps) {
  const imageUrl = post.cover_image_url || "/images/placeholders/blog.jpg";
  const displayDate = post.published_at || post.created_at;

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        <LazyImage
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm hover:bg-background/90 text-foreground">
            Blog
          </Badge>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col p-5">
        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
          <Calendar className="size-3" />
          <time dateTime={displayDate}>{formatDate(displayDate)}</time>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
          {post.excerpt || "Read more about this topic on our blog..."}
        </p>

        {/* Read More Link */}
        <div className="mt-auto flex items-center text-sm font-semibold text-primary">
          Read Article <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}