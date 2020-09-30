import { getCallerPath } from '.';
import { helperCaller } from './fixtures';

describe('callerPath', () => {
  it('works properly for the default depth equals to 0', () => {
    const {
      dirPath,
      fileName,
      filePath,
      extension,
    } = getCallerPath();

    expect(dirPath).toContain('caller-path/src');
    expect(filePath).toContain('caller-path/src/callerPath.spec.ts');
    expect(fileName).toBe('callerPath.spec.ts');
    expect(extension).toBe('.ts');
  });

  it('works properly for the depth different from 0', () => {
    helperCaller(() => {
      const {
        dirPath,
        fileName,
        filePath,
        extension,
      } = getCallerPath(1);

      expect(dirPath).toContain('caller-path/src');
      expect(filePath).toContain('caller-path/src/fixtures/helperCaller.ts');
      expect(fileName).toBe('helperCaller.ts');
      expect(extension).toBe('.ts');
    });
  });
});
