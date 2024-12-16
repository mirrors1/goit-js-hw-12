import axios from 'axios';

const API_KEY = '47379272-a961c7172d29abe92af06f616';

export const searchParams = new URLSearchParams({
  key: API_KEY,
  q: 'yellow+flower',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 15,
});

const BASE_URL = `https://pixabay.com/api/`;

export async function loadData(
  url = BASE_URL,
  options = { params: searchParams }
) {
  const { data } = await axios(url, options);
  return data;
}
