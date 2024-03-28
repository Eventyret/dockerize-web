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
import { defaultDockerComposeValues, dockerComposeFormSchema } from "@/lib/schema";
import { useDockerComposeFormStore } from '@/lib/store/userDockerComposeStore';
import { Input } from '../ui/input';

interface DockerComposeFormProps {
  show: boolean;
}
export function DockerComposeForm({ show }: DockerComposeFormProps) {
  const { setDockerComposeForm } = useDockerComposeFormStore();


  const form = useForm<z.infer<typeof dockerComposeFormSchema>>({
    resolver: zodResolver(dockerComposeFormSchema),
    defaultValues: defaultDockerComposeValues,
  });


  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name) {
        const newValue = { [name]: value[name] };
        setDockerComposeForm(newValue as Partial<z.infer<typeof dockerComposeFormSchema>>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setDockerComposeForm, form]);


  const database = form.watch("database");

  useEffect(() => {
    const defaultPorts = {
      mariadb: "3306",
      mysql: "3306",
      postgres: "5432",
    };

    // Update port based on selected database
    form.setValue("databasePort", defaultPorts[database] || "");
  }, [database, form]);



  TODO:
  // Add component to add custom build arguments of variables
  // Add a text area to paste in a .env file
  // Add a button to add a new environment variable
  // Add a button to remove an environment variable
  // Add a docker-compose file generator
  return (
    <>

      { show && (
        <Form { ...form }>
          <form className="w-full p-6 h-full">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-2">
              {/* Node Version */ }
              <FormField
                control={ form.control }
                name="database"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Database</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Database" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mariadb">MariaDB</SelectItem>
                        <SelectItem value="mysql">MySQL</SelectItem>
                        <SelectItem value="postgres">Postgres</SelectItem>
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
                name="databaseUser"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Database User</FormLabel>
                    <FormControl>
                      <Input  { ...field } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                ) }
              />
              <FormField
                control={ form.control }
                name="databasePort"
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
              <FormField
                control={ form.control }
                name="databasePassword"
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
      ) }


    </>

  );
}
