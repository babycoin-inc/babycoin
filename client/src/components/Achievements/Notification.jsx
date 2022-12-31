import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Notification = ( {isVisible, setIsVisible, achievement} ) => {

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="absolute bottom-5 right-0 m-6 p-10 rounded-2xl bg-zinc-900 shadow-xl text-gray-300"
                    key="modal"
                    initial={{ x: '-40%', opacity: 0}}
                    animate={{ 
                        opacity: 1, 
                        transition: {
                            delay: 2, 
                            duration: 1.2
                        }
                    }}
                    exit={{ opacity: 0}}
                    transition={{ duration: 1.2 }}
                >   
                    <motion.img
                        className="object-scale-down h-40 w-40"
                        key={achievement.id}
                        src={achievement.icon}
                        animate={{
                            rotate: [0, -5, 5, 0],
                            transition: { 
                                duration: 1, 
                                repeat: Infinity, 
                                repeatDelay: 1.5, 
                                type: "spring" },
                          }}
                    />
                    <div className="text-yellow-300 text-sm text-center py-2">Achievement Unlocked:</div>
                    <div className="text-center font-bold text-lg p-2">{achievement.title}</div>
                    <div className="text-green-300 text-sm text-center">{achievement.points}+ AP</div>
                    <div
                        className="text-xs text-center pt-5 hover:cursor-pointer"
                        onClick={() => setIsVisible(false)}
                    >Dismiss
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;