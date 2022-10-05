import axios from 'axios';
import { useEffect, useState } from 'react';

export const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return chats.map(chat => <div> {chat.chatName} </div>);
};
