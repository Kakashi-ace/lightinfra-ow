// 简体中文为文案基准：MessageSchema 由此推导，其他语言需满足同一形状，
// 因此漏翻某个键会直接变成类型错误。
const messages = {
  nav: {
    language: '语言',
    products: '产品',
    newsCenter: '新闻中心',
    about: '关于 LightInfra',
    contact: '联系我们',
    joinUs: '加入我们',
    applyDemo: '申请演示',
    startUsing: '开始使用',
    homeAriaLabel: 'LightInfra 首页',
    mainNavAriaLabel: '主导航',
    productOpticsgptTitle: 'OpticsGPT',
    productOpticsgptDesc: '面向光学领域的专业大语言模型',
    productIftsTitle: '智能仿真工具 IFTS',
    productIftsDesc: '基于Python开发的智能光通信开源仿真工具',
    productInstrumentsTitle: '智能仪器仪表',
    productInstrumentsDesc: '自动完成测试任务解析与仪器控制'
  },
  common: {
    applyDemo: '申请演示',
    startUsing: '开始使用',
    viewDetails: '查看详情',
    viewMore: '查看更多',
    readMore: '阅读更多',
    readArticle: '阅读文章',
    loadMore: '加载更多'
  },
  footer: {
    products: '产品',
    opticsgpt: 'OpticsGPT',
    ifts: '智能仿真工具',
    instruments: '智能仪器仪表',
    newsCenter: '新闻中心',
    news: '新闻动态',
    research: '前沿研究',
    aboutLightInfra: '关于LightInfra',
    contact: '联系我们',
    contactUs: '联系方式',
    bizContact: "商务合作请联系：business{'@'}infra.com",
    hrContact: "招聘咨询请联系：hr{'@'}infra.com"
  },
  home: {
    heroTitle: '智起光学 创见未来',
    heroDesc: '基于光学大模型与智能体技术，光之宇正在推动光学研发、测试与运维从人工经验驱动迈向智能化时代',
    platformTitle: '让复杂光学系统实现智能化',
    platformDesc: '全栈自研AI技术栈，覆盖预训练、后训练、Agent与部署全链条 深度耦合光学研发与产线场景，端到端驱动光学行业智能化升级。',
    rdLabel: 'R&D 研发',
    rdOpticalDesign: '光学设计',
    rdDeviceSim: '器件仿真',
    platformName: '智能光学平台',
    gptLabel: 'OpticsGPT 大模型',
    gptCap: '专业垂域大模型能力',
    agentLabel: '光学智能体',
    agentCap: '智能体协作能力',
    prodLabel: '产线 测试与运维',
    prodSpectrumCal: '光谱标定',
    prodWavefrontTest: '波前测试',
    prodLinkSim: '链路仿真',
    prodNetOpm: '网络运维',
    opticsgptTitle: 'OpticsGPT',
    opticsgptDesc: '面向光学产业的垂域大模型，为科研、研发与工程应用提供专业智能能力',
    aiOpticsTitle: 'AI，正在进入光学的每一个环节',
    aiOpticsNavigation: '智能光学环节轮播导航',
    aiOpticsPrevious: '上一项',
    aiOpticsNext: '下一项',
    aiOpticsSlideStatus: '第 {current} 项，共 {total} 项：{title}',
    aiOpticsSlides: {
      research: {
        name: '光学研发',
        title: '光学研发占位内容',
        description: '正式视觉素材与业务文案将在后续设计交付后替换。',
        alt: '光学研发轮播图占位画面'
      },
      testing: {
        name: '光学测试',
        title: '光学测试占位内容',
        description: '正式视觉素材与业务文案将在后续设计交付后替换。',
        alt: '光学测试轮播图占位画面'
      },
      operations: {
        name: '光学运维',
        title: '光学运维占位内容',
        description: '正式视觉素材与业务文案将在后续设计交付后替换。',
        alt: '光学运维轮播图占位画面'
      }
    },
    researchTitle: '最新研究',
    researchDesc: '前言技术解读·学术研究·工程实践',
    articleTag: '文章',
    researchTitle1: '全自研国产！交大发布这一AI大模型',
    researchExcerpt1: '1月25日，Optics GPT光领域垂直大模型发布会在上海交通大学...',
    newsTitle: '新闻动态',
    newsDesc: '了解 LightInfra 的公司动态和产品发布',
    meetingTag: '会议',
    newsFeaturedTitle: '上海交大义理林教授团队发布智能光传输开源仿真平台',
    newsFeaturedExcerpt: '2023年1月6日，由中国通信学会光通信委员会、鹏城实验室、区域光纤通信网与新型光通信系统国家重点实验室联合主办的智能光传输专...',
    newsItemExcerpt: '由鹏城实验室与区域光纤通信网联合发布...',
    ctaTitle: 'AI For Optics 立即试用'
  },
  about: {
    title: '关于LightInfra',
    subtitle: '智起光学 创见未来',
    valuesTitle: '共同相信，\n共同创造',
    valuesSubtitle: '优秀的团队，源于相同的价值追求',
    ctaTitle: '一起塑造智能光学的未来',
    paragraphs: [
      'LightInfra 是一家专注于 AI 与光学深度融合的科技企业，致力于构建面向光学产业的新一代智能技术与产品体系。',
      '公司自主研发光学垂直领域智能模型，围绕专业知识理解、光学推理、仿真求解、实验联动和智能生成等关键能力进行系统建设。基于垂直模型、AI Agent与行业数据的协同，LightInfra 将人工智能能力连接至光学专业软件、实验仪器、测试设备和生产环境，为光通信、精密光学与智能感知等领域提供智能仿真、研发辅助、测试标定、设备控制和网络运维解决方案。',
      'LightInfra 重点服务光学器件、光模块及相关系统的研发、测试与运维环节，帮助企业缩短研发周期、沉淀专业经验、优化测试流程，并提升复杂系统的分析与决策能力。公司通过软件平台、智能模型及软硬件协同方案，推动光学产业由依赖人工经验和分散工具的传统工作方式，向数据驱动、人机协同和智能决策转变。',
      '公司崇尚极客、务实、扁平的文化，重视工程落地与产品体验。我们相信，优秀的行业AI产品来自先进的模型能力、可靠自然的人机交互，以及对专业场景的深入理解。',
      'LightInfra 由上海交通大学核心团队孵化成立，团队汇聚光学、光通信、人工智能与系统工程等领域的产学研经验。面向高端制造与光电子信息产业，公司将持续推动AI技术与光学产业深度融合，建设更加智能、高效、可靠的光学技术基础设施。'
    ],
    values: [
      { title: '极客', subtitle: 'GEEK', content: '热爱前沿技术，\n钻研大模型与PDE求解' },
      { title: '务实', subtitle: 'PRAGMATIC', content: '不盲目求大，\n追求光学领域的"准"与"简"' },
      { title: '开放', subtitle: 'OPEN', content: '拥抱开源与开放生态，\n让能力像"水"一样流动' },
      { title: '利他', subtitle: 'ALTRUISTIC', content: '以成就客户，\n成就产业为己任' }
    ],
    cards: [
      { name: 'VISION / 愿景', title: '从光之宇到万物律', desc: '从光之宇到万物律' },
      { name: 'MISSION / 使命', title: '成为光学基础设施的引领者', desc: '以技术创新驱动产业升级，构建 AI 时代的光学智能基础设施。' }
    ]
  },
  productIntro: {
    opticsgptTitle: 'OpticsGPT',
    opticsgptDesc: '面向光学产业的垂域大模型，为科研、研发与工程应用提供专业智能能力',
    iftsTitle: '智能仿真工具 IFTS',
    iftsDesc: '致力于降低光学专业门槛 打通领域知识与工程应用壁垒',
    instrumentsTitle: '智能仪器仪表',
    instrumentsDesc: '让仪器统一接入，让测试智能执行'
  },
  product: {
    opticsgpt: {
      heroTitle: 'OpticsGPT',
      heroDesc: '面向光学领域的专业大语言模型，旨在满足光学科研人员、光通信工程师及产业技术专家对于专业 AI 工具的需求。',
      featuresTitle: '致力于降低光学专业门槛\n打通领域知识与工程应用壁垒',
      featuresSubtitle: 'OpticsGPT 基于光学原生大模型技术，通过专业知识理解与智能推理能力\n实现光学设计、算法生成与系统分析等复杂任务的智能辅助',
      reasonTitle: '为什么选择OpticsGPT？',
      benchmarkTitle: '实现对通用模型在光领域测评的领先',
      benchmark: {
        opticalPhysics: '光物理',
        quantumOptics: '光量子',
        opticalDesign: '光学设计',
        nonlinearOptics: '非线性光学',
        opticalComputing: '光计算',
        opticalComm: '光通信'
      },
      coreFunctionsTitle: '核心功能',
      noticeText: 'OpticsGPT 在光物理、光计算、光通信等多项指标上领先通用模型',
      ctaTitle: '立即试用 OpticsGPT',
      features: [
        { title: '轻部署', desc: '8B参数量级，支持端侧及边缘高效部署，降低应用门槛' },
        { title: '高认知', desc: '经海量专业数据训练，具备深厚的"光学素养"与精准逻辑直觉' },
        { title: '强应用', desc: '在算法生成、系统诊断、仿真设计等核心应用场景性能全面领先' },
        { title: '全可控', desc: '从数据、训练到部署，全流程自主可控，保障产业安全' }
      ],
      coreFunctions: [
        { title: '光学知识理解', desc: '融合专业知识体系与工程数据，实现光学领域深度理解与智能推理。' },
        { title: '专业任务生成', desc: '支持光学设计、算法生成与系统优化，辅助工程师完成复杂任务。' },
        { title: '智能系统诊断', desc: '结合领域知识分析系统状态，提供故障定位与优化建议。' }
      ]
    },
    ifts: {
      heroTitle: '智能仿真工具 IFTS',
      heroDesc: '基于Python开发的智能光通信开源仿真工具，旨在满足科学家，光通信工程师及相关领域研究人员对于光通信仿真工具包的需求。',
      descTitle: '致力于降低光通信研究门槛 打通信息壁垒',
      descText: 'IFTS基于 PyTorch 构建智能仿真平台，通过 GPU 加速与神经网络算法融合，实现光通信系统的高效仿真与智能算法设计',
      reasonTitle: '为什么选择IFTS？',
      featuresTitle: '为什么选择 IFTS',
      codeTitle: '代码框架',
      codeComment1: '# 创建信道参数',
      codeComment2: '# 信号传输',
      ctaTitle: '立即试用 IFTS',
      features: [
        { title: 'PYTHON开发', desc: '易于上手，可根据自身需求扩展其功能' },
        { title: '开源免费', desc: '开源通信工具包，助力光通信智能化研究' },
        { title: '高效仿真', desc: 'GPU并行计算与AI信道模型，加速智能仿真平台' },
        { title: '智能算法', desc: '聚焦光通信领域前沿，融合AI框架' }
      ]
    },
    instrument: {
      heroTitle: '智能仪器仪表',
      heroDesc: '面向光学研发与产业测试场景，打造连接存量设备的智能测试平台，帮助企业实现仪器智能化升级与测试流程自动化。',
      descTitle: '让仪器统一接入，让测试智能执行',
      descText: '支持跨品牌、跨品类设备智能接入，通过 AI Agent 自动完成测试任务解析与仪器控制，实现测试流程自动化、数据统一管理与企业测试能力沉淀',
      reasonTitle: '智能仪器仪表能带来什么',
      scenesTitle: '智能仪器仪表能带来什么',
      advantagesTitle: '优势特点',
      ctaTitle: '立即试用智能仪器仪表',
      scenes: [
        { tag: '面向研发', title: '更快搭建测试，\n更专注问题本身' },
        { tag: '面向产线', title: '统一测试标准，\n稳定每一次执行' },
        { tag: '面向管理者', title: '开源通信工具包，\n助力光通信智能化研究' },
        { tag: '面向整体愿景', title: '连接研发与生产，\n构建统一智能测试体系' }
      ],
      advantages: [
        { title: '存量仪器智能化升级', desc: '跨品牌、跨品类统一接入' },
        { title: '垂域大模型 智能拆解任务', desc: '只需要提供任务描述，垂域大模型自动拆解任务，并给出控制仪器指令，完成实验、测试全流程。' },
        { title: '自动发现、即插即用', desc: '仪器连接后自动识别品牌、型号、状态与可用能力，快速完成设备接入和控制界面配置，缩短研发环境搭建与产线工位部署时间。' },
        { title: '测试结果统一管理', desc: '统一记录设备状态、执行步骤、参数配置、测试数据和判定结果，为问题复现、质量分析和过程追溯提供完整依据。' },
        { title: '能力持续沉淀', desc: '将个人经验沉淀为企业可复用的测试流程、仪器配置和案例资产，未来还可通过案例平台实现测试方案的分享与复用。' }
      ]
    }
  },
  news: {
    newsTab: '新闻动态',
    researchTab: '前沿研究',
    searchPlaceholder: '想要查找什么？',
    sectionTitle: '新闻动态',
    sectionSubtitle: '产品发布 · 企业资讯 · 行业合作',
    researchSectionSubtitle: '前言技术解读·学术研究·工程实践',
    detailLoadingTag: '论文',
    detailLoadingTitle: '文章加载中…'
  },
  contact: {
    bizContact: "商务合作请联系：business{'@'}infra.com",
    hrContact: "招聘咨询请联系：hr{'@'}infra.com"
  },
  recruit: {
    heroTitle: '加入 LightInfra',
    heroSubtitle: '在 LightInfra，我们长期招募伙伴',
    expectationsTitle: '和一群相信未来的人，\n把未来变成现实。',
    expectationsSubtitle: '我们的团队汇聚光学、人工智能、芯片、系统工程与产品创新领域的长期实践者。以跨学科协作，将实验室里的突破带向规模化应用。',
    contactTitle: '如有任何疑问，请联系我们',
    contactSubtitle: "请将您的简历发送至以下邮箱： hr{'@'}infra.com",
    positions: [
      { id: 'pos-1', name: '算法工程师' },
      { id: 'pos-2', name: '光学工程师' }
    ],
    expectationCards: [
      { id: 'exp-1', title: '跨学科', description: '光学 × AI × 工程' },
      { id: 'exp-2', title: '全链路', description: '研究 × 产品 × 应用' },
      { id: 'exp-3', title: '长期主义', description: '面向真实价值' }
    ]
  },
  contactPage: {
    heroTitle: '联系方式',
    heroSubtitle: '填写在线留言，告诉我们您的需求',
    infoTitle: '期待听见\n您的声音',
    infoSubtitle: '请留下您的联系方式与需求。\n我们的专业团队将在收到留言后尽快与您取得联系。',
    formNameLabel: '姓名',
    formNamePlaceholder: '请输入您的姓名',
    formCompanyLabel: '公司',
    formCompanyPlaceholder: '请输入您的公司名称',
    formEmailLabel: '邮箱',
    formEmailPlaceholder: '请输入您的邮箱地址',
    formEmailInvalidMessage: '请输入正确的邮箱地址',
    formPhoneLabel: '电话',
    formPhonePlaceholder: '请输入您的联系电话',
    formPhoneInvalidMessage: '请输入正确的手机号码',
    formMessageLabel: '需求描述',
    formMessagePlaceholder: '请简单描述您的需求...',
    formRequiredMessage: '请填写此项',
    formHint: '提交即表示您同意我们仅为回复本次咨询而使用以上信息。',
    formSubmit: '提交留言',
    formSubmitting: '提交中...',
    formSuccessMessage: '留言提交成功，我们会尽快与您联系。',
    contactTitle: '如有任何疑问，请联系我们',
    contactSubtitle: "请将您的疑问发送至以下邮箱： business{'@'}infra.com"
  },
  resourceSubNav: {
    download: '下载',
    docs: '文档',
    help: '帮助',
    searchPlaceholder: '想要查找什么？'
  },
  meta: {
    home: '首页',
    opticsgptProduct: 'OpticsGPT - 产品',
    iftsProduct: 'IFTS - 产品',
    instrumentProduct: '智能仪器仪表 - 产品',
    about: '关于我们',
    join: '加入我们',
    contact: '联系我们',
    newsList: '新闻动态',
    researchList: '前沿研究',
    researchDetail: '研究详情'
  }
}

/** 文案字典的形状，以简体中文为基准 */
export type MessageSchema = typeof messages

export default messages
