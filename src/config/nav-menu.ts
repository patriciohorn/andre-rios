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
          href: '/procedures/breast/breast-augmentation-with-fat'
        },
        {
          title: 'Breast Lift',
          href: '/procedures/breast/breast-lift'
        },
        {
          title: 'Breast Reduction',
          href: '/procedures/breast/breast-reduction'
        },
        {
          title: 'Breast Augmentation with Implants',
          href: '/procedures/breast/breast-augmentation-with-implants'
        }
      ]
    },
    {
      title: 'Injectables',
      items: [
        {
          title: 'Hyperhidrosis',
          href: '/procedures/injectables/hyperhidrosis'
        },
        {
          title: 'Botox (Botulinum toxin)',
          href: '/procedures/injectables/botox'
        },
        {
          title: 'Fillers',
          href: '/procedures/injectables/fillers'
        }
      ]
    },
    {
      title: 'Body',
      items: [
        {
          title: 'Abdominoplasty',
          href: '/procedures/body/abdominoplasty'
        },
        {
          title: 'Brachioplasty',
          href: '/procedures/body/brachioplasty'
        },
        {
          title: 'Gynecomastia (Thorax Liposuction)',
          href: '/procedures/body/gynecomastia'
        },
        {
          title: 'Liposuction',
          href: '/procedures/body/liposuction'
        },
        {
          title: 'Mommy Makeover',
          href: '/procedures/body/mommy-makeover'
        },
        {
          title: 'Massive Weight Loss',
          href: '/procedures/body/massive-weight-loss'
        },
        {
          title: 'Torsoplasty',
          href: '/procedures/body/torsoplasty'
        },
        {
          title: 'Thigh Lift',
          href: '/procedures/body/thigh-lift'
        },
        {
          title: 'LipoInfiltration',
          href: '/procedures/body/lipoinfiltration'
        }
      ]
    }
  ]
};
