import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLegalDocument } from "../legalDocuments";

const document = getLegalDocument("msa");

export const metadata: Metadata = {
  title: "Main Service Agreement | Nomyx Legal Documents",
  description: document?.description,
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/msa",
  },
};

export default function MainServiceAgreementPage() {
  if (!document) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="max-w-3xl text-[34px] font-bold leading-[1.12] text-ink md:text-[46px]">
          Main Service Agreement
        </h1>
        <p className="mt-3 text-base font-medium text-ink-muted">
          Last Updated: July 1, 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          <p className="text-[17px] font-bold uppercase leading-8 text-ink md:text-[18px] md:leading-7">
            This Agreement is a binding contract and governs the use of and
            access to the services by you, agents and end-users whether in
            connection with a paid subscription or free trial for the services.
          </p>

          <p>
            By accepting this Agreement, either by accessing or using a Service,
            or authorizing or permitting any Agent or End-User to access or use a
            Service, Subscriber agrees to be bound by this Agreement as of the
            date of such access or use of the Service (the &quot;Effective
            Date&quot;). If You are entering into this Agreement on behalf of a
            company, organization or another legal entity (an &quot;Entity&quot;),
            You are agreeing to this Agreement for that Entity and representing
            to Nomyx that You have the authority to bind such Entity and its
            Affiliates to this Agreement, in which case the terms
            &quot;Subscriber,&quot; &quot;You,&quot; or &quot;Your&quot;
            herein refers to such Entity and its Affiliates. If You do not have
            such authority, or if You do not agree with this Agreement, You must
            not use or authorize any use of the Services. Subscriber and Nomyx
            shall each be referred to as a &quot;Party&quot; and collectively
            referred to as the &quot;Parties&quot; for purposes of this
            Agreement.
          </p>

          <p>
            The purpose of this Agreement is to establish the terms and
            conditions under which Subscriber may purchase Nomyx&apos;s Services
            and Professional Services as described in a Service Order, Statement
            of Work or other document signed or agreed to by the Subscriber. In
            the event of any inconsistency or conflict between the terms of the
            Main Services Agreement and the terms of any Service Order or
            Statement of Work, the terms of the Service Order or Statement of
            Work shall control. Non-English translations of this Agreement are
            provided for convenience only. In the event of any ambiguity or
            conflict between translations, the English version shall control.
          </p>

          <p className="font-bold text-ink">
            Effective Date: July 1, 2025
          </p>

          <section className="rounded-lg border border-border bg-[#F8FBFF] p-6 md:p-8">
            <h2 className="mb-5 text-[22px] font-bold leading-tight text-ink md:text-[26px]">
              Quick Summary
            </h2>
            <p className="mb-5">
              This agreement governs your use of Nomyx&apos;s blockchain
              infrastructure and tokenization services. Key points:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Clear responsibilities for blockchain-specific and
                securities-related risks
              </li>
              <li className="list-disc">
                Automatic renewal unless cancelled 60 days before term end
              </li>
              <li className="list-disc">
                Comprehensive data protection and security commitments
              </li>
              <li className="list-disc">
                Specific provisions for tokenized securities and fund management
              </li>
            </ul>
          </section>

          <p className="text-[17px] font-bold uppercase leading-8 text-ink md:text-[18px] md:leading-7">
            This Agreement governs your use of Nomyx&apos;s blockchain
            infrastructure services. By using our services, you agree to these
            terms.
          </p>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              1. Service Access and Delivery
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                1.1 Service Availability
              </h3>

              <p>
                We provide blockchain infrastructure services including:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Tokenization tools for SEC-registered securities (Reg A, Reg
                  D, Reg S)
                </li>
                <li className="list-disc">
                  Smart contract deployment using Diamond Proxy Upgradeable
                  Contracts (ERC-2535)
                </li>
                <li className="list-disc">
                  Compliance modules integrated with third-party KYC/AML
                  providers
                </li>
                <li className="list-disc">
                  Fund pooling mechanisms for tokenized securities
                </li>
                <li className="list-disc">
                  Integration with licensed exchange partners
                </li>
                <li className="list-disc">
                  White-label marketplace deployment (Launch Pad)
                </li>
                <li className="list-disc">
                  Automated compliance rule enforcement
                </li>
              </ul>

              <p>
                Services are available 24/7, except during:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Planned maintenance (advance notice provided)
                </li>
                <li className="list-disc">
                  Force majeure events
                </li>
                <li className="list-disc">
                  Blockchain network congestion or consensus mechanism changes
                </li>
                <li className="list-disc">
                  Third-party service outages (DFNS, Bridge.xyz, etc.)
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                1.2 Support
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>Standard:</strong> Business hours support via
                  email/portal
                </li>
                <li className="list-disc">
                  <strong>Enterprise:</strong> 24/7 support with 3-hour response
                  SLA for critical issues
                </li>
                <li className="list-disc">
                  <strong>Blockchain-specific:</strong> Smart contract emergency
                  response team available
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                1.3 Service Modifications
              </h3>

              <p>
                We may enhance Services during your subscription. We&apos;ll
                provide:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  30 days&apos; notice for material feature deprecation
                </li>
                <li className="list-disc">
                  90 days&apos; notice for API breaking changes
                </li>
                <li className="list-disc">
                  Migration guides for smart contract template updates
                </li>
                <li className="list-disc">
                  Compliance update notifications for regulatory changes
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              2. Using Our Services
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                2.1 Account Security
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Individual logins required (no sharing)
                </li>
                <li className="list-disc">
                  Multi-factor authentication mandatory for blockchain
                  operations
                </li>
                <li className="list-disc">
                  Enhanced authentication for securities-related functions
                </li>
                <li className="list-disc">
                  You&apos;re responsible for all account activity
                </li>
                <li className="list-disc">
                  Regular security reviews required for tokenized securities
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                2.2 Acceptable Use
              </h3>

              <p>
                You agree not to:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Deploy smart contracts for illegal activities
                </li>
                <li className="list-disc">
                  Create tokens violating securities laws
                </li>
                <li className="list-disc">
                  Use Services for mixer/tumbler operations
                </li>
                <li className="list-disc">
                  Manipulate markets or engage in wash trading
                </li>
                <li className="list-disc">
                  Store private keys or seed phrases in our systems
                </li>
              </ul>

              <p>
                Additional requirements for tokenized securities:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Maintain valid SEC filings for all tokenized offerings
                </li>
                <li className="list-disc">
                  Provide GAAP-audited financials before token minting
                </li>
                <li className="list-disc">
                  Comply with 12-month lockup between Reg A offerings
                </li>
                <li className="list-disc">
                  Ensure all investors complete KYC/AML verification through
                  approved providers
                </li>
                <li className="list-disc">
                  Obtain legal opinion letters for token classifications
                </li>
                <li className="list-disc">
                  Implement proper investor communication protocols
                </li>
                <li className="list-disc">
                  Maintain accurate cap tables and ownership records
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                2.3 Blockchain-Specific Requirements
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  You&apos;re responsible for gas fees and network costs
                </li>
                <li className="list-disc">
                  You understand blockchain transactions are irreversible
                </li>
                <li className="list-disc">
                  You&apos;ll comply with all applicable regulations (MiCA,
                  FinCEN, SEC, etc.)
                </li>
                <li className="list-disc">
                  You&apos;ll implement appropriate KYC/AML procedures
                </li>
                <li className="list-disc">
                  You&apos;ll use only approved third-party services (DFNS
                  wallets, Bridge.xyz, etc.)
                </li>
                <li className="list-disc">
                  You&apos;ll implement mandatory compliance rules in all token
                  smart contracts
                </li>
                <li className="list-disc">
                  You&apos;ll provide SEC filing links and EDGAR documentation
                  for all offerings
                </li>
                <li className="list-disc">
                  You acknowledge that fund tokens use both ERC-721 (underlying
                  assets) and ERC-20 (investor shares) standards
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              3. Term and Termination
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                3.1 Subscription Term
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Initial term specified in your Service Order
                </li>
                <li className="list-disc">
                  Auto-renews unless cancelled 60 days before term end
                </li>
                <li className="list-disc">
                  Pricing may adjust at renewal based on current rates
                </li>
                <li className="list-disc">
                  Three-year contracts receive preferential pricing
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                3.2 Termination Rights
              </h3>

              <p>
                Either party may terminate:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>For convenience:</strong> 30 days&apos; notice before
                  term end
                </li>
                <li className="list-disc">
                  <strong>For cause:</strong> 30 days to cure material breach
                </li>
                <li className="list-disc">
                  <strong>Immediate:</strong> For legal violations, prohibited
                  use, or securities law violations
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                3.3 Post-Termination
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  30-day data export window
                </li>
                <li className="list-disc">
                  Deployed smart contracts remain on-chain (immutable)
                </li>
                <li className="list-disc">
                  Securities compliance records retained per legal requirements
                </li>
                <li className="list-disc">
                  No refunds for early termination except our breach
                </li>
                <li className="list-disc">
                  Transfer of token administration to your designated party
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              4. Payment Terms
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                4.1 Fees
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Annual platform fees paid in advance
                </li>
                <li className="list-disc">
                  Usage-based fees (API calls, gas, Launch Pad) billed monthly
                </li>
                <li className="list-disc">
                  Third-party service fees passed through at cost
                </li>
                <li className="list-disc">
                  All fees non-refundable except as specified
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                4.2 Taxes
              </h3>

              <p>
                You&apos;re responsible for all taxes except our income taxes.
                Provide exemption certificates to avoid tax charges.
              </p>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              5. Confidentiality
            </h2>

            <p>
              We&apos;ll protect each other&apos;s confidential information with
              reasonable care. This excludes information that&apos;s:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Already public
              </li>
              <li className="list-disc">
                Independently developed
              </li>
              <li className="list-disc">
                Rightfully received from third parties
              </li>
              <li className="list-disc">
                Required to be disclosed for regulatory compliance
              </li>
            </ul>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              6. Data Protection
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                6.1 Security Measures
              </h3>

              <p>
                We maintain enterprise-grade security including:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Smart contract audit requirements
                </li>
                <li className="list-disc">
                  Smart contract upgrade time locks and veto capabilities
                </li>
                <li className="list-disc">
                  Securities-specific compliance monitoring
                </li>
                <li className="list-disc">
                  Integration security for approved third parties
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                6.2 Data Processing
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  You own your Service Data
                </li>
                <li className="list-disc">
                  We process data per our DPA (automatically incorporated)
                </li>
                <li className="list-disc">
                  On-chain data cannot be deleted (blockchain immutability)
                </li>
                <li className="list-disc">
                  Off-chain data deleted per our Service Data Deletion Policy
                </li>
                <li className="list-disc">
                  Securities compliance data retained per regulatory
                  requirements
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                6.3 Sub-processors
              </h3>

              <p>
                Current sub-processors listed at www.nomyx.io/legal/documents,
                including:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  DFNS (MPC wallet infrastructure)
                </li>
                <li className="list-disc">
                  Bridge.xyz (payment processing)
                </li>
                <li className="list-disc">
                  Persona (identity verification)
                </li>
                <li className="list-disc">
                  1Transfer (transfer agent services)
                </li>
              </ul>

              <p>
                We&apos;ll notify you of changes with opt-out rights for new
                processors.
              </p>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              7. Intellectual Property
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                7.1 Ownership
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  You own your data and smart contract deployments
                </li>
                <li className="list-disc">
                  We own our Services and template contracts
                </li>
                <li className="list-disc">
                  Open source components under respective licenses
                </li>
                <li className="list-disc">
                  Tokenized assets remain your property
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                7.2 Feedback
              </h3>

              <p>
                We can use your feedback to improve our Services without
                compensation.
              </p>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              8. Warranties and Disclaimers
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                8.1 Our Warranties
              </h3>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Services will materially conform to documentation
                </li>
                <li className="list-disc">
                  We&apos;ll maintain described security measures
                </li>
                <li className="list-disc">
                  We have the right to provide the Services
                </li>
                <li className="list-disc">
                  Our template smart contracts have been audited
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                8.2 Disclaimers
              </h3>

              <p className="font-bold uppercase text-ink">
                The Services are provided &quot;as is&quot; for all other
                warranties. We don&apos;t guarantee:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Blockchain network performance or availability
                </li>
                <li className="list-disc">
                  Smart contract outcomes or bug-free operation
                </li>
                <li className="list-disc">
                  Token value or regulatory compliance
                </li>
                <li className="list-disc">
                  Protection against all security threats
                </li>
                <li className="list-disc">
                  Third-party service availability or performance
                </li>
                <li className="list-disc">
                  Securities law compliance for your offerings
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              9. Indemnification
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                9.1 Our Indemnity
              </h3>

              <p>
                We&apos;ll defend you against claims that our Services infringe
                third-party IP rights, except for:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Your modifications or misuse
                </li>
                <li className="list-disc">
                  Combination with non-Nomyx services
                </li>
                <li className="list-disc">
                  Compliance with your specifications
                </li>
                <li className="list-disc">
                  Use of outdated versions when updates available
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                9.2 Your Indemnity
              </h3>

              <p>
                You&apos;ll defend us against claims arising from:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Your use violating this Agreement
                </li>
                <li className="list-disc">
                  Your smart contracts or tokens
                </li>
                <li className="list-disc">
                  Your end users&apos; activities
                </li>
                <li className="list-disc">
                  Your regulatory non-compliance
                </li>
                <li className="list-disc">
                  Securities law violations
                </li>
                <li className="list-disc">
                  Investor disputes or claims
                </li>
                <li className="list-disc">
                  Inaccurate disclosures or representations
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              10. Liability Limitations
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                10.1 Damages Excluded
              </h3>

              <p className="font-bold uppercase text-ink">
                Neither party liable for:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Lost profits or business
                </li>
                <li className="list-disc">
                  Indirect/consequential damages
                </li>
                <li className="list-disc">
                  Blockchain-specific losses (lost keys, failed transactions,
                  token devaluation)
                </li>
                <li className="list-disc">
                  Smart contract exploits from your code
                </li>
                <li className="list-disc">
                  Regulatory fines or penalties
                </li>
                <li className="list-disc">
                  Investor losses or claims
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                10.2 Liability Caps
              </h3>

              <p>
                Maximum liability (except exclusions below):
              </p>

              <div className="rounded-lg border border-border bg-[#F8FBFF] p-5 md:p-6">
                <p className="text-[13px] font-medium uppercase leading-6 text-ink md:text-[14px] md:leading-6">
                  In no event will the Nomyx parties be responsible or liable
                  for any claims, damages, liabilities, losses, costs or expenses
                  of any kind, whether direct or indirect, consequential,
                  compensatory, incidental, actual, exemplary, punitive or
                  special (including damages for loss of business, revenues,
                  profits, data, use, goodwill or other intangible losses)
                  regardless of whether the Nomyx parties have been advised of
                  the possibility of such damages, liabilities, losses, costs or
                  expenses, arising out of or in connection with: (A) the use or
                  performance of this website; (B) any provision of or failure to
                  provide this website or its services (including without
                  limitation any links on our website); (C) any information
                  available from this website; any conduct or content of any
                  third party; (E) unauthorized access, use or alteration of the
                  transmission of data or content to or from us; or (F) the
                  failure to receive in any way the transmission of any data,
                  content, funds or property from you. In no circumstances will
                  the aggregate liability of the Nomyx parties arising under
                  these terms exceed $1000.00 USD.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                10.3 Exclusions
              </h3>

              <p>
                Caps don&apos;t apply to:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Indemnification obligations
                </li>
                <li className="list-disc">
                  Willful misconduct
                </li>
                <li className="list-disc">
                  Death/bodily injury
                </li>
                <li className="list-disc">
                  Securities fraud
                </li>
              </ul>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                10.4 Blockchain and Securities Risk Acknowledgment
              </h3>

              <p>
                You acknowledge and accept:
              </p>

              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Blockchain immutability means no transaction reversal
                </li>
                <li className="list-disc">
                  Smart contracts may contain undiscovered vulnerabilities
                </li>
                <li className="list-disc">
                  Regulatory landscape is evolving rapidly
                </li>
                <li className="list-disc">
                  Network forks may affect your assets
                </li>
                <li className="list-disc">
                  We don&apos;t control blockchain networks
                </li>
                <li className="list-disc">
                  Securities laws may change
                </li>
                <li className="list-disc">
                  Third-party services may fail or change
                </li>
                <li className="list-disc">
                  Exchange listings are not guaranteed
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              11. General Terms
            </h2>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                11.1 Governing Law
              </h3>
              <p>
                Delaware law governs. Disputes resolved in Delaware courts.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                11.2 Entire Agreement
              </h3>
              <p>
                This Agreement (including incorporated documents) is the
                complete agreement. Your purchase orders don&apos;t apply.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                11.3 Assignment
              </h3>
              <p>
                You can&apos;t assign without our consent. We can assign to an
                affiliate or successor.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                11.4 Updates
              </h3>
              <p>
                We may update these terms with 30 days&apos; notice. Continued
                use means acceptance.
              </p>
            </div>

            <div className="space-y-5">
              <h3 className="text-[18px] font-bold leading-tight text-ink md:text-[20px]">
                11.5 Notices
              </h3>
              <p>
                <strong>Legal Notices:</strong> Nomyx Technology Labs Inc.,
                16192 Coastal Highway, Lewes, Delaware 19958 or legal@nomyx.io
              </p>
            </div>
          </section>

          <section className="space-y-7">
            <h2 className="text-[28px] font-bold leading-tight text-ink md:text-[26px]">
              12. Definitions
            </h2>

            <dl className="space-y-4">
              <div>
                <dt className="font-bold text-ink">&quot;API&quot;</dt>
                <dd>Our application programming interfaces</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Blockchain&quot;</dt>
                <dd>
                  Distributed ledger technology networks we support, including
                  TSC
                </dd>
              </div>
              <div>
                <dt className="font-bold text-ink">
                  &quot;Compliance Rules&quot;
                </dt>
                <dd>
                  Smart contract-embedded restrictions for KYC/AML and transfer
                  controls
                </dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Diamond Proxy&quot;</dt>
                <dd>ERC-2535 upgradeable smart contract standard</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;DPA&quot;</dt>
                <dd>Data Processing Agreement at www.nomyx.io/legal/documents</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Fund Pool&quot;</dt>
                <dd>
                  Aggregation mechanism using ERC-721 tokens mapped to
                  underlying assets and ERC-20 tokens for investor shares
                </dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Launch Pad&quot;</dt>
                <dd>White-label marketplace for tokenized fund distribution</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Service Data&quot;</dt>
                <dd>Data you submit to our Services</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Services&quot;</dt>
                <dd>Our blockchain infrastructure platform and tools</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Smart Contract&quot;</dt>
                <dd>Self-executing code deployed on blockchain</dd>
              </div>
              <div>
                <dt className="font-bold text-ink">&quot;Token&quot;</dt>
                <dd>Digital assets created using our Services</dd>
              </div>
            </dl>
          </section>

          <section className="space-y-5 border-t border-border pt-8">
            <h2 className="text-[24px] font-bold leading-tight text-ink md:text-[30px]">
              Incorporated Documents
            </h2>

            <p>
              The following are automatically part of this Agreement:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">Data Processing Agreement</li>
              <li className="list-disc">Acceptable Use Policy</li>
              <li className="list-disc">Service Level Agreement (Enterprise only)</li>
              <li className="list-disc">Security Measures Summary</li>
              <li className="list-disc">Service Data Deletion Policy</li>
              <li className="list-disc">Sub-processor Policy</li>
              <li className="list-disc">Securities Tokenization Addendum</li>
            </ul>

            
            <p>
              All documents available at <Link className="text-blue-500 hover:underline" href="https://www.nomyx.io/legal-documents" target="_blank">www.nomyx.io/legal-documents</Link>
            </p>

            <p>
              For questions: <Link className="text-blue-500 hover:underline" href="mailto:legal@nomyx.io">legal@nomyx.io</Link>
            </p>

            <p className="font-bold text-ink">
              Version: 2.0 | Effective: July 1, 2025
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
