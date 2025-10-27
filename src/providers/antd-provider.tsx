import { type ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export function AntDProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#023a78',
          colorLink: '#f46f2e',
          colorPrimaryHover: '#bfe7f4',
          colorBgContainer: 'hsla(90, 100%, 96.47058823529412%, 0)',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
