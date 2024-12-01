<<<<<<< HEAD
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, FileText, Settings, LogOut, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "@/public/logo-light.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "My Templates" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = ({
  className = "",
  onNavigate,
  onLogout,
}: {
  className?: string;
  onNavigate: (label: string) => void;
  onLogout: () => void;
}) => (
  <div className={`flex h-screen w-64 flex-col bg-background p-4 ${className}`}>
    <Link href={"/"} className="flex items-center gap-2 mb-4">
      <Image
        src={logo}
        height={40}
        width={40}
        className="rounded-xl"
        alt="logo"
      />
      <span className="text-3xl font-bold">Formify</span>
    </Link>
    <nav className="flex-1">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-md"
              onClick={() => onNavigate(item.label)}
            >
              <item.icon className="mr-2 h-6 w-6" />
              {item.label}
            </Button>
          </motion.li>
        ))}
      </ul>
    </nav>
    <Button variant="destructive" onClick={onLogout} className="mt-auto">
      <LogOut className="mr-2 h-6 w-6" />
      Logout
    </Button>
  </div>
);

const TemplatesPage = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold">My Templates</h3>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Template
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Template {i}</CardTitle>
            <CardDescription>A sample template description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Template content goes here...</p>
          </CardContent>
          <CardFooter>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle>Account Settings</CardTitle>
      <CardDescription>Manage your account preferences here.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="johndoe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john@example.com" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable email notifications</Label>
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save Changes</Button>
    </CardFooter>
  </Card>
);

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.16:8000/verify-token",
          null,
          {
            params: { token },
          }
        );
        if (response.data.status === "valid") {
          router.push("/dashboard");
        } else {
          Cookies.remove("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        Cookies.remove("authToken");
        router.push("/login");

        if (axios.isAxiosError(error)) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    verifyToken();
  }, [router]);

  const handleNavigate = (label: string) => {
    setCurrentPage(label);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    Cookies.set("authToken", "", { expires: 0 }); // This effectively removes the cookie
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        className="hidden lg:flex"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden absolute top-4 left-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar onNavigate={handleNavigate} onLogout={handleLogout} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">{currentPage}</h2>
        <Separator className="my-4" />

        {currentPage === "Home" && (
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here you can manage your templates and
            account settings.
          </p>
        )}

        {currentPage === "My Templates" && <TemplatesPage />}

        {currentPage === "Settings" && <SettingsPage />}
      </main>

      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
=======
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, FileText, Settings, LogOut, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "@/public/logo-light.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "My Templates" },
  { icon: Settings, label: "Settings" },
];

const Sidebar = ({
  className = "",
  onNavigate,
  onLogout,
}: {
  className?: string;
  onNavigate: (label: string) => void;
  onLogout: () => void;
}) => (
  <div className={`flex h-screen w-64 flex-col bg-background p-4 ${className}`}>
    <Link href={"/"} className="flex items-center gap-2 mb-4">
      <Image
        src={logo}
        height={40}
        width={40}
        className="rounded-xl"
        alt="logo"
      />
      <span className="text-3xl font-bold">Formify</span>
    </Link>
    <nav className="flex-1">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.li
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-md"
              onClick={() => onNavigate(item.label)}
            >
              <item.icon className="mr-2 h-6 w-6" />
              {item.label}
            </Button>
          </motion.li>
        ))}
      </ul>
    </nav>
    <Button variant="destructive" onClick={onLogout} className="mt-auto">
      <LogOut className="mr-2 h-6 w-6" />
      Logout
    </Button>
  </div>
);

const TemplatesPage = () => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold">My Templates</h3>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Add New Template
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>Template {i}</CardTitle>
            <CardDescription>A sample template description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Template content goes here...</p>
          </CardContent>
          <CardFooter>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  </div>
);

const SettingsPage = () => (
  <Card className="w-full max-w-2xl">
    <CardHeader>
      <CardTitle>Account Settings</CardTitle>
      <CardDescription>Manage your account preferences here.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="johndoe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" defaultValue="john@example.com" />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="notifications" />
        <Label htmlFor="notifications">Enable email notifications</Label>
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save Changes</Button>
    </CardFooter>
  </Card>
);

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("Home");
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.16:8000/verify-token",
          null,
          {
            params: { token },
          }
        );
        if (response.data.status === "valid") {
          router.push("/dashboard");
        } else {
          Cookies.remove("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        Cookies.remove("authToken");
        router.push("/login");

        if (axios.isAxiosError(error)) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    verifyToken();
  }, [router]);

  const handleNavigate = (label: string) => {
    setCurrentPage(label);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    Cookies.set("authToken", "", { expires: 0 }); // This effectively removes the cookie
    router.push("/login");
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        className="hidden lg:flex"
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden absolute top-4 left-4"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar onNavigate={handleNavigate} onLogout={handleLogout} />
        </SheetContent>
      </Sheet>

      <main className="flex-1 p-8 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">{currentPage}</h2>
        <Separator className="my-4" />

        {currentPage === "Home" && (
          <p className="text-muted-foreground">
            Welcome to your dashboard. Here you can manage your templates and
            account settings.
          </p>
        )}

        {currentPage === "My Templates" && <TemplatesPage />}

        {currentPage === "Settings" && <SettingsPage />}
      </main>

      <AlertDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will end your current session.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmLogout}>
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
>>>>>>> d5a3a5c47b8723b7095e86cf0b251e5c886c177f
