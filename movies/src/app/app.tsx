// import { BrowserRouter } from 'react-router-dom';
// import { lazy } from 'react';
import MoviesApp from './MoviesApp';
import useAuthStore from 'streambox/useAuthStore';

export function App() {
  const auth = useAuthStore({});

  console.log({ auth });

  if (!auth.user) {
    return <div>Please login to view music</div>;
  }

  return (
    <div>
      <MoviesApp />
    </div>
  );
}

export default App;


