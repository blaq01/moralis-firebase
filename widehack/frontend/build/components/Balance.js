import { Divider, Text } from "@chakra-ui/react";
import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";
import React, { useEffect } from "react";
import moralisV1 from 'moralis-v1'

export default function Balance({user}) {

    const [ethBalance, setEthBalance] = React.useState(0)

    const Web3Api = useMoralisWeb3Api()
    const {fetchERC20Balances, data} = useERC20Balances()

    const fetchNativeBalance = async () => {
        // const result = await Web3Api.account.getNativeBalance({
            const result =  Moralis.EvmApi.balance.getNativeBalance({
            chain: "mainnet",
            address: user.get("ethAddress")
        }).catch(e => console.log(e))
        if (result.balance) {
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(() => {
        fetchNativeBalance()
        fetchERC20Balances()
    }, [])

    // console.log(data)

    return(
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold">My ERC20 Tokens</Text>
            {ethBalance && <Text>💰&nbsp; {ethBalance} <b>ETH</b></Text>}
            <Divider />
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text>💰&nbsp; {Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b></Text>
                    <Divider />
                </div>
            ))}
        </CustomContainer>
    )
}