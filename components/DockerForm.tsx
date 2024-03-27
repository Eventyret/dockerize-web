"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSchema, defaultValues } from "@/lib/schema";
import { useFormStore } from '@/lib/store/useFormStore';
import LoadingSpinner from './LoadingSpinner';
import { Input } from './ui/input';

export function DockerForm() {
  const { setForm } = useFormStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        // Ensuring 'name' is not undefined
        const newValue = { [name]: value[name] };
        setForm(newValue as Partial<z.infer<typeof FormSchema>>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setForm, form]);

  if (!isMounted) {
    return <LoadingSpinner />;
  }
  return (
    <Form { ...form }>
      <form className="w-full p-6 h-full">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-2">
          {/* Node Version */ }
          <FormField
            control={ form.control }
            name="nodeVersion"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Node Version</FormLabel>
                <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Node Version" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="16">Node 16</SelectItem>
                    <SelectItem value="18">Node 18</SelectItem>
                    <SelectItem value="20">Node 20</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            ) }
          />
          {/* Environment */ }
          <FormField
            control={ form.control }
            name="env"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Environment</FormLabel>
                <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Environment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            ) }
          />


          {/* Package Manager */ }
          <FormField
            control={ form.control }
            name="packageManager"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Package Manager</FormLabel>
                <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Package Manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yarn">Yarn</SelectItem>
                    <SelectItem value="npm">Npm</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="projectName"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input  { ...field } />
                </FormControl>

                <FormMessage />
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="user"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Node User</FormLabel>
                <FormControl>
                  <Input  { ...field } />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) }
          />
          <FormField
            control={ form.control }
            name="port"
            render={ ({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input  { ...field } />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) }
          />
        </div>
      </form>
    </Form >
  );
}
