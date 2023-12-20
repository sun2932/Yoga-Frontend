import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  VStack,
} from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [pass1, setPass1] = useState();
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState();
  const [slot, setSlot] = useState();
  const [isValid, setIsValid] = useState(true);
  const [ageValid, setAgeValid] = useState(true);

  const updatename = (e) => {
    setName(e.target.value);
  };
  const updatemail = (e) => {
    const inputValue = e.target.value;
    setEmail(e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(inputValue));
  };

  const updatepass = (e) => {
    setPassword(e.target.value);
  };

  const updatepass1 = (e) => {
    setPass1(e.target.value);
  };

  const updateage = (e) => {
    setAge(e.target.value);
    const age1 = e.target.value;
    if (age1 < 18 || age1 > 55) {
      setAgeValid(false);
    } else {
      setAgeValid(true);
    }
  };
  const updatemobile = (e) => {
    setMobile(e.target.value);
  };
  const updateslot = (e) => {
    setSlot(e.target.value);
  };

  const upevent = () => {
    setShow(!show);
  };
  const upevent1 = () => {
    setShow1(!show1);
  };

  const submit = async () => {
    if (
      !name ||
      !age ||
      !mobile ||
      !email ||
      !slot ||
      !password ||
      !isValid ||
      !ageValid
    ) {
      alert("Please enter all field");
      return;
    }

    if (pass1 !== password) {
      alert("Password Does not Match");
      return;
    }

    if (mobile.length !== 10) {
      alert("Please enter valid phone no. ");
      return;
    }
    try {
      const payment = true;
      let num=1;
      await axios
        .post("http://localhost:5000/post", {
          name,
          age,
          email,
          mobile,
          slot,
          password,
          payment,
        })
        .then((res) => {
          alert(res.data.message);
          if(res.data.userdata){
            num=2;
          }
        });
      if (num===1) {
        await axios.post("http://localhost:5000/payment").then((res1) => {
          alert(res1.data.message);
          setAge("");
          setEmail("");
          setMobile("");
          setName("");
          setPass1("");
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
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={updatename}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Age</FormLabel>
        <Input
          placeholder="Enter your Age"
          value={age}
          type="number"
          onChange={updateage}
        />
        {!ageValid && <p style={{ color: "red" }}>Age must be 18-55</p>}
      </FormControl>

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
        <FormLabel>Mobile No.</FormLabel>
        <Input
          placeholder="Enter your Mobile no."
          value={mobile}
          onChange={updatemobile}
        />
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
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show1 ? "text" : "password"}
            placeholder="Enter Password again"
            onChange={updatepass1}
            value={pass1}
          />
          <InputRightElement w={"4.5rem"}>
            <Button h={"1.75rem"} size="sm" onClick={upevent1}>
              {show1 ? "hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="green"
        width={"100%"}
        marginTop={"15px"}
        onClick={submit}
      >
        Register & Make Payment
      </Button>
    </VStack>
  );
};

export default Signup;
