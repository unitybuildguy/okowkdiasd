import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Coins, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import ImageUpload from './ImageUpload';
import { createPaymentTransaction, createTokenTransaction, verifyTransaction, getSolscanUrl, FEE_AMOUNT, FEE_RECIPIENT, connection } from '../lib/tokenCreation';

export const TokenCreationForm = () => {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    image: null,
    initialSupply: '1000000'
  });
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState('form'); // form, payment, creating, success, error
  const [error, setError] = useState('');
  const [tokenResult, setTokenResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (imageData) => {
    setFormData(prev => ({
      ...prev,
      image: imageData
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Token name is required';
    if (!formData.symbol.trim()) return 'Token symbol is required';
    if (formData.symbol.length > 10) return 'Token symbol must be 10 characters or less';
    if (!formData.description.trim()) return 'Token description is required';
    if (isNaN(formData.initialSupply) || parseInt(formData.initialSupply) <= 0) {
      return 'Initial supply must be a positive number';
    }
    return null;
  };

  const handleCreateToken = async () => {
    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsCreating(true);
    setError('');
    setStep('payment');

    try {
      // Step 1: Create and send payment transaction
      const paymentTx = await createPaymentTransaction(
        publicKey.toString(),
        FEE_RECIPIENT,
        FEE_AMOUNT
      );

      // Use secure wallet method instead of manual signing
      const paymentSignature = await sendTransaction(paymentTx, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      });
      
      // Wait for payment confirmation
      const paymentConfirmed = await verifyTransaction(paymentSignature);
      
      if (!paymentConfirmed) {
        throw new Error('Payment transaction failed or was not confirmed');
      }

      setStep('creating');

      // Step 2: Create the token
      const tokenData = await createTokenTransaction(
        publicKey,
        formData.name,
        formData.symbol,
        parseInt(formData.initialSupply)
      );

      // Use secure wallet method for token creation
      const tokenSignature = await sendTransaction(tokenData.transaction, connection, {
        skipPreflight: false,
        preflightCommitment: 'confirmed'
      });
      
      // Wait for token creation confirmation
      const tokenConfirmed = await verifyTransaction(tokenSignature);
      
      if (!tokenConfirmed) {
        throw new Error('Token creation transaction failed or was not confirmed');
      }

      setTokenResult({
        mintAddress: tokenData.mintAddress,
        tokenAccount: tokenData.tokenAccount,
        supply: parseInt(formData.initialSupply),
      });
      setStep('success');

    } catch (err) {
      console.error('Token creation error:', err);
      setError(err.message || 'Failed to create token. Please try again.');
      setStep('error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewOnSolscan = () => {
    if (tokenResult?.mintAddress) {
      const url = getSolscanUrl(tokenResult.mintAddress);
      window.open(url, '_blank');
    }
  };

  const resetForm = () => {
    setStep('form');
    setError('');
    setTokenResult(null);
    setFormData({
      name: '',
      symbol: '',
      description: '',
      image: null,
      initialSupply: '1000000'
    });
  };

  if (!connected) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Create Your Memecoin</CardTitle>
          <CardDescription>
            Connect your wallet to start creating your custom token
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please connect your Solana wallet to continue with token creation.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (step === 'success' && tokenResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">Token Created Successfully!</CardTitle>
          <CardDescription>
            Your memecoin has been created and minted on Solana
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg space-y-3">
            <div>
              <Label className="font-semibold">Token Name:</Label>
              <p className="text-sm">{formData.name}</p>
            </div>
            <div>
              <Label className="font-semibold">Symbol:</Label>
              <p className="text-sm">{formData.symbol}</p>
            </div>
            <div>
              <Label className="font-semibold">Mint Address:</Label>
              <p className="text-xs font-mono bg-white p-2 rounded border break-all">
                {tokenResult.mintAddress}
              </p>
            </div>
            <div>
              <Label className="font-semibold">Initial Supply:</Label>
              <p className="text-sm">{parseInt(formData.initialSupply).toLocaleString()} tokens</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleViewOnSolscan}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Solscan
            </Button>
            <Button 
              onClick={resetForm}
              variant="outline"
              className="flex-1"
            >
              Create Another Token
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Coins className="h-5 w-5 mr-2" />
          Create Your Memecoin
        </CardTitle>
        <CardDescription>
          Fill in the details for your custom token. Fee: {FEE_AMOUNT} SOL
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'payment' && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Processing payment of {FEE_AMOUNT} SOL... Please confirm the transaction in your wallet.
            </AlertDescription>
          </Alert>
        )}

        {step === 'creating' && (
          <Alert>
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              Creating your token... This may take a few moments.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Token Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., My Awesome Coin"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isCreating}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symbol">Token Symbol *</Label>
            <Input
              id="symbol"
              name="symbol"
              placeholder="e.g., MAC"
              value={formData.symbol}
              onChange={handleInputChange}
              disabled={isCreating}
              maxLength={10}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe your memecoin..."
            value={formData.description}
            onChange={handleInputChange}
            disabled={isCreating}
            rows={3}
          />
        </div>

        <ImageUpload
          onImageChange={handleImageChange}
          currentImage={formData.image}
        />

        <div className="space-y-2">
          <Label htmlFor="initialSupply">Initial Supply *</Label>
          <Input
            id="initialSupply"
            name="initialSupply"
            type="number"
            placeholder="1000000"
            value={formData.initialSupply}
            onChange={handleInputChange}
            disabled={isCreating}
            min="1"
          />
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• You will pay {FEE_AMOUNT} SOL to create this token</li>
            <li>• You will receive 100% of the initial supply</li>
            <li>• The token will be created on Solana Mainnet</li>
            <li>• Transaction cannot be reversed once confirmed</li>
          </ul>
        </div>

        <Button 
          onClick={handleCreateToken}
          disabled={isCreating || step !== 'form'}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          size="lg"
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {step === 'payment' ? 'Processing Payment...' : 'Creating Token...'}
            </>
          ) : (
            <>
              <Coins className="h-4 w-4 mr-2" />
              Create Token ({FEE_AMOUNT} SOL)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
