import { createFileRoute } from "@tanstack/react-router";
import * as contentData from "virtual:prestige/content/docs/theme-provider-reference";
import { ContentRoute } from "@lonik/prestige/ui";

export const Route = createFileRoute('/(prestige)/docs/theme-provider-reference')(ContentRoute(contentData));
