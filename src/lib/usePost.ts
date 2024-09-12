import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../axios-client';

const usePost = (url, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postData = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.post(url, params);
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        postData();
    }, [url]);

    return { data, loading, error };
};

export default usePost;