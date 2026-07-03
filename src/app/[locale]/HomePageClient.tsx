"use client";

import { Suspense, lazy } from "react";
import {
  Activity,
  ArrowRight,
  Bomb,
  Castle,
  Check,
  Cog,
  Compass,
  Crosshair,
  Crown,
  DoorOpen,
  Download,
  Eye,
  ExternalLink,
  Flag,
  Flame,
  GitBranch,
  GraduationCap,
  HeartPulse,
  History,
  Landmark,
  Lightbulb,
  MonitorDown,
  Mountain,
  Network,
  Rocket,
  Route,
  Server,
  Shield,
  Skull,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
// import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

// Lazy load heavy components
const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

// Loading placeholder
const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div
    className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`}
  />
);

// Conditionally render text as a link or plain span (renders plain text when no link data)
function LinkedTitle({
  linkData,
  children,
  className,
  locale,
}: {
  linkData: { url: string; title: string } | null | undefined;
  children: React.ReactNode;
  className?: string;
  locale: string;
}) {
  if (linkData) {
    const href = locale === "en" ? linkData.url : `/${locale}${linkData.url}`;
    return (
      <Link
        href={href}
        className={`${className || ""} hover:text-[hsl(var(--nav-theme-light))] hover:underline decoration-[hsl(var(--nav-theme-light))/0.4] underline-offset-4 transition-colors`}
        title={linkData.title}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}

// Role badge styling (semantic colors, no hardcoded hex)
const ROLE_STYLES: Record<string, { icon: LucideIcon; className: string }> = {
  DPS: { icon: Swords, className: "bg-red-500/10 border-red-500/30 text-red-400" },
  Tank: { icon: Shield, className: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  Healer: { icon: HeartPulse, className: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" },
  Support: { icon: Users, className: "bg-violet-500/10 border-violet-500/30 text-violet-400" },
};

function RoleBadge({ role }: { role: string }) {
  const config = ROLE_STYLES[role] || {
    icon: Star,
    className: "bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]",
  };
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {role}
    </span>
  );
}

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({
  latestArticles,
  moduleLinkMap,
  locale,
}: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.conquestofazerothwiki.wiki";

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Conquest of Azeroth Wiki",
        description:
          "Complete Conquest of Azeroth Wiki covering 21 classes, 69 specs, Dragonflight-style talents, builds, dungeons, raids, PvP, and release guides for Ascension players.",
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Conquest of Azeroth - Classic+ Custom WoW MMORPG",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Conquest of Azeroth Wiki",
        alternateName: "Conquest of Azeroth",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/hero.webp`,
          width: 1920,
          height: 1080,
          caption: "Conquest of Azeroth Wiki - Classes, Builds & Release",
        },
        sameAs: [
          "https://ascension.gg/en",
          "https://www.reddit.com/r/ProjectAscension/",
          "https://www.youtube.com/@ascensiongg",
        ],
      },
      {
        "@type": "VideoGame",
        name: "Conquest of Azeroth",
        gamePlatform: ["PC"],
        applicationCategory: "Game",
        genre: ["MMORPG", "RPG", "PvP", "PvE"],
        numberOfPlayers: {
          minValue: 1,
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: "https://ascension.gg/en/download",
        },
      },
      {
        "@type": "VideoObject",
        name: "Full Release: Conquest of Azeroth - Ascension WoW",
        description:
          "Official Ascension video announcing the full release of Conquest of Azeroth, showcasing the 21 new classes and gameplay.",
        uploadDate: "2024-08-01",
        thumbnailUrl: `${siteUrl}/images/hero.webp`,
        embedUrl: "https://www.youtube.com/embed/pIPOCauIHKw",
        url: "https://www.youtube.com/watch?v=pIPOCauIHKw",
      },
    ],
  };

  const mobileBannerAd = getPreferredMobileBannerSelection();

  // Icons for the release timeline items (distinct per card)
  const releaseIcons: LucideIcon[] = [
    Rocket,
    Server,
    Activity,
    MonitorDown,
    UserPlus,
    History,
  ];

  // Tier badge styling
  const TIER_STYLES: Record<string, string> = {
    S: "bg-[hsl(var(--nav-theme)/0.2)] border-[hsl(var(--nav-theme)/0.5)] text-[hsl(var(--nav-theme-light))]",
    A: "bg-amber-500/15 border-amber-500/40 text-amber-300",
    B: "bg-slate-500/15 border-slate-500/40 text-slate-300",
  };
  const TIER_ICONS: Record<string, LucideIcon> = {
    S: Star,
    A: Trophy,
    B: Shield,
  };

  // Module 5: Build card icons (distinct per build id)
  const BUILD_ICONS: Record<string, LucideIcon> = {
    "talent-system-basics": Lightbulb,
    "tinker-demolition-build": Bomb,
    "tinker-mechanics-build": Cog,
    "pyromancer-incineration-build": Flame,
    "ranger-archery-build": Target,
    "cultist-influence-build": Skull,
  };

  // Module 6: Leveling milestone icons (distinct per milestone id)
  const LEVELING_ICONS: Record<string, LucideIcon> = {
    "levels-1-3": Compass,
    "level-10-spec-choice": GitBranch,
    "levels-10-35": Swords,
    "levels-35-45": Shield,
    "levels-45-55": Zap,
    "levels-55-58": Flag,
    "level-60-endgame": Trophy,
  };

  // Module 7: Dungeon & raid card icons (distinct per content id)
  const DUNGEON_ICONS: Record<string, LucideIcon> = {
    "normal-dungeons": DoorOpen,
    "heroic-dungeons": Shield,
    "mythic-dungeons": Swords,
    "mythic-plus-dungeons": Crown,
    "normal-raid": Castle,
    "heroic-raid": Landmark,
    "mythic-ascended-raids": Mountain,
    "molten-core": Flame,
    onyxia: Skull,
  };

  // Module 7: dungeon content grouping order
  const DUNGEON_CATEGORY_ORDER = ["Dungeons", "Raids", "Raid Highlight"];

  // Module 8: PvP mode icons (distinct per mode id)
  const PVP_ICONS: Record<string, LucideIcon> = {
    "pve-mode": Shield,
    "pvp-mode": Swords,
    "high-risk-pvp": Skull,
    battlegrounds: Flag,
    arenas: Crosshair,
    "world-pvp-events": Crown,
    "crowd-control-identity": Eye,
  };

  // Module 8: risk-level badge styles (semantic palette, no hardcoded hex)
  const RISK_STYLES: Record<string, string> = {
    Low: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    Medium: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    High: "bg-red-500/10 border-red-500/30 text-red-400",
    Structured:
      "bg-[hsl(var(--nav-theme)/0.1)] border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]",
    Competitive: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    Variable: "bg-slate-500/10 border-slate-500/30 text-slate-300",
    "Matchup-Based": "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* 广告位 1: 顶部固定横幅 */}
      <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6"
            >
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">
                {t.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("classes-guide")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <GraduationCap className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://ascension.gg/en/download"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* Video Section - 紧跟 Hero 之后 (max-w-5xl 避免挤压广告位) */}
      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature
              videoId="pIPOCauIHKw"
              title="Conquest of Azeroth — Full Release"
            />
          </div>
        </div>
      </section>

      {/* Tools Grid - 8 Navigation Cards (位于视频区之后、Latest Updates 之前) */}
      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title}{" "}
              <span className="text-[hsl(var(--nav-theme-light))]">
                {t.tools.titleHighlight}
              </span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {/* 导航卡片锚点与下方 4 个模块 section 一一对应 */}
            {t.tools.cards.map((card: any, index: number) => {
              const sectionIds = [
                "release-date-download-guide",
                "beginner-guide",
                "classes-guide",
                "class-tier-list",
                "talent-trees-and-builds-guide",
                "leveling-guide",
                "dungeons-and-raids-guide",
                "pvp-and-high-risk-guide",
              ];
              const sectionId = sectionIds[index];

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(sectionId)}
                  className="scroll-reveal group rounded-xl border border-border p-4 md:p-6
                             bg-card hover:border-[hsl(var(--nav-theme)/0.5)]
                             transition-all duration-300 cursor-pointer text-left
                             hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div
                    className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12
                                  bg-[hsl(var(--nav-theme)/0.1)]
                                  flex items-center justify-center
                                  group-hover:bg-[hsl(var(--nav-theme)/0.2)]
                                  transition-colors"
                  >
                    <DynamicIcon
                      name={card.icon}
                      className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]"
                    />
                  </div>
                  <h3 className="mb-1.5 text-sm md:text-base font-semibold">
                    {card.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 广告位 2: 首屏内容之后再加载广告 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      {/* 广告位 3: 移动端优先使用方形，桌面端保留横幅 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Module 1: Release Date & Download Guide */}
      <section id="release-date-download-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaReleaseDateDownloadGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaReleaseDateDownloadGuide"]}
                locale={locale}
              >
                {t.modules.coaReleaseDateDownloadGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaReleaseDateDownloadGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaReleaseDateDownloadGuide.intro}
            </p>
          </div>

          {/* Timeline */}
          <div className="scroll-reveal relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-4 md:space-y-5 mb-10">
            {t.modules.coaReleaseDateDownloadGuide.items.map(
              (item: any, index: number) => {
                const Icon = releaseIcons[index] || Rocket;
                return (
                  <div key={index} className="relative">
                    <div className="absolute -left-[1.6rem] md:-left-[2.1rem] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="font-bold text-base md:text-lg">
                          {item.label}
                        </h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">
                          {item.date}
                        </span>
                        {item.time && (
                          <span className="text-xs text-muted-foreground">
                            {item.time}
                          </span>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {/* Download checklist + CTAs */}
          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
            <div className="lg:col-span-2 p-5 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <Download className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                <h3 className="font-bold text-base md:text-lg">
                  Launch Checklist
                </h3>
              </div>
              <ul className="space-y-2">
                {t.modules.coaReleaseDateDownloadGuide.checklist.map(
                  (step: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="flex flex-col gap-3 justify-center p-5 md:p-6 bg-white/5 border border-border rounded-xl">
              <a
                href="https://ascension.gg/en/download"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white text-sm font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                {t.modules.coaReleaseDateDownloadGuide.downloadCta}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://ascension.gg/en/status"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] hover:bg-[hsl(var(--nav-theme)/0.2)] border border-[hsl(var(--nav-theme)/0.3)] text-sm font-semibold transition-colors"
              >
                <Activity className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
                {t.modules.coaReleaseDateDownloadGuide.statusCta}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 广告位 4: 第一模块之后的阅读停顿位 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-468x60"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60}
        className="hidden md:flex"
      />

      {/* Module 2: Beginner Guide */}
      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaBeginnerGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaBeginnerGuide"]}
                locale={locale}
              >
                {t.modules.coaBeginnerGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaBeginnerGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaBeginnerGuide.intro}
            </p>
          </div>

          {/* Steps */}
          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
            {t.modules.coaBeginnerGuide.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="flex gap-3 md:gap-4 p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-[hsl(var(--nav-theme)/0.2)]">
                  <span className="text-base md:text-xl font-bold text-[hsl(var(--nav-theme-light))]">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Tips */}
          <div className="scroll-reveal p-4 md:p-6 bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Sparkles className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
              <h3 className="font-bold text-base md:text-lg">Quick Tips</h3>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {t.modules.coaBeginnerGuide.quickTips.map((tip: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Module 3: Classes Guide */}
      <section id="classes-guide" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaClassesGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaClassesGuide"]}
                locale={locale}
              >
                {t.modules.coaClassesGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaClassesGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaClassesGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.coaClassesGuide.classes.map((cls: any, index: number) => (
              <div
                key={index}
                className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-bold text-lg text-[hsl(var(--nav-theme-light))]">
                    {cls.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {cls.roles.map((role: string, ri: number) => (
                    <RoleBadge key={ri} role={role} />
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                    {Array.isArray(cls.primaryStats) ? cls.primaryStats.join(", ") : cls.primaryStats}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                    {Array.isArray(cls.armor) ? cls.armor.join(", ") : cls.armor}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {cls.specializations.map((spec: string, si: number) => (
                    <span
                      key={si}
                      className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{cls.mechanic}</p>
                <p className="text-xs text-muted-foreground/80 italic mt-auto">
                  Best for: {cls.bestFor}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Class Tier List */}
      <section id="class-tier-list" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaClassTierList.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaClassTierList"]}
                locale={locale}
              >
                {t.modules.coaClassTierList.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaClassTierList.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaClassTierList.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-5">
            {t.modules.coaClassTierList.tiers.map((tier: any, ti: number) => {
              const TierIcon = TIER_ICONS[tier.tier] || Star;
              const tierStyle = TIER_STYLES[tier.tier] || TIER_STYLES.B;
              return (
                <div
                  key={ti}
                  className="p-4 md:p-6 bg-white/5 border border-border rounded-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
                    {/* Tier badge */}
                    <div className="flex items-center gap-3 md:w-56 flex-shrink-0">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 ${tierStyle}`}
                      >
                        <TierIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${tierStyle.split(" ").find((c) => c.includes("text-")) || ""}`}>
                            {tier.tier}
                          </span>
                          <span className="font-semibold text-sm md:text-base">
                            {tier.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {tier.basis}
                        </p>
                      </div>
                    </div>

                    {/* Class chips */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {tier.classes.map((c: any, ci: number) => (
                        <div
                          key={ci}
                          className="p-3 bg-white/5 border border-border rounded-lg hover:border-[hsl(var(--nav-theme)/0.4)] transition-colors"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-semibold text-sm">
                              {c.name}
                            </span>
                            <div className="flex flex-wrap gap-1 justify-end">
                              {c.roles.map((role: string, ri: number) => (
                                <RoleBadge key={ri} role={role} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{c.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA to classes guide */}
          <div className="scroll-reveal text-center mt-8">
            <button
              onClick={() => scrollToSection("classes-guide")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[hsl(var(--nav-theme)/0.4)] hover:bg-[hsl(var(--nav-theme)/0.1)] text-sm font-medium transition-colors"
            >
              Compare All 21 Classes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Module 5: Talent Trees and Builds Guide */}
      <section
        id="talent-trees-and-builds-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaTalentTreesAndBuildsGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaTalentTreesAndBuildsGuide"]}
                locale={locale}
              >
                {t.modules.coaTalentTreesAndBuildsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaTalentTreesAndBuildsGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaTalentTreesAndBuildsGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.coaTalentTreesAndBuildsGuide.items.map(
              (build: any, index: number) => {
                const Icon = BUILD_ICONS[build.id] || Sparkles;
                return (
                  <div
                    key={index}
                    className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex-shrink-0">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <h3 className="font-bold text-base md:text-lg">
                        {build.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {build.class && (
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
                          {build.class}
                        </span>
                      )}
                      {build.role && <RoleBadge role={build.role} />}
                    </div>
                    {(build.primary_stats ||
                      build.armor ||
                      build.class_mechanic) && (
                      <div className="flex flex-wrap gap-1.5 mb-3 text-xs">
                        {build.primary_stats && (
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                            {build.primary_stats.join(", ")}
                          </span>
                        )}
                        {build.armor && (
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                            {build.armor.join(", ")}
                          </span>
                        )}
                        {build.class_mechanic && (
                          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                            {build.class_mechanic}
                          </span>
                        )}
                      </div>
                    )}
                    {build.specialization_focus && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {build.specialization_focus}
                      </p>
                    )}
                    {build.core_data && (
                      <ul className="space-y-1.5 mb-3">
                        {build.core_data.map((d: string, i: number) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="text-xs text-muted-foreground/80 italic mt-auto mb-3">
                      Best for: {build.best_for}
                    </p>
                    <div className="p-2.5 rounded-lg bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold text-[hsl(var(--nav-theme-light))]">
                          Tip:
                        </span>{" "}
                        {build.player_tip}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Module 6: Leveling Guide */}
      <section
        id="leveling-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaLevelingGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaLevelingGuide"]}
                locale={locale}
              >
                {t.modules.coaLevelingGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaLevelingGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaLevelingGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal relative pl-6 md:pl-8 border-l-2 border-[hsl(var(--nav-theme)/0.3)] space-y-4 md:space-y-5">
            {t.modules.coaLevelingGuide.items.map(
              (milestone: any, index: number) => {
                const Icon = LEVELING_ICONS[milestone.id] || Flag;
                return (
                  <div key={index} className="relative">
                    <div className="absolute -left-[1.6rem] md:-left-[2.1rem] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[hsl(var(--nav-theme)/0.2)] border-2 border-[hsl(var(--nav-theme)/0.5)] flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[hsl(var(--nav-theme-light))]" />
                    </div>
                    <div className="p-4 md:p-6 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold text-[hsl(var(--nav-theme-light))]">
                          {milestone.range}
                        </span>
                        <h3 className="font-bold text-base md:text-lg">
                          {milestone.title}
                        </h3>
                      </div>
                      <ul className="space-y-1.5 mb-3">
                        {milestone.goals.map((g: string, gi: number) => (
                          <li
                            key={gi}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                            <span>{g}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {milestone.systems_unlocked.map(
                          (s: string, si: number) => (
                            <span
                              key={si}
                              className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-border"
                            >
                              {s}
                            </span>
                          ),
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground/80 italic">
                        <span className="font-semibold not-italic text-[hsl(var(--nav-theme-light))]">
                          Tip:
                        </span>{" "}
                        {milestone.player_tip}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* Module 7: Dungeons and Raids Guide */}
      <section
        id="dungeons-and-raids-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaDungeonsAndRaidsGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaDungeonsAndRaidsGuide"]}
                locale={locale}
              >
                {t.modules.coaDungeonsAndRaidsGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaDungeonsAndRaidsGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaDungeonsAndRaidsGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-8 md:space-y-10">
            {DUNGEON_CATEGORY_ORDER.map((cat: string) => {
              const catItems =
                t.modules.coaDungeonsAndRaidsGuide.items.filter(
                  (it: any) => it.category === cat,
                );
              if (!catItems.length) return null;
              return (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px flex-1 bg-[hsl(var(--nav-theme)/0.3)]" />
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-wider text-[hsl(var(--nav-theme-light))]">
                      {cat}
                    </h3>
                    <div className="h-px flex-1 bg-[hsl(var(--nav-theme)/0.3)]" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catItems.map((item: any, index: number) => {
                      const Icon = DUNGEON_ICONS[item.id] || Castle;
                      return (
                        <div
                          key={index}
                          className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                        >
                          <div className="flex items-center gap-2.5 mb-3">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex-shrink-0">
                              <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                            </div>
                            <h4 className="font-bold text-base">
                              {item.title}
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] font-semibold">
                              {item.difficulty}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                              {item.party_size}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {item.content_focus}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.key_rewards.map((r: string, ri: number) => (
                              <span
                                key={ri}
                                className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-border"
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground/80 italic mt-auto">
                            Best for: {item.best_for}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 8: PvP and High Risk Guide */}
      <section
        id="pvp-and-high-risk-guide"
        className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <span className="inline-block text-xs md:text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-[hsl(var(--nav-theme-light))]">
              {t.modules.coaPvpAndHighRiskGuide.eyebrow}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              <LinkedTitle
                linkData={moduleLinkMap["coaPvpAndHighRiskGuide"]}
                locale={locale}
              >
                {t.modules.coaPvpAndHighRiskGuide.title}
              </LinkedTitle>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
              {t.modules.coaPvpAndHighRiskGuide.subtitle}
            </p>
            <p className="text-sm md:text-base text-muted-foreground/80 max-w-2xl mx-auto">
              {t.modules.coaPvpAndHighRiskGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.coaPvpAndHighRiskGuide.items.map(
              (mode: any, index: number) => {
                const Icon = PVP_ICONS[mode.id] || Swords;
                const riskStyle =
                  RISK_STYLES[mode.risk_level] || RISK_STYLES.Variable;
                return (
                  <div
                    key={index}
                    className="flex flex-col p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] flex-shrink-0">
                        <Icon className="w-5 h-5 text-[hsl(var(--nav-theme-light))]" />
                      </div>
                      <h3 className="font-bold text-base md:text-lg">
                        {mode.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-border text-muted-foreground">
                        {mode.mode_type}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${riskStyle}`}
                      >
                        {mode.risk_level}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 border border-border text-muted-foreground">
                        {mode.player_count}
                      </span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {mode.core_rules.map((r: string, ri: number) => (
                        <li
                          key={ri}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-[hsl(var(--nav-theme-light))] mt-0.5 flex-shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mode.rewards.map((rw: string, rwi: number) => (
                        <span
                          key={rwi}
                          className="text-xs px-2 py-0.5 rounded-md bg-[hsl(var(--nav-theme)/0.05)] border border-[hsl(var(--nav-theme)/0.2)]"
                        >
                          {rw}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/80 italic mt-auto">
                      Best for: {mode.best_for}
                    </p>
                  </div>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* 广告位 5: 移动端横幅 */}
      {mobileBannerAd && (
        <AdBanner
          type={mobileBannerAd.type}
          adKey={mobileBannerAd.adKey}
          className="md:hidden"
        />
      )}

      {/* Latest Updates Section */}
      <LatestGuidesAccordion
        articles={latestArticles}
        locale={locale}
        max={12}
      />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner
        type="banner-300x250"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250}
        className="md:hidden"
      />
      <AdBanner
        type="banner-728x90"
        adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90}
        className="hidden md:flex"
      />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.footer.description}
              </p>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://ascension.gg/en/user/discord"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/ProjectAscension/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@ascensiongg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
                <li>
                  <a
                    href="https://ascension.gg/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.about}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-of-service"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.terms}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.copyrightNotice}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                {t.footer.copyright}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.footer.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
