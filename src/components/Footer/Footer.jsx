import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap -m-6">
          
          
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-6 inline-flex items-center">
                <Logo width="120px" />
              </div>
              <div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  &copy; {new Date().getFullYear()} Vellum. All Rights Reserved.
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  
                </p>
              </div>
            </div>
          </div>

          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase text-gray-900">
                Company
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase text-gray-900">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Account
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Help
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="mb-6 text-sm font-semibold tracking-wider uppercase text-gray-900">
                Legals
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-base text-gray-600 transition-colors duration-200 hover:text-blue-600">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;