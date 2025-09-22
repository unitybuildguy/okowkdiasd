import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
} from '@solana/web3.js';
import {
  createInitializeMintInstruction,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

// Configuration
export const NETWORK_URL = 'https://api.mainnet-beta.solana.com';
export const connection = new Connection(NETWORK_URL, 'confirmed');
export const FEE_AMOUNT = 0.05; // 0.05 SOL fee
export const FEE_RECIPIENT = 'EYLG6DcHm3ZpFNycHjDnVeir58W3Ff5SqZupaBfbHqwG'; // Your Phantom wallet

/**
 * Create a payment transaction for the fee
 */
export async function createPaymentTransaction(fromPubkey, toPubkey, amount = FEE_AMOUNT) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromPubkey),
      toPubkey: new PublicKey(toPubkey),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(fromPubkey);

  return transaction;
}

/**
 * Create a complete token creation transaction
 */
export async function createTokenTransaction(
  payer,
  tokenName,
  tokenSymbol,
  initialSupply = 1000000
) {
  // Generate a new keypair for the mint
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;
  
  // Get associated token account address
  const associatedTokenAccount = await getAssociatedTokenAddress(
    mint,
    payer,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  // Get minimum balance for rent exemption
  const mintRent = await getMinimumBalanceForRentExemptMint(connection);

  // Create transaction
  const transaction = new Transaction();

  // Add instruction to create mint account
  transaction.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: mintRent,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  // Add instruction to initialize mint
  transaction.add(
    createInitializeMintInstruction(
      mint,
      9, // decimals
      payer, // mint authority
      null, // freeze authority
      TOKEN_PROGRAM_ID
    )
  );

  // Add instruction to create associated token account
  transaction.add(
    createAssociatedTokenAccountInstruction(
      payer, // payer
      associatedTokenAccount, // associated token account
      payer, // owner
      mint, // mint
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  );

  // Add instruction to mint tokens
  transaction.add(
    createMintToInstruction(
      mint,
      associatedTokenAccount,
      payer, // authority
      initialSupply * Math.pow(10, 9), // amount with decimals
      [],
      TOKEN_PROGRAM_ID
    )
  );

  // Set transaction details
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  // Partially sign with mint keypair
  transaction.partialSign(mintKeypair);

  return {
    transaction,
    mintAddress: mint.toString(),
    tokenAccount: associatedTokenAccount.toString(),
  };
}

/**
 * Verify a transaction was successful
 */
export async function verifyTransaction(signature) {
  try {
    const result = await connection.confirmTransaction(signature, 'confirmed');
    return !result.value.err;
  } catch (error) {
    console.error('Error verifying transaction:', error);
    return false;
  }
}

/**
 * Get account balance in SOL
 */
export async function getAccountBalance(publicKey) {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error getting balance:', error);
    return 0;
  }
}

/**
 * Generate Solscan URL for a token
 */
export function getSolscanUrl(mintAddress, cluster = 'mainnet') {
  const baseUrl = 'https://solscan.io';
  const clusterParam = cluster === 'devnet' ? '?cluster=devnet' : '';
  return `${baseUrl}/token/${mintAddress}${clusterParam}`;
}
