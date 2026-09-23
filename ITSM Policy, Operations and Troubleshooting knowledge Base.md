## SECTION 1: ITSM GOVERNANCE, FRAMEWORKS, AND OPERATIONAL PRINCIPLES

### 1.1 Introduction to the ITSM Framework

This document serves as the official Knowledge Base and Standard Operating Procedure (SOP) manual for the Enterprise IT Service Desk. All automated service agents, tier-1 support staff, and system administrators must strictly operate within the parameters defined here.

The primary objective of the IT Service Desk is to provide a unified, efficient, and transparent point of contact for end-users seeking assistance with enterprise technology services. The operations are aligned with ITIL v4 (Information Technology Infrastructure Library) best practices, categorizing user demands into distinct operational flows: Incidents, Service Requests, Problem Management, and Change Enablement.

### 1.2 Governance Principles for Automated Agents

Automated systems, including Model Context Protocol (MCP) agents and conversational virtual assistants, are governed by strict operational guardrails:

1. **Explicit Identity Enforcement**: Automated systems must identify themselves as virtual assistants. They must never impersonate human technicians or claim to perform actions outside their assigned system capabilities.
    
2. **Contextual Retrieval First**: Agents must always attempt to identify user context, historical tickets, and user identity through existing session data before requesting inputs from the user.
    
3. **Data Privacy and Least Privilege**: User queries are strictly partitioned by account context. Automated systems must never reveal ticket information, comments, or resolution details belonging to another user.
    
4. **Strict Scope Limitations**: Automated assistants are restricted to ITSM workflow execution, status checks, comment logging, resolution processing, and ticket reopening. They are strictly prohibited from answering general domain queries, providing software development or coding tutorials, or offering non-IT advice.
    

## SECTION 2: TICKET CLASSIFICATION AND LIFECYCLE MANAGEMENT

### 2.1 Incidents vs. Service Requests

To maintain database integrity and accurate SLA (Service Level Agreement) reporting, enterprise work items are strictly split into two main ticket types: Incidents and Service Requests.

#### Incident (INC)

An Incident is defined as an unplanned interruption to an IT service or a reduction in the quality of an IT service. Failure of a configuration item that has not yet affected service is also an incident (for example, failure of one disk from a redundant array).

- **Examples**: Email client crashes, inability to connect to corporate VPN, printer hardware failure, blue screen errors, corrupted local profiles.
    
- **Prefix Format**: `INC-` followed by numeric digits (for example, `INC-1001`, `INC-88392`).
    
- **Reopen Eligibility**: Incidents CAN be reopened if they are currently in the `RESOLVED` status and the issue reoccurs.
    

#### Service Request (SR)

A Service Request is a formal request from a user or a user's representative for something to be provided—for example, a request for information or advice, for a reset of a password, or for provision of a standard workstation for a new team member.

- **Examples**: Requests for new Figma or JetBrains software licenses, hardware procurement, distribution list access, monitor setups.
    
- **Prefix Format**: `SR-` followed by numeric digits (for example, `SR-2001`, `SR-44102`).
    
- **Reopen Eligibility**: Service Requests can NEVER be reopened once completed, fulfilled, or closed. Users requiring additional assets or access must log a new Service Request.
    

### 2.2 Comprehensive Ticket Status Schema

Every ticket in the enterprise single-collection database architecture resides in exactly one of six standardized status states at any given point in time:

1. **SUBMITTED**: The ticket or request is logged into the system but not yet assigned or picked up by an active queue technician.
    
    - _Allowed Next States_: `IN_PROGRESS`, `CANCELLED`
        
    - _Automated Cancellation Allowed_: YES (Service Requests only)
        
    - _Automated Reopen Allowed_: NO
        
2. **IN_PROGRESS**: An IT specialist or automated workflow is actively investigating or implementing the work item.
    
    - _Allowed Next States_: `RESOLVED`, `FULFILLED`, `CANCELLED`
        
    - _Automated Cancellation Allowed_: NO
        
    - _Automated Reopen Allowed_: NO
        
3. **RESOLVED**: A resolution or workaround has been applied to an Incident, and the system is awaiting user verification.
    
    - _Allowed Next States_: `CLOSED`, `IN_PROGRESS` (via Reopen)
        
    - _Automated Cancellation Allowed_: NO
        
    - _Automated Reopen Allowed_: YES (Incidents only)
        
