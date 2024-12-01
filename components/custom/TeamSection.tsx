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

const teamMembers = [
  {
    name: "Aviral Shastri",
    role: "Founder & CEO",
    bio: "AI and software engineering expert passionate about revolutionizing form creation through intelligent design solutions.",
    avatar: "/me.jpg", // Assuming you have an avatar image
    background: "/team-bg.png", // Optional background image
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

const TeamSection = () => {
  return (
    <section className="py-20 bg-white" id="team">
      <div className="container">
        <div className="flex w-full flex-col items-center">
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

          <div className="w-full max-w-4xl">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-10"
                  style={{ 
                    backgroundImage: `url('/team-bg.png')`,
                    filter: 'grayscale(100%)'
                  }}
                />

                {/* Card Content */}
                <div className="relative z-10 grid md:grid-cols-3">
                  {/* Profile Image */}
                  <div className="md:col-span-1 flex items-center justify-center p-6">
                    <div className="relative">
                      <img 
                        src="/me.jpg" 
                        alt={teamMembers[0].name} 
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
                        {teamMembers[0].name}
                      </CardTitle>
                      <CardDescription className="text-lg">
                        {teamMembers[0].role}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-0">
                      <p className="text-muted-foreground mb-6">
                        {teamMembers[0].bio}
                      </p>

                      {/* Expertise Badges */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {teamMembers[0].expertise.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary" 
                            className="px-3 py-1"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex space-x-4">
                        {Object.entries(teamMembers[0].socials).map(([platform, url]) => {
                          const socialIcons = {
                            linkedin: <Linkedin className="w-6 h-6" />,
                            twitter: <Twitter className="w-6 h-6" />,
                            github: <Github className="w-6 h-6" />
                          };

                          return (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {socialIcons[platform]}
                            </a>
                          );
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