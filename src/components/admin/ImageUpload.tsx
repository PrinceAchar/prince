"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  className?: string;
}

export default function ImageUpload({ value, onChange, folder = "princeachar/admin", label, className = "" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file, folder);
      setPreview(url);
      onChange(url);
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-[12px] font-medium text-brand-black mb-1.5">{label}</label>
      )}
      <div
        className="relative border-2 border-dashed border-brand-black/15 rounded-xl overflow-hidden hover:border-red/30 transition-colors cursor-pointer group"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <div className="relative aspect-video bg-brand-black/5">
            <Image
              src={preview}
              alt="Uploaded image"
              fill
              className="object-cover"
              sizes="300px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1.5 rounded-lg">
                Click or drag to replace
              </span>
            </div>
          </div>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center gap-2 bg-brand-black/3">
            {uploading ? (
              <div className="w-6 h-6 border-2 border-red border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-8 h-8 text-gray/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
                <span className="text-[12px] text-gray/60">Click or drag image</span>
              </>
            )}
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>
      {preview && (
        <button
          type="button"
          onClick={() => { setPreview(""); onChange(""); }}
          className="mt-1.5 text-[11px] text-red hover:text-red-dark transition-colors"
        >
          Remove image
        </button>
      )}
    </div>
  );
}
