import React from 'react';

const Card = function ( { achievement, status } ) {

    const locked = 'grayscale opacity-70 h-40 w-9/12 p-1 mx-auto my-5 bg-zinc-700 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:transform hover:scale-[102%]';
    const unlocked = 'h-40 w-9/12 p-1 mx-auto my-5 bg-zinc-700 rounded-2xl shadow-lg transition-transform duration-500 ease-in-out hover:transform hover:scale-[102%]'

    return (
        <div className={status ? unlocked : locked}>
            <div className="flex flex-row h-full">
                <div className="flex-none w-1/6 mx-4">
                    <img className="object-contain h-full w-24 mx-auto my-auto filter-grayscale-100" 
                    src={achievement.icon} />
                </div>
                <div className="flex-grow h-1/1 w-2/4">
                    <h2 className="font-bold text-xl py-3 text-yellow-300">
                        {achievement.title}
                    </h2>
                    <div className="text-sm">
                        {achievement.description}
                    </div>
                    {achievement.lesson ? 
                    <div className="text-sm py-3">
                        <span className="font-semibold text-green-300"> Lesson: </span> {achievement.lesson}
                    </div> : null}
                </div>
                <div className="flex-1 w-1/4 h-full justify-center items-center">
                    <div className="font-bold text-center text-green-300 text-2xl my-14">
                        {status ? `+${achievement.points}`
                        : achievement.points}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;