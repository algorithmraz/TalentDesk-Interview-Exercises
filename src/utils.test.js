import { expect } from 'chai';
import { detectSums } from './utils';

describe('Detect sums', () => {
  it('should fail if input is not an array', () => {
    expect(() => detectSums()).to.throw('Input is not an array');
  });

  it('should return an array', () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
  });

  it('should detect sums', () => {
    const result = detectSums([1, 2]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it('should detect sums in order', () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2});
  });
});
