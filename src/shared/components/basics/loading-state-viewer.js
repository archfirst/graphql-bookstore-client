import * as React from 'react';
import { BusyIndicator } from './busy-indicator';

const LoadingStateViewer = Component => props => {
    const { loading, error } = props;

    if (loading) {
        return <BusyIndicator />;
    } else if (error) {
        return (
            <div>
                {error.message}
            </div>
        );
    }

    return <Component {...props} />;
};

export { LoadingStateViewer };
