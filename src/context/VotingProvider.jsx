import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../utils/constants';
import VoteABI from '../utils/VoteABI.json';
import { VotingContext } from './VotingContext';

export const VotingProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [candidates, setCandidates] = useState([]);
    const [candidatesCount, setCandidatesCount] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProvider = () => {
        if (window.ethereum) {
            return new ethers.BrowserProvider(window.ethereum);
        }
        return null;
    };

    const getContract = async (signerOrProvider) => {
        return new ethers.Contract(CONTRACT_ADDRESS, VoteABI, signerOrProvider);
    };

    const checkIfWalletIsConnected = async () => {
        const provider = getProvider();
        if (!provider) return;

        try {
            const accounts = await provider.listAccounts();
            if (accounts.length > 0) {
                const address = accounts[0].address;
                setAccount(address);
                await fetchData(address);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const refreshData = async () => {
        if (account) await fetchData(account);
    }

    const fetchData = async (userAddress) => {
        setIsLoading(true);
        setError(null);
        try {
            const provider = getProvider();
            if (!provider) return;
            const contract = await getContract(provider);

            // Check Admin
            const adminAddress = await contract.admin();
            setIsAdmin(adminAddress.toLowerCase() === userAddress.toLowerCase());

            // Check if voted
            const voted = await contract.voters(userAddress);
            setHasVoted(voted);

            // Get Candidates Count
            const count = await contract.candidatesCount();
            const countNumber = Number(count);
            setCandidatesCount(countNumber);

            // Get Candidates
            const candidatesList = [];
            for (let i = 1; i <= countNumber; i++) {
                const candidate = await contract.candidates(i);
                candidatesList.push({
                    id: Number(candidate.id),
                    name: candidate.name,
                    party: candidate.party,
                    aadhaar: candidate.aadhaar,
                    voteCount: Number(candidate.voteCount),
                });
            }
            setCandidates(candidatesList);

        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load blockchain data. Please ensure you are on the correct network.");
        } finally {
            setIsLoading(false);
        }
    };

    const connectWallet = async () => {
        const provider = getProvider();
        if (!provider) {
            setError("Please install MetaMask!");
            return;
        }

        try {
            setIsLoading(true);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            await fetchData(address);
        } catch (err) {
            console.error(err);
            setError("Failed to connect wallet.");
        } finally {
            setIsLoading(false);
        }
    };

    const addCandidate = async (name, party, aadhaar) => {
        setError(null);
        setIsLoading(true);
        try {
            const provider = getProvider();
            if (!provider) throw new Error("No provider");
            const signer = await provider.getSigner();
            const contract = await getContract(signer);

            const tx = await contract.addCandidate(name, party, aadhaar);
            await tx.wait();

            await fetchData(account);
        } catch (err) {
            console.error(err);
            setError(err.reason || err.message || "Transaction failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const vote = async (candidateId) => {
        setError(null);
        setIsLoading(true);
        try {
            const provider = getProvider();
            if (!provider) throw new Error("No provider");
            const signer = await provider.getSigner();
            const contract = await getContract(signer);

            const tx = await contract.vote(candidateId);
            await tx.wait();

            await fetchData(account);
        } catch (err) {
            console.error(err);
            setError(err.reason || err.message || "Vote failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await checkIfWalletIsConnected();
        };
        init();

        // Listen for account changes
        if (window.ethereum) {
            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    fetchData(accounts[0]);
                } else {
                    setAccount(null);
                    setCandidates([]);
                }
            };

            window.ethereum.on('accountsChanged', handleAccountsChanged);

            return () => {
                window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, []);

    return (
        <VotingContext.Provider
            value={{
                account,
                candidates,
                candidatesCount,
                isAdmin,
                hasVoted,
                isLoading,
                error,
                connectWallet,
                addCandidate,
                vote,
                refreshData
            }}
        >
            {children}
        </VotingContext.Provider>
    );
};

export default VotingProvider;
