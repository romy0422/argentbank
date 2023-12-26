import { useState, useEffect } from 'react';
import './SignInForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../app/redux/login/actionLogin';
import { useNavigate } from 'react-router';

export default function SignInForm() {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const { error, token } = useSelector((state) => state.userLogin);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, rememberMe));
  };

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="sign-in-button" type="submit" name="Login">
          Sign In
        </button>
        {error && (
          <div>
            <br />
            {error}
          </div>
        )}
      </form>
    </section>
  )
}
