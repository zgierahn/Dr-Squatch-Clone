import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkEditUser } from "../../store/session";



function EditUserModal({attribute}) {

    const { userId } = useParams();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const [modal, setModal] = useState(false);

    const toggleButton = () => {
        setModal(!modal)
    }

	const handleSubmit = async (e) => {
        let user = {};
        user.email = email ? email : null;
        user.firstName = firstName ? firstName : null;
        user.lastName = lastName ? lastName : null;
        user.password = password ? password : null;
		e.preventDefault();
		if (password === confirmPassword) {
            const data = await dispatch(thunkEditUser(userId, user));
            console.log("returned data", data);
			if (data) {
				setErrors(data);
			} else {
				toggleButton();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
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
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                    </label>
                    } { attribute === "Password" &&
                    <label>
                        Confirm Password
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
