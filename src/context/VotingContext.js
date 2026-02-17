import { createContext, useContext } from 'react';

export const VotingContext = createContext(undefined);

export const useVoting = () => {
    const context = useContext(VotingContext);
    if (!context) {
        throw new Error('useVoting must be used within a VotingProvider');
    }
    return context;
};
