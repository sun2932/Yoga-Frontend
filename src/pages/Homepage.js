import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import Signup from "./Signup";


const Homepage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={2}
        // bg={"white"}

        w={"100%"}
        // borderRadius="lg"
        // borderWidth="1px"
      >
        <Text fontSize="3xl" marginLeft="200px">
          Yoga Health
        </Text>
      </Box>
      <Box
        p={1}
        bg={"white"}
        w={"100%"}
        marginTop="10px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb={"-0.5em"}>
            <Tab width={"50%"}>Register</Tab>
            <Tab width={"50%"}>Change Plan</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Signup />
             
            </TabPanel>
            <TabPanel>
              <Login />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
