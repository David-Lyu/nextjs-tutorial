import Head from 'next/head';
import Image from 'next/image';

import { Heading, VStack } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';

import Todo from '../component/Todo';
import AddTodo from '../component/AddTodo';
import DarkModeSwitch from '../component/ChakraColorMode/DarkModeSwitch';

export default function Home() {
  return (
    <>
      <VStack p={4}>
        <DarkModeSwitch alignSelf="flex-end"></DarkModeSwitch>
        <Heading>Todo App</Heading>
        <Todo />
        <AddTodo />
      </VStack>
    </>
  );
}
