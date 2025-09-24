const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Browse Recipes", href: "#" },
      { name: "Share Recipe", href: "#" },
      { name: "My Favorites", href: "#" },
      { name: "Search", href: "#" }
    ],
    community: [
      { name: "About Us", href: "#" },
      { name: "Community Guidelines", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Contact", href: "#" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" }
    ]
  };

  const socialLinks = [
    { name: "Instagram", icon: "📷", href: "#" },
    { name: "Facebook", icon: "📘", href: "#" },
    { name: "Twitter", icon: "🐦", href: "#" },
    { name: "YouTube", icon: "📺", href: "#" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">🍳</span>
              <h3 className="text-2xl font-bold">RecipeShare</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The ultimate platform for sharing and discovering amazing recipes. 
              Join our community of passionate home cooks today.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-200 transform hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter signup */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Get the latest recipes and cooking tips delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white bg-opacity-10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} RecipeShare. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Made with ❤️ for food lovers</span>
            <span>•</span>
            <span>Powered by Next.js & Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;



