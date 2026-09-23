import type { ReactNode } from "react";

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-2xl font-semibold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="scroll-mt-24 text-lg font-semibold tracking-tight text-foreground"
    >
      {children}
    </h3>
  );
}

function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className="text-[15px] font-semibold text-foreground">{children}</h4>
  );
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-[15px] leading-relaxed text-muted">{children}</p>;
}

function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted marker:text-primary-400">
      {children}
    </ul>
  );
}

function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-muted marker:text-primary-400 marker:font-semibold">
      {children}
    </ol>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-white p-5 shadow-sm">
      {children}
    </div>
  );
}

function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 space-y-8 py-14">
      {children}
    </section>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}

const STATUSES = [
  {
    name: "SUBMITTED",
    description:
      "The ticket or request is logged into the system but not yet assigned or picked up by an active queue technician.",
    next: "IN_PROGRESS, CANCELLED",
    autoCancel: "YES (Service Requests only)",
    autoReopen: "NO",
  },
  {
    name: "IN_PROGRESS",
    description:
      "An IT specialist or automated workflow is actively investigating or implementing the work item.",
    next: "RESOLVED, FULFILLED, CANCELLED",
    autoCancel: "NO",
    autoReopen: "NO",
  },
  {
    name: "RESOLVED",
    description:
      "A resolution or workaround has been applied to an Incident, and the system is awaiting user verification.",
    next: "CLOSED, IN_PROGRESS (via Reopen)",
    autoCancel: "NO",
    autoReopen: "YES (Incidents only)",
  },
  {
    name: "FULFILLED",
    description:
      "The requested asset, access, or provisioning item for a Service Request has been completed.",
    next: "CLOSED",
    autoCancel: "NO",
    autoReopen: "NO",
  },
  {
    name: "CANCELLED",
    description:
      "The request was aborted by the user prior to fulfillment, or terminated by an administrator.",
    next: "None (Terminal State)",
    autoCancel: "NO",
    autoReopen: "NO",
  },
  {
    name: "CLOSED",
    description:
      "The final administrative state after the resolution verification window expires.",
    next: "None (Terminal State)",
    autoCancel: "NO",
    autoReopen: "NO",
  },
];

const ARTICLES = [
  {
    id: "sec-4-1",
    title: "Article 1: macOS Email Client Crashing and Launch Failures",
    category: "Endpoint Applications / macOS",
    appliesTo: "Microsoft Outlook for Mac, Apple Mail on macOS Sonoma and Sequoia",
    symptom:
      "Email application terminates unexpectedly immediately upon launch or during profile synchronization.",
    rootCause:
      "Corrupted local database index cache files or damaged key-value preference stores under the user container.",
    steps: [
      "Force terminate all running instances of the application using Activity Monitor or terminal commands.",
      "Navigate to the local cache storage location under the user's Library Containers folder.",
      "Backup and remove local cache folders for the email client.",
      "Relaunch the application while holding the Option key to trigger the Database Utility, then select Rebuild Database.",
      "If crashes continue, clear Keychain entries associated with enterprise authentication auto-discovery and re-authenticate.",
    ],
  },
  {
    id: "sec-4-2",
    title: "Article 2: Enterprise VPN Tunneling and Authentication Dropping",
    category: "Infrastructure and Networking / Remote Access",
    appliesTo: "GlobalProtect, Cisco Secure Client, WireGuard Enterprise",
    symptom:
      "VPN connection disconnects every 5 to 10 minutes, accompanied by handshake timeout or MFA token expiration error logs.",
    rootCause:
      "Local DNS cache corruption, IP route overlap with home local subnet, or clock skew exceeding 30 seconds on the host workstation.",
    steps: [
      "Verify host system clock time against the Network Time Protocol (NTP) standard to ensure synchronization.",
      "Flush the local DNS resolver cache using standard operating system utilities.",
      "Inspect local routing tables for overlapping subnets within enterprise network ranges.",
      "Reset local virtual network adapters and reconnect through the primary authentication gateway.",
    ],
  },
];

