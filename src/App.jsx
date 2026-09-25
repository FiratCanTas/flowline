import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
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
import ActivityNew from './pages/ActivityNew';
import ActivityEdit from './pages/ActivityEdit';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<AppShell />}>
          <Route
            index
            element={<Dashboard />}
            handle={{ title: 'Dashboard Overview and Analytics' }}
          />
          <Route path="/contacts" element={<Contacts />} handle={{ title: 'Contacts' }} />
          <Route
            path="/contacts/:id"
            element={<ContactDetail />}
            handle={{ title: 'Contact Detail' }}
          />
          <Route
            path="/contacts/:id/edit"
            element={<ContactEdit />}
            handle={{ title: 'Edit Contact' }}
          />
          <Route path="/contacts/new" element={<ContactNew />} handle={{ title: 'New Contact' }} />
          <Route path="/deals" element={<Deals />} handle={{ title: 'Deals' }} />
          <Route path="/deals/:id" element={<DealDetail />} handle={{ title: 'Deal Detail' }} />
          <Route path="/deals/:id/edit" element={<DealEdit />} handle={{ title: 'Edit Deal' }} />
          <Route path="/deals/new" element={<DealNew />} handle={{ title: 'New Deal' }} />
          <Route path="/activities" element={<Activities />} handle={{ title: 'Activities' }} />
          <Route
            path="/activities/new"
            element={<ActivityNew />}
            handle={{ title: 'New Activity' }}
          />
          <Route
            path="/activities/:id/edit"
            element={<ActivityEdit />}
            handle={{ title: 'Edit Activity' }}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
