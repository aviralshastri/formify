"use client";

import React, { useState, useMemo } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import logo from "@/public/logo.png"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";

interface Template {
  id: string;
  title: string;
  categories: string[];
  rating: number;
  downloads: string;
  thumbnail: string;
  image: string;
  description?: string;
  fullDescription?: string;
}

const allCategories = [
  "All",
  "Business",
  "Education",
  "Personal",
  "Event",
  "Survey",
  "Feedback",
  "Quiz",
];

const categoryVariants = {
  Business: "default",
  Education: "secondary",
  Personal: "outline",
  Event: "destructive",
  Survey: "ghost",
  Feedback: "success",
  Quiz: "warning",
};

const templates: Template[] = [
  {
    id: "1",
    title: "Customer Feedback",
    categories: ["Business", "Feedback"],
    rating: 4.5,
    downloads: "1.2K",
    thumbnail: "https://via.assets.so/img.jpg?w=400&h=400&tc=white&bg=black",
    image: "https://via.assets.so/img.jpg?w=600&h=400&tc=white&bg=black",
    description: "Comprehensive customer satisfaction survey",
    fullDescription:
      "A detailed survey designed to gather comprehensive insights into customer experience, satisfaction levels, and potential areas of improvement for your business.",
  },
];

export default function Templates() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter(
      (template) =>
        (selectedCategories.length === 0 ||
          selectedCategories.some((category) =>
            template.categories.includes(category)
          )) &&
        (template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()))
    );
  }, [selectedCategories, searchQuery]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  return (
    <>
      <div className="flex justify-center min-h-screen bg-white p-4">
        <div className="w-full max-w-3xl">
          <Image className="rounded-2xl" src={logo} width={100} height={100} alt="goo" />
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
            Formify Templates
          </h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                icon={<Filter className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
          </div>

          <div className="w-full rounded-md border bg-white mb-6">
            <div className="flex flex-wrap justify-start gap-4 p-4">
              {allCategories.filter(category => category !== "All").map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategories.includes(category) ? "default" : "outline"
                  }
                  onClick={() => toggleCategory(category)}
                  className="flex-shrink-0 w-auto"
                >
                  {category}
                </Button>
              ))}
              {selectedCategories.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCategories}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="h-4 w-4 mr-2" /> Clear
                </Button>
              )}
            </div>
          </div>

          {filteredTemplates.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No templates found. Try a different search or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-0">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full p-4 h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1 truncate">
                        {template.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {template.categories.map((category) => (
                          <Badge
                            key={category}
                            variant={
                              categoryVariants[
                                category as keyof typeof categoryVariants
                              ]
                            }
                            className="text-[10px]"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedTemplate && (
        <Dialog
          open={!!selectedTemplate}
          onOpenChange={() => setSelectedTemplate(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {selectedTemplate.title}
                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                  {selectedTemplate.categories.map((category) => (
                    <Badge
                      key={category}
                      variant={
                        categoryVariants[
                          category as keyof typeof categoryVariants
                        ]
                      }
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate.fullDescription}
              </DialogDescription>
            </DialogHeader>

            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.title}
              className="object-fit rounded-md mb-4"
            />

            <DialogFooter>
              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  console.log("Using template:", selectedTemplate.title);
                  setSelectedTemplate(null);
                }}
              >
                Use Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}