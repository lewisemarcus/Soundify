import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useForm } from "../utils/hooks/hooks"
import { useMutation } from "@apollo/react-hooks"
import {
    TextField,
    Paper,
    Stack,
    Alert,
    Backdrop,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import "../components/styles/Button.css"
import Button from "../components/Button"
import "./styles/Register.css"

import { gql } from "graphql-tag"
import { useNavigate } from "react-router-dom"

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`

function Register(props) {
    const context = useContext(AuthContext)
    let navigate = useNavigate()

    const [errors, setErrors] = useState([])

    function registerUserCallback() {
        console.log("callback hit")
        registerUser()
    }

    const { onChange, onSubmit, values } = useForm(registerUserCallback, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update({ data: { registerUser: userData } }) {
            context.login(userData)
            navigate("/")
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors)
        },
        variables: { registerInput: values },
    })

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const [passwordShow, setPasswordShow] = useState({
        password: "",
        showPassword: false,
    })

    const handleChange = (prop) => (event) => {
        setPasswordShow({ ...values, [prop]: event.target.value })
    }

    const handleClickShowPassword = () => {
        setPasswordShow({
            ...passwordShow,
            showPassword: !passwordShow.showPassword,
        })
    }

    return (
        <div className="register-wrapper">
            <Paper elevation={12} className="register-form">
                {loading ? "Loading..." : ""}
                <div className="register-header">
                    <h3>Register</h3>
                    <p>Sign up below to upload and listen to music!</p>
                </div>
                <Stack spacing={5} paddingBottom={4}>
                    <TextField
                        className="input"
                        type="name"
                        placeholder="Username"
                        name="username"
                        onChange={onChange}
                    />
                    <TextField
                        className="input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={onChange}
                    />
                    <OutlinedInput
                        placeholder="Password"
                        id="outlined-adornment-password"
                        type={passwordShow.showPassword ? "text" : "password"}
                        name="password"
                        value={passwordShow.password}
                        onChange={onChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onChange={handleChange("password")}
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {passwordShow.showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </Stack>
                {errors.map(function (error) {
                    return (
                        <Backdrop
                            sx={{
                                color: "#fff",
                                zIndex: (theme) => theme.zIndex.drawer + 1,
                            }}
                            open={open}
                            onClick={handleClose}
                        >
                            <Alert severity="error">
                                Incorrect email/password
                            </Alert>
                            ;
                        </Backdrop>
                    )
                })}
                <Button className="solid-btn login-btn" onClick={onSubmit}>
                    Register
                </Button>
            </Paper>
        </div>
    )
}

export default Register