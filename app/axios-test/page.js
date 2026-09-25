"use client";

import { useState } from "react";
import api from "@/lib/api/axios";

export default function AxiosTestPage() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function testApi() {
    console.log("1. Button clicked");

    try {
      setLoading(true);
      setResult(null);
      setError(null);

      console.log("2. Sending Axios request...");

      const response = await api.get("/test");

      console.log("3. Axios response:", response);

      setResult(response.data);
    } catch (err) {
      console.error("4. Axios error:", err);
      setError(err);
    } finally {
      console.log("5. Request finished");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Axios Test
      </h1>

      <button
        type="button"
        onClick={testApi}
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Sending..." : "Test API"}
      </button>

      {result && (
        <div className="mt-6 rounded-lg border bg-green-50 p-5">
          <h2 className="mb-2 font-semibold text-green-700">
            Success
          </h2>

          <pre>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-lg border bg-red-50 p-5">
          <h2 className="mb-2 font-semibold text-red-700">
            Error
          </h2>

          <pre>
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}