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
      { name: "Guidelines", href: "#" },
      { name: "Help", href: "#" },
      { name: "Contact", href: "#" }
    ],
    legal: [
      { name: "Privacy", href: "#" },
      { name: "Terms", href: "#" },
      { name: "Cookies", href: "#" },
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🍳</span>
              <h3 className="text-xl font-bold">RecipeShare</h3>
            </div>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20 transition-all duration-200"
                  aria-label={social.name}
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Product</h4>
            <ul className="space-y-1 text-sm">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Community</h4>
            <ul className="space-y-1 text-sm">
              {footerLinks.community.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-sm">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}ç
        <div className="mt-6 pt-4 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <span>© {currentYear} RecipeShare</span>
          <span>Made with ❤️</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
