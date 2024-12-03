import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("authToken");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const response = await axios.post(
          "http://192.168.1.8:8000/verify-token",
          null,
          {
            params: { token },
          }
        );
        if (response.data.status === "valid") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsLoggedIn(false);

        if (axios.isAxiosError(error)) {
          console.error("Error response:", error.response?.data);
        }
      }
    };

    verifyToken();
  }, []);

  // Animation variants
  const logoVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 120 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: (custom) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.3
      }
    }),
    hover: { 
      scale: 1.05,
      color: "hsl(220, 87%, 54%)", // Subtle blue highlight
      transition: { duration: 0.2 }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
  };

  const mobileItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-6 px-10"
    >
      <div className="container">
        {/* Desktop Navigation */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <motion.div 
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center gap-2"
            >
              <Image
                src={logo}
                height={40}
                width={40}
                className="rounded-xl"
                alt="logo"
              />
              <span className="text-3xl font-bold">Asterforms</span>
            </motion.div>
            <div className="flex items-center">
              {['Home', 'Builder', 'Features', 'Pricing', 'Templates', 'Contact'].map((item, index) => {
                const href = item === 'Home' ? '/#' : 
                            item === 'Builder' ? '/builder/editor' : 
                            item === 'Features' ? '/#features' : 
                            item === 'Pricing' ? '/#pricing' : 
                            item === 'Templates' ? '/templates' : 
                            '/#contact';
                
                return (
                  <motion.a
                    key={item}
                    href={href}
                    custom={index}
                    variants={navItemVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={cn(
                      "text-muted-foreground",
                      navigationMenuTriggerStyle(),
                      "hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {item}
                  </motion.a>
                );
              })}
            </div>
          </div>
          <motion.div 
            initial="initial"
            animate="animate"
            className="flex gap-2 items-center justify-center"
          >
            {isLoggedIn ? (
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
              >
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Dashboard
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                >
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                  >
                    Log in
                  </Link>
                </motion.div>
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                >
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </nav>

        {/* Mobile Navigation */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <motion.div 
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center gap-2"
            >
              <Image
                src={logo}
                height={40}
                width={40}
                className="rounded-xl"
                alt="logo"
              />
              <span className="text-2xl font-bold">Asterforms</span>
            </motion.div>
            <Sheet>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <motion.div 
                      variants={logoVariants}
                      initial="initial"
                      animate="animate"
                      className="flex items-center gap-2"
                    >
                      <Image
                        src={logo}
                        height={40}
                        width={40}
                        className="rounded-xl"
                        alt="logo"
                      />
                      <span className="text-2xl font-bold">Asterforms</span>
                    </motion.div>
                  </SheetTitle>
                </SheetHeader>
                <motion.div 
                  variants={mobileMenuVariants}
                  initial="initial"
                  animate="animate"
                  className="my-8 flex flex-col gap-4"
                >
                  {['Home', 'Builder', 'Features', 'Pricing', 'Templates', 'Contact'].map((item) => {
                    const href = item === 'Home' ? '/#' : 
                                item === 'Builder' ? '/builder/editor' : 
                                item === 'Features' ? '/#features' : 
                                item === 'Pricing' ? '/#pricing' : 
                                item === 'Templates' ? '/templates' : 
                                '/#contact';
                    
                    return (
                      <motion.a
                        key={item}
                        href={href}
                        variants={mobileItemVariants}
                        className="font-semibold"
                      >
                        {item}
                      </motion.a>
                    );
                  })}
                </motion.div>
                <div className="border-t pt-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 flex flex-col gap-3"
                  >
                    {isLoggedIn ? (
                      <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                        >
                          Log in
                        </Link>
                        <Link
                          href="/signup"
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Navbar;