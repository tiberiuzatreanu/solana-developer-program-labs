import 'dotenv/config';

import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {getExplorerLink, getKeypairFromEnvironment} from '@solana-developers/helpers';
import {getOrCreateAssociatedTokenAccount, mintTo} from "@solana/spl-token";

const COMMITMENT = "confirmed";
const CLUSTER = "devnet";
const SECRET_KEY_ENV_VARIABLE = "SECRET_KEY";
const ADDRESS_TYPE = "address";
const TRANSACTION_TYPE = "transaction";

const MINT_AMOUNT = 10 * LAMPORTS_PER_SOL;

const RECIPIENT_ADDRESS = "DzFnV34zjCGX7nr71BDSKmvDPeKUS6EW6MvjSaa69uiZ";
const TOKEN_MINT_ADDRESS = "59Bm5m8iHn2JNUFNjzKavPCSqZXdS5bHfuinv8PKmbhL";

const connection = new Connection(clusterApiUrl(CLUSTER), COMMITMENT);
const keypair = getKeypairFromEnvironment(SECRET_KEY_ENV_VARIABLE);

const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
const recipient = new PublicKey(RECIPIENT_ADDRESS);

console.log(`Account: ${getExplorerLink(ADDRESS_TYPE, keypair.publicKey.toString(), CLUSTER)}`);
console.log(`Token mint: ${getExplorerLink(ADDRESS_TYPE, tokenMint.toString(), CLUSTER)}`);

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    tokenMint,
    recipient,
);

console.log(`Recipient token account: ${getExplorerLink(ADDRESS_TYPE, tokenAccount.address.toString(), CLUSTER)}`);

const mintToTxSig = await mintTo(
    connection,
    keypair,
    tokenMint,
    tokenAccount.address,
    keypair,
    MINT_AMOUNT
);

console.log(`Mint to transaction: ${getExplorerLink(TRANSACTION_TYPE, mintToTxSig.toString(), CLUSTER)}`);