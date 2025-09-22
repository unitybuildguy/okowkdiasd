import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wallet, RefreshCw } from 'lucide-react';
import { getAccountBalance } from '../lib/tokenCreation';

export const BalanceDisplay = () => {
  const { connected, publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    if (!connected || !publicKey) return;
    
    setLoading(true);
    try {
      const bal = await getAccountBalance(publicKey.toString());
      setBalance(bal);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [connected, publicKey]);

  if (!connected) {
    return null;
  }

  const hasEnoughBalance = balance >= 0.05;

  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">SOL Balance:</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={hasEnoughBalance ? "default" : "destructive"}
              className="font-mono"
            >
              {balance.toFixed(4)} SOL
            </Badge>
            <button
              onClick={fetchBalance}
              disabled={loading}
              className="p-1 hover:bg-muted rounded transition-colors"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
        {!hasEnoughBalance && (
          <p className="text-xs text-destructive mt-2">
            You need at least 0.05 SOL to create a token
          </p>
        )}
      </CardContent>
    </Card>
  );
};
