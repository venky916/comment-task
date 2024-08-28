const sortCommentsByTime = (comments) => {
    return comments
        .map(comment => ({
            ...comment,
            replies: sortCommentsByTime(comment.replies || []),
        }))
        .sort((a, b) => new Date(b.time) - new Date(a.time));
};

// Sorting function
export const sortByTime = (comments) => {
    return sortCommentsByTime(comments);
};

// Recursive function to sort comments by reactions
const sortCommentsByReactions = (comments) => {
    return comments
        .map(comment => ({
            ...comment,
            replies: sortCommentsByReactions(comment.replies || []),
        }))
        .sort((a, b) => {
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

// Sorting function
export const sortByReactions = (comments) => {
    return sortCommentsByReactions(comments);
};

export const countComments = (comments) => {
    return comments.reduce((count, comment) => {
        // Count the current comment and recursively count its replies
        return count + 1 + countComments(comment.replies || []);
    }, 0);
};
export const getTimeDifference = (timestamp) => {
    const now = Date.now();
    const difference = now - new Date(timestamp).getTime(); // Difference in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} day${days>1 ? "s" : ""} ago`
        
    }else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
};