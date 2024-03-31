import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Users/Login';
import RegisterPage from './pages/Users/Register';
import { route } from './routes';
import UserPage from './pages/Users/Index';
import AddProductPage from './pages/Product/AddProductPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/Cart/CartPage';
import InvoicesPage from './pages/Invoice/InvoicesPage';
import ListProductsPage from './pages/Product/ListProductsPage';

export function App() {
  return (
    <>
      <Routes>
        {/* user's page */}
        <Route path={route.users.index} element={<UserPage />} >
          <Route path={route.users.login} element={<LoginPage />} />
          <Route path={route.users.register} element={<RegisterPage />} />
        </Route>


        {/* adding new products to db */}
        <Route path={route.products.index}>
          <Route path={route.products.addNew} element={<AddProductPage />} />
        </Route>


        {/* other pages */}
        <Route path={route.home} element={<HomePage />} >
          <Route index element={<ListProductsPage />} />
          <Route path={route.cart} element={<CartPage />} />
          <Route path={route.invoices} element={<InvoicesPage />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
