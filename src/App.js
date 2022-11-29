import './App.css';
import Ingresar from './componentes/Ingresar';
import Opciones from './componentes/OpcionesMenu';
import MenuAlmuerzo from './componentes/MenuAlmuerzo';
import MenuDesayuno from './componentes/MenuDesayuno';
import PedidosEnCocina from './componentes/PedidosEnCocina';
import OpcionesAdmin from './componentes/OpcionesAdmin';
import AdminProductos from './componentes/AdminProductos';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminUsuarios from './componentes/AdminUsuarios';
import PedidosAEntregar from './componentes/PedidosAEntregar';
import { cocina, ingresar, menuAlmuerzo, menuDesayuno, opcionesMenu, opcionesAdmin, adminProductos, adminUsuarios, pedidosAEntregar } from './Rutas/rutas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ingresar} element={<Ingresar />} />
          <Route path={opcionesMenu} element={<Opciones />} />
          <Route path={pedidosAEntregar} element={<PedidosAEntregar />} />
          <Route path={menuAlmuerzo} element={<MenuAlmuerzo />} />
          <Route path={menuDesayuno} element={<MenuDesayuno />} />
          <Route path={cocina} element={<PedidosEnCocina />} />
          <Route path={opcionesAdmin} element={<OpcionesAdmin />} />
          <Route path={adminProductos} element={<AdminProductos />} />
          <Route path={adminUsuarios} element={<AdminUsuarios />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
