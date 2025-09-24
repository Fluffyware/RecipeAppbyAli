const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Sign Up & Create Profile",
      description: "Create your account in seconds and set up your profile to start your culinary journey.",
      icon: "👤",
      color: "from-pink-400 to-rose-400"
    },
    {
      number: "02", 
      title: "Share Your Recipes",
      description: "Upload your favorite recipes with photos, ingredients, and detailed cooking instructions.",
      icon: "📝",
      color: "from-purple-400 to-indigo-400"
    },
    {
      number: "03",
      title: "Discover & Save",
      description: "Browse thousands of recipes, save your favorites, and connect with other food lovers.",
      icon: "🔍",
      color: "from-blue-400 to-cyan-400"
    },
    {
      number: "04",
      title: "Rate & Review",
      description: "Share your cooking experience with ratings and comments to help the community.",
      icon: "⭐",
      color: "from-yellow-400 to-orange-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in just a few simple steps and join our amazing community of home cooks.
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  {/* Step number background */}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Decorative circle */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r ${step.color} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Thousands of Happy Cooks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5,000+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600 mb-2">10,000+</div>
                <div className="text-gray-600">Recipes Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                <div className="text-gray-600">Reviews & Ratings</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;



