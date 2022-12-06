import React from 'react';

const Card = function () {

    return (
        <div className="h-40 w-9/12 p-1 mx-auto my-5 bg-zinc-700 rounded-2xl">
            <div className="flex flex-row h-full">
                <div className="flex-none w-1/6 mx-4">
                    <img className="object-contain h-full w-24 mx-auto my-auto" 
                    src="https://img.icons8.com/dusk/512/babys-room.png" />
                </div>
                <div className="flex-grow h-1/1 w-2/4">
                    <h2 className="font-bold text-xl py-3">
                        Lorem Ipsum
                    </h2>
                    <div className="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Fusce tempor augue in enim tincidunt, nec eleifend urna fermentum.
                    </div>
                    <div className="text-sm py-3">
                        <span className="font-semibold text-green-300">Lesson:</span> Lorem ipsum dolor sit.
                    </div>
                </div>
                <div className="flex-1 w-1/4 h-full justify-center items-center">
                    <div className="font-bold text-center text-green-300 text-2xl my-14">
                        +50 AP
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;