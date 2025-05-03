export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 
text-white flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <div className="text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold 
mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r 
from-pink-400 to-purple-500">
          Oops! Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-6">
          This page wandered off like a creator’s next big idea. But 
here’s a spark: Meet Alex, a vlogger who earned €3.4K with Audiantix!
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 
sm:space-y-0 sm:space-x-6">
          <a
            href="/creator-studio"
            className="px-8 py-4 bg-pink-500 text-white rounded-full 
font-semibold text-lg hover:bg-pink-600 transition-all duration-300"
          >
            Join as a Creator
          </a>
          <a
            href="/brand-dashboard"
            className="px-8 py-4 border-2 border-pink-400 text-pink-400 
rounded-full font-semibold text-lg hover:bg-pink-400 hover:text-white 
transition-all duration-300"
          >
            Explore as a Brand
          </a>
        </div>
      </div>
    </div>
  );
}
