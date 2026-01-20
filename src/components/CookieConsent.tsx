import React, { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      // Show popup after a short delay
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 animate-slide-in-up">
      <div className="bg-black/95 backdrop-blur-sm text-white rounded-2xl p-6 shadow-2xl border border-yellow-400/20">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
            <Cookie className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2">We use cookies</h4>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              We use cookies to improve your experience on our website. By continuing to browse, 
              you agree to our use of cookies and our privacy policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptCookies}
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
              >
                Accept All
              </button>
              <button
                onClick={declineCookies}
                className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
              >
                Decline
              </button>
              {/* <button className="text-yellow-400 text-sm hover:text-yellow-300 transition-colors flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Learn More</span>
              </button> */}
            </div>
          </div>
          <button
            onClick={declineCookies}
            className="w-6 h-6 text-gray-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;