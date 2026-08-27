import type { MessageSchema } from './zh-CN'

// 显式标注为 MessageSchema：漏翻或键名写错会在此处报类型错误
const messages: MessageSchema = {
  nav: {
    language: 'Language',
    products: 'Products',
    newsCenter: 'News',
    about: 'About LightInfra',
    contact: 'Contact',
    joinUs: 'Join Us',
    applyDemo: 'Apply Demo',
    startUsing: 'Get Started',
    homeAriaLabel: 'LightInfra Home',
    mainNavAriaLabel: 'Main Navigation',
    productOpticsgptTitle: 'OpticsGPT',
    productOpticsgptDesc: 'A professional large language model for the optics domain',
    productIftsTitle: 'IFTS Simulation Tool',
    productIftsDesc: 'A Python-based open-source intelligent optical communication simulation tool',
    productInstrumentsTitle: 'Smart Instruments',
    productInstrumentsDesc: 'Automated test task parsing and instrument control'
  },
  common: {
    applyDemo: 'Apply Demo',
    startUsing: 'Get Started',
    viewDetails: 'View Details',
    viewMore: 'View More',
    readMore: 'Read More',
    readArticle: 'Read Article',
    loadMore: 'Load More'
  },
  footer: {
    products: 'Products',
    opticsgpt: 'OpticsGPT',
    ifts: 'IFTS Simulation Tool',
    instruments: 'Smart Instruments',
    newsCenter: 'News',
    news: 'News',
    research: 'Research',
    aboutLightInfra: 'About LightInfra',
    contact: 'Contact Us',
    contactUs: 'Contact',
    bizContact: "Business: business{'@'}infra.com",
    hrContact: "Careers: hr{'@'}infra.com"
  },
  home: {
    heroTitle: 'Intelligent Optics, Create the Future',
    heroDesc: 'Based on optical large models and agent technology, Guangzhiyu is driving optical R&D, testing and operations from an experience-driven approach toward the era of intelligence',
    platformTitle: 'Make Complex Optical Systems Intelligent',
    platformDesc: 'Centered on the optical domain-specific large model, integrating professional knowledge, agents and engineering data to empower optical design, instrument testing, device calibration and network operations, driving the optical industry from experience-driven to intelligence-driven.',
    rdLabel: 'R&D',
    rdOpticalDesign: 'Optical Design',
    rdDeviceSim: 'Device Simulation',
    platformName: 'Intelligent Optical Platform',
    gptLabel: 'OpticsGPT Large Model',
    gptCap: 'Domain-specific large model capability',
    agentLabel: 'Optical Agent',
    agentCap: 'Agent collaboration capability',
    prodLabel: 'Production: Test & Operations',
    prodSpectrumCal: 'Spectrum Calibration',
    prodWavefrontTest: 'Wavefront Testing',
    prodLinkSim: 'Link Simulation',
    prodNetOpm: 'Network Operations',
    opticsgptTitle: 'OpticsGPT',
    opticsgptDesc: 'A domain-specific large model for the optical industry, delivering professional intelligent capabilities for research, development and engineering applications',
    aiOpticsTitle: 'AI Is Entering Every Stage of Optics',
    aiOpticsNavigation: 'Intelligent optics carousel navigation',
    aiOpticsPrevious: 'Previous item',
    aiOpticsNext: 'Next item',
    aiOpticsSlideStatus: 'Item {current} of {total}: {title}',
    aiOpticsSlides: {
      research: {
        name: 'Optical R&D',
        title: 'Optical R&D placeholder',
        description: 'Final visuals and business copy will replace this placeholder after the design delivery.',
        alt: 'Placeholder visual for the optical R&D carousel item'
      },
      testing: {
        name: 'Optical Testing',
        title: 'Optical testing placeholder',
        description: 'Final visuals and business copy will replace this placeholder after the design delivery.',
        alt: 'Placeholder visual for the optical testing carousel item'
      },
      operations: {
        name: 'Optical Operations',
        title: 'Optical operations placeholder',
        description: 'Final visuals and business copy will replace this placeholder after the design delivery.',
        alt: 'Placeholder visual for the optical operations carousel item'
      }
    },
    researchTitle: 'Latest Research',
    researchDesc: 'Frontier insights · Academic research · Engineering practice',
    articleTag: 'Article',
    researchTitle1: 'Fully self-developed! SJTU releases this AI large model',
    researchExcerpt1: 'On January 25, the OpticsGPT optical domain vertical large model launch was held at Shanghai Jiao Tong University...',
    newsTitle: 'News',
    newsDesc: 'Learn about LightInfra company updates and product launches',
    meetingTag: 'Conference',
    newsFeaturedTitle: 'SJTU Professor Yililin team releases intelligent optical transmission open-source simulation platform',
    newsFeaturedExcerpt: 'On January 6, 2023, hosted by the Optical Communication Committee of China Institute of Communications, Pengcheng Laboratory, the State Key Laboratory of Advanced Optical Communication Systems and Networks...',
    newsItemExcerpt: 'Co-released by Pengcheng Laboratory and the regional optical fiber communication network...',
    ctaTitle: 'AI For Optics, Try It Now'
  },
  about: {
    title: 'About LightInfra',
    subtitle: 'Intelligent Optics, Create the Future',
    valuesTitle: 'Believe Together,\nCreate Together',
    valuesSubtitle: 'Great teams share the same pursuit of value',
    ctaTitle: 'Shape the Intelligent Optical Future Together',
    paragraphs: [
      'LightInfra is a technology company focused on the deep integration of AI and optics, dedicated to building a new generation of intelligent technologies and products for the optical industry.',
      'The company independently develops vertical intelligent models for the optical domain, building systematic capabilities around professional knowledge understanding, optical reasoning, simulation solving, experiment integration and intelligent generation. Through the synergy of vertical models, AI agents and industry data, LightInfra connects AI capabilities to professional optical software, laboratory instruments, testing equipment and production environments, providing intelligent simulation, R&D assistance, test calibration, device control and network operations solutions for optical communications, precision optics and intelligent sensing.',
      'LightInfra focuses on serving the R&D, testing and operations of optical devices, optical modules and related systems, helping enterprises shorten R&D cycles, accumulate professional expertise, optimize testing workflows and improve the analysis and decision-making capability of complex systems. Through software platforms, intelligent models and software-hardware collaboration, the company is driving the optical industry from a traditional approach reliant on manual experience and fragmented tools toward one that is data-driven, human-machine collaborative and intelligently decision-making.',
      'The company embraces a geek, pragmatic and flat culture, valuing engineering execution and product experience. We believe great industry AI products come from advanced model capability, reliable and natural human-machine interaction, and a deep understanding of professional scenarios.',
      'LightInfra was incubated by a core team from Shanghai Jiao Tong University, bringing together academic and industry experience in optics, optical communications, artificial intelligence and systems engineering. Serving high-end manufacturing and the optoelectronic information industry, the company will continue to drive the deep integration of AI technology with the optical industry, building a smarter, more efficient and more reliable optical technology infrastructure.'
    ],
    values: [
      { title: 'Geek', subtitle: 'GEEK', content: 'Passionate about frontier technology,\nresearching large models and PDE solving' },
      { title: 'Pragmatic', subtitle: 'PRAGMATIC', content: 'Not chasing scale blindly,\npursuing precision and simplicity in optics' },
      { title: 'Open', subtitle: 'OPEN', content: 'Embracing open source and open ecosystems,\nletting capability flow like water' },
      { title: 'Altruistic', subtitle: 'ALTRUISTIC', content: 'Taking client success\nand industry advancement as our mission' }
    ],
    cards: [
      { name: 'VISION', title: 'From LightInfra to the Law of Everything', desc: 'From LightInfra to the law of everything.' },
      { name: 'MISSION', title: 'Become the Leader in Optical Infrastructure', desc: 'Driving industry upgrades through technological innovation, building intelligent optical infrastructure for the AI era.' }
    ]
  },
  productIntro: {
    opticsgptTitle: 'OpticsGPT',
    opticsgptDesc: 'A domain-specific large model for the optical industry, delivering professional intelligent capabilities for research, development and engineering applications',
    iftsTitle: 'IFTS Simulation Tool',
    iftsDesc: 'Lowering the barrier to optics expertise, bridging domain knowledge and engineering applications',
    instrumentsTitle: 'Smart Instruments',
    instrumentsDesc: 'Unified instrument access and intelligent test execution'
  },
  product: {
    opticsgpt: {
      heroTitle: 'OpticsGPT',
      heroDesc: 'A professional language model for the optical field, designed to meet the needs of optical researchers, optical communication engineers and industry technical experts for professional AI tools.',
      featuresTitle: 'Lowering the barrier to optical expertise,\nbridging domain knowledge and engineering application',
      featuresSubtitle: 'Built on an optics-native large model, OpticsGPT combines professional knowledge understanding with intelligent reasoning\nto assist with complex tasks such as optical design, algorithm generation and system analysis',
      reasonTitle: 'Why Choose OpticsGPT?',
      benchmarkTitle: 'Leading General Models in Optical Benchmarks',
      benchmark: {
        opticalPhysics: 'Optical Physics',
        quantumOptics: 'Quantum Optics',
        opticalDesign: 'Optical Design',
        nonlinearOptics: 'Nonlinear Optics',
        opticalComputing: 'Optical Computing',
        opticalComm: 'Optical Communication'
      },
      coreFunctionsTitle: 'Core Functions',
      noticeText: 'OpticsGPT leads general models across multiple metrics in optical physics, optical computing and optical communication',
      ctaTitle: 'Try OpticsGPT Now',
      features: [
        { title: 'Lightweight Deployment', desc: '8B-parameter scale, supporting efficient edge and on-device deployment, lowering the barrier to adoption' },
        { title: 'High Cognition', desc: 'Trained on massive professional data, with deep "optical literacy" and precise logical intuition' },
        { title: 'Strong Application', desc: 'Leading performance across core scenarios such as algorithm generation, system diagnostics and simulation design' },
        { title: 'Full Controllability', desc: 'End-to-end autonomy from data and training to deployment, ensuring industry security' }
      ],
      coreFunctions: [
        { title: 'Optical Knowledge Understanding', desc: 'Integrates professional knowledge systems with engineering data to enable deep understanding and intelligent reasoning in the optical domain.' },
        { title: 'Professional Task Generation', desc: 'Supports optical design, algorithm generation and system optimization, assisting engineers in completing complex tasks.' },
        { title: 'Intelligent System Diagnostics', desc: 'Analyzes system status using domain knowledge to provide fault localization and optimization recommendations.' }
      ]
    },
    ifts: {
      heroTitle: 'IFTS Simulation Tool',
      heroDesc: 'A Python-based open-source intelligent optical communication simulation tool, designed to meet the needs of scientists, optical communication engineers and related researchers for an optical communication simulation toolkit.',
      descTitle: 'Lowering the barrier to optical communication research, bridging information gaps',
      descText: 'IFTS builds an intelligent simulation platform based on PyTorch, combining GPU acceleration with neural network algorithms to deliver efficient optical communication system simulation and intelligent algorithm design',
      reasonTitle: 'Why Choose IFTS?',
      featuresTitle: 'Why IFTS',
      codeTitle: 'Code Framework',
      codeComment1: '# create channel parameters',
      codeComment2: '# signal transmission',
      ctaTitle: 'Try IFTS Now',
      features: [
        { title: 'Python-Based', desc: 'Easy to get started, extensible to fit your own needs' },
        { title: 'Open Source & Free', desc: 'An open-source communication toolkit empowering intelligent optical communication research' },
        { title: 'Efficient Simulation', desc: 'GPU parallel computing combined with AI channel models accelerates the intelligent simulation platform' },
        { title: 'Intelligent Algorithms', desc: 'Focused on the frontier of optical communications, integrating AI frameworks' }
      ]
    },
    instrument: {
      heroTitle: 'Smart Instruments',
      heroDesc: 'Built for optical R&D and industrial testing scenarios, this intelligent testing platform connects existing devices to help enterprises upgrade instrument intelligence and automate testing workflows.',
      descTitle: 'Unified instrument access, intelligent test execution',
      descText: 'Supports intelligent, cross-brand access to devices. AI Agent automatically parses test tasks and controls instruments to automate testing workflows, unify data management and accumulate enterprise testing capabilities',
      reasonTitle: 'What Smart Instruments Deliver',
      scenesTitle: 'What Smart Instruments Deliver',
      advantagesTitle: 'Advantages',
      ctaTitle: 'Try Smart Instruments Now',
      scenes: [
        { tag: 'For R&D', title: 'Build tests faster,\nfocus on the problem itself' },
        { tag: 'For Production Lines', title: 'Unified test standards,\nstable execution every time' },
        { tag: 'For Managers', title: 'An open-source communication toolkit,\nempowering intelligent optical communication research' },
        { tag: 'For the Overall Vision', title: 'Connecting R&D and production,\nbuilding a unified intelligent testing system' }
      ],
      advantages: [
        { title: 'Intelligent Upgrade for Existing Instruments', desc: 'Unified access across brands and categories' },
        { title: 'Vertical Model Intelligently Decomposes Tasks', desc: 'Just provide a task description — the vertical model automatically breaks down the task, issues instrument control commands, and completes the entire experiment/testing workflow.' },
        { title: 'Auto-Discovery, Plug and Play', desc: 'Once connected, instruments are automatically identified by brand, model, status and available capabilities, quickly completing device onboarding and control interface configuration to shorten R&D setup and production deployment time.' },
        { title: 'Unified Test Result Management', desc: 'Uniformly records device status, execution steps, parameter configuration, test data and verdicts, providing a complete basis for issue reproduction, quality analysis and process traceability.' },
        { title: 'Continuous Capability Accumulation', desc: 'Turns individual experience into reusable enterprise test workflows, instrument configurations and case assets, with future support for sharing and reusing test plans via a case platform.' }
      ]
    }
  },
  news: {
    newsTab: 'News',
    researchTab: 'Research',
    searchPlaceholder: 'What are you looking for?',
    sectionTitle: 'News',
    sectionSubtitle: 'Product launches · Company news · Industry collaboration',
    researchSectionSubtitle: 'Frontier insights · Academic research · Engineering practice',
    detailLoadingTag: 'Article',
    detailLoadingTitle: 'Loading article…'
  },
  contact: {
    bizContact: "Business: business{'@'}infra.com",
    hrContact: "Careers: hr{'@'}infra.com"
  },
  recruit: {
    heroTitle: 'Join LightInfra',
    heroSubtitle: 'LightInfra is always hiring partners',
    expectationsTitle: 'Building the future,\nwith people who believe in it.',
    expectationsSubtitle: 'Our team brings together long-term practitioners in optics, AI, chips, systems engineering and product innovation, driving lab breakthroughs into real-world, at-scale applications through cross-disciplinary collaboration.',
    contactTitle: 'Any Questions? Contact Us',
    contactSubtitle: "Please send your resume to: hr{'@'}infra.com",
    positions: [
      { id: 'pos-1', name: 'Algorithm Engineer' },
      { id: 'pos-2', name: 'Optical Engineer' }
    ],
    expectationCards: [
      { id: 'exp-1', title: 'Interdisciplinary', description: 'Optics × AI × Engineering' },
      { id: 'exp-2', title: 'Full-Chain', description: 'Research × Product × Application' },
      { id: 'exp-3', title: 'Long-termism', description: 'Focused on real value' }
    ]
  },
  contactPage: {
    heroTitle: 'Contact Information',
    heroSubtitle: 'Leave us an online message and tell us what you need',
    infoTitle: "We'd Love\nto Hear From You",
    infoSubtitle: 'Please leave your contact details and requirements.\nOur team will get back to you as soon as possible after receiving your message.',
    formNameLabel: 'Name',
    formNamePlaceholder: 'Enter your name',
    formCompanyLabel: 'Company',
    formCompanyPlaceholder: 'Enter your company name',
    formEmailLabel: 'Email',
    formEmailPlaceholder: 'Enter your email address',
    formEmailInvalidMessage: 'Please enter a valid email address',
    formPhoneLabel: 'Phone',
    formPhonePlaceholder: 'Enter your phone number',
    formPhoneInvalidMessage: 'Please enter a valid phone number',
    formMessageLabel: 'Message',
    formMessagePlaceholder: 'Briefly describe what you need...',
    formRequiredMessage: 'This field is required',
    formHint: 'By submitting, you agree that we may use the information above solely to respond to this inquiry.',
    formSubmit: 'Submit Message',
    formSubmitting: 'Submitting...',
    formSuccessMessage: 'Your message has been submitted. We will get back to you soon.',
    contactTitle: 'Any Questions? Contact Us',
    contactSubtitle: "Please send your questions to: business{'@'}infra.com"
  },
  resourceSubNav: {
    download: 'Download',
    docs: 'Docs',
    help: 'Help',
    searchPlaceholder: 'What are you looking for?'
  },
  meta: {
    home: 'Home',
    opticsgptProduct: 'OpticsGPT - Products',
    iftsProduct: 'IFTS - Products',
    instrumentProduct: 'Smart Instruments - Products',
    about: 'About Us',
    join: 'Join Us',
    contact: 'Contact Us',
    newsList: 'News',
    researchList: 'Research',
    researchDetail: 'Research Detail'
  }
}

export default messages
