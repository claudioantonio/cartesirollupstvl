import React from 'react'
import Tvl from './components/tvl/Tvl'

const Home = () => {
  return (
  <main>
    <div className="container">
      <h1>Cartesi Rollups TVL <div className="badge">alfa</div></h1>
      <h2>Sum of values locked in each Cartesi Rollups DApp on Ethereum Mainnet</h2>
      <div className="value"><Tvl/></div>
    </div>
    <footer>
      &copy; 2023 All rights reserved. | <a href="https://github.com/yourrepository">GitHub Repository</a>
    </footer>
  </main>
  )
}

export default Home
