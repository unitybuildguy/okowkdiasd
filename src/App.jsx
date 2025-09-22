import { useState } from 'react'
import { SolanaProvider } from './components/SolanaProvider'
import { WalletConnection } from './components/WalletConnection'
import { TokenCreationSection } from './components/TokenCreationSection'
import AboutSection from './components/AboutSection'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Coins, Zap, ArrowRight } from 'lucide-react'
import './App.css'

function App() {
  return (
    <SolanaProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Coins className="h-8 w-8 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Solana Memecoin Maker
                </h1>
              </div>
              <div className="text-sm text-muted-foreground">
                Create • Pay • Launch
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast Token Creation</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Create Your Own
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Memecoin
                </span>
                in Minutes
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Launch your custom memecoin on Solana with just 0.05 SOL. 
                No coding required - connect your wallet, pay the fee, and watch your token come to life!
              </p>
            </div>

            {/* How It Works */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-600 font-bold text-lg">1</span>
                  </div>
                  <CardTitle className="text-lg">Connect Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Connect your Solana wallet (Phantom, Solflare, etc.) to get started
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <CardTitle className="text-lg">Pay 0.05 SOL</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Pay a small fee to cover token creation and transaction costs
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-cyan-600 font-bold text-lg">3</span>
                  </div>
                  <CardTitle className="text-lg">Launch Token</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Your memecoin is created and you'll be redirected to view it on Solscan
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Wallet Connection Section */}
            <div className="flex justify-center">
              <WalletConnection />
            </div>

            {/* Token Creation Form - Only show when wallet is connected */}
            <TokenCreationSection />

            {/* Features */}
            <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Why Choose Our Platform?</CardTitle>
                <CardDescription className="text-purple-100">
                  The fastest and most reliable way to create Solana tokens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Instant Creation
                    </h4>
                    <p className="text-sm text-purple-100">
                      Your token is created and minted within seconds of payment confirmation
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Low Fees
                    </h4>
                    <p className="text-sm text-purple-100">
                      Only 0.05 SOL to create your token - much cheaper than other platforms
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Full Ownership
                    </h4>
                    <p className="text-sm text-purple-100">
                      You own 100% of your token supply and maintain full control
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Solscan Integration
                    </h4>
                    <p className="text-sm text-purple-100">
                      Automatic redirect to Solscan to view and share your new token
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <AboutSection />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>Built on Solana • Powered by SPL Token Program</p>
              <p className="mt-2">Create responsibly and have fun with your memecoins! 🚀</p>
            </div>
          </div>
        </footer>
      </div>
    </SolanaProvider>
  )
}

export default App
