// index.jsx
import AppTS from './App';  
import ChatbotPage from './components/Chatbot';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ChatbotPage />} />
          <Route path="/app" element={<AppTS />} />  
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
