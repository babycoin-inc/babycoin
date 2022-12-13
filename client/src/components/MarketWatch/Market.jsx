import React from 'react';

const Market = () => {
  return (
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-center">
          <thead className="border-b bg-zinc-700">
            <tr>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                #
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                Coin
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                Price
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                1h
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                24h
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                7d
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                24h Volume
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                Mkt Cap
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                FDV
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                Mkt Cap/FDV
              </th>
              <th scope="col" className="text-lg font-medium text-white px-3 py-6">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-zinc-900 boder-gray-900 hover:bg-zinc-500">
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">1</td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                Bitcoin BTC
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                $16,833.02
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                -0.0%
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                0.1%
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                -2.0%
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
                $18,684,528,849
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
              $323,714,036,416
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
              $353,551,695,000
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
              0.92
              </td>
              <td className="text-sm text-white font-light px-2 py-5 whitespace-nowrap">
              graph placeholder
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        );
};

export default Market;