import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/layout';
import { theme } from './utils/CustomTheme';
import './app.css';
import Main from './components/main';
import Provider from './utils/provider';

const App = () => {
  return (
    <Provider>
      <ChakraProvider theme={theme}>
        <Layout>
          <Main />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
