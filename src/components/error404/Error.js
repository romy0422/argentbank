import { Link } from 'react-router-dom';
import './error.css'
// retourne le composant pour l'erreur 404
function Error(){
  return (
    <div className="error-container">
      <h1 className="error-title">Error 404</h1>
      <p className="error-text"> Page Not Found!</p>
      <Link to="/" className="link-home">Back to the home</Link>
    </div>
  );
};

export default Error;