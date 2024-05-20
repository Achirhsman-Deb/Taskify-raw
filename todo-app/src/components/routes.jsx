import { Home, About, Todo1 } from '../pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import Signup from '../pages/signup';
import Login from '../pages/login';

const Animatedroutes = () => {
    const location = useLocation();
    return (
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Login' element={<Login/>}/>
            <Route path='/TodoMain' element={<Todo1/>}/>
        </Routes>
    )
}

export default Animatedroutes