import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
// Note: Token metadata functionality will be implemented separately

// Configuration
export const NETWORK_URL = 'https://api.mainnet-beta.solana.com'; // Using mainnet for production
export const FEE_AMOUNT = 0.05; // 0.05 SOL fee
export const FEE_RECIPIENT = 'EYLG6DcHm3ZpFNycHjDnVeir58W3Ff5SqZupaBfbHqwG'; // Your Phantom wallet

// Create connection to Solana network
export const connection = new Connection(NETWORK_URL, 'confirmed');

/**
 * Create a payment transaction for the 0.05 SOL fee
 */
export async function createPaymentTransaction(fromPubkey, toPubkey, amount = FEE_AMOUNT) {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(fromPubkey),
      toPubkey: new PublicKey(toPubkey),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(fromPubkey);

  return transaction;
}

/**
 * Create a new SPL token
 */
export async function createMemecoin(
  wallet,
  tokenName,
  tokenSymbol,
  tokenDescription,
  tokenImage,
  initialSupply = 1000000
) {
  try {
    const payer = wallet.publicKey;
    
    // For now, we'll create a simple SPL token without metadata extensions
    // This can be enhanced later with proper metadata support
    
    // Create mint account
    const mint = await createMint(
      connection,
      {
        publicKey: payer,
        secretKey: null, // We'll use sendTransaction instead
      },
      payer, // mint authority
      null, // freeze authority
      9, // decimals
      undefined, // keypair (let it generate)
      {
        commitment: 'confirmed',
      },
      TOKEN_PROGRAM_ID
    );

    // Create associated token account for the creator
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      {
        publicKey: payer,
        secretKey: null,
      },
      mint, // mint
      payer, // owner
      false, // allowOwnerOffCurve
      'confirmed'
    );

    // Mint initial supply to creator
    await mintTo(
      connection,
      {
        publicKey: payer,
        secretKey: null,
      },
      mint, // mint
      tokenAccount.address, // destination
      payer, // authority
      initialSupply * Math.pow(10, 9), // amount (with decimals)
      [],
      'confirmed'
    );

    return {
      mintAddress: mint.toString(),
      tokenAccount: tokenAccount.address.toString(),
      supply: initialSupply,
    };
  } catch (error) {
    console.error('Error creating memecoin:', error);
    throw error;
  }
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
