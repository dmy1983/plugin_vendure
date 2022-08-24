import {
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  VendureConfig,
} from "@vendure/core";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import path from "path";
import { ExamplePlugin } from "../index";
import { compileUiExtensions } from "@vendure/ui-devkit/compiler";
import { DefaultOrderPlacedStrategy } from "./order/default-order-placed-strategy";

export const headlessConfig: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    adminApiPlayground: {
      settings: {
        "request.credentials": "include",
      } as any,
    }, // turn this off for production
    adminApiDebug: true, // turn this off for production
    shopApiPath: "shop-api",
    shopApiPlayground: {
      settings: {
        "request.credentials": "include",
      } as any,
    }, // turn this off for production
    shopApiDebug: true, // turn this off for production
  },
  authOptions: {
    superadminCredentials: {
      identifier: "superadmin",
      password: "superadmin",
    },
    cookieOptions: {
      secret: "v5evpqy0rn",
    },
  },
  dbConnectionOptions: {
    type: "postgres",
    synchronize: true, // turn this off for production
    logging: false,
    database: "vendure",
    host: process.env.DATABASE_HOST || "localhost",
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: "postgres",
    password: "password",
    migrations: [path.join(__dirname, "../migrations/*.ts")],
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {
    Product: [{ name: "storeInHouseId", type: "string" }],
    Customer: [
      { name: "CUIT", type: "string" },
      { name: "DNI", type: "string" },
    ],
  },
  orderOptions: {
    orderPlacedStrategy: new DefaultOrderPlacedStrategy(),
  },
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "./static/assets"),
    }),
    DefaultJobQueuePlugin,
    DefaultSearchPlugin,
    ExamplePlugin,
    // EmailPlugin.init({
    //   devMode: true,
    //   outputPath: path.join(__dirname, "./static/email/test-emails"),
    //   route: "mailbox",
    //   handlers: defaultEmailHandlers,
    //   templatePath: path.join(__dirname, "./static/email/templates"),
    //   globalTemplateVars: {
    //     // The following variables will change depending on your storefront implementation
    //     fromAddress: '"example" <noreply@example.com>',
    //     verifyEmailAddressUrl: `${process.env.DOMAIN_URL}/users/verify`,
    //     passwordResetUrl: `${process.env.DOMAIN_URL}/users/password-reset`,
    //     changeEmailAddressUrl: `${process.env.DOMAIN_URL}/users/verify-email-address-change`,
    //   },
    // }),
  ],
};

export const config: VendureConfig = {
  ...headlessConfig,
  plugins: [
    ...(headlessConfig.plugins || []),
    AdminUiPlugin.init({
      route: "admin",
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, "admin-ui"),
        devMode: true,
        extensions: [ExamplePlugin.uiExtensions],
      }),
    }),
  ],
};
