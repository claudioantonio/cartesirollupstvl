import React from 'react'
import getTVL from './CartesiRollupsTVL.js';

const Tvl = async () => {
  const tvl = await getTVL();

  return (
    <div>
      <p>${tvl}</p>
      <p className="value-subtitle">* Using CoinMarketCap API to retrieve tokens price in US$</p>
    </div>
  )
}

export default Tvl