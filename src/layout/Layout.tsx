import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import '../utils/i18n'

const Layout = () => {
    const location = useLocation();

    return (
        <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Outlet />
        </motion.div>
    );
};

export default Layout;