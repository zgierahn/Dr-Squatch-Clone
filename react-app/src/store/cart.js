const GET_SERVERS = "servers/GET_SERVERS"
const GET_SINGLE_SERVER = "servers/GET_SINGLE_SERVER"
const CREATE_SERVER = 'servers/CREATE_SERVER'
const DELETE_SERVER = 'servers/DELETE_SERVER'
const EDIT_SERVER = 'servers/EDIT_SERVER'

const getServer = (servers) => ({
    type:GET_SERVERS,
    data:servers
})

const deleteServer = (serverId) => ({
    type:DELETE_SERVER,
    data:serverId
})

const editServer = (serverValue) => ({
    type:EDIT_SERVER,
    data:serverValue
})

const getSingleServer = (server) => ({
    type:GET_SINGLE_SERVER,
    data:server
})

const createServer = (data) => ({
    type:CREATE_SERVER,
    data
})

/*

Needs major everhaul, just grabbed code for referencing




*/

export const thunkEditServer = (serverValue, name,privates,picture) => async (dispatch) => {

        const response = await fetch(`/api/servers/edit/${serverValue}`, {
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,privates,picture})
        })
        if (response.ok)    {
            const server = await response.json()
            dispatch(editServer(server))
            return server
        }
        else if (response.status < 500){
        const err = await response.json()
        return err
    }
}

export const thunkCreateServer = (name,privates,picture) => async (dispatch) => {

        const response = await fetch(`/api/servers/new`, {
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,privates,picture})
        })
        if (response.ok)    {
            const server = await response.json()
            dispatch(createServer(server))
            return server
        }
        else if (response.status < 500){
        const err = await response.json()
        return err
    }
}

export const thunkGetSingleServer = (userId,serverId) => async(dispatch) => {
    const res = await fetch(`/api/servers/${userId}/${serverId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getSingleServer(data))
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}

export const thunkGetServers = (id) => async(dispatch) => {
    const res = await fetch(`/api/servers/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getServer(data))
        console.log(data)
        return data
    }
    else {
        const err = await res.json()
        return {errors:err}
    }
}




const initialState = {allServers:{}, singleServer:{}}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_SERVERS: {
            let newState = {...state, allServers:{...state.allServers}}
            newState.allServers = {}
            action.data.forEach(ele => {
                newState.allServers[ele.id]= ele
            });
            return newState
        }
        case GET_SINGLE_SERVER:{
            let newState = {...state, singleServer:{...state.singleServer}}
            newState.singleServer = {}
            newState.singleServer=action.data
            return newState
        }
        case CREATE_SERVER: {
            const newState = {...state}
            newState.allServers[action.data.id] = action.data
            return newState
        }
        case DELETE_SERVER: {
            const newState = {...state, allServer:{...state.allServers}}//try this to reshresh {...state,allGroups:{...state.allGroups}}
            delete newState.allServers[action.eventId]
            return newState
        }
        case EDIT_SERVER: {
            const newState = {...state, singleServer:{...state.singleServer}}
            newState.singleServer = {}
            newState.singleServer = action.data
            return newState
        }
        default:
            return state
    }
}
