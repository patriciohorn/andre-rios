import React, { useState } from 'react';
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
  const maxFields = 3;

  const addExtraField = () => {
    setExtraFields((prevFields) => [
      ...prevFields,
      {
        id: prevFields.length,
        name: `extraPhoto${prevFields.length + 1}`,
      },
    ]);
  };

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) {
    const file = event.target.files?.[0];
    if (file) {
      // FileReader returns an object
      const reader = new FileReader();
      // loadend -> fired when a read has completed, successfully or not
      reader.onloadend = () => {
        updateFormData({ [fieldName]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-8 animate-fade-right animate-ease-in-out">
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
                  onChange={(e) =>
                    handleFileChange(e, 'frontPhotoDataUrl')
                  }
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from the front
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
                  onChange={(e) =>
                    handleFileChange(e, 'backPhotoDataUrl')
                  }
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from the back
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
                  onChange={(e) =>
                    handleFileChange(e, 'leftPhotoDataUrl')
                  }
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from your left side
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
                  onChange={(e) =>
                    handleFileChange(e, 'rightPhotoDataUrl')
                  }
                />
              </FormControl>
              <FormDescription>
                Please upload a photo from your right side
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
                    onChange={(e) =>
                      dynamicField.onChange(e.target.files?.[0])
                    }
                  />
                </FormControl>
                <FormDescription>
                  Upload an additional photo
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
