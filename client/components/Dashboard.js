import React from 'react';
import { useRouter } from 'next/router';

const topics = [
    { id: 1, href: '/javascript', name: 'JavaScript', description: 'Explore fundamentals, advanced concepts, and coding challenges.', src: 'https://ik.imagekit.io/ably/ghost/prod/2023/12/choosing-the-best-javascript-frameworks-for-your-next-project.png?tr=w-1728,q-50', },
    { id: 2, href: '/reactjs', name: 'React.js', description: 'Master React.js concepts and build interactive UIs.', src: 'https://media.licdn.com/dms/image/v2/D5612AQHNsx0_d_W5cQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1716106189739?e=1734566400&v=beta&t=HqZMxfDxNWgi88WvSAh15I929lAOrChwQtPIfFBMcRU', },
    { id: 3, href: '/dsa', name: 'DSA', description: 'Practice common coding challenges and algorithms.', src: 'https://media.licdn.com/dms/image/v2/D5612AQFsf9uG7UsOpg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1714717110205?e=1734566400&v=beta&t=6Yy-XlvJwjkdkfBmQT1ozxh8fNmP1qWRvodhaJFR40c', },
    { id: 4, href: '/jSOutput', name: 'JavaScript Output Questions', description: 'Test your knowledge with output-focused questions.', src: 'https://testerops.com/wp-content/uploads/2023/08/issue1.png', },
    { id: 5, href: '/reactMR', name: 'React Machine Round', description: 'Learn how to handle various scenarios in React development.', src: 'https://th.bing.com/th/id/OIP.FBDjPuDOStzGqcLiHsBHBQHaDu?w=589&h=296&rs=1&pid=ImgDetMain', },
    { id: 6, href: '/html', name: 'HTML', description: 'Understand HTML basics, semantic elements, and best practices.', src: 'https://verpex.com/assets/uploads/images/blog/Free-HTML-Editors.webp?v=1695388726', },
    { id: 7, href: '/css', name: 'CSS', description: 'Dive into CSS styling, layouts, and responsive design.', src: 'https://thumbs.dreamstime.com/z/css-letter-logo-design-black-background-creative-initials-concept-white-c-s-logovector-circle-graphic-shape-business-sign-220317828.jpg?ct=jpeg', },
];

const Dashboard = () => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 mt-16">
            <h1 className="text-2xl font-bold mb-8 text-center">Learning Dashboard</h1>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {topics.map((topic) => (
                    <div key={topic.id} className="relative h-[200px] w-full rounded-md">
                        <img
                            src={topic.src}
                            alt={topic.name}
                            className="z-0 h-full w-full rounded-md object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-left">
                            <h1 className="text-lg font-semibold text-white">{topic.name}</h1>
                            <p className="mt-2 text-sm text-gray-300">{topic.description}</p>
                            <button
                                onClick={() => router.push(topic.href)}
                                className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white border border-gray-500 p-2 rounded-lg float-right mr-4"
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