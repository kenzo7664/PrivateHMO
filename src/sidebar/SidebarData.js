import {
  faClockRotateLeft,
  faEnvelope,
  faFile,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as FaIcons from 'react-icons/fa'

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/dash',
    icon: <FaIcons.FaTachometerAlt />,
    cName: 'nav-text',
  },
  {
    title: 'Search Enrollee',
    path: '/SearchEnrollee',
    icon: <FaIcons.FaSearch />,
    cName: 'nav-text',
  },
  {
    title: 'Claims Submitted',
    path: '/submittedList',
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    cName: 'nav-text',
  },
  {
    title: 'Claims History',
    path: '/List',
    icon: <FontAwesomeIcon icon={faClockRotateLeft} />,
    cName: 'nav-text',
  },
  {
    title: 'New Claims',
    path: '/Claims',
    icon: <FontAwesomeIcon icon={faFile} />,
    cName: 'nav-text',
  },
]
