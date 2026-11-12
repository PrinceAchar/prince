"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DebugAuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  const testAuthEndpoints = async () => {
    setLoading(true);
    setError("");
    setResults(null);
    
    try {
      // Test 1: Check environment variables
      const envCheck = {
        SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID: process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID ? "Set" : "Missing",
        NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? "Set" : "Missing",
      };
      
      // Test 2: Check OpenID configuration
      const openidConfig = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/.well-known/openid-configuration`)
        .then(res => res.ok ? res.json() : { error: res.status })
        .catch(err => ({ error: err.message }));
      
      // Test 3: Check Customer Account API endpoint
      const apiConfig = await fetch(`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/.well-known/customer-account-api`)
        .then(res => res.ok ? res.json() : { error: res.status })
        .catch(err => ({ error: err.message }));
      
      setResults({
        environment: envCheck,
        openidConfig,
        apiConfig,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug Page</h1>
        
        <div className="mb-8">
          <button
            onClick={testAuthEndpoints}
            disabled={loading}
            className="bg-red text-white px-6 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Authentication Endpoints"}
          </button>
        </div>

        {error && (
          <div className="bg-red/10 border border-red/20 p-4 rounded-lg mb-6">
            <h2 className="text-red font-bold mb-2">Error:</h2>
            <p className="text-red">{error}</p>
          </div>
        )}

        {results && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Environment Variables</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(results.environment, null, 2)}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">OpenID Configuration</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(results.openidConfig, null, 2)}
              </pre>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Customer Account API</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {JSON.stringify(results.apiConfig, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => router.push("/account/login")}
            className="bg-blue text-white px-6 py-3 rounded-lg mr-4"
          >
            Go to Login Page
          </button>
          <button
            onClick={() => router.push("/account")}
            className="bg-gray text-white px-6 py-3 rounded-lg"
          >
            Go to Account Page
          </button>
        </div>
      </div>
    </div>
  );
}