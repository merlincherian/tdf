const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seed() {
  const clientsData = [
    {
      client_name: 'Jerry Peringattu',
      phone_number: null,
      email: 'jerryperingattu@gmail.com',
      event_date: null,
      event_venue: 'St. Thomas Syro Malabar Chur ch (608 Welsh Rd)',
      event_description: '25th Anniversar y',
      total: 2155.0,
    },
    {
      client_name: 'Dhanya Panicker',
      phone_number: '847-691-8882',
      email: 'dhanspanicker@gmail.com',
      event_date: new Date('2024-01-14'),
      event_venue: '',
      event_description: '',
      total: 1030.0,
    },
    {
      client_name: 'Lijo Mathew',
      phone_number: '(267) 474-4833',
      email: 'lijomath1919@gmail.com',
      event_date: null,
      event_venue: null,
      event_description: 'Baptism',
      total: 954.0,
    },
    {
      client_name: 'Aditi Mukherjee',
      phone_number: '8625764081',
      email: 'aditi.mukherjee12@gmail.com',
      event_date: null,
      event_venue: 'Deewan - 560 Stelton Rd, Piscataway,NJ, 08854',
      event_description: '1st Birthday',
      total: 1900.0,
    },
    {
      client_name: null,
      phone_number: '732-862-7984',
      email: null,
      event_date: new Date('2024-05-11'),
      event_venue: null,
      event_description: null,
      total: null,
    },
    {
      client_name: 'Ansu Pachikar a',
      phone_number: '(215)-430-2501',
      email: 'a@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: 'Holy Communion',
      total: 1500.0,
    },
    {
      client_name: 'Marina Mathew',
      phone_number: '484-947-6156',
      email: 'marinamathew32@gmail.com',
      event_date: null,
      event_venue: 'Crowne Plaza, King of Purssia',
      event_description: 'Engagement',
      total: 1470.0,
    },
    {
      client_name: 'Pishon Karumathy',
      phone_number: null,
      email: 'KarumathyPishonek@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1325.0,
    },
    {
      client_name: 'Ann Joy',
      phone_number: '845-664-0051',
      email: 'Joyannjoy30@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 850.0,
    },
    {
      client_name: 'Nisha Mistry',
      phone_number: '856-287-4690',
      email: 'y15@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: 'Haldi and Mehendi',
      total: 1484.0,
    },
    {
      client_name: 'Sindhu John',
      phone_number: '267-334-0580',
      email: 'sindhutjohn88@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1060.0,
    },
    {
      client_name: 'Janisha Kurian',
      phone_number: '215-603-8315',
      email: 'jithinjanishak@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 350.0,
    },
    {
      client_name: 'Rony Abraham',
      phone_number: '267-506-3444',
      email: 'Ronyabraham63@yahoo.com',
      event_date: new Date('2024-03-16'),
      event_venue: '',
      event_description: '',
      total: 922.0,
    },
    {
      client_name: 'Annu Thomas',
      phone_number: '215-350-2048',
      email: 'seeba1987@gmail.com',
      event_date: new Date('2023-11-11'),
      event_venue: '',
      event_description: '',
      total: 877.0,
    },
    {
      client_name: 'Jansu Thomas',
      phone_number: '215-900-3199',
      email: 'Thomasjiltjansu24@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1850.0,
    },
    {
      client_name: 'Prenil Poulose',
      phone_number: '215-913-7013',
      email: 'pprenil@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1425.0,
    },
    {
      client_name: 'Pooja Kothari',
      phone_number: '(610)-6635120',
      email: 'pooja.kothari@gmail.com',
      event_date: new Date('2023-12-16'),
      event_venue: '',
      event_description: '',
      total: 4650.0,
    },
    {
      client_name: 'Toshen Thomas',
      phone_number: '215-688-3647',
      email: 'toshenmthomas@gmail.com',
      event_date: new Date('2024-05-25'),
      event_venue: '',
      event_description: '',
      total: 4025.0,
    },
    {
      client_name: 'Geo Varkey',
      phone_number: '(267)540-7853',
      email: 'ams15@gmail.com',
      event_date: null,
      event_venue: 'St. Thomas Syro Malabar Chur ch Philadelphia',
      event_description: null,
      total: 1563.0,
    },
    {
      client_name: 'Sarah Mathew',
      phone_number: '215-738-1107',
      email: 'sarahrmathew@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 700.0,
    },
    {
      client_name: 'Thomas Simon',
      phone_number: '267-244-3320',
      email: 'simonthomas130@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1420.0,
    },
    {
      client_name: 'Sherin Shaji',
      phone_number: '201-245-2045',
      email: 'Shajisherinandsean@gmail.com',
      event_date: null,
      event_venue: '',
      event_description: '',
      total: 1000.0,
    },
    {
      client_name: 'Regies Thoonkuzhy',
      phone_number: '267-902-9681',
      email: 'Regiescyriac86@gmail.com',
      event_date: null,
      event_venue: 'St.   Thomas   Syro   Malabar   Chur ch   Philadelphia',
      event_description: 'Baptism   &   Holy   Communion',
      total: 900.0,
    },
  ];

  try {
    for (const clientData of clientsData) {
      // Skip if email is null (as it's unique and required)
      if (!clientData.email) {
        console.warn(
          `Skipping client "${clientData.client_name}" due to missing email.`,
        );
        continue;
      }

      const existingClient = await prisma.client.findUnique({
        where: { email: clientData.email },
      });

      if (!existingClient) {
        await prisma.client.create({
          data: {
            name: clientData.client_name,
            phone_number: clientData.phone_number,
            email: clientData.email,           
          },
        });
        console.log(
          `Client "${clientData.client_name || clientData.email}" created.`,
        );
      } else {
        console.log(
          `Client with email "${clientData.email}" already exists. Skipping.`,
        );
      }
    }
    console.log('Client seeding process completed.');
  } catch (error) {
    console.error('Error seeding clients:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
