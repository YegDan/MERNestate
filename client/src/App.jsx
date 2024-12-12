import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './assets/pages/Home';
import About from './assets/pages/About';
import SignIn from './assets/pages/SignIn';
import SignUp from './assets/pages/SignUp';
import Profile from './assets/pages/profile';
import Header from './assets/components/Header';
import PrivateRoute from './assets/components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

