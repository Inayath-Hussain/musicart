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
import ProductDetail from './pages/Product/ProductDetail';
import { useGetProductsQuery } from './store/slices/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { productQuerySelector } from './store/slices/productQuery';
import { useContext, useEffect } from 'react';
import { authTokenContext } from './context/authTokens';
import { getCartService } from './services/cart/getCartItems';
import { updateCart } from './store/slices/cartItems';
import { updateUserName } from './store/slices/userSlice';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import AuthOnlyRoute from './components/Common/AuthOnlyRoute';

export function App() {

  const dispatch = useDispatch();
  const { queryString } = useSelector(productQuerySelector);
  useGetProductsQuery(queryString);

  const { accessToken, refreshToken } = useContext(authTokenContext);

  useEffect(() => {

    const call = async () => {
      getCartService()
        .then(result => {
          dispatch(updateCart({ items: result.data, convenienceFee: Number(result.convenienceFee), total_amount: Number(result.totalAmount) }))
          dispatch(updateUserName(result.username))
        })
        .catch(message => {
          // error toast here
        })
    }

    // make api call only when user is authenticated
    if (accessToken || refreshToken) {
      call()
    }
  }, [accessToken, refreshToken])

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
          <Route path={route.products.detail(":id")} element={<ProductDetail />} />
          <Route path={route.cart} element={<AuthOnlyRoute> <CartPage /> </AuthOnlyRoute>} />
          <Route path={route.checkout} element={<AuthOnlyRoute> <CheckoutPage /> </AuthOnlyRoute>} />
          <Route path={route.invoices} element={<AuthOnlyRoute> <InvoicesPage /> </AuthOnlyRoute>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
