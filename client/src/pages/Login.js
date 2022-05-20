import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Alert, message } from "antd";
import Button from "../components/Button";
import "./styles/Login.css";
import "../components/styles/Button.css";
import * as IoIcons from "react-icons/io";

import { gql } from "graphql-tag";
import { Link, useNavigate } from "react-router-dom";

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
    const hide = message.loading("Logging in...", 0);
    setTimeout(hide, 1100);

    setTimeout(() => {
      loginUser();
    }, 1000);
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

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="login-wrapper">
      <Form name="basic" autoComplete="off" className="login-form">
        <IoIcons.IoIosArrowDropleft
          onClick={handleBackClick}
          className="login-icon"
        />
        <div className="login-header">
          <p className="login">Login</p>
          <p className="login-description">
            Log in below to start listening to music!
          </p>
        </div>
        <div className="form-input-wrapper">
          <Input
            className="input"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />

          <Input.Password
            className="input"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
          <Button
            className="solid-btn login-btn"
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
          >
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <Link className="link-to-register" to="/register">
              Register here
            </Link>
          </p>
          {errors.map(function (error, index) {
            return (
              <Alert
                className="error"
                description="Something went wrong. Please try again."
                type="error"
                showIcon
                key={index}
              />
            );
          })}
        </div>
      </Form>
    </div>
  );
}

export default Login;
