import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularIndeterminate() {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">

                <CircularProgress />

                <p className="text-center text-medium text-bold text-xl">
                    Loading...
                </p>

            </div>
        </>
    );
}
