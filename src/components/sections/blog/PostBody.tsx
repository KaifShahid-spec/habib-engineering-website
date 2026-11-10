interface PostBodyProps {
  content: string;
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose prose-slate prose-lg md:prose-xl max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
      {/* 
        Note: dangerouslySetInnerHTML use kiya gaya hai kyunke Rich Text Editor se HTML aata hai.
        Ensure karein ke content admin panel se aaye aur wahan sanitize ho (jo editor khud karta hai).
      */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}