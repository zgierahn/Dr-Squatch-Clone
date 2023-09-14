import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { thunkCreateAddress, thunkEditAddress } from "../../store/session";



function AddressModal({address}) {
    const { userId } = useParams();
	const dispatch = useDispatch();
    const [category, setCategory] = useState(address ? address.category : "" );
    const [address1, setAddress1] = useState(address ? address.address1 : "" );
    const [address2, setAddress2] = useState(address ? address.address2 : "" );
    const [address3, setAddress3] = useState(address ? address.address3 : "" );
    const [city, setCity] = useState(address ? address.city : "" );
    const [state, setState] = useState(address ? address.state : "" );
    const [postalCode, setPostalCode] = useState(address ? address.postalCode : "" );
    const [country, setCountry] = useState(address ? address.country : "" );
	const [errors, setErrors] = useState([]);
	const [modal, setModal] = useState(false);


    const toggleButton = () => {
        setModal(!modal)
    }

    const resetData = () => {
        setCategory(address ? address.category : "" )
        setAddress1(address ? address.address1 : "" );
        setAddress2(address ? address.address2 : "" );
        setAddress3(address ? address.address3 : "" );
        setCity(address ? address.city : "" );
        setState(address ? address.state : "" );
        setPostalCode(address ? address.postalCode : "" );
        setCountry(address ? address.country : "" );
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

        let data;
        if(address === ""){
            data = await dispatch(thunkCreateAddress(userId, addressObj));
        } else {
            addressObj.id = address.id
            data = await dispatch(thunkEditAddress(userId, addressObj));
        }
        if (data) {
            setErrors(data);
        } else {
            toggleButton();
            resetData();
        }
	};

    const cancelSubmit = async () => {
        toggleButton();
        resetData();
    }

	return (
		<main>

            <button className='changeUserProfile'
            onClick={()=>{toggleButton()
            }}>
                {address ? "Edit" : "Create an" } Address
            </button>

            {modal && (
            <div className='reviewModalOverlay'>
                <div className='reviewModal'>
                <h1 className="modalTitles">
                    {address ? "Edit" : "Create an" } Address
                </h1>
                <form className="signupForm"
                onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                            ))}
                    </ul>
                    <label className="labelInput">
                        Category:
                        <select name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        defaultValue={category}
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="shipping">Shipping</option>
                            <option value="billing">Billing</option>
                            <option value="both">Both</option>
                        </select>
                    </label>
                    <label className="labelInput">
                        Address:
                        <input
                            type="text"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                            minLength="6"
                            />
                    </label>
                    <label className="labelInput">
                        Address Line 2:
                        <input
                            type="text"
                            placeholder="optional"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            />
                    </label>
                    <label className="labelInput">
                        Address Line 3:
                        <input
                            type="text"
                            placeholder="optional"
                            value={address3}
                            onChange={(e) => setAddress3(e.target.value)}
                            />
                    </label>
                    <label className="labelInput">
                        City:
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            />
                    </label>
                    <label className="labelInput">
                        State:
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            />
                    </label>
                    <label className="labelInput">
                        Postal Code:
                        <input className="postalCodeInput"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            type="number"
                            min="10000"
                            max="99999"
                            />
                    </label>
                    <label className="labelInput">
                         Country:
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
                        onClick={()=>{cancelSubmit()
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

export default AddressModal;
