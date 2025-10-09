import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import About from './pages/About';
import Navbar from './components/Navbar';
import Organization from './pages/Organization';
import CareHomeDetail from './pages/CareHomeDetail';
import PaymentPage from './pages/Payment';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="min-h-screen pt-24">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/carehome/:id" element={<CareHomeDetail />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/*" element={<h1 className="text-4xl font-bold  bg-red-500 text-center mt-20">404 - Page Not Found</h1>} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
