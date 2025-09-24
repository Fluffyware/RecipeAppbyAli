const Testimonials = () => {
  const testimonials = [
    {
      name: "Irfan",
      role: "Home Cook",
      age: "28",
      avatar: "👨‍🍳",
      content: "I've discovered so many amazing recipes here! The community is incredibly supportive and I love sharing my family's traditional dishes.",
      rating: 5,
      color: "from-pink-400 to-rose-400"
    },
    {
      name: "Siti",
      role: "Food Blogger",
      age: "35", 
      avatar: "👩‍🍳",
      content: "RecipeShare has been a game-changer for my food blog. The photo upload feature and detailed recipe format are perfect for sharing my creations.",
      rating: 5,
      color: "from-purple-400 to-indigo-400"
    },
    {
      name: "Aldi",
      role: "Student",
      age: "22",
      avatar: "👨‍🎓",
      content: "As a student on a budget, I love finding quick and affordable recipes here. The search filters help me find exactly what I need!",
      rating: 5,
      color: "from-blue-400 to-cyan-400"
    },
    {
      name: "Maria",
      role: "Professional Chef",
      age: "42",
      avatar: "👩‍🍳",
      content: "I've been cooking professionally for 20 years, and this platform has introduced me to so many new techniques and flavor combinations from home cooks worldwide.",
      rating: 5,
      color: "from-green-400 to-teal-400"
    },
    {
      name: "David",
      role: "Father of 3",
      age: "38",
      avatar: "👨‍👧‍👦",
      content: "Finding kid-friendly recipes that actually taste good is a challenge, but RecipeShare has made it so much easier. My kids love the meals I make from recipes I found here!",
      rating: 5,
      color: "from-yellow-400 to-orange-400"
    },
    {
      name: "Lisa",
      role: "Health Enthusiast",
      age: "29",
      avatar: "🏃‍♀️",
      content: "I love how I can filter recipes by dietary preferences and cooking time. The nutritional information and healthy alternatives suggested by the community are incredibly helpful.",
      rating: 5,
      color: "from-red-400 to-pink-400"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied home cooks who have transformed their cooking experience with RecipeShare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Background decoration */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${testimonial.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform translate-x-6 -translate-y-6`}></div>
              
              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                
                {/* Testimonial content */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                
                {/* User info */}
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.age}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community stats */}
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-gray-600">
              Be part of a vibrant community of food lovers sharing their passion for cooking.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600 mb-2">5,000+</div>
              <div className="text-gray-600 text-sm">Recipes Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25,000+</div>
              <div className="text-gray-600 text-sm">Reviews Written</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600 text-sm">Recipes Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;



