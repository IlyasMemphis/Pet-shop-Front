// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Cart'; 
import Header from './loyouts/Header/Header';
import Footer from './loyouts/Footer/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryPage from './pages/CategoryPage'; 
import Item from './pages/Item';
import Cart from './pages/CartPage';
import Error404 from './pages/Error';
import AllProducts from "./pages/AllProducts";
import DiscountedItems from './pages/DiscountedItems';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div style={{ margin: '0 auto', maxWidth: '1440px' }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/item/:id" element={<Item />} />
            <Route path='/discounted' element={<DiscountedItems />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
 