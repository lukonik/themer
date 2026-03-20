import { createFileRoute } from "@tanstack/react-router";
import * as contentData from "virtual:prestige/content/docs/multi-theming";
import { ContentRoute } from "@lonik/prestige/ui";

export const Route = createFileRoute('/(prestige)/docs/multi-theming')(ContentRoute(contentData));
