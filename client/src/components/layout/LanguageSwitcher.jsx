import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitcher = ({ mobile = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
    localStorage.setItem('i18nextLng', lng);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (mobile) {
    return (
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-700">Language</span>
          <div className="flex space-x-2" ref={dropdownRef}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-2 py-1 text-xs rounded ${
                        i18n.language === lang.code
                            ? 'bg-red-100 text-red-600'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {lang.code.toUpperCase()}
                </button>
            ))}
          </div>
        </div>
    );
  }

  return (
      <div className="relative" ref={dropdownRef}>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
        >
          <FiGlobe className="mr-1" />
          <span>{i18n.language.toUpperCase()}</span>
        </button>

        {isOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg overflow-hidden z-20">
              {languages.map((lang) => (
                  <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                          i18n.language === lang.code
                              ? 'bg-red-50 text-red-600'
                              : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {lang.name}
                  </button>
              ))}
            </div>
        )}
      </div>
  );
};

export default LanguageSwitcher;