import React, { useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Building2,
  ChevronRight,
  ClipboardList,
  FileText,
  Globe2,
  Layers3,
  Menu,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
  Wallet,
  X
} from 'lucide-react';
import {
  articles,
  heroStats,
  industries,
  navItems,
  painPoints,
  processSteps,
  services,
  supportPoints
} from './data';

const ctaPhone = '13919883838';

function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

function Container({ children, className = '' }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

function Button({ as = 'button', href, variant = 'primary', icon: Icon, children, className = '', type = 'button', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-normal transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400/40';
  const styles =
    variant === 'primary'
      ? 'border-emerald-300/30 bg-gradient-to-r from-emerald-400 to-emerald-600 text-slate-950 shadow-glow hover:-translate-y-0.5'
      : 'border-white/10 bg-white/[0.05] text-white hover:bg-white/10';
  const classes = cn(base, styles, className);

  if (as === 'link') {
    return (
      <Link className={classes} to={href} {...props}>
        {Icon ? <Icon className="h-4 w-4" /> : null}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      <span>{children}</span>
    </button>
  );
}

function SectionHeading({ kicker, title, desc }) {
  return (
    <div className="max-w-3xl">
      {kicker ? <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300/80">{kicker}</p> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {desc ? <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{desc}</p> : null}
    </div>
  );
}

function Card({ title, desc, icon: Icon, className = '', children, meta }) {
  return (
    <div className={cn('group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] backdrop-blur-sm', className)}>
      <div className="flex items-start gap-4">
        {Icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-400/10 text-emerald-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div className="min-w-0">
          {meta ? <p className="mb-2 text-xs uppercase tracking-[0.22em] text-emerald-300/65">{meta}</p> : null}
          <h3 className="text-base font-semibold text-white">{title}</h3>
          {desc ? <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p> : null}
        </div>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (href) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href.replace('/#', '#'))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }
    navigate(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-ink/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-4">
        <button onClick={() => go('/')} className="flex items-center gap-3 text-left focus:outline-none">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm font-bold text-white">
            会
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight text-white">会算账</div>
            <div className="text-xs text-slate-400">老板财税小管家</div>
          </div>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => go(item.href)}
              className={cn(
                'rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.06] hover:text-white',
                location.pathname === item.href ? 'bg-white/[0.07] text-white' : ''
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button as="link" href="/initial-diagnosis" icon={Sparkles}>
            开始财税初诊
          </Button>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white lg:hidden">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-white/10 bg-brand-ink lg:hidden">
          <Container className="grid gap-2 py-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-slate-200"
              >
                {item.label}
              </button>
            ))}
            <Button as="link" href="/initial-diagnosis" icon={Sparkles} className="mt-2">
              开始财税初诊
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-brand-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,209,141,0.18),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(201,168,106,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <Container className="relative grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
            <BadgeCheck className="h-4 w-4" />
            财税诊断与服务匹配官网
          </p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
            您的企业财税管理之旅，从这里开始。
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            会算账帮助小微企业、个体户、电商老板和创业合伙人，梳理账、税、票、利润、异常、注销、股权和财税风险，让经营决策更清楚。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="link" href="/initial-diagnosis" icon={Sparkles}>
              开始财税初诊
            </Button>
            <Button as="link" href="/#services" variant="secondary" icon={ArrowRight}>
              查看服务方案
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {heroStats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-white">{value}</div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Initial View</p>
                <h2 className="mt-2 text-lg font-semibold text-white">老板财税状态总览</h2>
              </div>
              <div className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                初步判断
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">风险等级</p>
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <div className="mt-3 text-3xl font-semibold text-white">中低</div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-300">建议优先项</p>
                  <ClipboardList className="h-5 w-5 text-amber-300" />
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-200">
                  <p>1. 核查申报状态</p>
                  <p>2. 判断票税结构</p>
                  <p>3. 匹配服务路径</p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {['账', '税', '票'].map((item, index) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Module {index + 1}</p>
                  <div className="mt-2 text-2xl font-semibold text-white">{item}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

function HomePage() {
  return (
    <div>
      <Hero />

      <section id="who" className="border-b border-white/10 bg-brand-panel py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <SectionHeading
              kicker="我们是谁"
              title="像咨询公司一样做官网，像财税顾问一样做承接。"
              desc="会算账不是简单的代账广告页，而是一个面向老板的财税诊断入口。页面先建立信任，再引导用户进入对应场景。"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {supportPoints.map((item) => (
                <Card key={item.title} title={item.title} desc={item.desc} icon={item.icon} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-brand-ink py-16" id="problems">
        <Container>
          <SectionHeading
            kicker="老板常见问题"
            title="老板真正头疼的，不只是报税。"
            desc="会算账先帮你判断问题，再匹配合适的处理方式。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {painPoints.map((item) => (
              <Card key={item} title={item} icon={ChevronRight} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-brand-panel py-16" id="services">
        <Container>
          <SectionHeading
            kicker="服务体系"
            title="从初诊到处理，会算账帮老板把财税问题一步步理清。"
            desc="每个服务都对应一个真实场景，方便老板直接找到入口。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((item) => (
              <Card key={item.title} title={item.title} desc={item.desc} icon={item.icon}>
                <Button as="link" href={item.href} variant="secondary" icon={ArrowRight} className="w-full">
                  查看详情
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-brand-ink py-16" id="industries">
        <Container>
          <SectionHeading
            kicker="行业方案"
            title="不同生意，不同账法。"
            desc="行业不是标签，而是决定账、税、票、利润和协作方式的结构。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((item) => (
              <Card key={item.title} title={item.title} desc={item.desc} icon={item.icon} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-brand-panel py-16">
        <Container>
          <SectionHeading
            kicker="服务流程"
            title="我们不急着卖服务，先帮你判断问题。"
            desc="让流程先于销售，用户自然更容易信任。"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-slate-950">
                  0{index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step}</h3>
                {index < processSteps.length - 1 ? <div className="mt-4 hidden h-px bg-white/8 lg:block" /> : null}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 bg-brand-ink py-16" id="knowledge">
        <Container>
          <SectionHeading
            kicker="财税知识库"
            title="老板财税知识库"
            desc="把高频问题整理成可读、可传播、可转化的内容。"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.title} title={article.title} meta={article.meta} desc={article.desc} icon={BookOpen} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-br from-emerald-500/12 via-brand-panel to-brand-ink py-16" id="contact-cta">
        <Container>
          <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300/80">联系转化</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                不知道自己适合哪一项？先做一次财税初诊。
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                不用懂专业术语，把你的企业情况简单说清楚，我们先帮你判断问题类型和下一步处理路径。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="link" href="/initial-diagnosis" icon={Sparkles}>
                  立即开始初诊
                </Button>
                <Button as="link" href="/contact" variant="secondary" icon={PhoneCall}>
                  添加顾问微信
                </Button>
              </div>
            </div>
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-300">联系方式</p>
                <div className="rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                  {ctaPhone}
                </div>
              </div>
              <div className="mt-6 grid gap-3">
                {['初步判断', '风险提示', '资料清单', '顾问沟通'].map((text) => (
                  <div key={text} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                    <span className="text-sm text-slate-200">{text}</span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

function PageShell({ kicker, title, desc, children }) {
  return (
    <div className="bg-brand-ink py-10">
      <Container>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <SectionHeading kicker={kicker} title={title} desc={desc} />
          <div className="mt-8">{children}</div>
        </div>
      </Container>
    </div>
  );
}

function InitialDiagnosisPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageShell
      kicker="财税初诊"
      title="先判断问题，再匹配处理方式。"
      desc="这是一个前端表单展示，不做数据库提交。用户填写后先看到初步提示，再由顾问继续沟通。"
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
        <form
          className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          {[
            ['企业类型', ['公司', '个体户', '工作室', '不清楚']],
            ['经营状态', ['正常经营', '很久没管', '准备注销', '刚成立']],
            ['是否有收入', ['有', '没有', '不清楚']],
            ['是否有开票', ['有', '没有', '不清楚']],
            ['当前最担心的问题', ['报税', '异常', '账目', '发票', '注销', '股权', '其他']]
          ].map(([label, options]) => (
            <label key={label} className="grid gap-2">
              <span className="text-sm font-medium text-slate-200">{label}</span>
              <select className="h-12 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white outline-none ring-0">
                {options.map((option) => (
                  <option key={option} className="bg-slate-950 text-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}

          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-200">联系方式</span>
            <input
              className="h-12 rounded-2xl border border-white/10 bg-white/[0.05] px-4 text-sm text-white placeholder:text-slate-500 outline-none"
              placeholder="微信或电话"
            />
          </label>

          <Button type="submit" icon={ArrowRight} className="mt-2 w-full">
            提交初诊信息
          </Button>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              信息已记录，请添加顾问微信 {ctaPhone} 进一步沟通。
            </div>
          ) : null}
        </form>

        <div className="grid gap-4">
          {supportPoints.map((item) => (
            <Card key={item.title} title={item.title} desc={item.desc} icon={item.icon} />
          ))}
          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-emerald-400/10 to-amber-400/10 p-6">
            <p className="text-sm font-semibold text-white">提示</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              初诊结果仅用于初步判断、风险提示和资料清单整理，不替代税务机关或专业执业机构的正式结论。
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ServicePage({ title, kicker, desc, blocks, icon: Icon }) {
  return (
    <PageShell kicker={kicker} title={title} desc={desc}>
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4">
          {blocks.map((block) => (
            <Card key={block.title} title={block.title} desc={block.desc} icon={block.icon || Icon} />
          ))}
        </div>
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/70">处理方式</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">先诊断，后承接</h3>
          <div className="mt-6 space-y-3 text-sm leading-7 text-slate-300">
            <p>1. 收集企业基础情况</p>
            <p>2. 判断风险等级</p>
            <p>3. 给出处理路径</p>
            <p>4. 交由顾问继续沟通</p>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300">
            {desc}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function AccountingPage() {
  return (
    <ServicePage
      kicker="代理记账"
      title="代理记账与报税"
      desc="适合正常经营、有收入、有开票的小微企业和个体户。"
      blocks={[
        { title: '基础代账', desc: '适合资料相对简单、流程清晰的经营主体。', icon: Wallet },
        { title: '月度报税协同', desc: '帮助老板按节奏确认资料、申报节点与风险提醒。', icon: BarChart3 },
        { title: '账票核对', desc: '把票据、流水和经营数据尽量放到同一框架里。', icon: ClipboardList }
      ]}
      icon={Wallet}
    />
  );
}

function AbnormalCancelPage() {
  return (
    <ServicePage
      kicker="异常 / 注销变更"
      title="企业异常处理、注销与变更梳理"
      desc="适合公司很久没管、担心税务或工商异常，或需要合规退出与主体调整的企业。"
      blocks={[
        { title: '异常初判', desc: '先看申报、年报、地址、税票和经营状态。', icon: ShieldCheck },
        { title: '注销前核查', desc: '把欠税、资料缺口和未了事项先列出来。', icon: FileText },
        { title: '变更梳理', desc: '适合调整经营范围、股东、法人或地址等主体信息。', icon: Building2 }
      ]}
      icon={ShieldCheck}
    />
  );
}

function EquityPage() {
  return (
    <ServicePage
      kicker="股权合伙"
      title="股权合伙与分红梳理"
      desc="适合合伙、分红、退出、责任边界说不清的团队。"
      blocks={[
        { title: '合伙边界', desc: '先把职责、权限和决策机制讲清楚。', icon: Users },
        { title: '分红规则', desc: '分红不是口头约定，建议先明确口径与条件。', icon: Scale },
        { title: '退出安排', desc: '提前想好退出条件，减少后续争议。', icon: ChevronRight }
      ]}
      icon={Scale}
    />
  );
}

function KnowledgePage() {
  return (
    <PageShell
      kicker="财税知识库"
      title="老板财税知识库"
      desc="把高频问题整理成可读、可传播、可转化的文章入口。"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.title} title={article.title} meta={article.meta} desc={article.desc} icon={BookOpen}>
            <Button as="link" href="/contact" variant="secondary" icon={ArrowRight} className="w-full">
              进一步咨询
            </Button>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  return (
    <PageShell
      kicker="联系我们"
      title="不知道自己适合哪一项？先做一次财税初诊。"
      desc="不用懂专业术语，把你的企业情况简单说清楚，我们先帮你判断问题类型和下一步处理路径。"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/70">联系方式</p>
          <div className="mt-4 text-3xl font-semibold text-white">{ctaPhone}</div>
          <p className="mt-3 text-sm leading-7 text-slate-300">顾问微信 / 电话：{ctaPhone}</p>
          <div className="mt-8 space-y-3 text-sm text-slate-300">
            <p>适合场景：初诊、报税、异常、注销、股权、分红、账票梳理。</p>
            <p>表达方式：初步判断、风险提示、处理路径、资料清单、顾问沟通。</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="立即开始初诊" desc="从问题描述开始，先看清方向。" icon={Sparkles} />
            <Card title="添加顾问微信" desc="把材料发给顾问继续沟通。" icon={PhoneCall} />
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-emerald-400/10 to-amber-400/10 p-6">
            <p className="text-sm font-semibold text-white">合规说明</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              网站内容仅用于初步判断和服务匹配，不承诺绝对无风险、不承诺少交税、不承诺解除异常、不承诺注销成功。
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-ink py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">会算账｜老板财税小管家</p>
          <p className="mt-1 text-sm text-slate-400">让老板看得懂账，管得住税，做得出决策。</p>
        </div>
        <div className="text-sm text-slate-400">
          顾问微信/电话：<span className="text-white">{ctaPhone}</span>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-ink text-slate-100">
      <SiteHeader />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/initial-diagnosis" element={<InitialDiagnosisPage />} />
          <Route path="/accounting" element={<AccountingPage />} />
          <Route path="/abnormal-cancel" element={<AbnormalCancelPage />} />
          <Route path="/equity" element={<EquityPage />} />
          <Route path="/knowledge" element={<KnowledgePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
