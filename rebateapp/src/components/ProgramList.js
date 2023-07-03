import React from 'react';

const ProgramList = ({ programs }) => {
  if (programs.length === 0) {
    return <p>No rebate programs found.</p>;
  }

  return (
    <ul className="list-group">
      {programs.map((program) => (
        <li className="list-group-item" key={program.id}>
          <h3>{program.name}</h3>
          <p>Rebate Amount: {program.rebate_amount}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProgramList;