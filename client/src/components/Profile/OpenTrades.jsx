import React from 'react';
import './profilestyles.css';

function OpenTrades() {
  return (
    <div className="open_trades">
      <h2>Open Trades</h2>
      <table>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Purchase Price</th>
          <th>Current Price</th>
          <th>P/L</th>
        </tr>
        <tr>
          <td>Bitcoin<i className="td_sub">BTC</i></td>
          <td>$300<i className="td_sub">.023 BTC</i></td>
          <td>$15,698</td>
          <td>$17,698</td>
          <td>+$400</td>
        </tr>
        <tr>
          <td>Bitcoin<i className="td_sub">BTC</i></td>
          <td>$300<i className="td_sub">.023 BTC</i></td>
          <td>$15,698</td>
          <td>$17,698</td>
          <td>+$400</td>
        </tr>
        <tr>
          <td>Bitcoin<i className="td_sub">BTC</i></td>
          <td>$300<i className="td_sub">.023 BTC</i></td>
          <td>$15,698</td>
          <td>$17,698</td>
          <td>+$400</td>
        </tr>
      </table>
    </div>
  )
}

export default OpenTrades;