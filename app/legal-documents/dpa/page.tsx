import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getLegalDocument } from "../legalDocuments";

const document = getLegalDocument("dpa");

export const metadata: Metadata = {
  title: "Data Processing Agreement | Nomyx Legal Documents",
  description: document?.description,
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/dpa",
  },
};

export default function DataProcessingAgreementPage() {
  if (!document) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="max-w-3xl text-[34px] font-bold leading-[1.12] text-ink md:text-[46px]">
          Data Processing Agreement
        </h1>
        <p className="mt-3 text-base font-medium text-ink-muted">
          Last Updated: July 1, 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          <p className="text-ink">
            <span className="font-bold">Effective Date: </span>Upon execution of Main Services Agreement
          </p>

          <p className="text-ink">
            <span className="font-bold">Parties: </span>Nomyx Technology Labs Inc. (&quot;Processor&quot;) and Customer (&quot;Controller&quot;)
          </p>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              1. Scope and Roles
            </h2>

            <p>
              This DPA governs how we handle personal data in our blockchain infrastructure and securities tokenization services:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>You (Controller):</strong> Determine what data to process and why
              </li>
              <li className="list-disc">
                <strong>We (Processor):</strong> Process data on your behalf per your instructions
              </li>
              <li className="list-disc">
                <strong>Automatic application:</strong> This DPA applies automatically to all customers
              </li>
              <li className="list-disc">
                <strong>Securities-specific:</strong> Enhanced requirements for tokenized securities data
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              2. Our Processing Commitments
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.1 We Will:
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Process data only per your instructions
                </li>
                <li className="list-disc">
                  Maintain confidentiality (all staff under NDAs)
                </li>
                <li className="list-disc">
                  Implement appropriate security measures
                </li>
                <li className="list-disc">
                  Assist with data subject requests
                </li>
                <li className="list-disc">
                  Delete data per our deletion policy barring any blockchain transaction records or data stored in accordance with compliance requirements
                </li>
                <li className="list-disc">
                  Maintain processing records
                </li>
                <li className="list-disc">
                  Coordinate with approved sub-processors
                </li>
                <li className="list-disc">
                  Ensure securities compliance data integrity
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.2 We Won&apos;t:
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Use your data for our own purposes
                </li>
                <li className="list-disc">
                  Transfer data without legal basis
                </li>
                <li className="list-disc">
                  Process data after termination (except legal requirements)
                </li>
                <li className="list-disc">
                  Modify data without instruction
                </li>
                <li className="list-disc">
                  Share investor data outside approved channels
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              3. Security Measures
            </h2>

            <p>
              We implement industry-standard protections:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Access controls:</strong> Role-based, MFA required
              </li>
              <li className="list-disc">
                <strong>Monitoring:</strong> 24/7 security operations
              </li>
              <li className="list-disc">
                <strong>Incident response:</strong> 48-hour breach notification
              </li>
              <li className="list-disc">
                <strong>Securities-specific:</strong> Enhanced controls for investor data
              </li>
              <li className="list-disc">
                <strong>Third-party security:</strong> Verified sub-processor compliance
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              4. Sub-processors
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.1 Authorized Sub-processors
              </h3>
              <p>
                Current list at www.nomyx.io/legal/documents
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.2 Changes
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  30-day advance notice for new processors
                </li>
                <li className="list-disc">
                  Right to object within 14 days
                </li>
                <li className="list-disc">
                  Alternative arrangements where possible
                </li>
                <li className="list-disc">
                  Securities processors require additional vetting
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              5. International Transfers
            </h2>

            <p>
              We transfer data internationally using:
            </p>

            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>EU/UK &rarr; US:</strong> Standard Contractual Clauses
              </li>
              <li className="list-disc">
                <strong>Other regions:</strong> Appropriate safeguards per local law
              </li>
              <li className="list-disc">
                <strong>Blockchain exception:</strong> On-chain data is globally distributed
              </li>
              <li className="list-disc">
                <strong>Securities data:</strong> Additional controls for investor information
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              6. Your Rights and Obligations
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.1 You Must:
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Have legal basis for processing
                </li>
                <li className="list-disc">
                  Provide lawful instructions
                </li>
                <li className="list-disc">
                  Handle data subject requests
                </li>
                <li className="list-disc">
                  Ensure accuracy of data
                </li>
                <li className="list-disc">
                  Comply with securities regulations
                </li>
                <li className="list-disc">
                  Maintain investor consents
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.2 You Can:
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Audit our compliance (annually)
                </li>
                <li className="list-disc">
                  Export your data anytime
                </li>
                <li className="list-disc">
                  Object to sub-processors
                </li>
                <li className="list-disc">
                  Request deletion (off-chain only)
                </li>
                <li className="list-disc">
                  Review sub-processor security
                </li>
                <li className="list-disc">
                  Access compliance reports
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              7. Blockchain-Specific Provisions
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.1 Immutability Acknowledgment
              </h3>
              <p>
                <strong>On-chain personal data cannot be deleted.</strong> You acknowledge:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Blockchain transactions are permanent
                </li>
                <li className="list-disc">
                  We cannot comply with erasure requests for on-chain data
                </li>
                <li className="list-disc">
                  You must design privacy into your implementation
                </li>
                <li className="list-disc">
                  Securities transactions create permanent records
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.2 Recommended Practices:
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Store only hashes on-chain
                </li>
                <li className="list-disc">
                  Keep personal data off-chain (via Persona integration)
                </li>
                <li className="list-disc">
                  Implement proxy patterns for upgradability
                </li>
                <li className="list-disc">
                  Separate PII storage from blockchain transactions
                </li>
                <li className="list-disc">
                  Maintain audit trail in secure off-chain database
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.3 Securities-Specific Data Handling
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>Investor accreditation documentation:</strong> Stored off-chain with Persona
                </li>
                <li className="list-disc">
                  <strong>SEC filings:</strong> Public links on-chain, documents off-chain
                </li>
                <li className="list-disc">
                  <strong>Trading restrictions:</strong> Embedded in smart contracts
                </li>
                <li className="list-disc">
                  <strong>Audit reports:</strong> Stored off-chain with controlled access
                </li>
                <li className="list-disc">
                  <strong>KYC/KYB data:</strong> Managed with appropriate retention
                </li>
                <li className="list-disc">
                  <strong>Transaction history:</strong> Permanent on-chain record
                </li>
                <li className="list-disc">
                  <strong>Communications:</strong> Stored off-chain per regulations
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              8. Data Subject Requests
            </h2>
            <p>
              We assist with data subject requests in accordance with applicable law and the limitations of blockchain technology.
            </p>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              10. Audit Rights
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                10.1 Self-Service
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Security documentation in dashboard
                </li>
                <li className="list-disc">
                  Compliance certificates on request
                </li>
                <li className="list-disc">
                  Sub-processor audit reports (summary)
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                10.2 On-Site Audits
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Once annually with 30 days notice
                </li>
                <li className="list-disc">
                  Reasonable costs reimbursed
                </li>
                <li className="list-disc">
                  NDA required
                </li>
                <li className="list-disc">
                  Business hours only
                </li>
                <li className="list-disc">
                  Securities compliance focus permitted
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              11. Liability
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                11.1 Our Liability
              </h3>
              <p>
                Subject to MSA limitations except:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Direct damages from our data protection breach
                </li>
                <li className="list-disc">
                  Regulatory fines from our non-compliance
                </li>
                <li className="list-disc">
                  Maximum: $1000.00
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                11.2 Indemnification
              </h3>
              <p>
                You indemnify us for:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Your unlawful instructions
                </li>
                <li className="list-disc">
                  On-chain personal data issues
                </li>
                <li className="list-disc">
                  Your security failures
                </li>
                <li className="list-disc">
                  Securities law violations
                </li>
                <li className="list-disc">
                  Investor data misuse
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              12. Term and Termination
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Duration:</strong> Same as Main Services Agreement
              </li>
              <li className="list-disc">
                <strong>Survival:</strong> Obligations survive for retained data
              </li>
              <li className="list-disc">
                <strong>Post-termination:</strong> 30-day export window
              </li>
              <li className="list-disc">
                <strong>Securities data:</strong> Retained per regulatory requirements
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              13. Region-Specific Terms
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                13.1 European Union (GDPR)
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Article 28 compliance
                </li>
                <li className="list-disc">
                  EU Standard Contractual Clauses apply
                </li>
                <li className="list-disc">
                  DPO contact: privacy@nomyx.io
                </li>
                <li className="list-disc">
                  Special categories data processing
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                13.2 California (CCPA)
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Service provider obligations apply
                </li>
                <li className="list-disc">
                  No sale of personal information
                </li>
                <li className="list-disc">
                  Consumer rights support provided
                </li>
                <li className="list-disc">
                  Financial data exemptions
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                13.3 Other Regions
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  <strong>UK:</strong> UK SCCs and adequacy
                </li>
                <li className="list-disc">
                  <strong>Switzerland:</strong> Swiss requirements
                </li>
                <li className="list-disc">
                  <strong>Brazil:</strong> LGPD compliance
                </li>
                <li className="list-disc">
                  <strong>Singapore:</strong> PDPA compliance
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                13.4 US Securities Regulations
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  SEC Rule 17a-4 compliance
                </li>
                <li className="list-disc">
                  FINRA recordkeeping requirements
                </li>
                <li className="list-disc">
                  State blue sky law compliance
                </li>
                <li className="list-disc">
                  Transfer agent regulations
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              14. Definitions
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Personal Data:</strong> Information relating to identified/identifiable individuals
              </li>
              <li className="list-disc">
                <strong>Processing:</strong> Any operation on personal data
              </li>
              <li className="list-disc">
                <strong>Blockchain Data:</strong> Data written to distributed ledger
              </li>
              <li className="list-disc">
                <strong>Off-chain Data:</strong> Data in our traditional databases
              </li>
              <li className="list-disc">
                <strong>Securities Data:</strong> Information related to tokenized securities offerings
              </li>
              <li className="list-disc">
                <strong>Investor Data:</strong> KYC/KYB and accreditation information
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              15. Contact Information
            </h2>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                <strong>Privacy Officer:</strong> privacy@nomyx.io
              </li>
              <li className="list-disc">
                <strong>Security Team:</strong> security@nomyx.io
              </li>
              <li className="list-disc">
                <strong>Legal/Compliance:</strong> legal@nomyx.io
              </li>
              <li className="list-disc">
                <strong>Support:</strong> support@nomyx.io
              </li>
            </ul>
          </section>

          <section className="space-y-5 border-t border-border pt-8">
            <h2 className="text-[24px] font-bold leading-tight text-ink md:text-[30px]">
              Schedule 1: Processing Details
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Nature and Purpose
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Providing blockchain infrastructure services
                </li>
                <li className="list-disc">
                  Smart contract deployment and management
                </li>
                <li className="list-disc">
                  Transaction processing and monitoring
                </li>
                <li className="list-disc">
                  Analytics and reporting
                </li>
                <li className="list-disc">
                  Securities tokenization services
                </li>
                <li className="list-disc">
                  Investor onboarding and compliance
                </li>
                <li className="list-disc">
                  Fund administration support
                </li>
                <li className="list-disc">
                  Regulatory reporting assistance
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Categories of Data Subjects
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Your employees (users)
                </li>
                <li className="list-disc">
                  Your customers (end users)
                </li>
                <li className="list-disc">
                  Transaction counterparties
                </li>
                <li className="list-disc">
                  Smart contract interactors
                </li>
                <li className="list-disc">
                  Accredited investors
                </li>
                <li className="list-disc">
                  Fund managers
                </li>
                <li className="list-disc">
                  Compliance officers
                </li>
                <li className="list-disc">
                  Auditors and service providers
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Types of Personal Data
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Account information (name, email)
                </li>
                <li className="list-disc">
                  Wallet addresses (pseudonymous)
                </li>
                <li className="list-disc">
                  Transaction history
                </li>
                <li className="list-disc">
                  IP addresses and usage logs
                </li>
                <li className="list-disc">
                  Government IDs (via Persona)
                </li>
                <li className="list-disc">
                  Accreditation documentation
                </li>
                <li className="list-disc">
                  Banking information (via Bridge.xyz)
                </li>
                <li className="list-disc">
                  Investment history
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Retention Periods
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  See Service Data Deletion Policy at www.nomyx.io/legal/documents
                </li>
                <li className="list-disc">
                  <strong>On-chain:</strong> Permanent
                </li>
                <li className="list-disc">
                  <strong>Off-chain:</strong> Per service type
                </li>
                <li className="list-disc">
                  <strong>Securities compliance data:</strong> 7 years minimum
                </li>
                <li className="list-disc">
                  <strong>KYC/KYB data:</strong> 5 years post-relationship
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              Schedule 2: Technical and Organizational Measures
            </h2>
            <p>
              See Security Measures Summary at www.nomyx.io/legal/documents for detailed security measures including:
            </p>
            <ul className="space-y-3 pl-5">
              <li className="list-disc">
                Encryption standards
              </li>
              <li className="list-disc">
                Access controls
              </li>
              <li className="list-disc">
                Network security
              </li>
              <li className="list-disc">
                Physical security
              </li>
              <li className="list-disc">
                Incident response
              </li>
              <li className="list-disc">
                Business continuity
              </li>
              <li className="list-disc">
                Securities-specific controls
              </li>
              <li className="list-disc">
                Third-party integration security
              </li>
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              Schedule 3: Securities Data Processing
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Specific Requirements
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">
                  Investor identity verification via approved providers only
                </li>
                <li className="list-disc">
                  Segregation of investor data by fund
                </li>
                <li className="list-disc">
                  Enhanced access controls for financial data
                </li>
                <li className="list-disc">
                  Audit trail for all data access
                </li>
                <li className="list-disc">
                  Compliance with SEC cybersecurity rules
                </li>
                <li className="list-disc">
                  Coordination with transfer agents
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                Data Flows
              </h3>
              <ol className="space-y-3 pl-5 list-decimal">
                <li className="pl-1">
                  Investor &rarr; Bridge.xyz &rarr; Bank verification
                </li>
                <li className="pl-1">
                  Nomyx &rarr; 1Transfer &rarr; Cap table management
                </li>
              </ol>
            </div>
          </section>

          <section className="space-y-5 border-t border-border pt-8">
            <p className="italic text-ink-muted">
              This DPA supplements and is incorporated into the Main Services Agreement. No separate signature required.
            </p>
            <p className="italic text-ink-muted">
              Version: 2.0 | Effective: July 1, 2025 | Latest: <a href="https://www.nomyx.io/legal/documents" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">www.nomyx.io/legal/documents</a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
