import React from 'react';
import SourceSelector from '../source.selector.react';

const {renderIntoDocument} = React.addons.TestUtils;

describe('Source Selector', () => {

  it('renders a source selector', () => {
    const component = renderIntoDocument(
      <SourceSelector />
    );
  });

});