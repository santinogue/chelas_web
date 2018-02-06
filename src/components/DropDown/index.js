import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

import './DropDown.scss';

class DropDown extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {mounted: false, visible: false};

    this.element = document.querySelector('body');
  }

  componentWillReceiveProps (nextProps) {
    const {isOpen, delay} = nextProps;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    if (isOpen) {
      this.setState({mounted: true}, () => {
        this.timeout = setTimeout(() => {
          this.setState({visible: true});
        }, 150);
      });
    } else {
      this.setState({visible: false}, () => {
        this.timeout = setTimeout(() => {
          this.setState({mounted: false});
        }, delay * 1000);
      });
    }
  }

  render () {
    const {isOpen} = this.props;
    const {mounted} = this.state;

    if (!isOpen && !mounted) {
      return null;
    }

    return (
      ReactDom.createPortal(this.renderDropDownMarkup(), this.element)
    );
  }

  renderDropDownMarkup () {
    const {mounted, visible} = this.state;
    const {
      children,
      width,
      top,
      bottom,
      left,
      right,
      position,
      side,
      onMouseLeave,
      delay,
    } = this.props;

    let style = {
      width: `${width}px`,
    };

    if (top) {
      style = {...style, top: `${top}px`};
    }

    if (bottom) {
      style = {...style, bottom: `${bottom}px`};
    }

    if (left) {
      style = {...style, left: `${left}px`};
    }

    if (right) {
      style = {...style, right: `${right}px`};
    }

    if (delay) {
      style = {...style, transition: `all ${delay}s ease-in-out`};
    }

    const tipPosition = position && side ? `${position}-${side}` : 'top-right';

    const classModifier1 = mounted ? 'react-dropdown--mounted' : '';
    const classModifier2 = visible ? 'react-dropdown--visible' : '';
    const dropDownclassName = `react-dropdown ${classModifier1} ${classModifier2}`;

    return (
      <div
        onMouseLeave={onMouseLeave}
        className={dropDownclassName}
        style={style}
      >
        {position === 'top' && <div className={`react-dropdown__tip-${tipPosition}`} />}
        <div className='react-dropdown__content'>
          {children}
        </div>
        {position === 'bottom' && <div className={`react-dropdown__tip-${tipPosition}`} />}
      </div>
    );
  }
}

DropDown.defaultProps = {
  onMouseLeave: () => {},
};

DropDown.propTypes = {
  children: PropTypes.node,
  onMouseLeave: PropTypes.func,
  width: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number,
  right: PropTypes.number,
  left: PropTypes.number,
  position: PropTypes.string,
  side: PropTypes.string,
  isOpen: PropTypes.bool,
  delay: PropTypes.number,
};

export default DropDown;
