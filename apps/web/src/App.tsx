import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/Login';
import RegisterPage from './pages/Users/Register';
import { route } from './routes';
import UserPage from './pages/Users/Index';
import AddProductPage from './pages/Product/AddProductPage';
import HomePage from './pages/Product/HomePage';
import CartPage from './pages/Product/CartPage';
import InvoicesPage from './pages/Product/InvoicesPage';

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

        <Route path={route.home} element={<HomePage />} >
          <Route path={route.cart} element={<CartPage />} />
          <Route path={route.invoices} element={<InvoicesPage />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
