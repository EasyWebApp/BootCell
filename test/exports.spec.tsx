import { expect } from 'expect';
import { describe, it } from 'node:test';

import * as BootCell from '../source';

describe('Public migration exports', () => {
    it('exposes migrated components and models from the package entry', () => {
        for (const name of [
            'Collapse',
            'Card',
            'Nav',
            'Navbar',
            'DrawerNavbar',
            'BannerNavbar',
            'DropdownButton',
            'FormControl',
            'FormField',
            'FormCheck',
            'ToggleButton',
            'Table',
            'TableRow',
            'InputCell',
            'TableSelectionModel',
            'Tabs',
            'Tab',
            'Wizard',
            'TabsModel',
            'WizardModel',
            'Carousel',
            'CarouselModel',
            'Form',
            'Feedback',
            'FormText',
            'Popover',
            'PopoverBox',
            'Overlay',
            'OverlayTrigger',
            'Toast',
            'CalendarTable',
            'WeekCalendar',
            'WeekCalendarModel',
            'ShareBar',
            'ShareModel'
        ] as const)
            expect(typeof BootCell[name]).toBe('function');
    });
});
