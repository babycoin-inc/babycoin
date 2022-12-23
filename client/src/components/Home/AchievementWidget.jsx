import React from 'react';

function AchievementWidget({ userAchievements }) {
  let currAchievement = userAchievements[0] || [];
  return (
    <div className="flex flex-col justify-around w-5/12 p-5 border-2 bg-zinc-700 border-zinc-700 rounded-xl">
      <h2 className="text-left text-zinc-400">Achievements:</h2>
      <img src={currAchievement.icon} className="h-52 mx-auto" />
      <h2 className="text-2xl tracking-widest mx-auto">"{currAchievement.title}"</h2>
    </div>
  )
}

export default AchievementWidget;