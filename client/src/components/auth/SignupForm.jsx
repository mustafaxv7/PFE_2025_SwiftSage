import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthInput from './AuthInput';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import { FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi';

const SignupForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOrganization, setIsOrganization] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        type: 'public',
        community: '',
    });
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (status.error) setStatus((prev) => ({ ...prev, error: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, isOrganisationMember: isOrganization }),
            });
            const data = await response.json();
            if (response.ok) {
                setStatus({ loading: false, success: true, error: null });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setStatus({ loading: false, success: false, error: data.message || t('errors.serverError') });
            }
        } catch {
            setStatus({ loading: false, success: false, error: t('auth.signup.networkError') });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Link to="/" className="flex justify-center">
                    <div className="flex items-center gap-3">
                        <img src={Logo} alt="SwiftSage" className="w-12 h-12 object-contain" />
                        <span className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">SwiftSage</span>
                    </div>
                </Link>
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{t('auth.signup.title')}</h2>
                <p className="mt-2 text-sm text-gray-600">{t('auth.signup.subtitle')}</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-6 shadow-lg rounded-xl sm:px-10 relative">
                    {status.success && (
                        <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center rounded-xl z-10 p-6">
                            <FiCheckCircle className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.signup.success')}</h3>
                            <p className="text-gray-600 mb-6">{t('auth.signup.redirecting')}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    )}
                    {status.error && (
                        <div className="rounded-md bg-red-50 p-4 mb-6">
                            <div className="flex">
                                <FiAlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                                <div className="ms-3">
                                    <h3 className="text-sm font-medium text-red-800">{status.error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AuthInput
                            label={isOrganization ? t('auth.signup.orgName') : t('auth.signup.fullName')}
                            type="text" name="name" value={formData.name} onChange={handleChange}
                            required placeholder={isOrganization ? 'Acme Inc.' : t('auth.signup.namePlaceholder')}
                            disabled={status.loading}
                        />
                        <AuthInput
                            label={isOrganization ? t('auth.signup.orgEmail') : t('auth.signup.email')}
                            type="email" name="email" value={formData.email} onChange={handleChange}
                            required placeholder={t('auth.signup.emailPlaceholder')} disabled={status.loading}
                        />
                        <AuthInput
                            label={t('auth.signup.phone')} type="tel" name="phone"
                            value={formData.phone} onChange={handleChange}
                            required placeholder={t('auth.signup.phonePlaceholder')} disabled={status.loading}
                        />
                        <AuthInput
                            label={t('auth.signup.password')} type="password" name="password"
                            value={formData.password} onChange={handleChange}
                            required placeholder={t('auth.signup.passwordPlaceholder')} disabled={status.loading}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('auth.signup.password')} *</label>
                            <select name="community" value={formData.community} onChange={handleChange}
                                className="w-full p-2 rounded-md border border-gray-300" required disabled={status.loading}>
                                <option value="">{t('auth.signup.selectCommunity')}</option>
                                <option value="Chlef Chlef">Chlef Chlef</option>
                                <option value="Ténès">Ténès</option>
                                <option value="Beni Haoua">Beni Haoua</option>
                                <option value="Ouled Fares">Ouled Fares</option>
                                <option value="Boukadir">Boukadir</option>
                                <option value="Zeboudja">Zeboudja</option>
                                <option value="Abou El Hassan">Abou El Hassan</option>
                                <option value="El Karimia">El Karimia</option>
                                <option value="Taougrite">Taougrite</option>
                                <option value="Beni Rached">Beni Rached</option>
                            </select>
                        </div>

                        {isOrganization && (
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">{t('auth.signup.orgType')}</label>
                                <div className="flex gap-6">
                                    {['public', 'private'].map((type) => (
                                        <label key={type} className="inline-flex items-center">
                                            <input type="radio" name="type" value={type} checked={formData.type === type}
                                                onChange={handleChange} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                                                disabled={status.loading} />
                                            <span className="ms-2 text-sm text-gray-700 capitalize">{t(`auth.signup.${type}`)}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center">
                            <input type="checkbox" id="isOrganization" checked={isOrganization}
                                onChange={() => setIsOrganization(!isOrganization)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" disabled={status.loading} />
                            <label htmlFor="isOrganization" className="ms-2 block text-sm text-gray-700">{t('auth.signup.isOrg')}</label>
                        </div>

                        <div className="flex items-center">
                            <input id="terms" name="terms" type="checkbox" required
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" disabled={status.loading} />
                            <label htmlFor="terms" className="ms-2 block text-sm text-gray-700">{t('auth.signup.termsAgree')}</label>
                        </div>

                        <div>
                            <button type="submit"
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ${
                                    status.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:ring-red-500'
                                }`} disabled={status.loading}>
                                {status.loading ? (
                                    <><FiLoader className="animate-spin h-5 w-5 me-2" />{t('auth.signup.creating')}</>
                                ) : t('auth.signup.registerButton')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            {t('auth.signup.haveAccount')}{' '}
                            <button onClick={() => navigate('/login')}
                                className={`font-medium text-red-600 hover:text-red-500 hover:underline ${status.loading ? 'pointer-events-none opacity-50' : ''}`}
                                disabled={status.loading}>
                                {t('auth.signup.loginLink')}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
