import { createFileRoute } from "@tanstack/react-router";
import * as contentData from "virtual:prestige/content/docs/hydration";
import { ContentRoute } from "@lonik/prestige/ui";

export const Route = createFileRoute('/(prestige)/docs/hydration')(ContentRoute(contentData));
