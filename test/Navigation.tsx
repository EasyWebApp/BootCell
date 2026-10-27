import { DropdownButton, DropdownItem } from '../source/Navigator/Dropdown';
import { Nav, NavDropdown, NavLink } from '../source/Navigator/Nav';
import { DrawerNavbar, NavbarBrand } from '../source/Navigator/Navbar';

export const NavigationExamples = () => (
    <>
        <DrawerNavbar
            expand="md"
            fluid
            brand={<NavbarBrand href="#navigation-home">BootCell</NavbarBrand>}
        >
            <Nav>
                <NavLink href="#navigation-home">Home</NavLink>
                <NavDropdown title="Navigation menu">
                    <DropdownItem href="#navigation-first">
                        First page
                    </DropdownItem>
                    <DropdownItem href="#navigation-second">
                        Second page
                    </DropdownItem>
                </NavDropdown>
            </Nav>
        </DrawerNavbar>
        <DropdownButton caption="First menu" variant="outline" theme="primary">
            <DropdownItem href="#first-action">First action</DropdownItem>
            <button type="button">Inside button</button>
        </DropdownButton>{' '}
        <DropdownButton caption="Second menu" variant="outline" theme="primary">
            <DropdownItem href="#second-action">Second action</DropdownItem>
        </DropdownButton>
        <button type="button" id="navigation-outside">
            Outside navigation
        </button>
    </>
);