export default function DocsContent() {
  return (
    <div>
      {/* SECTION 1 */}
      <Section id="sec-1">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Section 1
          </span>
          <H2 id="sec-1-heading">
            ITSM Governance, Frameworks, and Operational Principles
          </H2>
        </div>

        <Sub>
          <H3 id="sec-1-1">1.1 Introduction to the ITSM Framework</H3>
          <P>
            This document serves as the official Knowledge Base and Standard
            Operating Procedure (SOP) manual for the Enterprise IT Service
            Desk. All automated service agents, tier-1 support staff, and
            system administrators must strictly operate within the
            parameters defined here.
          </P>
          <P>
            The primary objective of the IT Service Desk is to provide a
            unified, efficient, and transparent point of contact for
            end-users seeking assistance with enterprise technology
            services. The operations are aligned with ITIL v4 (Information
            Technology Infrastructure Library) best practices, categorizing
            user demands into distinct operational flows: Incidents,
            Service Requests, Problem Management, and Change Enablement.
          </P>
        </Sub>

        <Sub>
          <H3 id="sec-1-2">1.2 Governance Principles for Automated Agents</H3>
          <P>
            Automated systems, including Model Context Protocol (MCP)
            agents and conversational virtual assistants, are governed by
            strict operational guardrails:
          </P>
          <OL>
            <li>
              <strong className="text-foreground">
                Explicit Identity Enforcement
              </strong>
              : Automated systems must identify themselves as virtual
              assistants. They must never impersonate human technicians or
              claim to perform actions outside their assigned system
              capabilities.
            </li>
            <li>
              <strong className="text-foreground">
                Contextual Retrieval First
              </strong>
              : Agents must always attempt to identify user context,
              historical tickets, and user identity through existing
              session data before requesting inputs from the user.
            </li>
            <li>
              <strong className="text-foreground">
                Data Privacy and Least Privilege
              </strong>
              : User queries are strictly partitioned by account context.
              Automated systems must never reveal ticket information,
              comments, or resolution details belonging to another user.
            </li>
            <li>
              <strong className="text-foreground">
                Strict Scope Limitations
              </strong>
              : Automated assistants are restricted to ITSM workflow
              execution, status checks, comment logging, resolution
              processing, and ticket reopening. They are strictly
              prohibited from answering general domain queries, providing
              software development or coding tutorials, or offering
              non-IT advice.
            </li>
          </OL>
        </Sub>
      </Section>

      {/* SECTION 2 */}
      <Section id="sec-2">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Section 2
          </span>
          <H2 id="sec-2-heading">
            Ticket Classification and Lifecycle Management
          </H2>
        </div>

        <Sub>
          <H3 id="sec-2-1">2.1 Incidents vs. Service Requests</H3>
          <P>
            To maintain database integrity and accurate SLA (Service Level
            Agreement) reporting, enterprise work items are strictly split
            into two main ticket types: Incidents and Service Requests.
          </P>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <H4>Incident (INC)</H4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                An unplanned interruption to an IT service or a reduction in
                the quality of an IT service. Failure of a configuration
                item that has not yet affected service is also an incident
                (for example, failure of one disk from a redundant array).
              </p>
              <dl className="mt-4 space-y-2 text-[13.5px]">
                <div>
                  <dt className="font-semibold text-foreground">Examples</dt>
                  <dd className="text-muted">
                    Email client crashes, inability to connect to corporate
                    VPN, printer hardware failure, blue screen errors,
                    corrupted local profiles.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Prefix format
                  </dt>
                  <dd className="text-muted">
                    <code className="rounded bg-primary-50 px-1.5 py-0.5 text-primary-700">
                      INC-
                    </code>{" "}
                    followed by numeric digits (e.g. INC-1001, INC-88392).
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Reopen eligibility
                  </dt>
                  <dd className="text-muted">
                    CAN be reopened if currently `RESOLVED` and the issue
                    reoccurs.
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <H4>Service Request (SR)</H4>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                A formal request from a user or a user&apos;s representative
                for something to be provided — for example, a request for
                information or advice, for a reset of a password, or for
                provision of a standard workstation for a new team member.
              </p>
              <dl className="mt-4 space-y-2 text-[13.5px]">
                <div>
                  <dt className="font-semibold text-foreground">Examples</dt>
                  <dd className="text-muted">
                    Requests for new Figma or JetBrains software licenses,
                    hardware procurement, distribution list access, monitor
                    setups.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Prefix format
                  </dt>
                  <dd className="text-muted">
                    <code className="rounded bg-primary-50 px-1.5 py-0.5 text-primary-700">
                      SR-
                    </code>{" "}
                    followed by numeric digits (e.g. SR-2001, SR-44102).
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Reopen eligibility
                  </dt>
                  <dd className="text-muted">
                    Can NEVER be reopened once completed, fulfilled, or
                    closed. Users requiring additional assets or access must
                    log a new Service Request.
                  </dd>
                </div>
              </dl>
            </Card>
          </div>
        </Sub>

        <Sub>
          <H3 id="sec-2-2">2.2 Comprehensive Ticket Status Schema</H3>
          <P>
            Every ticket in the enterprise single-collection database
            architecture resides in exactly one of six standardized status
            states at any given point in time:
          </P>

          <div className="grid gap-4 sm:grid-cols-2">
            {STATUSES.map((status) => (
              <Card key={status.name}>
                <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-[12px] font-semibold text-primary-700">
                  {status.name}
                </span>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {status.description}
                </p>
                <dl className="mt-4 space-y-1.5 text-[13px]">
                  <div className="flex gap-1.5">
                    <dt className="shrink-0 font-semibold text-foreground">
                      Next states:
                    </dt>
                    <dd className="text-muted">{status.next}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="shrink-0 font-semibold text-foreground">
                      Auto cancel:
                    </dt>
                    <dd className="text-muted">{status.autoCancel}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="shrink-0 font-semibold text-foreground">
                      Auto reopen:
                    </dt>
                    <dd className="text-muted">{status.autoReopen}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
        </Sub>
      </Section>

      {/* SECTION 3 */}
      <Section id="sec-3">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Section 3
          </span>
          <H2 id="sec-3-heading">
            Detailed Operational Flows and Decision Rules
          </H2>
        </div>

        <Sub>
          <H3 id="sec-3-1">3.1 Status Check Workflow Rules</H3>
          <OL>
            <li>
              <strong className="text-foreground">
                Initial Acknowledgment
              </strong>
              : The system must immediately display or speak a phrase such
              as &quot;Just a moment...&quot; or &quot;One moment
              please...&quot; while initiating data retrieval.
            </li>
            <li>
              <strong className="text-foreground">Lookup Execution</strong>:
              <UL>
                <li>
                  If the user supplies a direct Ticket ID or Request ID
                  (for example, INC-1001), fetch ticket details directly.
                  The system must NOT render visual selection UI elements;
                  it must output status details directly in natural
                  conversation.
                </li>
                <li>
                  If the user provides a natural language description (for
                  example, &quot;my laptop issue&quot;) or states &quot;I
                  don&apos;t know my ticket number&quot;, fetch all matching
                  ticket details for the account. The system must trigger
                  visual selection UI cards for user selection.
                </li>
              </UL>
            </li>
            <li>
              <strong className="text-foreground">
                Empty Results Handling
              </strong>
              : If zero records match the account query, output the exact
              phrase: &quot;No tickets were found for your account.&quot;
            </li>
          </OL>
        </Sub>

        <Sub>
          <H3 id="sec-3-2">3.2 Add Comment Workflow Rules</H3>
          <OL>
            <li>
              <strong className="text-foreground">
                Context Identification
              </strong>
              : Locate the target ticket using explicit ticket numbers or
              search context.
            </li>
            <li>
              <strong className="text-foreground">
                Comment Drafting and Confirmation
              </strong>
              :
              <UL>
                <li>
                  Prompt the user for the comment content if it was not
                  provided.
                </li>
                <li>
                  Mandatory Guardrail: Before executing the write
                  operation, the agent must present the exact comment text
                  back to the user and request explicit confirmation (for
                  example, &quot;Just to confirm, you would like to add the
                  comment: &apos;[text]&apos; to ticket INC-1002?&quot;).
                </li>
              </UL>
            </li>
            <li>
              <strong className="text-foreground">Execution</strong>: Upon
              user confirmation, append the comment to the target ticket.
            </li>
            <li>
              <strong className="text-foreground">
                Output Confirmation
              </strong>
              : Upon successful execution, respond with: &quot;Comment
              added.&quot;
            </li>
          </OL>
        </Sub>

        <Sub>
          <H3 id="sec-3-3">3.3 Ticket Resolution Workflow Rules</H3>
          <OL>
            <li>
              <strong className="text-foreground">Status Pre-Check</strong>:
              Retrieve ticket details using the target ticket number.
            </li>
            <li>
              <strong className="text-foreground">Validation</strong>:
              <UL>
                <li>
                  If the ticket status is already `RESOLVED` or `CLOSED`, do
                  NOT invoke resolution services. Inform the user: &quot;The
                  ticket is already resolved or closed.&quot; Ask if help is
                  needed with another ticket.
                </li>
              </UL>
            </li>
            <li>
              <strong className="text-foreground">
                Resolution Comments
              </strong>
              : If the ticket number was supplied explicitly, do NOT render
              visual selection cards. Prompt the user directly for
              resolution comments.
            </li>
            <li>
              <strong className="text-foreground">Execution</strong>:
              Execute the resolution process with the provided comment.
            </li>
            <li>
              <strong className="text-foreground">
                Output Confirmation
              </strong>
              : Upon completion, respond with: &quot;The ticket has been
              resolved.&quot;
            </li>
          </OL>
        </Sub>

        <Sub>
          <H3 id="sec-3-4">3.4 Service Request Cancellation Workflow Rules</H3>
          <OL>
            <li>
              <strong className="text-foreground">
                Type and Status Validation
              </strong>
              : Retrieve the item details using the provided request ID.
            </li>
            <li>
              <strong className="text-foreground">
                Terminal Status Check
              </strong>
              : If the status is `CANCELLED`, `FULFILLED`, or `CLOSED`,
              reject the operation and state: &quot;Inform user the request
              can no longer be cancelled.&quot;
            </li>
            <li>
              <strong className="text-foreground">
                Active Work Check
              </strong>
              : If the status is `IN_PROGRESS` or any non-submitted state,
              reject the automated cancellation and state: &quot;Inform
              user that only Submitted requests can be cancelled.&quot;
            </li>
            <li>
              <strong className="text-foreground">
                Cancellation Reason
              </strong>
              : If the status is strictly `SUBMITTED`, request a
              cancellation reason from the user.
            </li>
            <li>
              <strong className="text-foreground">Execution</strong>:
              Execute the cancellation workflow with the provided reason.
            </li>
            <li>
              <strong className="text-foreground">
                Output Confirmation
              </strong>
              : Respond with: &quot;The service request has been cancelled
              successfully.&quot;
            </li>
          </OL>
        </Sub>

        <Sub>
          <H3 id="sec-3-5">
            3.5 Incident Reopening Workflow Rules (Incidents Only)
          </H3>
          <OL>
            <li>
              <strong className="text-foreground">
                Ticket Type Validation
              </strong>
              : Retrieve ticket details. If the ticket type is a Service
              Request (`SERVICE_REQUEST`), refuse reopening using the exact
              template: &quot;I&apos;m sorry, I cannot reopen this ticket
              as it is a &apos;[ticket_type]&apos; ticket.&quot;
            </li>
            <li>
              <strong className="text-foreground">
                Ticket Status Validation
              </strong>
              :
              <UL>
                <li>
                  If the status is `RESOLVED`, collect the reopening reason
                  and proceed.
                </li>
                <li>
                  If the status is `SUBMITTED`, inform the user that
                  submitted items cannot be reopened, and offer to log a
                  new issue.
                </li>
                <li>
                  If the status is `CANCELLED`, `FULFILLED`, `CLOSED`, or
                  any other state, refuse reopening using the exact
                  template: &quot;I&apos;m sorry, I cannot reopen this
                  ticket as it is currently in the
                  &apos;[ticket_status]&apos; state.&quot;
                </li>
              </UL>
            </li>
            <li>
              <strong className="text-foreground">Execution</strong>:
              Execute the reopen workflow updating the ticket status to
              `IN_PROGRESS`.
            </li>
            <li>
              <strong className="text-foreground">
                Output Confirmation
              </strong>
              : Respond with: &quot;The ticket has been Reopened
              successfully.&quot;
            </li>
          </OL>
        </Sub>
      </Section>

      {/* SECTION 4 */}
      <Section id="sec-4">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Section 4
          </span>
          <H2 id="sec-4-heading">
            Knowledge Base Articles and Troubleshooting SOPs
          </H2>
        </div>

        {ARTICLES.map((article) => (
          <Sub key={article.id}>
            <H3 id={article.id}>{article.title}</H3>
            <Card>
              <dl className="grid gap-3 text-[13.5px] sm:grid-cols-2">
                <div>
                  <dt className="font-semibold text-foreground">Category</dt>
                  <dd className="text-muted">{article.category}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground">
                    Applies to
                  </dt>
                  <dd className="text-muted">{article.appliesTo}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-foreground">Symptom</dt>
                  <dd className="text-muted">{article.symptom}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-foreground">
                    Root cause analysis
                  </dt>
                  <dd className="text-muted">{article.rootCause}</dd>
                </div>
              </dl>
            </Card>
            <div>
              <H4>Step-by-step resolution standard</H4>
              <div className="mt-2">
                <OL>
                  {article.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </OL>
              </div>
            </div>
          </Sub>
        ))}

        <Sub>
          <H3 id="sec-4-3">
            Article 3: Developer Tools and Software License Provisioning
          </H3>
          <Card>
            <dl className="grid gap-3 text-[13.5px] sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-foreground">Category</dt>
                <dd className="text-muted">
                  Software Asset Management (SAM)
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Applies to
                </dt>
                <dd className="text-muted">
                  JetBrains All Products Pack, Figma Enterprise, Docker
                  Desktop Pro
                </dd>
              </div>
            </dl>
          </Card>
          <div>
            <H4>Provisioning policy</H4>
            <div className="mt-2">
              <UL>
                <li>
                  Software requests require automated department manager
                  approval through a Service Request.
                </li>
                <li>
                  Licenses are bound to corporate Single Sign-On (SSO)
                  email addresses.
                </li>
              </UL>
            </div>
          </div>
          <div>
            <H4>Troubleshooting access issues</H4>
            <div className="mt-2">
              <UL>
                <li>
                  If a user receives an &quot;Unlicensed Product&quot;
                  error after approval, instruct the user to sign out of
                  the software vendor account, clear browser session
                  cookies for the identity provider, and select &quot;Sign
                  in with SSO / SAML&quot;.
                </li>
              </UL>
            </div>
          </div>
        </Sub>

        <Sub>
          <H3 id="sec-4-4">
            Article 4: Hardware Replacement and Asset Return Standard
            Operating Procedure
          </H3>
          <Card>
            <dl className="grid gap-3 text-[13.5px] sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-foreground">Category</dt>
                <dd className="text-muted">Hardware / Logistics</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Applies to
                </dt>
                <dd className="text-muted">
                  Laptops, Docking Stations, Mobile Devices
                </dd>
              </div>
            </dl>
          </Card>
          <div>
            <H4>Lifecycle rules</H4>
            <div className="mt-2">
              <OL>
                <li>
                  Defective hardware under warranty must have an Incident
                  ticket opened.
                </li>
                <li>
                  If the technician identifies hardware failure (such as
                  motherboard damage), the technician marks the Incident as
                  RESOLVED with a note to request replacement.
                </li>
                <li>
                  The user or technician then logs a Service Request for
                  new hardware procurement. Hardware requests cannot be
                  processed directly under Incident tickets.
                </li>
              </OL>
            </div>
          </div>
        </Sub>
      </Section>

      {/* SECTION 5 */}
      <Section id="sec-5">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Section 5
          </span>
          <H2 id="sec-5-heading">
            Security, Compliance, and Emergency Escalations
          </H2>
        </div>

        <Sub>
          <H3 id="sec-5-1">5.1 Data Protection and Handling</H3>
          <UL>
            <li>
              <strong className="text-foreground">
                PCI-DSS and HIPAA Compliance
              </strong>
              : Users must never paste raw credit card numbers, Social
              Security Numbers (SSN), or personal health data into ticket
              comments or description fields.
            </li>
            <li>
              <strong className="text-foreground">
                Credential Protection
              </strong>
              : Support agents and automated tools must never ask users for
              passwords, Multi-Factor Authentication (MFA) push codes, or
              private SSH keys. Any ticket containing sensitive credentials
              must be scrubbed immediately and flagged for password reset.
            </li>
          </UL>
        </Sub>

        <Sub>
          <H3 id="sec-5-2">
            5.2 Critical System Outages (Priority 1 and Priority 2
            Emergencies)
          </H3>
          <UL>
            <li>
              <strong className="text-foreground">
                Priority 1 (P1 - Critical Outage)
              </strong>
              : Enterprise-wide degradation (such as complete email service
              failure, primary datacenter network failure, or an active
              ransomware attack).
            </li>
            <li>
              <strong className="text-foreground">
                Escalation Protocol
              </strong>
              : Priority 1 issues must NOT be handled via standard
              self-service tickets or asynchronous chat. Users and agents
              must immediately notify the 24/7 IT Operations Command
              Center emergency hotline.
            </li>
          </UL>
        </Sub>

        <Sub>
          <H3 id="sec-5-3">5.3 Reporting Security Incidents</H3>
          <UL>
            <li>
              <strong className="text-foreground">
                Lost or Stolen Laptops
              </strong>
              : Report immediately to Security Operations. Remote wipe
              commands will be issued through Mobile Device Management
              (MDM) within 15 minutes of receipt.
            </li>
            <li>
              <strong className="text-foreground">
                Phishing and Credential Leaks
              </strong>
              : Forward suspicious email files to the security operations
              team or log an urgent Security Incident ticket.
            </li>
          </UL>
        </Sub>
      </Section>
    </div>
  );
}
