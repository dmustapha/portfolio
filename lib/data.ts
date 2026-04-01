import type { SocialLink, Project, SkillGroup, NavItem, SidebarPanel } from './types';

// ── Personal Info ──
export const personalInfo = {
  name: 'Damilola Mustapha',
  firstName: 'Damilola',
  title: 'Full-Stack Developer',
  subtitle: 'Web3 & DeFi',
  description:
    "Doctor turned developer. I've built payment gateways, DeFi protocols, real-time games, privacy tools, and whatever comes next. If it needs a server, a chain, or a socket, I can ship it.",
  email: 'damilolamustaphaa@gmail.com',
} as const;

// ── Social Links ──
export const socialLinks: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/dmustapha', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/damilola-mustapha-070a812a8', label: 'LinkedIn' },
  { platform: 'twitter', url: 'https://x.com/capitanoo23', label: 'Twitter' },
  { platform: 'telegram', url: 'https://t.me/dmz4pf', label: 'Telegram' },
  { platform: 'email', url: 'mailto:damilolamustaphaa@gmail.com', label: 'Email' },
];

// ── Projects ──
export const projects: Project[] = [
  // ── Featured ──
  {
    name: 'GhostFund',
    chain: 'Ethereum',
    type: 'DeFi Vault',
    description:
      'Private DeFi yield vault that automates Aave V3 strategy monitoring, moves funds with sender privacy, and enforces deposit compliance at the smart contract level.',
    tech: ['Solidity', 'TypeScript', 'Foundry', 'Chainlink', 'Aave V3'],
    links: [
      { label: 'Live', url: 'https://ghostfund.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/ghostfund' },
      { label: 'Video', url: 'https://youtu.be/_UiGqtLKlWI' },
    ],
    revealDirection: 'right',
    isAlt: false,
    featured: true,
    badge: 'Winner — Chainlink Convergence 2026',
  },
  {
    name: 'DeepRock',
    chain: 'Avalanche',
    type: 'RWA Platform',
    description:
      'Real-world asset tokenization on Avalanche with gasless account abstraction via ERC-4337 and WebAuthn biometric authentication.',
    tech: ['Next.js', 'TypeScript', 'Solidity', 'ERC-4337', 'WebAuthn'],
    links: [
      { label: 'Live', url: 'https://deeprock-app.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/deeprock' },
      { label: 'Video', url: 'https://youtu.be/YeziPNxaUwE' },
    ],
    revealDirection: 'left',
    isAlt: true,
    featured: true,
  },
  // ── Grid ──
  {
    name: 'SLAStream',
    chain: 'Starknet',
    type: 'Cross-chain Payments',
    description:
      'Cross-chain streaming payments for Filecoin storage providers with programmable payment conditions.',
    tech: ['Cairo', 'Lit Protocol', 'TypeScript', 'Next.js'],
    links: [{ label: 'GitHub', url: 'https://github.com/dmustapha/slastream' }],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'Agent Auditor',
    chain: 'Multi-chain',
    type: 'Trust Scoring',
    description:
      'Trust scoring system for on-chain AI agents across 6 EVM chains with behavioral analysis.',
    tech: ['TypeScript', 'Next.js'],
    links: [{ label: 'GitHub', url: 'https://github.com/dmustapha/agent-auditor' }],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'DeltaAgent',
    chain: 'Arbitrum',
    type: 'AI DeFi Agent',
    description:
      'Autonomous AI agent managing leveraged ETH positions on Aave V3 with risk-adjusted strategies.',
    tech: ['TypeScript', 'Next.js'],
    links: [{ label: 'GitHub', url: 'https://github.com/dmustapha/deltaagent' }],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'TrustTap',
    chain: 'Solana',
    type: 'Reputation Platform',
    description:
      '8-dimension trust scores for Solana Seeker with QR-based verification and on-chain attestations.',
    tech: ['TypeScript', 'Next.js'],
    links: [{ label: 'GitHub', url: 'https://github.com/dmustapha/trusttap' }],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'KasGate',
    chain: 'Kaspa',
    type: 'Payment Gateway',
    description:
      'Non-custodial payment gateway for Kaspa with real-time transaction monitoring and merchant dashboard.',
    tech: ['TypeScript', 'Express', 'SQLite', 'Kaspa RPC'],
    links: [
      { label: 'Live', url: 'https://kasgate-production.up.railway.app/dashboard' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/kasgate' },
    ],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'WhaleVault',
    chain: 'Solana',
    type: 'Privacy Wallet',
    description:
      'Privacy-preserving wallet for Solana with zero-knowledge proofs and encrypted transaction history.',
    tech: ['Next.js', 'TypeScript', 'Rust/Anchor'],
    links: [
      { label: 'Live', url: 'https://whalevault.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/whalevault' },
    ],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'CyberpuckChaos',
    chain: 'OneChain',
    type: 'AI Game',
    description:
      'AI-driven air hockey with LLM chaos agent and Move smart contracts for on-chain game state.',
    tech: ['TypeScript', 'Next.js', 'Move'],
    links: [{ label: 'GitHub', url: 'https://github.com/dmustapha/cyberpuck-chaos' }],
    revealDirection: 'right',
    isAlt: false,
  },
];

// ── Skills ──
export const skillGroups: SkillGroup[] = [
  { label: 'Languages', skills: ['TypeScript', 'JavaScript', 'Solidity', 'Rust', 'Python'] },
  { label: 'Frameworks', skills: ['Next.js', 'React', 'Node.js', 'Express'] },
  { label: 'Tools & Infra', skills: ['Git', 'Bun', 'SQLite', 'Tailwind CSS', 'Vercel'] },
];

// ── About ──
export const aboutParagraphs = [
  'I build full-stack software: payment gateways, real-time multiplayer games, privacy tools, and asset platforms. Clean architecture, tested code, built for real users.',
  "Been in crypto since 2021. NFTs, DeFi, the whole cycle. After years as a user, I wanted to be on the other side, building the tools instead of just using them. Shipped four projects across four chains in six weeks. Placed 2nd at the Seedify Hackathon on BNB Chain with TruthBounty (raising $750K), where I'm the community and operations lead.",
  'I studied medicine (MBBS) before writing code. It taught me how to diagnose problems and sit with complexity until I find the root cause.',
] as const;

export const pullQuote = 'Build it, test it, ship it.';

// ── Navigation ──
export const navItems: NavItem[] = [
  { id: 'hero', tooltip: 'Top', ariaLabel: 'Go to top' },
  { id: 'about', tooltip: 'About', ariaLabel: 'Go to about' },
  { id: 'projects', tooltip: 'Work', ariaLabel: 'Go to work' },
  { id: 'skills', tooltip: 'Skills', ariaLabel: 'Go to skills' },
  { id: 'contact', tooltip: 'Contact', ariaLabel: 'Go to contact' },
];

// ── Sidebar Panels ──
export const sidebarPanels: SidebarPanel[] = [
  { id: 'hero', number: 'Portfolio', label: 'Damilola Mustapha' },
  { id: 'about', number: 'About', label: 'Background & Story', sublabel: 'Developer, builder, problem solver' },
  { id: 'projects', number: 'Work', label: 'Selected Projects', sublabel: '9 projects' },
  { id: 'skills', number: 'Skills', label: 'Technologies & Tools' },
  { id: 'contact', number: 'Contact', label: 'Get in Touch' },
];
