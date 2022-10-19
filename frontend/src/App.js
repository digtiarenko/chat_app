import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { ChatPage } from './pages/ChatPage/ChatPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/auth" element={<AuthPage />}></Route>
        <Route path="/" element={<ChatPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
