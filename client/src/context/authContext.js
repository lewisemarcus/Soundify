import React, { useReducer, createContext } from "react"
import decode from "jwt-decode"

const initialState = {
    user: null,
}

if (localStorage.getItem("token")) {
    let dateNow = new Date()
    const decodedToken = decode(localStorage.getItem("token"))
    if (decodedToken.exp < dateNow.getTime() / 1000) {
        localStorage.removeItem("token")
    } else {
        initialState.user = decodedToken
    }
    initialState.user = decodedToken
}

const AuthContext = createContext({
    user: null,
    login: (userData) => {
        localStorage.setItem("token", userData.token)
        localStorage.setItem("username", userData.username)
        window.location.assign("/")
    },
    logout: () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        window.location.assign("/")
    },
})

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
            }
        case "LOGOUT":
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState)

    const login = (userData) => {
        localStorage.setItem("token", userData.token)
        localStorage.setItem("username", userData.username)
        dispatch({
            type: "LOGIN",
            payload: userData,
        })
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("playlists")
        localStorage.removeItem("singlePL")
        window.location.assign("/")
        dispatch({ type: "LOGOUT" })
    }

    return (
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    )
}

export { AuthContext, AuthProvider }
