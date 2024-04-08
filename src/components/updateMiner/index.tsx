import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import UpdateTasks from '../updateTasks';
import { useMinerLevel } from '../../store/miners';
import level2Miner from '../../assets/level2.png';
import alarmIcon from '../../assets/alarm.svg';

import UpdateModal from '../updateModal';
import { useQuery } from '@tanstack/react-query';
import { getNtfData } from '../mintMiner';
import { useWallet } from '@solana/wallet-adapter-react';
import { useGetProgram } from '../../hooks/useGetProgram';

type InfoBoxType = {
  topText: string;
  bottomText: string;
};

const InfoBox = ({ topText, bottomText }: InfoBoxType) => {
  return (
    <Flex
      flexDirection="column"
      p="16px"
      borderRadius="4px"
      bgGradient="linear(to-tr, #213c32 0%,  #305649 100%)"
      opacity="0.9"
      boxShadow="0px 0px 1.5px 0px rgba(0,0,0,0.75)"
      rowGap="4px"
    >
      <Text variant="smallText" fontWeight="600" textTransform="uppercase">
        {topText}
      </Text>
      <Text variant="semiText" textTransform="uppercase">
        {bottomText}
      </Text>
    </Flex>
  );
};

const UpdateMiner = () => {
  const { metaData, minerLevel, completeTask1, completeTask2, completeTask3 } =
    useMinerLevel((state) => state);

  const isAllComplited = completeTask1 && completeTask2 && completeTask3;

  const { publicKey } = useWallet();

  const program = useGetProgram();

  const { data: ntfData, isLoading } = useQuery({
    queryKey: ['nftData', publicKey?.toBase58()],
    queryFn: () => getNtfData(publicKey?.toBase58() || ''),
    enabled: !!program && !!publicKey && !metaData,
  });

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      rowGap="25px"
      w="1030px"
      margin="0 auto"
    >
      <Grid
        overflow="hidden"
        transition="all .3s"
        h={isAllComplited ? '60px' : '0'}
        bg="#49836e"
        width="100%"
        gridTemplateColumns="20px 1fr 1fr"
        alignItems="center"
        p={isAllComplited ? '12px 30px' : '0'}
        columnGap="8px"
      >
        <Image src={alarmIcon} alt="alarm" />

        <Text variant="semiText">You are eligble for an NFT Upgrade</Text>

        <UpdateModal />
      </Grid>

      <Skeleton isLoaded={!isLoading} startColor="#1F372E" endColor="#2C4F43">
        <Flex position="relative">
          <Box w="300px" h="300px"></Box>

          <Flex
            position="absolute"
            backgroundImage={
              minerLevel === 'second'
                ? ntfData
                  ? ntfData?.json.image
                  : metaData?.image
                : level2Miner
            }
            backgroundSize="120%"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            w="300px"
            h="300px"
            justifyContent="center"
            alignItems="center"
            border="2px solid"
            borderColor="#4d8967"
            transition="all .5s"
            className="constant-tilt-shake"
            bottom="0%"
            left="0%"
          ></Flex>

          <Grid
            w="730px"
            h="300px"
            bgGradient="linear(to-tr, #1d322a 20%,  rgba(73, 131, 110, 0.4) 80%)"
            gridTemplateColumns="1fr"
            gridTemplateRows=".3fr .5fr repeat(2, 1fr)"
            p="30px"
            rowGap="12px"
          >
            <Text variant="smallText">THE JADEITES</Text>

            <Heading variant="h1" color="#e6e6e6">
              {minerLevel === 'second' ? 'Miner #4049' : 'Jadesmith #951'}
            </Heading>

            <Grid gridTemplateColumns="repeat(4, 1fr)" columnGap="12px">
              {(ntfData ? ntfData.json.attributes : metaData?.attributes || [])
                .slice(0, 4)
                .map((attr) => (
                  <InfoBox
                    key={attr.trait_type}
                    topText={attr.trait_type}
                    bottomText={attr.value}
                  />
                ))}
            </Grid>

            <Grid gridTemplateColumns="repeat(4, 1fr)" columnGap="12px">
              {(ntfData ? ntfData.json.attributes : metaData?.attributes || [])
                .slice(4)
                .map((attr) => (
                  <InfoBox
                    key={attr.trait_type}
                    topText={attr.trait_type}
                    bottomText={attr.value}
                  />
                ))}
            </Grid>
          </Grid>
        </Flex>
      </Skeleton>

      <Grid gridTemplateColumns="repeat(3, 1fr)" columnGap="25px" w="100%">
        <UpdateTasks />
      </Grid>
    </Flex>
  );
};

export default UpdateMiner;
