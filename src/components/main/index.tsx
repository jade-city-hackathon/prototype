import { useWalletConnect } from '../../store/walletConnection';
import { Box } from '@chakra-ui/react';
import ConnectWallet from '../connectWallet';
import Miner from '../miner';

const Main = () => {
  const { isConnected } = useWalletConnect((state) => state);
  return (
    <Box
      minH="calc(100vh - 360px)"
      as="main"
      p="50px"
      bgGradient="linear(to-tr,#0b1310 0%, #1f382f 100%)"
    >
      {!isConnected ? <ConnectWallet /> : <Miner />}
    </Box>
  );
};

export default Main;
