import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Send, Play, FileText, CheckCircle2, Circle, Sparkles, MapPin, Globe, Landmark, X, Heart, Share2, CornerUpRight } from 'lucide-react';
import { DiscoveryPost } from '../types';
import { mockData } from '../mockData';

export function Discovery() {
  const [posts] = useState<DiscoveryPost[]>(mockData.discoveryPosts || []);
  const [selectedPostIds, setSelectedPostIds] = useState<Set<string>>(new Set());
  const [detailPost, setDetailPost] = useState<DiscoveryPost | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I can help you analyze these travel posts. Select some content and ask me anything!' }
  ]);

  const togglePostSelection = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSelection = new Set(selectedPostIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedPostIds(newSelection);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Based on the ${selectedPostIds.size} posts you selected, I can see that these locations are highly recommended for their authentic atmosphere. Would you like me to create a draft itinerary based on these?` 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-paper overflow-hidden">
      {/* Top Navigation & Filters */}
      <header className="border-b border-graphite/10 px-8 py-4 bg-paper/80 backdrop-blur-md z-20 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-serif text-graphite">Discovery</h1>
            <div className="h-6 w-px bg-graphite/10 mx-2" />
            <div className="flex items-center gap-2 px-4 py-2 bg-graphite/5 rounded-full border border-graphite/10">
              <Search className="w-4 h-4 text-graphite/40" />
              <input 
                type="text" 
                placeholder="Search bloggers, spots..." 
                className="bg-transparent border-none focus:outline-none text-sm w-48 font-sans"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-paper border border-graphite/20 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite/5 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              Country
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-paper border border-graphite/20 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite/5 transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              City
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-paper border border-graphite/20 rounded-full text-xs uppercase tracking-widest font-medium hover:bg-graphite/5 transition-colors">
              <Landmark className="w-3.5 h-3.5" />
              Sights
            </button>
            <div className="h-6 w-px bg-graphite/10 mx-1" />
            <button className="p-2 bg-graphite text-paper rounded-full hover:bg-black transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Content Feed */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <div 
                key={post.id} 
                onClick={() => setDetailPost(post)}
                className={`group relative bg-paper border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex flex-col ${
                  selectedPostIds.has(post.id) ? 'border-sunset ring-1 ring-sunset' : 'border-graphite/10 hover:border-graphite/30 hover:shadow-md'
                }`}
              >
                {/* Selection Overlay */}
                <button 
                  onClick={(e) => togglePostSelection(e, post.id)}
                  className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-paper/80 backdrop-blur-sm border border-graphite/10 shadow-sm hover:scale-110 transition-transform"
                >
                  {selectedPostIds.has(post.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-sunset" />
                  ) : (
                    <Circle className="w-5 h-5 text-graphite/20" />
                  )}
                </button>

                {/* Media Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded text-[9px] text-white uppercase tracking-widest font-bold">
                    {post.type === 'video' ? <Play className="w-2.5 h-2.5" /> : <FileText className="w-2.5 h-2.5" />}
                    {post.author.platform}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-graphite/10" referrerPolicy="no-referrer" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-graphite truncate">{post.author.name}</p>
                      <p className="text-[8px] text-graphite/40 uppercase tracking-wider truncate">{post.tags.city}, {post.tags.country}</p>
                    </div>
                  </div>

                  <h2 className="text-sm font-serif text-graphite mb-2 line-clamp-2 leading-snug h-10">{post.title}</h2>
                  
                  {/* AI Summary Mini */}
                  <div className="mt-auto pt-3 border-t border-graphite/5">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3 h-3 text-sunset" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-sunset">AI Summary</span>
                    </div>
                    <p className="text-[10px] text-graphite/60 italic line-clamp-2">
                      {post.aiSummary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Chat Sidebar */}
        <aside className="w-[400px] border-l border-graphite/10 flex flex-col bg-paper relative z-10">
          {/* Chat Header */}
          <div className="p-6 border-b border-graphite/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sunset rounded-full flex items-center justify-center shadow-lg shadow-sunset/20">
                <Sparkles className="w-5 h-5 text-paper" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-graphite">Travel Assistant</h3>
                <p className="text-[10px] text-graphite/40 uppercase tracking-widest font-bold">
                  {selectedPostIds.size} Sources Selected
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-graphite text-paper rounded-tr-none' 
                    : 'bg-graphite/5 text-graphite rounded-tl-none border border-graphite/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-graphite/10">
            <form onSubmit={handleSendMessage} className="relative">
              <textarea 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your selected spots..."
                className="w-full bg-graphite/5 border border-graphite/10 rounded-2xl p-4 pr-12 text-sm focus:outline-none focus:border-sunset transition-colors resize-none h-24 font-sans"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute bottom-4 right-4 p-2 bg-graphite text-paper rounded-full hover:bg-black transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-3 text-[10px] text-center text-graphite/30 uppercase tracking-widest font-medium">
              Powered by Gemini 3.1 Pro
            </p>
          </div>
        </aside>
      </main>

      {/* Detail Modal */}
      {detailPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-graphite/40 backdrop-blur-sm" onClick={() => setDetailPost(null)} />
          <div className="relative w-full max-w-5xl bg-paper shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setDetailPost(null)}
              className="absolute top-6 right-6 z-20 p-2 bg-paper/80 backdrop-blur-md rounded-full border border-graphite/10 hover:bg-paper transition-colors"
            >
              <X className="w-5 h-5 text-graphite" />
            </button>

            {/* Left: Media */}
            <div className="md:w-3/5 bg-black flex items-center justify-center relative">
              <img 
                src={detailPost.thumbnail} 
                alt={detailPost.title} 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              {detailPost.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-paper/20 backdrop-blur-md rounded-full flex items-center justify-center border border-paper/30">
                    <Play className="w-10 h-10 text-paper fill-paper" />
                  </div>
                </div>
              )}
            </div>

            {/* Right: Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-8 overflow-y-auto flex-1">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <img src={detailPost.author.avatar} alt={detailPost.author.name} className="w-12 h-12 rounded-full border border-graphite/10" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-graphite">{detailPost.author.name}</h4>
                      <p className="text-xs text-graphite/40 uppercase tracking-widest font-medium">
                        {detailPost.author.platform} • {detailPost.tags.city}, {detailPost.tags.country}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => togglePostSelection(e, detailPost.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      selectedPostIds.has(detailPost.id) 
                        ? 'bg-sunset border-sunset text-paper' 
                        : 'border-graphite/20 text-graphite hover:bg-graphite/5'
                    }`}
                  >
                    {selectedPostIds.has(detailPost.id) ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    <span className="text-xs uppercase tracking-widest font-bold">
                      {selectedPostIds.has(detailPost.id) ? 'Selected' : 'Select to AI'}
                    </span>
                  </button>
                </div>

                <h2 className="text-3xl font-serif text-graphite mb-6 leading-tight">{detailPost.title}</h2>
                <p className="text-graphite/70 leading-relaxed font-sans mb-8">
                  {detailPost.content}
                </p>

                {/* AI Summary Detail */}
                <div className="bg-sunset/5 border border-sunset/20 rounded-2xl p-6 relative overflow-hidden mb-8">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-12 h-12 text-sunset" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-sunset" />
                    <span className="text-xs font-bold uppercase tracking-widest text-sunset">AI Analysis & Summary</span>
                  </div>
                  <p className="text-sm text-graphite/80 italic leading-relaxed relative z-10">
                    {detailPost.aiSummary}
                  </p>
                </div>

                {/* Stats & Tags */}
                <div className="flex items-center justify-between pt-8 border-t border-graphite/10">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-graphite/40">
                      <Heart className="w-4 h-4" />
                      <span className="text-xs font-bold">{(detailPost.stats.likes / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="flex items-center gap-2 text-graphite/40">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-xs font-bold">{detailPost.stats.comments}</span>
                    </div>
                    <div className="flex items-center gap-2 text-graphite/40">
                      <Share2 className="w-4 h-4" />
                      <span className="text-xs font-bold">{(detailPost.stats.shares / 1000).toFixed(1)}k</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-graphite/5 text-graphite/60 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      #{detailPost.tags.city}
                    </span>
                    {detailPost.tags.sight && (
                      <span className="px-3 py-1 bg-graphite/5 text-graphite/60 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        #{detailPost.tags.sight}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="p-8 bg-graphite/5 border-t border-graphite/10 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-graphite text-paper rounded-full text-xs uppercase tracking-widest font-bold hover:bg-black transition-colors">
                  View Original Post
                  <CornerUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
