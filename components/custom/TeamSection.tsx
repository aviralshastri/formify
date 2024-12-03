'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Twitter, Github } from 'lucide-react';
import { useTheme } from 'next-themes';

// Type definition for team member
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  background?: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  expertise: string[];
}

// Social icon mapping with better type safety
const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github
} as const;

// Centralized team data with more flexible structure
const teamMembers: TeamMember[] = [
  {
    name: "Aviral Shastri",
    role: "Founder & CEO",
    bio: "AI and software engineering expert passionate about revolutionizing form creation through intelligent design solutions.",
    avatar: "/me.jpg",
    background: "/team-bg.png",
    socials: {
      linkedin: "https://linkedin.com/in/aviralshastri",
      twitter: "https://twitter.com/aviralshastri",
      github: "https://github.com/aviralshastri"
    },
    expertise: [
      "AI Product Strategy", 
      "Software Architecture", 
      "Startup Leadership"
    ]
  }
];

const TeamSection: React.FC = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const headerRef = useRef(null);
  const cardRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Safely get the first team member or provide a fallback
  const founder: TeamMember = teamMembers[0] || {
    name: "Founder",
    role: "Leadership",
    bio: "No information available",
    avatar: "/placeholder.jpg",
    socials: {},
    expertise: []
  };

  return (
    <section className="py-20 bg-background" id="team">
      <div className="container px-4 mx-auto">
        <motion.div 
          ref={headerRef}
          className="flex w-full flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center mb-16">
            <motion.p 
              className="text-sm text-muted-foreground uppercase tracking-wider"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              MEET THE FOUNDER
            </motion.p>
            <motion.h2 
              className="text-3xl font-medium md:text-5xl text-foreground"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Behind the Innovation
            </motion.h2>
            <motion.p 
              className="text-muted-foreground md:max-w-2xl"
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              A visionary leader driving the future of AI-powered form creation, 
              combining technical expertise with entrepreneurial spirit.
            </motion.p>
          </div>

          {/* Team Member Card */}
          <motion.div 
            ref={cardRef}
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden shadow-lg">
              <div className="relative">
                {/* Background Image */}
                {founder.background && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10"
                    style={{ 
                      backgroundImage: `url('${founder.background}')`,
                      filter: 'grayscale(100%)'
                    }}
                    aria-hidden="true"
                  />
                )}

                {/* Card Content */}
                <div className="relative z-10 grid md:grid-cols-3">
                  {/* Profile Image */}
                  <motion.div 
                    className="md:col-span-1 flex items-center justify-center p-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="relative">
                      <Image 
                        src={founder.avatar} 
                        alt={`Portrait of ${founder.name}`}
                        width={256}
                        height={256}
                        className="object-cover rounded-full border-4 border-primary shadow-lg"
                      />
                      <Badge 
                        variant="default" 
                        className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2"
                      >
                        Founder
                      </Badge>
                    </div>
                  </motion.div>

                  {/* Profile Details */}
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={cardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <CardTitle className="text-3xl mb-2 text-foreground">
                          {founder.name}
                        </CardTitle>
                        <CardDescription className="text-lg">
                          {founder.role}
                        </CardDescription>
                      </motion.div>
                    </CardHeader>

                    <CardContent className="p-0">
                      <motion.p 
                        className="text-muted-foreground mb-6"
                        initial={{ opacity: 0, x: -20 }}
                        animate={cardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {founder.bio}
                      </motion.p>

                      {/* Expertise Badges */}
                      {founder.expertise.length > 0 && (
                        <motion.div 
                          className="flex flex-wrap gap-2 mb-6"
                          initial={{ opacity: 0 }}
                          animate={cardInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.6, delay: 0.8 }}
                        >
                          {founder.expertise.map((skill, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={cardInView ? { opacity: 1, scale: 1 } : {}}
                              transition={{ 
                                duration: 0.6, 
                                delay: 0.8 + (index * 0.1) 
                              }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="px-3 py-1"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {/* Social Links */}
                      <motion.div 
                        className="flex space-x-4"
                        initial={{ opacity: 0 }}
                        animate={cardInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1.0 }}
                      >
                        {Object.entries(founder.socials).map(([platform, url], index) => {
                          const SocialIcon = socialIcons[platform as keyof typeof socialIcons];
                          
                          return SocialIcon && url ? (
                            <motion.a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label={`${founder.name}'s ${platform} profile`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={cardInView ? { opacity: 1, y: 0 } : {}}
                              transition={{ 
                                duration: 0.6, 
                                delay: 1.0 + (index * 0.1) 
                              }}
                            >
                              <SocialIcon className="w-6 h-6" />
                            </motion.a>
                          ) : null;
                        })}
                      </motion.div>
                    </CardContent>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;