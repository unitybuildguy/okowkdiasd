import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Code, Zap, Users } from 'lucide-react';

const AboutSection = () => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          About Solana Memecoin Maker
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          A professional, secure, and transparent platform for creating custom SPL tokens on the Solana blockchain. 
          Built with industry best practices and user security as our top priority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardHeader>
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Secure & Safe</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Built using official Solana programs and secure wallet connection methods. 
              No private keys are ever stored or transmitted.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Lightning Fast</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Tokens are created and minted within seconds using Solana's high-performance blockchain.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Code className="h-12 w-12 text-blue-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Transparent</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Clear 0.05 SOL fee structure. All transactions are visible on-chain and verifiable on Solscan.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="h-12 w-12 text-purple-500 mx-auto mb-2" />
            <CardTitle className="text-lg">User Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              You receive 100% ownership of your token supply. We don't retain any tokens or control.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Our platform uses the official Solana Token Program to create legitimate SPL tokens
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">1</span>
                </div>
                <h4 className="font-semibold">Payment Processing</h4>
              </div>
              <p className="text-sm text-gray-600 ml-10">
                You pay 0.05 SOL which covers platform fees and Solana network costs for token creation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <h4 className="font-semibold">Token Creation</h4>
              </div>
              <p className="text-sm text-gray-600 ml-10">
                We use the official Solana Token Program to create your mint account and associated token account.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold">3</span>
                </div>
                <h4 className="font-semibold">Token Minting</h4>
              </div>
              <p className="text-sm text-gray-600 ml-10">
                Your specified token supply is minted directly to your wallet. You have full control and ownership.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Security & Trust</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">What We Do</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>✅ Use official Solana Token Program</li>
                <li>✅ Implement secure wallet connection methods</li>
                <li>✅ Provide transparent transaction details</li>
                <li>✅ Redirect to Solscan for verification</li>
                <li>✅ Charge clear, upfront fees</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">What We Don't Do</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>❌ Store or access your private keys</li>
                <li>❌ Retain control of your tokens</li>
                <li>❌ Hide transaction details</li>
                <li>❌ Charge hidden fees</li>
                <li>❌ Collect personal information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Contact & Support</h3>
        <p className="text-gray-600">
          Built on Solana • Powered by SPL Token Program
        </p>
        <p className="text-sm text-gray-500">
          Create responsibly and have fun with your memecoins! 🚀
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
