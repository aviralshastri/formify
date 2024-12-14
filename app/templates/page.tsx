"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Layout from "@/components/custom/Layout";
import LoadingScreen from "@/components/custom/LoadingScreen"; // Import LoadingScreen

interface Template {
  id: string;
  title: string;
  categories: string[];
  publisher: string;
  thumbnail: string;
  image: string;
  description?: string;
  fullDescription?: string;
}

const ALL_CATEGORIES = [
  "All",
  "Business",
  "Education",
  "Personal",
  "Event",
  "Survey",
  "Feedback",
  "Quiz",
];

const CATEGORY_VARIANTS = {
  Business: "default",
  Education: "secondary",
  Personal: "outline",
  Event: "destructive",
  Survey: "ghost",
  Feedback: "success",
  Quiz: "warning",
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          "http://192.168.1.9:8000/get-templates?query=s"
        );
        const data = await response.json();

        const formattedTemplates = data.templates.map((template: any) => ({
          id: template.id,
          title: template.title,
          categories: template.categories,
          publisher: template.publisher_name,
          thumbnail:
            "https://via.assets.so/img.jpg?w=400&h=400&tc=white&bg=black",
          image: "https://via.assets.so/img.jpg?w=600&h=400&tc=white&bg=black",
          description: template.description,
          fullDescription: `Full description for ${template.title}`,
        }));

        setTemplates(formattedTemplates);
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          template.categories.includes(category)
        );

      const matchesSearch =
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        template.publisher.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategories && matchesSearch;
    });
  }, [selectedCategories, searchQuery, templates]);

  const toggleCategory = useCallback((category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const clearCategories = useCallback(() => {
    setSelectedCategories([]);
  }, []);

  const openTemplateDetails = useCallback((template: Template) => {
    setSelectedTemplate(template);
  }, []);

  const closeTemplateDetails = useCallback(() => {
    setSelectedTemplate(null);
  }, []);

  const useSelectedTemplate = useCallback(() => {
    if (selectedTemplate) {
      console.log("Using template:", selectedTemplate.title);
      closeTemplateDetails();
    }
  }, [selectedTemplate, closeTemplateDetails]);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="Asterforms Logo"
              className="mx-auto mb-4 rounded-xl"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              Asterforms Templates
            </h1>
            <p className="text-muted-foreground mt-2">
              Find the perfect template for your next form
            </p>
          </div>

          <div className="mb-8 flex items-center space-x-4">
            <div className="flex-grow relative">
              <Input
                type="text"
                placeholder="Search templates by name, category, publisher, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
            </div>
          </div>

          <div className="mb-1 overflow-x-auto">
            <div className="flex space-x-2 pb-4 md:pb-0">
              {ALL_CATEGORIES.filter((category) => category !== "All").map(
                (category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategories.includes(category)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => toggleCategory(category)}
                    size="sm"
                  >
                    {category}
                  </Button>
                )
              )}
            </div>
          </div>

          {selectedCategories.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearCategories}
              className="text-destructive hover:bg-destructive/10 mt-2"
            >
              <X className="mr-2 h-4 w-4" /> Clear
            </Button>
          )}

          <div className="mb-6" />

          {isLoading ? (
            <LoadingScreen />
          ) : filteredTemplates.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No templates found. Try a different search or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-all duration-300 border-gray-200"
                >
                  <CardContent className="p-0">
                    <img
                      src={template.thumbnail}
                      alt={template.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-lg truncate pr-4 mb-1">
                          {template.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {template.publisher}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.categories.map((category) => (
                          <Badge
                            key={category}
                            variant={
                              CATEGORY_VARIANTS[
                                category as keyof typeof CATEGORY_VARIANTS
                              ]
                            }
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => openTemplateDetails(template)}
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {selectedTemplate && (
            <Dialog
              open={!!selectedTemplate}
              onOpenChange={closeTemplateDetails}
            >
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedTemplate.title}
                    <p className="text-sm text-muted-foreground mt-1">
                      by {selectedTemplate.publisher}
                    </p>
                  </DialogTitle>
                  <div className="flex flex-wrap gap-2 my-2">
                    {selectedTemplate.categories.map((category) => (
                      <Badge
                        key={category}
                        variant={
                          CATEGORY_VARIANTS[
                            category as keyof typeof CATEGORY_VARIANTS
                          ]
                        }
                        className="text-xs"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <DialogDescription>
                    {selectedTemplate.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                {/* Image */}
                <div className="mb-4">
                  <Image
                    src={selectedTemplate.image}
                    alt={selectedTemplate.title}
                    width={600} // Adjust width as needed
                    height={400} // Adjust height as needed
                    className="object-cover rounded-lg"
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="default"
                    onClick={useSelectedTemplate}
                    className="w-full"
                  >
                    Use Template
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </Layout>
  );
}
