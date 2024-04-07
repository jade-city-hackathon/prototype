import { useEffect } from 'react';
import {
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react';
import mintMinerBg from '../../assets/mintMiner.png';
import solanaIcons from '../../assets/solana.svg';
import { useWallet } from '@solana/wallet-adapter-react';
import { useGetProgram } from '../../hooks/useGetProgram';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getNFT } from '../../utils/provider/api';
import axios from 'axios';
import { useMinerLevel } from '../../store/miners';

type LabelText = {
  leftText: string;
  rightText: string;
  solanaIcon?: boolean;
};

export type MetaDataType = {
  metadata: {
    name: string;
    symbol: string;
    description: string;
    image: string;
  };
  ipfsHash: string;
};

export type NfrDataType = {
  json: {
    attributes: { trait_type: string; value: string }[];
    image: string;
  };
};

export const getNtfData = (nftAddress: string): Promise<NfrDataType> => {
  return axios
    .get(
      `https://api-jedaite.blaize.technology/api/contract/findNFTByMint?walletAddress=${nftAddress}`,
    )
    .then((r) => r.data);
};

export const getMetaData = (): Promise<MetaDataType> => {
  return axios
    .get(
      'https://api-jedaite.blaize.technology/api/nft-metadata/generate-metadata',
    )
    .then((r) => r.data);
};

const TextLabels = ({ leftText, rightText, solanaIcon }: LabelText) => {
  return (
    <Grid
      gridTemplateColumns="repeat(2, 1fr)"
      justifyContent="space-between"
      p="12px"
      borderRadius="8px"
      bgGradient="linear(225deg, rgba(73, 131, 110, 0.4) 0%,  rgba(73, 131, 110, 0.4) 100%)"
      opacity="0.8"
      alignItems="center"
    >
      <Text variant="smallText">{leftText}</Text>
      <Text
        textAlign="right"
        fontWeight="500"
        fontSize="14px"
        lineHeight="143%"
      >
        <Flex justifyContent="flex-end" columnGap="6px" alignItems="center">
          {rightText}

          {solanaIcon && <Image src={solanaIcons} alt="solana" />}
        </Flex>
      </Text>
    </Grid>
  );
};

const MintMiner = () => {
  const { setMinerLevel } = useMinerLevel((state) => state);

  const { publicKey } = useWallet();

  const program = useGetProgram();

  const { data: metaData } = useQuery({
    queryKey: ['getMetaData'],
    queryFn: getMetaData,
  });

  const { mutate: callMintNft, isPending: isPendingMintNft } = useMutation({
    mutationFn: getNFT,
    onSuccess: () => {
      console.log('all is good');
      setMinerLevel('second');
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  const { data: isNftPresent, isPending: isPendingCheckNft } = useQuery({
    queryKey: ['checkNft', publicKey?.toBase58(), isPendingMintNft],
    queryFn: () => getNtfData(publicKey?.toBase58() || ''),
    enabled: !!program && !!publicKey,
  });

  useEffect(() => {
    if (isNftPresent) {
      setMinerLevel('second');
    }
  }, [isNftPresent]);

  const mintNFT = () => {
    if (!metaData || !program || !publicKey) {
      return;
    }
    callMintNft({
      program,
      publicKey,
      metaData,
    });
  };
  return (
    <Flex justifyContent="center">
      <Skeleton isLoaded={!isPendingCheckNft}>
        <Flex overflow="hidden">
          <Flex
            backgroundImage={mintMinerBg}
            backgroundSize="120%"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            w="300px"
            h="300px"
            justifyContent="center"
            alignItems="center"
            borderTopLeftRadius="11px"
            borderBottomLeftRadius="11px"
            border="2px solid"
            borderColor="#4d8967"
          >
            <Flex
              borderRadius="11px"
              w="142px"
              h="129px"
              bgGradient="linear(to-tr,#1c322b 0%, #2c5043 100%)"
              justifyContent="center"
              alignItems="center"
              opacity="0.8"
            >
              <Text
                fontWeight="700"
                fontSize="60px"
                lineHeight="129%"
                letterSpacing="-0.02em"
                color="rgba(255, 255, 255, 0.87)"
              >
                ?
              </Text>
            </Flex>
          </Flex>

          <Grid
            minW="387px"
            borderTopRightRadius="11px"
            borderBottomRightRadius="11px"
            bgGradient="linear(to-tr, #1d322a 20%,  rgba(73, 131, 110, 0.4) 80%)"
            gridTemplateColumns="1fr"
            gridTemplateRows=".6fr 1fr repeat(2, 1fr) .8fr"
            p="30px"
            rowGap="10px"
          >
            <Text variant="smallText">THE JADEITES</Text>

            <Heading variant="h1" color="#e6e6e6">
              Mint a miner
            </Heading>

            <TextLabels leftText={'SUPPLY'} rightText={'6,700/6,700'} />

            <TextLabels leftText={'MINT PRICE'} rightText={'1.0'} solanaIcon />

            <Button
              variant="main"
              onClick={mintNFT}
              w="172"
              disabled={isPendingMintNft}
            >
              Mint NFT
              {isPendingMintNft && (
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
          </Grid>
        </Flex>
      </Skeleton>
    </Flex>
  );
};

export default MintMiner;
