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
    id: "sec-1",
    label: "1. Governance & Principles",
    items: [
      { id: "sec-1-1", label: "1.1 Introduction to the ITSM Framework" },
      { id: "sec-1-2", label: "1.2 Governance Principles for Automated Agents" },
    ],
  },
  {
    id: "sec-2",
    label: "2. Ticket Classification & Lifecycle",
    items: [
      { id: "sec-2-1", label: "2.1 Incidents vs. Service Requests" },
      { id: "sec-2-2", label: "2.2 Ticket Status Schema" },
    ],
  },
  {
    id: "sec-3",
    label: "3. Operational Flows & Decision Rules",
    items: [
      { id: "sec-3-1", label: "3.1 Status Check Workflow" },
      { id: "sec-3-2", label: "3.2 Add Comment Workflow" },
      { id: "sec-3-3", label: "3.3 Ticket Resolution Workflow" },
      { id: "sec-3-4", label: "3.4 Service Request Cancellation" },
      { id: "sec-3-5", label: "3.5 Incident Reopening Workflow" },
    ],
  },
  {
    id: "sec-4",
    label: "4. Knowledge Base Articles",
    items: [
      { id: "sec-4-1", label: "Article 1: macOS Email Client Crashes" },
      { id: "sec-4-2", label: "Article 2: Enterprise VPN Dropping" },
      { id: "sec-4-3", label: "Article 3: Software License Provisioning" },
      { id: "sec-4-4", label: "Article 4: Hardware Replacement & Return" },
    ],
  },
  {
    id: "sec-5",
    label: "5. Security & Compliance",
    items: [
      { id: "sec-5-1", label: "5.1 Data Protection and Handling" },
      { id: "sec-5-2", label: "5.2 Critical System Outages (P1/P2)" },
      { id: "sec-5-3", label: "5.3 Reporting Security Incidents" },
    ],
  },
];
