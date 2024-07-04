import 'dotenv/config';

import {clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import {getExplorerLink, getKeypairFromEnvironment} from '@solana-developers/helpers';
import {getOrCreateAssociatedTokenAccount, transfer} from "@solana/spl-token";

const COMMITMENT = "confirmed";
const CLUSTER = "devnet";
const SECRET_KEY_ENV_VARIABLE = "SECRET_KEY";
const ADDRESS_TYPE = "address";
const TRANSACTION_TYPE = "transaction";

const TRANSFER_AMOUNT = 1.1 * LAMPORTS_PER_SOL;

const RECIPIENT_ADDRESS = "AMhdHJ83EQnFRp3DXKr9NCJxZCUjjoqpHf63XnuYT81G";
const TOKEN_MINT_ADDRESS = "59Bm5m8iHn2JNUFNjzKavPCSqZXdS5bHfuinv8PKmbhL";

const connection = new Connection(clusterApiUrl(CLUSTER), COMMITMENT);
const sender = getKeypairFromEnvironment(SECRET_KEY_ENV_VARIABLE);

const tokenMint = new PublicKey(TOKEN_MINT_ADDRESS);
const recipient = new PublicKey(RECIPIENT_ADDRESS);

console.log(`Sender: ${getExplorerLink(ADDRESS_TYPE, sender.publicKey.toString(), CLUSTER)}`);
console.log(`Token mint: ${getExplorerLink(ADDRESS_TYPE, tokenMint.toString(), CLUSTER)}`);

const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMint,
    sender.publicKey,
);

console.log(`Sender token account: ${getExplorerLink(ADDRESS_TYPE, senderTokenAccount.address.toString(), CLUSTER)}`);

const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMint,
    recipient,
);

console.log(`Recipient token account: ${getExplorerLink(ADDRESS_TYPE, recipientTokenAccount.address.toString(), CLUSTER)}`);

const transferTxSig = await transfer(
    connection,
    sender,
    senderTokenAccount.address,
    recipientTokenAccount.address,
    sender.publicKey,
    TRANSFER_AMOUNT
);

console.log(`Transfer transaction: ${getExplorerLink(TRANSACTION_TYPE, transferTxSig.toString(), CLUSTER)}`);