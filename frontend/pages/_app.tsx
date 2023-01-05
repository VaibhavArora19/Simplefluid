import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, goerli, polygonMumbai} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const { chains,provider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai],
  [
    alchemyProvider({apiKey:"KM1Kv-cqY7LlaPsoximQwOASxTzExuR5"}),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'SimpleFluid',
  chains
});


const wagmiClient = createClient({
  autoConnect:true,
  connectors,
  provider
});

export default function App({ Component, pageProps }: AppProps) {
  return (
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div>
          <Sidebar />
        </div>
          <Component {...pageProps} />
        <div>
          <Navbar />
        </div>
      </div>
    </RainbowKitProvider>
  </WagmiConfig>
  )
}
