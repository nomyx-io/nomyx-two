import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice | Nomyx Legal Documents",
  description: "Privacy Notice",
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/privacy-notice",
  },
};

export default function PrivacyNoticePage() {
  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="mb-2 text-[32px] font-bold leading-tight text-ink md:text-[40px] md:leading-tight">
          Privacy Notice
        </h1>
        <p className="text-[14px] leading-6 text-ink-muted">
          Last Updated: July 1, 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          <p>
            This Privacy Notice (&quot;Notice&quot;) explains how we collect, use, disclose, and store personal data, including data related to our blockchain and securities tokenization services.
          </p>

          <p>
            This Notice only applies when Nomyx is the Controller of personal data (example: Nomyx website visitors&apos; personal data, business-to-business contact data, and investor verification data). Nomyx is a Processor, not a Controller, of personal data that we process on behalf of our Subscribers when they use Nomyx products and Services. For clarity, this means that this Notice does not apply to where Nomyx processes personal data as a processor in its products and Services.
          </p>

          <p>
            If you have questions related to how a Nomyx Subscriber utilizes your personal data, please contact them directly. We are not responsible for the privacy or data security practices of our Subscribers. This Notice also does not apply to personal data about current and former Nomyx employees, job candidates, or contractors and agents acting in similar roles.
          </p>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              1. Introduction
            </h2>
            <p>
              This Notice applies to Nomyx Technology Labs Inc. and its relevant Affiliates listed in Section 14 (&quot;Nomyx,&quot; &quot;us,&quot; &quot;we,&quot; or &quot;our&quot;). Capitalized terms that we use but are not defined in the Notice (such as Site, Services, Subscriber, Agent, Agent Contact Information, etc.) have the meaning provided in our Main Services Agreement. If you are located in the European Economic Area (&quot;EEA&quot;), Switzerland, or the United Kingdom (&quot;U.K.&quot;), please refer to Section 11 of this Notice for more information about which specific entity or entities act as a controller of your personal data.
            </p>
            <p>
              <strong>When Does This Notice Apply?</strong> This Notice only applies to personal data that Nomyx handles as a Controller (meaning where Nomyx controls how and why your personal data is processed). This includes when you:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Visit or interact with the Nomyx.io Site, the Nomyx mobile applications, the Nomyx Marketplace, the Nomyx Developer Portal, our branded social media pages, and other Sites which we operate (collectively, our &quot;Digital Properties&quot;);
              </li>
              <li className="list-disc">
                Register for or participate in our webinars, events, programs, marketing, and promotional activities;
              </li>
              <li className="list-disc">
                Interact with us in person, such as when you visit our offices;
              </li>
              <li className="list-disc">
                Inquire about or engage in commercial transactions with us;
              </li>
              <li className="list-disc">
                Register for or participate in tokenized securities offerings through our platform;
              </li>
              <li className="list-disc">
                Complete investor verification processes for securities transactions;
              </li>
              <li className="list-disc">
                Interact with our securities tokenization services;
              </li>
              <li className="list-disc">
                Submit documentation for accredited investor verification; and
              </li>
              <li className="list-disc">
                Use our blockchain interfaces or smart contract deployment tools.
              </li>
            </ul>
            <p>
              <strong>Changes:</strong> We may update this Notice from time to time. Please check back periodically for updates. If you do not agree with any changes we make, you should stop interacting with us. When required under applicable law, we will notify you of any changes to this Notice by posting an update on our Site or in another appropriate manner.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              2. Personal Data We Collect and Disclose
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.1 Important Notice: Blockchain Data Permanence
              </h3>
              
              <div className="rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-5">
                <p className="font-bold text-[#D97706] mb-3">
                  WARNING: Blockchain Data Cannot Be Deleted
                </p>
                <p className="mb-3">
                  When you use our tokenization services, certain data becomes permanently recorded on blockchain networks:
                </p>
                <ul className="space-y-2 pl-5 mb-4">
                  <li className="list-disc">Wallet addresses</li>
                  <li className="list-disc">Transaction history</li>
                  <li className="list-disc">Token ownership records</li>
                  <li className="list-disc">Smart contract interactions</li>
                </ul>
                <p className="mb-3">
                  This data is publicly visible and cannot be modified or deleted. We recommend:
                </p>
                <ul className="space-y-2 pl-5">
                  <li className="list-disc">Using privacy-preserving techniques where possible</li>
                  <li className="list-disc">Carefully considering what data to submit for on-chain recording</li>
                  <li className="list-disc">Understanding that blockchain data persists even after account deletion</li>
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.2 Categories of Personal Data
              </h3>
              <p>
                The below describes what personal data we collect about you and to whom we disclose personal data. California individuals: This includes the parties we disclose personal data to for a business or commercial purpose, as defined by California law.
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>Identifiers:</strong> Name, email address, postal address, phone number, and device identifiers (e.g., advertising identifiers and IP address). Disclosed to affiliates, service providers, transaction processors, business partners, professional advisors, entities in corporate transactions, and marketing partners.
                </li>
                <li className="list-disc">
                  <strong>Commercial information:</strong> Preferences, purchasing history, transactional information, and banking information. Disclosed to service providers, payment processors, professional advisors, and entities in corporate transactions.
                </li>
                <li className="list-disc">
                  <strong>Securities Investment Information:</strong> Accredited investor status, investment history, financial qualifications, net worth verification, and securities transaction records. Disclosed to transfer agent services (1Transfer), payment processors (Bridge.xyz/HiFi), wallet service providers (DFNS), regulatory authorities, and compliance service providers.
                </li>
                <li className="list-disc">
                  <strong>Blockchain Wallet Information:</strong> Public wallet addresses, transaction history, token holdings, and on-chain activities. Disclosed to blockchain networks (public), analytics providers, compliance monitoring services, and smart contract interactions.
                </li>
                <li className="list-disc">
                  <strong>Compliance and Regulatory Data:</strong> SEC filing references, FINRA registration status, AML screening results, and sanctions check outcomes.
                </li>
                <li className="list-disc">
                  <strong>Internet or electronic network activity:</strong> Browsing history, search history, device information, and interactions with our Digital Properties.
                </li>
                <li className="list-disc">
                  <strong>Geolocation information:</strong> Approximate location based on IP address or information you provide.
                </li>
                <li className="list-disc">
                  <strong>Audio, electronic, visual information:</strong> CCTV recordings, call recordings, or chat logs.
                </li>
                <li className="list-disc">
                  <strong>Inferences:</strong> Marketing preferences as defined by California law.
                </li>
                <li className="list-disc">
                  <strong>Sensitive Personal Data:</strong> Proof of vaccination or diversity information (optional and where permissible).
                </li>
              </ul>
              <p>
                In addition to the above disclosures, we may share your personal data to respond to lawful requests by law enforcement or other government authorities, including to meet national security requirements. We may also de-identify, anonymize, or aggregate personal data to use or share with third parties for any purpose, where legally permitted.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              3. How We Process Personal Data
            </h2>
            <p>
              We may process your personal data for the below purposes:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>To provide our products, Services, and Digital Properties:</strong> Including processing transactions, enabling access, operating and improving services, communicating with you, and diagnosing issues. <em>Lawful Basis: Legitimate interests; Contract; Legal obligations</em>
              </li>
              <li className="list-disc">
                <strong>To facilitate securities tokenization:</strong> Including verifying investor accreditation, processing securities transactions, maintaining cap tables, distributing payments, and enforcing transfer restrictions. <em>Lawful Basis: Contract; Legal obligations; Legitimate interests</em>
              </li>
              <li className="list-disc">
                <strong>For regulatory compliance:</strong> Including SEC reporting, FINRA compliance, AML/KYC verification, sanctions screening, and maintaining required records. <em>Lawful Basis: Legal obligations; Public interest</em>
              </li>
              <li className="list-disc">
                <strong>To operate blockchain infrastructure:</strong> Including deploying smart contracts, processing transactions, managing digital wallets, and maintaining network nodes. <em>Lawful Basis: Contract; Legitimate interests</em>
              </li>
              <li className="list-disc">
                <strong>For our own business purposes:</strong> Including maintaining records, collecting payments, auditing, IT management, and research and development. <em>Lawful Basis: Legitimate interests; Legal obligations</em>
              </li>
              <li className="list-disc">
                <strong>For legal, safety, or security reasons:</strong> Including compliance, legal claims, protecting rights, investigating violations, and preventing illegal activity. <em>Lawful Basis: Legitimate interests; Legal obligations; Public interest</em>
              </li>
              <li className="list-disc">
                <strong>For marketing:</strong> Including testimonials, communications, recommendations, and contests. You may opt out via unsubscribe links. <em>Lawful Basis: Consent (where required); Legitimate interests</em>
              </li>
              <li className="list-disc">
                <strong>To fulfill referral requests:</strong> When you use our referral service. You must only provide others&apos; data with their consent. <em>Lawful Basis: Consent (where required); Legitimate interests</em>
              </li>
              <li className="list-disc">
                <strong>Diversity, equity, and inclusion initiatives:</strong> Where authorized by law. <em>Lawful Basis: Consent (where required); Legitimate interests</em>
              </li>
              <li className="list-disc">
                <strong>Corporate transactions:</strong> Such as mergers, acquisitions, or reorganizations. <em>Lawful Basis: Legitimate interests; Legal obligations</em>
              </li>
              <li className="list-disc">
                <strong>When you have voluntarily agreed:</strong> To have your personal data processed. <em>Lawful Basis: Consent</em>
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              4. Sources of Personal Data
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Information you provide directly, including registrations, communications, office visits, and event participation
              </li>
              <li className="list-disc">
                Information from verification providers, including Persona (identity verification) and other compliance services
              </li>
              <li className="list-disc">
                Information collected from your employer, coworkers, or friends
              </li>
              <li className="list-disc">
                Information automatically collected, including technical information about your interactions
              </li>
            </ul>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.1 Key Third-Party Processors
              </h3>
              <p>
                We work with specialized providers for securities services:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>Persona:</strong> Identity verification and document validation
                </li>
                <li className="list-disc">
                  <strong>Bridge.xyz:</strong> Payment processing and bank verification
                </li>
                <li className="list-disc">
                  <strong>DFNS:</strong> Institutional wallet infrastructure
                </li>
                <li className="list-disc">
                  <strong>1Transfer:</strong> Transfer agent and cap table services
                </li>
              </ul>
              <p>
                These providers may independently determine how they process data for regulatory compliance. Review their privacy policies for details.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              5. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and other tracking technologies as described in our Cookie Notice. Some tracking technologies enable us to track your device activity over time and across devices and websites. While some browsers have incorporated Do Not Track preferences, we do not honor such signals at this time.
            </p>
            <p>
              We use additional tracking for blockchain services:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">Wallet connection tracking</li>
              <li className="list-disc">Transaction monitoring cookies</li>
              <li className="list-disc">Smart contract interaction analytics</li>
              <li className="list-disc">Compliance monitoring tools</li>
            </ul>
            <p>
              These are essential for security and cannot be disabled while using tokenization services.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              6. Security and Retention
            </h2>
            <p>
              We maintain enterprise-grade security measures including:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">Multi-factor authentication requirements</li>
              <li className="list-disc">Regular third-party security audits</li>
              <li className="list-disc">Dedicated security for securities data</li>
            </ul>
            <p>
              <strong>Securities Data Retention:</strong>
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">KYC/AML records: 5 years after relationship ends</li>
              <li className="list-disc">Securities transaction records: 7 years minimum</li>
            </ul>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.1 Securities Data Rights
              </h3>
              <p>
                <strong>Important Limitations for Securities Data:</strong>
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Deletion rights do not apply to compliance records</li>
                <li className="list-disc">Portability may be restricted for AML data</li>
                <li className="list-disc">Access may be limited for ongoing investigations</li>
                <li className="list-disc">Blockchain data cannot be modified or deleted</li>
              </ul>
              <p>
                Contact <a href="mailto:compliance@nomyx.io" className="text-blue-500 hover:underline">compliance@nomyx.io</a> for securities-specific data requests.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our Sites and Services are not directed to children under the age of 16, and we do not knowingly collect online personal data directly from children. If you are a parent or guardian of a minor child and believe that the child has disclosed online personal data to us, please contact us.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              8. External Links
            </h2>
            <p>
              When interacting with us, you may encounter links to external sites or other online services. We do not control and are not responsible for privacy and data collection policies for such third-party sites and services.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              9. Contact Information
            </h2>
            <p>
              If you have questions or complaints regarding this Notice or about the Nomyx Group&apos;s privacy practices, please contact us:
            </p>
            <p>
              <strong>Email Contacts:</strong>
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">General Privacy: <a href="mailto:legal@nomyx.io" className="text-blue-500 hover:underline">legal@nomyx.io</a></li>
              <li className="list-disc">Securities Compliance: <a href="mailto:compliance@nomyx.io" className="text-blue-500 hover:underline">compliance@nomyx.io</a></li>
              <li className="list-disc">Data Deletion Requests: <a href="mailto:legal@nomyx.io" className="text-blue-500 hover:underline">legal@nomyx.io</a></li>
              <li className="list-disc">Regulatory Inquiries: <a href="mailto:legal@nomyx.io" className="text-blue-500 hover:underline">legal@nomyx.io</a></li>
              <li className="list-disc">Security Incidents: <a href="mailto:security@nomyx.io" className="text-blue-500 hover:underline">security@nomyx.io</a> (24/7)</li>
            </ul>
            <p>
              <strong>Mailing Address:</strong><br />
              Nomyx Technology Labs Inc.<br />
              Attn: Privacy Team<br />
              16192 Coastal Highway<br />
              Lewes, Delaware 19958, United States
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              10. Supplemental Terms for California Residents
            </h2>
            <p>
              Pursuant to the California Consumer Privacy Act (&quot;CCPA&quot;), this Section applies to certain personal data collected about California individuals where Nomyx controls how and why the personal data is processed.
            </p>
            
            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Additional Data Processing Disclosures
              </h3>
              <p>
                <strong>Securities Service Providers:</strong> We share data with securities service providers for compliance purposes. While not a &quot;sale&quot; under CCPA, we disclose:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Identity data to Persona for verification</li>
                <li className="list-disc">Financial data to Bridge.xyz for payments</li>
                <li className="list-disc">Transaction data to 1Transfer for recordkeeping</li>
              </ul>
              <p>
                This sharing is necessary for legal compliance and cannot be opted out of for active investors.
              </p>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Your Data Protection Rights
              </h3>
              <p>
                Subject to legal limitations, California residents may have rights to:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Know about data collection and use</li>
                <li className="list-disc">Delete personal data (with exceptions)</li>
                <li className="list-disc">Correct inaccurate personal data</li>
                <li className="list-disc">Opt Out of sale or sharing</li>
                <li className="list-disc">Limit use of sensitive personal information</li>
              </ul>
              <p>
                To exercise rights, use our webform or email <a href="mailto:legal@nomyx.io" className="text-blue-500 hover:underline">legal@nomyx.io</a>.
              </p>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Financial Incentives
              </h3>
              <p>
                We may offer benefits in exchange for providing personal data, such as survey rewards. The value equals the offer presented. Withdraw by emailing <a href="mailto:legal@nomyx.io" className="text-blue-500 hover:underline">legal@nomyx.io</a>.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              11. Supplemental Information for the EEA, Switzerland, and the U.K.
            </h2>
            
            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Data Controller
              </h3>
              <p>
                The Nomyx entity with which you have a primary relationship is the controller. Usually Nomyx Technology Labs Inc.
              </p>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Your Data Protection Rights
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Right to Access</li>
                <li className="list-disc">Right to Data Portability</li>
                <li className="list-disc">Right to Rectification</li>
                <li className="list-disc">Right to Object</li>
                <li className="list-disc">Right to Restrict Processing</li>
                <li className="list-disc">Right to Erasure</li>
                <li className="list-disc">Right to Lodge a Complaint</li>
                <li className="list-disc">Right to Refuse or Withdraw Consent</li>
              </ul>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                International Transfers
              </h3>
              <p>
                <strong>Securities data transfers:</strong>
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Persona (US data centers)</li>
                <li className="list-disc">Bridge.xyz/HiFi Bridge</li>
                <li className="list-disc">Blockchain networks (global distribution)</li>
              </ul>
              <p>
                Securities data is primarily processed in the US for regulatory compliance. We use appropriate safeguards including Standard Contractual Clauses.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              12. Supplemental Information for Other Regions
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Australia: </strong> Personal data is collected, stored, used, and/or processed in accordance with the Australian Privacy Act 1988 (Commonwealth) and the Australia Privacy Principles. Complaints may be made to the Office of the Australian Information Commissioner (&quot;OAIC&quot;).
              </li>
              <li className="list-disc">
                <strong>Brazil: </strong> Personal data is collected, stored, used, and/or processed in accordance with Lei Geral de Proteção de Dados (&quot;LGPD&quot;).
              </li>
              <li className="list-disc">
                <strong>Canada: </strong> Personal data will be collected, stored, used, and/or processed in accordance with the Personal Information Protection and Electronic Documents Act (&quot;PIPEDA&quot;).
              </li>
              <li className="list-disc">
                <strong>Japan: </strong> Personal data is collected, stored, used, and/or processed in accordance with Japan&apos;s Act on the Protection of Personal Information (&quot;APPI&quot;).
              </li>
              <li className="list-disc">
                <strong>Nevada: </strong> We do not presently sell personal data as defined under Nevada law. Nevada residents may email us to exercise their right to opt-out of sale under Nevada Revised Statutes §603A et seq.
              </li>
              <li className="list-disc">
                <strong>New Zealand: </strong> Personal data is collected, stored, used, and/or processed in accordance with New Zealand&apos;s Privacy Act 2020 and its 13 Information Privacy Principles (&quot;NZ IPPs&quot;).
              </li>
              <li className="list-disc">
                <strong>Singapore: </strong> Personal data is collected, stored, used, and/or processed in accordance with the Personal Data Protection Act 2012 (&quot;PDPA&quot;).
              </li>
              <li className="list-disc">
                <strong>United Kingdom: </strong> Personal data is collected, stored, used, and/or processed in accordance with the UK Data Protection Act 2018 (&quot;U.K. GDPR&quot;).
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              13. Securities Regulatory Compliance
            </h2>
            <p>
              When using our tokenization services, your data may be processed for:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">SEC regulatory reporting</li>
              <li className="list-disc">FINRA compliance requirements</li>
              <li className="list-disc">FinCEN anti-money laundering rules</li>
              <li className="list-disc">State securities law compliance</li>
              <li className="list-disc">International securities regulations</li>
            </ul>
            <p>
              We may disclose data to regulators without notice when required by law or legal process. Contact <a href="mailto:compliance@nomyx.io" className="text-blue-500 hover:underline">compliance@nomyx.io</a> for regulatory data questions.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              14. Transparency and Control
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Transparency Report Commitment
              </h3>
              <p>
                We publish annual transparency reports detailing:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Government data requests</li>
                <li className="list-disc">Regulatory disclosures</li>
                <li className="list-disc">Security incidents (anonymized)</li>
                <li className="list-disc">Data deletion statistics</li>
              </ul>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Privacy by Design
              </h3>
              <p>
                Our tokenization platform implements privacy by design:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Minimal on-chain data storage</li>
                <li className="list-disc">Off-chain storage for sensitive information</li>
                <li className="list-disc">Pseudonymous blockchain addresses</li>
                <li className="list-disc">Encrypted personal data storage</li>
              </ul>
            </div>

            <div className="space-y-3 pt-5">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                User Control Center
              </h3>
              <p>
                Visit privacy.nomyx.io to:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">View your data</li>
                <li className="list-disc">Download your information</li>
                <li className="list-disc">Manage preferences</li>
                <li className="list-disc">Submit requests</li>
                <li className="list-disc">Track request status</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              15. Revision History &amp; Version Control
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Material Changes Notice
              </h3>
              <p>
                We will notify you of material changes via:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Email (for registered users)</li>
                <li className="list-disc">Platform notifications</li>
                <li className="list-disc">30-day advance notice for significant changes</li>
              </ul>
            </div>

            <div className="space-y-3 pt-5">
              <p>
                <strong>Change Log:</strong> <a href="https://privacy.nomyx.io/changes" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">privacy.nomyx.io/changes</a>
              </p>
              <p>
                <strong>Current Version:</strong> 2.0
              </p>
              <p>
                <strong>Last Security Review:</strong> July 1, 2025
              </p>
              <p>
                <strong>Next Scheduled Review:</strong> January 1, 2026
              </p>
            </div>
          </section>

          <section className="space-y-5 border-t border-border pt-8 mt-8">
            <p className="italic text-ink-muted">
              Non-English translations are provided for convenience only. The English version controls.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
