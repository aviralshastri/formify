import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Twitter, 
  Github 
} from "lucide-react";

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
  // Safely get the first team member or provide a fallback
  const founder = teamMembers[0] || {
    name: "Founder",
    role: "Leadership",
    bio: "No information available",
    avatar: "/placeholder.jpg",
    socials: {},
    expertise: []
  };

  return (
    <section className="py-20 bg-white" id="team">
      <div className="container">
        <div className="flex w-full flex-col items-center">
          {/* Header Section */}
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center mb-16">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              MEET THE FOUNDER
            </p>
            <h2 className="text-3xl font-medium md:text-5xl">
              Behind the Innovation
            </h2>
            <p className="text-muted-foreground md:max-w-2xl">
              A visionary leader driving the future of AI-powered form creation, 
              combining technical expertise with entrepreneurial spirit.
            </p>
          </div>

          {/* Team Member Card */}
          <div className="w-full max-w-4xl">
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
                  />
                )}

                {/* Card Content */}
                <div className="relative z-10 grid md:grid-cols-3">
                  {/* Profile Image */}
                  <div className="md:col-span-1 flex items-center justify-center p-6">
                    <div className="relative">
                      <img 
                        src={founder.avatar} 
                        alt={founder.name} 
                        className="w-64 h-64 object-cover rounded-full border-4 border-primary shadow-lg"
                      />
                      <Badge 
                        variant="default" 
                        className="absolute bottom-0 right-0 transform translate-x-2 translate-y-2"
                      >
                        Founder
                      </Badge>
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-3xl mb-2">
                        {founder.name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {founder.role}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-6">
                        {founder.bio}
                      </p>

                      {/* Expertise Badges */}
                      {founder.expertise.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {founder.expertise.map((skill, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="px-3 py-1"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Social Links */}
                      <div className="flex space-x-4">
                        {Object.entries(founder.socials).map(([platform, url]) => {
                          const SocialIcon = socialIcons[platform as keyof typeof socialIcons];
                          
                          return SocialIcon ? (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                              aria-label={`${platform} profile`}
                            >
                              <SocialIcon className="w-6 h-6" />
                            </a>
                          ) : null;
                        })}
                      </div>
                    </CardContent>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;