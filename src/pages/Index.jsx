import React from "react";
import { Box, Flex, Heading, Text, VStack, Spacer, Link } from "@chakra-ui/react";
import { FaHome, FaExchangeAlt } from "react-icons/fa";

const Index = () => {
  return (
    <Flex direction="column" minHeight="100vh">
      {/* Header */}
      <Box bg="blue.500" py={4} px={8}>
        <Heading as="h1" size="xl" color="white">
          My Budget App
        </Heading>
      </Box>

      <Flex flex={1}>
        {/* Sidebar Navigation */}
        <Box bg="gray.100" w="200px" p={4}>
          <VStack align="stretch" spacing={4}>
            <Link href="/" display="flex" alignItems="center">
              <FaHome />
              <Text ml={2}>Home</Text>
            </Link>
            <Link href="/transactions" display="flex" alignItems="center">
              <FaExchangeAlt />
              <Text ml={2}>Transactions</Text>
            </Link>
          </VStack>
        </Box>

        {/* Main Content */}
        <Box flex={1} p={8}>
          <Heading as="h2" size="lg" mb={4}>
            Welcome to My Budget App
          </Heading>
          <Text>My Budget App is a simple and intuitive application that helps you manage your finances effectively. Keep track of your income and expenses, set budgets, and gain insights into your spending habits. Start taking control of your money today!</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Index;
