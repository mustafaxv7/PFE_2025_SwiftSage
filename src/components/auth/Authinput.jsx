const AuthInput = ({ label, type, name, value, onChange, required }) => {
    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700">
                {label}
            </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
                placeholder={label}
            />
        </div>
    );
};

export default AuthInput;