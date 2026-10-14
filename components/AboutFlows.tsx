import { Box, Decision, Edge, Label } from "./AboutFlowDiagram";

type Side = "t" | "b" | "l" | "r";
type Tone = "default" | "primary" | "success" | "warn";

type FlowNode = {
  id: string;
  col: number;
  row: number;
  lines: string[];
  decision?: boolean;
  tone?: Tone;
};

type FlowEdge = {
  from: string;
  to: string;
  fs?: Side;
  ts?: Side;
  label?: string;
  labelAt?: "start" | "end";
  dashed?: boolean;
  via?: [number, number][];
};

type Flow = {
  id: string;
  title: string;
  summary: string;
  colW: number;
  boxW: number;
  rowH: number;
  nodes: FlowNode[];
  edges: FlowEdge[];
  checks?: string[];
};

const TOP = 44;
const DECISION_H = 76;

const FLOWS: Flow[] = [
  {
    id: "loop",
    title: "Overall conversation loop",
    summary:
      "Every conversation starts with sign-in, then Alex routes the request to one of the flows below and keeps asking if there is anything else.",
    colW: 175,
    boxW: 155,
    rowH: 110,
    nodes: [
      { id: "start", col: 3.5, row: 0, lines: ["Conversation starts"], tone: "primary" },
      { id: "auth", col: 3.5, row: 1, lines: ["Authenticated?"], decision: true },
      { id: "authflow", col: 5.5, row: 1, lines: ["Auth flow", "(see sign-in section)"] },
      { id: "greet", col: 3.5, row: 2, lines: ["Greeting + 4", "quick-action buttons"] },
      { id: "want", col: 3.5, row: 3, lines: ["What does the", "user want?"], decision: true },
      { id: "create", col: 0, row: 4, lines: ["Create flow", "(7.3)"] },
      { id: "lookup", col: 1, row: 4, lines: ["Lookup (7.2)", "then status"] },
      { id: "note", col: 2, row: 4, lines: ["Note flow", "(7.4)"] },
      { id: "resolve", col: 3, row: 4, lines: ["Resolve flow", "(7.5)"] },
      { id: "cancel", col: 4, row: 4, lines: ["Cancel flow", "(7.6)"] },
      { id: "kb", col: 5, row: 4, lines: ["Knowledge", "fallback"] },
      { id: "live", col: 6, row: 4, lines: ["Live agent", "(7.7)"], tone: "warn" },
      { id: "refuse", col: 7, row: 4, lines: ["Refusal", "off-topic / injection"] },
      { id: "transferred", col: 6, row: 5, lines: ["Transferred, or", "carries on"], tone: "success" },
      { id: "more", col: 3.5, row: 5, lines: ["Anything else?"], decision: true },
      { id: "signoff", col: 3.5, row: 6, lines: ["Sign-off + logout()"], tone: "primary" },
    ],
    edges: [
      { from: "start", to: "auth" },
      { from: "auth", to: "greet", label: "Yes" },
      { from: "auth", to: "authflow", label: "No" },
      { from: "authflow", to: "greet", fs: "b", ts: "r" },
      { from: "greet", to: "want" },
      ...["create", "lookup", "note", "resolve", "cancel", "kb", "live", "refuse"].map(
        (to) => ({ from: "want", to }),
      ),
      ...["create", "lookup", "note", "resolve", "cancel", "kb", "refuse"].map(
        (from) => ({ from, to: "more" }),
      ),
      { from: "live", to: "transferred" },
      { from: "more", to: "signoff", label: "No, that's all" },
      {
        from: "more",
        to: "want",
        fs: "l",
        ts: "l",
        label: "Yes, something else",
        dashed: true,
        via: [
          [-0.6, 5],
          [-0.6, 3],
        ],
      },
    ],
  },
  {
    id: "locate",
    title: "Locating a ticket",
    summary:
      "Used by status, note, resolve and cancel. Alex never asks for a ticket number first. It searches with whatever description it already has.",
    colW: 240,
    boxW: 210,
    rowH: 110,
    nodes: [
      { id: "need", col: 1.5, row: 0, lines: ["Need a ticket"], tone: "primary" },
      { id: "known", col: 1.5, row: 1, lines: ["Already identified", "in this conversation?"], decision: true },
      { id: "reuse", col: 3, row: 1, lines: ["Reuse it.", "Don't re-ask."], tone: "success" },
      { id: "what", col: 1.5, row: 2, lines: ["What did the", "user give?"], decision: true },
      { id: "prefixed", col: 0, row: 3, lines: ["Prefixed number", "INC-109 / inc 109"] },
      { id: "bare", col: 1, row: 3, lines: ["Bare number", "109"] },
      { id: "desc", col: 2, row: 3, lines: ["Description / keyword", "(typos OK)"] },
      { id: "none", col: 3, row: 3, lines: ["Nothing at all"] },
      { id: "norm", col: 0, row: 4, lines: ["Normalize to INC-109", "and use directly"] },
      { id: "try", col: 1, row: 4, lines: ["Try incidents first,", "then service requests"] },
      { id: "search", col: 2, row: 4, lines: ["searchMyTickets(query)", "immediately"] },
      { id: "list", col: 3, row: 4, lines: ["List most recent:", "5 on text + Show more"] },
      { id: "results", col: 2, row: 5, lines: ["Results?"], decision: true },
      { id: "zero", col: 1, row: 6, lines: ["\"Nothing matched\"", "ask for a different", "word or timeframe"] },
      { id: "one", col: 2, row: 6, lines: ["Treat as the match;", "name it while acting"], tone: "success" },
      { id: "several", col: 3, row: 6, lines: ["Show top few as a", "carousel, ask which"] },
    ],
    edges: [
      { from: "need", to: "known" },
      { from: "known", to: "reuse", label: "Yes" },
      { from: "known", to: "what", label: "No" },
      ...["prefixed", "bare", "desc", "none"].map((to) => ({
        from: "what",
        to,
      })),
      { from: "prefixed", to: "norm" },
      { from: "bare", to: "try" },
      { from: "desc", to: "search" },
      { from: "none", to: "list" },
      { from: "search", to: "results" },
      { from: "results", to: "zero", label: "0", labelAt: "end" },
      { from: "results", to: "one", label: "1, or one clear winner", labelAt: "end" },
      { from: "results", to: "several", label: "Several, close", labelAt: "end" },
    ],
    checks: [
      "The agent never asks for a ticket number first.",
      "A single terminal-state match (for example already Resolved) is still the match.",
    ],
  },
  {
    id: "create",
    title: "Create a ticket",
    summary:
      "The most important flow. Incidents get troubleshooting first, one fix per message. Every ticket is confirmed before it is created.",
    colW: 250,
    boxW: 215,
    rowH: 108,
    nodes: [
      { id: "start", col: 2, row: 0, lines: ["User reports a problem", "or request"], tone: "primary" },
      { id: "type", col: 2, row: 1, lines: ["Type?"], decision: true },
      { id: "inc", col: 1, row: 2, lines: ["Incident", "(something is broken)"] },
      { id: "ask", col: 2, row: 2, lines: ["Ask which one,", "then continue"] },
      { id: "sr", col: 3, row: 2, lines: ["Service Request", "(skips troubleshooting)"] },
      { id: "concrete", col: 1, row: 3, lines: ["Description concrete", "enough?"], decision: true },
      { id: "more", col: 0, row: 3, lines: ["Brief follow-ups: what,", "when, error, device/app"] },
      { id: "tried", col: 1, row: 4, lines: ["Tried fixes already", "or skip?"], decision: true },
      { id: "usetried", col: 2, row: 4, lines: ["troubleshooting =", "what they tried"] },
      { id: "know", col: 1, row: 5, lines: ["handleKnowledge", "(description)"] },
      { id: "found", col: 1, row: 6, lines: ["Relevant fix", "found?"], decision: true },
      {
        id: "offer",
        col: 1,
        row: 7,
        lines: ["Offer ONE fix", "[Yes, that fixed it]", "[No, still happening]", "[Just create a ticket]"],
      },
      { id: "reply", col: 1, row: 8, lines: ["Reply?"], decision: true },
      { id: "fixed", col: 0, row: 8, lines: ["No ticket.", "Wrap up."], tone: "success" },
      { id: "cnt", col: 1, row: 9, lines: ["Fixes offered", "so far?"], decision: true },
      { id: "keep", col: 1, row: 10, lines: ["Ask: keep trying", "or log a ticket?"] },
      {
        id: "confirm",
        col: 3,
        row: 11,
        lines: ["Confirm summary", "[Yes, create it]", "[Let me add more]"],
      },
      { id: "creply", col: 3, row: 12, lines: ["Reply?"], decision: true },
      { id: "addmore", col: 2, row: 12, lines: ["Ask what to add,", "fold it in"] },
      {
        id: "create",
        col: 3,
        row: 13,
        lines: ["createIncident() /", "createServiceRequest()", "(incident also stores an", "\"Already tried...\" note)"],
      },
      { id: "done", col: 3, row: 14, lines: ["Detail card +", "\"Anything else?\" buttons"], tone: "success" },
    ],
    edges: [
      { from: "start", to: "type" },
      { from: "type", to: "inc", label: "Broken", labelAt: "end" },
      { from: "type", to: "ask", label: "Unclear", labelAt: "end" },
      { from: "type", to: "sr", label: "Wants something new", labelAt: "end" },
      { from: "inc", to: "concrete" },
      { from: "concrete", to: "more", label: "No" },
      { from: "more", to: "tried" },
      { from: "concrete", to: "tried", label: "Yes" },
      { from: "tried", to: "usetried", label: "Yes" },
      { from: "tried", to: "know", label: "No" },
      { from: "know", to: "found" },
      { from: "found", to: "offer", label: "Yes" },
      { from: "found", to: "confirm", fs: "r", ts: "t", label: "No" },
      { from: "offer", to: "reply" },
      { from: "reply", to: "fixed", label: "Fixed" },
      { from: "reply", to: "cnt", label: "Not fixed" },
      { from: "reply", to: "confirm", fs: "r", ts: "t", label: "Just create a ticket" },
      {
        from: "cnt",
        to: "offer",
        fs: "l",
        ts: "l",
        label: "Fewer than 2",
        dashed: true,
        via: [
          [-0.5, 9],
          [-0.5, 7],
        ],
      },
      { from: "cnt", to: "keep", label: "2 to 4" },
      { from: "cnt", to: "confirm", fs: "r", ts: "t", label: "5 (hard cap)" },
      { from: "keep", to: "confirm", fs: "r", ts: "t", label: "Just create a ticket" },
      {
        from: "keep",
        to: "offer",
        fs: "l",
        ts: "l",
        label: "Keep trying",
        dashed: true,
        via: [
          [-0.9, 10],
          [-0.9, 7],
        ],
      },
      { from: "usetried", to: "confirm", fs: "b", ts: "t" },
      { from: "sr", to: "confirm" },
      { from: "confirm", to: "creply" },
      { from: "creply", to: "addmore", label: "Let me add more" },
      { from: "addmore", to: "confirm", fs: "t", ts: "l", dashed: true },
      { from: "creply", to: "create", label: "Yes, create it" },
      { from: "create", to: "done" },
    ],
    checks: [
      "createIncident is never called before handleKnowledge for a newly reported problem, unless the user already tried fixes or asks to skip.",
      "Exactly one fix per message, on every round including the first. Never a list.",
      "After 2 failed fixes the agent asks before offering more, and never offers more than 5 in a conversation.",
      "A confirmation summary precedes every create.",
      "Troubleshooting text goes in a separate note on the ticket, not in the symptom.",
      "The service defaults automatically. The user is never asked to pick it.",
    ],
  },
  {
    id: "note",
    title: "Add a note",
    summary:
      "Works on any ticket. If the note text is missing, Alex asks for it, then adds the note and confirms with the text.",
    colW: 250,
    boxW: 215,
    rowH: 108,
    nodes: [
      { id: "start", col: 1, row: 0, lines: ["User wants to add a note"], tone: "primary" },
      { id: "loc", col: 1, row: 1, lines: ["Locate ticket (7.2)"] },
      { id: "has", col: 1, row: 2, lines: ["Note text given?"], decision: true },
      { id: "ask", col: 2, row: 2, lines: ["Ask what to add"] },
      { id: "call", col: 1, row: 3, lines: ["addIncidentNote /", "addServiceRequestNote"] },
      { id: "res", col: 1, row: 4, lines: ["Result"], decision: true },
      { id: "ok", col: 0, row: 5, lines: ["Note added,", "confirmed with its text"], tone: "success" },
      { id: "err", col: 2, row: 5, lines: ["Error: tell the user,", "offer to retry or a", "live agent"], tone: "warn" },
      { id: "more", col: 0, row: 6, lines: ["\"Anything else?\"", "buttons"] },
    ],
    edges: [
      { from: "start", to: "loc" },
      { from: "loc", to: "has" },
      { from: "has", to: "call", label: "Yes" },
      { from: "has", to: "ask", label: "No" },
      { from: "ask", to: "call" },
      { from: "call", to: "res" },
      { from: "res", to: "ok", label: "200 OK", labelAt: "end" },
      { from: "res", to: "err", label: "Error", labelAt: "end" },
      { from: "ok", to: "more" },
    ],
  },
  {
    id: "resolve",
    title: "Resolve an incident",
    summary:
      "Incidents only. Alex calls resolve directly and lets the system report that it is already done or needs an owner.",
    colW: 260,
    boxW: 225,
    rowH: 108,
    nodes: [
      { id: "start", col: 1.5, row: 0, lines: ["User wants to resolve"], tone: "primary" },
      { id: "loc", col: 1.5, row: 1, lines: ["Locate ticket (7.2)"] },
      { id: "isSr", col: 1.5, row: 2, lines: ["Is it a", "Service Request?"], decision: true },
      { id: "stop", col: 3, row: 2, lines: ["Hard stop: resolving", "applies to incidents.", "Ask if they meant Cancel."], tone: "warn" },
      { id: "said", col: 1.5, row: 3, lines: ["Did the user say", "it is fixed?"], decision: true },
      { id: "askfirst", col: 3, row: 3, lines: ["Ask first.", "Don't assume."] },
      { id: "text", col: 1.5, row: 4, lines: ["Resolution text", "given?"], decision: true },
      { id: "asktext", col: 3, row: 4, lines: ["Ask. \"issue is fixed\"", "is acceptable"] },
      { id: "call", col: 1.5, row: 5, lines: ["resolveIncident() directly", "(no \"shall I go ahead?\")"] },
      { id: "res", col: 1.5, row: 6, lines: ["Result"], decision: true },
      { id: "ok", col: 0, row: 7, lines: ["\"The incident has", "been resolved.\"", "Then \"Anything else?\""], tone: "success" },
      {
        id: "owner",
        col: 1,
        row: 7,
        lines: ["Support has not picked", "it up yet.", "[Add a note instead]", "[Talk to a live agent]"],
        tone: "warn",
      },
      { id: "already", col: 2, row: 7, lines: ["Tell user it is already", "resolved. Anything else?"] },
      { id: "nf", col: 3, row: 7, lines: ["Try a different number", "or a live agent"] },
    ],
    edges: [
      { from: "start", to: "loc" },
      { from: "loc", to: "isSr" },
      { from: "isSr", to: "stop", label: "Yes" },
      { from: "isSr", to: "said", label: "No" },
      { from: "said", to: "askfirst", label: "No" },
      { from: "said", to: "text", label: "Yes" },
      { from: "text", to: "asktext", label: "No" },
      { from: "text", to: "call", label: "Yes" },
      { from: "call", to: "res" },
      { from: "res", to: "ok", label: "200 OK", labelAt: "end" },
      { from: "res", to: "owner", label: "400 OWNER_REQUIRED", labelAt: "end" },
      { from: "res", to: "already", label: "409 ALREADY_RESOLVED", labelAt: "end" },
      { from: "res", to: "nf", label: "404 NOT_FOUND", labelAt: "end" },
    ],
    checks: [
      "Never ask for an owner or staff name when resolve fails.",
      "Never treat \"I don't need it anymore\" as \"it's fixed\".",
    ],
  },
  {
    id: "cancel",
    title: "Cancel a service request",
    summary:
      "Service requests only, and only if cancelable. A reason is required, and \"no longer needed\" is enough.",
    colW: 260,
    boxW: 225,
    rowH: 108,
    nodes: [
      { id: "start", col: 1.5, row: 0, lines: ["User wants to cancel"], tone: "primary" },
      { id: "loc", col: 1.5, row: 1, lines: ["Locate ticket (7.2)"] },
      { id: "isInc", col: 1.5, row: 2, lines: ["Is it an", "Incident?"], decision: true },
      { id: "stop", col: 3, row: 2, lines: ["Hard stop: cancelling", "applies to service requests.", "Ask if they meant Resolve."], tone: "warn" },
      { id: "reason", col: 1.5, row: 3, lines: ["Reason given?"], decision: true },
      { id: "askr", col: 3, row: 3, lines: ["Ask. \"no longer needed\"", "is acceptable"] },
      { id: "call", col: 1.5, row: 4, lines: ["cancelServiceRequest()", "directly"] },
      { id: "res", col: 1.5, row: 5, lines: ["Result"], decision: true },
      { id: "ok", col: 0, row: 6, lines: ["\"The service request has", "been cancelled successfully.\"", "+ next-step buttons"], tone: "success" },
      { id: "nc", col: 1, row: 6, lines: ["Can no longer be", "cancelled at this stage"], tone: "warn" },
      { id: "closed", col: 2, row: 6, lines: ["Already closed or", "cancelled. Anything else?"] },
      { id: "nf", col: 3, row: 6, lines: ["Try a different number", "or a live agent"] },
    ],
    edges: [
      { from: "start", to: "loc" },
      { from: "loc", to: "isInc" },
      { from: "isInc", to: "stop", label: "Yes" },
      { from: "isInc", to: "reason", label: "No" },
      { from: "reason", to: "askr", label: "No" },
      { from: "reason", to: "call", label: "Yes" },
      { from: "call", to: "res" },
      { from: "res", to: "ok", label: "200 OK", labelAt: "end" },
      { from: "res", to: "nc", label: "409 NOT_CANCELABLE", labelAt: "end" },
      { from: "res", to: "closed", label: "409 ALREADY_CLOSED", labelAt: "end" },
      { from: "res", to: "nf", label: "404 NOT_FOUND", labelAt: "end" },
    ],
  },
  {
    id: "live",
    title: "Live-agent escalation",
    summary:
      "Alex offers a human rather than failing silently. A normal business-rule answer, such as \"only Submitted requests can be cancelled\", is not a failure and never triggers escalation.",
    colW: 260,
    boxW: 225,
    rowH: 108,
    nodes: [
      { id: "t1", col: 0, row: 0, lines: ["User explicitly", "asks for a human"] },
      { id: "t2", col: 1, row: 0, lines: ["Agent repeatedly", "failing across turns"] },
      { id: "t3", col: 2, row: 0, lines: ["Reopen incident / mark", "request fulfilled", "(no tool exists)"] },
      { id: "t4", col: 3, row: 0, lines: ["Anger or distress", "in the wording"] },
      {
        id: "offer",
        col: 1.5,
        row: 1,
        lines: ["Ask: transfer to a", "live agent?", "[Yes, transfer me]", "[No, keep trying]"],
      },
      { id: "reply", col: 1.5, row: 2, lines: ["Reply?"], decision: true },
      { id: "carry", col: 3, row: 2, lines: ["Carry on normally"] },
      { id: "transfer", col: 1.5, row: 3, lines: ["transferToLiveAgent", "(conversation_summary)"] },
      { id: "avail", col: 1.5, row: 4, lines: ["Agent available?"], decision: true },
      { id: "noagent", col: 3, row: 4, lines: ["Tell the user; offer to", "keep helping or leave a", "message. Never go silent."], tone: "warn" },
      { id: "handed", col: 1.5, row: 5, lines: ["Handed off"], tone: "success" },
    ],
    edges: [
      ...["t1", "t2", "t3", "t4"].map((from) => ({ from, to: "offer" })),
      { from: "offer", to: "reply" },
      { from: "reply", to: "carry", label: "No" },
      { from: "reply", to: "transfer", label: "Yes" },
      { from: "transfer", to: "avail" },
      { from: "avail", to: "noagent", label: "No" },
      { from: "avail", to: "handed", label: "Yes" },
    ],
  },
];

