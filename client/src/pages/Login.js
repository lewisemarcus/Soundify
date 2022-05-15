import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks/hooks";
import { useMutation } from "@apollo/react-hooks";
import {
  TextField,
  Paper,
  Stack,
  Alert,
  Backdrop,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../components/Button";
import "./styles/Login.css";
import "../components/styles/Button.css";

import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";

const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

function Login(props) {
  let navigate = useNavigate();

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const [passwordShow, setPasswordShow] = useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPasswordShow({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordShow({
      ...passwordShow,
      showPassword: !passwordShow.showPassword,
    });
  };

  return (
    <div className="login-wrapper">
      <Paper elevation={12} className="login-form">
        {loading ? "Loading..." : ""}
        <div className="login-header">
          <h3>Login</h3>
          <p>Log in below to start listening to music!</p>
        </div>
        <Stack spacing={5} paddingBottom={4}>
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
            value={passwordShow.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
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
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <Alert severity="error">Incorrect email/password</Alert>;
            </Backdrop>
          );
        })}
        <Button className="solid-btn login-btn" onClick={onSubmit}>
          Login
        </Button>
      </Paper>
    </div>
  );
}

export default Login;
