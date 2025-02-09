"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    name: z.string().min(5, {
    message: "List must be at least 5 characters.",
  }),
})

export function ProfileForm() {
    const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  })

   return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-28">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add New List</FormLabel>
              <FormControl>
                <Input placeholder="add your new list here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    // POST request to create a new list
      const addlist = async (name: string) => {
        const res = await fetch(`http://127.0.0.1:8000/add/lists`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        return data;
    }

    addlist(values.name).then((data) => {
    if (data) router.push('/');
    });
    console.log(values)
  }
}
