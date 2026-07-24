"use client";

import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

import viHeader from "./locales/vi/header.json";
import viFooter from "./locales/vi/footer.json";
import viMenu from "./locales/vi/menu.json";
import viDates from "./locales/vi/dates.json";
import viPagination from "./locales/vi/component/pagination.json";
import viPagesHome from "./locales/vi/pages/home.json";
import viPagesAbout from "./locales/vi/pages/about.json";
import viPagesContact from "./locales/vi/pages/contact.json";
import viPagesNews from "./locales/vi/pages/news.json";
import viPagesServices from "./locales/vi/pages/services.json";
import viPagesSearch from "./locales/vi/pages/search.json";
import viPagesLogin from "./locales/vi/pages/login.json";
import viPagesRegister from "./locales/vi/pages/register.json";
import viPagesForgotPassword from "./locales/vi/pages/forgot-password.json";
import viPagesQuotation from "./locales/vi/pages/quotation.json";
import viPagesQuotationForm from "./locales/vi/pages/quotation-form.json";
import viPagesUser from "./locales/vi/pages/user.json";
import viPagesCareers from "./locales/vi/pages/careers.json";
import viPagesPostDetail from "./locales/vi/pages/post-detail.json";
import viPagesWorkSchedule from "./locales/vi/pages/work-schedule.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(async (language: string, namespace: string) => {
      return await import(`./locales/${language}/${namespace}.json`);
    })
  )
  .init({
    lng: "vi",
    fallbackLng: "vi",
    supportedLngs: ["vi", "en"],
    defaultNS: "header",
    load: "languageOnly",
    partialBundledLanguages: true,
    resources: {
      vi: {
        header: viHeader,
        footer: viFooter,
        menu: viMenu,
        dates: viDates,
        "component/pagination": viPagination,
        "pages/home": viPagesHome,
        "pages/about": viPagesAbout,
        "pages/contact": viPagesContact,
        "pages/news": viPagesNews,
        "pages/services": viPagesServices,
        "pages/search": viPagesSearch,
        "pages/login": viPagesLogin,
        "pages/register": viPagesRegister,
        "pages/forgot-password": viPagesForgotPassword,
        "pages/quotation": viPagesQuotation,
        "pages/quotation-form": viPagesQuotationForm,
        "pages/user": viPagesUser,
        "pages/careers": viPagesCareers,
        "pages/post-detail": viPagesPostDetail,
        "pages/work-schedule": viPagesWorkSchedule,
      },
    },
    ns: [
      "header",
      "footer",
      "menu",
      "dates",
      "component/pagination",
      "pages/home",
      "pages/about",
      "pages/contact",
      "pages/news",
      "pages/services",
      "pages/search",
      "pages/login",
      "pages/register",
      "pages/forgot-password",
      "pages/quotation",
      "pages/quotation-form",
      "pages/user",
      "pages/careers",
      "pages/post-detail",
      "pages/work-schedule",
    ],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage", "cookie"],
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
