import type { NavMenuConfig } from '@/types';

export const navMenuConfig: NavMenuConfig = {
  mainNav: [
    {
      title: 'Meet Your Doctor',
      href: '/meet-your-doctor'
    },
    {
      title: 'Gallery',
      href: '/gallery'
    },
    {
      title: 'Virtual Consultation',
      href: '/virtual-consultation'
    }
  ],

  proceduresNav: [
    {
      title: 'Breast',
      items: [
        {
          title: 'Breast Augmentation with Fat',
          href: '/en/augmentation-with-fat'
        },
        {
          title: 'Breast Lift',
          href: '/en/lift'
        },
        {
          title: 'Breast Reduction',
          href: '/en/reduction'
        },
        {
          title: 'Breast Augmentation with Implants',
          href: '/en/augmentation-with-implants'
        }
      ]
    },
    {
      title: 'Injectables',
      items: [
        {
          title: 'Hyperhidrosis',
          href: '/en/hyperhidrosis'
        },
        {
          title: 'Botox (Botulinum toxin)',
          href: '/en/botox'
        },
        {
          title: 'Fillers',
          href: '/en/fillers'
        }
      ]
    },
    {
      title: 'Body',
      items: [
        {
          title: 'Abdominoplasty',
          href: '/en/abdominoplasty'
        },
        {
          title: 'Brachioplasty',
          href: '/en/brachioplasty'
        },
        {
          title: 'Gynecomastia (Thorax Liposuction)',
          href: '/en/gynecomastia'
        },
        {
          title: 'Liposuction',
          href: '/en/liposuction'
        },
        {
          title: 'Mommy Makeover',
          href: '/en/mommy-makeover'
        },
        {
          title: 'Massive Weight Loss',
          href: '/en/massive-weight-loss'
        },
        {
          title: 'Torsoplasty',
          href: '/en/torsoplasty'
        },
        {
          title: 'Thigh Lift',
          href: '/en/thigh-lift'
        },
        {
          title: 'LipoInfiltration',
          href: '/en/lipoinfiltration'
        }
      ]
    }
  ]
};
