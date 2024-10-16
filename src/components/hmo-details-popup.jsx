'use client';
import { X, Phone, Mail, MapPin, Link, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DialogClose } from "@/components/ui/dialog"

export function HmoDetailsPopup({
  hmo
}) {
  // If hmo is undefined, use an empty object as fallback
  const {
    name = 'HealthGuard Nigeria Limited',
    category = 'National',
    email = 'info@healthguard.com.ng',
    phone = '0800HEALTHGUARD (0800 432 584 8273), 08012345678',
    address = 'HealthGuard Tower, 123 Adetokunbo Ademola Street, Victoria Island, Lagos, Nigeria.',
    providersLink = 'https://healthguard.com.ng/providers',
    providerCount = '500 - 600',
    lastUpdated = '2024-10-15T14:30:00.000Z'
  } = hmo || {};

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden border-none">
      <CardHeader className="bg-[#008751] text-white p-6 relative">
        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-white hover:text-[#008751] hover:bg-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </DialogClose>
        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
        <div className="mt-2">
          <Badge variant="secondary" className="bg-white text-[#008751] inline-block">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-[#008751] mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-600">Email</p>
              {email !== 'N/A' ? (
                <a href={`mailto:${email}`} className="text-[#008751] hover:underline">
                  {email}
                </a>
              ) : (
                <p>{email}</p>
              )}
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-[#008751] mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-600">Phone</p>
              <p>{phone}</p>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-[#008751] mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-600">Address</p>
            <p>{address}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Link className="h-5 w-5 text-[#008751] mt-1" />
          <div>
            <p className="font-semibold text-sm text-gray-600">Providers</p>
            <a
              href={providersLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#008751] hover:underline">
              View Providers
            </a>
          </div>
        </div>
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="font-semibold text-sm text-gray-600">Provider Count Estimate</p>
            <p className="text-lg font-bold text-[#008751]">{providerCount}</p>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-[#008751] mt-1" />
            <div>
              <p className="font-semibold text-sm text-gray-600">Last Updated</p>
              <p>{lastUpdated !== 'N/A' ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
