import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [slot, setSlot] = useState();

  const updatemail = (e) => {
    const inputValue = e.target.value;
    setEmail(e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(inputValue));
  };

  const updatepass = (e) => {
    setPassword(e.target.value);
  };

  const updateslot = (e) => {
    setSlot(e.target.value);
  };

  const upevent = () => {
    setShow(!show);
  };

  const submit = async () => {
    if (!email || !slot || !password || !isValid) {
      alert("Please enter all field");
      return;
    }

    try {
      let num = 1;
      await axios
        .put("http://localhost:5000/post", {
          email,
          slot,
          password,
        })
        .then((res) => {
          alert(res.data.message);
          if (res.data.userdata) {
            num = 2;
          }
        });

      if (num === 2) {
        await axios.post("http://localhost:5000/payment").then((res1) => {
          alert(res1.data.message);
          setEmail("");
          setPassword("");
          setSlot("");
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack spacing={1}>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your Email"
          type="email"
          value={email}
          onChange={updatemail}
        />
        {!isValid && (
          <p style={{ color: "red" }}>Please enter a valid email address.</p>
        )}
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={updatepass}
            value={password}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={upevent}>
              {show ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Select Slot.</FormLabel>
        <Select placeholder="Select Slot." value={slot} onChange={updateslot}>
          <option value="6-7 AM">6-7 AM</option>
          <option value="7-8 AM">7-8 AM</option>
          <option value="8-9 AM">8-9 AM</option>
          <option value="5-6 PM">5-6 PM</option>
        </Select>
      </FormControl>

      <Button
        colorScheme="green"
        width={"100%"}
        marginTop={"15px"}
        onClick={submit}
      >
        Update Plan & Make Payment
      </Button>
    </VStack>
  );
};

export default Login;
