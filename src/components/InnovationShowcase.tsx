import React from 'react'; import CardSwap, { Card } from './CardSwap'; import { Zap, Brain, Rocket, Target, Globe, Shield, Code, Palette, TrendingUp } from 'lucide-react'; const InnovationShowcase: React.FC = () => { return (
<section className="py-10 sm:py-16 md:py-20 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden min-h-[80vh]">
    {/* Background Pattern */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(242,195,75,0.05),transparent_50%)]"></div>

    {/* Floating Elements */}
    <div className="absolute top-1/4 left-1/4 animate-pulse hidden sm:block">
        <Brain className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 text-yellow-400/20" />
    </div>
    <div className="absolute top-1/3 right-1/4 animate-bounce hidden sm:block">
        <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400/15" />
    </div>
    <div className="absolute bottom-1/3 left-1/3 animate-pulse hidden sm:block">
        <Rocket className="w-8 sm:w-10 h-8 sm:h-10 text-yellow-400/25" />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left Content - Aligned Left */}
            <div className="text-white order-2 lg:order-1 text-left w-full lg:w-1/2">
                <div className="inline-flex items-center space-x-2 bg-yellow-400/10 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
                    <Zap className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm sm:text-base">INNOVATION SHOWCASE</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                    Where <span className="text-yellow-400">Innovation</span> Meets Excellence
                </h2>

                <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    Discover how we transform businesses through cutting-edge technology, creative design, and strategic digital solutions that drive real results.
                </p>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <Target className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">Strategic Approach</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">Data-driven solutions</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <Globe className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">Global Reach</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">Worldwide impact</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <Shield className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">Secure Solutions</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">Enterprise-grade security</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400/20 rounded-full flex items-center justify-center">
                            <Rocket className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-yellow-400" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">Fast Delivery</h4>
                            <p className="text-gray-400 text-xs sm:text-sm">Agile methodology</p>
                        </div>
                    </div>
                </div>

                <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105">
              Explore Our Innovation
            </button>
            </div>

            {/* Right Side - Card Swap Animation - Aligned Right */}
            <div className="relative flex justify-end order-1 lg:order-2 mb-6 sm:mb-8 lg:mb-0 w-full lg:w-1/2 -translate-y-4 lg:-translate-y-8 hidden md:block">
                <div className="relative w-full max-w-[90vw] sm:max-w-md lg:max-w-lg xl:max-w-xl" style={{ height: 'auto', minHeight: '300px' }}>
                    <CardSwap cardDistance={40} verticalDistance={50} delay={5000} pauseOnHover={false} width={280} height={300} className="sm:w-[320px] sm:h-[240px] lg:w-[380px] lg:h-[280px] xl:w-[420px] xl:h-[320px]">
                        <Card>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Brain className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
                                </div>
                                <h3 className="text-yellow-400 text-base sm:text-lg md:text-xl">AI-Powered Solutions</h3>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                Custom AI integrations that automate workflows, enhance customer experience, and drive business growth through intelligent automation.
                            </p>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-yellow-400 text-xs sm:text-sm font-medium">60% Cost Reduction</span>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Code className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
                                </div>
                                <h3 className="text-yellow-400 text-base sm:text-lg md:text-xl">Web Excellence</h3>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                Modern, responsive websites that deliver exceptional user experiences and drive conversions with cutting-edge technology.
                            </p>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-yellow-400 text-xs sm:text-sm font-medium">300% Traffic Increase</span>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <Palette className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
                                </div>
                                <h3 className="text-yellow-400 text-base sm:text-lg md:text-xl">Brand Identity</h3>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                Distinctive visual identities that make your brand memorable, trustworthy, and instantly recognizable in the marketplace.
                            </p>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-yellow-400 text-xs sm:text-sm font-medium">200% Brand Recognition</span>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-black" />
                                </div>
                                <h3 className="text-yellow-400 text-base sm:text-lg md:text-xl">SEO Mastery</h3>
                            </div>
                            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                                Strategic SEO and content marketing that dominates search rankings and drives qualified organic traffic to your business.
                            </p>
                            <div className="mt-4 flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span className="text-yellow-400 text-xs sm:text-sm font-medium">400% Organic Growth</span>
                            </div>
                        </Card>
                    </CardSwap>
                </div>
            </div>
        </div>
    </div>
</section>
); }; export default InnovationShowcase;