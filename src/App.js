import React, {  createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const App = () =>  {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const users = Object.keys(userState);
      const randomUser = users[Math.floor(Math.random() * users.length)];
      setUserState(prevState => ({
        ...prevState,
        [randomUser]: !prevState[randomUser]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [userState]);

  return (
   <UserContext.Provider value={{ userState, setUserState}}>
      <UserList />
    </UserContext.Provider>
  );

  // KODUNUZ BURAYA GELECEK
};

const UserList = () => {
  const { userState, setUserState } = useContext(UserContext);

  const handleMouseEnter = (name) => {
    setUserState(prevState => ({
        ...prevState,
        [name]: true
    }));
};

const handleMouseLeave = (name) => {
    setUserState(prevState => ({
        ...prevState,
        [name]: false
    }));
};


return (
  <div className="user-list">
    <h2 className="user-list-title">User List</h2>
      {Object.entries(userState).map(([name, isOnline]) => (
          <div
              key={name}
              className={`user-item ${isOnline ? "online" : "offline"}`}
              onMouseEnter={() => handleMouseEnter(name)}
              onMouseLeave={() => handleMouseLeave(name)}
          >
            <div className="status-icon">
                        {isOnline ? "🟢" : "🔴"}
                    </div><div className="name">{name}:</div>
                   
                    <div className="status-text">
                         {isOnline ? "Online" : "Offline"}
                    </div>
                </div>
            ))}
        </div>
    );
};

  // KODUNUZ BURAYA GELECEK


export default App;
