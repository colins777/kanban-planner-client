'use client'

import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {PropsWithChildren, useEffect, useState} from 'react';
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";

export function Providers({children}:PropsWithChildren ) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    refetchOnWindowFocus: false
                }
            }
        })
    )

    useEffect(() => {
        // if (typeof window !== 'undefined') {

        console.log('serviceWorkerRegistration.register')
        serviceWorkerRegistration.register();
        //  }
    }, []);

    return (
        <QueryClientProvider client={client}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}



