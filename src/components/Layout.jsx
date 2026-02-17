import React from 'react';
import { useVoting } from '../context/VotingContext';
import { Link } from 'react-router-dom';
import { Vote, ShieldCheck, Loader2 } from 'lucide-react';
import clsx from 'clsx';

const Layout = ({ children }) => {
    const { account, connectWallet, isLoading, isAdmin } = useVoting();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-hidden relative">
            {/* Background Gradients - Sky Theme */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-sky-200/40 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-200/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-white/60 rounded-full blur-[80px]" />
            </div>

            <nav className="fixed top-0 w-full z-50 glass border-b border-white/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:text-primary transition-colors">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Vote className="w-6 h-6 text-primary" />
                            </div>
                            <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                                SecureVote
                            </span>
                        </Link>

                        <div className="flex items-center gap-4">
                            {isAdmin && (
                                <Link to="/admin" className="text-sm font-medium text-muted hover:text-primary transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                            {account ? (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-white/60 hover:bg-white/80 transition-all shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-slate-700">
                                        {account.slice(0, 6)}...{account.slice(-4)}
                                    </span>
                                </div>
                            ) : (
                                <button
                                    onClick={connectWallet}
                                    className={clsx(
                                        "px-6 py-2 rounded-full font-medium text-sm transition-all duration-300",
                                        "bg-primary hover:bg-primary-hover text-white shadow-lg shadow-primary/25",
                                        isLoading && "opacity-80 cursor-wait"
                                    )}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connect Wallet"}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
                {children}
            </main>
        </div>
    );
};

export default Layout;
