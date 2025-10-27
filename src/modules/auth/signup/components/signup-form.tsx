import { useMemo } from 'react';
import { Button, Form, Input, message } from 'antd';
import type { RuleObject } from 'antd/es/form';
import type { StoreValue } from 'antd/es/form/interface';
import { useSignup, type SignupBody } from '../hooks/use-signup';
import { useNavigate } from 'react-router-dom';

import { useFormErrorHandler } from '../../../../hooks/use-form-error-handler';
import { REQUIRED_TEXT } from '../../../../constants';
import { LOGIN_ROUTE } from '../../../../routes/routes';

export function SignupForm() {
  const navigate = useNavigate();
  const fieldTranslation = useMemo(() => {
    return {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      role: 'role',
      password: 'password',
      confirmPassword: 'confirmPassword',
    };
  }, []);
  const [invalidateForm, form] = useFormErrorHandler();

  const { mutate: signup, isPending: isLoading } = useSignup({
    onSuccess: () => {
      message.success('.success');
      navigate(LOGIN_ROUTE, {
        replace: true,
      });
    },
    onError: (error: any) => {
      invalidateForm(error);
    },
  });

  const validateConfirmPassword = ({ getFieldValue }: StoreValue) => ({
    validator(_: RuleObject, value: string) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('passwords do not match'));
    },
  });

  const validateSecurePassword = () => ({
    validator(_: RuleObject, value: string) {
      if (!value || value.length < 8) {
        return Promise.reject(new Error('password should have a min length of 8'));
      }
      if (!value.match(/[A-Z]/)) {
        return Promise.reject(new Error('password should have a uppercase'));
      }
      if (!value.match(/[a-z]/)) {
        return Promise.reject(new Error('password should have a lowercase'));
      }
      if (!value.match(/\d/)) {
        return Promise.reject(new Error('password should have a number'));
      }
      if (!value.match(/\W/)) {
        return Promise.reject(new Error('password should have a specialCharacter'));
      }
      return Promise.resolve();
    },
  });

  const onFinish = (values: SignupBody) => {
    signup({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  return (
    <Form layout="vertical" className="mt-8 w-full " onFinish={onFinish} form={form}>
      <Form.Item label={fieldTranslation.firstName} name="firstName" rules={REQUIRED_TEXT}>
        <Input placeholder={fieldTranslation.firstName} disabled={isLoading} />
      </Form.Item>
      <Form.Item label={fieldTranslation.lastName} name="lastName" rules={REQUIRED_TEXT}>
        <Input placeholder={fieldTranslation.lastName} disabled={isLoading} />
      </Form.Item>
      <Form.Item label={fieldTranslation.email} name="email" rules={REQUIRED_TEXT}>
        <Input type="email" placeholder={fieldTranslation.email} disabled={isLoading} />
      </Form.Item>

      <Form.Item
        label={fieldTranslation.password}
        name="password"
        rules={[...REQUIRED_TEXT, validateSecurePassword()]}
      >
        <Input type="password" placeholder={fieldTranslation.password} disabled={isLoading} />
      </Form.Item>
      <Form.Item
        label={fieldTranslation.confirmPassword}
        name="confirmPassword"
        dependencies={['password']}
        rules={[validateConfirmPassword]}
      >
        <Input
          type="password"
          placeholder={fieldTranslation.confirmPassword}
          disabled={isLoading}
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" className="w-full mt-6" loading={isLoading}>
        Submit
      </Button>
      <Button
        type="link"
        className="w-full mt-2"
        onClick={() => navigate(LOGIN_ROUTE)}
        disabled={isLoading}
      >
        Already Have Account?
      </Button>
    </Form>
  );
}