type Placed = FlowNode & {
  cx: number;
  cy: number;
  w: number;
  h: number;
};

function layout(flow: Flow) {
  const place = (col: number, row: number): [number, number] => [
    col * flow.colW + flow.colW / 2,
    row * flow.rowH + TOP,
  ];

  const placed = new Map<string, Placed>();
  for (const node of flow.nodes) {
    const [cx, cy] = place(node.col, node.row);
    const h = node.decision
      ? DECISION_H
      : Math.max(52, node.lines.length * 16 + 22);
    const w = node.decision ? flow.boxW + 10 : flow.boxW;
    placed.set(node.id, { ...node, cx, cy, w, h });
  }

  let minX = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const n of placed.values()) {
    minX = Math.min(minX, n.cx - n.w / 2);
    maxX = Math.max(maxX, n.cx + n.w / 2);
    maxY = Math.max(maxY, n.cy + n.h / 2);
  }
  for (const edge of flow.edges) {
    for (const [col, row] of edge.via ?? []) {
      const [x] = place(col, row);
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
    }
  }

  return { placed, place, minX: minX - 24, maxX: maxX + 24, maxY: maxY + 24 };
}

function anchor(n: Placed, side: Side): [number, number] {
  if (side === "t") return [n.cx, n.cy - n.h / 2];
  if (side === "b") return [n.cx, n.cy + n.h / 2];
  if (side === "l") return [n.cx - n.w / 2, n.cy];
  return [n.cx + n.w / 2, n.cy];
}

