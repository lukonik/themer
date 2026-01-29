import { useRouter } from "@tanstack/react-router";
import { isServer } from '@tanstack/router-core/isServer';

/**
 * current implementation on ScriptOnce in tanstack router, doesn't allow to pass attributes to the script tag (https://github.com/TanStack/router/blob/5ae6217746965726310e90633a02aeb88aa7c960/packages/react-router/src/ScriptOnce.tsx#L7)
 * this implementation adds this feature
 */
export function ScriptOnce({
  children,
  attributes,
}: {
  children: string;
  attributes?: Record<string, any> | undefined;
}) {
  const router = useRouter();
  if (!(isServer ?? router.isServer)) {
    return null;
  }
  return (
    <script
      {...attributes}
      nonce={router.options.ssr?.nonce}
      dangerouslySetInnerHTML={{
        __html: children + ";document.currentScript.remove()",
      }}
    />
  );
}
