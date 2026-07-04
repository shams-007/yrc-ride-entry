import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "get_site_info",
  title: "Get site info",
  description:
    "Return high-level information about the YRC (Yamaha Riders Club) website, including its main sections and pages.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = {
      name: "Yamaha Riders Club (YRC)",
      description:
        "Community website for Yamaha motorcycle riders, featuring events, branches, membership info, and road safety initiatives.",
      pages: [
        { path: "/", title: "Home" },
        { path: "/events", title: "Events" },
        { path: "/road-safety", title: "Road Safety" },
      ],
      sections: [
        "Hero",
        "Press Strip",
        "Stats",
        "About",
        "Testimonials",
        "Branches",
        "Annual Conclave",
        "Road Safety",
        "Events",
        "Gallery",
        "FAQ",
        "Membership",
        "CTA Banner",
      ],
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});

// Keep zod import used to satisfy typing consistency across tool files.
void z;