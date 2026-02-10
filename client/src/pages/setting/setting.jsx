import React, { useState, useEffect, useRef } from 'react';
import { 
    FaUser, FaCreditCard, FaBoxOpen, FaPowerOff, FaCamera, FaSpinner,
    FaPlus, FaEdit, FaTrash, FaMobileAlt, FaMapMarkerAlt
} from 'react-icons/fa';

// Import all your API functions
import { 
    getUserDetails, 
    updateUser, 
    changePassword, 
    saveAddress, 
    removeAddress 
} from '../../service/api'; 

// --- 1. SIDEBAR COMPONENT ---
const Sidebar = ({ activeTab, setActiveTab, user }) => {
    
    const getTabClass = (tabName) => {
        const baseClass = "w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between hover:bg-blue-50 transition-colors";
        const activeClass = "text-blue-600 bg-blue-50 font-bold border-l-4 border-blue-600 pl-3";
        const inactiveClass = "text-gray-600 pl-4";
        return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
    };

    // Image URL logic (Backend at port 8000)
    const imageUrl = user?.profileImage 
        ? `http://localhost:5000/uploads/${user.profileImage}` 
        : null;

    return (
        <div className="w-full md:w-1/4 bg-white shadow-sm rounded-sm h-fit overflow-hidden border border-gray-200">
            {/* User Greeting */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-yellow-100 text-yellow-600 relative">
                    {imageUrl ? (
                        <img 
                            src={imageUrl} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                            onError={(e) => {e.target.onerror = null; e.target.src=""}} 
                        />
                    ) : (
                        <FaUser className="text-xl" />
                    )}
                </div>
                <div className="overflow-hidden">
                    <div className="text-xs text-gray-500">Hello,</div>
                    <div className="font-bold text-gray-800 text-sm truncate">
                        {user?.firstname || 'User'} {user?.lastname || ''}
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-white py-2">
                <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <FaUser /> Account Settings
                </div>
                <button onClick={() => setActiveTab('profile')} className={getTabClass('profile')}>Profile Information</button>
                <button onClick={() => setActiveTab('address')} className={getTabClass('address')}>Manage Addresses</button>
                <button onClick={() => setActiveTab('password')} className={getTabClass('password')}>Change Password</button>

                <div className="border-t border-gray-100 my-2"></div>

                <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <FaCreditCard /> Payments
                </div>
                <button onClick={() => setActiveTab('upi')} className={getTabClass('upi')}>Saved UPI</button>
                <button onClick={() => setActiveTab('cards')} className={getTabClass('cards')}>Saved Cards</button>
                
                <button onClick={() => { localStorage.clear(); window.location.href='/login' }} className="w-full text-left px-4 py-4 text-sm font-semibold text-gray-500 hover:text-blue-600 transition flex items-center gap-3">
                    <FaPowerOff /> Logout
                </button>
            </div>
        </div>
    );
};


// --- 2. MAIN SETTINGS COMPONENT ---
const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loadingData, setLoadingData] = useState(true);

    // Main User State
    const [formData, setFormData] = useState({
        id: '',
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        gender: '',
        profileImage: '',
        addresses: [] // Array to hold address list
    });

    // Fetch Data on Load
    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = JSON.parse(localStorage.getItem('userData'));
            if (storedUser && storedUser.id) {
                const response = await getUserDetails(storedUser.id);
                if (response && response.status === 200) {
                    const dbUser = response.data;
                    setFormData({
                        id: dbUser._id,
                        firstname: dbUser.firstname || '',
                        lastname: dbUser.lastname || '',
                        email: dbUser.email || '',
                        mobile: dbUser.phone || '', 
                        gender: dbUser.gender || '',
                        profileImage: dbUser.profileImage || '',
                        addresses: dbUser.addresses || [] 
                    });
                }
            }
            setLoadingData(false);
        };
        fetchUserData();
    }, []);


    // --- VIEW 1: PROFILE ---
    const ProfileView = () => {
        const [isEditing, setIsEditing] = useState(false);
        const [isSaving, setIsSaving] = useState(false);
        const [localData, setLocalData] = useState(formData); 
        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const fileInputRef = useRef(null);

        useEffect(() => { setLocalData(formData); }, [formData]);

        const handleChange = (e) => setLocalData({...localData, [e.target.name]: e.target.value});

        const handleImageChange = (e) => {
            const selected = e.target.files[0];
            if (selected) {
                setFile(selected);
                setPreview(URL.createObjectURL(selected));
            }
        };

        const handleSave = async () => {
            setIsSaving(true);
            const data = new FormData();
            data.append('id', localData.id);
            data.append('firstname', localData.firstname);
            data.append('lastname', localData.lastname);
            data.append('gender', localData.gender);
            data.append('mobile', localData.mobile);
            if (file) data.append('profileImage', file);

            const response = await updateUser(data);
            
            if (response && response.status === 200) {
                setFormData(response.data.data); // Update global state
                setIsEditing(false);
                alert("Profile Updated Successfully");
            } else {
                alert("Update failed");
            }
            setIsSaving(false);
        };

        const imageUrl = preview 
            ? preview 
            : (localData.profileImage ? `http://localhost:5000/uploads/${localData.profileImage}` : null);

        return (
            <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="text-blue-600 font-bold text-sm hover:underline">Edit</button>
                    )}
                </div>

                {/* Profile Image */}
                <div className="flex items-center gap-6 mb-10">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <FaUser className="text-4xl text-gray-300" />
                            )}
                        </div>
                        {isEditing && (
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"
                            >
                                <FaCamera className="text-xs" />
                            </button>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-800">{localData.firstname} {localData.lastname}</div>
                        <div className="text-sm text-gray-500 mt-1">{isEditing ? "Upload a new photo to update." : "Profile details"}</div>
                    </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">First Name</label>
                        <input type="text" name="firstname" value={localData.firstname} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Last Name</label>
                        <input type="text" name="lastname" value={localData.lastname} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Gender</label>
                    <div className="flex gap-6">
                        <label className={`flex items-center gap-2 cursor-pointer ${!isEditing && 'opacity-60'}`}>
                            <input type="radio" name="gender" value="male" checked={localData.gender === 'male'} onChange={handleChange} disabled={!isEditing} /> <span className="text-sm">Male</span>
                        </label>
                        <label className={`flex items-center gap-2 cursor-pointer ${!isEditing && 'opacity-60'}`}>
                            <input type="radio" name="gender" value="female" checked={localData.gender === 'female'} onChange={handleChange} disabled={!isEditing} /> <span className="text-sm">Female</span>
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Email Address</label>
                    <input type="email" value={localData.email} disabled={true} className="w-full md:w-1/2 p-3 border rounded text-sm bg-gray-100 border-transparent text-gray-500 cursor-not-allowed" />
                </div>

                <div className="mb-8">
                    <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Mobile Number</label>
                    <input type="text" name="mobile" value={localData.mobile} onChange={handleChange} disabled={!isEditing} className={`w-full md:w-1/2 p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} />
                </div>

                {isEditing && (
                    <div className="flex gap-4">
                        <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold text-sm shadow hover:bg-blue-700 transition flex items-center gap-2">{isSaving && <FaSpinner className="animate-spin" />} SAVE</button>
                        <button onClick={() => { setIsEditing(false); setLocalData(formData); setFile(null); }} className="text-blue-600 bg-white border border-blue-600 px-6 py-3 rounded-sm font-bold text-sm hover:bg-blue-50 transition">CANCEL</button>
                    </div>
                )}
            </div>
        );
    };


    // --- VIEW 2: ADDRESSES ---
    const AddressView = () => {
        const [isAdding, setIsAdding] = useState(false);
        const [newAddress, setNewAddress] = useState({
            line1: '', line2: '', city: '', zip: '', state: '', country: 'India'
        });

        const handleAddressChange = (e) => setNewAddress({...newAddress, [e.target.name]: e.target.value});

        const handleSubmit = async () => {
            if(!newAddress.line1 || !newAddress.city || !newAddress.zip || !newAddress.state) {
                alert("Please fill in required fields");
                return;
            }

            const response = await saveAddress({ id: formData.id, ...newAddress });
            if(response && response.status === 200) {
                setFormData(prev => ({ ...prev, addresses: response.data.data })); // Update list
                setIsAdding(false);
                setNewAddress({ line1: '', line2: '', city: '', zip: '', state: '', country: 'India' }); // Reset
                alert("Address Saved");
            } else {
                alert("Failed to save address");
            }
        };

        const handleDelete = async (addressId) => {
            if(window.confirm("Delete this address?")) {
                const response = await removeAddress({ id: formData.id, addressId });
                if(response && response.status === 200) {
                    setFormData(prev => ({ ...prev, addresses: response.data.data }));
                }
            }
        };

        return (
            <div className="p-6 md:p-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Manage Addresses</h2>
                
                {/* Add Button */}
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="w-full border border-gray-300 p-4 mb-6 flex items-center gap-3 text-blue-600 font-bold bg-white hover:bg-blue-50 rounded-sm uppercase text-sm">
                        <FaPlus /> Add a new address
                    </button>
                )}

                {/* Add Form */}
                {isAdding && (
                    <div className="bg-blue-50 p-6 rounded-sm mb-6 border border-blue-100">
                        <h3 className="font-bold text-blue-900 mb-4 uppercase text-xs">New Address Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <input type="text" name="line1" placeholder="Address Line 1 (House No, Building)" value={newAddress.line1} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                            <input type="text" name="line2" placeholder="Address Line 2 (Road, Area)" value={newAddress.line2} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                            <div className="flex gap-4">
                                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                                <input type="text" name="zip" placeholder="Pincode" value={newAddress.zip} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                            </div>
                            <div className="flex gap-4">
                                <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                                <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-700">SAVE</button>
                            <button onClick={() => setIsAdding(false)} className="text-blue-600 px-6 py-2 rounded text-sm font-bold hover:bg-blue-100">CANCEL</button>
                        </div>
                    </div>
                )}

                {/* List Addresses */}
                {formData.addresses && formData.addresses.length > 0 ? (
                    formData.addresses.map((addr, index) => (
                        <div key={index} className="border border-gray-300 rounded-sm p-4 bg-white relative hover:shadow transition mb-4">
                            <button onClick={() => handleDelete(addr._id)} className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-red-600">
                                <FaTrash />
                            </button>
                            
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-gray-100 text-gray-500 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">WORK/HOME</span>
                                <span className="font-bold text-gray-800">{formData.firstname} {formData.lastname}</span>
                                <span className="font-bold text-gray-800 ml-2">{formData.mobile}</span>
                            </div>
                            
                            <div className="text-sm text-gray-600 leading-relaxed mt-2">
                                <p><span className="font-semibold text-gray-500">Address Line 1:</span> {addr.line1}</p>
                                {addr.line2 && <p><span className="font-semibold text-gray-500">Address Line 2:</span> {addr.line2}</p>}
                                <p><span className="font-semibold text-gray-500">City/Zip:</span> {addr.city} - <span className="font-bold text-gray-800">{addr.zip}</span></p>
                                <p><span className="font-semibold text-gray-500">State/Country:</span> {addr.state}, {addr.country}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No saved addresses found.</p>
                )}
            </div>
        );
    };


    // --- VIEW 3: PASSWORD ---
    const PasswordView = () => {
        const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
        
        const handlePassChange = (e) => setPasswords({...passwords, [e.target.name]: e.target.value});

        const handleSubmit = async () => {
            if (passwords.new !== passwords.confirm) { alert("New passwords do not match!"); return; }
            if (passwords.new.length < 5) { alert("Password must be at least 5 characters."); return; }

            const response = await changePassword({
                id: formData.id,
                oldPassword: passwords.old,
                newPassword: passwords.new
            });

            if (response && response.status === 200) {
                alert("Password Updated Successfully");
                setPasswords({ old: '', new: '', confirm: '' });
            } else {
                alert("Error: " + (response?.data?.message || "Failed"));
            }
        };

        return (
            <div className="p-6 md:p-10">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
                <div className="max-w-md space-y-4">
                    <div className="relative">
                        <input type="password" name="old" value={passwords.old} onChange={handlePassChange} placeholder="Current Password" className="w-full p-3 border border-gray-300 rounded-sm text-sm focus:border-blue-500 outline-none" />
                    </div>
                    <div className="relative">
                        <input type="password" name="new" value={passwords.new} onChange={handlePassChange} placeholder="New Password" className="w-full p-3 border border-gray-300 rounded-sm text-sm focus:border-blue-500 outline-none" />
                    </div>
                    <div className="relative">
                        <input type="password" name="confirm" value={passwords.confirm} onChange={handlePassChange} placeholder="Retype New Password" className="w-full p-3 border border-gray-300 rounded-sm text-sm focus:border-blue-500 outline-none" />
                    </div>
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-3 rounded-sm font-bold text-sm shadow hover:bg-blue-700 mt-2">CHANGE PASSWORD</button>
                </div>
            </div>
        );
    };
    
    // --- MAIN RENDER SWITCH ---
    const renderContent = () => {
        if (loadingData) return <div className="h-96 flex items-center justify-center text-blue-600"><FaSpinner className="animate-spin text-3xl" /></div>;
        
        switch (activeTab) {
            case 'profile': return <ProfileView />;
            case 'address': return <AddressView />;
            case 'password': return <PasswordView />;
            case 'upi': return <div className="p-10 text-center text-gray-500"><FaMobileAlt className="text-4xl mx-auto mb-2 text-gray-300"/>No Saved UPI</div>;
            case 'cards': return <div className="p-10 text-center text-gray-500"><FaCreditCard className="text-4xl mx-auto mb-2 text-gray-300"/>No Saved Cards</div>;
            default: return <ProfileView />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f3f6] p-4 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={formData} />
                <div className="flex-1 bg-white shadow-sm rounded-sm min-h-[500px]">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;