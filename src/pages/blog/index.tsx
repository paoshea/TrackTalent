import React from 'react';

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">TrackTalent Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Insights, tips, and stories about career development, talent acquisition, and the future of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured Post */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="/images/hero-image.jpg"
                alt="Featured post"
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-8">
                <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1 rounded-full">
                  Featured
                </span>
                <h2 className="text-2xl font-bold text-white mt-4">
                  The Future of Work: How AI is Transforming Career Development
                </h2>
                <p className="text-gray-200 mt-2">
                  Explore how artificial intelligence is reshaping the way we approach career growth and skill development.
                </p>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          {[1, 2, 3, 4, 5, 6].map((post) => (
            <div key={post} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/hero-image.jpg"
                alt="Post thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span>Career Tips</span>
                  <span className="mx-2">•</span>
                  <span>5 min read</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Essential Skills for the Modern Workplace
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn about the key skills that employers are looking for in today&apos;s rapidly evolving job market.
                </p>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest insights and tips delivered straight to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
