export const event = {
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        {
            name: 'tittel',
            title: 'Tittel',
            type: 'string',
        },
        {
            name: 'apiId',
            title: 'API ID',
            type: 'string',
            descrition: 'ID from Ticketmaster API',
        },        
        {
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    {title: 'Sport', value: 'sport'},
                    {title: 'Show', value: 'show'},
                    {title: 'Festival', value: 'festival'},
                ],
            },
        },
    ],
    preview: {
        select: {
            title: 'tittel',
        },
    },
};