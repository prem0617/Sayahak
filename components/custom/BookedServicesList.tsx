import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookedService, BookedServicesListProps } from "@/lib/types";

// Mapping for status colors
const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  ACCEPTED: "bg-green-100 text-green-800",
  COMPLETED: "bg-blue-100 text-blue-800",
  CANCELLED: "bg-red-100 text-red-800",
};

// Mapping for display names
const statusDisplayNames = {
  PENDING: "Available",
  ACCEPTED: "Accepted",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const BookedServicesList: React.FC<BookedServicesListProps> = ({
  bookedServices,
}) => {
  const groupedServices = bookedServices.reduce((acc, service) => {
    if (!acc[service.status]) {
      acc[service.status] = [];
    }
    acc[service.status].push(service);
    return acc;
  }, {} as Record<string, BookedService[]>);

  return (
    <div className="space-y-8 mt-10">
      {Object.entries(groupedServices).map(([status, services]) => (
        <div key={status} className="space-y-4">
          {/* Display the mapped status name */}
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {statusDisplayNames[status as keyof typeof statusDisplayNames]}{" "}
            Services
          </h2>
          {services.length === 0 ? (
            <p className="text-gray-600">
              No{" "}
              {statusDisplayNames[
                status as keyof typeof statusDisplayNames
              ]?.toLowerCase()}{" "}
              services available.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link href={`/provider/service/${service.id}`} key={service.id}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {service.Service.name}
                        </h3>
                        <Badge
                          className={
                            statusColors[
                              service.status as keyof typeof statusColors
                            ]
                          }
                        >
                          {
                            statusDisplayNames[
                              service.status as keyof typeof statusDisplayNames
                            ]
                          }
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">
                        {service.Service.description}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(service.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-2" />
                          <span>
                            {new Date(service.date).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-lg font-semibold text-gray-800">
                          ₹{service.basePrice?.toFixed(2) || "N/A"}
                        </p>
                        <Button variant="outline">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookedServicesList;
