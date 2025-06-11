import React from "react";
import {
  ArrowRight,
  Heart,
  Eye,
  Copy,
  Code2,
  Star,
  Download,
  User,
} from "lucide-react";

export const TopCodeSnippets = () => {
  const snippets = [
    {
      id: 1,
      title: "React Custom Hook for API Calls",
      description:
        "A reusable custom hook for handling API requests with loading states and error handling.",
      language: "TypeScript",
      author: "Alex Chen",
      likes: 1250,
      views: 8900,
      downloads: 450,
      tags: ["React", "Hooks", "API"],
      code: `const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};`,
      gradient: "from-blue-500 to-cyan-500",
      featured: true,
    },
    {
      id: 2,
      title: "Python Data Validator",
      description:
        "Elegant data validation utility with custom error messages and type checking.",
      language: "Python",
      author: "Maria Rodriguez",
      likes: 890,
      views: 5600,
      downloads: 320,
      tags: ["Python", "Validation", "Utils"],
      code: `class DataValidator:
    def __init__(self, data):
        self.data = data
        self.errors = []
    
    def required(self, field):
        if field not in self.data or not self.data[field]:
            self.errors.append(f"{field} is required")
        return self
    
    def email(self, field):
        import re
        pattern = r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$'
        if field in self.data and not re.match(pattern, self.data[field]):
            self.errors.append(f"{field} must be a valid email")
        return self`,
      gradient: "from-green-500 to-emerald-500",
      featured: false,
    },
    {
      id: 3,
      title: "CSS Grid Auto-Fit Layout",
      description:
        "Responsive grid layout that automatically adjusts columns based on container width.",
      language: "CSS",
      author: "David Kim",
      likes: 2100,
      views: 12400,
      downloads: 780,
      tags: ["CSS", "Grid", "Responsive"],
      code: `.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-8px);
}`,
      gradient: "from-purple-500 to-pink-500",
      featured: true,
    },
    {
      id: 4,
      title: "Node.js Rate Limiter Middleware",
      description:
        "Express middleware for rate limiting with Redis backend and customizable rules.",
      language: "JavaScript",
      author: "Sarah Johnson",
      likes: 1580,
      views: 9200,
      downloads: 620,
      tags: ["Node.js", "Express", "Security"],
      code: `const rateLimit = (options = {}) => {
  const { windowMs = 15 * 60 * 1000, max = 100 } = options;
  const requests = new Map();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!requests.has(key)) {
      requests.set(key, []);
    }
    
    const userRequests = requests.get(key)
      .filter(time => time > windowStart);
    
    if (userRequests.length >= max) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    
    userRequests.push(now);
    requests.set(key, userRequests);
    next();
  };
};`,
      gradient: "from-orange-500 to-red-500",
      featured: false,
    },
    {
      id: 5,
      title: "Vue 3 Composable for Local Storage",
      description:
        "Reactive composable for managing localStorage with automatic JSON serialization.",
      language: "TypeScript",
      author: "Emma Wilson",
      likes: 750,
      views: 4300,
      downloads: 280,
      tags: ["Vue", "Composables", "Storage"],
      code: `import { ref, watch, Ref } from 'vue';

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [Ref<T>, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue;
  
  const state = ref<T>(initial);
  
  const setValue = (value: T) => {
    state.value = value;
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  watch(state, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });
  
  return [state, setValue];
}`,
      gradient: "from-teal-500 to-blue-500",
      featured: false,
    },
    {
      id: 6,
      title: "Go HTTP Client with Retry Logic",
      description:
        "Robust HTTP client with exponential backoff retry mechanism and timeout handling.",
      language: "Go",
      author: "Michael Chang",
      likes: 920,
      views: 6100,
      downloads: 380,
      tags: ["Go", "HTTP", "Resilience"],
      code: `package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

type RetryClient struct {
    client      *http.Client
    maxRetries  int
    backoffBase time.Duration
}

func NewRetryClient(maxRetries int) *RetryClient {
    return &RetryClient{
        client:      &http.Client{Timeout: 30 * time.Second},
        maxRetries:  maxRetries,
        backoffBase: time.Second,
    }
}

func (rc *RetryClient) Do(req *http.Request) (*http.Response, error) {
    var resp *http.Response
    var err error
    
    for i := 0; i <= rc.maxRetries; i++ {
        resp, err = rc.client.Do(req)
        if err == nil && resp.StatusCode < 500 {
            return resp, nil;
        }
        
        if i < rc.maxRetries {
            backoff := rc.backoffBase * time.Duration(1<<uint(i));
            time.Sleep(backoff);
        }
    }
    
    return resp, err;
}`,
      gradient: "from-indigo-500 to-purple-500",
      featured: true,
    },
  ];

  const getLanguageColor = (language) => {
    const colors = {
      TypeScript:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      JavaScript:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      Python:
        "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      CSS: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      Go: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
      Vue: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    };
    return (
      colors[language] ||
      "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Top{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Code Snippets
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover and share useful code snippets created by the community.
            Copy, learn, and contribute your own solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {snippets.map((snippet) => (
            <article
              key={snippet.id}
              className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                snippet.featured
                  ? "ring-2 ring-orange-200 dark:ring-orange-800"
                  : ""
              }`}
            >
              <div
                className={`relative h-32 bg-gradient-to-br ${snippet.gradient} p-4`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Code2 className="h-5 w-5 text-white" />
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getLanguageColor(snippet.language)}`}
                    >
                      {snippet.language}
                    </span>
                  </div>
                  {snippet.featured && (
                    <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="h-3 w-3 text-yellow-300 fill-current" />
                      <span className="text-xs text-white font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 bg-black/20 backdrop-blur-sm rounded-lg p-3 overflow-hidden">
                  <pre className="text-xs text-white/90 font-mono leading-relaxed">
                    <code>
                      {snippet.code.split("\n").slice(0, 3).join("\n")}...
                    </code>
                  </pre>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                  {snippet.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {snippet.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{snippet.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{snippet.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4" />
                      <span>{snippet.downloads}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {snippet.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {snippet.author}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button className="group/btn inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium transition-colors">
                      View
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-red-500 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-0.5 transition-all duration-200">
            <span>Browse All Snippets</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
