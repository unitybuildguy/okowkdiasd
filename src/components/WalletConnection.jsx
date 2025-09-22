import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, CheckCircle } from 'lucide-react';

export const WalletConnection = () => {
  const { connected, publicKey, wallet } = useWallet();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Wallet className="h-6 w-6 mr-2" />
          <CardTitle>Wallet Connection</CardTitle>
        </div>
        <CardDescription>
          Connect your Solana wallet to create memecoins
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!connected ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Choose a wallet to connect:
            </p>
            <WalletMultiButton className="w-full !bg-primary hover:!bg-primary/90 !text-primary-foreground !rounded-md !h-10 !text-sm !font-medium !transition-colors" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Connected
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Wallet:</span> {wallet?.adapter?.name}
              </div>
              <div className="text-sm">
                <span className="font-medium">Address:</span>
                <div className="font-mono text-xs bg-muted p-2 rounded mt-1 break-all">
                  {publicKey?.toString()}
                </div>
              </div>
            </div>
            
            <WalletDisconnectButton className="w-full !bg-destructive hover:!bg-destructive/90 !text-destructive-foreground !rounded-md !h-10 !text-sm !font-medium !transition-colors" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
