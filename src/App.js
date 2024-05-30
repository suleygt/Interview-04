import React, {  createContext, useContext, useEffect, useState } from "react";

const UserConext = createContext();

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
    <UserConext.Provider value={{ userState, setUserState}}>
      <UserList />
    </UserConext.Provider>
  );

  // KODUNUZ BURAYA GELECEK
};

const UserList = () => {
  const { userState } = useContext(UserConext);

  return (
    <div>
      {Object.keys(userState).map(([user, isOnline]) => (
        <div key={user}>
        {user}: {isOnline ? "🟢" : "🔴"}
        </div>
      ))}
    </div>
  );
  // KODUNUZ BURAYA GELECEK
};

export default App;
