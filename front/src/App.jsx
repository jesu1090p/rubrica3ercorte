import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import Products from './components/Products'
import Sales from './components/Sales'
import Login from './components/Login';
import Registro from './components/Registro';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout'/>
        <Route path='/register' element={<Registro />} />
      </Routes>
    </Router>
    <Footer/>
    <ToastContainer />
    </>
  );
}

export default App;

