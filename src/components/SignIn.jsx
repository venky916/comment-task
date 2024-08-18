import CommentContext from '../context/CommentContext';
import { signInWithGooglePopup, auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import gLogo from '../assets/Ellipse 3.png'

import { useContext } from 'react';

const SignIn = () => {
  const { user, setUser } = useContext(CommentContext);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    const { user } = response;
    setUser(user);
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log('singiningout');
      setUser(null)
    });
  };

  return (
    <div className='m-2'>
      {!user ? (
        <div className='flex justify-end gap-2'>
          <img src={gLogo} alt="googlelogo" />
          <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
      ) : (
        <div className="flex justify-between">
          <h1>{user.displayName}</h1>
          <button onClick={handleSignOut}>LogOut</button>
        </div>
      )}
    </div>
  );
};
export default SignIn;
