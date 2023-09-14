import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkEditName, thunkEditEmail, thunkEditPassword } from "../../store/session";



function EditUserModal({attribute}) {

	const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
	const dispatch = useDispatch();
	const [email, setEmail] = useState(sessionUser.email);
	const [firstName, setFirstName] = useState(sessionUser.firstName);
	const [lastName, setLastName] = useState(sessionUser.lastName);
	const [newPassword, setNewPassword] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [modal, setModal] = useState(false);

    const toggleButton = () => {
        setModal(!modal)
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
        let data;
        if(attribute === "Name"){
            data = await dispatch(thunkEditName(userId, firstName, lastName));
        }
        if(attribute === "Email"){
            data = await dispatch(thunkEditEmail(userId, email));
        }
        if(attribute === "Password"){
            data = await dispatch(thunkEditPassword(userId, sessionUser.email, password, newPassword));
        }
        if (data) {
            setErrors(data);
        } else {
            toggleButton();
        }
	};

	return (
		<main>

            <button className='changeUserProfile'
            onClick={()=>{toggleButton()
            }}>
                Edit {attribute}
            </button>

            {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                <h1 className="modalTitles">
                    Edit {attribute}
                </h1>
                <form className="signupForm"
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                    { attribute === "Email" &&
                    <label className="labelInput">
                        Email:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </label>
                    } { attribute === "Name" && (
                    <label className="labelInput">
                        First Name:
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                    </label>
                    )} { attribute === "Name" && (
                    <label className="labelInput">
                        Last Name:
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                    </label>
                    )} { attribute === "Password" &&
                    <label className="labelInput">
                        Confirm Existing Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </label>
                    } { attribute === "Password" &&
                    <label className="labelInput">
                         Set New Password:
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            />
                    </label>
                    }

                    <span className="confirmButtonSpan">
                        <button className="userProfileButton" type="submit">
                            Submit
                        </button>
                        <button className='userProfileButton'
                        onClick={()=>{toggleButton()
                        }}>
                            Cancel
                        </button>
                    </span>
                    </form>
                </div>
            </div>
            )}
		</main>
    )
};

export default EditUserModal;
