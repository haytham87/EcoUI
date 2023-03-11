import { MenuItem } from './menu.model';
import { NewMenuItem } from './newmenu.model';

export const NewMenu: NewMenuItem[] = [
  {
      label: 'الموارد البشرية',
      description: '',
      link: '',
      icon: '',
      type: 'group',
      parentId: null,
      id: 1
  },
  {
      label: 'الإعدادات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 1,
      id: 2
  },
  {
      label: 'الصفحات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 1,
      id: 3
  },
  {
      label: 'التقارير',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 1,
      id: 4
  },
  {
      label: 'الحسابات',
      description: '',
      link: '',
      icon: '',
      type: 'group',
      parentId: null,
      id: 5
  },
  {
      label: 'الإعدادات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 5,
      id: 6
  },
  {
      label: 'الصفحات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 5,
      id: 7
  },
  {
      label: 'التقارير',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 5,
      id: 8
  },
  {
      label: 'المخازن',
      description: '',
      link: '',
      icon: '',
      type: 'group',
      parentId: null,
      id: 9
  },
  {
      label: 'الإعدادات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 9,
      id: 10
  },
  {
      label: 'الصفحات',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 9,
      id: 11
  },
  {
      label: 'التقارير',
      description: '',
      link: '',
      icon: '',
      type: 'collapse',
      parentId: 9,
      id: 12
  },
  {
      label: 'المؤسسة',
      description: '',
      link: '',
      icon: '',
      type: 'item',
      parentId: 2,
      id: 13
  },

];

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.HR.TEXT',
        icon: 'bx bxs-grid',
        subItems: [

            {
                id: 2,
                label: 'MENUITEMS.HR.LIST.SETTINGS',
                badge: {
                    variant: 'success',
                    text: 'Em',
                },
                parentId: 1,
                subItems: [
                    {
                        id: 13,
                        label: 'MENUITEMS.HR.LIST.Enterprise',
                        link: '/hr/inbox',
                        parentId: 2
                    },
                    {
                        id: 14,
                        label: 'MENUITEMS.HR.LIST.BRANCH',
                        link: '/hr/inbox',
                        parentId: 2
                    },
                    {
                        id: 15,
                        label: 'MENUITEMS.HR.LIST.MANAGEMENTS',
                        link: '/hr/inbox',
                        parentId: 2
                    }
                ]
            },
            {
                id: 3,
                label: 'MENUITEMS.HR.LIST.PAGES',
                parentId: 1,
                subItems: [
                    {
                        id: 16,
                        label: 'MENUITEMS.HR.LIST.JobApplication',
                        link: '/hr/inbox',
                        parentId: 3
                    },
                  ]
            },
            {
                id: 4,
                label: 'MENUITEMS.HR.LIST.REPORTS',
                badge: {
                    variant: 'success',
                    text: 'Em',
                },
                parentId: 1,
                subItems: [
                    {
                        id: 17,
                        label: 'MENUITEMS.HR.LIST.EMPLOYEEREPORT',
                        link: '/hr/inbox',
                        parentId: 4
                    }
                ]
            }
        ]
    },
    {
        id: 5,
        label: 'MENUITEMS.HR.LIST.ACCONTREPORT',
        subItems:[
          {
            id: 6,
            label: 'MENUITEMS.HR.LIST.SETTINGS',
            link: '/hr/inbox',
            parentId: 5

          },
          {
            id: 7,
            label: 'MENUITEMS.HR.LIST.PAGES',
            link: '/hr/inbox',
            parentId: 5
          },
          {
            id: 8,
            label: 'MENUITEMS.HR.LIST.REPORTS',
            link: '/hr/inbox',
            parentId: 5
          },
        ]
    },
    {
        id: 9,
        label: 'MENUITEMS.HR.LIST.STORE',
        subItems:[
          {
            id: 10,
            label: 'MENUITEMS.HR.LIST.SETTINGS',

          },
          {
            id: 11,
            label: 'MENUITEMS.HR.LIST.PAGES',
          },
          {
            id: 12,
            label: 'MENUITEMS.HR.LIST.REPORTS',
          }
        ]

    }

];

