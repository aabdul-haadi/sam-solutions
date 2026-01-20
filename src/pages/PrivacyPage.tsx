import React from 'react';
import { ArrowLeft, Shield, Lock, Mail, Phone, MapPin } from 'lucide-react';

interface PrivacyPageProps {
  setCurrentPage?: (page: string) => void;
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ setCurrentPage }) => {
  const handleBackToHome = () => {
    if (setCurrentPage) {
      setCurrentPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <button 
            onClick={handleBackToHome}
            className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
              <p className="text-gray-300 mt-2">Last updated: July 29, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="max-w-4xl mx-auto">
              {/* Privacy Commitment */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-2">Our Privacy Commitment</h3>
                    <p className="text-blue-700">
                      At SAM Creative Solutions, we value your privacy and are committed to protecting your personal information. This policy outlines how we collect,
                       use, disclose, and protect your data. Contact us at samcreativeofficials@gmail.com or +92 326 3778850 with any questions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <section id="section1" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Information We Collect</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To provide you with our services and improve your experience with SAM Creative Solutions, we collect the following types of information:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    When you interact with our website, engage in communication with us, or use our services, we may collect certain <strong>personal information</strong>, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Name</strong>: To identify you when communicating or engaging with us.</li>
                    <li><strong>Email Address</strong>: To send you updates, promotional content, and important information about your services or requests.</li>
                    <li><strong>Phone Number</strong>: To reach out to you directly for customer service, inquiries, or urgent updates.</li>
                    <li><strong>Postal Address</strong>: For shipping, billing, and service-related communications.</li>
                    <li><strong>Account Information</strong>: If you create an account with us, we may collect your username, password, and other account details.</li>
                    <li><strong>Payment Information</strong>: For transactions, we may collect payment details such as credit card information or billing address to process your payments securely (though we do not store credit card information).</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1.2 Non-Personal Information</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may also collect <strong>non-personal</strong> or aggregate data, which cannot be used to personally identify you. This data is used to analyze trends, enhance user experience, and improve our website's functionality. This includes:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Browser Information</strong>: Type of browser, version, and other technical details.</li>
                    <li><strong>Device Information</strong>: Type of device used to access our website (e.g., mobile, desktop, etc.).</li>
                    <li><strong>Location Information</strong>: General location data (such as IP address or GPS data) that helps us understand the geographic distribution of users.</li>
                    <li><strong>Log Data</strong>: Server logs which may include information such as your IP address, access times, pages visited, and the referring URL.</li>
                  </ul>
                </section>

                <section id="section2" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. How We Use Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We collect and use your information for various purposes to enhance your experience and provide the best possible service. Below are the ways in which we use the information we collect:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Providing Services and Communication</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Personalized Experience</strong>: We use your personal details to tailor our website, services, and content to your needs. For instance, if you provide preferences or interests, we may use this to recommend relevant products, services, or content.</li>
                    <li><strong>Customer Support</strong>: To address your queries, requests, and issues, we use your contact information to ensure timely and effective support.</li>
                    <li><strong>Order Fulfillment</strong>: Your information is used to process and fulfill orders, manage shipments, and send notifications regarding the status of your services.</li>
                    <li><strong>Transactional Communications</strong>: We may use your email address or phone number to send you important transactional messages, such as order confirmations, billing information, and shipping notifications.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Marketing and Promotional Activities</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Email Marketing</strong>: With your consent, we may use your email address to send you newsletters, promotional offers, product updates, or other marketing communications. You may opt out of these communications at any time by clicking the unsubscribe link in the emails or contacting us directly.</li>
                    <li><strong>Targeted Advertising</strong>: We may use the information you share with us to show you targeted advertisements based on your preferences and behavior. This includes advertisements on social media, search engines, or other third-party websites.</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Improvement of Services</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Site Optimization</strong>: We use the data we collect to enhance the functionality, usability, and content of our website. For example, understanding how users navigate our site allows us to improve the user interface and design.</li>
                    <li><strong>Market Research</strong>: We may aggregate the data for internal purposes to understand trends, consumer preferences, and other relevant insights, helping us refine our services and strategies.</li>
                    <li><strong>Security and Fraud Prevention</strong>: Your information is used to detect and prevent any fraudulent activities, and to enhance the overall security of our website and services.</li>
                  </ul>
                </section>

                <section id="section3" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. How We Use Cookies</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    To provide you with a personalized and improved experience, <strong>SAM Creative Solutions</strong> uses <strong>cookies</strong> and similar technologies on our website. Cookies are small text files placed on your device to store preferences, track website activity, and improve overall functionality. By using our website, you consent to our use of cookies, but you can adjust your browser settings to manage cookie preferences or opt out of them.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Types of Cookies We Use</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Essential Cookies</strong>: These cookies are necessary for the basic operation of the website. They allow you to navigate the site and use its features.</li>
                    <li><strong>Performance Cookies</strong>: These cookies gather information about how users interact with the website, helping us analyze and improve performance.</li>
                    <li><strong>Functional Cookies</strong>: These cookies enable enhanced functionality, such as remembering your preferences or language choices across sessions.</li>
                    <li><strong>Targeting/Advertising Cookies</strong>: These cookies are used to display ads that are more relevant to you based on your interests and browsing habits.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You can choose to disable cookies through your browser settings, but please note that doing so may affect certain functionalities of the website.
                  </p>
                </section>

                <section id="section4" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Do We Share Your Data with Third Parties?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    At <strong>SAM Creative Solutions</strong>, your <strong>privacy</strong> is a top priority. We do not sell, trade, or otherwise share your personal information with third parties for their marketing purposes. However, there are certain circumstances where we may share information:
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Third-Party Service Providers</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may share your data with trusted <strong>third-party service providers</strong> who help us with the operation of our website and services, such as hosting services, payment processors, email delivery services, and marketing platforms. These third parties are contractually obligated to keep your information secure and to use it only for the purposes specified by <strong>SAM Creative Solutions</strong>.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Obligations</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We may disclose your information when required by law, or in response to a valid legal request (such as a court order or government inquiry). This is done to protect our rights, investigate fraud, comply with legal processes, or respond to a legitimate request from authorities.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Business Transfers</h3>
                  <p className="text-gray-700 leading-relaxed">
                    In the event of a merger, acquisition, or sale of assets, your personal information may be transferred as part of the transaction. We will ensure that your data is adequately protected during such a transfer.
                  </p>
                </section>

                <section id="section5" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. How We Protect Your Information</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>SAM Creative Solutions</strong> takes <strong>security</strong> very seriously. We employ a variety of technical and organizational measures to protect your personal data:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Encryption</strong>: Sensitive information such as payment details is encrypted using industry-standard protocols during transmission.</li>
                    <li><strong>Secure Storage</strong>: Personal data is stored in secure, password-protected databases.</li>
                    <li><strong>Access Controls</strong>: Only authorized personnel have access to your data, and we maintain strict controls to prevent unauthorized access.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Despite these measures, no method of online transmission is 100% secure, and we cannot guarantee the absolute security of your information. Therefore, it is essential that you access our website and services from a secure environment.
                  </p>
                </section>

                <section id="section6" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Your Rights and Choices</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    You have several rights regarding your personal data, and we are committed to ensuring you can exercise these rights easily:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Right to Access</strong>: You can request access to the personal information we hold about you. We will provide a copy of your data upon request, subject to any legal exemptions.</li>
                    <li><strong>Right to Rectification</strong>: If any of your personal data is incorrect or incomplete, you can request that we update or correct it.</li>
                    <li><strong>Right to Erasure</strong>: In some circumstances, you have the right to request that we delete your personal information. This right may be subject to certain legal exceptions.</li>
                    <li><strong>Right to Object to Processing</strong>: You can object to the processing of your personal data in certain situations, particularly if we are relying on legitimate interests as the legal basis for processing.</li>
                    <li><strong>Right to Withdraw Consent</strong>: If you have previously given your consent to our processing of your data (e.g., for marketing purposes), you may withdraw that consent at any time.</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    For any inquiries or to exercise your rights, please contact us at <strong>samcreativeofficials@gmail.com</strong>.
                  </p>
                </section>

                <section id="section7" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Updates to This Privacy Policy</h2>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>SAM Creative Solutions</strong> may update this <strong>Privacy Policy</strong> from time to time to comply with legal requirements or reflect changes in our services. Any updates will be posted on this page with an updated "Revised" date. We encourage you to review this <strong>Privacy Policy</strong> periodically to stay informed of how we are protecting your information.
                  </p>
                </section>

                <section id="section8" className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions, concerns, or requests regarding this <strong>Privacy Policy</strong>, please contact our support team at <strong>samcreativeofficials@gmail.com</strong> or call us at <strong>+92 326 3778850</strong>.
                  </p>
                </section>

                {/* Footer CTA */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-800">Your Data, Your Rights</h3>
                  </div>
                  <p className="text-gray-600 mb-6">
                    We're committed to transparency and protecting your <strong>privacy</strong>. Contact us with any questions or to exercise your data rights.
                  </p>
                  <button 
                    onClick={() => setCurrentPage && setCurrentPage('contact')}
                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
                  >
                    Contact Our Team
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Sidebar */}
          <div className="lg:col-span-4">
            <div className="space-y-8 sticky top-20">
              {/* Contact Details */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                      <p className="text-gray-600 mb-2">samcreativeofficials@gmail.com</p>
                      <p className="text-sm text-gray-500">We'll respond within 1 hour</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                      <p className="text-gray-600 mb-2">+92 326 3778850</p>
                      <p className="text-gray-600 mb-2">+92 313 8372573</p>
                      <p className="text-sm text-gray-500">Mon-Sat, 9AM-6PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Get an Appointment</h4>
                      <p className="text-sm text-gray-500 mb-2">We're available by appointment only.</p>
                      <a 
                        href="https://wa.me/923263778850" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Book via WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose SAM CREATIVE?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Team</h4>
                      <p className="text-sm text-gray-700">Skilled professionals with years of experience</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Custom Solutions</h4>
                      <p className="text-sm text-gray-700">Tailored to your specific business needs</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Proven Results</h4>
                      <p className="text-sm text-gray-700">150+ successful projects delivered</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                      <p className="text-sm text-gray-700">Continuous support and maintenance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table of Contents */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Table of Contents</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="#section1" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      1. Information We Collect
                    </a>
                  </li>
                  <li>
                    <a href="#section2" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      2. How We Use Your Information
                    </a>
                  </li>
                  <li>
                    <a href="#section3" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      3. How We Use Cookies
                    </a>
                  </li>
                  <li>
                    <a href="#section4" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      4. Do We Share Your Data with Third Parties?
                    </a>
                  </li>
                  <li>
                    <a href="#section5" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      5. How We Protect Your Information
                    </a>
                  </li>
                  <li>
                    <a href="#section6" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      6. Your Rights and Choices
                    </a>
                  </li>
                  <li>
                    <a href="#section7" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      7. Updates to This Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#section8" className="text-gray-700 hover:text-yellow-600 transition-colors">
                      8. Contact Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <span className="text-sm font-bold">f</span>
                  </a>
                  {/* <a href="#" className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors">
                    <span className="text-sm font-bold">𝕏</span>
                  </a> */}
                  <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <span className="text-sm font-bold">in</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                    <span className="text-sm font-bold">ig</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;