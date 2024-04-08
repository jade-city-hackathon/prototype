import { Connection } from '@solana/web3.js';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import { AnchorProvider, Idl, Program } from '@project-serum/anchor';

import IDL from './idl.json';

export const IDL_ADDRESS = '7wcU8nW59nzPh869kJvaCML5kFiWTC4HAvAiFHxufhB';

export const getProgram = (
  connection: Connection,
  wallet: AnchorWallet,
): Program<Idl> => {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: 'confirmed',
  });
  return new Program(IDL as Idl, IDL_ADDRESS, provider);
};
