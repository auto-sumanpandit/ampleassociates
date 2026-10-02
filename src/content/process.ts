/** How Ample moves from an idea to a delivered project. */
export const developmentProcess = [
  {
    title: "Identify",
    short: "Find opportunities with a real need behind them.",
    body: "Projects, land, businesses or partnerships where there is a clear reason for the project to exist: a housing need, a site with access, an operating business that needs capital.",
    checks: ["Commercial logic", "Location", "Who owns what"],
  },
  {
    title: "Assess",
    short: "Test the basics before spending money.",
    body: "An initial review of demand, site, ownership and stage. Most ideas stop here, and that is the point of the step.",
    checks: ["Demand", "Site and access", "Current stage"],
  },
  {
    title: "Feasibility",
    short: "Check that it can work commercially, technically and legally.",
    body: "Costs, design, approvals and the legal route are worked through together, because a problem in one usually shows up in the others.",
    checks: ["Commercial", "Technical", "Legal", "Financial"],
  },
  {
    title: "Due diligence",
    short: "Verify documents rather than accept them.",
    body: "Title, approvals, company records and financial information are checked, and risks are written down rather than assumed away.",
    checks: ["Ownership and title", "Approvals", "Financial records", "Risk register"],
  },
  {
    title: "Structure",
    short: "Decide who owns, funds and runs the project.",
    body: "The project company, funding model, governance and roles are agreed and documented before anyone is invited to take part.",
    checks: ["Project company", "Funding model", "Governance", "Investor rights"],
  },
  {
    title: "Partner",
    short: "Introduce the right people, with the right information.",
    body: "Suitable investors, buyers or strategic partners are introduced to the opportunity with the information appropriate to their stage.",
    checks: ["Qualified introductions", "Information packs", "Meetings"],
  },
  {
    title: "Develop",
    short: "Deliver the project.",
    body: "Ample develops the project or supports its delivery, depending on its role, which is stated on each project page.",
    checks: ["Contractors", "Budget control", "Milestones"],
  },
  {
    title: "Monitor & report",
    short: "Keep people informed with dated, specific updates.",
    body: "Progress, costs, milestones and risks are tracked, and participants receive updates according to the project's agreements.",
    checks: ["Progress", "Costs", "Risks", "Dated updates"],
  },
  {
    title: "Complete or exit",
    short: "Finish according to what was agreed.",
    body: "Sale, handover, refinancing, distribution or long-term ownership, as set out in the relevant agreements from the start.",
    checks: ["Handover or sale", "Distribution", "Long-term hold"],
  },
] as const;

/** The public investor journey, shown on Investor Centre and elsewhere. */
export const investorJourney = [
  {
    title: "Explore",
    body: "Review the projects and sectors on this site, including the risks.",
  },
  {
    title: "Get in touch",
    body: "Tell us which sectors or projects interest you. This is not a commitment.",
  },
  {
    title: "Conversation",
    body: "A member of the team talks with you to understand what you are looking for and whether a current project fits.",
  },
  {
    title: "Project information",
    body: "Where appropriate, you receive the project pack. More sensitive documents are shared at a later stage.",
  },
  {
    title: "Due diligence",
    body: "You review title, approvals, structure and costs, ideally with your own lawyer and adviser.",
  },
  {
    title: "Agreements",
    body: "If you decide to proceed, the legal agreements set out rights, obligations, timing and exit.",
  },
  {
    title: "Updates",
    body: "Participants receive dated project updates through to completion.",
  },
] as const;
