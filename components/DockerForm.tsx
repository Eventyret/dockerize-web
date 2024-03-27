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
  FormMessage
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormSchema } from '@/lib/schema'
import { useDockerStore } from '@/lib/store/useDockerStore'
import useLoadingStore from '@/lib/store/useLoadingStore'
import { useRouter } from 'next/navigation'
import LoadingOverlay from './LoadingOverlay'

export function DockerForm() {
  const router = useRouter();
  const { startLoading, stopLoading, setProgress } = useLoadingStore();
  const { setDockerConfig, toggleFormSubmission } = useDockerStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nodeVersion: "20",
      env: "development",
      packageManager: "yarn"
    }
  });



  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setDockerConfig(data.nodeVersion, data.env, data.packageManager);
    startLoading();
    toggleFormSubmission()
    router.push('/step/2')
  };


  const isLoading = useDockerStore((state) => state.isLoading);

  return (
    <>
      { !isLoading ? (
        <Form { ...form }>
          <form onSubmit={ form.handleSubmit(onSubmit) } className="w-full p-6 h-full">
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-x-2'>
              <FormField
                control={ form.control }
                name="nodeVersion"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Node Version</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
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
              <FormField
                control={ form.control }
                name="env"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Node Version</FormLabel>
                    <Select onValueChange={ field.onChange } defaultValue={ field.value }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
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
            </div>
            <div className='col-span-2'>
              <FormField
                control={ form.control }
                name="packageManager"
                render={ ({ field }) => (
                  <FormItem>
                    <FormLabel>Node Version</FormLabel>
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

            </div>

            <Button type="submit">Submit</Button>

          </form>

        </Form>
      ) : (
        (
          <LoadingOverlay />
        )
      )
      }


    </>
  )
}
