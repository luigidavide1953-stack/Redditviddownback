import { v4 as uuidv4 } from 'uuid';

export const generateUniqueId = (): string => {
  return uuidv4();
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const getDomainFromUrl = (url: string): string | null => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (error) {
    return null;
  }
};
