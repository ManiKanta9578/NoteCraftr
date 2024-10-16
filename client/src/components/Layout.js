// components/Layout.js
import Navbar from '@/src/components/Navbar';

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
