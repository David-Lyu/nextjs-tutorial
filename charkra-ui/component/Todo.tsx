import { HStack, Button, Text, VStack } from '@chakra-ui/react';

export default function Todo(props) {
  const todos = [
    { id: 1, body: 'get bread' },
    { id: 2, body: 'get ducks' }
  ];
  return (
    <VStack>
      {todos.map((todo) => {
        return (
          <HStack key={todo.id}>
            <Text>{todo.body}</Text>
            <Button aria-label="trash" label="trash" />
          </HStack>
        );
      })}
      <div>Inside Todo</div>
    </VStack>
  );
}
