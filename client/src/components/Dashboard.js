import React from 'react';
import { useRouter } from "next/router";
import javascriptImage from "@/public/assets/javascript.jpg";

const topics = [
    { id: 1, href: '/javascript', name: 'JavaScript', description: 'Explore fundamentals, advanced concepts, and coding challenges.', imgURL: javascriptImage },
    { id: 2, href: '/reactjs', name: 'React.js', description: 'Master React.js concepts and build interactive UIs.', imgURL: 'https://in.pinterest.com/pin/blue-and-black-logo-reactjs-facebook-javascript-minimalism-artwork-simple-background-2k-wallpaper-hdwallpaper-d--750764200364854493/', },
    { id: 3, href: '/javascript-coding-questions', name: 'JavaScript Coding Questions', description: 'Practice common coding challenges and algorithms.', imgURL: 'https://medium.com/deno-the-complete-reference/10-javascript-coding-interview-questions-part-1-a0e5bb606eaf', },
    { id: 4, href: '/javascript-output-questions', name: 'JavaScript Output Questions', description: 'Test your knowledge with output-focused questions.', imgURL: 'https://www.linkedin.com/posts/hari-mohan-prajapat-47299b54_javascript-input-output-activity-7203370977802567681-5K7A', },
    { id: 5, href: '/react-scenarios', name: 'React Scenarios', description: 'Learn how to handle various scenarios in React development.', imgURL: 'https://www.youtube.com/watch?v=6Sxu2NdQXg0', },
    { id: 6, href: '/html', name: 'HTML', description: 'Understand HTML basics, semantic elements, and best practices.', imgURL: 'https://www.youtube.com/watch?v=6Sxu2NdQXg0', },
    { id: 7, href: '/css', name: 'CSS', description: 'Dive into CSS styling, layouts, and responsive design.', imgURL: 'https://pngtree.com/freebackground/css-vector-letter-on-black-background_2752935.html', },
];

const Dashboard = () => {
    const router = useRouter();

    return (
        <div className="mx-auto px-4 mt-20">
            <h1 className="text-4xl font-bold mb-8 text-center">Learning Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic) => (
                    <div key={topic.id} className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <h3 className="text-lg font-semibold ">{topic.name}</h3>
                        <p className="text-sm ">{topic.description}</p>
                        <button
                            onClick={() => router.push(topic.href)}
                            className="mt-4 border border-gray-300 px-4 py-2 rounded-lg transition-colors duration-300"
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