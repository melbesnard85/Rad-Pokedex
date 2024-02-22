import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import React, { useState } from "react"

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider