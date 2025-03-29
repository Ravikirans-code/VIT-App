"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"

interface FileUploadProps {
  "aria-labelledby"?: string
}

export function FileUpload(props: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create a preview URL for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (event) => {
          setPreview(event.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
  }

  return (
    <div className="space-y-2" {...props}>
      {!file ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md p-6 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mb-2" aria-hidden="true" />
          <p className="text-sm text-muted-foreground mb-2">Drag and drop your file here or click to browse</p>
          <Button variant="outline" size="sm" className="relative" type="button">
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              aria-label="Upload file"
            />
            Browse Files
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between border rounded-md p-3">
          <div className="flex items-center gap-3">
            {preview ? (
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img src={preview || "/placeholder.svg"} alt="File preview" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
            )}
            <div>
              <p className="text-sm font-medium">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleRemoveFile} aria-label="Remove file">
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  )
}

