import { defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import siteInfoTool from "./tools/site-info";

export default defineMcp({
  name: "yrc-mcp",
  title: "YRC MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Yamaha Riders Club website. Use `echo` to verify connectivity and `get_site_info` to learn about the site's pages and sections.",
  tools: [echoTool, siteInfoTool],
});