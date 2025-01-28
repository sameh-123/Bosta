export default async function getData(id: string, lang: string) {
  try {
    const response = await fetch(
      `https://tracking.bosta.co/shipments/track/${id}`,
      {
        headers: {
          'x-requested-by': 'Bosta',
          'Accept-Language': lang,
        },
      }
    );
    const fetchedData = await response.json();
    if (!response.ok) {
      return { ...fetchedData, isClientError: true };
    }
    return fetchedData;
  } catch (err) {
    console.error(err);
    return {
      networkError: true,
    };
  }
}
