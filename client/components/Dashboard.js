import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const topics = [
    { id: 1, href: '/javascript', name: 'JavaScript', description: 'Explore fundamentals, advanced concepts, and coding challenges.', src: '/images/javascript.webp' },
    { id: 2, href: '/reactjs', name: 'React.js', description: 'Master React.js concepts and build interactive UIs.', src: '/images/ReactJS.webp' },
    { id: 3, href: '/dsa', name: 'DSA', description: 'Practice common coding challenges and algorithms.', src: '/images/DSA.webp' },
    { id: 4, href: '/jSOutput', name: 'JavaScript Output Questions', description: 'Test your knowledge with output-focused questions.', src: '/images/JSOutput.png' },
    { id: 5, href: '/reactMR', name: 'React Machine Round', description: 'Learn how to handle various scenarios in React development.', src: '/images/OIP.jpg' },
    { id: 6, href: '/html', name: 'HTML', description: 'Understand HTML basics, semantic elements, and best practices.', src: '/images/HTML.webp' },
    { id: 7, href: '/css', name: 'CSS', description: 'Dive into CSS styling, layouts, and responsive design.', src: '/images/CSS.jpg' },
];

const Dashboard = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 mt-16">
            <h1 className="text-3xl font-extrabold mb-10 text-center">Learning Dashboard</h1>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {topics.map((topic) => (
                    <div
                        key={topic.id}
                        className="relative group h-[200px] w-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        <Image
                            src={topic.src}
                            alt={topic.name}
                            layout="fill"
                            objectFit="cover"
                            className="z-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-left">
                            <h1 className="text-xl font-bold text-white">{topic.name}</h1>
                            <p className="mt-1 text-sm text-gray-200">{topic.description}</p>
                            <button
                                onClick={() => router.push(topic.href)}
                                className="mt-4 inline-flex cursor-pointer items-center text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                            >
                                View Notes
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;