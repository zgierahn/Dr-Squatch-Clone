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
            console.log('inside name thunk', attribute);
            data = await dispatch(thunkEditName(userId, firstName, lastName));
        }
        if(attribute === "Email"){
            console.log('inside email thunk', attribute);
            data = await dispatch(thunkEditEmail(userId, email));
        }
        if(attribute === "Password"){
            console.log('inside password thunk', attribute);
            data = await dispatch(thunkEditPassword(userId, sessionUser.email, password, newPassword));
        }
        console.log("returned data", data);
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
                        <label>
                        Email
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </label>
                    } { attribute === "Name" && (
                        <label>
                        First Name
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                    </label>
                    )} { attribute === "Name" && (
                    <label>
                        Last Name
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                    </label>
                    )} { attribute === "Password" &&
                    <label>
                        Confirm Existing Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </label>
                    } { attribute === "Password" &&
                    <label>
                         Set New Password
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
