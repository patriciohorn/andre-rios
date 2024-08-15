import React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';
import type { NavLink } from '@/types';

interface Translations {
  'nav.meet': string;
  'nav.procedures': string;
  'nav.gallery': string;
  'nav.virtual': string;
}

interface MainNavigationMenuProps {
  translations: Translations;
}

export function MainNavigationMenu({ translations }: MainNavigationMenuProps) {
  const procedures = {
    Breast: [
      { title: 'Breast Augmentation with Fat', url: '/procedures/breast-augmentation-fat' },
      { title: 'Breast Lift', url: '/procedures/breast-lift' },
      { title: 'Breast Reduction', url: '/procedures/breast-reduction' },
      {
        title: 'Breast Augmentation with Implants',
        url: '/procedures/breast-augmentation-implants'
      }
    ],
    Injectables: [
      { title: 'Hyperhidrosis', url: '/procedures/hyperhidrosis' },
      { title: 'Botox (Botulinum toxin)', url: '/procedures/botox' },
      { title: 'Fillers', url: '/procedures/fillers' }
    ],
    Body: [
      { title: 'Abdominoplasty', url: '/procedures/abdominoplasty' },
      { title: 'Brachioplasty', url: '/procedures/brachioplasty' },
      { title: 'Gynecomastia (Thorax Liposuction)', url: '/procedures/gynecomastia' },
      { title: 'Liposuction', url: '/procedures/liposuction' },
      { title: 'Mommy Makeover', url: '/procedures/mommy-makeover' },
      { title: 'Massive Weight Loss', url: '/procedures/massive-weight-loss' },
      { title: 'Torsoplasty', url: '/procedures/torsoplasty' },
      { title: 'Thigh Lift', url: '/procedures/thigh-lift' },
      { title: 'LipoInfiltration', url: '/procedures/lipoinfiltration' }
    ]
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="text-sm font-medium text-white px-4 py-2 cursor-pointer hover:text-primary-500 transition-colors duration-200 ease-in-out">
          <NavigationMenuLink href="">{translations['nav.meet']}</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="text-sm text-white  font-medium bg-transparent hover:bg-transparent hover:text-primary-500 data-[active]:bg-transparent data-[state=open]:bg-transparent">
            {translations['nav.procedures']}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid grid-cols-3 w-[400px] md:w-[600px] lg:w-[800px] justify-center bg-white">
              {Object.entries(procedures).map(([category, items], idx) => (
                <ul key={idx} className="p-6" role="none">
                  <li role="none">
                    <h3 className="text-primary-900 text-sm tracking-wide font-semibold px-2 mb-1">
                      {category}
                    </h3>
                    <ul className="py-2 flex flex-col space-y-1" role="list">
                      {items.map((item, i) => (
                        <li key={i} className="flex">
                          <a
                            href={item.url}
                            className="flex w-full text-sm px-2 py-1 rounded-sm text-primary-900 hover:bg-primary-200 hover:text-primary-950 transition-colors duration-200 ease-in-out text-balance">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-sm font-medium text-white  px-4 py-2 cursor-pointer hover:text-primary-500 transition-colors duration-200 ease-in-out">
          <NavigationMenuLink href=""> {translations['nav.gallery']}</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="text-sm font-medium text-white  px-4 py-2 cursor-pointer hover:text-primary-500 transition-colors duration-200 ease-in-out">
          <NavigationMenuLink href=""> {translations['nav.virtual']}</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem: React.FC<NavLink> = ({ title, href }) => {
  return (
    <li className="">
      <a
        href={href}
        className="cursor-pointer inline-block w-full text-white0 text-sm font-medium hover:text-gray-900 p-2 hover:bg-white">
        <span className="">{title}</span>
      </a>
    </li>
  );
};
ListItem.displayName = 'ListItem';
