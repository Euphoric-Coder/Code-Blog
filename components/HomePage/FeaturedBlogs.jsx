import React from 'react';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';

export const FeaturedBlogs = () => {
  const blogs = [
    {
      id: 1,
      title: 'C Programming Tutorial',
      description: 'This is JavaScript tutorial and this is for learning JavaScript',
      category: 'Programming',
      tags: ['Technology', 'C Language', 'Programming Concept'],
      readTime: '12 min read',
      author: 'John Doe',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'C++ Programming Tutorial',
      description: 'This is tutorial and this is for learning C++',
      category: 'Programming',
      tags: ['Technology', 'C++', 'Programming Concept'],
      readTime: '15 min read',
      author: 'Jane Smith',
      image: 'https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-teal-600 to-blue-600'
    },
    {
      id: 3,
      title: 'JavaScript Programming Tutorial',
      description: 'A tutorial for learning JavaScript',
      category: 'Web Development',
      tags: ['Technology', 'JavaScript', 'Programming'],
      readTime: '10 min read',
      author: 'Mike Johnson',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 4,
      title: 'Python Programming Tutorial',
      description: 'This is JavaScript tutorial and this is for learning JavaScript',
      category: 'Data Science',
      tags: ['Technology', 'C Language', 'Programming Concept'],
      readTime: '18 min read',
      author: 'Sarah Wilson',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-green-600 to-teal-600'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Featured <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">Blogs</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest insights, tutorials, and guides from our expert developers and industry professionals.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${blog.gradient} opacity-90`}></div>
                <img 
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-medium rounded-full text-gray-800 dark:text-gray-200">
                    {blog.category}
                  </span>
                </div>

                {/* Read Time */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 text-white/90 text-xs">
                  <Clock className="h-3 w-3" />
                  <span>{blog.readTime}</span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {blog.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{blog.author}</span>
                  </div>
                  
                  <button className="group/btn inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200">
            <span>View All Blogs</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};