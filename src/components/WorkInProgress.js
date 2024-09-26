import Header from '@/components/Header';

export default function WorkInProgress() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-[#008751] mb-4">Work in Progress</h1>
        <p className="text-xl mb-8 max-w-2xl">
          Our team is working on building out more functionalities. Stay tuned for updates!
        </p>
      </main>
    </div>
  );
}