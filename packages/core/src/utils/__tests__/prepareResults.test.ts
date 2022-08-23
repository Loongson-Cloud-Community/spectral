import { defaultComputeResultFingerprint, prepareResults } from '../prepareResults';

import duplicateValidationResults from './__fixtures__/duplicate-validation-results.json';

describe('prepareResults util', () => {
  it.concurrent('deduplicate exact validation results', () => {
    expect(prepareResults(duplicateValidationResults, defaultComputeResultFingerprint)).toEqual([
      expect.objectContaining({
        code: 'valid-example-in-schemas',
      }),
      expect.objectContaining({
        code: 'valid-schema-example-in-content',
      }),
    ]);
  });

  it.concurrent('deduplicate exact validation results with unknown source', () => {
    const duplicateValidationResultsWithNoSource = duplicateValidationResults.map(result => ({
      ...result,
      source: void 0,
    }));

    expect(prepareResults(duplicateValidationResultsWithNoSource, defaultComputeResultFingerprint)).toEqual([
      expect.objectContaining({
        code: 'valid-example-in-schemas',
      }),
      expect.objectContaining({
        code: 'valid-schema-example-in-content',
      }),
    ]);
  });

  it.concurrent('deduplicate list of only duplicates', () => {
    const onlyDuplicates = [
      { ...duplicateValidationResults[0] },
      { ...duplicateValidationResults[0] },
      { ...duplicateValidationResults[0] },
      { ...duplicateValidationResults[0] },
    ];

    expect(prepareResults(onlyDuplicates, defaultComputeResultFingerprint).length).toBe(1);
  });

  it.concurrent('deduplicate only exact validation results', () => {
    // verifies that results with the same code/path but different messages will not be de-duplicated
    expect(prepareResults(duplicateValidationResults, defaultComputeResultFingerprint)).toEqual([
      expect.objectContaining({
        code: 'valid-example-in-schemas',
      }),
      expect.objectContaining({
        code: 'valid-schema-example-in-content',
      }),
    ]);
  });
});
