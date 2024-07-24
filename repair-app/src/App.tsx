import React, { useState, useEffect } from 'react';
import NewRepair from './NewRepair';
import RepairList from './RepairList';
import './index.css';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';

interface Repair {
  id: string;
  description: string;
  fixType: string;
  email: string;
  date: string;
}

const App: React.FC = () => {
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
          email: data.email,
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
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
      <div className="max-w-lg w-full bg-gray-100 p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Repair App</h1>
        <NewRepair addRepair={addRepair} />
        <RepairList repairs={repairs} />
      </div>
    </div>
  );
};

export default App;