import DashboardIcon from '@mui/icons-material/Dashboard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatIcon from '@mui/icons-material/Chat';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export const menuItems = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Expense',   path: '/expense',   icon: <AttachMoneyIcon /> },
  { label: 'Chat',      path: '/chat',      icon: <ChatIcon /> },
  { label: 'Help',      path: '/help',      icon: <HelpOutlineIcon /> },
];
