import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import AuthOnlyRoute from './components/Common/AuthOnlyRoute';
import { authTokenContext } from './context/authTokens';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import HomePage from './pages/HomePage';
import InvoiceListPage from './pages/Invoice/InvoiceListPage';
import AddProductPage from './pages/Product/AddProductPage';
import ListProductsPage from './pages/Product/ListProductsPage';
import ProductDetail from './pages/Product/ProductDetail';
import LoginPage from './pages/Users/Login';
import RegisterPage from './pages/Users/Register';
import UserPage from './pages/Users/Index';
import { route } from './routes';
import { EmptyCart, getCartService } from './services/cart/getCartItems';
import { UnauthorizedError } from './services/errors';
import { getUserInfoService } from './services/user/getInfo';
import { useGetProductsQuery } from './store/slices/productApi';
import { productQuerySelector } from './store/slices/productQuery';
import { updateCart } from './store/slices/cartItems';
import { updateUserName } from './store/slices/userSlice';

export function App() {

  const dispatch = useDispatch();
  const { queryString } = useSelector(productQuerySelector);
  useGetProductsQuery(queryString);

  const navigate = useNavigate();

  const { accessToken, refreshToken } = useContext(authTokenContext);




  useEffect(() => {

    const call = async () => {
      // get user's cart data
      getCartService()
        .then(result => {
          // if user has no items in cart
          if (result instanceof EmptyCart) {
            return dispatch(updateCart(0))
          }

          dispatch(updateCart(Number(result.total_items)))
        })
        .catch(err => {
          if (err instanceof UnauthorizedError) {
            navigate(route.users.login)
            // please login again toast
            return
          }

          // couldn't get cart items. please try again later toast
        })



      getUserInfoService()
        .then(name => {
          dispatch(updateUserName(name))
        })
        .catch(err => {
          if (err instanceof UnauthorizedError) {
            navigate(route.users.login)
            // please login again toast
            return
          }

          // couldn't user name. please try again later toast
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
          <Route path={route.invoices.index} element={<AuthOnlyRoute> <InvoiceListPage /> </AuthOnlyRoute>} />
          <Route path={route.invoices.id(":id")} element={<AuthOnlyRoute>  </AuthOnlyRoute>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
