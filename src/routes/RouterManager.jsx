import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import { RoutesPath } from './routespath';

export const RouterManager = () => {
  const publicRoutes = useMemo(() =>
    Object.keys(RoutesPath).map((path) => {
      const RouteComponent = RoutesPath[path];
      if (!RouteComponent) {
        console.warn(`Componente indefinido para a rota: ${path}`);
        return null;
      }
      return (
        <Route
          key={path}
          path={path}
          element={<RouteComponent />}
        />
      );
    }), []
  );

  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
      </Routes>
    </BrowserRouter>
  );
};
