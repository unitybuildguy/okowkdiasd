import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenCreationForm } from './TokenCreationForm';
import { BalanceDisplay } from './BalanceDisplay';
import { motion } from 'framer-motion';

export const TokenCreationSection = () => {
  const { connected } = useWallet();

  if (!connected) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <BalanceDisplay />
      <div className="flex justify-center">
        <TokenCreationForm />
      </div>
    </motion.div>
  );
};
