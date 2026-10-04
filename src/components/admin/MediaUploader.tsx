'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Upload, X, GripVertical, Star, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface MediaFile {
  id: string
  url: string
  file?: File
  isNew?: boolean
  isCover?: boolean
}

interface MediaUploaderProps {
  initialMedia?: { id: string; url: string; isCover?: boolean }[]
  onMediaChange: (media: MediaFile[]) => void
  maxFiles?: number
}

export function MediaUploader({
  initialMedia = [],
  onMediaChange,
  maxFiles = 10,
}: MediaUploaderProps) {
  const [media, setMedia] = useState<MediaFile[]>(
    initialMedia.map(m => ({ ...m, isNew: false }))
  )
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files))
      }
    },
    [media, maxFiles]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(Array.from(e.target.files))
    }
  }

  const processFiles = (files: File[]) => {
    const newFiles = files.filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
    
    if (media.length + newFiles.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images.`)
      return
    }

    const newMediaItems = newFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      url: URL.createObjectURL(file),
      file,
      isNew: true,
      isCover: media.length === 0 // First image is cover by default
    }))

    const updatedMedia = [...media, ...newMediaItems]
    setMedia(updatedMedia)
    onMediaChange(updatedMedia)
  }

  const removeMedia = (idToRemove: string) => {
    const updatedMedia = media.filter(m => m.id !== idToRemove)
    // If we removed the cover, make the first item cover
    if (media.find(m => m.id === idToRemove)?.isCover && updatedMedia.length > 0) {
      updatedMedia[0].isCover = true
    }
    setMedia(updatedMedia)
    onMediaChange(updatedMedia)
  }

  const setAsCover = (id: string) => {
    const updatedMedia = media.map(m => ({
      ...m,
      isCover: m.id === id
    }))
    setMedia(updatedMedia)
    onMediaChange(updatedMedia)
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'border-2 border-dashed rounded-card p-8 text-center transition-colors',
          isDragging
            ? 'border-accent bg-accent/5'
            : 'border-border hover:border-border-light bg-bg-surface'
        )}
      >
        <input
          type="file"
          id="media-upload"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileSelect}
          disabled={isUploading || media.length >= maxFiles}
        />
        <label
          htmlFor="media-upload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="w-12 h-12 bg-bg-elevated rounded-full flex items-center justify-center mb-4 text-text-secondary">
            {isUploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <p className="text-body font-medium text-text-primary mb-1">
            Click or drag images & videos to upload
          </p>
          <p className="text-caption text-text-muted">
            PNG, JPG, MP4, WEBP up to 50MB. Max {maxFiles} files.
          </p>
        </label>
      </div>

      {/* Media Grid */}
      {media.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                'relative group aspect-[4/3] rounded-lg overflow-hidden border-2 bg-black',
                item.isCover ? 'border-accent' : 'border-border'
              )}
            >
              {(item.file?.type.startsWith('video/') || item.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={item.url}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between">
                  <button
                    type="button"
                    title="Set as Cover"
                    onClick={() => setAsCover(item.id)}
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                      item.isCover
                        ? 'bg-accent text-white'
                        : 'bg-white/20 text-white hover:bg-white/40'
                    )}
                  >
                    <Star className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    title="Remove"
                    onClick={() => removeMedia(item.id)}
                    className="w-8 h-8 bg-status-error/80 text-white rounded-full flex items-center justify-center hover:bg-status-error transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {item.isCover && (
                <div className="absolute bottom-0 left-0 right-0 bg-accent text-white text-[10px] font-bold uppercase tracking-wider text-center py-1">
                  Cover Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
