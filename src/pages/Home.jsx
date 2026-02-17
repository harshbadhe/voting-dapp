import React from 'react';
import { useVoting } from '../context/VotingContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';
import { Vote, CheckCircle2, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const { candidates, vote, hasVoted, isLoading, account, connectWallet } = useVoting();

    const handleVote = async (id) => {
        if (!hasVoted) {
            await vote(id);
        }
    };

    if (!account) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full" />
                        <Vote className="w-24 h-24 text-primary relative z-10 drop-shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                    </div>
                    <div className="space-y-4 max-w-lg">
                        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                            Blockchain Voting
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                            A secure, transparent, and decentralized voting system powered by Ethereum.
                            Connect your wallet to participate in the future of governance.
                        </p>
                    </div>
                    <Button onClick={connectWallet} className="px-8 py-3 text-lg">
                        Connect Wallet to Vote
                    </Button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Candidates</h2>
                        <p className="text-slate-600 text-lg">
                            {hasVoted
                                ? "You have already cast your vote. Thank you for participating!"
                                : "Cast your vote for the candidate of your choice."}
                        </p>
                    </div>
                    {hasVoted && (
                        <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-2 rounded-lg flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="font-medium">Vote Casted</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map((candidate, index) => (
                        <motion.div
                            key={candidate.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="flex flex-col gap-4 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <User className="w-24 h-24 text-primary" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        {candidate.party}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm text-slate-500">
                                        Vote Count: <span className="text-slate-900 font-mono text-lg">{candidate.voteCount}</span>
                                    </div>
                                    <div className="text-xs text-gray-500 font-mono">
                                        ID: {candidate.id}
                                    </div>
                                </div>

                                <div className="mt-auto pt-4">
                                    <Button
                                        onClick={() => handleVote(candidate.id)}
                                        disabled={hasVoted || isLoading}
                                        className="w-full"
                                        variant={hasVoted ? 'secondary' : 'primary'}
                                    >
                                        {hasVoted ? 'Voted' : 'Vote Now'}
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}

                    {candidates.length === 0 && (
                        <div className="col-span-full text-center py-12 text-slate-400">
                            No candidates found. Setup candidates in the Admin panel.
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
