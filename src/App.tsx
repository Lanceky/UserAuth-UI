import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm'; // Assuming you have this component

const App = () => {
  return (
    // Wrap everything in BrowserRouter for routing to work
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
