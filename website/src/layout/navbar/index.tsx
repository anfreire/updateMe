import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NavBarLogo from "./components/logo";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./components/themeSwitcher";
import { menuItems } from "./data";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <NavbarBrand>
          <NavBarLogo />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu className="gap-6 overflow-y-auto">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link to={item.route}>
              <NavbarMenuItem
                onClick={() => setIsMenuOpen(false)}
                className="flex w-full flex-col items-start gap-2"
              >
                <div className="text-x flex w-full flex-row items-center gap-2">
                  {item.icon}
                  {item.title}
                  {item.title === "Android App" && (
                    <span className="text-sm text-red-600">NEW</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </NavbarMenuItem>
            </Link>
            {index !== menuItems.length - 1 && (
              <Divider key={item.title} className="mt-6 w-full opacity-30" />
            )}
          </div>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
