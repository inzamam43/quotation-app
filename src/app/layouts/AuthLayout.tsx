import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Smart Quotation System
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your business quotation assistant
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
