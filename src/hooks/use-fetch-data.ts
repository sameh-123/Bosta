import { useEffect, useState } from 'react';
import getData from '../api/get-data';
import type { TrackingData, clientError } from '../types';

export default function useFetchData(id: string, lang: string) {
  const [data, setData] = useState<TrackingData | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [isServerError, setServerError] = useState(false);
  const [clientError, setError] = useState<clientError | null>(null);
  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchData = async () => {
        const comingData = await getData(id, lang);
        setLoading(false);
        if (comingData.networkError) {
          setServerError(true);
          setError(null);
          setData(null);
        } else if (comingData.isClientError) {
          setError(comingData);
          setServerError(false);
          setData(null);
        } else {
          setError(null);
          setServerError(false);
          setData(comingData);
        }
      };
      fetchData();
    }
  }, [id, lang]);
  return { data, isLoading, clientError, isServerError };
}
