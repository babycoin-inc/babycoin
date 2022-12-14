import React from 'react';

const Watchlist = () => {
  return (
    <div className="overflow-x-auto relative">
      <table className="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          <tr>
            <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-white">Bitcoin</td>
            <td className="text-sm text-white font-light px-2 py-3 whitespace-nowrap">
              $16,800
            </td>
            <td className="text-sm text-white font-light px-2 py-3 whitespace-nowrap">
              star
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;