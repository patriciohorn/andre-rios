import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const Step4UploadPictures = ({ form }: any) => {
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Please upload a photo from the front</FormDescription>
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Please upload a photo from the back</FormDescription>
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Please upload a photo from your left side</FormDescription>
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
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                />
              </FormControl>
              <FormDescription>Please upload a photo from your right side</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
