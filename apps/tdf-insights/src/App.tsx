import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [data, setData] = useState<{ message: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/api', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>{data ? data.message : 'Loadng...'}</h1>
    </div>
  );
};

export default App;