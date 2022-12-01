import React from 'react';
import './profilestyles.css';

function TradeHistory() {
  return (
    <div className="trade_history">
      <h2>Trade History</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Type</th>
          <th>Balance</th>
        </tr>
        <tr>
          <td>Bitcoin</td>
          <td>$300</td>
          <td>$15,698</td>
          <td>BUY</td>
          <td>$800</td>
        </tr>
        <tr>
          <td>Bitcoin</td>
          <td>$300</td>
          <td>$15,698</td>
          <td>BUY</td>
          <td>$800</td>
        </tr>
        <tr>
          <td>Bitcoin</td>
          <td>$300</td>
          <td>$15,698</td>
          <td>BUY</td>
          <td>$800</td>
        </tr>
      </table>
    </div>
  )
}

export default TradeHistory;