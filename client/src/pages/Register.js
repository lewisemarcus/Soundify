import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks/hooks";
import { useMutation } from "@apollo/react-hooks";
import { Form, Input, Alert, message, Popover, Tooltip } from "antd";
import "../components/styles/Button.css";
import Button from "../components/Button";
import "./styles/Register.css";
import * as IoIcons from "react-icons/io";

import { gql } from "graphql-tag";
import { Link, useNavigate } from "react-router-dom";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  function registerUserCallback() {

    const hide = message.loading("Creating account...", 0);
    setTimeout(hide, 1100);

    setTimeout(() => {
      registerUser();
    }, 1000);
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="register-wrapper">
      <Form name="basic" autoComplete="off" className="register-form">
        <IoIcons.IoIosArrowDropleft
          onClick={handleBackClick}
          className="register-icon"
        />
        <div className="register-header">
          <p className="register">Register</p>
          <p className="register-description">
            Sign up below to upload and listen to music!
          </p>
        </div>
        <div className="form-input-wrapper">
          <Input
            className="input"
            placeholder="Username"
            name="username"
            onChange={onChange}
          />
          <Input
            className="input"
            placeholder="Email"
            name="email"
            onChange={onChange}
          />
          <Tooltip
            placement="bottom"
            trigger="click"
            title="Password must be at least 5 characters long"
          >
            <Input.Password
              className="input"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </Tooltip>
          <Button
            className="solid-btn login-btn"
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
          >
            Register
          </Button>
          <p>
            Already have an account?{" "}
            <Link className="link-to-login" to="/login">
              Login here
            </Link>
          </p>
          {errors.map(function (error, index) {
            return (
              <Alert
                className="error"
                description="Something went wrong. Please try again."
                type="error"
                showIcon
                key={`${error}${index}`}
              />
            );
          })}
        </div>
      </Form>
    </div>
  );
}

export default Register;
