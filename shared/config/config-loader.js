const convict = require("convict");
const dotenv = require("dotenv");

dotenv.config();

const config = convict({
  sentry: {
    dsn: {
      doc: "Sentry config",
      format: String,
      default: "",
      env: "NEXT_PUBLIC_SENTRY_DSN"
    },
  },
  nodeEnv: {
    doc: "The application environment",
    format: "development" | "production" | "staging",
    default: "development",
    env: "NEXT_PUBLIC_NODE_ENV"
  },
  blogUrl: {
    doc: "Third party blog url",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_BLOG_URL"
  },
  customerPortalUrl: {
    doc: "The customer portal app url",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_CUSTOMER_PORTAL_URL"
  },
  fbAppId: {
    doc: "Facebook app id",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_FB_APP_ID"
  },
  googleClientId: {
    doc: "Google client id",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_GOOGLE_CLIENT_ID"
  },
  bestUserExperience: {
    doc: "Promotion site url",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_BEST_USER_EXPERIENCE"
  },
  publicProfileUrl: {
    doc: "Public profile app url",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_PROFILE_URL"
  },
  backendUrl: {
    doc: "Backend url",
    format: String,
    default: "",
    env: "NEXT_PUBLIC_BACKEND_URL"
  }
});

config.validate({ allowed: "strict" });

module.exports = () => {
  return { code: "module.exports = " + JSON.stringify(config.getProperties()) };
};
