import * as React from 'react';

// Components
import { Button } from '@components/ui/button';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Icons
import { Menu } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

// Image
import logo from '../../assets/logo.png';

// types
import type { NavLink, NavItem } from '@/types';
import { useTranslations } from '@/i18n/utils';

interface Translations {
  'nav.meet': string;
  'nav.procedures': string;
  'nav.gallery': string;
  'nav.virtual': string;
  'nav.contacto': string;
}

interface Paths {
  'nav.meet': string;
  'nav.gallery': string;
  'nav.virtual': string;
  'nav.contacto': string;
}

interface SheetMobileNavProps {
  translations: Translations;
  paths: Paths;
  procedures: Record<string, { title: string; url: string }[]>;
}

export function SheetMobileNav({
  translations,
  paths,
  procedures,
}: SheetMobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (translations) {
      setIsLoaded(true);
    }
  }, [translations]);

  if (!isLoaded) {
    return null;
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="h-8 px-1.5 lg:hidden bg-transparent">
          <span className="sr-only">Desplegar Menú</span>
          <Menu className="size-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col gap-y-5 bg-section">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <div className="h-16">
          <a href="/">
            <div className="sr-only">Inicio</div>
            <img
              src={logo.src}
              alt="Dr. Andrei Ríos logo"
              className="h-10"
            />
          </a>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="mb-20">
            <nav className="flex flex-col gap-1">
              <ul role="list" className="flex flex-col flex-1">
                <li>
                  <a
                    href={paths['nav.meet']}
                    className="flex items-center text-sm font-medium leading-6 text-slate-900 p-2 -mx-2">
                    {translations['nav.meet']}
                  </a>
                </li>

                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between gap-2 [&[data-state=open]>svg]:rotate-90 text-sm text-slate-900 font-medium leading-6 p-2 -mx-2">
                    {translations['nav.procedures']}
                    <ChevronRight className="h-4 w-4 transition-transform text-slate-900" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col space-y-2">
                      {Object.entries(procedures).map(
                        ([category, items], idx) => (
                          <div className="flex flex-col pl-2">
                            <h4 className="text-sm text-slate-900 font-semibold p-2">
                              {category}
                            </h4>
                            <ul className="pl-4">
                              {items?.map((item, i) => (
                                <li key={i}>
                                  <a
                                    href={item.url}
                                    className="flex items-center text-sm leading-6 text-slate-600 p-1 rounded-md">
                                    {item.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <li>
                  <a
                    href={paths['nav.gallery']}
                    className="flex items-center text-sm font-medium leading-6 text-slate-900 p-2 -mx-2">
                    {translations['nav.gallery']}
                  </a>
                </li>

                <li>
                  <a
                    href={paths['nav.contacto']}
                    className="flex items-center text-sm font-medium leading-6 text-slate-900 p-2 -mx-2">
                    {translations['nav.contacto']}
                  </a>
                </li>
              </ul>
            </nav>
            <div className="mt-6">
              <Button asChild>
                <a
                  href={paths['nav.virtual']}
                  className="flex bg-primary text-primary-950 hover:bg-primary-600 w-full">
                  {translations['nav.virtual']}
                </a>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
