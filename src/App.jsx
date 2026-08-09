import { Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';
import AppShell from './components/layout/AppShell';
import ContactDetail from './pages/ContactDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/activities" element={<Activities />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
