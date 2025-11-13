import React, { useState, useEffect } from 'react';

const ChangingProgressProvider = (props) => {
    const { values, interval, changeInterval, children } = props;
    const [valuesIndex, setValuesIndex] = useState(0);

    useEffect(() => {
        let progressInterval;

        const handleIntervalChange = () => {
            setValuesIndex(0);
            clearInterval(progressInterval);
            progressInterval = setInterval(() => {
                setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
            }, interval);
        };

        if (clearInterval) {
            clearInterval(progressInterval);
        } else if (changeInterval) {
            handleIntervalChange();
        } else if (values.length !== props.values.length) {
            progressInterval = setInterval(() => {
                setValuesIndex((prevIndex) => (prevIndex + 1) % values.length);
            }, interval);
        } else if (values[valuesIndex] === values[values.length - 1]) {
            clearInterval(progressInterval);
        }

        return () => {
            clearInterval(progressInterval);
        };
    }, [values, interval, clearInterval, changeInterval, valuesIndex]);

    return children(values[valuesIndex]);
};

ChangingProgressProvider.defaultProps = {
    interval: 1000,
};

export default ChangingProgressProvider;
