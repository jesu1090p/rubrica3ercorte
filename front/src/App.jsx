import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SalesManagement from './components/SalesManagement/SalesManagement';
import ProductsManagement from './components/ProductManagement/ProductManagement';
import Home from './components/Home';
import Login from './components/Login';
import Registro from './components/Registro';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sales" element={<SalesManagement />} />
          <Route path="/products" element={<ProductsManagement />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
