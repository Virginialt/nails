import Menu from './Menu';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <Menu />
    <main>{children}</main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
