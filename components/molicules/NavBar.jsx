"use client"
import React, { useContext } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button} from "@nextui-org/react";
import { UniformContext } from "@/context/UniformContextProvider";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
      const { showWhatsApp } = useContext(UniformContext)
      console.log(showWhatsApp);
      
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

 


  return (
    <Navbar className="rounded-b-[30px] shadow-md" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden "
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Taekwondo<span className="text-red-500">zone</span></p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      {showWhatsApp && (
      <div className="watsapp-image absolute xl:w-[12%] xl:top-[520px] xl:right-[-150px] lg:w-[10%] lg:top-[520px] lg:right-[-150px] md:w-[15%] md:top-[520px] sm:w-[15%] sm:top-[500px] w-[20%] top-[500px] right-2 scale-[0.9] hover:scale-[1] transition-all duraiton-300 fixed">
      <a
        href="https://api.whatsapp.com/send/?phone=923164288921&text=Hi%2C+I+need+help%21&type=phone_number&app_absent=0"
      >
        <img src="/images/wattsapp image.webp" alt="WhatsApp image" />
      </a>
    </div>
      )}
    </Navbar>
  );
}
