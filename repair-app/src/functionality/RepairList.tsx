import React from 'react';

interface Repair {
  id: string;
  description: string;
  fixType: string;
  email: string;
  date: string;
}

interface RepairListProps {
  repairs: Repair[];
}

const RepairList: React.FC<RepairListProps> = ({ repairs }) => {
  return (
    <div className="space-y-4">
      {repairs.map((repair) => (
        <div key={repair.id} className="bg-white shadow-md rounded p-4 border border-gray-200">
          <p><strong>Beskrivelse:</strong> {repair.description}</p>
          <p><strong>Type fiks:</strong> {repair.fixType}</p>
          <p><strong>Dato:</strong> {repair.date}</p>
          <p><strong>E-post:</strong> {repair.email}</p>
        </div>
      ))}
    </div>
  );
};

export default RepairList;