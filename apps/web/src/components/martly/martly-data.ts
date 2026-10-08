import type { LucideIcon } from "lucide-react"
import {
  MapPin,
  ShoppingBasket,
  Bike,
  RotateCcw,
  LayoutGrid,
  Layers,
  CreditCard,
  Radar,
  Crown,
  Languages,
  LayoutDashboard,
  ClipboardList,
  Package,
  Boxes,
  Store,
  ShieldCheck,
  UserX,
  Lock,
} from "lucide-react"

/** Martly brand palette — deep teal with the amber "smile" accent from the logo. */
export const MT = {
  teal: "#0F766E",
  tealLight: "#2DD4BF",
  tealDeep: "#115E59",
  amber: "#FBBF24",
} as const

const SHOT = "/screenshots/martly"

export const stats = [
  { value: "1,300+", label: "Groceries & essentials" },
  { value: "16", label: "Departments, 440+ aisles" },
  { value: "~10 min", label: "Delivery from nearby stores" },
  { value: "2", label: "Languages — English & தமிழ்" },
]

export interface Step {
  icon: LucideIcon
  title: string
  body: string
}

export const steps: Step[] = [
  { icon: MapPin, title: "Pick a store near you", body: "Martly finds partner stores around you and shows who delivers to your door." },
  { icon: ShoppingBasket, title: "Fill your basket", body: "Browse by aisle, search by voice, or reorder what you bought last time." },
  { icon: Bike, title: "Delivered or picked up", body: "Fast home delivery, or skip the fee and collect from the store." },
]

export interface Spotlight {
  kicker: string
  title: string
  body: string
  chips: string[]
  image: string
  icon: LucideIcon
}

export const spotlights: Spotlight[] = [
  {
    kicker: "Home",
    title: "Your weekly shop, already half done.",
    body: "Martly remembers what you buy. Buy Again brings your regulars to the top, and the home feed changes with the time of day — breakfast in the morning, snacks in the evening.",
    chips: ["Buy Again with smart reorder", "Time-of-day picks", "Offers and seasonal banners", "Voice search"],
    image: `${SHOT}/home.webp`,
    icon: RotateCcw,
  },
  {
    kicker: "Browse",
    title: "A whole supermarket, neatly shelved.",
    body: "Sixteen departments break down into aisles you already know — Dairy, Fruits & Vegetables, Staples, Home Care — so finding things feels like walking the store.",
    chips: ["Department → category → aisle", "Real product photos", "Category search", "Filters by brand and diet"],
    image: `${SHOT}/categories.webp`,
    icon: LayoutGrid,
  },
  {
    kicker: "Choose",
    title: "Every pack size, side by side.",
    body: "One product, every size it comes in. Compare 250 g against 500 g at a glance and add the one that suits you — without leaving the list.",
    chips: ["All sizes in one sheet", "Per-size prices and discounts", "Wishlist anything", "Zoomable product photos"],
    image: `${SHOT}/sizes.webp`,
    icon: Layers,
  },
  {
    kicker: "Checkout",
    title: "Pay how you like. Get it how you like.",
    body: "Choose home delivery or store pickup, then pay with UPI, card, net banking, your Martly Wallet or cash on delivery. Delivery fees and timings are clear before you pay.",
    chips: ["Delivery or store pickup", "UPI, cards & net banking via Razorpay", "Wallet and cash on delivery", "Coupons and loyalty points"],
    image: `${SHOT}/checkout.webp`,
    icon: CreditCard,
  },
  {
    kicker: "Track",
    title: "Know exactly where your order is.",
    body: "From confirmed to packed to out for delivery, every step updates live, with notifications along the way and an itemised bill when it arrives.",
    chips: ["Live status timeline", "Push notifications", "Itemised bill", "Easy returns from the order"],
    image: `${SHOT}/order-tracking.webp`,
    icon: Radar,
  },
  {
    kicker: "Mart Plus",
    title: "Membership that pays for itself.",
    body: "Free delivery on every order, bonus loyalty points and member-only prices — monthly, quarterly or yearly, with no auto-renewal surprises.",
    chips: ["Free delivery on every order", "Up to 3× loyalty points", "Member-only prices", "No auto-renewal"],
    image: `${SHOT}/mart-plus.webp`,
    icon: Crown,
  },
  {
    kicker: "In your language",
    title: "Shop in English or தமிழ்.",
    body: "The whole app — menus, categories, even product names — switches to Tamil in a tap, so everyone at home can order with confidence.",
    chips: ["Full Tamil translation", "Switch anytime", "Translated catalog", "More Indian languages coming"],
    image: `${SHOT}/tamil.webp`,
    icon: Languages,
  },
]

export interface PlatformTab {
  id: string
  icon: LucideIcon
  label: string
  title: string
  body: string
  image: string
}

export const platformTabs: PlatformTab[] = [
  {
    id: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    title: "Your business at a glance",
    body: "Revenue, orders, basket size and customers across every store, with trends against the previous period.",
    image: `${SHOT}/admin-dashboard.webp`,
  },
  {
    id: "orders",
    icon: ClipboardList,
    label: "Orders",
    title: "Every order, every store, one queue",
    body: "Filter by status, payment or fulfilment, and move orders from confirmed to delivered in a click.",
    image: `${SHOT}/admin-orders.webp`,
  },
  {
    id: "catalog",
    icon: Package,
    label: "Catalog",
    title: "A ready-made catalog of 1,300+ products",
    body: "Start from a shared master catalog with real photos, or add your own products and brands.",
    image: `${SHOT}/admin-products.webp`,
  },
  {
    id: "stock",
    icon: Boxes,
    label: "Stock",
    title: "Stock and prices per store",
    body: "Each store sets its own prices, discounts and stock, with low-stock and out-of-stock alerts.",
    image: `${SHOT}/admin-stock.webp`,
  },
  {
    id: "stores",
    icon: Store,
    label: "Stores",
    title: "One panel, many stores",
    body: "Run a single shop or a chain: staff, riders, delivery zones and timings are set per store.",
    image: `${SHOT}/admin-stores.webp`,
  },
]

export const platformExtras = [
  "Rider app and delivery board",
  "Delivery zones, fees and time slots",
  "Coupons, banners and collections",
  "Loyalty, referrals and Mart Plus",
  "Reviews and store ratings",
  "Returns and support tickets",
  "Push notification campaigns",
  "AI demand forecasts",
]

export const gallery = [
  { src: `${SHOT}/home.webp`, label: "Home" },
  { src: `${SHOT}/categories.webp`, label: "Categories" },
  { src: `${SHOT}/product.webp`, label: "Product" },
  { src: `${SHOT}/sizes.webp`, label: "Pack sizes" },
  { src: `${SHOT}/checkout.webp`, label: "Checkout" },
  { src: `${SHOT}/order-tracking.webp`, label: "Order tracking" },
  { src: `${SHOT}/mart-plus.webp`, label: "Mart Plus" },
  { src: `${SHOT}/tamil.webp`, label: "Tamil" },
]

export const trust = [
  { icon: Lock, label: "Payments secured by Razorpay" },
  { icon: ShieldCheck, label: "Phone OTP sign-in" },
  { icon: UserX, label: "Delete your account in-app, anytime" },
]
