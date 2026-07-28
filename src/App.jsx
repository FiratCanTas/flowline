import { Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/deals" element={<Deals />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
