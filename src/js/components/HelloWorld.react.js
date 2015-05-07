var React = require('react');

var HelloWorld = React.createClass({

  getInitialState: function() {
    return {
      text: "hello world!!"
    };
  },

  /**
   * @return {object}
   */
  render: function() {
  	return (
      <div>
        {this.state.text}
      </div>
  	);
  }

});

module.exports = HelloWorld;
