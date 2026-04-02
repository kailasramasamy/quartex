export type { Product, ProductFeature } from "./types/product.js"
export type { SeoMeta } from "./types/seo.js"
export type { NavLink } from "./constants/navigation.js"

export { products } from "./constants/products.js"
export { mainNavLinks, productNavLinks, footerLinks } from "./constants/navigation.js"
export { buildMeta } from "./utils/seo.js"

// Beta testing
export type {
  AppId,
  QuartexAppId,
  Platform,
  ProgramStatus,
  TesterStatus,
  FeedbackCategory,
  FeedbackPriority,
  FeedbackStatus,
  EmailTemplate,
  TestProgram,
  Tester,
  ProgramTester,
  Feedback,
  Release,
} from "./types/beta-testing.js"

export {
  createProgramSchema,
  updateProgramSchema,
  testerRegistrationSchema,
  submitFeedbackSchema,
  updateFeedbackSchema,
  createReleaseSchema,
  loginSchema,
  platformEnum,
  programStatusEnum,
  testerStatusEnum,
  feedbackCategoryEnum,
  feedbackPriorityEnum,
  feedbackStatusEnum,
} from "./validators/beta-testing.js"

export {
  PROGRAM_STATUS,
  TESTER_STATUS,
  FEEDBACK_CATEGORY,
  FEEDBACK_PRIORITY,
  FEEDBACK_STATUS,
  PLATFORM,
  QUARTEX_APPS,
  DEFAULT_INVITE_MESSAGE,
} from "./constants/beta-testing.js"
