import React from 'react';

const Header = function () {

    return (
      <div className="">    
        <div className="flex justify-center py-4">
          <h1 className="text-4xl text-blue-400 font-bold">
            500 Achievement Points
          </h1>
        </div>
        <div className="flex justify-center">
            <select className="select bg-transparent rounded-md text-sm font-bold">
                <option selected value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
      </div>
    );
};

export default Header;