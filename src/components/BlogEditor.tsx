import React from 'react';

export function BlogEditor({ content }: { content: string }) {
  return (
    <div className="bg-transparent border border-graphite/10 p-8 sm:p-12 relative">
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-graphite/30"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-graphite/30"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-graphite/30"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-graphite/30"></div>

      <div className="flex items-center justify-between mb-10 pb-6 border-b border-graphite/10">
        <h2 className="text-4xl font-serif font-light text-graphite flex items-center gap-3">
          Narrative
        </h2>
        <div className="flex gap-4 text-graphite/40">
          <button className="hover:text-graphite transition-colors"><span className="font-serif font-bold text-lg">B</span></button>
          <button className="hover:text-graphite transition-colors"><span className="font-serif italic text-lg">I</span></button>
          <button className="hover:text-graphite transition-colors"><span className="underline text-lg">U</span></button>
        </div>
      </div>
      
      <div className="prose prose-lg max-w-none">
        <textarea 
          className="w-full min-h-[400px] resize-none outline-none text-lg text-graphite/80 leading-loose font-serif bg-transparent placeholder:text-graphite/20"
          placeholder="Start writing your travel story here... Type @ to mention a sight or activity."
          defaultValue={content}
        />
      </div>
    </div>
  );
}