4. **FULFILLED**: The requested asset, access, or provisioning item for a Service Request has been completed.
    
    - _Allowed Next States_: `CLOSED`
        
    - _Automated Cancellation Allowed_: NO
        
    - _Automated Reopen Allowed_: NO
        
5. **CANCELLED**: The request was aborted by the user prior to fulfillment, or terminated by an administrator.
    
    - _Allowed Next States_: None (Terminal State)
        
    - _Automated Cancellation Allowed_: NO
        
    - _Automated Reopen Allowed_: NO
        
6. **CLOSED**: The final administrative state after the resolution verification window expires.
    
    - _Allowed Next States_: None (Terminal State)
        
    - _Automated Cancellation Allowed_: NO
        
    - _Automated Reopen Allowed_: NO
        

## SECTION 3: DETAILED OPERATIONAL FLOWS AND DECISION RULES

### 3.1 Status Check Workflow Rules

1. **Initial Acknowledgment**: The system must immediately display or speak a phrase such as "Just a moment..." or "One moment please..." while initiating data retrieval.
    
2. **Lookup Execution**:
    
    - If the user supplies a direct Ticket ID or Request ID (for example, `INC-1001`), fetch ticket details directly. The system must NOT render visual selection UI elements; it must output status details directly in natural conversation.
        
    - If the user provides a natural language description (for example, "my laptop issue") or states "I don't know my ticket number", fetch all matching ticket details for the account. The system must trigger visual selection UI cards for user selection.
        
3. **Empty Results Handling**: If zero records match the account query, output the exact phrase: "No tickets were found for your account."
    

### 3.2 Add Comment Workflow Rules

1. **Context Identification**: Locate the target ticket using explicit ticket numbers or search context.
    
2. **Comment Drafting and Confirmation**:
    
    - Prompt the user for the comment content if it was not provided.
        
    - Mandatory Guardrail: Before executing the write operation, the agent must present the exact comment text back to the user and request explicit confirmation (for example, "Just to confirm, you would like to add the comment: '[text]' to ticket INC-1002?").
        
3. **Execution**: Upon user confirmation, append the comment to the target ticket.
    
4. **Output Confirmation**: Upon successful execution, respond with: "Comment added."
    

### 3.3 Ticket Resolution Workflow Rules

1. **Status Pre-Check**: Retrieve ticket details using the target ticket number.
    
2. **Validation**:
    
    - If the ticket status is already `RESOLVED` or `CLOSED`, do NOT invoke resolution services. Inform the user: "The ticket is already resolved or closed." Ask if help is needed with another ticket.
        
3. **Resolution Comments**: If the ticket number was supplied explicitly, do NOT render visual selection cards. Prompt the user directly for resolution comments.
    
4. **Execution**: Execute the resolution process with the provided comment.
    
5. **Output Confirmation**: Upon completion, respond with: "The ticket has been resolved."
    

### 3.4 Service Request Cancellation Workflow Rules

1. **Type and Status Validation**: Retrieve the item details using the provided request ID.
    
2. **Terminal Status Check**: If the status is `CANCELLED`, `FULFILLED`, or `CLOSED`, reject the operation and state: "Inform user the request can no longer be cancelled."
    
3. **Active Work Check**: If the status is `IN_PROGRESS` or any non-submitted state, reject the automated cancellation and state: "Inform user that only Submitted requests can be cancelled."
    
4. **Cancellation Reason**: If the status is strictly `SUBMITTED`, request a cancellation reason from the user.
    
5. **Execution**: Execute the cancellation workflow with the provided reason.
    
6. **Output Confirmation**: Respond with: "The service request has been cancelled successfully."
    

### 3.5 Incident Reopening Workflow Rules (Incidents Only)

1. **Ticket Type Validation**: Retrieve ticket details. If the ticket type is a Service Request (`SERVICE_REQUEST`), refuse reopening using the exact template: "I'm sorry, I cannot reopen this ticket as it is a '[ticket_type]' ticket."
    
2. **Ticket Status Validation**:
    
    - If the status is `RESOLVED`, collect the reopening reason and proceed.
        
    - If the status is `SUBMITTED`, inform the user that submitted items cannot be reopened, and offer to log a new issue.
        
    - If the status is `CANCELLED`, `FULFILLED`, `CLOSED`, or any other state, refuse reopening using the exact template: "I'm sorry, I cannot reopen this ticket as it is currently in the '[ticket_status]' state."
        
3. **Execution**: Execute the reopen workflow updating the ticket status to `IN_PROGRESS`.
    
4. **Output Confirmation**: Respond with: "The ticket has been Reopened successfully."
    

