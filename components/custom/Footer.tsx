import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const footerSections = [
  {
    title: 'Product',
    links: [
      { name: 'Overview', href: '/overview' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Marketplace', href: '/marketplace' },
      { name: 'Features', href: '/features' },
      { name: 'Integrations', href: '/integrations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '/help' },
      { name: 'Sales', href: '/sales' },
      { name: 'Support', href: '/support' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { name: 'Twitter', href: 'https://twitter.com/formify', external: true },
      { name: 'LinkedIn', href: 'https://linkedin.com/company/formify', external: true },
      { name: 'GitHub', href: 'https://github.com/formify', external: true },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-4">
              <Image
                src={logo}
                width={50}
                height={50}
                alt="Formify Logo"
                className="rounded-lg"
              />
              <h2 className="text-xl font-bold text-gray-900">Formify</h2>
            </div>
            <p className="text-sm text-gray-600">
              Simplifying form creation and management for businesses of all sizes.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div 
              key={index} 
              className="col-span-1 lg:col-span-1"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {link.name}
                      {link.external && (
                        <span className="sr-only"> (opens in a new tab)</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Formify. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link 
              href="/terms" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;