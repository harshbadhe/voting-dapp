import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotingProvider from './context/VotingProvider';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
    return (
        <VotingProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
            </Router>
        </VotingProvider>
    );
}

export default App;
