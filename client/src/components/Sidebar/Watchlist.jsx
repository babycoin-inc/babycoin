import React from 'react';

const Watchlist = () => {
  return (
    <div class="overflow-x-auto relative">
      <table class="flex items-center text-center border border-white ml-3 mr-3">
        <tbody>
          <tr>
            <td class="px-2 py-3 whitespace-nowrap text-sm font-medium text-white">Bitcoin</td>
            <td class="text-sm text-white font-light px-2 py-3 whitespace-nowrap">
              $16,800
            </td>
            <td class="text-sm text-white font-light px-2 py-3 whitespace-nowrap">
              star
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;