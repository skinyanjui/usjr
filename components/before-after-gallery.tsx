'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Eye, MapPin, X } from 'lucide-react'
import { getActiveGalleryImages, type GalleryImage } from '@/lib/cms-content'
import { SolidPanel } from '@/components/ui/solid-panel'

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
      galleryImages = galleryImages.filter(img => img.service === service)
    }
    setImages(galleryImages)
  }, [limit, service])

  useEffect(() => {
    if (selectedImage) {
      setShowBefore(true)
    }
  }, [selectedImage])

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {images.map(image => (
          <Card key={image.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <SolidPanel color="neutral" label={image.service} className="aspect-video p-8">
              <div className="text-foreground flex flex-col items-center gap-2">
                <span className="text-foreground text-base font-semibold">{image.title}</span>
                <p className="text-muted-foreground text-sm font-medium">{image.summary}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedImage(image)}
                  className="bg-card text-foreground hover:bg-muted"
                  aria-label={`Open transformation details for ${image.title}`}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Transformation
                </Button>
              </div>
            </SolidPanel>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{image.title}</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {image.service}
                </Badge>
              </div>
              <div className="text-muted-foreground flex items-center gap-1 text-sm">
                <MapPin className="h-3 w-3" />
                {image.location}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <CardDescription className="text-sm">{image.summary}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>{selectedImage.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Toggle Buttons */}
              <div className="flex justify-center gap-2">
                <Button
                  variant={showBefore ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowBefore(true)}
                  className={showBefore ? 'bg-blue-800 hover:bg-blue-900' : ''}
                >
                  Before
                </Button>
                <Button
                  variant={!showBefore ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShowBefore(false)}
                  className={!showBefore ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  After
                </Button>
              </div>

              {/* Image Display */}
              <SolidPanel
                color={showBefore ? selectedImage.before.color : selectedImage.after.color}
                label={showBefore ? selectedImage.before.label : selectedImage.after.label}
                className="aspect-video p-10"
              >
                <p className="text-base font-semibold">
                  {showBefore ? selectedImage.before.description : selectedImage.after.description}
                </p>
              </SolidPanel>

              {/* Image Info */}
              <div className="space-y-2 text-center">
                <div className="text-muted-foreground flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedImage.location}
                  </div>
                  <Badge variant="secondary">{selectedImage.service}</Badge>
                </div>
                <p className="text-muted-foreground">{selectedImage.summary}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
