import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface Step4UploadPicturesProps {
  form: any;
  updateFormData: (newData: Record<string, any>) => void;
}

export const Step4UploadPictures: React.FC<
  Step4UploadPicturesProps
> = ({ form }) => {
  const [extraFields, setExtraFields] = useState<
    { id: number; name: string }[]
  >([]);

  const { setValue, setError, clearErrors, trigger } = form;
  const maxFields = 3;
  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

  const addExtraField = () => {
    setExtraFields((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length,
        name: `additionalPhotos[${prevFields.length}]`,
      },
    ]);
  };

  const compressImage = useCallback(
    async (
      file: File,
      maxWidth = 800,
      maxHeight = 600,
      quality = 0.7
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          // Resize if necessary
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Get the compressed data URL
          const dataURL = canvas.toDataURL('image/jpeg', quality); // You can also use 'image/webp' or 'image/png'
          resolve(dataURL);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = URL.createObjectURL(file); // Create a temporary URL
      });
    },
    []
  );

  const handleFileChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      fieldName: string
    ) => {
      const file = event.target.files?.[0];
      if (!file) {
        setValue(fieldName, undefined);
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setError(fieldName, {
          type: 'maxSize',
          message: `File size exceeds ${MAX_FILE_SIZE_MB}MB. Please select a smaller file.`,
        });
        event.target.value = ''; // Clear the input
        setValue(fieldName, undefined); // Clear form value, triggering validation
        return;
      }

      clearErrors(fieldName);

      // Compress the image *before* setting in form:
      compressImage(file)
        .then((compressedBase64) => {
          setValue(fieldName, compressedBase64); // Set the compressed base64 in form
        })
        .catch((error) => {
          console.error('Error compressing image:', error);
          setError(fieldName, {
            type: 'compressionError',
            message: 'Error compressing image', // Handle compression error
          });
        });
    },
    [compressImage, clearErrors, setError, setValue]
  );

  return (
    <Form {...form}>
      <form className="space-y-10 animate-fade-right animate-ease-in-out">
        <FormField
          control={form.control}
          name="frontPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Front Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Front Photo"
                  onChange={(e) => handleFileChange(e, 'frontPhoto')}
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from the front (Max. 5MB file
                size)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="backPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Back Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Back Photo"
                  onChange={(e) => handleFileChange(e, 'backPhoto')}
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from the back (Max. 5MB file
                size)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leftPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Left Side Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Left Side Photo"
                  onChange={(e) => handleFileChange(e, 'leftPhoto')}
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from your left side (Max. 5MB
                file size)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rightPhoto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Side Photo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Right Side Photo"
                  onChange={(e) => handleFileChange(e, 'rightPhoto')}
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from your right side (Max. 5MB
                file size)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dynamically rendering additional fields */}
        {extraFields.map((field, i) => (
          <FormField
            key={field.id}
            control={form.control}
            name={field.name}
            render={({ field: dynamicField }) => (
              <FormItem>
                <FormLabel>Additional Photo {i + 1}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder={`Additional Photo ${i + 1}`}
                    onChange={(e) => handleFileChange(e, field.name)}
                  />
                </FormControl>
                <FormDescription>
                  Upload an additional photo (Max. 5MB file size)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Button to add new fields */}
        <Button
          type="button"
          onClick={addExtraField}
          disabled={extraFields.length >= maxFields}>
          Add Additional Photo
        </Button>
      </form>
    </Form>
  );
};
