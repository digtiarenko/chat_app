import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { useToast } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/layout';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

export const Login = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post('/api/user/login/', {
        email,
        password,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <form>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              autoComplete="current-password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              name="email"
              autoComplete="username email"
              style={{ display: 'none' }}
            />

            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  setShow(!show);
                }}
              >
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </FormControl>
      <Button
        colorScheme="gray"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail('testuser@gmail.com');
          setPassword('123456');
        }}
      >
        Press to get Guest User Credentials then press Login
      </Button>
    </VStack>
  );
};
