import { Switch, useColorMode } from '@chakra-ui/react';

export default function DarkModeSwitch(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Switch onChange={toggleColorMode} alignSelf={props.alignSelf}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Switch>
    </>
  );
}
