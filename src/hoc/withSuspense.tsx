import React from 'react'

export const withSuspense = <WCP>(WrappedComponent: React.ComponentType<WCP>) => {
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <WrappedComponent {...props} />
            </React.Suspense>
        )
    }
}
