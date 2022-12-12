import React from 'react';

function AchievementWidget({ userAchievements }) {
  console.log('userachievements', userAchievements);
  let currAchievement = userAchievements[0] || [];
  return (
    <div className="flex flex-col items-center justify-around w-5/12 p-5 border-2 bg-zinc-700 border-zinc-700 rounded-xl">
      <img src={currAchievement.icon} className="h-52" />
      <h2 class="text-2xl tracking-widest">"{currAchievement.title}"</h2>
    </div>
  )
}

export default AchievementWidget;