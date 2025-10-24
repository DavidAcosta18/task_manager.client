import type React from 'react';
import { ReactQueryProvider } from './react-query-provider';
import { StyleProvider } from '@ant-design/cssinjs';
import { AntDProvider } from './antd-provider';
import { GlobalMessageHandler } from './global-message-handler';
import { StorageProvider } from '../context/storage/storage-context.provider';
import { AuthProvider } from '../context/auth/auth-context.provider';
import { AbilityProvider } from '../context/ability/ability-context.provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <StyleProvider layer>
        <AntDProvider>
          <GlobalMessageHandler />
          <StorageProvider>
            <AuthProvider>
              <AbilityProvider>{children}</AbilityProvider>
            </AuthProvider>
          </StorageProvider>
        </AntDProvider>
      </StyleProvider>
    </ReactQueryProvider>
  );
}
