import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from './Screens/LandingPage/LandingPage';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Screens/Home/Home';
import LoginScreen from './Screens/LoginScreen/LoginScreen.js';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen.js';
import EventScreen from './Screens/EventScreen/EventScreen.js';
const App = () => (
  <BrowserRouter>
    <Header />
    <main >
    <Routes>
      <Route  path="/" element={<LandingPage/>} exact/>
      <Route  path="/login" element={<LoginScreen/>}/>
      <Route  path="/register" element={<RegisterScreen/>}/>
      <Route  path="/home" element={<Home />}/>
      <Route  path="/events" element={<EventScreen />}/>
    </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
