import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router';
import AppShell from './components/layout/AppShell';
import ProtectedRoute from './routes/ProtectedRoute';
import { lazy } from 'react';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const ContactEdit = lazy(() => import('./pages/ContactEdit'));
const ContactNew = lazy(() => import('./pages/ContactNew'));
const Activities = lazy(() => import('./pages/Activities'));
const ActivityEdit = lazy(() => import('./pages/ActivityEdit'));
const ActivityNew = lazy(() => import('./pages/ActivityNew'));
const Deals = lazy(() => import('./pages/Deals'));
const DealDetail = lazy(() => import('./pages/DealDetail'));
const DealEdit = lazy(() => import('./pages/DealEdit'));
const DealNew = lazy(() => import('./pages/DealNew'));

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
