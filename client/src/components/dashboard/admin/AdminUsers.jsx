import { useState, useEffect } from "react";
import { Ban, CheckCircle, ChevronDown, Edit, Eye, Search, Trash2, UserPlus, X } from "lucide-react";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                // Transform the data to match our component's expected format
                const formattedUsers = data.map(user => ({
                    id: user.user_id,
                    name: user.username,
                    email: user.email,
                    phone: user.phone_number,
                    type: user.is_organization_member ? "organization" : "individual",
                    orgType: user.is_organization_member ? (user.organization_type || "public") : null,
                    community: user.community || "Chlef",
                    createdAt: new Date(user.created_at || Date.now()).toISOString().split('T')[0],
                    reportTime: new Date(user.created_at || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                }));

                setUsers(formattedUsers);
                setFilteredUsers(formattedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
                // Display a user-friendly error message
                alert(`Failed to load users: ${error.message}`);
                // Set empty arrays to prevent undefined errors
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
        try {
            const token = localStorage.getItem('authToken');
            const response = await fetch(`/api/users/${userToDelete.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
            alert('User deleted successfully');
        } catch (error) {
            console.error("Error deleting user:", error);
            alert(`Failed to delete user: ${error.message}`);
        }
    };

    const handleCommunityChange = async (userId, newCommunity) => {
        try {
            const userToUpdate = users.find(user => user.id === userId);
            if (!userToUpdate) return;
            const token = localStorage.getItem('authToken');
            const apiPayload = {
                name: userToUpdate.name,
                email: userToUpdate.email,
                phone: userToUpdate.phone,
                community: newCommunity,
                is_organization_member: userToUpdate.type === "organization",
                password: ''
            };
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiPayload),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            setUsers(users.map(user =>
                user.id === userId ? { ...user, community: newCommunity } : user
            ));
        } catch (error) {
            console.error("Error updating user community:", error);
            alert(`Failed to update user community: ${error.message}`);
        }
    };

    const handleSaveUser = async (userData) => {
        try {
            if (userData.mode === "edit") {
                const token = localStorage.getItem('authToken');
                const apiPayload = {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    password: userData.password || '',
                    is_organization_member: userData.type === "organization",
                    community: userData.community
                };
                const response = await fetch(`/api/users/${userData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(apiPayload),
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
                }
                setUsers(users.map(user =>
                    user.id === userData.id ? { ...userData, mode: undefined, isOrganization: undefined } : user
                ));
            }
            setShowUserModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error("Error saving user:", error);
            alert(`Failed to save user: ${error.message}`);
        }
    };

    const handleAddNewUser = () => {
        setCurrentUser({
            id: null,
            name: "",
            email: "",
            phone: "",
            password: "",
            type: "individual",
            community: "Chlef Chlef",
            mode: "create",
            isOrganization: false,
            orgType: "public"
        });
        setShowUserModal(true);
    };

    const handleCreateUser = async (userData) => {
        try {
            const token = localStorage.getItem('authToken');
            const apiPayload = {
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                isOrganisationMember: userData.isOrganization,
                community: userData.community
            };
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(apiPayload),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            const newUser = {
                id: result.user_id || users.length + 1,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                type: userData.isOrganization ? "organization" : "individual",
                orgType: userData.isOrganization ? userData.orgType : null,
                community: userData.community,
                createdAt: new Date().toISOString().split('T')[0],
                reportTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            };
            setUsers([...users, newUser]);
            setShowUserModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error("Error creating user:", error);
            alert(`Failed to create user: ${error.message}`);
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
        <div className="p-4 max-w-6xl mx-auto bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage all responders and organizations on the Crisis management platform</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search size={18} className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                            />
                        </div>
                        <div className="relative w-full sm:w-48">
                            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                <ChevronDown size={16} className="text-gray-400" />
                            </div>
                            <select
                                value={currentFilter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="appearance-none w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                            >
                                <option value="all">All Communities</option>
                                <option value="Chlef Chlef">Chlef Chlef</option>
                                {chelfCommunes.map((commune, index) => (
                                    <option key={index} value={commune}>{commune}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button
                        onClick={handleAddNewUser}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center w-full sm:w-auto justify-center"
                    >
                        <UserPlus size={18} className="mr-1" />
                        Add User
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="p-6 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading users...</p>
                    </div>
                ) : filteredUsers.length === 0 ? (
                    <div className="p-6 text-center">
                        <p className="text-gray-600">No users found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact Info
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Community
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <span className="text-blue-600 font-medium">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                            <div className="text-sm text-gray-500">{user.phone}</div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 capitalize">{user.type}</div>
                                            {user.type === "organization" && (
                                                <div className="text-xs text-gray-500 capitalize">{user.orgType}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <CommunityBadge community={user.community} />
                                                <div className="ml-2 relative group">
                                                    <button className="text-gray-400 hover:text-blue-600 focus:outline-none">
                                                        <ChevronDown size={14} />
                                                    </button>
                                                    <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-white rounded-md shadow-lg py-1 right-0">
                                                        <div className="max-h-48 overflow-y-auto">
                                                            {chelfCommunes.map((commune, idx) => (
                                                                <button
                                                                    key={idx}
                                                                    onClick={() => handleCommunityChange(user.id, commune)}
                                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                >
                                                                    {commune}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                            {user.createdAt}
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => handleViewUser(user)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                    title="View user details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleEditUser(user)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                    title="Edit user"
                                                >
                                                    <Edit size={16} />
                                                </button>

                                                <button
                                                    onClick={() => handleDeletePrompt(user)}
                                                    className="text-red-600 hover:text-red-900"
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {showUserModal && (
                <UserModal
                    user={currentUser}
                    onClose={() => {
                        setShowUserModal(false);
                        setCurrentUser(null);
                    }}
                    onSave={handleSaveUser}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    user={userToDelete}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setUserToDelete(null);
                    }}
                    onConfirm={handleDeleteUser}
                />
            )}
        </div>
    );
};

export default AdminUsers;