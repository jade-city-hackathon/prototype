import { Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useWalletConnect } from '../../store/walletConnection';

const ConnectWallet = () => {
  const { setIsConnected } = useWalletConnect((state) => state);
  const connectWallet = () => {
    // open loader
    setTimeout(() => {
      setIsConnected(true);
    }, 3000);
  };
  return (
    <Flex
      h="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      rowGap="12px"
    >
      <Heading variant="h1" opacity="0.87">
        First, connect your wallet.
      </Heading>
      <Text variant="subTitle">
        Connect to complete tasks and upgrade your citizen
      </Text>
      <Button variant="main" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </Flex>
  );
};

export default ConnectWallet;
