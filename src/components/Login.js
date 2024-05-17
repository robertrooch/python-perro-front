import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { useMutation, gql } from '@apollo/client';
import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(
      email: $email,
      username: $username,
      password: $password
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;


const Login = () => {
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        login: true,
        email: '',
        username: '',
        password: ''  
    });

    const [login] = useMutation(LOGIN_MUTATION, {
        variables: {
          username: formState.username,
          password: formState.password
        },
        onCompleted: ({ tokenAuth }) => {
          localStorage.setItem(AUTH_TOKEN, tokenAuth.token);
          console.log(tokenAuth.token);
          navigate('/');
        }
      });
      
      const [signup] = useMutation(SIGNUP_MUTATION, {
        variables: {
          email: formState.email,
          username: formState.username,
          password: formState.password
        },
        onCompleted: ({ createUser }) => {
          console.log(createUser.user)
          //localStorage.setItem(AUTH_TOKEN, signup.token);
          navigate('/');
        }
      });
      

    return (
        <div>
            <h4 className="mv3">
                {formState.login ? 'Login' : 'Crear cuenta'}
            </h4>
            <div className="flex flex-column">
                {!formState.login && (
                    <input
                        value={formState.email}
                        onChange={(e) =>
                            setFormState({
                                ...formState,
                                email: e.target.value
                            })
                        }
                        type="text"
                        placeholder="Tu email"
                    />
                )}
                <input
                    value={formState.username}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            username: e.target.value
                        })
                    }
                    type="text"
                    placeholder="Tu username"
                />
                <input
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({
                            ...formState,
                            password: e.target.value
                        })
                    }
                    type="password"
                    placeholder="Elige una contraseña segura"
                />
            </div>
            <div className="flex mt3">
                <button
                    className="pointer mr2 button"
                    onClick={formState.login ? login : signup}
                >
                    {formState.login ? 'login' : 'Crear cuenta'}
                </button>
                <button
                    className="pointer button"
                    onClick={(e) =>
                        setFormState({
                            ...formState,
                            login: !formState.login
                        })
                    }
                >
                    {formState.login
                        ? '¿Necesitas crear una cuenta?'
                        : '¿Ya tienes cuenta?'}
                </button>
            </div>
        </div>
    );
};

export default Login;