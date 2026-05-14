import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () =>{
      try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok){
          throw new Error("Failed to fetch data")
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error){
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(data => setUsers(data));
  }, []);

  if (loading) return <div className="app-shell"><h2 className="status-message">Loading...</h2></div>;
  if (error) return <div className="app-shell"><h2 className="status-message">Error: {error}</h2></div>;

  return (
    <div className="app-shell">
      <main className="users-app">
        <h1>SIMPLE USER DIRECTORY</h1>
        <div className="users-grid">
          {users.slice(0, 5).map(user => (
            <div key={user.id} className="user-card">
              <div className="user-icon" aria-hidden="true" />
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p className="company-line">
                  <span className="company-label">Company:</span> {user.company.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <p className="made-by">Made by: Edriane Paul Domanico</p>
      <p style={{ fontSize: '0.7rem' }}>PELEC202 (BSIT2A)</p>
    </div>
  );
}

export default App
