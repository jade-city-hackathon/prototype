import { Flex, Image, Text } from '@chakra-ui/react';
import walletIcon from '../../assets/walletIcon.svg';

const Wallet = () => {
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
        0X6340fed....63
      </Text>
    </Flex>
  );
};

export default Wallet;
