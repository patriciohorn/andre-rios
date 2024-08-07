import * as React from 'react';

// Components
import { Button } from '@components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Icons
import { Menu } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

// Image
import logo from '../../assets/logo.png';

// types
import type { NavLink, NavItem } from '@/types';

interface SheetMobileNavProp {
  mainNavItems: NavLink[];
  proceduresNavItems: NavItem[];
}

export function SheetMobileNav({ mainNavItems, proceduresNavItems }: SheetMobileNavProp) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary" size="sm" className="h-8 px-1.5 md:hidden bg-transparent">
          <span className="sr-only">Desplegar Menú</span>
          <Menu className="size-6 text-slate-900" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-y-5">
        <div className="h-16">
          <a href="/">
            <div className="sr-only">Inicio</div>
            <img src={logo.src} alt="Dr. Andrei Ríos logo" className="h-10" />
          </a>
        </div>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="mb-20">
            <nav className="flex flex-col gap-1">
              <ul role="list" className="flex flex-col flex-1">
                {mainNavItems?.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="flex items-center text-sm font-medium leading-6 text-slate-900 p-2 -mx-2">
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between gap-2 [&[data-state=open]>svg]:rotate-90 text-sm text-slate-900 font-medium leading-6 p-2 -mx-2">
                  Procedures
                  <ChevronRight className="h-4 w-4 transition-transform text-slate-900" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col space-y-2">
                    {proceduresNavItems?.map((item) => (
                      <div className="flex flex-col pl-2">
                        <h4 className="text-sm text-slate-900 font-semibold p-2">{item.title}</h4>
                        <ul className="pl-4">
                          {item.items?.map((link) => (
                            <li>
                              <a
                                href={link.href}
                                className="flex items-center text-sm leading-6 text-slate-600 p-1 rounded-md">
                                {link.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </nav>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
