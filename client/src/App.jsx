import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/dashboard/Profile';
import AdminLogin from './components/login/AdminLogin';
import LoginPage from './components/login/LoginPage';
import SurveyFormPage from './components/surveys/SurveyFormPage';
import SurveyListPage from './components/surveys/SurveyListPage';
import SurveyDetailPage from './components/surveys/SurveyDetailPage';
import UserSurveySystem from './components/surveys/UserSurveySystem';
import SurveyReportPage from './components/report/SurveyReportPage';
import QuotationForm from './components/quotation/QuotationForm';
import ProductPricing from './components/feature/ProductPricing';
import PaymentPage from './components/payment/PaymentPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            
            <Route path="/" element={<ProductPricing />} />
            <Route path="/login" element={<AdminLogin />} />
            <Route path="/pricing/pro" element={<PaymentPage />} />
            <Route path="/signup" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-quotations" element={<SurveyFormPage />} />
            <Route path="/quotations" element={<SurveyListPage />} />
            <Route path="/survey/:id" element={<SurveyDetailPage/>} />
            <Route path="/reports" element={<SurveyReportPage/>} />
            <Route path="/reports/:id" element={<SurveyReportPage/>} />
            <Route path="/user-survey" element={<UserSurveySystem/>} />
            <Route path="/user-survey/:id" element={<UserSurveySystem/>} />
            <Route path="/quotation" element={<QuotationForm/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
