import { type ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export function AntDProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFB000',
          colorLink: '#FFB000',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
