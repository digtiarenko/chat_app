import { Box } from '@chakra-ui/layout';
import { ChatState } from '../context/chatProvider';
import { SingleChat } from './SingeChat';

export const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems="center"
      flexDirection="column"
      p={3}
      bg="rgba(182, 176, 182, 0.3)"
      w={{ base: '100%', md: '68%' }}
      borderRadius="lg"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};
