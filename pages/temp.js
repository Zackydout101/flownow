return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>1-NON-FUNGIBLE-TOKEN</title>
        <meta name="description" content="Used by Emerald Academy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto flex-1 p-5'>
        <div className='mb-10 flex justify-between items-center pr-10 pt-2'>
         
        <button onClick={createCheckoutSession}>Create Checkout Session</button>
      {sessionId && <button onClick={gotoCheckout}>Checkout</button>}

          <div className='flex space-x-4 items-center'>
            <h1 className='text-[#000000]'>Address: </h1>
            <h1 className='border px-7 text-center text-[#000000] text-sm py-1 rounded-xl border-[#38E8C6] w-56'>{user.loggedIn ? user.addr : "Please connect wallet -->"}</h1>
          </div>
          <div>{!user.loggedIn ? <button className='border rounded-xl border-[#000000] px-5 text-sm text-[#38E8C6] py-1'
            onClick={fcl.authenticate}>Connect</button> : <button className='border rounded-xl border-[#38E8C6]
          px-5 text-sm text-[#000000] py-1' onClick={fcl.unauthenticate}>Logout</button>}
          </div>
        </div>
        <hr className='border-[#000000]' />
        <div className='flex  flex-col items-center justify-center pt-10'>
          {!user.loggedIn ? "" : <div className='flex space-x-5'>
            <button onClick={setupCollection} className="border rounded-lg py-2 text-sm px-5 border-[#000000] text-blue-900 font-bold bg-[#38E8C6]">Global Market</button>
            <button onClick={setupCollection} className="border rounded-lg py-2 text-sm px-5 border-[#000000] text-blue-900 font-bold bg-[#38E8C6]">Setup Collection</button>
            <button onClick={getNFTs} className="border rounded-lg py-2 text-sm px-5 border-[#000000] text-blue-900 font-bold bg-[#38E8C6]">Get NFTs</button>
          </div>}
          <div className='pt-20'>
            {show == false ? <div className='flex flex-col justify-center items-center'>
             
            </div> :
              <div className='grid grid-cols-3 gap-20 px-5'>
                {list.map((nft, index) => (
                  <div key={index} className="border shadow-lg bg-[#38E8C6] border-[#38E8C6] bg-opacity-40 bg-clip-padding rounded-lg backdrop-blur-sm p-4">
                    <div className='flex justify-between pb-2'>
                      <h1 className='font-bold text-[#000000] font-xl'>{nft.name}</h1>
                      <p className='text-[#000000] font-semibold'>{nft.id}</p>
                    </div>
                    <p className='text-black-300 text-md'>{nft.description}</p>
                    <div className='flex justify-center py-2'>
                      <img src={`https://cloudflare-ipfs.com/ipfs/${nft.thumbnail.url}`} width={150} />
                    </div>
                    <div className='flex flex-col pt-2'>
                      <input className="px-4 mb-1 py-1 focus:outline-none focus:border-[#000000] focus:border-2 bg-green-100 border rounded-lg border-[#000000]" type="text" onChange={e => setRecipient(e.target.value)} />
                      <button onClick={() => transferNFT(recipient, nft.id)} className="border rounded-lg py-2 text-sm px-5 border-[#000000] text-blue-900 font-bold bg-[#38E8C6]">Transfer</button>
                    </div>
                  </div>
                ))}
              </div>}
          </div>
        </div>
      </main>
      <footer>
        
        <div className='bg-grey flex pt-10 pb-5 justify-center text-white'>
          <div className='w-[80%] flex justify-between items-center'>
            <div className='font-jet text-xs'>2022. All rights reserved.</div>
            <a className='flex items-center text-[#38E8C6] hover:underline hover:underline-offset-2 space-x-1 font-poppins text-lg' href='https://academy.ecdao.org/'><h1></h1>
              <img src='/4course.png' width={200} alt='city' />
             </a>
            <div className='font-jet text-xs'>Created by <a href='https://discord.gg/emeraldcity' className='text-[#38E8C6] hover:underline hover:underline-offset-2 '></a></div>
          </div>
        </div>
      </footer>
    </div>
  )