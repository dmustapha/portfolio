import type { SocialLink, Project, SkillGroup, NavItem, SidebarPanel } from './types';

// ── Personal Info ──
export const personalInfo = {
  name: 'Damilola Mustapha',
  firstName: 'Damilola',
  title: 'Physician & Software Engineer',
  subtitle: 'AI Agent Safety & Evaluation',
  description:
    "Doctor and software engineer. I build the safety, governance, and evaluation layer for autonomous AI agents — spend guardrails, trust scoring, verifiable permissions, and auditable, source-grounded outputs. I hold AI to a clinician's bar: auditable, evidence-based, safe to stand behind.",
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
    name: 'Triage-0',
    chain: 'On-device',
    type: 'Clinical AI',
    description:
      'Offline clinical triage for community health workers. Speech-to-text, reasoning, retrieval, and speech synthesis all run on-device. Every recommendation is grounded in a deterministic WHO decision table and cites the exact guideline page used, so a clinician can audit the output rather than trust it.',
    tech: ['MedPsy-1.7B', 'On-device inference', 'WHO guidelines', 'TypeScript'],
    links: [
      { label: 'GitHub', url: 'https://github.com/dmustapha/triage-0' },
      { label: 'Video', url: 'https://www.youtube.com/watch?v=Ws2Me2chnqY' },
    ],
    revealDirection: 'right',
    isAlt: false,
    featured: true,
    badge: 'Winner — Psy Models Track, Tether QVAC 2026',
  },
  {
    name: 'AgentAuditor',
    chain: 'Multi-chain',
    type: 'Agent Trust Scoring',
    description:
      'Trust scoring for autonomous AI agents across 7 chains. Behavioural profiling across 9 dimensions, LLM evaluation, and on-chain attestations, so other contracts can gate on an agent’s record before any deal or liquidity route.',
    tech: ['TypeScript', 'Next.js', 'Solidity', 'EAS', 'GoldRush'],
    links: [
      { label: 'Live', url: 'https://agent-auditor-two.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/agent-auditor' },
    ],
    revealDirection: 'left',
    isAlt: true,
    featured: true,
    badge: '🥈 Winner — GoldRush Agentic Track, Trends.fun Hackathon 2026',
  },
  // ── Grid ──
  {
    name: 'LEASH',
    chain: 'Multi-chain',
    type: 'AI Agent Governance',
    description:
      'Mission control for AI agents that spend real money. Binds an agent to a governed co-signed account, publishes its spend limits on an ENS name so any counterparty can read them, and revokes its access everywhere with a single on-chain write. Live across five chains.',
    tech: ['Solidity', 'ENS', 'x402', 'Privy', 'Next.js'],
    links: [
      { label: 'Live', url: 'https://leash.ink' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/leash' },
    ],
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: '0G Sentinel / ProofLock',
    chain: '0G',
    type: 'Agent Permissions',
    description:
      'A provable, revocable admission pass for AI agents. Seals a verdict on-chain that any contract can verify in a single call, so permission checks do not depend on trusting an off-chain API.',
    tech: ['Solidity', '0G Galileo', 'TypeScript'],
    links: [
      { label: 'Live', url: 'https://sentinel-prooflock.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/0g-sentinel' },
    ],
    revealDirection: 'right',
    isAlt: false,
    badge: 'Round of 16 — The Zero Cup, 0G Labs',
  },
  {
    name: 'AgentMesh',
    chain: '0G',
    type: 'Agent Mesh',
    description:
      'A peer-to-peer mesh where AI agents discover, hire, and pay each other directly through x402 micropayments, with no platform taking custody or a cut.',
    tech: ['TypeScript', 'x402', '0G', 'Next.js'],
    links: [
      { label: 'Live', url: 'https://agentmesh-rho.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/agentmesh' },
    ],
    revealDirection: 'right',
    isAlt: false,
    badge: 'Winner — 0G Sponsor Prize, ETHGlobal Open Agents 2026',
  },
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
    badge: 'Winner — Chainlink Convergence Hackathon 2026',
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
    revealDirection: 'right',
    isAlt: false,
  },
  {
    name: 'SLAStream',
    chain: 'Starknet',
    type: 'Cross-chain Payments',
    description:
      'Cross-chain streaming payments for Filecoin storage providers with programmable payment conditions.',
    tech: ['Cairo', 'Lit Protocol', 'TypeScript', 'Next.js'],
    links: [
      { label: 'Live', url: 'https://slastream.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/slastream' },
    ],
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
    links: [
      { label: 'Live', url: 'https://deltaagent.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/deltaagent' },
    ],
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
    links: [
      { label: 'Live', url: 'https://trusttap.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/trusttap' },
    ],
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
    links: [
      { label: 'Live', url: 'https://cyberpuck-chaos.vercel.app' },
      { label: 'GitHub', url: 'https://github.com/dmustapha/cyberpuck-chaos' },
    ],
    revealDirection: 'right',
    isAlt: false,
  },
];

// ── Skills ──
export const skillGroups: SkillGroup[] = [
  { label: 'Languages', skills: ['TypeScript', 'JavaScript', 'Solidity', 'Rust', 'Cairo', 'Python'] },
  { label: 'Frameworks', skills: ['Next.js', 'React', 'Node.js', 'Express'] },
  { label: 'Web3', skills: ['Ethereum', 'Solana', 'Avalanche', 'Starknet', 'Arbitrum', 'Kaspa'] },
  { label: 'Tools & Infra', skills: ['Foundry', 'Anchor', 'Git', 'Bun', 'SQLite', 'Tailwind CSS', 'Vercel', 'Railway'] },
];

// ── About ──
export const aboutParagraphs = [
  'I build the safety, governance, and evaluation layer for autonomous AI agents: spend guardrails, behavioural trust-scoring, verifiable permissions, and auditable, source-grounded outputs. Clean architecture, tested code, built for real users.',
  "A clinician's instinct runs through all of it: make a decision you can defend, and make it auditable enough to stand behind. Won the Psy Models track at Tether's QVAC with Triage-0, the GoldRush Agentic Track at Trends.fun with AgentAuditor, and Chainlink Convergence 2026 with GhostFund.",
  'I studied medicine (MBBS) and practise as a house officer. Medicine taught me to diagnose problems and sit with complexity until I find the root cause — the same habit I bring to building and evaluating AI.',
] as const;

export const pullQuote = 'Auditable enough to stand behind.';

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
  { id: 'about', number: 'About', label: 'Background & Story', sublabel: 'Physician, engineer, builder' },
  { id: 'projects', number: 'Work', label: 'Selected Projects', sublabel: '13 projects' },
  { id: 'skills', number: 'Skills', label: 'Technologies & Tools' },
  { id: 'contact', number: 'Contact', label: 'Get in Touch' },
];
