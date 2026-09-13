import React, { useState, useEffect, useRef } from 'react';
import { 
    FaUser, FaCreditCard, FaBoxOpen, FaPowerOff, FaCamera, FaSpinner,
    FaPlus, FaEdit, FaTrash, FaMobileAlt, FaMapMarkerAlt
} from 'react-icons/fa';

import { 
    getUserDetails, 
    updateUser, 
    changePassword, 
    saveAddress, 
    removeAddress 
} from '../../service/api';

const API_URL = (import.meta.env.VITE_API_URL || 'https://e-commerce-web-d7rw.onrender.com').replace(/\/$/, '');

const Sidebar = ({ activeTab, setActiveTab, user }) => {
    const getTabClass = (tabName) => {
        const baseClass = "w-full text-left px-4 py-3 text-sm font-medium flex items-center justify-between hover:bg-blue-50 transition-colors";
        const activeClass = "text-blue-600 bg-blue-50 font-bold border-l-4 border-blue-600 pl-3";
        const inactiveClass = "text-gray-600 pl-4";
        return `${baseClass} ${activeTab === tabName ? activeClass : inactiveClass}`;
    };

    const imageUrl = user?.profileImage ? `${API_URL}/uploads/${user.profileImage}` : null;

    return (
        <div className="w-full md:w-1/4 bg-white shadow-sm rounded-sm h-fit overflow-hidden border border-gray-200">
            <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-yellow-100 text-yellow-600 relative">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = ''; }} />
                    ) : (
                        <FaUser className="text-xl" />
                    )}
                </div>
                <div className="overflow-hidden">
                    <div className="text-xs text-gray-500">Hello,</div>
                    <div className="font-bold text-gray-800 text-sm truncate">{user?.firstname || 'User'} {user?.lastname || ''}</div>
                </div>
            </div>

            <div className="bg-white py-2">
                <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaUser /> Account Settings</div>
                <button onClick={() => setActiveTab('profile')} className={getTabClass('profile')}>Profile Information</button>
                <button onClick={() => setActiveTab('address')} className={getTabClass('address')}>Manage Addresses</button>
                <button onClick={() => setActiveTab('password')} className={getTabClass('password')}>Change Password</button>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="px-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2"><FaCreditCard /> Payments</div>
                <button onClick={() => setActiveTab('upi')} className={getTabClass('upi')}>Saved UPI</button>
                <button onClick={() => setActiveTab('cards')} className={getTabClass('cards')}>Saved Cards</button>
                <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} className="w-full text-left px-4 py-4 text-sm font-semibold text-gray-500 hover:text-blue-600 transition flex items-center gap-3"><FaPowerOff /> Logout</button>
            </div>
        </div>
    );
};

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [loadingData, setLoadingData] = useState(true);
    const [formData, setFormData] = useState({ id: '', firstname: '', lastname: '', email: '', mobile: '', gender: '', profileImage: '', addresses: [] });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
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
            } catch (error) {
                console.error('Failed to load user profile.');
            } finally {
                setLoadingData(false);
            }
        };
        fetchUserData();
    }, []);

    const ProfileView = () => {
        const [isEditing, setIsEditing] = useState(false);
        const [isSaving, setIsSaving] = useState(false);
        const [localData, setLocalData] = useState(formData);
        const [file, setFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const fileInputRef = useRef(null);

        useEffect(() => { setLocalData(formData); }, [formData]);
        const handleChange = (e) => setLocalData({ ...localData, [e.target.name]: e.target.value });
        const handleImageChange = (e) => { const selected = e.target.files[0]; if (selected) { setFile(selected); setPreview(URL.createObjectURL(selected)); } };

        const handleSave = async () => {
            setIsSaving(true);
            try {
                const data = new FormData();
                data.append('id', localData.id); data.append('firstname', localData.firstname); data.append('lastname', localData.lastname); data.append('gender', localData.gender); data.append('mobile', localData.mobile);
                if (file) data.append('profileImage', file);
                const response = await updateUser(data);
                if (response && response.status === 200) { setFormData(response.data.data); setIsEditing(false); alert('Profile Updated Successfully'); }
                else alert('Update failed');
            } catch (error) { alert('Update failed'); }
            finally { setIsSaving(false); }
        };

        const imageUrl = preview || (localData.profileImage ? `${API_URL}/uploads/${localData.profileImage}` : null);

        return (
            <div className="p-6 md:p-10">
                <div className="flex items-center justify-between mb-8"><h2 className="text-xl font-bold text-gray-800">Personal Information</h2>{!isEditing && <button onClick={() => setIsEditing(true)} className="text-blue-600 font-bold text-sm hover:underline">Edit</button>}</div>
                <div className="flex items-center gap-6 mb-10"><div className="relative group"><div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">{imageUrl ? <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" /> : <FaUser className="text-4xl text-gray-300" />}</div>{isEditing && <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow hover:bg-blue-700 transition"><FaCamera className="text-xs" /></button>}<input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" /></div><div><div className="text-lg font-bold text-gray-800">{localData.firstname} {localData.lastname}</div><div className="text-sm text-gray-500 mt-1">{isEditing ? 'Upload a new photo to update.' : 'Profile details'}</div></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"><div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">First Name</label><input type="text" name="firstname" value={localData.firstname} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} /></div><div><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Last Name</label><input type="text" name="lastname" value={localData.lastname} onChange={handleChange} disabled={!isEditing} className={`w-full p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} /></div></div>
                <div className="mb-6"><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Gender</label><div className="flex gap-6"><label className={`flex items-center gap-2 cursor-pointer ${!isEditing && 'opacity-60'}`}><input type="radio" name="gender" value="male" checked={localData.gender === 'male'} onChange={handleChange} disabled={!isEditing} /> <span className="text-sm">Male</span></label><label className={`flex items-center gap-2 cursor-pointer ${!isEditing && 'opacity-60'}`}><input type="radio" name="gender" value="female" checked={localData.gender === 'female'} onChange={handleChange} disabled={!isEditing} /> <span className="text-sm">Female</span></label></div></div>
                <div className="mb-6"><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Email Address</label><input type="email" value={localData.email} disabled className="w-full md:w-1/2 p-3 border rounded text-sm bg-gray-100 border-transparent text-gray-500 cursor-not-allowed" /></div>
                <div className="mb-8"><label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Mobile Number</label><input type="text" name="mobile" value={localData.mobile} onChange={handleChange} disabled={!isEditing} className={`w-full md:w-1/2 p-3 border rounded text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent text-gray-600'}`} /></div>
                {isEditing && <div className="flex gap-4"><button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white px-8 py-3 rounded-sm font-bold text-sm shadow hover:bg-blue-700 transition flex items-center gap-2">{isSaving && <FaSpinner className="animate-spin" />} SAVE</button><button onClick={() => { setIsEditing(false); setLocalData(formData); setFile(null); setPreview(null); }} className="text-blue-600 bg-white border border-blue-600 px-6 py-3 rounded-sm font-bold text-sm hover:bg-blue-50 transition">CANCEL</button></div>}
            </div>
        );
    };

    const AddressView = () => {
        const [isAdding, setIsAdding] = useState(false);
        const [newAddress, setNewAddress] = useState({ line1: '', line2: '', city: '', zip: '', state: '', country: 'India' });
        const handleAddressChange = (e) => setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
        const handleSubmit = async () => {
            if (!newAddress.line1 || !newAddress.city || !newAddress.zip || !newAddress.state) { alert('Please fill in required fields'); return; }
            try { const response = await saveAddress({ id: formData.id, ...newAddress }); if (response && response.status === 200) { setFormData(prev => ({ ...prev, addresses: response.data.data })); setIsAdding(false); setNewAddress({ line1: '', line2: '', city: '', zip: '', state: '', country: 'India' }); alert('Address Saved'); } else alert('Failed to save address'); } catch (error) { alert('Failed to save address'); }
        };
        const handleDelete = async (addressId) => { if (window.confirm('Delete this address?')) { try { const response = await removeAddress({ id: formData.id, addressId }); if (response && response.status === 200) setFormData(prev => ({ ...prev, addresses: response.data.data })); } catch (error) { console.error('Failed to delete address.'); } } };
        return (
            <div className="p-6 md:p-10"><h2 className="text-xl font-bold text-gray-800 mb-6">Manage Addresses</h2>{!isAdding && <button onClick={() => setIsAdding(true)} className="w-full border border-gray-300 p-4 mb-6 flex items-center gap-3 text-blue-600 font-bold bg-white hover:bg-blue-50 rounded-sm uppercase text-sm"><FaPlus /> Add a new address</button>}{isAdding && <div className="bg-blue-50 p-6 rounded-sm mb-6 border border-blue-100"><h3 className="font-bold text-blue-900 mb-4 uppercase text-xs">New Address Details</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"><input type="text" name="line1" placeholder="Address Line 1 (House No, Building)" value={newAddress.line1} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /><input type="text" name="line2" placeholder="Address Line 2 (Road, Area)" value={newAddress.line2} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /><div className="flex gap-4"><input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /><input type="text" name="zip" placeholder="Pincode" value={newAddress.zip} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /></div><div className="flex gap-4"><input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /><input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} className="p-3 border rounded text-sm w-full" /></div></div><div className="flex gap-3"><button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-700">SAVE</button><button onClick={() => setIsAdding(false)} className="text-blue-600 px-6 py-2 rounded text-sm font-bold hover:bg-blue-100">CANCEL</button></div></div>}{formData.addresses?.length > 0 ? formData.addresses.map((addr, index) => <div key={index} className="border border-gray-300 rounded-sm p-4 bg-white relative hover:shadow transition mb-4"><button onClick={() => handleDelete(addr._id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700"><FaTrash /></button><div className="font-bold text-gray-800 mb-2">Address {index + 1}</div><div className="text-sm text-gray-600 leading-6">{addr.line1}<br />{addr.line2 && <>{addr.line2}<br /></>}{addr.city}, {addr.state} - {addr.zip}<br />{addr.country}</div></div>) : <div className="text-sm text-gray-500">No saved addresses.</div>}</div>
        );
    };

    const PasswordView = () => {
        const [currentPassword, setCurrentPassword] = useState(''); const [newPassword, setNewPassword] = useState(''); const [confirmPassword, setConfirmPassword] = useState(''); const [saving, setSaving] = useState(false);
        const handleChangePassword = async () => { if (!currentPassword || !newPassword || !confirmPassword) { alert('Please fill in all fields'); return; } if (newPassword !== confirmPassword) { alert('New passwords do not match'); return; } setSaving(true); try { const response = await changePassword({ id: formData.id, currentPassword, newPassword }); if (response?.status === 200) { alert('Password changed successfully'); setCurrentPassword(''); setNewPassword(''); setConfirmPassword(''); } else alert('Password change failed'); } catch (error) { alert('Password change failed'); } finally { setSaving(false); } };
        return <div className="p-6 md:p-10"><h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2><div className="max-w-md space-y-4"><input type="password" placeholder="Current Password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full p-3 border rounded text-sm" /><input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-3 border rounded text-sm" /><input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-3 border rounded text-sm" /><button onClick={handleChangePassword} disabled={saving} className="bg-blue-600 text-white px-6 py-3 rounded font-bold">{saving ? 'SAVING...' : 'CHANGE PASSWORD'}</button></div></div>;
    };

    const EmptyPaymentView = ({ title }) => <div className="p-6 md:p-10"><h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2><div className="text-sm text-gray-500">No saved payment methods.</div></div>;

    if (loadingData) return <div className="flex justify-center items-center min-h-[400px]"><FaSpinner className="animate-spin text-3xl text-blue-600" /></div>;

    return <div className="min-h-screen bg-gray-50 p-4 md:p-8"><div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6"><Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={formData} /><div className="w-full md:w-3/4 bg-white shadow-sm rounded-sm border border-gray-200">{activeTab === 'profile' && <ProfileView />}{activeTab === 'address' && <AddressView />}{activeTab === 'password' && <PasswordView />}{activeTab === 'upi' && <EmptyPaymentView title="Saved UPI" />}{activeTab === 'cards' && <EmptyPaymentView title="Saved Cards" />}</div></div></div>;
};

export default Settings;
