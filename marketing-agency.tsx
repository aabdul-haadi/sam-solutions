// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>OmniReach - #1 Marketing Agency | Premium Digital Marketing Services</title>
//     <meta name="description" content="Professional marketing agency services including digital strategy, performance marketing, social media management, and creative design solutions. Get your free consultation today.">
//     <meta name="keywords" content="marketing agency, digital marketing, performance marketing, social media management, SEO, paid media, creative design">

//     <!-- Open Graph Meta Tags -->
//     <meta property="og:title" content="OmniReach - #1 Marketing Agency | Premium Digital Marketing Services" />
//     <meta property="og:description" content="Professional marketing agency services including digital strategy, performance marketing, social media management, and creative design solutions." />
//     <meta property="og:type" content="website" />
//     <meta property="og:url" content="https://samcreative-solutions.com/marketing-agency" />
//     <meta property="og:image" content="https://samcreative-solutions.com/file.jpg" />

//     <!-- Twitter Card Meta Tags -->
//     <meta name="twitter:card" content="summary_large_image" />
//     <meta name="twitter:title" content="OmniReach - #1 Marketing Agency" />
//     <meta name="twitter:description" content="Professional marketing agency services with proven results." />
//     <meta name="twitter:image" content="https://samcreative-solutions.com/file.jpg" />

//     <!-- Canonical URL -->
//     <link rel="canonical" href="https://samcreative-solutions.com/marketing-agency" />

//     <!-- Tailwind CSS -->
//     <script src="https://cdn.tailwindcss.com"></script>

//     <!-- Lucide Icons -->
//     <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

//     <style>
//         /* Custom animations and styles */
//         @keyframes float {
//             0%, 100% { transform: translateY(0px); }
//             50% { transform: translateY(-10px); }
//         }

//         @keyframes gradient {
//             0%, 100% { background-position: 0% 50%; }
//             50% { background-position: 100% 50%; }
//         }

//         @keyframes vibrate {
//             0%, 100% { transform: translateX(0) translateY(0) rotate(0deg); }
//             10% { transform: translateX(-0.5px) translateY(-0.5px) rotate(-0.5deg); }
//             20% { transform: translateX(0.5px) translateY(-0.5px) rotate(0.5deg); }
//             30% { transform: translateX(-0.5px) translateY(0.5px) rotate(0deg); }
//             40% { transform: translateX(0.5px) translateY(0.5px) rotate(0.5deg); }
//             50% { transform: translateX(-0.5px) translateY(-0.5px) rotate(-0.5deg); }
//             60% { transform: translateX(0.5px) translateY(-0.5px) rotate(0deg); }
//             70% { transform: translateX(-0.5px) translateY(0.5px) rotate(0.5deg); }
//             80% { transform: translateX(0.5px) translateY(0.5px) rotate(-0.5deg); }
//             90% { transform: translateX(-0.5px) translateY(-0.5px) rotate(0deg); }
//         }

//         @keyframes fade-in {
//             from { opacity: 0; transform: translateY(10px); }
//             to { opacity: 1; transform: translateY(0); }
//         }

//         @keyframes fade-out {
//             from { opacity: 1; transform: translateY(0); }
//             to { opacity: 0; transform: translateY(-10px); }
//         }

//         @keyframes slide-up {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }

//         .animate-float {
//             animation: float 3s ease-in-out infinite;
//         }

//         .animate-gradient {
//             animation: gradient 3s ease infinite;
//         }

//         .animate-vibrate {
//             animation: vibrate 3s ease-in-out infinite;
//         }

//         .animate-fade-in {
//             animation: fade-in 0.5s ease-out forwards;
//         }

//         .animate-fade-out {
//             animation: fade-out 0.3s ease-out forwards;
//         }

//         .animate-slide-up {
//             animation: slide-up 0.6s ease-out forwards;
//         }

//         .bg-size-200 {
//             background-size: 200% 200%;
//         }

//         /* Hide scrollbar for mobile */
//         @media (max-width: 768px) {
//             ::-webkit-scrollbar {
//                 display: none;
//             }
//         }
//     </style>
// </head>
// <body>
//     <!-- Main content would go here -->
//     <div class="min-h-screen bg-white">
//         <!-- Hero Section -->
//         <section class="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 overflow-hidden">
//             <div class="absolute inset-0">
//                 <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]"></div>
//                 <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
//             </div>

//             <div class="container mx-auto px-4 relative z-10">
//                 <div class="max-w-4xl mx-auto text-center">
//                     <h1 class="text-5xl md:text-7xl font-bold mb-6">
//                         OmniReach
//                         <span class="text-yellow-400 block text-3xl md:text-5xl font-medium">#1 Marketing Agency</span>
//                     </h1>
//                     <p class="text-xl text-gray-300 mb-8">
//                         Premium Digital Marketing Services for Maximum Growth
//                     </p>
//                     <div class="flex flex-col sm:flex-row gap-4 justify-center">
//                         <button class="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all">
//                             Get Free Consultation
//                         </button>
//                         <button class="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all">
//                             View Our Work
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <!-- Background Elements -->
//             <div class="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
//             <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px); background-size: 80px 80px;"></div>
//             <div class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float" style="left: 10%; top: 20%; animation-delay: 0s; animation-duration: 12s;"></div>
//             <div class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float" style="left: 85%; top: 45%; animation-delay: 1s; animation-duration: 15s;"></div>
//             <div class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float" style="left: 25%; top: 80%; animation-delay: 2s; animation-duration: 18s;"></div>
//             <div class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float" style="left: 90%; top: 10%; animation-delay: 3s; animation-duration: 14s;"></div>
//             <div class="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float" style="left: 45%; top: 60%; animation-delay: 4s; animation-duration: 16s;"></div>
//         </section>
//     </div>

//     <!-- WhatsApp Button -->
//     <button onclick="handleWhatsAppClick()" class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl animate-vibrate hover:scale-110 transition-transform">
//         <svg class="text-white w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
//         </svg>
//     </button>

//     <script>
//         function handleWhatsAppClick() {
//             window.open('https://wa.me/17164302718', '_blank');
//         }

//         // Initialize Lucide icons
//         lucide.createIcons();
//     </script>
// </body>
// </html>
