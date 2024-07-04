import 'dotenv/config';

import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {airdropIfRequired, getKeypairFromEnvironment} from '@solana-developers/helpers';
import bs58 from 'bs58';

const CLUSTER = "devnet";
const SECRET_KEY_ENV_VARIABLE = "SECRET_KEY";
const AIRDROP_AMOUNT = 1.5 * LAMPORTS_PER_SOL;

const connection = new Connection(clusterApiUrl(CLUSTER));
const keypair = getKeypairFromEnvironment(SECRET_KEY_ENV_VARIABLE);

console.log(`RPC URL: ${connection.rpcEndpoint}`);

const convertToSol = (balance: number) => balance / LAMPORTS_PER_SOL

const printBalanceInSol = async (publicKey: PublicKey) => {
    const balance = await connection.getBalance(publicKey);
    console.log(`Balance for ${publicKey.toBase58()} is ${convertToSol(balance)} SOL`);
}

const airdropSol = async (publicKey: PublicKey) => {
    await airdropIfRequired(connection, publicKey, AIRDROP_AMOUNT, AIRDROP_AMOUNT);
    console.log(`Airdropped (if required) ${convertToSol(AIRDROP_AMOUNT)} SOL to ${publicKey.toBase58()}`);
}

await printBalanceInSol(keypair.publicKey);
await airdropSol(keypair.publicKey);
await printBalanceInSol(keypair.publicKey);

console.log(`Encoded secret key: ${bs58.encode(keypair.secretKey)}`);