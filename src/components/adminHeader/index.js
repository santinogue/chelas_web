import React, {PureComponent} from 'react';
import MediaQuery from 'react-responsive';
import DropdownMenu from 'react-dd-menu';
import './adminHeader.scss';

class AdminHeader extends PureComponent {
  constructor (props) {
    super(props);

    this.state = { menuOpened: false };

    this.close = ::this.close;
    this.toggleMenu = ::this.toggleMenu;
  }

  toggleMenu () {
    this.setState({menuOpened: !this.state.menuOpened});
  }

  close () {
    this.setState({menuOpened: false});
  }

  render () {
    const menuOptions = {
      isOpen: this.state.menuOpened,
      close: this.close,
      toggle: <i className='ion-navicon' onClick={this.toggleMenu} />,
      align: 'left'
    };

    return (
      <div className='admin-header'>

        <MediaQuery minWidth={401}>
          <div className='admin-header__left-side'>
            <i className='ion-ios-home-outline' />
          </div>

          <div className='admin-header__right-side'>
            <i className='ion-log-out' />
          </div>
        </MediaQuery>

        <MediaQuery maxWidth={400}>
          <DropdownMenu {...menuOptions}>
            <li className='admin-header__action'>
              Home
            </li>

            <li className='admin-header__action'>
              Sign Out
            </li>
          </DropdownMenu>
        </MediaQuery>
      </div>
    );
  };
}

export default AdminHeader;
