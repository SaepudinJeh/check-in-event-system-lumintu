import FrontPage from '../views/pages/frontPage';
import ScanPage from '../views/pages/scanPage';
import ParticipantPage from '../views/pages/participantsPage';
import SessionPage from '../views/pages/sessionPage';
import ParticipantDetail from '../views/pages/participantDetail';
import ActiveSession from '../views/pages/activeSession';

const routes = {
  '/': FrontPage,
  '/active-session': ActiveSession,
  '/scan/:id': ScanPage,
  '/participants': ParticipantPage,
  '/session': SessionPage,
  '/participant/:id': ParticipantDetail
};

export default routes;
