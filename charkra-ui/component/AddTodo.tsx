import { Button, HStack, Input } from '@chakra-ui/react';

export default function AddTodo(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = (e) => {
    console.log(e.currentTarget);
  };
  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input />
        <Button onClick={addTodo}>Add Todo</Button>
      </HStack>
    </form>
  );
}
