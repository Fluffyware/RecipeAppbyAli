const Features = () => {
  const features = [
    {
      icon: "🍳",
      title: "Easy Recipe Sharing",
      description: "Upload your favorite recipes with photos, ingredients, and step-by-step instructions in minutes.",
      color: "from-pink-400 to-rose-400"
    },
    {
      icon: "🔍",
      title: "Smart Search & Filter",
      description: "Find exactly what you're looking for with our powerful search and filter system by cuisine, time, or ingredients.",
      color: "from-purple-400 to-indigo-400"
    },
    {
      icon: "⭐",
      title: "Rate & Review",
      description: "Share your cooking experience with ratings and comments to help others discover the best recipes.",
      color: "from-yellow-400 to-orange-400"
    },
    {
      icon: "❤️",
      title: "Save Favorites",
      description: "Bookmark your favorite recipes to easily access them later and build your personal recipe collection.",
      color: "from-red-400 to-pink-400"
    },
    {
      icon: "👥",
      title: "Community Driven",
      description: "Connect with fellow food lovers, follow your favorite cooks, and discover trending recipes.",
      color: "from-green-400 to-teal-400"
    },
    {
      icon: "📱",
      title: "Mobile Friendly",
      description: "Access your recipes anywhere with our responsive design that works perfectly on all devices.",
      color: "from-blue-400 to-cyan-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Share & Discover Recipes
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform makes it easy to share your culinary creations and discover amazing recipes from our vibrant community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, ${feature.color})` }}></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300 transform translate-x-6 -translate-y-6`}></div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Culinary Journey?
            </h3>
            <p className="text-gray-600 mb-6">
              Join our community of passionate home cooks and start sharing your favorite recipes today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                Create Account
              </button>
              <button className="border-2 border-purple-300 text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;



