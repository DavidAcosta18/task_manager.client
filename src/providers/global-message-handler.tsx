import { useEffect } from 'react';
import { EventBusTypes } from '../event-bus';

export function GlobalMessageHandler({
  messageApi,
}: {
  messageApi: {
    error: (text: string) => void;
    info: (text: string) => void;
    success: (text: string) => void;
  };
}) {
  useEffect(() => {
    const onError = (e: Event) => {
      const customEvent = e as CustomEvent<{ type: 'error'; text: string }>;
      messageApi[customEvent.detail.type](customEvent.detail.text);
    };

    document.addEventListener(EventBusTypes.SHOW_ERROR, onError as EventListener);
    return () => document.removeEventListener(EventBusTypes.SHOW_ERROR, onError as EventListener);
  }, []);

  return null;
}
