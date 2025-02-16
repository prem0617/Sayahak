"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Star,
  ArrowRight,
  Shield,
  Clock,
  PiggyBank,
  X,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import type React from "react"; // Import React
import axios from "axios";
import OurServices from "@/components/custom/OurServices";
import { Category } from "@/lib/types";

interface SearchResult {
  id: string;
  name: string;
  description?: string;
}

const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simulating API call with mock data
        const response = await axios.get("/api/categories");
        console.log(response);

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const filteredResults = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 md:space-y-8 mb-12 md:mb-16"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Your Trusted Service Partner
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-xl md:max-w-2xl mx-auto font-light">
              Connect with professional service providers for all your needs
            </p>
            <div className="max-w-xl md:max-w-2xl mx-auto relative">
              <form
                onSubmit={handleSearchSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Input
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="What service do you need? (Cleaning ,Plumbing, etc.)"
                    className="h-12 md:h-14 text-base md:text-lg shadow-lg rounded-full px-4 md:px-6 pr-10 md:pr-12"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-40"
                    >
                      <X className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  )}
                </div>
                <Button
                  type="submit"
                  className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                >
                  <Search className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </form>

              {/* Search Suggestions */}
              <AnimatePresence>
                {showSuggestions && searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                  >
                    <div className="max-h-48 md:max-h-64 overflow-y-auto">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/services/${result.name}`}
                          className="flex items-center px-3 md:px-4 py-2 md:py-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2 md:mr-3">
                            <Search className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm md:text-base">
                              {result.name}
                            </p>
                            <p className="text-xs md:text-sm text-gray-500">
                              {result.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 opacity-50"></div>
      </section>

      {/* Services Redirect Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
          >
            <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Discover Our Services
              </h2>
              <p className="text-base md:text-xl text-gray-600 leading-relaxed">
                From home repairs to beauty services, we've got you covered with
                our network of verified professionals.
              </p>
              <Link href="/services">
                <Button className="mt-5 group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 md:px-8 py-4 md:py-6 rounded-full text-base md:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Explore Services
                  <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-full h-80 md:h-96 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {categories.slice(0, 4).map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="bg-white/80 p-4 rounded-xl shadow-lg backdrop-blur-md"
                      >
                        <h3 className="text-sm font-semibold text-gray-800">
                          {category.name}
                        </h3>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <OurServices categories={categories} loading={loading} />

      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                title: "Verified Experts",
                icon: Shield,
                description:
                  "All our service providers are thoroughly vetted and certified.",
              },
              {
                title: "Quick Service",
                icon: Clock,
                description:
                  "Get connected with professionals within minutes of your request.",
              },
              {
                title: "Best Prices",
                icon: PiggyBank,
                description:
                  "Competitive pricing with transparent quotes upfront.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="h-12 md:h-14 w-12 md:w-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                    <feature.icon className="w-6 md:w-7 h-6 md:h-7 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl mb-2 md:mb-4 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base md:text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
          >
            Customer Reviews
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          >
            {[
              {
                name: "John Doe",
                role: "Home Owner",
                review:
                  "Excellent service! The provider was professional and completed the job perfectly.",
              },
              {
                name: "Sarah Smith",
                role: "Business Owner",
                review:
                  "Fast, reliable, and extremely professional. Couldn't be happier with the service.",
              },
              {
                name: "Mike Johnson",
                role: "Regular Customer",
                review:
                  "Outstanding experience from start to finish. Will definitely use again!",
              },
            ].map((testimonial, i) => (
              <Card
                key={i}
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl overflow-hidden border-0"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex mb-4 md:mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-gray-600 text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  <div className="flex items-center">
                    <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-3 md:mr-4">
                      <span className="text-blue-600 font-bold text-lg">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-base md:text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm md:text-base">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
