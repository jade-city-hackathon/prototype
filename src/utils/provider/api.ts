import {
  Keypair,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import { Idl, Program } from '@project-serum/anchor';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { MetaDataType } from '../../components/mintMiner';

export const getSupply = async ({
  program,
  publicKey,
}: {
  program: Program<Idl> | undefined;
  publicKey: PublicKey | null;
}) => {
  if (!program || !publicKey) return;

  const contractDataPDA = (): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('contractdata')],
      program.programId,
    );
  };

  const data = await program.account.contractData.fetchNullable(
    contractDataPDA()[0],
  );

  if (!data) return;

  return { supply: data.supply, totalSupply: data.totalSupply };
};

export const getNFT = async ({
  program,
  publicKey,
  metaData,
}: {
  program: Program<Idl> | undefined;
  publicKey: PublicKey | null;
  metaData: MetaDataType;
}) => {
  if (!program || !publicKey) return;

  const mint = Keypair.generate();

  const userAta = await getAssociatedTokenAddress(
    mint.publicKey, // mint
    publicKey,
    true,
  );

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  );

  const [metadataAccount, _1] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(), // user PublicKey
      mint.publicKey.toBuffer(), // pool PublicKey
    ],
    TOKEN_METADATA_PROGRAM_ID,
  );

  const [masterEditionAccount, _2] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('metadata'),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(), // user PublicKey
      mint.publicKey.toBuffer(), // pool PublicKey
      Buffer.from('edition'),
    ],
    TOKEN_METADATA_PROGRAM_ID,
  );

  console.log('--MetaDataType-', metaData);

  const metadata = {
    name: metaData.metadata.name,
    symbol: metaData.metadata.symbol,
    uri: `https://ipfs.io/ipfs/${metaData.ipfsHash}`,
  };

  const contractDataPDA = (): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('contractdata')],
      program.programId,
    );
  };

  const userDataPDA = (walletAddress: PublicKey): [PublicKey, number] => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('userdata'), walletAddress.toBuffer()],
      program.programId,
    );
  };

  const MintNft = await program.methods
    .mintNft(metadata.name, metadata.symbol, metadata.uri)
    .accounts({
      signer: publicKey,
      mint: mint.publicKey,
      associatedTokenAccount: userAta,
      metadataAccount,
      masterEditionAccount,
      contractData: contractDataPDA()[0],
      userData: userDataPDA(publicKey)[0],
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT_PUBKEY,
    })
    .signers([mint])
    .rpc();

  console.log('--MintNft--', MintNft);

  // const mintTx = handleConfirmTx({ program, MintNft });
  //
  // // console.log('--tx--', tx);
  // console.log('--mintTx--', mintTx);

  return MintNft;
};
