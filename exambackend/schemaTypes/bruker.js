export const bruker = {
    name: 'bruker',
    title: 'Bruker',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Navn',
            type: 'string',
        },
        {
            name: 'gender',
            title: 'Kjønn',
            type: 'string',
            options: {
                list: [
                    {title: 'Kvinne', value: 'kvinne'},
                    {title: 'Mann', value: 'mann'},
                    {title: 'Udefinert', value: 'udefinert'},
                ],
            },
        },
        {
            name: 'age',
            title: 'Alder',
            type: 'number',
        },
        {
            name: 'email',
            title: 'E-post',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Profil bilde',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    description: 'beskrivelse av bildet'
                },
            ],
        },
        {
            name: 'friends',
            title: 'Venner',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'bruker'}]
                },
            ],
        },
        {
            name: 'previousPurchases',
            title: 'Liste over kjøpte events',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{type: 'event'}] 
                },
            ],
        },
        {
            name: 'wishlist',
            title: 'Liste over ønskede events',
            type: 'array',
            of: [
                {
                    type: 'reference', 
                    to: [{type: 'event'}]
                },
            ],
        },
    ],
};