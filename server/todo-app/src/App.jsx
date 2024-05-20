import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/navbar';
import Animatedroutes from './components/routes';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }else{
      console.log("lol");
    }
    
  }, [])
  
  return (
    <main>
        <Router>
          <Navbar/>
          <Animatedroutes/>
        </Router>
    </main>
  )
}

export default App;
