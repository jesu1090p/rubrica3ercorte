/*import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthModule';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;*/

import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element: Element, rol, ...rest }) => {
   const { isAuthenticated, userRol } = useAuth();

   if (!isAuthenticated) {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      return <Navigate to="/login" />;
   }

   // eslint-disable-next-line react/prop-types
   if (rol && !rol.includes(userRol)) {
      // Redirigir a la página principal si el usuario no tiene el rol adecuado
      return <Navigate to="/" />;
   }

   return <Route {...rest} element={isAuthenticated ? <Element /> : <Navigate to="/login" />} />;
};

export default PrivateRoute;