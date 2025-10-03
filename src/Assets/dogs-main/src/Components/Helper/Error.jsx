import React from 'react';

const Error = ({ error, children }) => {
  if (!error) return null;
  return (
    <p style={{ color: '#f31', margin: '1rem 0' }}>
      {error.split(/(<strong>|<\/strong>)/g).map((part, index, arr) => {
        if (part === '<strong>' || part === '</strong>') return null;
        if (index > 0 && arr[index - 1] === '<strong>') {
          return <strong key={index}>{part}</strong>;
        }
        return part;
      })}
    </p>
  );
};

export default Error;
