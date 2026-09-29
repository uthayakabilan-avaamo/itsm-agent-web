## 21. Official production-grade source registry

### Microsoft

**Microsoft troubleshooting hub**  
https://learn.microsoft.com/en-us/troubleshoot/

**Windows troubleshooting**  
https://learn.microsoft.com/en-us/troubleshoot/windows/

**Windows client troubleshooting**  
https://learn.microsoft.com/en-us/troubleshoot/windows-client/welcome-windows-client

**Windows Help & Support**  
https://www.microsoft.com/en-us/windows/help-and-support

**Windows troubleshooters**  
https://support.microsoft.com/en-us/support/get-help/windows-troubleshooters

**Microsoft 365 troubleshooting**  
https://learn.microsoft.com/en-us/troubleshoot/microsoft-365-apps/

**Microsoft Intune troubleshooting**  
https://learn.microsoft.com/en-us/troubleshoot/mem/intune/welcome-intune

Use Microsoft official documentation as a primary source for Windows, Microsoft 365, Teams, SharePoint, Exchange, Outlook, OneDrive, Intune (MDM) and related products.

### Google

**Google Workspace Admin Help**  
https://support.google.com/a/

**Google Workspace known issues**  
https://knowledge.workspace.google.com/admin/support/troubleshooting/google-workspace-known-issues

**Workspace login / 2-Step Verification troubleshooting**  
https://support.google.com/a/answer/10710447

**Google Chrome Help**  
https://support.google.com/chrome/

**Chrome connection/loading troubleshooting**  
https://support.google.com/chrome/answer/6098869

**Android Help**  
https://support.google.com/android/

**Android Enterprise Help**  
https://support.google.com/work/android/

Use for Workspace/Gmail/Drive administration, Chrome, and Android device (including managed/enterprise) issues.

### Cisco

**Cisco Support**  
https://www.cisco.com/c/en/us/support/index.html

Use for networking, Wi-Fi, VPN (Cisco Secure Client), routing, switching, DNS/DHCP and authentication. Cisco Secure Client is the registry's single VPN vendor — do not add a second VPN client's docs alongside it.

### Identity & SSO

**Okta Documentation**  
https://help.okta.com/en-us/content/index.htm

Use for SAML/SSO, MFA and provisioning issues. Okta is the registry's single identity provider — do not add Entra ID or another IdP alongside it.

Note: Okta's separate `support.okta.com` Knowledge Base portal is a Salesforce Lightning app that does not reliably render for scraping — use `help.okta.com` only.

### Collaboration & Communication

**Zoom Help Center**  
https://support.zoom.com/hc/en

Use for meeting/call quality and audio/video device issues. Zoom is the registry's single collaboration/communication vendor.

### Developer & Design Tools

**JetBrains Support**  
https://www.jetbrains.com/support/

**JetBrains IDEs Support (IntelliJ Platform) — license issues**  
https://intellij-support.jetbrains.com/hc/en-us

**Docker Desktop — troubleshoot**  
https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/

**Figma Help Center — Troubleshoot**  
https://help.figma.com/hc/en-us/sections/1500000378401-Troubleshoot

**Figma — SAML SSO guide**  
https://help.figma.com/hc/en-us/articles/360040532333-Guide-to-SAML-SSO

These three do different jobs (IDE licensing, container runtime, design tool) rather than competing for the same one, so all three stay — matching the "Developer Tools and Software License Provisioning" article in the ITSM policy doc (JetBrains All Products Pack, Figma Enterprise, Docker Desktop Pro).

### Hardware vendor

**Dell Support — fix common issues**  
https://www.dell.com/support/contents/en-us/category/product-support/self-support-knowledgebase/fix-common-issues

Use for device-specific hardware faults (power, display, battery, USB) on laptops, desktops and docking stations. Dell is the registry's single hardware vendor — do not add HP or Lenovo alongside it. This supplements, not replaces, the OS-vendor (Microsoft/Apple) guidance above.

### Apple

**Apple Support**  
https://support.apple.com/

Use for macOS, iPhone/iPad, Apple Account, Wi-Fi, Bluetooth, applications, printers and updates.

### Ubuntu

**Official Ubuntu Documentation**  
https://help.ubuntu.com/

**Ubuntu troubleshooting**  
https://help.ubuntu.com/community/Troubleshooting

**Ubuntu basic troubleshooting**  
https://wiki.ubuntu.com/BasicTroubleshooting

