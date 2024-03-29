import Head from 'next/head'
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import * as fcl from "@onflow/fcl";
import "../flow/config.js";
import axios from 'axios';
import Page from "./page2.js"
export default function Home() {
  const [user, setUser] = useState({ loggedIn: false });
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false)
  const [recipient, setRecipient] = useState('');

  // This keeps track of the logged in 
  // user for you automatically.
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  useEffect(() => {
    setList([]);
  }, [user])

  const [sessionId, setSessionId] = useState(null);


  const createCheckoutSession = async () => {
    try {
      const response = await axios.post('http://localhost:3002/create-checkout-session');
      setSessionId(response.data.sessionId);
      
     
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  const gotoCheckout = () => {
    window.location.href = "https://checkout.stripe.com/pay/"+sessionId;
  }



  async function getNFTs() {

    const result = await fcl.query({
      cadence: `
      import ExampleNFT from 0xDeployer
      import MetadataViews from 0xStandard

      pub fun main(address: Address): [NFT] {
        let collection = getAccount(address).getCapability(ExampleNFT.CollectionPublicPath)
                          .borrow<&ExampleNFT.Collection{MetadataViews.ResolverCollection}>()
                          ?? panic("Could not borrow a reference to the collection")

        let ids = collection.getIDs()

        let answer: [NFT] = []

        for id in ids {
          // Get the basic display information for this NFT
          let nft = collection.borrowViewResolver(id: id)
          // Get the basic display information for this NFT
          let view = nft.resolveView(Type<MetadataViews.Display>())!
          let display = view as! MetadataViews.Display
          answer.append(
            NFT(
              id: id, 
              name: display.name, 
              description: display.description, 
              thumbnail: display.thumbnail
            )
          )
        }

        return answer
      }

      pub struct NFT {
        pub let id: UInt64
        pub let name: String 
        pub let description: String 
        pub let thumbnail: AnyStruct{MetadataViews.File}
        
        init(id: UInt64, name: String, description: String, thumbnail: AnyStruct{MetadataViews.File}) {
          self.id = id
          self.name = name 
          self.description = description
          self.thumbnail = thumbnail
        }
      }
      `,
      args: (arg, t) => [
        arg(user?.addr, t.Address)
      ]
    });

    setList(result);
    setShow(true);
  }

  async function transferNFT(recipient, withdrawID) {

    const transactionId = await fcl.mutate({
      cadence: `
      import ExampleNFT from 0xDeployer
      import NonFungibleToken from 0xStandard

      transaction(recipient: Address, withdrawID: UInt64) {
        let ProviderCollection: &ExampleNFT.Collection{NonFungibleToken.Provider}
        let RecipientCollection: &ExampleNFT.Collection{NonFungibleToken.CollectionPublic}
        
        prepare(signer: AuthAccount) {
          self.ProviderCollection = signer.borrow<&ExampleNFT.Collection{NonFungibleToken.Provider}>(from: ExampleNFT.CollectionStoragePath)
                                      ?? panic("This user does not have a Collection.")

          self.RecipientCollection = getAccount(recipient).getCapability(ExampleNFT.CollectionPublicPath)
                                      .borrow<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic}>()!
        }

        execute {
          self.RecipientCollection.deposit(token: <- self.ProviderCollection.withdraw(withdrawID: withdrawID))
        }
      }
      `,
      args: (arg, t) => [
        arg(recipient, t.Address),
        arg(withdrawID, t.UInt64)
      ],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
  }

  async function setupCollection() {

    const transactionId = await fcl.mutate({
      cadence: `
      import ExampleNFT from 0xDeployer
      import NonFungibleToken from 0xStandard
      import MetadataViews from 0xStandard

      transaction() {
        
        prepare(signer: AuthAccount) {
          destroy signer.load<@NonFungibleToken.Collection>(from: ExampleNFT.CollectionStoragePath)
          signer.unlink(ExampleNFT.CollectionPublicPath)
          if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
            signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
            signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
          }
        }

        execute {
          
        }
      }
      `,
      args: (arg, t) => [],
      proposer: fcl.authz,
      payer: fcl.authz,
      authorizations: [fcl.authz],
      limit: 999
    });

    console.log('Transaction Id', transactionId);
  }

  return (
    
    <Page></Page>
    
  )
}
