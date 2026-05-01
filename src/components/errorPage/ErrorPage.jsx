export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-7xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-gray-500 mt-3">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-3 bg-black text-white rounded-xl hover:opacity-90 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
