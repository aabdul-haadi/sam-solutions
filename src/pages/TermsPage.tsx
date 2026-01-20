import React from 'react';
import { ArrowLeft, FileText, AlertCircle, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface TermsPageProps {
  setCurrentPage?: (page: string) => void;
}

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Web Development: Trends to Watch in 2025",
    date: "March 15, 2024",
    slug: "future-ai-web-development-2025",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Complete Guide to E-commerce SEO: Boost Your Online Store Rankings",
    date: "March 12, 2024",
    slug: "ecommerce-seo-guide",
    image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Building Scalable SaaS Applications: Best Practices and Architecture",
    date: "March 10, 2024",
    slug: "scalable-saas-applications",
    image: "https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "UI/UX Design Trends That Will Dominate 2025",
    date: "March 8, 2024",
    slug: "ui-ux-design-trends-2025",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Implementing AI Chatbots: A Step-by-Step Business Guide",
    date: "March 5, 2024",
    slug: "implementing-ai-chatbots",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Mobile-First Design: Why It's Critical for Modern Websites",
    date: "March 3, 2024",
    slug: "mobile-first-design",
    image: "https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

const TermsPage: React.FC<TermsPageProps> = ({ setCurrentPage }) => {
  const handleBackToHome = () => {
    if (setCurrentPage) {
      setCurrentPage('home');
    }
  };

  // Sort blog posts by date (most recent first)
  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Terms and Conditions</h1>
              <p className="text-gray-300 mt-2">Last updated: July 29, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <div className="max-w-4xl mx-auto">
              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                    <p className="text-yellow-700">
                      Thank you for choosing to be a part of our community at <strong>SAM Creative Solutions</strong>. Please read these <strong>Terms and Conditions</strong> carefully as they govern your access to and use of our services, products, and website. If you have any questions, contact us at <strong>samcreativeofficials@gmail.com</strong>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">1. General Agreement</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    These <strong>Terms and Conditions</strong>, along with any documents referred to herein, constitute a legally binding agreement between you and <strong>SAM Creative Solutions</strong>. By using our services, you acknowledge that you have read, understood, and agreed to these <strong>Terms and Conditions</strong>. If you do not agree to any part of these terms, you should immediately cease using our website or services.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Revisions Policy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>SAM Creative Solutions</strong> provides revisions as part of our service packages, subject to the chosen package and project scope. Revisions will be performed based on the feedback provided by the client after each stage of the project.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Clients are eligible for a set number of <strong>revisions</strong>, depending on the selected package.</li>
                    <li>If additional revisions are requested beyond the agreed limit, they may incur additional charges.</li>
                    <li>All revisions must be requested in writing, and <strong>SAM Creative Solutions</strong> will make reasonable efforts to accommodate such requests within the scope of the project.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Turnaround Time</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The standard turnaround time for most of our project services is between <strong>48 to 72 hours</strong> for each iteration in the development stage. Please note, this is not the complete timeline for project completion. The total project time may vary depending on the complexity and specific requirements of each project.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Initial Development</strong>: 48–72 hours for a single iteration.</li>
                    <li><strong>Final Delivery</strong>: Depends on the complexity of the project and the number of revisions.</li>
                    <li>Clients will be provided with an estimated delivery timeline at the start of the project.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Refund Policy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We understand that expectations may not always align with outcomes, and in such cases, a refund may be requested. However, refunds are subject to the following terms:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>No Refund After Delivery</strong>: Once the final deliverables have been provided, no refund requests will be entertained.</li>
                    <li><strong>Refund Before Project Commencement</strong>: If the refund request is made before the project starts, clients are eligible for a 75% refund of the total amount paid.</li>
                    <li><strong>Refund After Initial Concept Approval</strong>: If the initial concept has been approved but no significant work has been completed, clients may receive a 50% refund.</li>
                    <li><strong>Refund After Substantial Work</strong>: If significant work has already been performed on the project, such as design or development work, clients may receive a 25% refund.</li>
                    <li><strong>No Refund After Approval of Final Files</strong>: Once the final design files are approved and delivered, no refunds will be issued.</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Process for Refund Requests</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Clients seeking a refund must submit a written request to our customer support team at <strong>samcreativeofficials@gmail.com</strong>. To initiate the refund process, clients are required to provide the following details:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>Full Name</li>
                    <li>Contact Information</li>
                    <li>Project Specifications</li>
                    <li>Reason for Refund Request</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We appreciate customer feedback and ask that clients provide a valid reason for the refund request to help us improve our services.
                  </p>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Refund Denial</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>SAM Creative Solutions</strong> reserves the right to deny or cancel any refund requests when deemed necessary, especially if the client has engaged with another provider for the same task. In such cases, the refund request may be considered invalid.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Delivery Policy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    The full project will be delivered on the stated date of the order confirmation, which will be accompanied by a confirmation email. The turnaround time will depend on the package selected, with a minimum delivery time of <strong>two working days</strong>.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Final Ownership Rights</strong>: Ownership rights to the project, including intellectual property rights, are only transferred to the client once all dues are cleared.</li>
                    <li><strong>Late Deliveries</strong>: If there are unforeseen delays, clients will be promptly informed, and an updated delivery schedule will be provided.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Late Payment Policy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    In case the client fails to make payments by the specified due date, a late payment fee of <strong>15%</strong> of the remaining amount will be charged every two weeks until the balance is fully paid.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    If payments remain outstanding for an extended period, <strong>SAM Creative Solutions</strong> reserves the right to suspend services, delay delivery, or take legal action to recover overdue amounts. Clients agree to these late payment terms by engaging with our services.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Payment and Final Deliverables</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    All outstanding payments must be completed before receiving the final deliverables, including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>High-resolution logo files</li>
                    <li>Website source files and access credentials</li>
                    <li>Branding and design assets</li>
                    <li>Any additional services as agreed upon in the project scope</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    Until full payment is received, <strong>SAM Creative Solutions</strong> retains ownership of all designs, website files, and digital assets. Failure to complete payments may result in project suspension or termination without prior notice. Any deposits or partial payments made will be non-refundable.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Website Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Finalized Project Ownership</strong>: Upon the completion and finalization of a project, the client receives 100% ownership of the website and its components.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Prior Work</strong>: <strong>SAM Creative Solutions</strong> retains ownership of any media, content, or design developed during revisions before the final product is approved.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Artwork Rights</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Initial Ownership</strong>: <strong>SAM Creative Solutions</strong> retains initial ownership of any artwork created for the client, including intellectual property rights and copyrights, until payment in full is received.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Transfer of Ownership</strong>: Clients may request ownership transfer of the artwork after full payment. Once the full payment is made, all ownership rights will be transferred to the client.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Portfolio Display</strong>: <strong>SAM Creative Solutions</strong> reserves the right to showcase the created artwork in its portfolio and promotional materials unless explicitly stated otherwise in writing.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Content Creation</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>SAM Creative Solutions</strong> will incorporate product pictures or content exclusively provided by the client. If images need to be purchased online, this will be done only after client approval.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The text or content for the website will be written according to the client's preferences and instructions.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Non-Disclosure Agreement (NDA) & Reputation Management</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>Confidentiality</strong>: <strong>SAM Creative Solutions</strong> maintains strict confidentiality regarding project information and client details. We do not share your personal or project-related information with any third parties unless required by law.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Reputation Management</strong>: Both parties agree not to defame or disparage each other after project completion, and will act in good faith toward maintaining a professional reputation.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Record Maintenance</h2>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>SAM Creative Solutions</strong> keeps a record of finalized product deliveries and all communication to ensure smooth tracking and information management.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Customer Support</h2>
                  <p className="text-gray-700 leading-relaxed">
                    Our support team is available from <strong>Monday to Friday</strong> during regular business hours. In case of emergencies or out-of-hours queries, clients should email <strong>samcreativeofficials@gmail.com</strong>, and we will respond the following business day.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Technical Support Policy</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    <strong>SAM Creative Solutions</strong> focuses on providing digital and website development services, including website deployment and hosting.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li><strong>Website Deployment</strong>: <strong>SAM Creative Solutions</strong> will deploy the website for the client, using our servers or a third-party provider, at no additional charge.</li>
                    <li><strong>Hosting</strong>: Hosting services are provided free of charge but may be subject to third-party terms and conditions.</li>
                    <li><strong>No SLA (Service Level Agreement)</strong>: There is no service-level agreement for technical assistance unless separately agreed upon in an ongoing maintenance service contract.</li>
                  </ul>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">15. Email Setup and Management</h2>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Email Setup Assistance</strong>: <strong>SAM Creative Solutions</strong> will provide necessary settings and guidance for email setup but is not responsible for troubleshooting or managing emails on the client’s end.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">16. Acceptance of Terms</h2>
                  <p className="text-gray-700 leading-relaxed">
                    By using <strong>SAM Creative Solutions</strong>’ website or services, you acknowledge that you have read, understood, and agree to these <strong>terms and conditions</strong>. If you disagree with any part of these terms, you should immediately discontinue using our services and website.
                  </p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">17. Contact Us</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions or concerns about these <strong>Terms and Conditions</strong> or wish to get in touch regarding any other matter, you may contact us via email at <strong>samcreativeofficials@gmail.com</strong>.
                  </p>
                </section>

                {/* Footer CTA */}
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h3>
                  <p className="text-gray-600 mb-6">
                    Our team is here to help clarify any questions you may have about our <strong>terms of service</strong>.
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

              {/* Latest Blogs */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Latest Blogs</h3>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <div
                      key={post.id}
                      className="group cursor-pointer flex items-start space-x-4"
                      onClick={() => setCurrentPage && setCurrentPage(`/blog/${post.slug}`)}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                        <div className="flex items-center text-yellow-600 text-sm font-medium group-hover:text-yellow-700 transition-colors mt-2">
                          Read More
                          <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Follow Us</h3>
                
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <span className="text-sm font-bold">f</span>
                  </a>
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

export default TermsPage;