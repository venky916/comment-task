import './App.css';
import SignIn from './components/SignIn';
import CommentContainer from './components/CommentContainer';
import { CommentProvider } from './context/CommentContext';


function App() {
  return (
    <CommentProvider>
      <div className='w-[50%] mx-auto my-5 border rounded-lg font-inter'>
        <SignIn />
        <CommentContainer />
      </div>
    </CommentProvider>
  );
}

export default App;
