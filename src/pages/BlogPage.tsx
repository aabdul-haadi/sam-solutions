import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Clock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface BlogPageProps {
  setCurrentPage?: (page: string) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  // Mock API
  const subscribeToNewsletter = async (email: string): Promise<{ success: boolean; error?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email.includes('@')) {
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Please enter a valid email address' });
        }
      }, 1500);
    });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setNewsletterStatus('loading');
    setNewsletterError(null); // FIXED: Removed "Trunk(null)"

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setNewsletterStatus('success');
        setEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 4000);
      } else {
        setNewsletterStatus('error');
        setNewsletterError(result.error || 'Failed to subscribe. Please try again.');
      }
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterError('Network error. Please check your connection and try again.');
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Web Development: Trends to Watch in 2025",
      excerpt: "Discover how artificial intelligence is revolutionizing web development and what trends will shape the industry in 2025.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      category: "AI & Technology",
      readTime: "8 min read",
      featured: true,
      slug: "future-ai-web-development-2025"
    },
    {
      id: 2,
      title: "Complete Guide to E-commerce SEO: Boost Your Online Store Rankings",
      excerpt: "Learn proven strategies to improve your e-commerce website's search engine rankings and drive more organic traffic.",
      image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "Michael Chen",
      date: "March 12, 2024",
      category: "SEO & Marketing",
      readTime: "12 min read",
      featured: true,
      slug: "ecommerce-seo-guide"
    },
    {
      id: 3,
      title: "Building Scalable SaaS Applications: Best Practices and Architecture",
      excerpt: "Essential guidelines for developing robust, scalable SaaS applications that can grow with your business.",
      image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "David Rodriguez",
      date: "March 10, 2024",
      category: "Development",
      readTime: "10 min read",
      featured: false,
      slug: "scalable-saas-applications"
    },
    {
      id: 4,
      title: "UI/UX Design Trends That Will Dominate 2025",
      excerpt: "Explore the latest design trends and how to implement them in your next project for maximum user engagement.",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "Emily Watson",
      date: "March 8, 2024",
      category: "Design",
      readTime: "6 min read",
      featured: false,
      slug: "ui-ux-design-trends-2025"
    },
    {
      id: 5,
      title: "Implementing AI Chatbots: A Step-by-Step Business Guide",
      excerpt: "Everything you need to know about implementing AI chatbots to improve customer service and reduce operational costs.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "Alex Thompson",
      date: "March 5, 2024",
      category: "AI & Technology",
      readTime: "9 min read",
      featured: true,
      slug: "implementing-ai-chatbots"
    },
    {
      id: 6,
      title: "Mobile-First Design: Why It's Critical for Modern Websites",
      excerpt: "Understanding the importance of mobile-first design and how to implement it effectively for better user experience.",
      image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800",
      author: "Lisa Park",
      date: "March 3, 2024",
      category: "Development",
      readTime: "7 min read",
      featured: true,
      slug: "mobile-first-design"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Posts', count: blogPosts.length },
    { id: 'AI & Technology', label: 'AI & Technology', count: blogPosts.filter(p => p.category === 'AI & Technology').length },
    { id: 'Development', label: 'Development', count: blogPosts.filter(p => p.category === 'Development').length },
    { id: 'Design', label: 'Design', count: blogPosts.filter(p => p.category === 'Design').length },
    { id: 'SEO & Marketing', label: 'SEO & Marketing', count: blogPosts.filter(p => p.category === 'SEO & Marketing').length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured);

  const handlePostClick = (slug: string) => {
    setCurrentPage?.(slug);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Transparent Header Ready */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_60%)] opacity-50 pointer-events-none" />
        
        <div className="pt-24 md:pt-28 pb-14 md:pb-16 lg:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-5 leading-tight">
                Insights & <span className="text-yellow-400">Expertise</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
                Stay ahead with the latest trends, insights, and expert knowledge in web development, 
                AI technology, and digital innovation.
              </p>

              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-800 border border-gray-700 rounded-full text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent shadow-xl text-white placeholder-gray-400 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        {/* Category Filter */}
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
                <span className="ml-2 opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Articles</h2>
              <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              {featuredPosts.slice(0, 2).map((post) => (
                <article 
                  key={post.id}
                  className="group cursor-pointer"
                  onClick={() => handlePostClick(post.slug)}
                >
                  <div className="relative overflow-hidden rounded-2xl mb-5 md:mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-5 left-5">
                      <span className="bg-yellow-400 text-black px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                    <div className="absolute bottom-5 right-5">
                      <div className="flex items-center space-x-2 text-white">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center space-x-3 md:space-x-4 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs md:text-sm">
                        {post.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700 transition-colors text-sm md:text-base">
                      Read Full Article
                      <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <div className="flex items-center justify-between mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Latest Articles</h2>
            <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...featuredPosts.slice(2), ...regularPosts].map((post) => (
              <article 
                key={post.id}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                onClick={() => handlePostClick(post.slug)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-black/70 text-white px-2.5 py-1 rounded-full text-xs flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  {post.featured && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-yellow-400 text-black px-2.5 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-5 md:p-6 space-y-3 md:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm">{post.date}</span>
                  </div>
                  
                  <h3 className="text-base md:text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300 leading-tight line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-xs md:text-sm text-gray-500">
                      <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center text-yellow-600 font-medium text-xs md:text-sm group-hover:text-yellow-700 transition-colors">
                      Read More
                      <ArrowRight className="ml-1 w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <div className="text-gray-400 mb-6">
              <Search className="w-16 h-16 md:w-20 md:h-20 mx-auto" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-600 mb-4">No articles found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your search terms or category filter</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 md:px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* NEWSLETTER - ORIGINAL DESIGN */}
        <section className="mt-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with Our Latest Insights
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest articles, industry insights, and expert tips delivered directly to your inbox. 
            Join thousands of professionals who trust our content.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
              className="flex-1 px-6 py-4 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:opacity-60"
            />
            <button 
              type="submit"
              disabled={newsletterStatus === 'loading' || newsletterStatus === 'success' || !email.trim()}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-r-full font-semibold hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {newsletterStatus === 'loading' ? 'Subscribing...' : newsletterStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>

          {newsletterStatus === 'success' && (
            <p className="mt-4 text-green-600 text-sm font-medium">Thank you! Check your email to confirm.</p>
          )}
          {newsletterStatus === 'error' && (
            <p className="mt-4 text-red-600 text-sm font-medium">{newsletterError}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;