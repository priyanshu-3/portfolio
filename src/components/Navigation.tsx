import { Home, User, Code2, Mail, FolderKanban } from "lucide-react";
import { NavMenu } from "@/components/ui/menu-hover-effects";

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
      name: "Projects",
      url: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Contact",
      url: "/#contact",
      icon: Mail,
      isExternal: true,
    },
  ];

  return <NavMenu items={navItems} />;
}
