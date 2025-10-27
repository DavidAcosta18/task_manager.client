import { useEffect } from 'react';
import eventBus, { EventBusTypes } from '../event-bus';

export function useUnauthorizedHandler(logout: () => void) {
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    eventBus.on(EventBusTypes.UNAUTHORIZED, handleUnauthorized);
    return () => {
      eventBus.off(EventBusTypes.UNAUTHORIZED, handleUnauthorized);
    };
  }, [logout]);
}
