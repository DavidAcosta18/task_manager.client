import { PublicLayout } from '../../../../components/layouts/public-layout';

import { SignupForm } from '../components/signup-form';

export function SignUpPage() {
  return (
    <PublicLayout>
      <div className="flex flex-col items-center justify-center w-full h-full px-16 ">
        <div className="mt-8 flex flex-col items-center justify-center gap-1.5">
          <h1 className="text-base font-bold"> Sign Up</h1>
          <p className="text-base "> Create your account</p>
        </div>
        <SignupForm />
      </div>
    </PublicLayout>
  );
}
