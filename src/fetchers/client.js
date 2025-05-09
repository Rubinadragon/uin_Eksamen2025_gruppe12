import { createClient } from 'https://esm.sh/@sanity/client';

export const client = createClient({
    projectId: '3yo9k4vo',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-09',
});