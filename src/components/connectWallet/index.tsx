import { Flex, Heading, Text } from '@chakra-ui/react';
import WalletsModal from '../walletModal';

const ConnectWallet = () => {
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

      <WalletsModal />
    </Flex>
  );
};

export default ConnectWallet;
