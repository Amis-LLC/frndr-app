import GMap from '../client/components/Map';

describe(GMap, () => {
  it('GMap gets the proper Data', () => {
    const { getBytTestId } = render(<GMap />);
    const marker = getBytTestId('marker').textContent;
    expect(marker).toBe.not(null);
  });
});
