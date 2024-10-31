// utils/withStyledToast.js
import { toast as baseToast } from 'sonner';

const notificationStyles = {
  success: {
    backgroundColor: '#2ecc71',
    color: '#fff',
    icon: '✅',
  },
  error: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    icon: '❌',
  },
  info: {
    backgroundColor: '#3498db',
    color: '#fff',
    icon: 'ℹ️',
  },
  warning: {
    backgroundColor: '#f39c12',
    color: '#fff',
    icon: '⚠️',
  },
};

export const withStyledToast = (type, message, description = '', duration = 5000) => {
  const style = notificationStyles[type] || notificationStyles.info;

  baseToast(message, {
    description,
    duration,
    icon: style.icon,
    style: {
      backgroundColor: style.backgroundColor,
      color: style.color,
      borderRadius: '8px',
      padding: '16px',
    },
  });
};
