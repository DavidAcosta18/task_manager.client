import { useMutation } from '@tanstack/react-query';

import { apiAxiosInstance, type HttpError, type MutationCallback } from '../../../../api/config';
import type { RolesEnum } from '../../../../types/roles.enum';

export interface SignupBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RolesEnum;
}

export function useSignup({ onSuccess, onError }: MutationCallback<void>) {
  return useMutation<void, HttpError, SignupBody>({
    mutationFn: formData => apiAxiosInstance.post('/users/sign-up', formData),
    onSuccess,
    onError,
  });
}
