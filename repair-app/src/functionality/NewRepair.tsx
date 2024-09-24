import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface NewRepairProps {
  addRepair: (description: string, fixType: string, email: string, date: string) => Promise<void>;
}

const NewRepair: React.FC<NewRepairProps> = ({ addRepair }) => {
  const [description, setDescription] = useState('');
  const [fixType, setFixType] = useState('Liten');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    await addRepair(description, fixType, email, date);
    setDescription('');
    setFixType('Liten');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-4 border-4 rounded-lg border-gray-800">
      <div className='p-4'>
        <label className="block text-gray-700">Beskrivelse:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Repair description"
          className="border p-2 rounded w-full shadow"
          required
        />
      
    
        <label className="block text-gray-700">Type fiks:</label>
        <select
          title="Type"
          value={fixType}
          onChange={(e) => setFixType(e.target.value)}
          className="border p-2 rounded w-full shadow"
          required
        >
          <option value="Liten">Liten</option>
          <option value="Stor">Stor</option>
        </select>

        <label className="block text-gray-700">E-post:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="border p-2 rounded w-full shadow"
          required
        />
      <button type="submit" className="bg-blue-100 text-black p-2 shadow hover:bg-blue-300 border-2 border-gray-800 rounded-lg w-full mt-4">
        Add Repair
      </button>
      </div>
    </form>
  );
};

export default NewRepair;