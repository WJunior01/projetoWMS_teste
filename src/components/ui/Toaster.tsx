import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToasterState {
  toasts: Toast[];
}

// Create a global event emitter for toasts
const toastEventTarget = new EventTarget();

// Toast event type
interface ToastEvent extends CustomEvent {
  detail: {
    message: string;
    type: ToastType;
  };
}

// Global toast function
export function toast(message: string, type: ToastType = 'info') {
  const event = new CustomEvent('toast', {
    detail: { message, type },
  });
  
  toastEventTarget.dispatchEvent(event);
}

export function Toaster() {
  const [state, setState] = useState<ToasterState>({ toasts: [] });

  useEffect(() => {
    const handleToast = (event: Event) => {
      const { message, type } = (event as ToastEvent).detail;
      
      const id = Math.random().toString(36).substring(2, 9);
      
      setState((prev) => ({
        toasts: [...prev.toasts, { id, message, type }],
      }));
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        setState((prev) => ({
          toasts: prev.toasts.filter((toast) => toast.id !== id),
        }));
      }, 5000);
    };
    
    toastEventTarget.addEventListener('toast', handleToast);
    
    return () => {
      toastEventTarget.removeEventListener('toast', handleToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setState((prev) => ({
      toasts: prev.toasts.filter((toast) => toast.id !== id),
    }));
  };

  // Map toast type to tailwind classes
  const getToastClasses = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-success-500 text-white';
      case 'error':
        return 'bg-danger-500 text-white';
      case 'warning':
        return 'bg-warning-500 text-white';
      case 'info':
      default:
        return 'bg-info-500 text-white';
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      {state.toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center justify-between p-4 rounded-md shadow-lg ${getToastClasses(
            toast.type
          )}`}
          role="alert"
        >
          <span>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-4 p-1 rounded-full hover:bg-white/10"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}