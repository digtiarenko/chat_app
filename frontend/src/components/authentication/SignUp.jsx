import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { VStack } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

axios.defaults.baseURL = process.env.REACT_APP_BASE_API_URL;

export const SignUp = () => {
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
        pic,
      };

      const { data } = await axios.post('api/user/register/', newUser);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = async pics => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const date = new Date().getTime();
      const storageRef = ref(storage, `${date}`);
      await uploadBytesResumable(storageRef, pics).then(() => {
        getDownloadURL(storageRef).then(downloadURL => {
          setPic(downloadURL);
          setPicLoading(false);
        });
      });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={e => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
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
              autoComplete="current-password"
              type={show ? 'text' : 'password'}
              placeholder="Enter Password"
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>{' '}
          <input
            type="text"
            name="email"
            autoComplete="username email"
            style={{ display: 'none' }}
          />
        </form>
      </FormControl>
      <FormControl isRequired>
        {' '}
        <form>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              autoComplete="current-password"
              type={show ? 'text' : 'password'}
              placeholder="Confirm password"
              onChange={e => setConfirmpassword(e.target.value)}
            />
            <input
              type="text"
              name="email"
              autoComplete="username email"
              style={{ display: 'none' }}
            />

            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </form>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={e => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="gray"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
