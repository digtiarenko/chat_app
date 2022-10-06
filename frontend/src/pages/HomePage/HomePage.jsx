import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { Login } from '../../components/authentication/Login';
import { SignUp } from '../../components/authentication/SignUp';

export const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        backgroundColor={'rgba(182, 176, 182, 0.5)'}
        borderRadius="15px"
      >
        <Text
          fontSize="4xl"
          fontFamily="Work sans"
          fontWeight="600"
          textAlign="center"
        >
          CHAT
        </Text>
      </Box>
      <Box
        backgroundColor={'rgba(182, 176, 182, 0.5)'}
        w="100%"
        p={4}
        borderRadius="15px"
      >
        <Tabs isFitted variant="solid-rounded" colorScheme="gray">
          <TabList mb="1em">
            <Tab color="white" bg="rgba(234, 229, 234, 0.3)">
              Login
            </Tab>
            <Tab color="white" bg="rgba(234, 229, 234, 0.3)">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
