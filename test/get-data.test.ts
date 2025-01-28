import getData from '../src/api/get-data';


global.fetch = jest.fn();

describe('getData', () => {
  const mockFetch = fetch as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('coming data when the response is successful', async () => {
    const mockResponse = { data: 'some-data' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    } as {
      ok: boolean;
      json: jest.Mock;
    });

    const result = await getData('36406704', 'en');

    expect(mockFetch).toHaveBeenCalledWith(
      'https://tracking.bosta.co/shipments/track/36406704',
      {
        headers: {
          'x-requested-by': 'Bosta',
          'Accept-Language': 'en',
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it('client error when response is not ok', async () => {
    const mockErrorResponse = { error: 'Something went wrong' };
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce(mockErrorResponse),
    } as {
      ok: boolean;
      json: jest.Mock;
    });

    const result = await getData('36406704', 'en');

    expect(result).toEqual({ ...mockErrorResponse, isClientError: true });
  });

  it('network error on fetch fail', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network Error'));

    const result = await getData('36406704', 'en');

    expect(result).toEqual({ networkError: true });
  });

  it('empty JSON response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(null),
    } as {
      ok: boolean;
      json: jest.Mock;
    });

    const result = await getData('36406704', 'en');

    expect(result).toBeNull();
  });
});
