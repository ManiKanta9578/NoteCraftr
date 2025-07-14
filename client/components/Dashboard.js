import React from 'react';
import { ChevronRight, Code, Database, Globe, Layers, Terminal, FileText, Zap, Palette, Layout } from 'lucide-react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { loadingShow } from '@/store/slices/loadingSlice';

const topics = [
    { 
        id: 1, 
        href: '/notes/JavaScript', 
        name: 'JavaScript', 
        description: 'Explore fundamentals, advanced concepts, and coding challenges.', 
        icon: Code,
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    { 
        id: 2, 
        href: '/notes/NextJs', 
        name: 'Next.js', 
        description: 'The React Framework for the Web.', 
        icon: Globe,
        color: 'from-gray-700 to-gray-900',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20'
    },
    { 
        id: 3, 
        href: '/notes/React', 
        name: 'React.js', 
        description: 'Master React.js concepts and build interactive UIs.', 
        icon: Layers,
        color: 'from-blue-400 to-cyan-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
        id: 4, 
        href: '/notes/Nodejs', 
        name: 'Node.js', 
        description: 'Open-source, cross-platform runtime environment.', 
        icon: Terminal,
        color: 'from-green-400 to-emerald-500',
        bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
        id: 5, 
        href: '/notes/DSA', 
        name: 'DSA', 
        description: 'Practice common coding challenges and algorithms.', 
        icon: Database,
        color: 'from-purple-400 to-pink-500',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
        id: 6, 
        href: '/notes/JSOutput', 
        name: 'JavaScript Output', 
        description: 'Test your knowledge with output-focused questions.', 
        icon: FileText,
        color: 'from-amber-400 to-orange-500',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    { 
        id: 7, 
        href: '/notes/ReactMR', 
        name: 'React Machine Round', 
        description: 'Handle various scenarios in React development.', 
        icon: Zap,
        color: 'from-indigo-400 to-purple-500',
        bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    { 
        id: 8, 
        href: '/notes/HTML', 
        name: 'HTML', 
        description: 'HTML basics, semantic elements, and best practices.', 
        icon: Layout,
        color: 'from-red-400 to-pink-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    { 
        id: 9, 
        href: '/notes/CSS', 
        name: 'CSS', 
        description: 'CSS styling, layouts, and responsive design.', 
        icon: Palette,
        color: 'from-teal-400 to-blue-500',
        bgColor: 'bg-teal-50 dark:bg-teal-900/20'
    },
];

const Dashboard = () => {

    const router = useRouter();
    const dispatch = useDispatch();

    const handleNavigation = (href) => {
        dispatch(loadingShow(true));
        router.push(href);
        dispatch(loadingShow(false));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
            {/* Header */}
            <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                <div className="relative container mx-auto px-6 py-16 text-center">
                    <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            Learning Platform
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        My Learning
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Dashboard</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        Master web development with our comprehensive collection of notes, challenges, and interactive content.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Topics</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{topics.length}</p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Technologies</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">6</p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <Layers className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Practice Areas</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">3</p>
                            </div>
                            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((topic) => {
                        const IconComponent = topic.icon;
                        return (
                            <div
                                key={topic.id}
                                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 cursor-pointer"
                                onClick={() => handleNavigation(topic.href)}
                            >
                                {/* Background Pattern */}
                                <div className={`absolute top-0 right-0 w-32 h-32 ${topic.bgColor} rounded-2xl transform rotate-12 translate-x-8 -translate-y-8 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                                
                                {/* Icon */}
                                <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} mb-4 shadow-lg`}>
                                    <IconComponent className="h-6 w-6 text-white" />
                                </div>

                                {/* Content */}
                                <div className="relative">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {topic.name}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                                        {topic.description}
                                    </p>
                                    
                                    {/* CTA */}
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                                        <span>Explore Notes</span>
                                        <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                        <h2 className="text-2xl font-bold mb-4">Ready to Start Learning?</h2>
                        <p className="text-blue-100 mb-6 max-w-md mx-auto">
                            Choose any topic above to begin your journey in web development.
                        </p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;