import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/Login';
import RegisterPage from './pages/Users/Register';
import { route } from './routes';
import UserPage from './pages/Users/Index';
import AddProductPage from './pages/Product/AddProductPage';

export function App() {
  return (
    <>
      <Routes>
        <Route path={route.users.index} element={<UserPage />} >
          <Route path={route.users.login} element={<LoginPage />} />
          <Route path={route.users.register} element={<RegisterPage />} />
        </Route>

        <Route path={route.products.index}>
          <Route path={route.products.addNew} element={<AddProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
