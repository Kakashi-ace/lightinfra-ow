import type { MessageSchema } from './zh-CN'

// 显式标注为 MessageSchema：漏翻或键名写错会在此处报类型错误
const messages: MessageSchema = {
  nav: {
    language: 'Language',
    products: 'Products',
    productCenter: 'Products',
    newsCenter: 'News',
    about: 'About LightInfra',
    contact: 'Contact',
    applyDemo: 'Apply Demo',
    startUsing: 'Get Started'
  },
  common: {
    applyDemo: 'Apply Demo',
    startUsing: 'Get Started',
    readMore: 'Read More',
    readArticle: 'Read Article'
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
    newsItemExcerpt: 'Co-released by Pengcheng Laboratory and the regional optical fiber communication network...'
  },
  about: {
    title: 'About LightInfra',
    subtitle: 'Intelligent Optics, Create the Future',
    valuesTitle: 'Corporate Values',
    timelineTitle: 'Milestones',
    teamTitle: 'Core Team',
    ctaTitle: 'Shape the Intelligent Optical Future Together'
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
      featuresTitle: 'Why OpticsGPT',
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
      ctaTitle: 'Try OpticsGPT Now'
    },
    ifts: {
      heroTitle: 'IFTS Simulation Tool',
      heroDesc: 'A Python-based open-source intelligent optical communication simulation tool, designed to meet the needs of scientists, optical communication engineers and related researchers for an optical communication simulation toolkit.',
      descTitle: 'Lowering the barrier to optical communication research, bridging information gaps',
      descText: 'IFTS builds an intelligent simulation platform based on PyTorch, combining GPU acceleration with neural network algorithms to deliver efficient optical communication system simulation and intelligent algorithm design',
      featuresTitle: 'Why IFTS',
      codeTitle: 'Code Framework',
      codeComment1: '# create channel parameters',
      codeComment2: '# signal transmission',
      ctaTitle: 'Try IFTS Now'
    },
    instrument: {
      heroTitle: 'Smart Instruments',
      heroDesc: 'Built for optical R&D and industrial testing scenarios, this intelligent testing platform connects existing devices to help enterprises upgrade instrument intelligence and automate testing workflows.',
      descTitle: 'Unified instrument access, intelligent test execution',
      descText: 'Supports intelligent, cross-brand access to devices. AI Agent automatically parses test tasks and controls instruments to automate testing workflows, unify data management and accumulate enterprise testing capabilities',
      scenesTitle: 'What Smart Instruments Deliver',
      advantagesTitle: 'Advantages',
      ctaTitle: 'Try Smart Instruments Now'
    }
  },
  news: {
    newsTab: 'News',
    researchTab: 'Research',
    searchPlaceholder: 'What are you looking for?',
    sectionTitle: 'News',
    sectionSubtitle: 'Product launches · Company news · Industry collaboration',
    researchSectionSubtitle: 'Frontier insights · Academic research · Engineering practice'
  },
  contact: {
    bizContact: "Business: business{'@'}infra.com",
    hrContact: "Careers: hr{'@'}infra.com"
  },
  recruit: {
    heroTitle: 'Join LightInfra',
    heroSubtitle: 'LightInfra is always hiring partners',
    expectationsTitle: 'What We Expect From You',
    contactTitle: 'Any Questions? Contact Us',
    contactSubtitle: "Please send your resume to: hr{'@'}infra.com"
  },
  resourceSubNav: {
    download: 'Download',
    docs: 'Docs',
    help: 'Help',
    searchPlaceholder: 'What are you looking for?'
  }
}

export default messages
