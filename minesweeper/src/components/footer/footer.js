import React, {Component} from 'react';
import './footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <a href="https://github.com/Coolcooo" className="link footer__developer-link"></a>
        <span className='footer__year'>2021</span>
        <a href='https://rs.school/js/' className="link footer__rsschool-link"></a>
      </footer>
    )
  }
}
