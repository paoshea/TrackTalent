import { MailCheck } from "lucide-react";

interface Props {
  email: string;
  onResend: () => void;
  isResending: boolean;
}

export function EmailVerification({ email, onResend, isResending }: Props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-indigo-100 rounded-full">
        <MailCheck className="w-6 h-6 text-indigo-600" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-center text-gray-900">
        Verify your email
      </h3>
      <p className="mt-2 text-sm text-center text-gray-600">
        We sent a verification link to {email}. Click the link to verify your
        account.
      </p>
      <button
        onClick={onResend}
        disabled={isResending}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isResending ? "Sending..." : "Resend verification email"}
      </button>
    </div>
  );
}
