import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

// Form Schema
const filesSchema = z.object({
  file: z.any()
});

export const Step4UploadPictures = ({ onSubmit }: any) => {
  const form = useForm<z.infer<typeof filesSchema>>({
    resolver: zodResolver(filesSchema)
  });

  const fileRef = form.register('file');

  const handleFormSubmit = () => {
    onSubmit();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="w-full p-10 animate-fade-right animate-ease-in-out">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Upload Picture</FormLabel>
                <FormControl>
                  <Input type="file" placeholder="Front Photo" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
