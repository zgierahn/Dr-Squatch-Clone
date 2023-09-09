import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkCreateAddress, thunkEditAddress } from "../../store/session";



function CreateAddressModal() {

    const { userId } = useParams();
	const dispatch = useDispatch();
    const [category, setCategory] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
	const [errors, setErrors] = useState([]);
	const [modal, setModal] = useState(false);

    console.log("this is category", category);

    const toggleButton = () => {
        setModal(!modal)
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
        let addressObj = {};
        addressObj.category = category;
        addressObj.address1 = address1;
        addressObj.address2 = address2;
        addressObj.address3 = address3;
        addressObj.city = city;
        addressObj.state = state;
        addressObj.postal_code = postalCode;
        addressObj.country = country;
        const data = await dispatch(thunkCreateAddress(userId, addressObj));
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
                Create an Address
            </button>

            {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                <h1 className="modalTitles">
                    Create an Address
                </h1>
                <form className="signupForm"
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                        <label className="reviewLabel">
                        Category
                        <select name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="shipping">Shipping</option>
                            <option value="billing">Billing</option>
                            <option value="both">Both</option>
                        </select>
                    </label>
                    <label className="reviewLabel">
                        Address
                        <input
                            type="text"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                            minLength="6"
                            />
                    </label>
                    <label className="reviewLabel">
                        Address Line 2
                        <input
                            type="text"
                            placeholder="optional"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            />
                    </label>
                    <label className="reviewLabel">
                        Address Line 3
                        <input
                            type="text"
                            placeholder="optional"
                            value={address3}
                            onChange={(e) => setAddress3(e.target.value)}
                            />
                    </label>
                    <label className="reviewLabel">
                        City
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            />
                    </label>
                    <label className="reviewLabel">
                        State
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            />
                    </label>
                    <label className="reviewLabel">
                        Postal Code
                        <input className="postalCodeInput"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            type="number"
                            min="10000"
                            max="99999"
                            />
                    </label>
                    <label className="reviewLabel">
                         Country
                        <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            />
                    </label>

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

export default CreateAddressModal;