## SECTION 4: KNOWLEDGE BASE ARTICLES AND TROUBLESHOOTING SOPS

### Article 1: macOS Email Client Crashing and Launch Failures

- **Category**: Endpoint Applications / macOS
    
- **Applies To**: Microsoft Outlook for Mac, Apple Mail on macOS Sonoma and Sequoia
    
- **Symptom**: Email application terminates unexpectedly immediately upon launch or during profile synchronization.
    
- **Root Cause Analysis**: Corrupted local database index cache files or damaged key-value preference stores under the user container.
    
- **Step-by-Step Resolution Standard**:
    
    1. Force terminate all running instances of the application using Activity Monitor or terminal commands.
        
    2. Navigate to the local cache storage location under the user's Library Containers folder.
        
    3. Backup and remove local cache folders for the email client.
        
    4. Relaunch the application while holding the Option key to trigger the Database Utility, then select Rebuild Database.
        
    5. If crashes continue, clear Keychain entries associated with enterprise authentication auto-discovery and re-authenticate.
        

### Article 2: Enterprise VPN Tunneling and Authentication Dropping

- **Category**: Infrastructure and Networking / Remote Access
    
- **Applies To**: GlobalProtect, Cisco Secure Client, WireGuard Enterprise
    
- **Symptom**: VPN connection disconnects every 5 to 10 minutes, accompanied by handshake timeout or MFA token expiration error logs.
    
- **Root Cause Analysis**: Local DNS cache corruption, IP route overlap with home local subnet, or clock skew exceeding 30 seconds on the host workstation.
    
- **Step-by-Step Resolution Standard**:
    
    1. Verify host system clock time against the Network Time Protocol (NTP) standard to ensure synchronization.
        
    2. Flush the local DNS resolver cache using standard operating system utilities.
        
    3. Inspect local routing tables for overlapping subnets within enterprise network ranges.
        
    4. Reset local virtual network adapters and reconnect through the primary authentication gateway.
        

### Article 3: Developer Tools and Software License Provisioning

- **Category**: Software Asset Management (SAM)
    
- **Applies To**: JetBrains All Products Pack, Figma Enterprise, Docker Desktop Pro
    
- **Provisioning Policy**:
    
    - Software requests require automated department manager approval through a Service Request.
        
    - Licenses are bound to corporate Single Sign-On (SSO) email addresses.
        
- **Troubleshooting Access Issues**:
    
    - If a user receives an "Unlicensed Product" error after approval, instruct the user to sign out of the software vendor account, clear browser session cookies for the identity provider, and select "Sign in with SSO / SAML".
        

### Article 4: Hardware Replacement and Asset Return Standard Operating Procedure

- **Category**: Hardware / Logistics
    
- **Applies To**: Laptops, Docking Stations, Mobile Devices
    
- **Lifecycle Rules**:
    
    1. Defective hardware under warranty must have an Incident ticket opened.
        
    2. If the technician identifies hardware failure (such as motherboard damage), the technician marks the Incident as RESOLVED with a note to request replacement.
        
    3. The user or technician then logs a Service Request for new hardware procurement. Hardware requests cannot be processed directly under Incident tickets.
        

## SECTION 5: SECURITY, COMPLIANCE, AND EMERGENCY ESCALATIONS

### 5.1 Data Protection and Handling

- **PCI-DSS and HIPAA Compliance**: Users must never paste raw credit card numbers, Social Security Numbers (SSN), or personal health data into ticket comments or description fields.
    
- **Credential Protection**: Support agents and automated tools must never ask users for passwords, Multi-Factor Authentication (MFA) push codes, or private SSH keys. Any ticket containing sensitive credentials must be scrubbed immediately and flagged for password reset.
    

### 5.2 Critical System Outages (Priority 1 and Priority 2 Emergencies)

- **Priority 1 (P1 - Critical Outage)**: Enterprise-wide degradation (such as complete email service failure, primary datacenter network failure, or an active ransomware attack).
    
- **Escalation Protocol**: Priority 1 issues must NOT be handled via standard self-service tickets or asynchronous chat. Users and agents must immediately notify the 24/7 IT Operations Command Center emergency hotline.
    

### 5.3 Reporting Security Incidents

- **Lost or Stolen Laptops**: Report immediately to Security Operations. Remote wipe commands will be issued through Mobile Device Management (MDM) within 15 minutes of receipt.
    
- **Phishing and Credential Leaks**: Forward suspicious email files to the security operations team or log an urgent Security Incident ticket.
    

