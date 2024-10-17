import React from 'react';
import { useRouter } from "next/router";

const topics = [
    { id: 1, href:'/javascript' ,name: 'JavaScript', description: 'Explore fundamentals, advanced concepts, and coding challenges.' },
    { id: 2, href:'/reactjs' ,name: 'React.js', description: 'Master React.js concepts and build interactive UIs.' },
    { id: 3, href:'/dsa' ,name: 'DSA', description: 'Practice common coding challenges and algorithms.' },
    { id: 4, href:'/jSOutput' ,name: 'JavaScript Output Questions', description: 'Test your knowledge with output-focused questions.' },
    { id: 5, href:'/reactMR' ,name: 'React Machine Round', description: 'Learn how to handle various scenarios in React development.' },
    { id: 6, href:'/html' ,name: 'HTML', description: 'Understand HTML basics, semantic elements, and best practices.' },
    { id: 7, href:'/css' ,name: 'CSS', description: 'Dive into CSS styling, layouts, and responsive design.' },
];

const Dashboard = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 mt-16">
            <h1 className="text-2xl font-bold mb-8 text-center">Learning Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                    <div key={topic.id} className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-lg font-semibold">{topic.name}</h3>
                        <p className="text-sm">{topic.description}</p>
                        <button
                            onClick={() => router.push(topic.href)} // Corrected to use parentheses
                            className="mt-4 border border-gray-400 px-4 py-2 rounded-lg transition-colors duration-300"
                        >
                            View Notes
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;