const isVertical = (s: Side) => s === "t" || s === "b";

function route(a: [number, number], sa: Side, b: [number, number], sb: Side) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  if (isVertical(sa) && isVertical(sb)) {
    if (x1 === x2) return `M${x1} ${y1} V${y2}`;
    const ym = (y1 + y2) / 2;
    return `M${x1} ${y1} V${ym} H${x2} V${y2}`;
  }
  if (!isVertical(sa) && !isVertical(sb)) {
    if (y1 === y2) return `M${x1} ${y1} H${x2}`;
    const xm = (x1 + x2) / 2;
    return `M${x1} ${y1} H${xm} V${y2} H${x2}`;
  }
  if (isVertical(sa)) return `M${x1} ${y1} V${y2} H${x2}`;
  return `M${x1} ${y1} H${x2} V${y2}`;
}

function defaultSides(from: Placed, to: Placed): [Side, Side] {
  if (to.row > from.row) return ["b", "t"];
  if (to.row < from.row) return ["t", "b"];
  return to.col > from.col ? ["r", "l"] : ["l", "r"];
}

function labelPos(
  at: [number, number],
  side: Side,
  edgeEnd: boolean,
): { x: number; y: number; anchor: "start" | "end" } {
  const [x, y] = at;
  if (edgeEnd) {
    if (side === "t") return { x: x + 6, y: y - 8, anchor: "start" };
    if (side === "b") return { x: x + 6, y: y + 14, anchor: "start" };
    if (side === "l") return { x: x - 6, y: y - 8, anchor: "end" };
    return { x: x + 6, y: y - 8, anchor: "start" };
  }
  if (side === "b") return { x: x + 6, y: y + 16, anchor: "start" };
  if (side === "t") return { x: x + 6, y: y - 8, anchor: "start" };
  if (side === "l") return { x: x - 8, y: y - 7, anchor: "end" };
  return { x: x + 8, y: y - 7, anchor: "start" };
}

