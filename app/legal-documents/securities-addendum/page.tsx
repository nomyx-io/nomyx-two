import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Securities Tokenization Service Addendum | Nomyx Legal Documents",
  description: "Securities Tokenization Service Addendum",
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/securities-addendum",
  },
};

export default function SecuritiesAddendumPage() {
  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="mb-2 text-[32px] font-bold leading-tight text-ink md:text-[40px] md:leading-tight">
          Securities Tokenization Service Addendum
        </h1>
        <p className="text-[14px] leading-6 text-ink-muted">
          Last Updated: July 1, 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          <p>
            This Addendum supplements the Main Services Agreement for customers using Nomyx&apos;s securities tokenization services, including the Launch Pad platform.
          </p>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              1. Securities-Specific Definitions
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>&quot;Accredited Investor&quot;</strong> - An investor meeting SEC requirements under Rule 501 of Regulation D
              </li>
              <li className="list-disc">
                <strong>&quot;Fund Pool&quot;</strong> - The dual-token structure where ERC-721 tokens represent underlying fund assets and ERC-20 tokens represent investor shares
              </li>
              <li className="list-disc">
                <strong>&quot;Launch Pad&quot;</strong> - Nomyx&apos;s white-label marketplace platform for primary issuance of tokenized securities
              </li>
              <li className="list-disc">
                <strong>&quot;NAV&quot;</strong> - Net Asset Value of a tokenized fund
              </li>
              <li className="list-disc">
                <strong>&quot;Qualified Investor&quot;</strong> - An investor meeting EU/UK requirements for securities investments
              </li>
              <li className="list-disc">
                <strong>&quot;Reg A&quot;</strong> - SEC Regulation A+ allowing public offerings up to $75 million
              </li>
              <li className="list-disc">
                <strong>&quot;Reg D&quot;</strong> - SEC Regulation D private placement exemption
              </li>
              <li className="list-disc">
                <strong>&quot;Reg S&quot;</strong> - SEC Regulation S for offshore offerings
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              2. Service Description
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.1 Launch Pad Platform
              </h3>
              <p>
                We provide a comprehensive tokenization platform including:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  White-label investor portal customization
                </li>
                <li className="list-disc">
                  Dual-token fund structure implementation
                </li>
                <li className="list-disc">
                  Automated compliance rule enforcement
                </li>
                <li className="list-disc">
                  Integration with required third-party services
                </li>
                <li className="list-disc">
                  Primary market capabilities
                </li>
                <li className="list-disc">
                  Fund administration tools
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.2 Required Integrations
              </h3>
              <p>
                The following third-party services are mandatory for securities tokenization:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>DFNS:</strong> MPC wallet infrastructure
                </li>
                <li className="list-disc">
                  <strong>Bridge.xyz/HiFiBridge:</strong> Fiat on/off ramp services
                </li>
                <li className="list-disc">
                  <strong>Persona:</strong> Identity verification backend
                </li>
                <li className="list-disc">
                  <strong>1Transfer:</strong> Transfer agent services (where applicable)
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.3 Compliance Framework
              </h3>
              <p>
                All tokenized securities include:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Embedded transfer restrictions
                </li>
                <li className="list-disc">
                  Investor whitelist management
                </li>
                <li className="list-disc">
                  Regulatory hold capabilities
                </li>
                <li className="list-disc">
                  Automated distribution mechanisms
                </li>
                <li className="list-disc">
                  Real-time cap table maintenance
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              3. Customer Obligations
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                3.1 Regulatory Compliance
              </h3>
              <p>
                You must:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Obtain all required regulatory approvals before token issuance
                </li>
                <li className="list-disc">
                  Maintain current SEC filings (Form D, Reg A qualification, etc.)
                </li>
                <li className="list-disc">
                  Provide GAAP-audited financials for Reg A offerings
                </li>
                <li className="list-disc">
                  Ensure all marketing materials comply with securities laws
                </li>
                <li className="list-disc">
                  Implement proper investor communications
                </li>
                <li className="list-disc">
                  Maintain accurate books and records
                </li>
                <li className="list-disc">
                  Implement appropriate accreditation/qualified investor verification at project level
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                3.2 Investor Verification
              </h3>
              <p>
                You must ensure:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  All investors complete KYC/AML process
                </li>
                <li className="list-disc">
                  Accredited investor status is verified for Reg D offerings
                </li>
                <li className="list-disc">
                  Qualified investor status is verified for EU/UK offerings
                </li>
                <li className="list-disc">
                  Investor caps are maintained per regulations
                </li>
                <li className="list-disc">
                  Bad actor checks are performed as required
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                3.3 Fund Requirements
              </h3>
              <p>
                For tokenized funds, you must:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Provide annual GAAP audits
                </li>
                <li className="list-disc">
                  Update NAV at least annually
                </li>
                <li className="list-disc">
                  Maintain 12-month lockup between Reg A offerings
                </li>
                <li className="list-disc">
                  Provide clear fee disclosures
                </li>
                <li className="list-disc">
                  Implement proper redemption procedures
                </li>
                <li className="list-disc">
                  Use licensed service providers
                </li>
                <li className="list-disc">
                  Implement appropriate accreditation/qualified investor verification at project level
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              4. Token Structure and Mechanics
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.1 Dual-Token Architecture
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>Nomyx Permissioned ERC-721 Tokens:</strong> Represent underlying fund assets or securities
                </li>
                <li className="list-disc">
                  <strong>Nomyx Permissioned ERC-20 Tokens:</strong> Represent fungible investor shares in fund pools
                </li>
                <li className="list-disc">
                  <strong>Diamond Proxy:</strong> Enables post-deployment upgrades for compliance
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.2 Compliance Rules
              </h3>
              <p>
                All tokens include:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Transfer restrictions based on investor verification
                </li>
                <li className="list-disc">
                  Lock-up period enforcement
                </li>
                <li className="list-disc">
                  Regulatory freeze capabilities
                </li>
                <li className="list-disc">
                  Forced transfer mechanisms
                </li>
                <li className="list-disc">
                  Distribution payment routing
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.3 Smart Contract Features
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Upgradeable via Diamond Proxy pattern
                </li>
                <li className="list-disc">
                  Role-based access control
                </li>
                <li className="list-disc">
                  Pause/unpause functionality
                </li>
                <li className="list-disc">
                  Snapshot capabilities for distributions
                </li>
                <li className="list-disc">
                  Automated fee collection
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              5. Support and Training
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                5.1 Included Support
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Initial platform training
                </li>
                <li className="list-disc">
                  Compliance best practices guidance
                </li>
                <li className="list-disc">
                  Technical integration assistance
                </li>
                <li className="list-disc">
                  Quarterly business reviews
                </li>
                <li className="list-disc">
                  Regulatory update notifications
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                5.2 Additional Services
              </h3>
              <p>
                Available at additional cost:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Custom development
                </li>
                <li className="list-disc">
                  Enhanced compliance review
                </li>
                <li className="list-disc">
                  Marketing assistance
                </li>
                <li className="list-disc">
                  Investor relations support
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              6. Operational Procedures
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.1 Fund Launch Process
              </h3>
              <ol className="space-y-3 pl-5 list-decimal">
                <li className="pl-1">
                  Issuer KYB/KYC
                </li>
                <li className="pl-1">
                  Fund structure configuration
                </li>
                <li className="pl-1">
                  SEC filing verification
                </li>
                <li className="pl-1">
                  Smart contract deployment
                </li>
                <li className="pl-1">
                  Investor portal customization
                </li>
                <li className="pl-1">
                  Go-live approval
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.2 Investor Onboarding
              </h3>
              <ol className="space-y-3 pl-5 list-decimal">
                <li className="pl-1">
                  Investor accesses white-label portal
                </li>
                <li className="pl-1">
                  Completes KYC/AML process
                </li>
                <li className="pl-1">
                  Provides accreditation documentation
                </li>
                <li className="pl-1">
                  Funds wallet via Bridge.xyz/HiFiBridge or wire
                </li>
                <li className="pl-1">
                  Purchases tokens through portal
                </li>
                <li className="pl-1">
                  Receives tokens to DFNS-managed wallet
                </li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.3 Ongoing Operations
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Daily transaction monitoring
                </li>
                <li className="list-disc">
                  Monthly compliance reporting
                </li>
                <li className="list-disc">
                  Annual audit updates
                </li>
                <li className="list-disc">
                  Quarterly investor communications
                </li>
                <li className="list-disc">
                  Real-time cap table maintenance
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              7. Data Handling
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.1 On-Chain Data
              </h3>
              <p>
                The following is stored on blockchain:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Token ownership records
                </li>
                <li className="list-disc">
                  Transaction history
                </li>
                <li className="list-disc">
                  Compliance rule parameters
                </li>
                <li className="list-disc">
                  Distribution events
                </li>
                <li className="list-disc">
                  Links to off-chain documents
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.2 Off-Chain Data
              </h3>
              <p>
                The following is stored off-chain:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Investor PII (via Persona)
                </li>
                <li className="list-disc">
                  SEC filings and reports
                </li>
                <li className="list-disc">
                  Audit documentation
                </li>
                <li className="list-disc">
                  Communications records
                </li>
                <li className="list-disc">
                  Detailed cap table data
                </li>
                <li className="list-disc">
                  Other Token Metadata
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              9. Risk Disclosures
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                9.1 Technology Risks
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Smart contract bugs may exist despite auditing
                </li>
                <li className="list-disc">
                  Blockchain networks may experience downtime
                </li>
                <li className="list-disc">
                  Integration partners may experience outages
                </li>
                <li className="list-disc">
                  Upgrades may introduce new issues
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                9.2 Regulatory Risks
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Securities laws may change
                </li>
                <li className="list-disc">
                  Enforcement priorities may shift
                </li>
                <li className="list-disc">
                  New regulations may require system changes
                </li>
                <li className="list-disc">
                  Cross-border rules may conflict
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                9.3 Market Risks
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Token values may fluctuate
                </li>
                <li className="list-disc">
                  Liquidity is not guaranteed
                </li>
                <li className="list-disc">
                  Secondary markets may not develop
                </li>
                <li className="list-disc">
                  Investor demand may be limited
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              10. Liability and Indemnification
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                10.1 Enhanced Indemnity
              </h3>
              <p>
                In addition to the Main Services Agreement, you indemnify us for:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Securities law violations
                </li>
                <li className="list-disc">
                  Inaccurate offering documents
                </li>
                <li className="list-disc">
                  Investor claims or lawsuits
                </li>
                <li className="list-disc">
                  Regulatory investigations or fines
                </li>
                <li className="list-disc">
                  Failed offerings or funds
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                10.2 Disclaimer
              </h3>
              <p>
                We are a technology provider only and do not:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Provide investment advice
                </li>
                <li className="list-disc">
                  Guarantee regulatory compliance
                </li>
                <li className="list-disc">
                  Ensure offering success
                </li>
                <li className="list-disc">
                  Control token values
                </li>
                <li className="list-disc">
                  Act as broker-dealer or advisor
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              11. Termination and Transition
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                11.1 Transition Services
              </h3>
              <p>
                Upon termination, we&apos;ll provide:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  60-day transition period
                </li>
                <li className="list-disc">
                  Data export assistance
                </li>
                <li className="list-disc">
                  Smart contract ownership transfer
                </li>
                <li className="list-disc">
                  Third-party relationship transition
                </li>
                <li className="list-disc">
                  Documentation handover
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                11.2 Continuing Obligations
              </h3>
              <p>
                Post-termination:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Deployed tokens remain functional
                </li>
                <li className="list-disc">
                  Compliance rules continue to operate
                </li>
                <li className="list-disc">
                  Historical data retained per regulations
                </li>
                <li className="list-disc">
                  Audit trail maintained
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              12. Specific Prohibitions
            </h2>
            <p>
              You may not:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Launch multiple Reg A offerings within 12 months
              </li>
              <li className="list-disc">
                Accept non-accredited investors for Reg D
              </li>
              <li className="list-disc">
                Make untrue statements about offerings
              </li>
              <li className="list-disc">
                Circumvent compliance rules
              </li>
              <li className="list-disc">
                Use platform for unregistered securities
              </li>
              <li className="list-disc">
                Integrate unauthorized services
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              13. Governing Law
            </h2>
            <p>
              This Addendum is governed by Delaware law and incorporates all terms of the Main Services Agreement. In case of conflict, this Addendum controls for securities-specific matters.
            </p>
          </section>

          <section className="space-y-5 border-t border-border pt-8 mt-8">
            <h2 className="text-[24px] font-bold leading-tight text-ink md:text-[30px]">
              Contact
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Securities Compliance:</strong> <Link className="text-blue-500 hover:underline" href="mailto:compliance@nomyx.io">compliance@nomyx.io</Link>
              </li>
              <li className="list-disc">
                <strong>Technical Support:</strong> <Link className="text-blue-500 hover:underline" href="mailto:support@nomyx.io">support@nomyx.io</Link>
              </li>
              <li className="list-disc">
                <strong>Legal Questions:</strong> <Link className="text-blue-500 hover:underline" href="mailto:legal@nomyx.io">legal@nomyx.io</Link>
              </li>
              <li className="list-disc">
                <strong>Emergency:</strong> <Link className="text-blue-500 hover:underline" href="mailto:security@nomyx.io">security@nomyx.io</Link>
              </li>
            </ul>
          </section>

          <section className="space-y-5 border-t border-border pt-8">
            <p className="italic text-ink-muted">
              This Addendum is part of the Nomyx Main Services Agreement for securities tokenization customers.
            </p>
            <p className="italic text-ink-muted">
              Version: 1.0 | Effective: July 1, 2025 | Latest: <a href="https://www.nomyx.io/legal-documents" className="text-blue-500 hover:underline">www.nomyx.io/legal-documents</a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
