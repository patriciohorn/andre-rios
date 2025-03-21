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
> = ({ form, updateFormData }) => {
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

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) {
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

    // If the file is valid, proceed with reading it
    const reader = new FileReader();
    reader.onloadend = () => {
      //updateFormData({ [fieldName]: reader.result }); -- REMOVE THIS LINE
      setValue(fieldName, file); // Set the file object directly
    };
    reader.readAsDataURL(file);
  }

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
