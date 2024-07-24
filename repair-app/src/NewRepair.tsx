import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

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
    <form onSubmit={handleSubmit} className="mb-4 space-y-4">
      <div>
        <label className="block text-gray-700">Beskrivelse:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Repair description"
          className="border p-2 rounded w-full shadow"
          required
        />
      </div>
      <div>
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
      </div>
      <div>
        <label className="block text-gray-700">E-post:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="border p-2 rounded w-full shadow"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-700 w-full">
        Add Repair
      </button>
    </form>
  );
};

export default NewRepair;