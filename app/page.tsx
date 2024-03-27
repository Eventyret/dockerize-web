import { Sidebar } from '@/components/Sidebar'

export default function Home() {

  return (
    <div className="flex min-h-screen w-full flex-col">

      <Sidebar />
      <div className="flex min-h-0 w-full">
        <div className="flex-1 min-h-0">
          <div className="grid min-h-[calc(100vh_-_theme(spacing.20))_]">
            <div className="grid gap-4 p-4 md:gap-6 lg:p-8">
              <div className="container mx-auto grid gap-4">
                <div className="mx-auto space-y-2 text-center">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Welcome to the Example
                  </h1>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    This is an example of a smooth scrolling single page layout with a fixed sidebar.
                  </p>
                </div>
                <div className="grid gap-4" id="config">
                  <div className="mx-auto space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Config</h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Customize your experience with the config options.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4" id="setup">
                  <div className="mx-auto space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Setup</h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      Get started with the easy setup process.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4" id="files">
                  <div className="mx-auto space-y-2">
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Files</h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                      View the files associated with this example.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
