import React, { useState, useEffect } from 'react';

const Header = function ( { userAchievements, setFilter }) {

  const [ap, setAp] = useState(0);

  useEffect(() => {
    let points = 0;
    for (let key in userAchievements) {
      console.log(key);
      points += userAchievements[key].points;
    }
    setAp(points);
  }, [userAchievements]);

    return (
      <div className="">    
        <div className="flex justify-center py-4">
          <h1 className="text-4xl text-blue-400 font-bold">
            {`${ap} Achievement Points`}
          </h1>
        </div>
        <div className="flex justify-center">
            <select className="select bg-transparent rounded-md text-sm font-bold" onChange={e => setFilter(e.target.value)}>
                <option defaultValue value="all">All</option>
                <option value="complete">Complete</option>
                <option value="incomplete">Incomplete</option>
            </select>
        </div>
      </div>
    );
};

export default Header;