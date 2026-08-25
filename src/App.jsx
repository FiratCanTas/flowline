import { Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Deals from './pages/Deals';
import Activities from './pages/Activities';
import NotFound from './pages/NotFound';
import AppShell from './components/layout/AppShell';
import ContactDetail from './pages/ContactDetail';
import ContactNew from './pages/ContactNew';
import ContactEdit from './pages/ContactEdit';
import DealNew from './pages/DealNew';
import DealEdit from './pages/DealEdit';
import DealDetail from './pages/DealDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/:id" element={<ContactDetail />} />
        <Route path="/contacts/:id/edit" element={<ContactEdit />} />
        <Route path="/contacts/new" element={<ContactNew />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/deals/:id" element={<DealDetail />} />
        <Route path="/deals/:id/edit" element={<DealEdit />} />
        <Route path="/deals/new" element={<DealNew />} />
        <Route path="/activities" element={<Activities />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
