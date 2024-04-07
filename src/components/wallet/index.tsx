import { Flex, Image, Text } from '@chakra-ui/react';
import walletIcon from '../../assets/walletIcon.svg';
import { getShortAddress } from '../../utils';
import { useWallet } from '@solana/wallet-adapter-react';

const Wallet = () => {
  const { publicKey } = useWallet();
  return (
    <Flex
      bgGradient="linear(to-r,#213b31 0%, #28483c 100%)"
      p="6px 12px"
      borderRadius="24px"
      columnGap="8px"
      cursor="pointer"
    >
      <Image w="18px" src={walletIcon} alt="walletIcon" />
      <Text fontWeight="400" fontSize="14px" lineHeight="114%" color="#96bfae">
        {publicKey && getShortAddress(publicKey.toBase58())}
      </Text>
    </Flex>
  );
};

export default Wallet;
