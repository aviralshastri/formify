import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, User, Send, Loader2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import logo from "@/public/logo.png";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionCount, setSubmissionCount] = useState(0);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const formRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const formInView = useInView(formRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const storedCount = parseInt(localStorage.getItem("submissionCount")) || 0;
    const lastSubmissionDate = localStorage.getItem("lastSubmissionDate");
    const currentDate = new Date().toISOString().split("T")[0];

    if (lastSubmissionDate !== currentDate) {
      localStorage.setItem("submissionCount", "0");
      localStorage.setItem("lastSubmissionDate", currentDate);
      setSubmissionCount(0);
    } else {
      setSubmissionCount(storedCount);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submissionCount >= 3) {
      toast.error("You can only submit up to 3 messages per day.", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    setSubmissionStatus("loading");

    try {
      const response = await fetch("http://192.168.1.9:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        const newCount = submissionCount + 1;
        setSubmissionCount(newCount);
        const currentDate = new Date().toISOString().split("T")[0];
        localStorage.setItem("submissionCount", newCount.toString());
        localStorage.setItem("lastSubmissionDate", currentDate);

        

        setFormData({ name: "", email: "", phone: "", message: "" });
        if(data.message==="Too many pending requests for this email or phone number."){
          toast.error(data.message, {
            duration: 3000,
            position: "top-center",
          });
        }
        else{
          toast.success("Message sent successfully!", {
            duration: 3000,
            position: "top-center",
          });
        }
      } else {
        throw new Error(
          data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      toast.error(error.message, {
        duration: 3000,
        position: "top-center",
      });
    } finally {
      setSubmissionStatus(null);
    }
  };

  return (
    <section ref={sectionRef} className="py-20" id="contact">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="container">
        <motion.div
          ref={headerRef}
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              GET IN TOUCH
            </motion.p>
            <motion.h2
              className="text-3xl font-medium md:text-5xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Contact Our Support Team
            </motion.h2>

            <motion.p
              className="text-muted-foreground md:max-w-2xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              We're here to help you with any questions or concerns. Fill out
              the form below, and we'll get back to you promptly.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          ref={formRef}
          className="mx-auto mt-20 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={formInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row w-full">
                <div className="hidden lg:flex flex-col items-center justify-center p-12 lg:w-1/3">
                  <motion.div
                    className="space-y-6 text-center items-center justify-center flex flex-col"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={formInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.6,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={logo}
                      className="rounded-xl"
                      alt="logo"
                    />
                    <h2 className="text-3xl font-bold">Asterforms</h2>
                    <p className="text-muted-foreground">
                      Get in touch with us for any questions or inquiries.
                    </p>
                  </motion.div>
                </div>

                <div className="hidden lg:block">
                  <Separator orientation="vertical" className="h-full" />
                </div>

                <div className="p-8 lg:w-2/3 w-full">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      {
                        label: "Name",
                        name: "name",
                        type: "text",
                        placeholder: "John Doe",
                        icon: (
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        ),
                      },
                      {
                        label: "Email",
                        name: "email",
                        type: "email",
                        placeholder: "john@example.com",
                        icon: (
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        ),
                      },
                      {
                        label: "Phone Number",
                        name: "phone",
                        type: "tel",
                        placeholder: "+1 (555) 000-0000",
                        icon: (
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        ),
                      },
                    ].map((field, idx) => (
                      <motion.div
                        key={field.name}
                        className="space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={formInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          duration: 0.6,
                          delay: 0.2 + idx * 0.1,
                        }}
                      >
                        <Label htmlFor={field.name}>{field.label}</Label>
                        <div className="relative">
                          {field.icon}
                          <Input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="pl-10 w-full"
                            required={field.name !== "phone"}
                          />
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <Label htmlFor="message">Message</Label>
                      <div className="relative">
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Your message here..."
                          rows={4}
                          required
                        />
                      </div>
                    </motion.div>

                    <Button
                      type="submit"
                      className="w-full mt-4"
                      disabled={submissionStatus === "loading"}
                    >
                      {submissionStatus === "loading" ? (
                        <Loader2 className="animate-spin h-5 w-5" />
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
