import { useState, useEffect } from "react";
import { Ban, CheckCircle, ChevronDown, Edit, Eye, Search, Trash2, UserPlus, X } from "lucide-react";
//testing
const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentFilter, setCurrentFilter] = useState("all");
    const [showUserModal, setShowUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const chelfCommunes = [
        "Chlef", "Sendjas", "Oum Drou", "Oued Fodda", "Beni Rached", "Ouled Abbes", "El Karimia", "Harchoun", "Beni Bouateb", "Zeboudja",
        "Bénairia", "Bouzeghaia", "Ouled Fares", "Chettia", "Labiod Medjadja", "Boukadir", "Oued Sly", "Sobha", "Ouled Ben Abdelkader", "El Hadjadj",
        "Aïn Merane", "Herenfa", "Taougrite", "Dahra", "Ténès", "Sidi Akkacha", "Sidi Abderrahmane", "Abou El Hassan", "Talassa", "Tadjena",
        "El Marsa", "Moussadek", "Beni Haoua", "Breira", "Oued Goussine"
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found');
                }

                const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5030';
                console.log('Making API request to:', `${baseURL}/api/users`);
                
                const response = await fetch(`${baseURL}/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP error: ${response.status}`);
                }

                const data = await response.json();
                console.log('Received user data:', data.length, 'items');
                
                // Transform the API data to match our component's expected format
                const formattedUsers = data.map(user => ({
                    id: user.user_id,
                    name: user.username,
                    email: user.email,
                    phone: user.phone_number,
                    type: user.is_organization_member ? "organization" : "individual",
                    orgType: null, // Update this if your database stores org_type
                    community: user.community,
                    createdAt: new Date(user.created_at).toLocaleDateString(),
                    reportTime: new Date(user.created_at).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit', 
                        hour12: false 
                    })
                }));
                
                setUsers(formattedUsers);
                setFilteredUsers(formattedUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError(err.message);
                // Fallback to empty array in case of error
                setUsers([]);
                setFilteredUsers([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        let result = [...users];
        if (currentFilter !== "all") {
            result = result.filter(user => user.community.toLowerCase() === currentFilter.toLowerCase());
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term) ||
                user.community.toLowerCase().includes(term)
            );
        }

        setFilteredUsers(result);
    }, [users, searchTerm, currentFilter]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (filter) => {
        setCurrentFilter(filter);
    };

    const handleViewUser = (user) => {
        setCurrentUser({ ...user, mode: "view" });
        setShowUserModal(true);
    };

    const handleEditUser = (user) => {
        setCurrentUser({
            ...user,
            mode: "edit",
            isOrganization: user.type === "organization"
        });
        setShowUserModal(true);
    };

    const handleDeletePrompt = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Authentication required");
                return;
            }
            
            const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5030';
            const response = await fetch(`${baseURL}/api/users/${userToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete user');
            }
            
            // Update local state by filtering out the deleted user
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            alert(`Error deleting user: ${error.message}`);
        }
    };

    const handleCommunityChange = (userId, newCommunity) => {
        // Find the user to update
        const userToUpdate = users.find(user => user.id === userId);
        if (!userToUpdate) return;
        
        // Update local state with the new community value
        setUsers(users.map(user =>
            user.id === userId ? { ...user, community: newCommunity } : user
        ));
    };

    const handleSaveUser = (userData) => {
        if (userData.mode === "edit") {
            // Update the user in the local state
            setUsers(users.map(user =>
                user.id === userData.id ? { 
                    ...userData, 
                    mode: undefined, 
                    isOrganization: undefined,
                    type: userData.isOrganization ? "organization" : "individual",
                    orgType: userData.isOrganization ? userData.orgType : null
                } : user
            ));
        }
        setShowUserModal(false);
        setCurrentUser(null);
    };

    const handleAddNewUser = () => {
        setCurrentUser({
            id: null,
            name: "",
            email: "",
            phone: "",
            password: "",
            type: "individual",
            community: " Chlef",
            mode: "create",
            isOrganization: false,
            orgType: "public"
        });
        setShowUserModal(true);
    };

    const handleCreateUser = async (userData) => {
        try {
            // Get the auth token
            const token = localStorage.getItem('token');
            if (!token) {
                alert("You must be logged in as an admin to create users");
                return;
            }

            // Prepare request data
            const requestData = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                isOrganisationMember: userData.isOrganization,
                community: userData.community,
                orgType: userData.isOrganization ? userData.orgType : null
            };

            // Make API call to create user in the database
            const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5030';
            const response = await fetch(`${baseURL}/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create user');
            }

            const result = await response.json();

            // Create a new user object with the returned ID and add to local state
            const newUser = {
                id: result.user_id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                type: userData.isOrganization ? "organization" : "individual",
                orgType: userData.isOrganization ? userData.orgType : null,
                community: userData.community,
                createdAt: new Date().toISOString().split('T')[0],
                reportTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            };
            
            // Add the new user to the local state
            setUsers([...users, newUser]);
            setShowUserModal(false);
            setCurrentUser(null);
            
            alert('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            alert(`Error creating user: ${error.message}`);
        }
    };

    const CommunityBadge = ({ community }) => {
        return (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {community}
            </span>
        );
    };

    const UserModal = ({ user, onClose, onSave }) => {
        const [formData, setFormData] = useState(user || {});
        const isViewOnly = user?.mode === "view";
        const isCreate = user?.mode === "create";

        useEffect(() => {
            if (user) {
                setFormData(user);
            }
        }, [user]);

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            const userData = {
                ...formData,
                type: formData.isOrganization ? "organization" : "individual"
            };

            if (isCreate) {
                handleCreateUser(userData);
            } else {
                onSave(userData);
            }
        };

        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {isViewOnly ? "User Details" : isCreate ? "Create New User" : "Edit User"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isOrganization"
                                    checked={formData.isOrganization || false}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    Is this an organization account?
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {formData.isOrganization ? "Organization Name" : "Full Name"}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {isCreate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password || ""}
                                        onChange={handleChange}
                                        required
                                        placeholder="••••••••"
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )}

                            {formData.isOrganization && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Organization Type</label>
                                    <div className="mt-1 space-x-4">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="orgType"
                                                value="public"
                                                checked={formData.orgType === "public"}
                                                onChange={handleChange}
                                                disabled={isViewOnly}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Public</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="orgType"
                                                value="private"
                                                checked={formData.orgType === "private"}
                                                onChange={handleChange}
                                                disabled={isViewOnly}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Private</span>
                                        </label>
                                    </div>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Community</label>
                                <select
                                    name="community"
                                    value={formData.community || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select your community</option>
                                    <option value="Chlef Chlef">Chlef Chlef</option>
                                    {chelfCommunes.map((commune, index) => (
                                        <option key={index} value={commune}>{commune}</option>
                                    ))}
                                </select>
                            </div>

                            {!isViewOnly && (
                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        {isCreate ? "Create User" : "Save Changes"}
                                    </button>
                                </div>
                            )}

                            {isViewOnly && (
                                <div className="flex justify-end pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    const DeleteModal = ({ user, onClose, onConfirm }) => {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                    <div className="mb-6 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <Trash2 className="h-6 w-6 text-red-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Delete User</h3>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete <span className="font-medium">{user?.name}</span>?
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage user accounts and permissions</p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative inline-block text-left">
                            <button
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                                onClick={() => document.getElementById('community-dropdown').classList.toggle('hidden')}
                            >
                                {currentFilter === "all" ? "All Communities" : currentFilter}
                                <ChevronDown size={16} className="ml-2" />
                            </button>
                            <div id="community-dropdown" className="hidden absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <div className="py-1 max-h-60 overflow-y-auto">
                                    <button
                                        className={`${currentFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                        onClick={() => {
                                            handleFilterChange('all');
                                            document.getElementById('community-dropdown').classList.add('hidden');
                                        }}
                                    >
                                        All Communities
                                    </button>
                                    {chelfCommunes.map((commune, index) => (
                                        <button
                                            key={index}
                                            className={`${currentFilter === commune ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                            onClick={() => {
                                                handleFilterChange(commune);
                                                document.getElementById('community-dropdown').classList.add('hidden');
                                            }}
                                        >
                                            {commune}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleAddNewUser}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                        >
                            <UserPlus size={16} className="mr-2" />
                            Add User
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-8 text-center">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent">
                            <span className="sr-only">Loading...</span>
                        </div>
                        <p className="mt-4 text-gray-600">Loading users...</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center">
                        <p className="text-red-500">Error: {error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-gray-600">No users found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Community
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.type === "organization" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}>
                                                {user.type === "organization" ? (user.orgType === "public" ? "Public Org" : "Private Org") : "Individual"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="relative inline-block text-left">
                                                <button 
                                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none"
                                                    onClick={() => {
                                                        const dropdownId = `community-dropdown-${user.id}`;
                                                        document.getElementById(dropdownId).classList.toggle('hidden');
                                                    }}
                                                >
                                                    {user.community}
                                                </button>
                                                <div id={`community-dropdown-${user.id}`} className="hidden absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                                    <div className="py-1 max-h-60 overflow-y-auto">
                                                        {chelfCommunes.map((commune, index) => (
                                                            <button
                                                                key={index}
                                                                className={`${user.community === commune ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                                                                onClick={() => {
                                                                    handleCommunityChange(user.id, commune);
                                                                    document.getElementById(`community-dropdown-${user.id}`).classList.add('hidden');
                                                                }}
                                                            >
                                                                {commune}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{user.createdAt}</div>
                                            <div className="text-xs text-gray-400">{user.reportTime}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-blue-600 hover:text-blue-900 mr-3"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-yellow-600 hover:text-yellow-900 mr-3"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePrompt(user)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* User Modal */}
            {showUserModal && currentUser && (
                <UserModal
                    user={currentUser}
                    onClose={() => {
                        setShowUserModal(false);
                        setCurrentUser(null);
                    }}
                    onSave={handleSaveUser}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && userToDelete && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete the user <span className="font-medium">{userToDelete.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteUser}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;