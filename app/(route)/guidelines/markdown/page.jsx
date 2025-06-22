import React from "react";
import {
  FileText,
  Hash,
  Bold,
  Italic,
  Code,
  List,
  Image,
  CheckCircle,
  XCircle,
  Lightbulb,
  Upload,
  AlertTriangle,
  Eye,
  Zap,
} from "lucide-react";

const page = () => {
  return (
    <div className="mt-20 min-h-screen">
      {/* Header */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Markdown Upload Guidelines
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your comprehensive guide to formatting and uploading content using
            our Markdown Upload feature
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Intro Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              What is Markdown Upload?
            </h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                The Markdown Upload feature is your gateway to creating
                professional content effortlessly. Whether you&apos;re publishing
                blog posts, detailed tutorials, or comprehensive technical
                documentation, this tool transforms your Markdown-formatted text
                into beautifully rendered content.
              </p>
              <p>
                Simply write in Markdown syntax, ensure your images and files
                are properly linked, and upload to see your content come to life
                with professional formatting and styling.
              </p>
            </div>
          </div>

          {/* Basic Markdown Rules */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                <Hash className="w-4 h-4 text-emerald-600" />
              </div>
              Basic Markdown Rules
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Hash className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Headings</p>
                    <p className="text-sm text-gray-600">
                      Use # for headings (# H1, ## H2, ### H3)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bold className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Bold Text</p>
                    <p className="text-sm text-gray-600">
                      Use **bold** or __bold__ for emphasis
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Italic className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Italic Text</p>
                    <p className="text-sm text-gray-600">
                      Use *italic* or _italic_ for styling
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Inline Code</p>
                    <p className="text-sm text-gray-600">
                      Use `backticks` for inline code
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Code Blocks</p>
                    <p className="text-sm text-gray-600">
                      Use ``` for multi-line code blocks
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <List className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Lists</p>
                    <p className="text-sm text-gray-600">
                      Use - or * for bullet points, numbers for ordered lists
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                <strong>Pro Tip:</strong> Always separate sections with empty
                lines for better readability and proper formatting.
              </p>
            </div>
          </div>

          {/* Important File/Image Upload Instructions */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-8 shadow-lg border-2 border-yellow-200">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Critical: File & Image Upload Instructions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <XCircle className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-900 mb-2">
                      ❌ What NOT to Do
                    </h3>
                    <ul className="text-red-800 space-y-1 text-sm">
                      <li>
                        • Do not use relative paths like{" "}
                        <code className="bg-red-100 px-1 rounded">
                          ./images/pic.png
                        </code>
                      </li>
                      <li>
                        • Do not use local file paths like{" "}
                        <code className="bg-red-100 px-1 rounded">
                          C:\Users\images\photo.jpg
                        </code>
                      </li>
                      <li>
                        • Do not reference files stored only on your computer
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">
                      ✅ What TO Do
                    </h3>
                    <ul className="text-green-800 space-y-1 text-sm">
                      <li>
                        • Always use complete URLs like{" "}
                        <code className="bg-green-100 px-1 rounded">
                          https://yourcdn.com/assets/image.jpg
                        </code>
                      </li>
                      <li>
                        • Host images on public CDN services (Cloudinary, AWS
                        S3, etc.)
                      </li>
                      <li>
                        • Use image hosting services like Imgur, Pexels, or
                        Unsplash
                      </li>
                      <li>• Ensure all file URLs are publicly accessible</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Image className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">
                    Recommended Image Services
                  </h3>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div>• Cloudinary</div>
                  <div>• AWS S3</div>
                  <div>• Imgur</div>
                  <div>• Pexels</div>
                  <div>• Unsplash</div>
                  <div>• ImageBB</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/50">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <Lightbulb className="w-4 h-4 text-purple-600" />
              </div>
              Pro Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Preview First</p>
                    <p className="text-sm text-gray-600">
                      Always preview your Markdown in a editor before uploading
                      to catch formatting issues early.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">Test Links</p>
                    <p className="text-sm text-gray-600">
                      Verify all URLs work by opening them in a new browser tab
                      before uploading.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Optimize Performance
                    </p>
                    <p className="text-sm text-gray-600">
                      Keep images under 1MB and use appropriate formats (WebP,
                      JPEG) for faster loading.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Consistent Formatting
                    </p>
                    <p className="text-sm text-gray-600">
                      Use consistent spacing and formatting throughout your
                      document for professional results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Ready to Upload?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                Head to the Markdown Upload panel and paste your well-formatted
                content with proper image and file URLs!
              </p>
              <div className="inline-flex items-center space-x-4">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg">
                  Go to Upload Panel
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                  View Examples
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Need help? Check our documentation or contact support for
            personalized assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
