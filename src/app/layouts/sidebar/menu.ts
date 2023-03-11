import { MenuItem } from './menu.model';
import { NewMenuItem } from './newmenu.model';

export const NewMenu: NewMenuItem[] = [
    {
        label: 'الرئيسية',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'group',
        parentId: null,
        id: 0,
    },
    {
        label: 'الموارد البشرية',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'group',
        parentId: null,
        id: 1,
    },
    {
        label: 'الإعدادات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 1,
        id: 2,
    },
    {
        label: 'الصفحات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 1,
        id: 3,
    },
    {
        label: 'التقارير',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 1,
        id: 4,
    },
    {
        label: 'الحسابات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'group',
        parentId: null,
        id: 5,
    },
    {
        label: 'الإعدادات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 5,
        id: 6,
    },
    {
        label: 'الصفحات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 5,
        id: 7,
    },
    {
        label: 'التقارير',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 5,
        id: 8,
    },
    {
        label: 'المخازن',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'group',
        parentId: null,
        id: 9,
    },
    {
        label: 'الإعدادات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 9,
        id: 10,
    },
    {
        label: 'الصفحات',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 9,
        id: 11,
    },
    {
        label: 'التقارير',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'collapse',
        parentId: 9,
        id: 12,
    },
    {
        label: 'المؤسسة',
        description: '',
        link: '/page/home',
        icon: '',
        type: 'item',
        parentId: 2,
        id: 13,
    },

];

export const MENU: MenuItem[] = [
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx bxs-dashboard',
        link: '',
    },
    {
        id: 9,
        label: 'MENUITEMS.HR.TEXT',
        icon: 'bx bxs-grid',
        submenu: [
            {
                id: 12,
                label: 'MENUITEMS.HR.LIST.PAGES',
                badge: {
                    variant: 'success',
                    text: 'Em',
                },
                parentId: 9,
                submenu: [
                    {
                        id: 13,
                        label: 'MENUITEMS.HR.LIST.SUB.INBOX',
                        link: '/hr/inbox',
                        parentId: 12
                    },
                    {
                        id: 14,
                        label: 'MENUITEMS.HR.LIST.SUB.READEMAIL',
                        link: '/apps/read/1',
                        parentId: 12
                    }
                ]
            },
            {
                id: 12,
                label: 'MENUITEMS.HR.LIST.SETTINGS',
                badge: {
                    variant: 'success',
                    text: 'Em',
                },
                parentId: 9,
                submenu: [
                    {
                        id: 13,
                        label: 'MENUITEMS.HR.LIST.SUB.INBOX',
                        link: '/hr/inbox',
                        parentId: 12
                    },
                    {
                        id: 14,
                        label: 'MENUITEMS.HR.LIST.SUB.READEMAIL',
                        link: '/apps/read/1',
                        parentId: 12
                    }
                ]
            },
            {
                id: 12,
                label: 'MENUITEMS.HR.LIST.REPORTS',
                badge: {
                    variant: 'success',
                    text: 'Em',
                },
                parentId: 9,
                submenu: [
                    {
                        id: 13,
                        label: 'MENUITEMS.HR.LIST.SUB.INBOX',
                        link: '/hr/inbox',
                        parentId: 12
                    },
                    {
                        id: 14,
                        label: 'MENUITEMS.HR.LIST.SUB.READEMAIL',
                        link: '/apps/read/1',
                        parentId: 12
                    }
                ]
            }
        ]
    },
];

