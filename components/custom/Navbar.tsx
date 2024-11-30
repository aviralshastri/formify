import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
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
import Router from "next/router";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
          "http://localhost:8000/verify-token",
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

  return (
    <section className="py-6 px-10">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                height={40}
                width={40}
                className="rounded-xl"
                alt="logo"
              />
              <span className="text-3xl font-bold">Formify</span>
            </div>
            <div className="flex items-center">
              <a
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/#"
              >
                Home
              </a>
              <a
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/builder/editor"
              >
                Builder
              </a>
              <a
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/#features"
              >
                Features
              </a>
              <a
                className={cn(
                  "text-muted-foreground",
                  navigationMenuTriggerStyle,
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
                href="/#pricing"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-center">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                height={40}
                width={40}
                className="rounded-xl"
                alt="logo"
              />
              <span className="text-2xl font-bold">Formify</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <Image
                        src={logo}
                        height={40}
                        width={40}
                        className="rounded-xl"
                        alt="logo"
                      />
                      <span className="text-2xl font-bold">Formify</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-8 flex flex-col gap-4">
                  <a href="/#" className="font-semibold">
                    Home
                  </a>
                  <a href="/builder/editor" className="font-semibold">
                    Builder
                  </a>
                  <a href="/#features" className="font-semibold">
                    Features
                  </a>
                  <a href="/#pricing" className="font-semibold">
                    Pricing
                  </a>
                </div>
                <div className="border-t pt-4">
                  <div className="mt-2 flex flex-col gap-3">
                    {isLoggedIn ? (
                      <Link
                        href="/dashboard"
                        className={cn(
                          buttonVariants({ variant: "default", size: "lg" })
                        )}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className={cn(
                            buttonVariants({ variant: "outline", size: "lg" })
                          )}
                        >
                          Log in
                        </Link>
                        <Link
                          href="/signup"
                          className={cn(
                            buttonVariants({ variant: "default", size: "lg" })
                          )}
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
