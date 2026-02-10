import React, { useState, useEffect } from 'react';
import { 
    FaUser, FaLock, FaBell, FaPalette, FaUsersCog, 
    FaSignOutAlt, FaCamera, FaSpinner, FaCheckCircle, FaExclamationCircle
} from 'react-icons/fa';
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

// Import API functions
import { getUser, updateUserProfile, changePassword } from '../../service/api';


const ProfileSettings = ({ profileData, setProfileData, handleUpdateProfile, isLoading, message, handleImageChange }) => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Profile Settings</h2>
        
        {/* Profile Picture Section */}
        <div className="flex items-center gap-6 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl border-4 border-white shadow-md overflow-hidden">
                    {profileData.preview ? (
                        <img src={profileData.preview} alt="Preview" className="w-full h-full object-cover" />
                    ) : profileData.image ? (
                        <img src={profileData.image} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <FaUser />
                    )}
                </div>
                
                {/* Hidden File Input & Label */}
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition shadow-sm cursor-pointer">
                    <FaCamera className="text-sm" />
                    <input 
                        type="file" 
                        id="avatar-upload" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageChange} 
                    />
                </label>
            </div>
            <div>
                <h3 className="font-semibold text-lg">{profileData.name || 'Admin User'}</h3>
                <p className="text-gray-500 text-sm">Super Admin</p>
            </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                    type="text" 
                    name="name" 
                    value={profileData.name || ''}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                    type="text" 
                    name="username"
                    value={profileData.name || ''} 
                    disabled 
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed" 
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                    <span className="absolute left-3 top-3.5 text-gray-400"><MdEmail /></span>
                    <input 
                        type="email" 
                        name="email"
                        value={profileData.email || ''}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                </div>
            </div>
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea 
                    name="bio"
                    value={profileData.bio || ''}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    rows="3" 
                    placeholder="Tell us a little about yourself..."
                ></textarea>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between mt-2">
                {/* Feedback Message */}
                <div className="h-6">
                    {message.text && (
                        <p className={`text-sm flex items-center gap-2 ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                            {message.type === 'error' ? <FaExclamationCircle /> : <FaCheckCircle />}
                            {message.text}
                        </p>
                    )}
                </div>
                
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                >
                    {isLoading && <FaSpinner className="animate-spin" />}
                    Save Changes
                </button>
            </div>
        </form>
    </div>
);

const SecuritySettings = ({ passwordData, setPasswordData, handleUpdatePassword, isLoading, message }) => (
    <div className="animate-fade-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Security & Login</h2>
        
        <div className="mb-8 border-b pb-8">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <form onSubmit={handleUpdatePassword} className="grid gap-4 max-w-lg">
                <input 
                    type="password" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})}
                    placeholder="Current Password" 
                    className="w-full p-3 border border-gray-300 rounded-md" 
                    required
                />
                <input 
                    type="password" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})}
                    placeholder="New Password" 
                    className="w-full p-3 border border-gray-300 rounded-md" 
                    required
                />
                <input 
                    type="password" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, [e.target.name]: e.target.value})}
                    placeholder="Confirm New Password" 
                    className="w-full p-3 border border-gray-300 rounded-md" 
                    required
                />
                
                <div className="flex items-center justify-between mt-2">
                    <div className="h-6">
                        {message.text && (
                            <p className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
                                {message.text}
                            </p>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-fit px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-70 flex items-center gap-2 ml-auto"
                    >
                        {isLoading && <FaSpinner className="animate-spin" />}
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <h2 className="text-xl font-semibold text-gray-400 mb-2">Notification Preferences</h2>
        <p className="text-gray-500">This section is currently under development.</p>
    </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    // Data States
    const [profileData, setProfileData] = useState({});
    const [selectedFile, setSelectedFile] = useState(null); // Stores the actual file object
    
    const [passwordData, setPasswordData] = useState({
        currentPassword: '', newPassword: '', confirmPassword: ''
    });

    // --- JWT Helper ---
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) { return null; }
    };

    // --- 1. Load User Data on Mount ---
    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decoded = parseJwt(token);
                
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    handleLogout();
                    return;
                }

                if (decoded && decoded.id) {
                    // Fetch latest data from DB using ID from token
                    const response = await getUser(decoded.id);
                    if (response && response.status === 200) {
                        setProfileData(response.data);
                    }
                }
            } else {
                navigate('/login'); // No token? Go to login
            }
            setPageLoading(false); 
        };
        loadData();
    }, []);

    // --- 2. Handle Image Selection ---
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file); // Store file for upload
            
            // Create a temporary URL for instant preview
            setProfileData({
                ...profileData,
                preview: URL.createObjectURL(file) 
            });
        }
    };

    // --- 3. Update Profile (with FormData for Image) ---
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        // Get Admin ID
        const id = profileData._id || profileData.id;
        if(!id) {
            setMessage({ type: 'error', text: 'User ID missing. Please refresh.' });
            setIsLoading(false);
            return;
        }

        try {
            // Prepare FormData (required for file uploads)
            const formData = new FormData();
            formData.append('name', profileData.name || '');
            formData.append('email', profileData.email || '');
            formData.append('bio', profileData.bio || '');
            
            // Only append image if a new file was selected
            if (selectedFile) {
                formData.append('avatar', selectedFile);
            }

            // Call API
            const response = await updateUserProfile(id, formData);
            
            if(response.status === 200) {
                // Update local state with the returned data (which has the real image URL)
                setProfileData({ ...response.data.data, preview: null }); 
                setSelectedFile(null); 
                setMessage({ type: 'success', text: 'Profile updated successfully!' });
                
                // Optional: Update localStorage so Header reflects change immediately if it uses LS
                // localStorage.setItem('user', JSON.stringify(response.data.data));
            }
        } catch (error) {
            console.error("Update Error:", error);
            setMessage({ type: 'error', text: error.message || 'Update failed' });
        } finally {
            setIsLoading(false);
        }
    };

    // --- 4. Update Password ---
    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match.' });
            return;
        }

        const id = profileData._id || profileData.id;
        setIsLoading(true);

        try {
            await changePassword(id, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setMessage({ type: 'success', text: 'Password changed successfully.' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Failed to change password.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // --- Sidebar Menu ---
    const menuItems = [
        { id: 'profile', label: 'Profile Settings', icon: <FaUser /> },
        { id: 'security', label: 'Security & Login', icon: <FaLock /> },
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
    ];

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <FaSpinner className="animate-spin text-4xl text-blue-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-8">Settings</h1>
                
                <div className="flex flex-col md:flex-row gap-6">
                    
                    {/* Sidebar Navigation */}
                    <div className="w-full md:w-1/4">
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4">
                            <nav className="flex flex-col">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setMessage({ type: '', text: '' });
                                        }}
                                        className={`flex items-center gap-3 px-6 py-4 text-sm font-medium transition-all
                                            ${activeTab === item.id 
                                                ? 'bg-blue-50 text-blue-900 border-r-4 border-blue-900' 
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
                                            }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                                <hr className="border-gray-100 my-2" />
                                <button onClick={handleLogout} className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-red-600 hover:bg-red-50 transition-all w-full text-left">
                                    <span className="text-lg"><FaSignOutAlt /></span>
                                    Log Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full md:w-3/4">
                        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 min-h-[500px]">
                            {activeTab === 'profile' && (
                                <ProfileSettings 
                                    profileData={profileData}
                                    setProfileData={setProfileData}
                                    handleUpdateProfile={handleUpdateProfile}
                                    handleImageChange={handleImageChange}
                                    isLoading={isLoading}
                                    message={message}
                                />
                            )}
                            {activeTab === 'security' && (
                                <SecuritySettings 
                                    passwordData={passwordData}
                                    setPasswordData={setPasswordData}
                                    handleUpdatePassword={handleUpdatePassword}
                                    isLoading={isLoading}
                                    message={message}
                                />
                            )}
                            {activeTab === 'notifications' && <NotificationSettings />}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;