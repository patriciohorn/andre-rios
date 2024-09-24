import { useEffect, useState } from 'react';
import { Link } from '@/components/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import MexicoFlag from '../assets/mexico.svg';
import USFlag from '../assets/us.svg';

export function LanguageDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the user has already selected a language
    const languageSelected = localStorage.getItem('languageSelected');
    if (!languageSelected) {
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = (lang: string) => {
    localStorage.setItem('languageSelected', 'true');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="p-10">
        <DialogHeader>
          <DialogTitle>Choose Your Language / Selecciona tu Idioma</DialogTitle>
          <DialogDescription>
            Select your preferred language. / Seleccione tu idioma preferido.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {/* Handle language selection */}
          <div className="group hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer">
            <a
              href="/"
              onClick={() => handleLanguageSelect('es')}
              className="flex flex-col gap-2 items-center">
              <div className="rounded-md overflow-hidden h-24">
                <img
                  src={MexicoFlag.src}
                  alt="Mexico flag"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-muted-foreground group-hover:text-gray-900 text-sm">
                Español
              </span>
            </a>
          </div>
          <div className="group hover:bg-gray-200 p-2 rounded-lg transition-colors duration-200 ease-in-out cursor-pointer">
            <a
              href="/en"
              onClick={() => handleLanguageSelect('es')}
              className="flex flex-col gap-2 items-center">
              <div className="rounded-md overflow-hidden h-24">
                <img src={USFlag.src} alt="US flag" className="w-full h-full object-cover" />
              </div>
              <span className="text-muted-foreground group-hover:text-gray-900 text-sm">
                English
              </span>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
