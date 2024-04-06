import { Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import { useWalletConnect } from '../../store/walletConnection';
import { useState } from 'react';

const ConnectWallet = () => {
  const { setIsConnected } = useWalletConnect((state) => state);

  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsConnected(true);
      setIsLoading(false);
    }, 1500);
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

      <Button
        variant="main"
        onClick={connectWallet}
        w="172"
        disabled={isLoading}
      >
        Connect Wallet
        {isLoading && (
          <Spinner
            ml="10px"
            thickness="2px"
            speed="0.65s"
            emptyColor="#101e1b"
            color="#fff"
            size="sm"
          />
        )}
      </Button>
    </Flex>
  );
};

export default ConnectWallet;
