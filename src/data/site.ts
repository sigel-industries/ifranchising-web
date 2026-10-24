export const contact = {
  org: 'Český institut pro franchising, s.r.o.',
  short: 'ČIFRA',
  street: 'Spálená 51',
  city: '110\u00a000 Praha\u00a01',
  phone: '+420 226 518 868',
  ico: '274 07 233',
  register: 'Zapsáno v obchodním rejstříku vedeném Městským soudem v Praze, oddíl C, vložka 110114.',
  facebook: 'https://fb.com/franchiseclub.cz',
  people: [
    {
      name: 'RNDr. Jaroslav Tamchyna',
      role: 'ředitel ČIFRA, prezident Franchise Clubu, poradce pro franšízing',
      phone: '+420 603 578 035',
      email: 'tamchyna@ifranchising.cz',
    },
    {
      name: 'Ing. Tereza Chábková',
      role: 'office manager ČIFRA, tajemnice Franchise Clubu',
      phone: '+420 603 474 035',
      email: 'office@ifranchising.cz',
    },
  ],
};

export const practical = {
  venue: 'Magenta Experience Center (T-Mobile) v přízemí OC Arkády Pankrác, Na Pankráci 86, 140\u00a000 Praha\u00a04',
  mapUrl: 'https://maps.google.com/?q=OC+Ark%C3%A1dy+Pankr%C3%A1c,+Na+Pankr%C3%A1ci+86,+Praha+4',
  audience: 'Členové klubu, vážní zájemci o členství a omezený počet platících nečlenů.',
  prices: [
    ['Členové a jejich hosté', 'zdarma'],
    ['Nečlenové', '900 Kč'],
    ['Partneři', '600 Kč'],
    ['Studenti a učitelé', '300 Kč'],
  ] as [string, string][],
  priceNote:
    'Součástí vstupenky je slevový kupón ve výši třetiny ceny na příští večer (lze ho i darovat). Platí se u vstupu v hotovosti nebo QR kódem, vstupenka slouží jako daňový doklad.',
  dress: 'Smart casual – pohodlně, ale elegantně.',
  photo: 'Na akcích pořizujeme fotografie a audiovizuální záznamy.',
};

export type Partner = { name: string; url: string; logo: string; text?: string };

export const patrons: Partner[] = [
  {
    name: 'Magenta Experience Center',
    url: 'https://magentaexperience.cz/',
    logo: 'logo-magenta-experience-center.png',
    text: 'Unikátní zážitkové centrum společnosti T-Mobile a místo konání klubových večerů.',
  },
];

export const productPartners: Partner[] = [
  { name: 'Rodinný pivovar BERNARD', url: 'https://www.bernard.cz/', logo: 'bernard175.jpg', text: 'Český rodinný pivovar z Humpolce.' },
  { name: 'Burger King', url: 'https://burgerking.cz/', logo: 'logo-burger-king.png', text: 'Řetězec rychlého občerstvení – burgery, nugetky i kyblík hranolků.' },
  { name: 'Dallmayr', url: 'https://kava-servis.cz/', logo: 'dallmayr2016.jpg', text: 'Nevšední káva pro každou příležitost.' },
  { name: 'Fruitisimo', url: 'https://www.fruitisimo.cz/', logo: 'fruitisimo.jpg', text: 'Jednička v prodeji zmrzliny a čerstvých džusů připravovaných před očima zákazníka.' },
  { name: 'KFC', url: 'https://www.kfc.cz/', logo: 'logo-kfc.png', text: 'Síť rychlého občerstvení s jídly z kuřecího masa.' },
  { name: 'Kitl', url: 'https://www.kitl.cz/', logo: 'logo-kitl.png', text: 'Výrobce přírodních sirupů a šťáv.' },
  { name: 'Fornetti', url: 'https://www.fornetti.cz/', logo: 'fornetti175.jpg', text: 'Národní poskytovatel franšízy a největší řetězec sladkého a slaného pečiva v Česku.' },
  { name: 'Pizza Hut', url: 'https://pizzahut.cz/', logo: 'logo-pizza-hut.jpg', text: 'Síť pizzerií.' },
  { name: 'UGO', url: 'https://www.ugo.cz/', logo: 'logo-ugo-salaterie.png', text: 'Salaterie a freshbary – drinky, svačiny a lehká jídla z přírodních surovin.' },
];

export const expertPartners: Partner[] = [
  { name: 'Česká marketingová společnost', url: 'http://www.cms-cma.cz/', logo: 'logo-cms-sidebar.gif' },
  { name: 'FranKey – franchising consulting', url: '/poradenstvi/', logo: 'frankey-consulting.gif' },
  { name: 'Ipsos', url: 'https://www.ipsos.cz/', logo: 'logo-ipsos-sidebar.jpg', text: 'Přední agentura výzkumu trhu a veřejného mínění, působící v 88 zemích.' },
];

export const nav = [
  ['akce/', 'Akce'],
  ['klub/', 'Klub'],
  ['franchising/', 'Franchising'],
  ['poradenstvi/', 'Poradenství'],
  ['o-nas/', 'O nás'],
  ['partneri/', 'Partneři'],
  ['faq/', 'FAQ'],
  ['kontakt/', 'Kontakt'],
] as const;
