import type { LucideIcon } from "lucide-react"
import {
  Users,
  Store,
  Snowflake,
  Factory,
  Droplets,
  Milk,
  FlaskConical,
  Grid3x3,
  SunMoon,
  Truck,
  Wallet,
  Coins,
  FileText,
  MessageCircle,
  Mic,
  WifiOff,
  Languages,
  Volume2,
  MapPin,
  ShieldCheck,
} from "lucide-react"

/** Dhenu brand palette — jade/forest green with an amber (AM-shift) accent. */
export const DH = {
  green: "#14A06B",
  greenLight: "#34D399",
  greenDeep: "#0B6B47",
  gold: "#F59E0B",
} as const

export interface Persona {
  icon: LucideIcon
  role: string
  blurb: string
}

/** One login, four roles (verified in home_dispatcher.dart / auth_provider.dart). */
export const personas: Persona[] = [
  { icon: Droplets, role: "Farmer", blurb: "See earnings, quality and rate — pour by pour" },
  { icon: Store, role: "VMCC operator", blurb: "Record collections, dispatch and pay farmers" },
  { icon: Snowflake, role: "Chilling centre", blurb: "Receive from villages, pool, send onward" },
  { icon: Factory, role: "Processing plant", blurb: "Receive tankers at the plant" },
]

export interface ChainStep {
  icon: LucideIcon
  label: string
  note: string
}

/** The physical milk chain Dhenu tracks end-to-end. */
export const chain: ChainStep[] = [
  { icon: Droplets, label: "Farmer", note: "Pours milk, twice a day" },
  { icon: Store, label: "VMCC", note: "Village collection + quality" },
  { icon: Snowflake, label: "Chilling centre", note: "Pools & chills" },
  { icon: Factory, label: "Processing plant", note: "Receives tankers" },
]

export interface DhenuSpotlight {
  image: string
  kicker: string
  title: string
  body: string
  chips: string[]
}

/** Screenshot-forward deep-dives — every image is a real app screen. */
export const spotlights: DhenuSpotlight[] = [
  {
    image: "/screenshots/dhenu/vmcc-collect.png",
    kicker: "Collection",
    title: "Record a pour. See the rate instantly.",
    body: "Pick the farmer, enter litres and FAT/SNF — or just CLR on lactometer centres — and Dhenu previews the exact per-litre rate before you save.",
    chips: ["FAT/SNF or CLR entry", "AM/PM shifts", "Cow A1/A2, buffalo & more", "Live rate preview"],
  },
  {
    image: "/screenshots/dhenu/farmer-rate.png",
    kicker: "Fair pricing",
    title: "Quality-based pricing every farmer can see.",
    body: "Configurable FAT×SNF matrices, flat or CLR charts with quality grades and bonuses — plus a 'you-are-here' rate matrix that shows farmers how to earn more.",
    chips: ["FAT×SNF / CLR charts", "Quality grades A/B/C", "Grade bonuses", "Best-rate coaching"],
  },
  {
    image: "/screenshots/dhenu/vmcc-dispatch.png",
    kicker: "The chain",
    title: "From village to plant, every litre tracked.",
    body: "Dispatch and receive between VMCC, chilling centre and plant — with BMC and overnight pooling, shift closures, and variance on every consignment.",
    chips: ["Dispatch & receive", "BMC & overnight pooling", "Shift closures", "Variance tracking"],
  },
  {
    image: "/screenshots/dhenu/farmer-payment.png",
    kicker: "Payouts",
    title: "Transparent payouts, every rupee accounted.",
    body: "Cycle-based farmer payments with advance and cattle-feed-loan recovery, per-farmer paid/unpaid tracking, and shareable PDF statements — posted to real double-entry books.",
    chips: ["Cycle-based payout", "Advance & feed-loan recovery", "Paid / unpaid tracking", "PDF pour statements"],
  },
  {
    image: "/screenshots/dhenu/farmer-home.png",
    kicker: "For the farmer",
    title: "Farmers see their milk, money and quality.",
    body: "A cycle earnings hero with projection, AM/PM quality cards, quality-trend nudges, a Grade-A streak — and read-aloud audio so anyone can follow along.",
    chips: ["Cycle earnings & projection", "Quality nudges", "Grade-A streak", "Read-aloud voice"],
  },
]

export interface DhenuFeature {
  icon: LucideIcon
  label: string
}

/** All shipped — no referrals, marketplace, hardware, or unbuilt languages claimed. */
export const features: DhenuFeature[] = [
  { icon: Milk, label: "Live per-litre rate preview" },
  { icon: FlaskConical, label: "Quality bands & A/B/C grading" },
  { icon: Grid3x3, label: "FAT×SNF & CLR rate charts" },
  { icon: SunMoon, label: "AM / PM shift tracking" },
  { icon: Truck, label: "VMCC → CC → plant dispatch" },
  { icon: Snowflake, label: "BMC & overnight pooling" },
  { icon: Wallet, label: "Cycle-based farmer payouts" },
  { icon: Coins, label: "Advances & feed-loan recovery" },
  { icon: FileText, label: "Shareable PDF pour statements" },
  { icon: MessageCircle, label: "WhatsApp collection receipts" },
  { icon: Mic, label: "Voice + Aadhaar farmer onboarding" },
  { icon: MapPin, label: "GPS & photo capture" },
  { icon: WifiOff, label: "Works offline, syncs later" },
  { icon: Languages, label: "English, Kannada & Tamil" },
  { icon: Volume2, label: "Read-aloud for every figure" },
  { icon: ShieldCheck, label: "Secure phone-OTP login" },
]

export interface Shot {
  src: string
  label: string
}

/** Full gallery of real app screens. */
export const gallery: Shot[] = [
  { src: "/screenshots/dhenu/farmer-home.png", label: "Farmer · Home" },
  { src: "/screenshots/dhenu/farmer-collections.png", label: "Farmer · Collections" },
  { src: "/screenshots/dhenu/farmer-payment.png", label: "Farmer · Payments" },
  { src: "/screenshots/dhenu/farmer-rate.png", label: "Farmer · Rate chart" },
  { src: "/screenshots/dhenu/vmcc-home.png", label: "VMCC · Home" },
  { src: "/screenshots/dhenu/vmcc-collect.png", label: "VMCC · Record collection" },
  { src: "/screenshots/dhenu/vmcc-dispatch.png", label: "VMCC · Dispatch" },
  { src: "/screenshots/dhenu/cc-home.png", label: "Chilling centre · Home" },
  { src: "/screenshots/dhenu/cc-receive.png", label: "Chilling centre · Receive" },
]
