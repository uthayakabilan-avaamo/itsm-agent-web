Frontend Spec — "Alex" ITSM Agent Demo Page
Audience of this doc: frontend developers building the demo page. Audience of the page: a Manager, a Tester, and a Client, all on one page, via role tabs. Source of truth for agent behaviour: itsmAgent.md, Prompts.js, AGENT_FUNCTIONS.md. Flow diagrams also live in AGENT_FLOWS.md. If this doc and those disagree, those win. Tell the backend/prompt owner so this doc gets fixed.

1. What we are demonstrating
Alex is a conversational IT Service Desk agent for Avaamo employees. In one chat it can:

#	Capability	One-line description
1	Authenticate	Employee number, then a 6-digit one-time code (OTP) sent by email. Nothing else works until this succeeds.
2	Troubleshoot first	For a broken thing, it offers known fixes one at a time before creating a ticket (ticket deflection).
3	Create an Incident (something is broken) or a Service Request (user wants something).	Confirms a summary first, then creates the ticket.
4	Find / status check	Look up by number (INC-109, SR-108), by free-text description (fuzzy, typo-tolerant), or list recent tickets.
5	Add a note	Append a comment to any ticket.
6	Resolve an Incident	Incidents only. Needs an owner assigned on the backend.
7	Cancel a Service Request	Service requests only, and only if cancelable.
8	Answer ITSM questions	Knowledge fallback ("what is an incident?").
9	Escalate to a live agent	On request, repeated failure, unsupported action, or user frustration.
10	Stay in scope	Refuses non-ITSM questions and prompt-injection attempts.
Key vocabulary (put a glossary tooltip in the UI)
Term	Meaning
Incident (INC-n)	Something is broken. Statuses seen in the UI: Logged, Active, Resolved, Closed.
Service Request (SR-n)	The user wants something new (equipment, access, software). Statuses: Logged, Submitted, Cancelled, Closed.
Note	A comment attached to a ticket (also called a journal note).
OTP	One-time password, 6 digits, valid 10 minutes, single use.
Quick reply	A tappable button row under a chat message. Tapping is exactly the same as typing its value.
Card / Carousel	Rich chat messages showing one ticket / several tickets.
Tool call	A function the agent calls on the backend (e.g. createIncident). Tester tab only.
2. Page concept: two orthogonal switches
Mode toggle (where the conversation comes from)

Guided: scripted scenarios, no backend

Live: real agent + real backend

Role tab (who is looking)

Manager

Tester

Client

Page

Shared Chat Component
(identical in all 6 combinations)





