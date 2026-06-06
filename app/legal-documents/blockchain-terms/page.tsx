import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blockchain Service-Specific Terms | Nomyx Legal Documents",
  description: "Blockchain Service-Specific Terms",
  alternates: {
    canonical: "https://www.nomyx.io/legal-documents/blockchain-terms",
  },
};

export default function BlockchainTermsPage() {
  return (
    <article className="mx-auto max-w-230">
      <header className="mb-8">
        <h1 className="mb-2 text-[32px] font-bold leading-tight text-ink md:text-[40px] md:leading-tight">
          Blockchain Service-Specific Terms
        </h1>
        <p className="text-[14px] leading-6 text-ink-muted">
          Last Updated: July 1, 2025
        </p>
      </header>

      <div className="border-t border-border pt-9">
        <div className="space-y-8 text-[14px] font-normal leading-7 text-ink md:text-[16px] md:leading-7">
          
          <div className="rounded-lg border border-[#BFDBFE] bg-[#F0F7FF] p-5">
            <h3 className="mb-3 font-bold text-ink">
              Quick Reference
            </h3>
            <p className="mb-3">
              These terms supplement our Main Services Agreement with blockchain and securities-specific provisions. Key points:
            </p>
            <ul className="space-y-2 pl-5">
              <li className="list-disc">You control and are responsible for your smart contracts and tokenized securities</li>
              <li className="list-disc">Blockchain transactions are permanent and irreversible</li>
              <li className="list-disc">Gas fees and network costs are your responsibility</li>
              <li className="list-disc">We don&apos;t custody private keys, crypto assets, or securities</li>
              <li className="list-disc">Specific requirements for SEC-registered token offerings</li>
              <li className="list-disc">Integration with approved third-party services required</li>
            </ul>
          </div>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              1. Smart Contract Deployment Service
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                1.1 Pre-Deployment Requirements
              </h3>
              <p>
                Before deploying any smart contract through our platform:
              </p>
              
              <p>
                <strong>Standard Requirements:</strong>
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Security audit required for mainnet deployments over $10,000 value</li>
                <li className="list-disc">Gas optimization must achieve &quot;Acceptable&quot; rating in our analyzer</li>
                <li className="list-disc">Documentation including function descriptions and risk disclosures</li>
                <li className="list-disc">Testing on testnet with minimum 95% test code coverage on smart contracts</li>
              </ul>

              <p className="pt-2">
                <strong>Securities-Specific Requirements:</strong>
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Security audit of the master codebase used to deploy for ALL tokenized securities deployments</li>
                <li className="list-disc">Legal opinion on token classification (to be provided through Jones Day or a legal council of the client&apos;s choosing, to be approved by Nomyx)</li>
                <li className="list-disc">SEC filing documentation (Form D, Reg A/A+ qualification, or Reg S certification) or equivalent e.g. AIFM(EU) or VARA (GCC)</li>
                <li className="list-disc">GAAP audit reports (for Reg A offerings)</li>
                <li className="list-disc">Transfer agent agreement (if applicable as regulation requires)</li>
                <li className="list-disc">Investor communication protocols</li>
                <li className="list-disc">Compliance rule implementation verification</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                1.2 Our Responsibilities
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Provide deployment tools and templates</li>
                <li className="list-disc">Estimate gas costs (not guaranteed)</li>
                <li className="list-disc">Verify contract compilation</li>
                <li className="list-disc">Submit transactions to network</li>
                <li className="list-disc">Provide Diamond Proxy (ERC-2535) upgrade mechanisms</li>
                <li className="list-disc">Integrate compliance rule libraries via NomyxID &amp; Persona</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                1.3 Your Responsibilities
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Ensure workflows provided by deployed contracts are correct (correct data flows are your responsibilities alongside approval of our deployed codebase)</li>
                <li className="list-disc">Fund gas fees post deployment for any investor or admin transaction costs</li>
                <li className="list-disc">Comply with all applicable laws</li>
                <li className="list-disc">Monitor and maintain transactions on deployed contracts</li>
                <li className="list-disc">Implement required compliance rules</li>
                <li className="list-disc">Maintain current SEC filings</li>
                <li className="list-disc">Update fund valuations as required</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                1.4 Deployment Limitations
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Maximum contract size per facet: 24KB (Ethereum limit)</li>
                <li className="list-disc">Batch deployments: 1 diamond contract with multiple facets per transaction</li>
                <li className="list-disc">High-value deployments require additional verification</li>
                <li className="list-disc">Securities tokens require compliance review</li>
                <li className="list-disc">Certain contract types prohibited (see Acceptable Use)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                1.5 Post-Deployment
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Contracts are immutable once deployed (except Diamond Proxy upgrades)</li>
                <li className="list-disc">We retain no control over your contracts</li>
                <li className="list-disc">Upgrade patterns must be implemented pre-deployment</li>
                <li className="list-disc">You&apos;re responsible for all contract outcomes</li>
                <li className="list-disc">Compliance monitoring remains your obligation including investor onboard/offboarding/flagged investors monitoring</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              2. Token Creation and Management
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.1 Token Standards Supported
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc"><strong>ERC-20:</strong> Fungible tokens (with permission controls)</li>
                <li className="list-disc"><strong>ERC-721:</strong> Non-fungible tokens (NFTs with permission controls)</li>
                <li className="list-disc"><strong>ERC-1155:</strong> Multi-token standard w/ permission controls</li>
                <li className="list-disc"><strong>Custom standards:</strong> With prior approval</li>
                <li className="list-disc"><strong>Diamond Proxy (ERC-2535):</strong> For upgradeable implementations</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.2 Compliance Requirements
              </h3>
              <p>
                You represent and warrant that:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Tokens don&apos;t constitute unregistered securities</li>
                <li className="list-disc">You&apos;ve obtained necessary legal opinions</li>
                <li className="list-disc">KYC/AML procedures are implemented</li>
                <li className="list-disc">Marketing complies with regulations</li>
                <li className="list-disc">All required SEC filings are current</li>
                <li className="list-disc">Transfer restrictions are properly implemented</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.3 Token Features
              </h3>
              <p>
                Available features (vary by plan):
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Minting controls and caps</li>
                <li className="list-disc">Pause/unpause functionality</li>
                <li className="list-disc">Burn mechanisms</li>
                <li className="list-disc">Access control (roles/permissions)</li>
                <li className="list-disc">Snapshot capabilities</li>
                <li className="list-disc">Compliance rule enforcement</li>
                <li className="list-disc">Transfer restrictions</li>
                <li className="list-disc">Investor whitelist management</li>
                <li className="list-disc">Automated distribution mechanisms</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.4 Restrictions
              </h3>
              <p>
                You may not create tokens for:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Unregistered securities offerings</li>
                <li className="list-disc">Ponzi or pyramid schemes</li>
                <li className="list-disc">Money laundering purposes</li>
                <li className="list-disc">Sanctions evasion</li>
                <li className="list-disc">Any illegal activities</li>
                <li className="list-disc">Non-compliant fund structures</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                2.5 Fund Tokenization Specific Requirements
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Dual token structure: ERC-721 for fund assets, ERC-20 for investor shares</li>
                <li className="list-disc">Mandatory compliance rule embedding at minting or project setup</li>
                <li className="list-disc">Integration with approved identity providers</li>
                <li className="list-disc">12-month lockup enforcement between Reg A offerings and other regulatory limitations</li>
                <li className="list-disc">Automated fee distribution</li>
                <li className="list-disc">NAV updates required annually with audit verification</li>
                <li className="list-disc">Investor cap management per SEC regulations</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              3. Blockchain Infrastructure Access
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                3.2 Supported Networks
              </h3>
              <p>
                Current networks (subject to expansion):
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Ethereum (Mainnet, Goerli, Sepolia)</li>
                <li className="list-disc">Polygon (Mainnet, Mumbai)</li>
                <li className="list-disc">Arbitrum One</li>
                <li className="list-disc">Optimism</li>
                <li className="list-disc">Base</li>
                <li className="list-disc">Binance Smart Chain</li>
                <li className="list-disc">Avalanche C-Chain</li>
                <li className="list-disc">Plume</li>
                <li className="list-disc">XDC</li>
                <li className="list-disc">Kadena EVM chain</li>
                <li className="list-disc">Trusted Smart Chain (TSC)</li>
              </ul>
              <p className="italic text-ink-muted">
                Note: Native USDC support required for securities transactions
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                3.3 Network Limitations
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">We don&apos;t control network performance</li>
                <li className="list-disc">Congestion may delay transactions</li>
                <li className="list-disc">Fork handling per network consensus</li>
                <li className="list-disc">No guarantee of transaction inclusion</li>
                <li className="list-disc">TSC-specific features may not be portable</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              4. Gas Management Service
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.1 Gas Estimation
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Estimates provided for guidance only</li>
                <li className="list-disc">Actual costs may vary significantly</li>
                <li className="list-disc">Network conditions affect pricing</li>
                <li className="list-disc">You&apos;re responsible for sufficient funding</li>
                <li className="list-disc">Securities transactions may require higher gas limits</li>
              </ul>
              <p>
                Gas costs are only facilitated by Nomyx on Nomyx Deployed and Audited contracts for L2s; users are responsible for all gas fees on Ethereum.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.2 Gas Payment Options
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc"><strong>Direct Payment:</strong> You provide ETH/native tokens</li>
                <li className="list-disc"><strong>Gas Tank:</strong> Pre-fund account for automatic payment</li>
                <li className="list-disc"><strong>Meta-transactions:</strong> Available on supported networks</li>
                <li className="list-disc"><strong>Sponsored Transactions:</strong> For qualified securities offerings</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                4.3 Gas Policies
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Unused gas refunded to your wallet</li>
                <li className="list-disc">Failed transactions still incur gas costs</li>
                <li className="list-disc">Price spikes not our responsibility</li>
                <li className="list-disc">Emergency gas loans not available</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              5. Blockchain Data and Analytics
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                5.1 Data Services Provided
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Real-time transaction monitoring</li>
                <li className="list-disc">Historical blockchain data access</li>
                <li className="list-disc">Event log indexing and search</li>
                <li className="list-disc">Custom data webhooks</li>
                <li className="list-disc">Analytics dashboards (GF2.0)</li>
                <li className="list-disc">Compliance reporting tools</li>
                <li className="list-disc">Investor activity tracking (GF2.0)</li>
                <li className="list-disc">Fund performance metrics (GF2.0)</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                5.2 Data Accuracy
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">We index public blockchain data</li>
                <li className="list-disc">Reorganizations may affect data</li>
                <li className="list-disc">Finality varies by network</li>
                <li className="list-disc">You should implement confirmations</li>
                <li className="list-disc">Securities data requires additional verification</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                5.3 Data Retention
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc"><strong>Real-time data:</strong> 24 hours</li>
                <li className="list-disc"><strong>Indexed data:</strong> 2 years</li>
                <li className="list-disc"><strong>Archived data:</strong> By request</li>
                <li className="list-disc"><strong>Custom retention:</strong> Available</li>
                <li className="list-disc"><strong>Securities compliance data:</strong> 7 years minimum</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              6. IPFS and Decentralized Storage
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.2 Storage Limits
              </h3>
              <p>
                7MB per file limit with an upper cap of 10GB for all metadata per org on the enterprise plan.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                6.3 Content Policies
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">No illegal content</li>
                <li className="list-disc">No malware or exploits</li>
                <li className="list-disc">Copyright compliance required</li>
                <li className="list-disc">Adult content restricted</li>
                <li className="list-disc">Securities documents must be encrypted</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              7. Risk Acknowledgments
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.1 Blockchain Risks
              </h3>
              <p>
                You understand and accept:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc"><strong>Permanence:</strong> Blockchain transactions cannot be reversed</li>
                <li className="list-disc"><strong>Public visibility:</strong> All on-chain data is public on public blockchains; private blockchain deployments available on request</li>
                <li className="list-disc"><strong>Network dependency:</strong> We don&apos;t control blockchain networks</li>
                <li className="list-disc"><strong>Economic risks:</strong> Token values may fluctuate dramatically</li>
                <li className="list-disc"><strong>Technical risks:</strong> Smart contracts may have zero-day bugs</li>
                <li className="list-disc"><strong>Regulatory risks:</strong> Laws may change rapidly</li>
                <li className="list-disc"><strong>Integration risks:</strong> Third-party services may fail</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.2 No Custody or Control
              </h3>
              <p>
                We explicitly:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Don&apos;t hold private keys</li>
                <li className="list-disc">Can&apos;t recover lost keys</li>
                <li className="list-disc">Don&apos;t control your assets</li>
                <li className="list-disc">Can&apos;t reverse transactions</li>
                <li className="list-disc">Won&apos;t act as custodian</li>
                <li className="list-disc">Don&apos;t manage investor funds</li>
                <li className="list-disc">Can&apos;t guarantee exchange listings</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                7.3 Forks and Network Changes
              </h3>
              <p>
                In case of network forks:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">We&apos;ll follow majority consensus</li>
                <li className="list-disc">No obligation to support minority chains</li>
                <li className="list-disc">You may lose access to forked assets</li>
                <li className="list-disc">Service interruption possible</li>
                <li className="list-disc">Securities may require re-registration</li>
              </ul>
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-[22px] font-bold leading-tight text-ink md:text-[24px]">
              8. Compliance Tools
            </h2>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                8.1 Available Tools
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">Transaction screening</li>
                <li className="list-disc">KYT/AML at Wallet level (through DFNS)</li>
                <li className="list-disc">Sanctions list checking</li>
                <li className="list-disc">Travel rule compliance</li>
                <li className="list-disc">Regulatory reporting templates</li>
                <li className="list-disc">Investor verification (Persona integration)</li>
                <li className="list-disc">Accreditation checking (Persona)</li>
                <li className="list-disc">Transfer restriction enforcement</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-[17px] font-bold leading-tight text-ink md:text-[18px]">
                8.2 Tool Limitations
              </h3>
              <ul className="space-y-3 pl-5">
                <li className="list-disc">You remain responsible for compliance</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </article>
  );
}
