import path from "path";

interface CallSite {
  getThis(): any;

  getTypeName(): string;

  getFunctionName(): string;

  getMethodName(): string;

  getFileName(): string;

  getLineNumber(): number;

  getColumnNumber(): number;

  getFunction(): () => void;

  getEvalOrigin(): string;

  isNative(): boolean;

  isToplevel(): boolean;

  isEval(): boolean;

  isConstructor(): boolean;
}

/**
 * We use it to exclude "getCallSites" and "getCallerPath"
 * from the result stack, because it's an internal implementation.
 *
 */
const MIN_DEPTH = 2;

/**
 * Implemented according to this API description:
 * - https://v8.dev/docs/stack-trace-api
 */
const getCallSites = (): CallSite[] => {
  const originalPrepareStackTrace = Error.prepareStackTrace;

  Error.prepareStackTrace = (_, structuredStackTrace) => structuredStackTrace;

  const { stack } = new Error();

  Error.prepareStackTrace = originalPrepareStackTrace;

  return (stack as unknown) as CallSite[];
};

export const getCallerPath = (depth = 0) => {
  const resultDepth = MIN_DEPTH + depth;

  const callSite = getCallSites()[resultDepth];

  const filePath = callSite.getFileName();

  const { dir: dirPath, base: fileName, ext: extension } = path.parse(filePath);

  return {
    filePath,
    dirPath,
    fileName,
    extension
  };
};
