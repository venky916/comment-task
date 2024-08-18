// Sorting functions
export const sortByTime = (comments) => {
    return [...comments].sort((a, b) => new Date(b.time) - new Date(a.time));
};

export const sortByReactions = (comments) => {
    return [...comments].sort((a, b) => {
        const totalReactionsA = a.reactions.reduce(
            (sum, reaction) => sum + reaction.count,
            0,
        );
        const totalReactionsB = b.reactions.reduce(
            (sum, reaction) => sum + reaction.count,
            0,
        );
        return totalReactionsB - totalReactionsA;
    });
};

export const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const difference = now - new Date(timestamp).getTime(); // Difference in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};