import { Home, User, Code2, Mail } from "lucide-react";
import { AnimeNavBar } from "@/components/ui/anime-navbar";

export function Navigation() {
  const navItems = [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
    {
      name: "About",
      url: "/#about",
      icon: User,
      isExternal: true,
    },
    {
      name: "Skills",
      url: "/skills",
      icon: Code2,
    },
    {
      name: "Contact",
      url: "/#contact",
      icon: Mail,
      isExternal: true,
    },
  ];

  return <AnimeNavBar items={navItems} defaultActive="Home" />;
}
