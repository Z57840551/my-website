import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpen,
  Building2,
  ChevronRight,
  ClipboardList,
  FileText,
  Factory,
  Landmark,
  Scale,
  ShieldCheck,
  Users,
  Wallet
} from 'lucide-react';

export const navItems = [
  { label: '首页', href: '/' },
  { label: '我们是谁', href: '/#who' },
  { label: '服务内容', href: '/#services' },
  { label: '行业方案', href: '/#industries' },
  { label: '财税知识库', href: '/knowledge' },
  { label: '联系我们', href: '/contact' }
];

export const heroStats = [
  { value: '2017', label: '成立至今', icon: BadgeCheck },
  { value: '8城12家', label: '分支布局', icon: Building2 },
  { value: '200+', label: '专业团队', icon: Users },
  { value: '6000+', label: '服务企业', icon: BarChart3 }
];

export const painPoints = [
  '不会报税，怕填错',
  '公司很久没管，担心异常',
  '收入、开票、成本、利润算不清',
  '公司不经营了，想注销或变更',
  '合伙、股权、分红、退出说不清',
  '想知道代理记账适合哪一档'
];

export const services = [
  {
    title: '财税初诊',
    desc: '适合不知道企业现在有没有风险的老板。',
    icon: ClipboardList,
    href: '/initial-diagnosis'
  },
  {
    title: '代理记账与报税',
    desc: '适合正常经营、有收入、有开票的小微企业和个体户。',
    icon: Wallet,
    href: '/accounting'
  },
  {
    title: '企业异常处理',
    desc: '适合公司很久没管、担心税务或工商异常的情况。',
    icon: ShieldCheck,
    href: '/abnormal-cancel'
  },
  {
    title: '注销与变更梳理',
    desc: '适合不想继续经营、需要合规退出或调整主体的企业。',
    icon: FileText,
    href: '/abnormal-cancel'
  },
  {
    title: '股权合伙与分红梳理',
    desc: '适合合伙、分红、退出、责任边界说不清的团队。',
    icon: Scale,
    href: '/equity'
  },
  {
    title: '财税风险自查',
    desc: '适合想提前排查账、税、票、合同、流水风险的老板。',
    icon: Banknote,
    href: '/initial-diagnosis'
  }
];

export const industries = [
  {
    title: '电商老板',
    desc: '围绕平台流水、发票、成本、退款和利润结构做清晰梳理。',
    icon: Factory
  },
  {
    title: '个体户',
    desc: '从开票、申报到经营状态核查，先把基础风险看明白。',
    icon: Landmark
  },
  {
    title: '小微公司',
    desc: '适合需要稳定代账、报税、资料归档和长期托管的企业。',
    icon: Building2
  },
  {
    title: '服务业',
    desc: '把合同、回款、工资、费用和税务关系梳理成可执行路径。',
    icon: BarChart3
  },
  {
    title: '贸易公司',
    desc: '围绕采购、库存、开票与收款，做经营账和税务账的衔接。',
    icon: Wallet
  },
  {
    title: '工作室',
    desc: '适合项目型收入、合作结算和轻资产团队的财税管理。',
    icon: BookOpen
  },
  {
    title: '合伙创业团队',
    desc: '先把股权、分红、退出和责任边界说清，再谈长期合作。',
    icon: Users
  }
];

export const processSteps = [
  '提交企业情况',
  '初步判断账税状态',
  '识别风险等级',
  '匹配处理路径',
  '顾问跟进服务'
];

export const articles = [
  {
    title: '老板不会报税怎么办？',
    meta: '初诊指南',
    desc: '先看企业状态、申报节点和资料完整度，再决定是自己处理还是交给顾问。'
  },
  {
    title: '公司两年没管还能注销吗？',
    meta: '异常与退出',
    desc: '先核查异常、欠税、年报、发票和账户情况，再安排合规退出路径。'
  },
  {
    title: '小规模公司代理记账多少钱？',
    meta: '服务选择',
    desc: '价格背后是票据量、收入结构、是否需要顾问支持和风险处理。'
  },
  {
    title: '电商收入怎么核算？',
    meta: '行业账法',
    desc: '平台流水、退款、佣金、物流和成本要进入同一套经营逻辑。'
  },
  {
    title: '合伙分钱前要先说清什么？',
    meta: '股权与分红',
    desc: '出资、分红、退出、权限和责任边界，最好在矛盾前先写明。'
  },
  {
    title: '公司异常了先查哪里？',
    meta: '风险提示',
    desc: '从申报、年报、税票、地址和经营状态逐层排查，别急着猜。'
  }
];

export const supportPoints = [
  {
    title: '初步判断',
    desc: '先判断问题类型，不急着推套餐。',
    icon: ClipboardList
  },
  {
    title: '风险提示',
    desc: '明确当前风险和优先处理顺序。',
    icon: ShieldCheck
  },
  {
    title: '资料清单',
    desc: '告诉你下一步需要准备什么。',
    icon: FileText
  },
  {
    title: '顾问沟通',
    desc: '把复杂问题交给专业顾问继续处理。',
    icon: ArrowRight
  }
];

