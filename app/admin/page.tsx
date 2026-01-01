"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && (!user || !isAdmin)) {
      router.push("/");
    }
  }, [user, isAdmin, loading, router, mounted]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Newsletter Subscribers */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Newsletter</h2>
          <p className="text-3xl font-bold text-accent-primary">-</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Total subscribers
          </p>
        </div>

        {/* Total Comments */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Comments</h2>
          <p className="text-3xl font-bold text-accent-primary">-</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Total comments
          </p>
        </div>

        {/* Total Users */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-2">Users</h2>
          <p className="text-3xl font-bold text-accent-primary">-</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Registered users
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400">
            • View and manage newsletter subscribers in Appwrite Console
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • Monitor and moderate comments across all posts
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • Manage user accounts and permissions
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            • Access analytics and insights (coming soon)
          </p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> You can extend this dashboard by fetching
          data from Appwrite and displaying real-time statistics. Check the
          Appwrite documentation for API details.
        </p>
      </div>
    </div>
  );
}
