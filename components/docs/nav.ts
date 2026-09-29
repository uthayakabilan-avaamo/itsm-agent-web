export type DocsNavItem = {
  id: string;
  label: string;
};

export type DocsNavSection = {
  id: string;
  label: string;
  items: DocsNavItem[];
};

export const DOCS_NAV: DocsNavSection[] = [
  {
    id: "troubleshooting-library",
    label: "1. Troubleshooting Library",
    items: [
      { id: "tl-endpoint-os", label: "Endpoint & OS" },
      { id: "tl-identity-access", label: "Identity & Access" },
      { id: "tl-networking-vpn", label: "Networking & VPN" },
      { id: "tl-collaboration", label: "Collaboration" },
      { id: "tl-developer-design-tools", label: "Developer & Design Tools" },
      { id: "tl-hardware", label: "Hardware" },
    ],
  },
  {
    id: "sec-1",
    label: "2. Governance & Principles",
    items: [
      { id: "sec-1-1", label: "2.1 Introduction to the ITSM Framework" },
      { id: "sec-1-2", label: "2.2 Governance Principles for Automated Agents" },
    ],
  },
  {
    id: "sec-2",
    label: "3. Ticket Classification & Lifecycle",
    items: [
      { id: "sec-2-1", label: "3.1 Incidents vs. Service Requests" },
      { id: "sec-2-2", label: "3.2 Ticket Status Schema" },
    ],
  },
  {
    id: "sec-3",
    label: "4. Operational Flows & Decision Rules",
    items: [
      { id: "sec-3-1", label: "4.1 Status Check Workflow" },
      { id: "sec-3-2", label: "4.2 Add Comment Workflow" },
      { id: "sec-3-3", label: "4.3 Ticket Resolution Workflow" },
      { id: "sec-3-4", label: "4.4 Service Request Cancellation" },
      { id: "sec-3-5", label: "4.5 Incident Reopening Workflow" },
    ],
  },
  {
    id: "sec-4",
    label: "5. Knowledge Base Articles",
    items: [
      { id: "sec-4-1", label: "Article 1: macOS Email Client Crashes" },
      { id: "sec-4-2", label: "Article 2: Enterprise VPN Dropping" },
      { id: "sec-4-3", label: "Article 3: Software License Provisioning" },
      { id: "sec-4-4", label: "Article 4: Hardware Replacement & Return" },
    ],
  },
  {
    id: "sec-5",
    label: "6. Security & Compliance",
    items: [
      { id: "sec-5-1", label: "6.1 Data Protection and Handling" },
      { id: "sec-5-2", label: "6.2 Critical System Outages (P1/P2)" },
      { id: "sec-5-3", label: "6.3 Reporting Security Incidents" },
    ],
  },
];
