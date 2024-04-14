import React, { useState } from "react";
import { Box, Flex, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, FormControl, FormLabel, Input, Select, RadioGroup, Radio, Button } from "@chakra-ui/react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-04-01", amount: 1000, type: "income", category: "Salary" },
    { id: 2, date: "2024-04-05", amount: 50, type: "expense", category: "Groceries" },
    { id: 3, date: "2024-04-10", amount: 200, type: "expense", category: "Bills" },
    { id: 4, date: "2024-04-15", amount: 75, type: "expense", category: "Entertainment" },
    { id: 5, date: "2024-04-20", amount: 500, type: "income", category: "Freelance" },
  ]);

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    type: "expense",
    category: "",
  });

  const [editingTransactionId, setEditingTransactionId] = useState(null);

  const calculateBalance = () => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);

    return totalIncome - totalExpenses;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTransaction = () => {
    if (editingTransactionId) {
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === editingTransactionId ? { ...transaction, ...formData } : transaction
        )
      );
      setEditingTransactionId(null);
    } else {
      const newTransaction = {
        id: transactions.length + 1,
        ...formData,
        amount: parseFloat(formData.amount),
      };
      setTransactions([...transactions, newTransaction]);
    }
    setFormData({ date: "", amount: "", type: "expense", category: "" });
  };

  const handleEditTransaction = (transaction) => {
    setFormData(transaction);
    setEditingTransactionId(transaction.id);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={4}>
        Transactions
      </Heading>
      <Text fontSize="xl" mb={8}>
        Current Balance: ${calculateBalance()}
      </Text>

      <Box mb={8}>
        <Heading as="h3" size="md" mb={4}>
          Add Transaction
        </Heading>
        <FormControl id="date" mb={4}>
          <FormLabel>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="amount" mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="type" mb={4}>
          <FormLabel>Type</FormLabel>
          <RadioGroup
            name="type"
            value={formData.type}
            onChange={(value) => setFormData({ ...formData, type: value })}
          >
            <Radio value="income" mr={4}>
              Income
            </Radio>
            <Radio value="expense">Expense</Radio>
          </RadioGroup>
        </FormControl>
        <FormControl id="category" mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="Groceries">Groceries</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" onClick={handleAddTransaction}>
          {editingTransactionId ? "Update Transaction" : "Add Transaction"}
        </Button>
      </Box>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Type</Th>
            <Th>Category</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.date}</Td>
              <Td>{transaction.amount}</Td>
              <Td>{transaction.type}</Td>
              <Td>{transaction.category}</Td>
              <Td>
                <Button
                  size="sm"
                  colorScheme="blue"
                  mr={2}
                  onClick={() => handleEditTransaction(transaction)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Transactions;