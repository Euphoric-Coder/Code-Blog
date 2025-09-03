import React, { useState } from 'react';
import { ArrowLeft, Copy, Download, Share2, Heart, Eye, User, Calendar, Tag, Code2, Check, ExternalLink, Bookmark } from 'lucide-react';
import SnippetBlock from './SnippetBlock';
import { ModeToggle } from '../theme-btn';

export const CodeSnippetPage = () => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Mock data - in real app this would come from props or API
  const snippet = {
    id: 1,
    title: "React Custom Hook for API Calls",
    description:
      "A reusable custom hook for handling API requests with loading states and error handling.",
    language: "JavaScript",
    category: "Utilities",
    subcategory: "React Hooks",
    tags: ["React", "Hooks", "API", "TypeScript", "Custom Hook"],
    author: "Alex Chen",
    publishDate: "2024-04-17",
    code: `import { useState, useEffect } from 'react';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const useApi = <T>(
  url: string, 
  options: UseApiOptions = {}
): ApiResponse<T> & { refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(options.immediate !== false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      if (options.onError) {
        options.onError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.immediate !== false) {
      fetchData();
    }
  }, [url]);

  return { 
    data, 
    loading, 
    error, 
    refetch: fetchData 
  };
};

export default useApi;

// Usage Example:
// const { data, loading, error, refetch } = useApi<User[]>('/api/users');`,
    views: 8900,
    likes: 1250,
    downloads: 450,
    featured: true,
    trending: true,
    htmlContent: `
      <h2>Overview</h2>
      <p>This custom React hook simplifies API calls by providing a clean interface for handling loading states, error management, and data fetching. It's designed to be reusable across your application and follows React best practices.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li><strong>Automatic Loading States:</strong> Manages loading state automatically during API calls</li>
        <li><strong>Error Handling:</strong> Catches and formats errors with meaningful messages</li>
        <li><strong>TypeScript Support:</strong> Fully typed with generic support for response data</li>
        <li><strong>Flexible Options:</strong> Configurable with success/error callbacks</li>
        <li><strong>Manual Refetch:</strong> Provides a refetch function for manual data updates</li>
      </ul>

      <h3>Parameters</h3>
      <ul>
        <li><code>url</code> - The API endpoint URL to fetch data from</li>
        <li><code>options</code> - Configuration object with the following properties:
          <ul>
            <li><code>immediate</code> - Whether to fetch data immediately on mount (default: true)</li>
            <li><code>onSuccess</code> - Callback function called when the request succeeds</li>
            <li><code>onError</code> - Callback function called when the request fails</li>
          </ul>
        </li>
      </ul>

      <h3>Return Value</h3>
      <p>The hook returns an object with the following properties:</p>
      <ul>
        <li><code>data</code> - The fetched data (null if not loaded or error occurred)</li>
        <li><code>loading</code> - Boolean indicating if a request is in progress</li>
        <li><code>error</code> - Error message string (null if no error)</li>
        <li><code>refetch</code> - Function to manually trigger a new API call</li>
      </ul>

      <h3>Usage Examples</h3>
      <p>Here are some common usage patterns:</p>
      
      <h4>Basic Usage</h4>
      <pre><code>const { data, loading, error } = useApi&lt;User[]&gt;('/api/users');</code></pre>
      
      <h4>With Success Callback</h4>
      <pre><code>const { data, loading, error } = useApi('/api/users', {
  onSuccess: (users) => console.log('Loaded users:', users),
  onError: (error) => console.error('Failed to load users:', error)
});</code></pre>
      
      <h4>Manual Fetching</h4>
      <pre><code>const { data, loading, error, refetch } = useApi('/api/users', {
  immediate: false
});

// Later, trigger the API call manually
const handleLoadUsers = () => {
  refetch();
};</code></pre>

      <h3>Best Practices</h3>
      <ul>
        <li>Always handle the loading and error states in your components</li>
        <li>Use TypeScript generics to ensure type safety for your API responses</li>
        <li>Consider implementing retry logic for failed requests</li>
        <li>Use the refetch function for user-triggered data updates</li>
      </ul>
    `,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([snippet.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${snippet.title.toLowerCase().replace(/\s+/g, '-')}.${snippet.language.toLowerCase() === 'typescript' ? 'ts' : 'js'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareSnippet = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: snippet.title,
          text: snippet.description,
          url: window.location.href
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const getLanguageColor = (language) => {
    const colors = {
      'TypeScript': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      'JavaScript': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Python': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
      'CSS': 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
      'Go': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
    };
    return colors[language] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Snippets
            </button>

            <div className="flex items-center space-x-3">
              <ModeToggle />
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Bookmark className="h-5 w-5" />
              </button>
              <button
                onClick={shareSnippet}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            {/* Title and Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-8">
              <div className="space-y-4 lg:space-y-6">
                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  {snippet.featured && (
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                  {snippet.trending && (
                    <span className="px-3 py-1 bg-gradient-to-r from-red-400 to-pink-500 text-white text-sm font-semibold rounded-full">
                      Trending
                    </span>
                  )}
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getLanguageColor(snippet.language)}`}>
                    {snippet.language}
                  </span>
                </div>

                {/* Title with Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {snippet.title}
                  </h1>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={toggleLike}
                      className={`p-2 rounded-lg transition-colors ${
                        liked
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={liked ? 'Unlike' : 'Like'}
                    >
                      <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={copyToClipboard}
                      className={`p-2 rounded-lg transition-colors ${
                        copied
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                      }`}
                      title="Copy code"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={downloadCode}
                      className="p-2 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                      title="Download code"
                    >
                      <Download className="h-4 w-4" />
                    </button>

                    <button
                      onClick={toggleBookmark}
                      className={`p-2 rounded-lg transition-colors ${
                        bookmarked
                          ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      title={bookmarked ? 'Remove bookmark' : 'Bookmark'}
                    >
                      <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={shareSnippet}
                      className="p-2 bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Share snippet"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {snippet.description}
                </p>

                {/* Meta Info */}
                <div className="md:flex flex-wrap grid grid-cols-2 items-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{snippet.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(snippet.publishDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>{snippet.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>{snippet.likes.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>{snippet.downloads.toLocaleString()} downloads</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HTML Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-8">
              <div 
                className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: snippet.htmlContent }}
              />
            </div>

            {/* Code Block */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
              <SnippetBlock
                language={snippet.language.toLowerCase()}
                title={`${snippet.title} - ${snippet.language}`}
                showDownload={true}
                onDownload={downloadCode}
              >
                {snippet.code}
              </SnippetBlock>
            </div>
          </div>

          {/* Sidebar - Classification */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Classification
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Category
                  </label>
                  <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-3xl">
                    {snippet.category}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Subcategory
                  </label>
                  <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-3xl">
                    {snippet.subcategory}
                  </span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {snippet.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <div className="flex flex-col space-y-3">
          <button
            onClick={copyToClipboard}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
              copied
                ? 'bg-green-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {copied ? (
              <Check className="h-6 w-6 mx-auto" />
            ) : (
              <Copy className="h-6 w-6 mx-auto" />
            )}
          </button>
          
          <button
            onClick={toggleLike}
            className={`w-14 h-14 rounded-full shadow-lg transition-all duration-200 ${
              liked
                ? 'bg-red-500 text-white'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            <Heart className={`h-6 w-6 mx-auto ${liked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};