function FlowChart({ flow }: { flow: Flow }) {
  const { placed, place, minX, maxX, maxY } = layout(flow);
  const width = maxX - minX;
  const titleId = `flow-${flow.id}-title`;

  return (
    <svg
      viewBox={`${minX} 0 ${width} ${maxY}`}
      role="img"
      aria-labelledby={titleId}
      className="mx-auto h-auto w-full"
      style={{ minWidth: Math.min(width, 820) }}
    >
      <title id={titleId}>{flow.title}</title>
      <defs>
        <marker
          id="about-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" className="fill-primary-400" />
        </marker>
      </defs>

      {flow.edges.map((edge, i) => {
        const from = placed.get(edge.from)!;
        const to = placed.get(edge.to)!;
        const [defFs, defTs] = defaultSides(from, to);
        const fs = edge.fs ?? defFs;
        const ts = edge.ts ?? defTs;
        const a = anchor(from, fs);
        const b = anchor(to, ts);

        let d: string;
        if (edge.via) {
          const pts = [a, ...edge.via.map(([c, r]) => place(c, r)), b];
          d = pts.map(([x, y], j) => `${j === 0 ? "M" : "L"}${x} ${y}`).join(" ");
        } else {
          d = route(a, fs, b, ts);
        }

        const atEnd = edge.labelAt === "end";
        const pos = edge.label
          ? labelPos(atEnd ? b : a, atEnd ? ts : fs, atEnd)
          : null;

        return (
          <g key={`${edge.from}-${edge.to}-${i}`}>
            <Edge d={d} dashed={edge.dashed} />
            {pos && edge.label && (
              <Label x={pos.x} y={pos.y} anchor={pos.anchor}>
                {edge.label}
              </Label>
            )}
          </g>
        );
      })}

      {[...placed.values()].map((n) =>
        n.decision ? (
          <Decision
            key={n.id}
            cx={n.cx}
            cy={n.cy}
            w={n.w}
            h={n.h}
            lines={n.lines}
          />
        ) : (
          <Box
            key={n.id}
            cx={n.cx}
            y={n.cy - n.h / 2}
            w={n.w}
            h={n.h}
            lines={n.lines}
            tone={n.tone}
          />
        ),
      )}
    </svg>
  );
}

export const FLOW_LINKS = FLOWS.map(({ id, title }) => ({ id, title }));

export default function AboutFlows() {
  return (
    <div className="space-y-10">
      {FLOWS.map((flow, i) => (
        <article
          key={flow.id}
          id={`flow-${flow.id}`}
          className="scroll-mt-24 rounded-3xl border border-border-subtle bg-white p-5 shadow-sm sm:p-8"
        >
          <p className="text-[13px] font-semibold uppercase tracking-wide text-primary-600">
            Flow {i + 1} of {FLOWS.length}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {flow.title}
          </h3>
          <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted">
            {flow.summary}
          </p>

          <div className="mt-6 overflow-x-auto">
            <FlowChart flow={flow} />
          </div>

          {flow.checks && (
            <div className="mt-6 rounded-2xl bg-primary-50/60 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-wide text-primary-700">
                What to check
              </p>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[14.5px] leading-relaxed text-muted">
                {flow.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
