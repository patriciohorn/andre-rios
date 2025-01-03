import { Info, CalendarIcon } from 'lucide-react';

export default function AlertError({ errorMessage }: { errorMessage: string }) {
  return (
    <div
      className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-300 animate-fade-down animate-duration-300 animate-ease-in-out"
      role="alert">
      <Info className="flex-shrink-0 inline w-5 h-5 fill-red-800 text-red-50 me-3" />
      {errorMessage}
    </div>
  );
}
