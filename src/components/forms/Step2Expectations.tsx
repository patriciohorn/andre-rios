import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Form Schema
const ExpectationsSchema = z.object({
  desiredProcedure: z.string().min(1, 'Desired procedure is required')
});
export const Step2Expectations = ({ onNext, onBack }: any) => {
  const form = useForm<z.infer<typeof ExpectationsSchema>>({
    resolver: zodResolver(ExpectationsSchema),
    defaultValues: {
      desiredProcedure: ''
    }
  });

  const onSubmit = () => {
    onNext();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 animate-fade-right animate-ease-in-out">
        <FormField
          control={form.control}
          name="desiredProcedure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Desired procedure</FormLabel>
              <FormControl>
                <Input placeholder="Desired Procedure" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
};
