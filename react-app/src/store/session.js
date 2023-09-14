// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};


export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		dispatch(removeUser());
	}
};


export const signUp = (firstName, lastName, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			firstName,
			lastName,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const thunkEditName = (id, firstName, lastName) => async (dispatch) => {
	const response = await fetch(`/api/auth/edit-name/${id}`,
	{
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			firstName,
			lastName
			}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const thunkEditEmail = (id, email) => async (dispatch) => {

	const response = await fetch(`/api/auth/edit-email/${id}`,
	{
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({email}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


export const thunkEditPassword = (id, email, password, newPassword) => async (dispatch) => {
	const response = await fetch(`/api/auth/edit-password/${id}`,
	{
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			email,
			password,
			newPassword
		}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// Delete User by Id
export const thunkDeleteUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/delete`,{
        method: 'DELETE'
    });
    if(res.ok) {
        const response = await res.json();
        dispatch(removeUser());
        return response;
    } else {
        const err = await res.json();
        return err;
    }
};


// Create a new Address
export const thunkCreateAddress = (userId, addressObj) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/address`, {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(addressObj),
	});

	if (response.ok) {
		const response = await fetch(`/api/users/${userId}`)
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// Edit an Existing Address
export const thunkEditAddress = (userId, addressObj) => async (dispatch) => {
	const response = await fetch(`/api/users/${userId}/address/${addressObj.id}/edit`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify(addressObj),
	});

	if (response.ok) {
		const response = await fetch(`/api/users/${userId}`)
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// Delete Address by Id
export const thunkDeleteAddress = (userId, addressId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/address/${addressId}/delete`,
	{
        method: 'DELETE'
    });
    if(res.ok) {
        const response = await fetch(`/api/users/${userId}`)
		const data = await response.json();
		dispatch(setUser(data));
		return null;
    } else {
        const err = await res.json();
        return err;
    }
};


// Add an image to user profile
export const thunkAddUserProfileImg = (id, profileImage) => async (dispatch) => {

	const response = await fetch(`/api/auth/profile-image/${id}/put`,
	{
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({profileImage}),
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};


// Delete an image from user profile
export const thunkDeleteUserProfileImg = (id) => async (dispatch) => {

	const response = await fetch(`/api/auth/profile-image/${id}/delete`,
	{
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};





export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}
