import React from 'react';

const BabyHome = () => {
  return (
    <div>
      <p>You are not logged in</p>
      <a href={'/auth/login'}>Login Here</a>
    </div>
  );
}

export default BabyHome;