
import React from 'react';
import PropTypes from 'prop-types';


import {
  FlatList
} from 'react-native';

import KeyboardAwareBase from './KeyboardAwareBase'

export default class KeyboardAwareListView extends KeyboardAwareBase {
  render() {
    const initialOpacity = this.props.startScrolledToBottom ? 0 : 1;
    return (
      <FlatList 
        {...this.props}
        {...this.style}
        opacity={initialOpacity}
        contentInset={{bottom: this.state.keyboardHeight}}
        ref={(r) => {
            // this._keyboardAwareView = r;
            if (r) {
              if (r._listRef) {
                this._keyboardAwareView = r._listRef._scrollRef
              }
            }
        }}
        onLayout={(layoutEvent) => {
          this._onKeyboardAwareViewLayout(layoutEvent.nativeEvent.layout);
        }}
        onScroll={(event) => {
          this._onKeyboardAwareViewScroll(event.nativeEvent.contentOffset);
          if(this.props.onScroll) {
            this.props.onScroll(event);
          }
        }}
        onContentSizeChange={() => {
          this._updateKeyboardAwareViewContentSize();
        }}
        scrollEventThrottle={200}
      />
    );
  }
}

KeyboardAwareListView.propTypes = {
  onScroll: PropTypes.func
};

KeyboardAwareListView.defaultProps = {
  ...KeyboardAwareBase.defaultProps
};