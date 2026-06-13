import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../../../assets/Logo.png';
import { BarChart2, AlertTriangle, Map, LineChart, LogOut, Users, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../utils/api.js';

const AdminSidebar = ({ isMobile = false }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        setIsMobileOpen(false);
        fetchWithAuth('/auth/me')
            .then((data) => { if (data?.email) setAdminEmail(data.email); })
            .catch(() => {});
    }, [location.pathname]);

    const handleLogout = async () => {
        try { await fetch('/auth/logout', { method: 'POST', credentials: 'include' }); } catch (_e) { /* ignore */ }
        navigate('/', { replace: true });
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { path: '/admin/reports', icon: <BarChart2 size={isMobile ? 16 : 18} />, text: t('admin.sidebar.reports'), bgColor: 'bg-red-600', hoverColor: 'hover:bg-red-700' },
        { path: '/admin/alerts', icon: <AlertTriangle size={isMobile ? 16 : 18} />, text: t('admin.sidebar.alerts'), bgColor: 'bg-yellow-600', hoverColor: 'hover:bg-yellow-700' },
        { path: '/admin/map', icon: <Map size={isMobile ? 16 : 18} />, text: t('admin.sidebar.map'), bgColor: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
        { path: '/admin/statistics', icon: <LineChart size={isMobile ? 16 : 18} />, text: t('admin.sidebar.statistics'), bgColor: 'bg-green-600', hoverColor: 'hover:bg-green-700' },
        { path: '/admin/users', icon: <Users size={isMobile ? 16 : 18} />, text: t('admin.sidebar.users'), bgColor: 'bg-purple-600', hoverColor: 'hover:bg-purple-700' },
    ];

    const sidebarClasses = `
        ${isMobile
            ? `fixed inset-y-0 start-0 z-50 transform ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`
            : 'fixed w-64'}
        h-screen bg-gray-900 text-white flex flex-col shadow-xl overflow-hidden`;

    return (
        <>
            {isMobile && (
                <button className="fixed top-3 sm:top-4 start-3 sm:start-4 z-50 p-1.5 sm:p-2 rounded-md bg-red-600 text-white md:hidden"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}>
                    {isMobileOpen ? <X size={isMobile ? 18 : 20} /> : <Menu size={isMobile ? 18 : 20} />}
                </button>
            )}
            <div className={sidebarClasses}>
                <div className="p-4 sm:p-5 flex flex-col items-center border-b border-gray-800">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2">
                        <img src={logo} alt="SwiftSage" className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <h1 className="text-lg sm:text-xl font-bold">{t('dashboard.admin.title')}</h1>
                    <div className="mt-1 text-xs text-gray-400">{t('dashboard.admin.subtitle')}</div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-5 min-h-0">
                    <div className="space-y-1 sm:space-y-2">
                        {menuItems.map((item) => (
                            <button key={item.path}
                                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-md w-full flex items-center text-start transition-all text-sm sm:text-base
                                    ${isActive(item.path) ? `${item.bgColor} text-white shadow-md` : 'bg-transparent text-gray-300 hover:bg-gray-800'}`}
                                onClick={() => navigate(item.path)}>
                                <span className="me-2 sm:me-3">{item.icon}</span>
                                <span className="font-medium">{item.text}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="border-t border-gray-800 p-3 sm:p-4">
                    <div className="mb-3 sm:mb-4">
                        <div className="flex items-center mb-2">
                            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-red-600 rounded-full me-2 flex items-center justify-center text-xs sm:text-sm font-bold">A</div>
                            <div>
                                <div className="text-xs sm:text-sm font-medium">{adminEmail || 'Admin'}</div>
                            </div>
                        </div>
                    </div>
                    <button className="w-full px-3 sm:px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center text-sm sm:text-base"
                        onClick={handleLogout}>
                        <LogOut size={isMobile ? 14 : 16} className="me-2" />
                        <span>{t('admin.sidebar.logout')}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
