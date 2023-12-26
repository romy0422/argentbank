import { useState, useEffect } from 'react';
import './SignInForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../app/redux/login/actionLogin';
import { useNavigate } from 'react-router';

// retourne le formulaire de connection
export default function SignInForm() {
  // constante pour l'icone
  const iconUser = <svg xmlns="http://www.w3.org/2000/svg" height="50" width="50" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8 .4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z" /></svg>

  const dispatch = useDispatch();
  let navigate = useNavigate();
  // enregistre dans une state les valeur des champs rempli par l'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { error, token } = useSelector((state) => state.userLogin);

  // pour dispatcher l'action login avec les informations de l'utilisateur + son choix pour la persistance de sa session
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, rememberMe));
  };

  // controle l'acces du dashbord en vérifiant la présence du token
  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return (
    <section className="sign-in-content">
      {iconUser}      <h1>Sign In</h1>
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
          <div className="error-display">
            <br />
            {error}
          </div>
        )}
      </form>
    </section>
  )
}
