import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "./theme";

vi.mock("@tanstack/react-router", () => ({
  ScriptOnce: ({ children }: { children: string }) => (
    <script dangerouslySetInnerHTML={{ __html: children }} />
  ),
}));

const DummyComponent = () => {
  const { theme } = useTheme();
  return <div>Current theme: {theme}</div>;
};

describe("SSR Compatibility", () => {
  it("renders to an HTML string without crashing", () => {
    const html = renderToString(
      <ThemeProvider>
        <DummyComponent />
      </ThemeProvider>
    );
    
    // Check if the output contains the rendered content
    expect(html).toContain("Current theme:");
    // Check if it renders the script tag (ThemeScript)
    expect(html).toContain("<script");
  });
});