Prefer current supported-release documentation. Treat community wiki pages as secondary references.

### Red Hat

**Red Hat Documentation**  
https://docs.redhat.com/en

**Red Hat Knowledgebase**  
https://access.redhat.com/kb/search/

Some Red Hat Knowledgebase content requires a verified account/subscription. Do not assume restricted content can be copied into a public/commercial KB.

### Atlassian / ITSM process

**Atlassian ITSM guide**  
https://www.atlassian.com/collections/service/guides/it-service-management

**Atlassian knowledge management**  
https://www.atlassian.com/software/jira/service-management/product-guide/getting-started/knowledge-management

**Jira Service Management ITSM documentation**  
https://support.atlassian.com/jira-service-management-cloud/docs/discover-it-service-management-itsm/

Use Atlassian primarily for ITSM process and knowledge-management design, not as a substitute for vendor-specific troubleshooting.

### NIST / incident response

**NIST SP 800-61 Rev. 3 (current, final — April 2025)**  
https://csrc.nist.gov/pubs/sp/800/61/r3/final

"Incident Response Recommendations and Considerations for Cybersecurity Risk Management: A CSF 2.0 Community Profile." This is the authoritative source for security incident-response procedure design — it maps incident response activity to the NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover).

Note: SP 800-61 Rev. 2 ("Computer Security Incident Handling Guide," 2012) is withdrawn and fully superseded by Rev. 3 above. Do not cite Rev. 2 as current guidance.

---

## Registry summary

What this registry covers, by category, and why:

- **OS & productivity platforms** — Microsoft (Windows, Microsoft 365, Intune), Google (Workspace, Chrome, Android), Apple (macOS/iOS), Ubuntu, Red Hat. These are the primary sources for the highest-volume ticket categories: login/auth failures, application crashes, OS updates, and device management. (Windows/macOS/Android/Linux coexist by design — a company's device fleet spans multiple OSes even when every *function* below is single-vendor.)
- **VPN** — Cisco Secure Client only. Removed Palo Alto GlobalProtect and WireGuard, which were competing options for the same job; a company standardizes on one VPN client.
- **Identity & SSO** — Okta only. Removed Microsoft Entra ID, which was a competing IdP option for the same job.
- **MDM** — removed as a standalone category. Microsoft Intune (already listed under Microsoft) covers this job; a separate Jamf entry would have reintroduced the same either/or ambiguity.
- **Collaboration** — Zoom only. Removed Slack, which was a competing option for the same job.
- **Developer & design tools** — JetBrains, Docker Desktop, Figma. Kept as three, since each does a different job (IDE licensing, container runtime, design tool) rather than competing for the same one — this directly matches the ITSM policy doc's licensing article, which names all three together as one company's stack.
- **Hardware vendor** — Dell only. Removed HP and Lenovo, which were competing laptop/desktop vendor options for the same job (this also drops HP's printer-specific coverage, since printers weren't a named requirement).
- **ITSM process design** — Atlassian. Reference for ticket lifecycle/knowledge-management structure, not device troubleshooting.
- **Security incident response** — NIST SP 800-61 Rev. 3 (current). Governs the Section 5 (P1/P2 outage and security-incident) escalation procedures.

Selection criteria applied: every link above is (1) an official vendor/standards-body source (no third-party blogs, forums, or reseller sites), (2) publicly reachable without login or paywall, (3) confirmed to return complete, server-rendered HTML — verified live during this pass rather than assumed — so it can be scraped with a plain HTTP fetch for RAG ingestion, no headless browser required, and (4) the single vendor for its job, not one of several competing options, on the assumption that any one company standardizes on one tool per function.

One source was deliberately excluded after verification for failing the scrapability bar: Okta's `support.okta.com` Knowledge Base (a Salesforce Lightning SPA that returned a client-side rendering error with no article content in the raw HTML) — `help.okta.com` is used in its place. Red Hat's Knowledgebase is listed with an explicit access-restriction warning rather than removed, since some of it remains useful for reference even though not everything there is publicly ingestible.

Out of scope by design: cloud infrastructure platforms (AWS, Azure resource management, GCP) and CRM/ERP systems (Salesforce, Oracle) were not added — this registry is scoped to end-user/employee IT support (the audience for an ITSM helpdesk agent), not cloud operations or line-of-business application administration. Add a dedicated category if the agent's scope expands to infrastructure tickets.
