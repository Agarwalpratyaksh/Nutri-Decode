import Navbar from './navbar.jsx';
import { Routes, Route } from 'react-router-dom';
import Home from './home.jsx';
import Contact from './contact.jsx';
import Explore from './explore.jsx';
import Compare from './compare.jsx';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Profile from './profile.jsx';
import Info from './info.jsx';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<Explore />}/>
        <Route path="/compare" element={<Compare />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/product/:name" element={<Info />}/>
      </Routes>
    </div>
  );
}

export default App;