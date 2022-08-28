import ExampleNFT from "../ExampleNFT.cdc"
import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import MetadataViews from "../utility/MetadataViews.cdc"

transaction() {
  
  prepare(signer: AuthAccount) {
    destroy signer.load<@ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath)
    signer.unlink(ExampleNFT.CollectionPublicPath)
    if signer.borrow<&ExampleNFT.Collection>(from: ExampleNFT.CollectionStoragePath) == nil {
      signer.save(<- ExampleNFT.createEmptyCollection(), to: ExampleNFT.CollectionStoragePath)
      signer.link<&ExampleNFT.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)
    }
  }

  execute {
    
  }
}