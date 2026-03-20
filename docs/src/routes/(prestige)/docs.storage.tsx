import { createFileRoute } from "@tanstack/react-router";
import * as contentData from "virtual:prestige/content/docs/storage";
import { ContentRoute } from "@lonik/prestige/ui";

export const Route = createFileRoute('/(prestige)/docs/storage')(ContentRoute(contentData));
