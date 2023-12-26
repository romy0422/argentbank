import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../app/redux/user/actionUser';
import './UserHeader.css'
export default function UserHeader() {
  const dispatch = useDispatch();
  // récupère les information de l'utilisateur et le token
  const { firstName, lastName, token } = useSelector(state => ({
    ...state.userProfile,
    ...state.userLogin
  }));
  const { error } = useSelector(state=> state.userProfile)
  // stock dans des etats provisoire les mise à jour des informations de l'utilisateur
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  // stock la visibilité du mode édition
  const [isEditing, setIsEditing] = useState(false);

  // contrôle la fréquence de la mise à jour des données temporaires de l'utilisateurs
  useEffect(() => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
  }, [firstName, lastName]);
  
// toggle pour le mode edition
  const toggleEdit = () => setIsEditing(!isEditing);

  // déclenche l'appel d'api pour l'update profil avec les nouvelles valeurs
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(token, newFirstName, newLastName));
    toggleEdit();
  };
  

  return (
    <div className="header">
      {!isEditing ? (
        <>
          <h1 className="h1-welcome">Welcome back<br />{`${firstName} ${lastName}`} !</h1>
          <button onClick={toggleEdit} className="edit-button">Edit Name</button>
        </>
      ) : (
        <form className="editNameContent" onSubmit={submitHandler}>
          <h1>Welcome back</h1>
          <div className="editNameInputs">
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              required
            />
          </div>
          <div className="editNameButtons">
            <button type="submit" className="edit-button">Save</button>
            <button type="button" onClick={toggleEdit} className="edit-button">Cancel</button>
          </div>
        </form>
      )}
     { error!== null &&<p className="error-display"> Failed Update: {error}</p> }

    </div>
  );
}
