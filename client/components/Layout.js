// components/Layout.js
import Navbar from '@/components/Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
