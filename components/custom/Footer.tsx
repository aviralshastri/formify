import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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
      { name: 'Twitter', href: 'https://twitter.com/asterforms', external: true },
      { name: 'LinkedIn', href: 'https://linkedin.com/company/asterforms', external: true },
      { name: 'GitHub', href: 'https://github.com/asterforms', external: true },
    ],
  },
];

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Company Info */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 lg:col-span-2 flex flex-col items-start space-y-4"
          >
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={logo}
                  width={50}
                  height={50}
                  alt="Asterforms Logo"
                  className="rounded-lg"
                />
              </motion.div>
              <h2 className="text-xl font-bold text-gray-900">Asterforms</h2>
            </div>
            <p className="text-sm text-gray-600">
              Simplifying form creation and management for businesses of all sizes.
            </p>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={index} 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="col-span-1 lg:col-span-1"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5, color: '#3B82F6' }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Asterforms. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {['Terms of Service', 'Privacy Policy'].map((text, index) => (
              <motion.div
                key={text}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={index === 0 ? "/terms" : "/privacy"}
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {text}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;