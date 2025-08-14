"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Eye, MapPin, X } from "lucide-react"
import { getActiveGalleryImages, type GalleryImage } from "@/lib/cms-content"

interface BeforeAfterGalleryProps {
  limit?: number
  service?: string
}

export function BeforeAfterGallery({ limit, service }: BeforeAfterGalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [showBefore, setShowBefore] = useState(true)

  useEffect(() => {
    let galleryImages = getActiveGalleryImages(limit)
    if (service) {
      galleryImages = galleryImages.filter((img) => img.service === service)
    }
    setImages(galleryImages)
  }, [limit, service])

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-video bg-gray-100">
              <img
                src={image.afterImage || "/placeholder.svg"}
                alt={image.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedImage(image)}
                  className="bg-white/90 text-gray-900 hover:bg-white"
                  aria-label={`Open before/after view for ${image.title}`}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Before/After
                </Button>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{image.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {image.service}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-3 h-3" />
                {image.location}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">{image.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedImage.title}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedImage(null)} aria-label="Close dialog">
                  <X className="w-4 h-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Toggle Buttons */}
              <div className="flex gap-2 justify-center">
                <Button
                  variant={showBefore ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBefore(true)}
                  className={showBefore ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  Before
                </Button>
                <Button
                  variant={!showBefore ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowBefore(false)}
                  className={!showBefore ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  After
                </Button>
              </div>

              {/* Image Display */}
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={showBefore ? selectedImage.beforeImage : selectedImage.afterImage}
                  alt={`${selectedImage.title} - ${showBefore ? "Before" : "After"}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={showBefore ? "bg-red-600" : "bg-green-600"}>
                    {showBefore ? "Before" : "After"}
                  </Badge>
                </div>
              </div>

              {/* Image Info */}
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedImage.location}
                  </div>
                  <Badge variant="secondary">{selectedImage.service}</Badge>
                </div>
                <p className="text-gray-700">{selectedImage.description}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
