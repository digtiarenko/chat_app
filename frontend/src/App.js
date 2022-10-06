import './index.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { ChatPage } from './pages/ChatPage/ChatPage';

// import { Button } from '@chakra-ui/react';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        {/* Hello
      <Button colorScheme="blue">Button</Button> */}
      </Routes>
    </div>
  );
}

export default App;
