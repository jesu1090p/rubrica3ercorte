import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
 
  return (
    <main>
    <div className="py-4">  
      <div className="p-5 mb-4 gradient-background rounded-3">
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Bienvenido a la Gestión de Productos y Ventas</h1>
          <p className="col-md-8 fs-4">Este es un espacio dedicado para el manejo de productos y ventas en GestionARTE.
          Puedes comenzar explorando las diferentes secciones y funcionalidades.</p>
        </div>
      </div>
  
      <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="gradient-background-1 p-5 rounded-3">
              <h2>Administrar Productos</h2>
              <p>Accede a la sección de administración de productos para agregar, editar o eliminar productos de la plataforma.</p>
              <Link to="/products" className="btn btn-outline-success" type="button">Ir a Productos</Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="gradient-background-2 p-5 border rounded-3">
              <h2>Administrar Ventas</h2>
              <p>Explora la sección de administración de ventas para gestionar y realizar un seguimiento de las transacciones realizadas.</p>
              <Link to="/sales" className="btn btn-outline-success" type="button"><span className='text-light'>Ir a Ventas</span></Link>
            </div>
          </div>
        </div>
  
      
    </div>
  </main>
    )
};

export default Home;