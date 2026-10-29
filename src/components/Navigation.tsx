import { Home, Code2, Mail, FolderKanban } from "lucide-react";
import { NavMenu } from "@/components/ui/menu-hover-effects";

export function Navigation() {
  const navItems = [
    {
      name: "Home",
      url: "#home",
      icon: Home,
    },
    {
      name: "Skills",
      url: "#skills",
      icon: Code2,
    },
    {
      name: "Projects",
      url: "#projects",
      icon: FolderKanban,
    },
    {
      name: "Contact",
      url: "#contact",
      icon: Mail,
    },
  ];

  return <NavMenu items={navItems} />;
}