Role tab changes what is around the chat (side panels, copy, extra detail). It never changes the chat itself.
Mode toggle changes where messages come from. The chat component renders the same message types either way.
Persist both selections in the URL (?role=tester&mode=live) so the page is linkable for demos.
Guided mode	Live mode
Source	Pre-scripted JSON scenarios (section 9) played back step by step	The deployed Avaamo agent over its web/chat channel
Backend needed	No	Yes (agent platform + this ticket server)
Best for	Client demos, manager walkthroughs, offline use	Testers, real end-to-end checks
Default for Client / Manager	Yes	No
Default for Tester	No	Yes
Open integration question (needs the platform owner): how Live mode connects to the Avaamo agent (embedded web-channel widget vs. a custom client over the platform's messaging API) is not defined in this repo. Build the chat component against the message contract in section 6 and put the transport behind a small adapter (sendUserMessage(text) and onAgentMessage(msg)), so Guided and Live are two implementations of the same interface.

Guided mode must never call the real backend or send real OTP emails.

3. Page layout
Page

Body

LEFT: Scenario / Flow panel
(scenario picker, flow diagram, progress)

CENTER: Chat window (shared)

RIGHT: Insight panel
(content depends on role)

Header: product name, Role tabs, Mode toggle, Reset demo button

Footer: glossary, version, 'Known limitations' link





Desktop: 3 columns (left 25%, center 45%, right 30%). Tablet: right panel collapses to a drawer. Mobile: chat only, panels become bottom sheets.
Left and right panels are collapsible. The Client tab hides the right panel by default.
A global Reset demo button clears chat, auth state, panels and returns to scenario 1.
What each role sees
Client tab

Clean branded chat only

3 to 5 friendly 'try this' prompts

Plain-language 'What Alex can do' list

Tester tab

Full scenario catalogue incl. edge cases + expected results

Tool-call inspector (function, args, REST call, result, error code)

Session state viewer (auth, current ticket, troubleshooting count)

Detailed flow diagrams with 'you are here' highlighting

Pass / Fail marker per step + export

Manager tab

Capability overview cards

Business-flow diagram (high level)

Ticket-deflection story

Scenario picker: 'headline' scenarios only

Live outcome tracker: tickets created / deflected / escalated in this session

Chat window (always)





4. Role tab specs
4.1 Manager tab: "What does it do, and does it save us work?"
Goal: understand scope, value and flow in under 3 minutes. No technical jargon, no raw tool names.

Left panel

Capability cards (the 10 rows from section 1, grouped: Get help, Manage tickets, Safety). Clicking a card loads the matching scenario into the chat.
Headline scenarios (maximum 5): S1 Sign in, S3 Troubleshoot then ticket, S4 Troubleshoot success (no ticket), S7 Resolve, S10 Escalate.
Right panel

Business flow diagram (render Diagram A below), with the current step highlighted as the chat progresses.
Session outcomes tracker (live counters, this session only): Tickets created, Resolved without a ticket (deflected), Tickets updated (notes/resolve/cancel), Escalated to human. Derive from chat events (section 8).
"Why it matters" blurb (static copy): fewer tickets via guided self-fix, better ticket quality because the agent collects full detail up front, secure by design (verified identity before any action), scoped (will not answer off-topic questions).
Do not show invented KPIs such as "saves X hours". If real numbers are wanted later, they come from product/business, not the frontend.

Diagram A: business flow (Manager)

Something is broken

Fixed

Not fixed

Needs something new

Check on a ticket

Update a ticket

Wants a person

Yes

No

Employee opens chat

Verify identity
(employee number + emailed code)

What do they need?

Guided self-fix
(one suggestion at a time)

Solved, no ticket needed

Create Incident ticket
(with everything already tried)

Create Service Request

Find and show status

Add note / Resolve / Cancel

Hand off to live agent
(with summary)

Ticket logged and confirmed

Anything else?

Warm sign-off





4.2 Tester tab: "Does it behave exactly as specified?"
Goal: drive every path, including failure paths, and see exactly what happened under the hood.

Left panel

Full scenario catalogue (section 9), filterable by area (Auth, Create, Lookup, Note, Resolve, Cancel, Escalation, Guardrails) and by happy path / edge case / negative.
Each scenario shows: ID, title, expected behaviour checklist, and a Run in Guided / Run in Live button. In Live mode the scenario is a script of suggested user messages the tester pastes or auto-sends one by one (one-click "send next").
Per-step Pass / Fail / Skip toggle plus free-text note. Export as JSON or CSV.
Right panel (tabs)

Tool calls: chronological list. Each entry: timestamp, function name, arguments (secrets masked), HTTP method + path, status code, result summary, and error code if any. Expandable raw JSON. Highlight state-changing calls (createIncident, createServiceRequest, addIncidentNote, addServiceRequestNote, resolveIncident, cancelServiceRequest, OTP calls).
Session state: live key/value view of authenticated, employeeNumber, displayName, currentTicket, troubleshootingFixesOffered (0 to 5), mode. Never show accessToken or userId raw.
Flow tracker: the detailed diagrams in section 7, with the active node highlighted.
Rules checklist: the "agent must / must never" list (section 10) with ticks the tester can set.
In Guided mode, the tool-call inspector replays the scripted tool calls from the scenario JSON so testers can review the contract without a backend.

4.3 Client tab: "Show me what my employees will experience"
Goal: polished, reassuring, zero internals.

Chat window centered and branded; right panel hidden; left panel reduced to a "Try asking" list.
Suggested prompts (tap to send): "My laptop won't connect to VPN", "I need access to the EPIC system", "What's the status of my open tickets?", "Add a note to INC-109".
A short "What Alex can do" list in plain language (no tool names, no status codes).
Guided mode by default, with an unobtrusive "Sample data" badge.
No error codes, no JSON, no tool-call info anywhere on this tab.
5. Authentication gate (must be visible in every role)
The agent will not act on any ticket until the user is verified. The page should make this gate obvious (a small "Verified as " chip in the chat header once done).

Email (Gmail)
Ticket server
Alex (agent)
Email (Gmail)
Ticket server
Alex (agent)
alt
[code valid and unused]
[wrong or expired]
User
"Hi, I'm Alex... could you share your employee number?"
1
"10234" (4 to 5 digits only)
2
"Got it."
3
POST /api/v1/auth/otp/request {employeeNumber}
4
send 6-digit code (valid 10 min)
5
ok
6
"I've sent a 6-digit code to your email" + [Resend code] [Use a different employee number]
7
"482913"
8
POST /api/v1/auth/otp/verify {employeeNumber, otp}
9
accessToken (JWT, 7 days) + employee profile
10
"Your one-time code has been verified successfully."
11
"Hi <Name>, I'm Alex, your IT Support Agent. How can I help...?" + greeting buttons
12
401 OTP_INVALID_OR_EXPIRED
13
"That code didn't match or has expired." + [Resend code] [Use a different employee number]
14
User




Edge cases the UI must be able to show:

Situation	Agent behaviour
User asks about a ticket before verifying	Says they need to verify first, continues auth. No ticket call is made.
Input is not 4 to 5 digits (name, email, text)	Asks specifically for the employee number.
Unknown employee number	EMPLOYEE_NOT_FOUND (404): tells the user, asks them to double check. Never guesses a nearby number.
Wrong / expired / reused code	One shared message (OTP_INVALID_OR_EXPIRED) for all three, so it never reveals which. Unlimited retries and resends.
"Resend code"	Calls resend using the number already given. No re-asking.
"Use a different employee number"	Fresh start for the code step.
Session end	logout() clears the session on goodbye (text), hangupCall() on voice. Next message restarts sign-in.
Guided mode: accept any 4 to 5 digit number and show a hint chip "Demo code: 123456". Reject other codes once to show the failure path (scenario S2).

6. Chat component: message contract
The chat must render four message shapes. These are the exact shapes the agent's text channel emits (see utilities.js and AGENT_FUNCTIONS.md). Do not invent extra types.

AgentTurn

messages: Message[]

«union»

Message

TextMessage

text: string

CardMessage

card: Card

CarouselMessage

carousel: Carousel

QuickReplyMessage

quick_reply: QuickReply

Card

title: string

description: string "newline separated lines"

links: Link[]

Carousel

title: string

cards: CardMessage[]

QuickReply

links: Link[]

Link

title: string "button label"

type: "post_message"

value: string "sent as the user's message when tapped"





Rendering rules

Tap = type. Tapping a post_message link posts its value as a normal user bubble (visible in the transcript), then waits for the agent. The value is intentionally human-readable ("Resolve INC-109"); never hide it.
Quick replies appear directly under the preceding text, are single-use (disable or collapse after one is chosen or after the user types something), and wrap on narrow screens.
Card description is newline-separated Label: value lines. Render each on its own line with the label in a muted weight. Known labels: Status, Description, Resolution, Logged, Resolved or Updated, Latest note.
Carousel = horizontally scrollable cards, snap scrolling, with arrow controls on desktop. A single result is sent as one card, not a carousel.
Status badge: derive a colored chip from the Status: line (suggested: Logged = neutral, Active/Submitted = blue, Resolved = green, Cancelled/Closed = grey). Do not hard-fail on unknown statuses; fall back to neutral.
Show a typing indicator while waiting for the agent. State-changing and lookup calls may take a moment.
The agent never shows two troubleshooting fixes in one message and never pastes raw knowledge text. The UI should not try to reformat or merge messages.
6.1 Card variants to build and style
Variant	Where it appears	Title format	Action links on card
Incident card	Create result, status, search, list	INC-109: <subject>	Add a note always; Resolve unless status is Resolved/Closed
Service Request card	Same	SR-108: <subject>	Add a note always; Cancel only if cancelable and not Cancelled/Closed
Carousel of cards	Search with several hits, list	Carousel title "Here's what I found"	per card, as above
Example card (render exactly this):

{
  "card": {
    "title": "INC-109: VPN keeps dropping",
    "description": "Status: Logged\nDescription: VPN disconnects every ~10 minutes on home wifi since Monday.\nLogged: Oct 12, 2026\nLatest note: \"Already tried before this ticket was logged: restart, reinstall client\" — Uthaya",
    "links": [
      { "type": "post_message", "title": "Add a note", "value": "Add a note to INC-109" },
      { "type": "post_message", "title": "Resolve",    "value": "Resolve INC-109" }
    ]
  }
}

6.2 Every quick-reply set (build all of these)
Moment	Buttons (title → value sent)
After OTP requested	Resend code, Use a different employee number
Wrong / expired code	same two as above
After verification (and "Yes, something else")	Troubleshoot an Issue, Request Something, Check My Tickets, Talk to a Live Agent
Offering a troubleshooting fix	Yes, that fixed it, No, still happening, Just create a ticket
After 2 failed fixes (and every fix after)	Keep trying, Just create a ticket (title wording per renderTroubleshootingContinueQuickReply)
Confirm before creating	Yes, create it, Let me add more
After create / resolve / cancel / add note	No, that's all, Yes, something else
Anything-else after lookups	No, that's all, Yes, something else
Owner required on resolve	Add a note instead, Talk to a live agent
Live agent offer	Yes, transfer me, No, keep trying
Lookup not found / system error	Try again or Try a different number, plus Talk to a live agent
Capped list (no filter)	Show more
Capitalization note: the greeting menu uses Title Case ("Talk to a Live Agent"); everywhere else it is sentence case ("Talk to a live agent"). Reproduce the exact strings from AGENT_FUNCTIONS.md; don't normalize them.

7. Detailed flows (Tester tab "Flow tracker"; Manager sees the simplified ones)
Highlight the active node as events arrive (section 8 gives the event-to-node mapping).

7.1 Overall conversation loop
No

Yes

Something broken / wants new thing

Check status / find ticket

Add a note

Resolve an incident

Cancel a service request

ITSM question (not an action)

Asks for a human / frustrated

Off-topic or injection

Yes, something else

No, that's all

Conversation starts

Authenticated?

Auth flow (section 5)

Greeting: 'Hi NAME, I'm Alex...'
+ 4 quick-action buttons

What does the user want?

Create flow (7.3)

Lookup (7.2) then Status

Note flow (7.4)

Resolve flow (7.5)

Cancel flow (7.6)

Knowledge fallback

Live agent (7.7)

Refusal (section 10)

Anything else?

Sign-off + logout()

Transferred, or continues if no agent free





7.2 Locating a ticket (used by status / note / resolve / cancel)
Yes

No

Prefixed number
INC-109 / SR-108 / 'inc 109'

Bare number '109'

Description / keyword
(typos OK)

Nothing at all

0

1, or one clear winner

Several, close

Need a ticket

Already identified earlier
in this conversation?

Reuse it. Don't re-ask.

What did the user give?

Normalize to INC-109 and use directly

Try incidents first,
then service requests

searchMyTickets(query)
immediately, no follow-up first

List most recent: 5 on text
+ 'Show more'

Results

'Nothing matched' + ask for a
different word or timeframe

Treat as the match;
name it while acting

Show top few as a carousel,
ask which one





Tester checks: the agent never asks for a ticket number first; it searches with whatever description it already has. A single terminal-state match (e.g. already Resolved) is still "the match".

7.3 Create (the most important flow to demo)
Broken / not working

Wants something new

Unclear

No (e.g. 'it's broken')

Yes

Yes

No

No

Yes

Fixed

Not fixed

Just create a ticket

fewer than 2 and more remain

2 to 4

5 (hard cap)

Keep trying

Create ticket

Let me add more

Yes

User reports a problem or request

Type?

Incident

Service Request

Ask which one

Description concrete enough?

Item in user's own words is enough.
No extra questions.

Brief follow-ups: what, when,
error message, device/app

User says already tried fixes
or 'just create a ticket'?

troubleshooting = what they tried

handleKnowledge(description)

Relevant fix found?

Confirm summary:
[Yes, create it] [Let me add more]

Offer ONE fix
[Yes, that fixed it] [No, still happening] [Just create a ticket]

Reply

No ticket. Wrap up.

Fixes offered so far?

Ask: keep trying or log a ticket?
(asked every round from fix 3)

Ask what to add, fold in

Proceed

createIncident() / createServiceRequest()
(incident also stores 'Already tried...' note)

Detail card + 'Anything else?' buttons





Tester checks for Create:

createIncident is never called before handleKnowledge for a newly reported problem (unless the user already says they tried fixes or asks to skip).
Exactly one fix per message, on every round including the first. Never a list.
After 2 failed fixes the agent asks before offering more; never more than 5 fixes in a conversation.
A confirmation summary precedes every create (the one deliberate exception to "don't confirm").
Subject is short; symptom is the user's own words; troubleshooting text is not folded into the symptom (it goes in a separate note on the ticket).
service defaults to Corporate/Enterprise Applications and Software (or Clinical Applications and Software for EPIC-related). The user is never asked to pick it.
Service Requests skip troubleshooting entirely.
7.4 Add a note
Parse error on line 6:
... been added: \"...\"'<br/>+ Anything els...
-----------------------^
Expecting 'SQE', 'DOUBLECIRCLEEND', 'PE', '-)', 'STADIUMEND', 'SUBROUTINEEND', 'PIPE', 'CYLINDEREND', 'DIAMOND_STOP', 'TAGEND', 'TRAPEND', 'INVTRAPEND', 'UNICODE_TEXT', 'TEXT', 'TAGSTART', got 'STR'
7.5 Resolve an incident
Yes

No

No ('close it', 'don't need it')

Yes

No

Yes

200 OK

400 OWNER_REQUIRED_TO_RESOLVE

409 INCIDENT_ALREADY_RESOLVED

404 INCIDENT_NOT_FOUND

User wants to resolve

Locate ticket (7.2)

Is it a Service Request?

Hard stop: 'resolving applies to incidents.'
Ask if they meant Cancel. Wait.

Did the user actually say it's fixed / resolve?

Ask first. Don't assume.

Resolution text given?

Ask. 'issue is fixed' is acceptable

resolveIncident() directly
(no 'shall I go ahead?')

Result

'The incident has been resolved.'

'Support hasn't picked it up yet.'
[Add a note instead] [Talk to a live agent]
Never ask for an owner name.

Tell user it's already resolved.
Anything else? buttons

Try a different number / live agent





7.6 Cancel a service request
Yes

No

No

Yes

200 OK

409 SERVICE_REQ_NOT_CANCELABLE

409 SERVICE_REQ_ALREADY_CLOSED

404 SERVICE_REQ_NOT_FOUND

User wants to cancel

Locate ticket (7.2)

Is it an Incident?

Hard stop: 'cancelling applies to service requests.'
Ask if they meant Resolve. Wait.

Reason given?

Ask. 'no longer needed' is acceptable

cancelServiceRequest() directly

Result

'The service request has been cancelled successfully.'

Can no longer be cancelled at this stage.
Next-step buttons

Already closed/cancelled. Anything else?

Try a different number / live agent





7.7 Live-agent escalation
User explicitly asks for a human

Agent repeatedly failing across turns

Reopen an incident / mark a request fulfilled
(no tool exists)

Anger or distress in wording

No

Yes

Yes

No

Trigger

Ask: transfer to a live agent?
[Yes, transfer me] [No, keep trying]

Carry on normally

transferToLiveAgent(conversation_summary)

Agent available?

Handed off

Tell the user; offer to keep helping
or leave a message. Never go silent.





A normal business-rule answer (e.g. "only Submitted requests can be cancelled") is not a failure and must not trigger escalation.

8. Event model (drives panels, outcome counters and flow highlighting)
The page should normalize both Guided and Live traffic into a small internal event stream. Everything outside the chat (inspector, state viewer, counters, flow highlighting) is derived from it.

Guided player
(scenario JSON)

Event bus

Live adapter
(agent channel)

Chat renderer

Tool-call inspector

Session state viewer

Flow highlighter

Outcome counters (Manager)





Event	Payload	Consumed by
user_message	{ text, viaButton }	Chat
agent_message	{ messages: Message[] }	Chat
tool_call	{ name, args, http?: {method, path}, status?, result?, error? }	Inspector, Flow, State
state_change	{ key, value }	State viewer
flow_step	{ flowId, nodeId }	Flow highlighter
Outcome counters (Manager tab) derive from tool_call:

Counter	Increment when
Tickets created	createIncident or createServiceRequest succeeds
Resolved without a ticket	A fix reply "Yes, that fixed it" and no create call follows in that flow
Tickets updated	addIncidentNote / addServiceRequestNote / resolveIncident / cancelServiceRequest succeeds
Escalated	transferToLiveAgent is called
Tool catalogue (for inspector labelling and the "What Alex can do" copy). Function names match REST routes and MCP tools 1:1.

Tool	Purpose	State-changing	Notes
requestOtp / resendOtp / verifyOtp	Auth	Yes (session)	Public endpoints, no token
getMyIncidents / getMyServiceRequests	List / filter by number	No	No-filter list is capped at 5 (text) / 3 (voice); showAll for more
getIncidentDetails / getServiceRequestDetails	Full detail	No	Takes ticket number
searchMyTickets	Fuzzy search across both types	No	Ranked most-relevant-first
createIncident	New incident	Yes	Optional troubleshooting adds a note
createServiceRequest	New service request	Yes	No troubleshooting step
addIncidentNote / addServiceRequestNote	Comment	Yes	
resolveIncident	Resolve	Yes	Needs owner; resolution required
cancelServiceRequest	Cancel	Yes	Must be cancelable; reason required
handleKnowledge	KB lookup	No	Output is never shown raw to the user
transferToLiveAgent	Human hand-off	Yes	Carries a conversation summary
renderGreetingQuickReplies, offerTroubleshootingFix, renderTroubleshootingContinueQuickReply, renderConfirmCreateQuickReply, renderLiveAgentTransferQuickReply, renderAnythingElseQuickReply	UI-only	No	Produce quick-reply messages
logout (text) / hangupCall (voice)	End session	Yes (session)	
Error codes the inspector should label (human-readable text next to the code):

Code	HTTP	Meaning
OTP_INVALID_OR_EXPIRED	401	Wrong, expired or already-used code
EMPLOYEE_NOT_FOUND	404	Unknown employee number
INCIDENT_NOT_FOUND / SERVICE_REQ_NOT_FOUND	404	No such ticket for this user
OWNER_REQUIRED_TO_RESOLVE	400	No IT staff member has picked up the incident yet
INCIDENT_ALREADY_RESOLVED	409	Already Resolved/Closed
SERVICE_REQ_NOT_CANCELABLE	409	Can't be cancelled at its current stage
SERVICE_REQ_ALREADY_CLOSED	409	Already Cancelled/Closed
UNAUTHORIZED / TOKEN_INVALID / TOKEN_EXPIRED	401	Missing/bad/expired bearer token
RESOLUTION_REQUIRED, NOTES_BODY_REQUIRED, SUBJECT_REQUIRED, SYMPTOM_REQUIRED, SERVICE_REQUIRED	400	Missing required field
9. Scenario catalogue (Guided mode scripts, and Tester checklists)
Each scenario is a script of turns. The Manager tab shows only those marked M; Client tab shows those marked C as "Try asking"; Tester shows all.

ID	Title	Roles	Type
S1	Sign in successfully	M, C, T	Happy
S2	Wrong code, then resend	T	Edge
S3	Report a problem: troubleshoot, then ticket	M, C, T	Happy
S4	Report a problem: fixed by the first suggestion (no ticket)	M, C, T	Happy
S5	Report a problem: user skips troubleshooting	T	Happy
S6	Troubleshoot beyond 2 fixes, then the 5-fix cap	T	Edge
S7	Create a service request	C, T	Happy
S8	Find a ticket by description (typo)	C, T	Happy
S9	Find by number, bare number and prefixed	T	Happy
S10	List my tickets, then "Show more"	T	Happy
S11	Add a note (note text missing at first)	C, T	Happy
S12	Resolve an incident	M, T	Happy
S13	Resolve fails: owner required	T	Edge
S14	Resolve an already-resolved incident	T	Edge
S15	Cancel a service request	T	Happy
S16	Cancel fails: not cancelable	T	Edge
S17	Wrong type: resolve an SR / cancel an incident	T	Negative
S18	Ask an ITSM question (knowledge fallback)	C, T	Happy
S19	Ask for a human / escalate	M, T	Happy
S20	Unsupported ask (reopen incident) leads to escalation	T	Edge
S21	Off-topic request refused	T	Negative
S22	Prompt-injection attempt refused	T	Negative
S23	Ticket request before sign-in	T	Negative
Scenario JSON format (Guided mode)
Store scenarios as data, not code, so non-developers can add more.

{
  "id": "S3",
  "title": "Report a problem: troubleshoot, then ticket",
  "roles": ["manager", "client", "tester"],
  "type": "happy",
  "expected": [
    "Offers exactly one fix per message",
    "Asks for confirmation before creating",
    "Creates INC with the tried fix recorded as a note"
  ],
  "turns": [
    { "from": "user",  "text": "My VPN keeps dropping" },
    { "from": "agent", "tool_calls": [{ "name": "handleKnowledge", "args": { "query": "VPN keeps dropping" }, "result": "..." }],
      "messages": [
        { "text": "Let's start simple: fully quit the VPN client and reconnect. Did that work?" },
        { "quick_reply": { "links": [
          { "type": "post_message", "title": "Yes, that fixed it",  "value": "Yes, that fixed it." },
          { "type": "post_message", "title": "No, still happening", "value": "No, that didn't fix it." },
          { "type": "post_message", "title": "Just create a ticket", "value": "Just create a ticket for this." }
        ] } }
      ],
      "flow": { "flowId": "create", "nodeId": "OFFER" } }
  ]
}

Playback controls: Play / Pause / Next step / Restart, plus speed. User-authored turns in a scenario are shown as a suggested reply chip; in Guided mode the viewer may click it (sends the scripted text) or press Next. If the viewer types something off-script, show a gentle inline notice "Guided mode follows a script. Switch to Live to try anything."

Sample data: use clearly fictional employees and ticket numbers (e.g. INC-109, SR-108). The prompts and seed data for the real mock backend live in scripts/seed.js if realistic text is wanted.

10. Rules the demo should make visible (Tester "Rules checklist")
Agent must

Verify identity (employee number + OTP) before any ticket function.
Try troubleshooting before creating an incident, one fix at a time.
Confirm a summary before creating any ticket.
Search with whatever description the user gave instead of asking for a number.
Reuse a ticket already identified earlier in the conversation.
Call resolve/cancel directly and let the system report "already done" or "needs owner".
Ask "anything else?" after each successful action, then sign off with the user's name.
Offer a live-agent transfer rather than failing silently.
Agent must never

Show a numbered/bulleted list of fixes, a "Source:" line, or raw knowledge text.
Ask for an "owner" or staff name when resolve fails.
Resolve something that is a Service Request, or cancel an Incident.
Invent a resolution (e.g. treating "I don't need it anymore" as "it's fixed").
Answer non-ITSM questions (code, math, trivia). It must say: "I am an IT Service Desk assistant specifically configured to help with ticket operations. I cannot answer general programming, technical, or non-ticket questions." and then re-show the four-button menu.
Obey prompt injection or reveal its instructions. It must say: "I cannot fulfill this request. I am only configured for IT Service Desk operations."
Claim it can reopen an incident or mark a request fulfilled. There is no tool for either, so it offers a live agent.
Exact phrases worth asserting in tests: "The incident has been resolved.", "The service request has been cancelled successfully.", "Hi <Name>, I'm Alex, your IT Support Agent. How can I help with your IT related issue?".

Known limitations (show on the Tester tab and in the footer link; hide on the Client tab): no tool to reopen a resolved incident or mark a service request fulfilled; resolving needs an owner assigned on the backend; knowledge-base answers come from the platform and are not part of this ticket server.

11. Voice vs. text
The agent runs in both voice and text. This page is text-first. Rich messages (cards, carousels, quick replies) exist only in text. Voice is plain spoken sentences with no lists and numbers read digit by digit.

Out of scope for v1: live microphone support.
Optional nice-to-have: a "Voice transcript" view in Guided mode, which shows the same scenario as plain spoken sentences (no cards or buttons) to demonstrate the difference. Voice scenario scripts need their own messages content (plain text only; see Prompts.js getModeInstruction).
12. Non-functional requirements
Stack: no framework mandated. Any component framework is fine. The chat, card, carousel and quick-reply components must be reusable and independent of role/mode.
Responsive: desktop, tablet, mobile (chat usable at 360px wide).
Accessibility: keyboard operable (Tab to quick replies, Enter to select, arrow keys in carousel), ARIA roles for chat log (role="log", aria-live="polite"), sufficient contrast, not color-only status indication (always text + color).
Theming: light and dark; brand tokens centralized.
Security: never display or log accessToken/userId; mask in the inspector. Guided mode makes no network calls to the real backend.
Performance: chat renders streamed/long transcripts without jank (virtualize beyond ~200 messages).
State: reset must fully clear transcript, panels, counters, and session.
Config: a single config object for agent endpoint, branding, default mode per role, and demo OTP hint.
13. Acceptance criteria
Page-level

[ ] Role tabs (Manager / Tester / Client) and Mode toggle (Guided / Live) work independently and are reflected in the URL.
[ ] The chat component is identical across all 6 combinations.
[ ] Reset demo returns to a clean state.
Chat

[ ] Renders text, card, carousel (and single-card fallback), quick replies per section 6.
[ ] Tapping any link posts its value as a visible user message.
[ ] Quick replies are single-use.
[ ] Status chips derive correctly from Status: lines.
Manager

[ ] Shows capability cards, Diagram A with live highlighting, and the 5 headline scenarios.
[ ] Outcome counters update from events.
[ ] No tool names or error codes visible.
Tester

[ ] Full catalogue (S1 to S23) with expected-behaviour checklists and Pass/Fail/Skip + export.
[ ] Tool-call inspector shows function, args, HTTP call, status, error code; tokens masked.
[ ] Session state viewer and detailed flow tracker highlight the current step.
Client

[ ] Clean chat, "Try asking" prompts, no internals, "Sample data" badge in Guided mode.
Guided mode

[ ] All 23 scenarios play back with Play/Pause/Next/Restart and make no real network calls.
Live mode

[ ] Connects through the adapter interface; auth, create, lookup, note, resolve, cancel all work end to end against the deployed agent.
14. Open questions for the product/backend owner
Live-mode transport: embed the Avaamo web-channel widget, or call a messaging API directly? (Determines how tool-call events are obtained for the Tester inspector. The platform may not expose them to a browser client, in which case the inspector in Live mode would need a backend relay or be limited to the chat-visible output.)
Branding: logo, colors, product name for the page header.
Demo employee: which employee number(s) can be used in Live mode, and where do testers get the OTP (real email inbox)?
Test-data reset: is there an approved way to reseed the demo database between Live sessions (npm run seed on the server)? Note that running the automated test suite also mutates that database.
Metrics: do managers want real numbers (deflection rate, tickets per day) later? If so, a data source is needed; this spec only counts in-session events.
Stale docs: AGENT_FLOWS.md still shows the old note confirmation wording ("Your note has been added.") and has no auth flow; this spec follows the current prompts. Consider refreshing it.
