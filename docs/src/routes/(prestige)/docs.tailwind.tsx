import { createFileRoute } from "@tanstack/react-router";
import * as contentData from "virtual:prestige/content/docs/tailwind";
import { ContentRoute } from "@lonik/prestige/ui";

export const Route = createFileRoute('/(prestige)/docs/tailwind')(ContentRoute(contentData));
