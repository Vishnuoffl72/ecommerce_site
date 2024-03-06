import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail1 from './components/product/ProductDetail1'

function App() {
  return (
    <Router>
      <div className="App">
        <HelmetProvider>
          <Header />
            <div class="container container-fluid">

            <ToastContainer/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail1/> } />
            </Routes>
            </div>

          <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
