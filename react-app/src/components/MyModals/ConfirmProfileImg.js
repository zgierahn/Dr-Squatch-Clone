import React from 'react'
import { useState } from "react"; // , useEffect
import { useDispatch } from 'react-redux'  //  , useSelector
import { thunkAddUserProfileImg, thunkDeleteUserProfileImg } from '../../store/session';

import "./ConfirmationModal.css"


function ConfirmProfileImg ({profile}) {

const dispatch = useDispatch();
const [profileImg, setProfileImg] = useState("");
const [modal, setModal] = useState(false);
const [errors, setErrors] = useState([]);



const toggleButton = () => {
    setModal(!modal);
}

const removeProfile = () => {
    dispatch(thunkDeleteUserProfileImg(profile.id))
    toggleButton();
}

const addProfile = async () => {
    const data = await dispatch(thunkAddUserProfileImg(profile.id, profileImg))
    if (data) {
        setErrors(data);
    } else {
        setProfileImg("");
        toggleButton();

    }
}

const cancelFunc = () => {
    setProfileImg("");
    setErrors([]);
    toggleButton();
}

  return (
    <div>

        <button className='whiteChangeUserProfile'
            onClick={()=>{toggleButton()
            }}>
                {profile.profileImage ? "Delete Image" : "Add Image"}
        </button>

        {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                    <h1 className='modalTitles'>
                        {profile.profileImage ? "Do you want to delete your profile image?" : "Add a profile image"}
                    </h1>

                    {!profile.profileImage && (
                    <div>
                        <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                        </ul>
                        <span className='confirmButtonSpan'>
                        <label className="reviewLabel">
                            User Profile Image URL:
                        <input className="reviewTitleInput"
                         value={profileImg}
                         type="text"
                         defaultValue={""}
                         placeholder='place valid link here'
                         onChange={(e) => {setProfileImg(e.target.value)
                         }}/>
                         </label>
                        </span>
                    </div>
                    )}

                    <span className='confirmButtonSpan'>
                        <button className='reviewModalButtons'
                        onClick={()=>{profile.profileImage ? removeProfile() : addProfile()
                        }}>
                            {profile.profileImage ? "Delete profile image" : "Add Image"}
                        </button>
                        <button className='reviewModalButtons'
                        onClick={()=>{cancelFunc()}}>
                            Cancel
                        </button>
                    </span>
                </div>
            </div>
        )}

    </div>
  )
}

export default ConfirmProfileImg
