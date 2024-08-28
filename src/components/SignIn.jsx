import CommentContext from '../context/CommentContext';
import { signInWithGooglePopup, auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import gLogo from '../assets/Ellipse 3.png';

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
      setUser(null);
    });
  };

  return (
    <div className="m-2">
      {!user ? (
        <div className="flex justify-end gap-2">
          <img src={gLogo} alt="googlelogo" />
          <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
      ) : (
        <div className="flex justify-between my-2 p-2">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full h-11 w-11 "
              src={user.photoURL}
              alt="user_pic"
            />
            <h1 className="text-[#212121] ">{user.displayName}</h1>
          </div>

          <button onClick={handleSignOut} className='font-bold'>Logout</button>
        </div>
      )}
    </div>
  );
};
export default SignIn;
