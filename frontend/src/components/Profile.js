import React, { useEffect, useState } from 'react';
import '../styles/profile.css';

const Profile = ({ token, setToken }) => {
    const [profile, setProfile] = useState({});
    const [originalProfile, setOriginalProfile] = useState({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {

            const response = await fetch('http://localhost:5000/api/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            data.date_of_birth = new Date(data.date_of_birth).toISOString().split('T')[0];
            setProfile(data);
            setOriginalProfile(data); // Save the original profile for comparison
        };
        fetchProfile();
    }, [token]);

    const handleLogout = () => {
        setToken(null);
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account?')) {

            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setToken(null);
                alert(data.message);
            } else {
                alert(data.message);
            }

        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Create a partial update object with only changed fields
        const updatedFields = Object.keys(profile).reduce((acc, key) => {
            if (profile[key] !== originalProfile[key]) {
                acc[key] = profile[key];
            }
            return acc;
        }, {});

        if (Object.keys(updatedFields).length === 0) {
            // alert("No changes detected.");
            return;
        }

        // Ensure all fields required by the backend are sent
        const requiredFields = {
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            gender: profile.gender || '',
            dateOfBirth: profile.date_of_birth || '',
            email: profile.email || '',
            profileImageUrl: profile.profile_image_url || ''
        };

        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requiredFields),
            });
            const data = await response.json();
            if (response.ok) {
                setEditMode(false);
                alert(data.message);
                setOriginalProfile(profile); // Update the original profile
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={profile.first_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={profile.last_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={profile.gender || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={profile.date_of_birth || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div>
                    <label>Profile Image</label>
                    {profile.profile_image_url && <img src={profile.profile_image_url} alt="Profile" />}
                </div>
                {editMode ? (
                    <button type="submit">Update</button>
                ) : (
                    <button type="button" onClick={handleEdit}>Edit</button>
                )}
            </form>
            <div className='buttons'>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleDelete}>Delete Account</button>
            </div>
        </div>
    );
};

export default Profile;
