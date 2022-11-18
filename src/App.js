import './App.css';
import Ingresar from './componentes/Ingresar';
import Opciones from './componentes/Opciones';
import MenuAlmuerzo from './componentes/MenuAlmuerzo';
import MenuDesayuno from './componentes/MenuDesayuno';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ingresar, menuAlmuerzo, menuDesayuno, opciones } from './Rutas/rutas';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ingresar} element={<Ingresar />} />
          <Route path={opciones} element={<Opciones />} />
          <Route path={menuAlmuerzo} element={<MenuAlmuerzo />} />
          <Route path={menuDesayuno} element={<MenuDesayuno />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
