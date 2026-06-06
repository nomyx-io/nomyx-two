import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLegalDocument } from "../legalDocuments";

const document = getLegalDocument("cookie-notice");

export const metadata: Metadata = {
  title: "Cookie Notice | Nomyx Legal Documents",
  description: document?.description,
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/cookie-notice",
  },
};

export default function CookieNoticePage() {
  if (!document) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="max-w-3xl text-[34px] font-bold leading-[1.12] text-ink md:text-[46px]">
          Cookie Notice
        </h1>
        <p className="mt-3 text-base font-medium text-ink-muted">
          Last Updated: January 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          <p>
            This Cookie Notice explains how Nomyx Inc. and its affiliates
            (collectively, &quot;Nomyx,&quot; &quot;we,&quot; &quot;us,&quot;
            or &quot;our&quot;) use cookies and similar technologies when you
            visit our websites or interact with our services. This notice
            supplements our Privacy Notice and provides additional information
            about the tracking technologies we use.
          </p>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              1. What Are Cookies?
            </h2>

            <p>
              Cookies are small text files that are stored on your device
              (computer, tablet, or mobile phone) when you visit a website. They
              help websites function properly, remember your preferences, and
              provide information to the site owners for analytics and
              advertising purposes.
            </p>

            <p>
              Cookies can be &quot;first-party&quot; (set by the website
              you&apos;re visiting) or &quot;third-party&quot; (set by external
              services used by that website). They can also be &quot;session&quot;
              cookies (deleted when you close your browser) or
              &quot;persistent&quot; cookies (remain on your device for a set
              period or until you delete them).
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              2. Why We Use Cookies
            </h2>

            <p>
              We use cookies and similar technologies for several purposes:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Essential Functionality:</strong> Some cookies are
                necessary for our websites and services to function properly,
                including authentication, security, and load balancing.
              </li>
              <li className="list-disc">
                <strong>Performance and Analytics:</strong> We use cookies to
                understand how visitors interact with our websites, which pages
                are most popular, and how users navigate between pages. This
                helps us improve our services.
              </li>
              <li className="list-disc">
                <strong>Preferences: </strong> Cookies allow us to remember your
                settings and preferences, such as language selection or region,
                so you don&apos;t have to re-enter them each time you visit.
              </li>
              <li className="list-disc">
                <strong>Marketing:</strong> We may use cookies to deliver
                relevant advertisements and track the effectiveness of our
                marketing campaigns.
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              3. Types of Cookies We Use
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Strictly Necessary Cookies
              </h3>
              <p>
                These cookies are essential for the operation of our websites
                and services. They enable core functionality such as security,
                network management, and account access. You cannot opt out of
                these cookies as they are required for our services to function.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Analytics Cookies
              </h3>
              <p>
                These cookies collect information about how you use our
                websites, such as which pages you visit most often and if you
                receive error messages. This data is aggregated and anonymized,
                meaning it does not identify you personally. We use this
                information to improve our websites and understand user
                behavior.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Functional Cookies
              </h3>
              <p>
                These cookies allow our websites to remember choices you make
                (such as your username, language, or region) and provide
                enhanced, more personalized features. They may also be used to
                provide services you have requested, such as watching a video or
                commenting on a blog.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Marketing Cookies
              </h3>
              <p>
                These cookies track your online activity to help advertisers
                deliver more relevant advertising or to limit how many times you
                see an advertisement. These cookies can share that information
                with other organizations or advertisers. We may use third-party
                marketing cookies on our websites to support our marketing
                efforts.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              4. Similar Technologies
            </h2>

            <p>
              In addition to cookies, we may use other similar technologies:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Pixel Tags (Web Beacons):</strong> Small graphic images
                embedded in web pages or emails that collect information about
                your device and actions on our websites.
              </li>
              <li className="list-disc">
                <strong>Local Storage:</strong> Technology that allows a website
                to store and retrieve data on a user&apos;s device. Unlike
                cookies, local storage data is not automatically transmitted to
                servers.
              </li>
              <li className="list-disc">
                <strong>SDKs:</strong> Software development kits integrated into
                our mobile applications that function similarly to cookies and
                web beacons on our websites.
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              5. Managing Your Cookie Preferences
            </h2>

            <p>
              You have several options for managing cookies:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Browser Settings:</strong> Most web browsers allow you
                to control cookies through their settings. You can usually find
                these settings in the &quot;Options&quot; or
                &quot;Preferences&quot; menu of your browser. You can set your
                browser to refuse all cookies or to indicate when a cookie is
                being sent.
              </li>
              <li className="list-disc">
                <strong>Cookie Consent Tool:</strong> When you first visit our
                websites, you may be presented with a cookie banner that allows
                you to accept or decline non-essential cookies.
              </li>
              <li className="list-disc">
                <strong>Opt-Out Links:</strong> Some third-party cookies can be
                opted out of through industry opt-out programs such as the
                Digital Advertising Alliance (DAA) or the Network Advertising
                Initiative (NAI).
              </li>
            </ul>

            <p>
              Please note that if you choose to block or delete cookies, some
              features of our websites may not function properly.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              6. Third-Party Cookies
            </h2>

            <p>
              Some cookies on our websites are placed by third parties, such as
              analytics providers (e.g., Google Analytics), advertising
              networks, and social media platforms. These third parties may use
              cookies to collect information about your online activities over
              time and across different websites. We do not control these
              third-party cookies and recommend that you review the privacy
              policies of these third parties for more information.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              7. Updates to This Notice
            </h2>

            <p>
              We may update this Cookie Notice from time to time to reflect
              changes in technology, regulation, or our business practices. The
              &quot;Last Updated&quot; date at the top of this notice indicates
              when it was last revised. We encourage you to review this notice
              periodically to stay informed about our use of cookies and related
              technologies.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              8. Contact Us
            </h2>

            <p>
              If you have questions about our use of cookies or this Cookie
              Notice, please contact us at:
            </p>

            <div className="rounded-lg border border-border bg-[#F8FBFF] p-5 md:p-6">
              <p className="font-bold text-ink">Nomyx Inc.</p>
              <p>Email: legal@nomyx.io</p>
              <p>Email: privacy@nomyx.io</p>
              <p>
                Address: 651 N Broad Street, Suite 201, Middletown, Delaware,
                19709
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
