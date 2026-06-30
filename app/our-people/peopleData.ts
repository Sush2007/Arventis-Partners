interface PracticeHighlight {
  id: string;
  text: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  discipline: 'Strategy Consulting' | 'Legal' | 'Advocates';
  title: string;
  experience: string; 
  geographies: string[]; 
  shortBio: string;
  fullBio: string;
  highlights: PracticeHighlight[];
  imagePath: string;
}

export const peopleData: Person[] = [
  {
    id: 'anshuman',
    slug: 'anshuman-mohanty',
    name: 'Anshuman Mohanty',
    discipline: 'Strategy Consulting',
    title: 'Founding Partner, Strategy Consulting',
    experience: '11+ Years',
    geographies: ['India', 'GCC', 'UK', 'US', 'South Korea'],
    shortBio: 'Eleven years at the sharp end of growth decisions, holding P&L ownership across consulting, BFSI, government, and technology-led businesses.',
    fullBio: 'Anshuman has spent eleven years at the sharp end of growth decisions, holding P&L ownership across consulting, BFSI, government, and technology-led businesses as Co-Founder, Business Head, and Strategic Sales Leader. He has built markets, run sales organisations, led government digital transformation, and executed cross-border entries across five geographies.\nThe discipline he brings to every engagement is the same: rigorous diagnosis, a strategy built to be executed rather than presented, and the commitment to stay in the room through implementation.',
    highlights: [
      { id: 'a1', text: 'P&L leadership across multi-geography corporate and state initiatives' },
      { id: 'a2', text: 'Architect of sales operating models and go-to-market strategies in five countries' },
      { id: 'a3', text: 'Digital transformation lead recognised at the World Economic Forum' }
    ],
    imagePath: '/Anshuman.jpg'
  },
  {
    id: 'kumar-suman',
    slug: 'kumar-suman',
    name: 'Kumar Suman',
    discipline: 'Legal',
    title: 'Founding Partner, Legal',
    experience: '10+ Years',
    geographies: ['Delhi', 'Himachal Pradesh'],
    shortBio: 'A decade of advocacy, litigation, and public interest law, with a focus on arbitration, land acquisition, infrastructure, and public law.',
    fullBio: 'Kumar has built his practice across a decade of advocacy, litigation, and public interest law, with a focus on arbitration, land acquisition, infrastructure, and public law. He comes to each mandate as a litigator accountable for outcomes, not an advisor offering opinions from a distance.\nHis work involves cases with real consequence: landowners displaced by acquisition, communities navigating rehabilitation, infrastructure projects caught between private enterprise and regulatory complexity.',
    highlights: [
      { id: 's1', text: 'Represented landowners in acquisition disputes on rehabilitation and compensation' },
      { id: 's2', text: 'Handled arbitration and infrastructure litigation involving government agencies and private enterprises' },
      { id: 's3', text: 'Led public interest litigation on displacement and equitable development' }
    ],
    imagePath: '/Suman.jpg'
  },
  {
    id: 'yash-thakur',
    slug: 'yash-thakur',
    name: 'Yash Thakur',
    discipline: 'Advocates',
    title: 'Advocate, Corporate & Commercial Litigation',
    experience: 'Bar Council',
    geographies: ['High Court & Commercial Courts'],
    shortBio: 'Represents corporate clients and institutional investors in commercial recovery, contract enforcement, and shareholder disputes.',
    fullBio: 'Yash represents corporate clients and institutional investors in commercial recovery, contract enforcement, and shareholder disputes, working closely with the senior bench to prepare evidentiary strategy for complex commercial trials.\nHis focus is on the procedural and evidentiary groundwork that determines outcomes in trial and appellate courts, work that often decides a case before arguments are even heard.',
    highlights: [
      { id: 'y1', text: 'Commercial recovery and contract enforcement litigation' },
      { id: 'y2', text: 'Shareholder and corporate dispute representation' },
      { id: 'y3', text: 'Evidentiary strategy for complex commercial trials' }
    ],
    imagePath: '/yash.png'
  },
  {
    id: 'sweta',
    slug: 'sweta',
    name: 'Sweta',
    discipline: 'Advocates',
    title: 'Senior Advocate, High Court & Arbitral Practice',
    experience: '15+ Years',
    geographies: ['High Court of Himachal Pradesh', 'District Courts', 'Arbitral Tribunals'],
    shortBio: 'Fifteen years representing institutions and individuals navigating complex disputes, criminal prosecutions, and infrastructure litigation.',
    fullBio: 'Sweta has built her practice across fifteen years representing institutions and individuals where the stakes are real, government bodies, public sector undertakings, financial institutions, and corporates navigating complex disputes, criminal prosecutions, and infrastructure litigation. Her clients include organisations in infrastructure, energy, banking, and insurance, retaining counsel for matters that carry consequence, not appearances.\nShe appears regularly before the High Court of Himachal Pradesh and district courts across the state, building her practice on meticulous preparation and litigation strategy grounded in the specific facts of each matter.',
    highlights: [
      { id: 'sw1', text: 'Standing before the High Court of Himachal Pradesh and district courts' },
      { id: 'sw2', text: 'Institutional and ad-hoc arbitral proceedings in infrastructure and construction' },
      { id: 'sw3', text: 'Banking recovery proceedings and regulatory compliance work' }
    ],
    imagePath: '/sweta.jpg'
  },
  {
    id: 'adarsh',
    slug: 'adarsh-prabhat-asthana',
    name: 'Adarsh Prabhat Asthana',
    discipline: 'Advocates',
    title: 'Senior Advocate, High Court & Banking Appellate',
    experience: '14+ Years',
    geographies: ['Allahabad High Court', 'Lucknow Bench', 'DRT'],
    shortBio: 'Fourteen years building a practice defined by results in contested terrain: civil litigation, debt recovery, banking and financial disputes, revenue matters, arbitration, and bail.',
    fullBio: 'Adarsh has spent fourteen years building a practice defined by results in contested terrain: civil litigation, debt recovery, banking and financial disputes, revenue matters, arbitration, and bail. His focus is on procedural command and strategic clarity, the elements that determine outcomes rather than presentation.\nHe appears regularly before the High Court of Judicature at Allahabad, District and Sessions Courts, Revenue Courts, the Debt Recovery Tribunal, and Arbitral Tribunals, taking the brief, building the position, and seeing it through.',
    highlights: [
      { id: 'ad1', text: 'Standing before the Allahabad High Court, Judicature and Lucknow Bench' },
      { id: 'ad2', text: 'Practice before the Debt Recovery Tribunal and Revenue Courts' },
      { id: 'ad3', text: 'Banking and financial disputes, debt recovery, and bail advocacy' }
    ],
    imagePath: '/adarsh.jpg'
  }
];
