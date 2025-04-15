import {useState, useEffect} from "react";
import {Ban, CheckCircle, Edit, Eye, Search, Trash2, UserPlus, X} from "lucide-react";

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
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                // const response = await fetch("http://localhost:5030/admin/users");
                // const data = await response.json();
                const mockUsers = [
                    {//exemple
                        id: 1,
                        name: "John Doe",
                        email: "john@example.com",
                        phone: "+1 555-123-4567",
                        type: "individual",
                        status: "active",
                        createdAt: "2024-04-01"
                    },
                    {
                        id: 2,
                        name: "Jane Smith",
                        email: "jane@example.com",
                        phone: "+1 555-987-6543",
                        type: "individual",
                        status: "active",
                        createdAt: "2024-04-02"
                    },
                    {
                        id: 3,
                        name: "Acme Corporation",
                        email: "contact@acme.com",
                        phone: "+1 555-111-2222",
                        type: "organization",
                        orgType: "public",
                        status: "active",
                        createdAt: "2024-04-03"
                    },
                    {
                        id: 4,
                        name: "Tech Solutions Inc",
                        email: "info@techsolutions.com",
                        phone: "+1 555-333-4444",
                        type: "organization",
                        orgType: "private",
                        status: "suspended",
                        createdAt: "2024-04-04"
                    },
                    {
                        id: 5,
                        name: "Robert Johnson",
                        email: "robert@example.com",
                        phone: "+1 555-555-5555",
                        type: "individual",
                        status: "inactive",
                        createdAt: "2024-04-05"
                    },
                ];

                setUsers(mockUsers);
                setFilteredUsers(mockUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Filter and search users
    useEffect(() => {
        let result = [...users];
        if (currentFilter !== "all") {
            result = result.filter(user => user.status === currentFilter);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(user =>
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.phone.toLowerCase().includes(term)
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
        setCurrentUser({...user, mode: "view"});
        setShowUserModal(true);
    };

    const handleEditUser = (user) => {
        setCurrentUser({...user, mode: "edit"});
        setShowUserModal(true);
    };

    const handleDeletePrompt = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteUser = async () => {
        try {
            // await fetch(`http://localhost:5030/admin/users/${userToDelete.id}`, {
            //   method: "DELETE",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            //   }
            // });
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            // await fetch(`http://localhost:5030/admin/users/${userId}/status`, {
            //   method: "PATCH",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            //   },
            //   body: JSON.stringify({ status: newStatus })
            // });
            setUsers(users.map(user =>
                user.id === userId ? {...user, status: newStatus} : user
            ));
        } catch (error) {
            console.error("Error updating user status:", error);
        }
    };

    const handleSaveUser = async (userData) => {
        try {
            if (userData.mode === "edit") {
                // await fetch(`http://localhost:5030/admin/users/${userData.id}`, {
                //   method: "PUT",
                //   headers: {
                //     "Content-Type": "application/json",
                //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
                //   },
                //   body: JSON.stringify(userData)
                // });
                setUsers(users.map(user =>
                    user.id === userData.id ? {...userData, mode: undefined} : user
                ));
            }
            setShowUserModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleAddNewUser = () => {
        setCurrentUser({
            id: null,
            name: "",
            email: "",
            phone: "",
            type: "individual",
            status: "active",
            mode: "create"
        });
        setShowUserModal(true);
    };

    const handleCreateUser = async (userData) => {
        try {
            // const response = await fetch("http://localhost:5030/admin/users", {
            //   method: "POST",
            //   headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${localStorage.getItem("authToken")}`
            //   },
            //   body: JSON.stringify(userData)
            // });
            // const newUser = await response.json();
            const newUser = {
                ...userData,
                id: users.length + 1,
                createdAt: new Date().toISOString().split("T")[0]
            };

            setUsers([...users, newUser]);
            setShowUserModal(false);
            setCurrentUser(null);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Status Badge Component
    const StatusBadge = ({status}) => {
        const statusStyles = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            suspended: "bg-red-100 text-red-800"
        };

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // User Modal Component
    const UserModal = ({user, onClose, onSave}) => {
        const [formData, setFormData] = useState(user || {});
        const isViewOnly = user?.mode === "view";
        const isCreate = user?.mode === "create";

        const handleChange = (e) => {
            const {name, value, type, checked} = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();

            if (isCreate) {
                handleCreateUser(formData);
            } else {
                onSave(formData);
            }
        };

        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {isViewOnly ? "User Details" : isCreate ? "Create New User" : "Edit User"}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <X size={20}/>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">User Type</label>
                                <select
                                    name="type"
                                    value={formData.type || "individual"}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="individual">Individual</option>
                                    <option value="organization">Organization</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {formData.type === "organization" ? "Organization Name" : "Full Name"}
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone || ""}
                                    onChange={handleChange}
                                    disabled={isViewOnly}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {formData.type === "organization" && (
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

                            {!isCreate && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status || "active"}
                                        onChange={handleChange}
                                        disabled={isViewOnly}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            )}

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
    const DeleteModal = ({user, onClose, onConfirm}) => {
        return (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <div className="mb-6 text-center">
                        <div
                            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <Trash2 className="h-6 w-6 text-red-600"/>
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
        <div className="p-6 ml-64 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">Manage all responders and organizations on the crisis management
                    platform</p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400"/>
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleFilterChange("all")}
                            className={`px-3 py-2 text-sm rounded-md ${
                                currentFilter === "all"
                                    ? "bg-gray-900 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            All Users
                        </button>
                        <button
                            onClick={() => handleFilterChange("active")}
                            className={`px-3 py-2 text-sm rounded-md ${
                                currentFilter === "active"
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => handleFilterChange("inactive")}
                            className={`px-3 py-2 text-sm rounded-md ${
                                currentFilter === "inactive"
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            Inactive
                        </button>
                        <button
                            onClick={() => handleFilterChange("suspended")}
                            className={`px-3 py-2 text-sm rounded-md ${
                                currentFilter === "suspended"
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                        >
                            Suspended
                        </button>
                    </div>
                    <button
                        onClick={handleAddNewUser}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                        <UserPlus size={18} className="mr-2"/>
                        Add New User
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center">
                        <div
                            className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading users...</p>
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
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact Info
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div
                                                className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-medium">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{user.email}</div>
                                        <div className="text-sm text-gray-500">{user.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900 capitalize">{user.type}</div>
                                        {user.type === "organization" && (
                                            <div className="text-xs text-gray-500 capitalize">{user.orgType}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={user.status}/>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.createdAt}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => handleViewUser(user)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="View user details"
                                            >
                                                <Eye size={18}/>
                                            </button>
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-gray-600 hover:text-gray-900"
                                                title="Edit user"
                                            >
                                                <Edit size={18}/>
                                            </button>
                                            {user.status === "active" ? (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, "suspended")}
                                                    className="text-yellow-600 hover:text-yellow-900"
                                                    title="Suspend user"
                                                >
                                                    <Ban size={18}/>
                                                </button>
                                            ) : user.status === "suspended" ? (
                                                <button
                                                    onClick={() => handleStatusChange(user.id, "active")}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Activate user"
                                                >
                                                    <CheckCircle size={18}/>
                                                </button>
                                            ) : null}
                                            <button
                                                onClick={() => handleDeletePrompt(user)}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete user"
                                            >
                                                <Trash2 size={18}/>
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