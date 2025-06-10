import React from 'react';
import { ArrowRight, Clock, User, Tag, Play, BookOpen, Star } from 'lucide-react';

export const FeaturedTutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Complete React Hooks Masterclass',
      description: 'Master React Hooks from basics to advanced patterns with real-world examples and best practices.',
      category: 'React',
      tags: ['React', 'Hooks', 'Frontend'],
      duration: '4.5 hours',
      lessons: 24,
      level: 'Intermediate',
      author: 'Sarah Chen',
      rating: 4.9,
      students: 12500,
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      id: 2,
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB from scratch.',
      category: 'Backend',
      tags: ['Node.js', 'Express', 'MongoDB'],
      duration: '6 hours',
      lessons: 32,
      level: 'Beginner',
      author: 'Mike Rodriguez',
      rating: 4.8,
      students: 8900,
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-green-600 to-teal-600'
    },
    {
      id: 3,
      title: 'Python Data Science Bootcamp',
      description: 'Learn data analysis, visualization, and machine learning with Python, Pandas, and Scikit-learn.',
      category: 'Data Science',
      tags: ['Python', 'Data Science', 'ML'],
      duration: '8 hours',
      lessons: 45,
      level: 'Intermediate',
      author: 'Dr. Emily Watson',
      rating: 4.9,
      students: 15600,
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      id: 4,
      title: 'DevOps with Docker & Kubernetes',
      description: 'Master containerization and orchestration with Docker and Kubernetes for modern deployments.',
      category: 'DevOps',
      tags: ['Docker', 'Kubernetes', 'DevOps'],
      duration: '5.5 hours',
      lessons: 28,
      level: 'Advanced',
      author: 'Alex Thompson',
      rating: 4.7,
      students: 7200,
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=500',
      gradient: 'from-indigo-600 to-blue-600'
    }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Featured <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Tutorials</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive step-by-step tutorials to master new technologies and advance your development skills.
          </p>
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tutorials.map((tutorial) => (
            <article 
              key={tutorial.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-2"
            >
              {/* Tutorial Image */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${tutorial.gradient} opacity-90`}></div>
                <img 
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-medium rounded-full text-gray-800 dark:text-gray-200">
                    {tutorial.category}
                  </span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                </div>
              </div>

              {/* Tutorial Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                  {tutorial.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {tutorial.description}
                </p>

                {/* Tutorial Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{tutorial.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{tutorial.lessons} lessons</span>
                  </div>
                </div>

                {/* Rating and Students */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tutorial.rating}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">({tutorial.students.toLocaleString()})</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-md"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Start Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tutorial.author}</span>
                  </div>
                  
                  <button className="group/btn inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium transition-colors">
                    Start Tutorial
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 transition-all duration-200">
            <span>View All Tutorials</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};