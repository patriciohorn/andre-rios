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

export type FormFields = keyof {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  country: 'Mexico' | 'United States';
  procedure:
    | 'Breast Augmentation with Implants'
    | 'Breast Lift'
    | 'Breast Reduction'
    | 'Tummy Tuck'
    | 'Brazilian Butt Lift'
    | 'Liposuction'
    | 'Fat Grafting'
    | 'Body Contouring'
    | 'Mommy Makeover'
    | 'Facelift'
    | 'Neck Lift'
    | 'Rhinoplasty'
    | 'Blepharoplasty'
    | 'Otoplasty'
    | 'Lipoinfiltration';
  procedureDate: Date;
  procedureMessage: string;
  allergies: string;
  medication: string;
  diagnosedDiseases: string;
  smoking: boolean;
  drinking: boolean;
  drugUse: boolean;
  previousSurgeries: string;
  birthControl: boolean;
  thrombosisHistory: string;
  pregnancyDetail: string;
  pregnancyChance: string;
  pregnancy: boolean;
  specialDiet: string;
};
