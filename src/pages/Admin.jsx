import React, { useState } from 'react';
import { useVoting } from '../context/VotingContext';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { Plus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { addCandidate, isAdmin, isLoading, error } = useVoting();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        party: '',
        aadhaar: ''
    });

    if (!isAdmin) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h2>
                    <p className="text-slate-600 mb-6">Only the contract administrator can access this page.</p>
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                </div>
            </Layout>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCandidate(formData.name, formData.party, formData.aadhaar);
            setFormData({ name: '', party: '', aadhaar: '' });
            alert("Candidate added successfully!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
                    <p className="text-slate-600">Manage candidates and oversee the election.</p>
                </div>

                <Card>
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Plus className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900">Add New Candidate</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Candidate Name"
                            placeholder="Enter full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            label="Party Name"
                            placeholder="Enter party name"
                            value={formData.party}
                            onChange={(e) => setFormData({ ...formData, party: e.target.value })}
                            required
                        />
                        <Input
                            label="Aadhaar ID / Unique ID"
                            placeholder="Enter identification number"
                            value={formData.aadhaar}
                            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                            required
                        />

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full mt-4"
                        >
                            Add Candidate
                        </Button>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default Admin;
