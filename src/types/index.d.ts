export type NavLink = {
  title: string;
  href: string;
};

export type NavItem = {
  title: string;
  items?: Navlink[];
};

export type NavMenuConfig = {
  mainNav: NavLink[];
  proceduresNav: NavItem[];
};
