'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ImageUploadFieldProps {
  value: { url: string; alt?: string }[];
  onChange: (value: { url: string; alt?: string }[]) => void;
}

export default function ImageUploadField({
  value = [],
  onChange,
}: ImageUploadFieldProps) {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');

  const addImage = () => {
    if (!newImageUrl.trim()) return;

    const newImage = {
      url: newImageUrl,
      alt: newImageAlt || undefined,
    };

    onChange([...value, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');
  };

  const removeImage = (index: number) => {
    const newImages = [...value];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {value.map((image, index) => (
          <div key={index} className="relative rounded-md border p-2">
            <div className="aspect-square overflow-hidden rounded-md">
              <Image
                src={image.url || '/placeholder.svg'}
                alt={image.alt || `Pet image ${index + 1}`}
                width={200}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500 truncate max-w-[80%]">
                {image.alt || `Image ${index + 1}`}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Input
              placeholder="Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Image Alt Text (optional)"
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addImage}
          disabled={!newImageUrl.trim()}
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
    
      </div>
    </div>
  );
}
