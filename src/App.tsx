import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/layout';
import { theme } from './utils/CustomTheme';
import './app.css';
import Main from './components/main';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Main />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
