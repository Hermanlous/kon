import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';
import LandingPage from './components/LandingPage';
import NewRepair from './functionality/NewRepair';
import RepairList from './functionality/RepairList';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';

interface Repair {
  id: string;
  description: string;
  fixType: string;
  email: string;
  date: string;
}

const RepairApp: React.FC = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);

  useEffect(() => {
    const fetchRepairs = async () => {
      const querySnapshot = await getDocs(collection(db, 'repairs'));
      const repairData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          description: data.description,
          fixType: data.fixType,
          email: 'hermanrorholtlous@gmail.com',
          date: data.date
        } as Repair;
      });
      setRepairs(repairData);
    };

    fetchRepairs();
  }, []);

  const addRepair = async (description: string, fixType: string, email: string, date: string) => {
    const newRepair = { description, fixType, email, date };
    const docRef = await addDoc(collection(db, 'repairs'), newRepair);
    setRepairs([...repairs, { ...newRepair, id: docRef.id }]);
  };

  return (
    <div className="min-h-screen bg-blue-200 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-4xl bg-blue-50 border-4 border-gray-800 rounded-lg">
        <header className="py-4 border-b-4 rounded-lg border-gray-800">
          <h1 className="text-xl font-semibold text-center" style={{ fontFamily: 'Arial, sans-serif' }}>RepairStuff</h1>
        </header>
        <main className="p-4 bg-blue-50">
          <NewRepair addRepair={addRepair} />
          <RepairList repairs={repairs} />
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<RepairApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;