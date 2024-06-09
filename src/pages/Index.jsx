import React, { useState } from "react";
import { Container, VStack, Input, Button, Textarea, Text, useClipboard, IconButton } from "@chakra-ui/react";
import { FaCopy } from "react-icons/fa";

const Index = () => {
  const [inputValues, setInputValues] = useState("");
  const [sqlInClause, setSqlInClause] = useState("");
  const { hasCopied, onCopy } = useClipboard(sqlInClause);

  const handleGenerate = () => {
    const valuesArray = inputValues.split(/\s+/).filter(Boolean);
    const formattedValues = valuesArray.map((value) => `'${value}'`).join(",");
    setSqlInClause(`(${formattedValues})`);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">SQL IN Clause Generator</Text>
        <Textarea placeholder="Enter values separated by spaces or new lines" value={inputValues} onChange={(e) => setInputValues(e.target.value)} size="md" />
        <Button colorScheme="teal" onClick={handleGenerate}>
          Generate IN Clause
        </Button>
        {sqlInClause && (
          <VStack spacing={2} width="100%">
            <Textarea value={sqlInClause} isReadOnly size="md" />
            <IconButton aria-label="Copy to clipboard" icon={<FaCopy />} onClick={onCopy} colorScheme={hasCopied ? "green" : "teal"} />
            {hasCopied && <Text color="green.500">Copied to clipboard!</Text>}
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
