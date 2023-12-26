import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../app/redux/user/actionUser';
import './UserHeader.css'
export default function UserHeader() {
  const dispatch = useDispatch();
  const { firstName, lastName, token } = useSelector(state => ({
    ...state.userProfile,
    ...state.userLogin
  }));

  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNewFirstName(firstName);
    setNewLastName(lastName);
  }, [firstName, lastName]);
  

  const toggleEdit = () => setIsEditing(!isEditing);

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
    </div>
  );
}
