import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-section-label">Main Menu</div>

      <div className="sidebar-options">
        <NavLink to="add" className="sidebar-option">
          <div className="sidebar-icon">
            <i className="ti ti-plus"></i>
          </div>
          <div className="sidebar-text">
            <span className="sidebar-title">Add Item</span>
            <span className="sidebar-sub">Upload new dish</span>
          </div>
        </NavLink>

        <NavLink to="list" className="sidebar-option">
          <div className="sidebar-icon">
            <i className="ti ti-layout-list"></i>
          </div>
          <div className="sidebar-text">
            <span className="sidebar-title">List Items</span>
            <span className="sidebar-sub">Manage menu</span>
          </div>
        </NavLink>

        <NavLink to="orders" className="sidebar-option">
          <div className="sidebar-icon">
            <i className="ti ti-shopping-bag"></i>
          </div>
          <div className="sidebar-text">
            <span className="sidebar-title">Orders</span>
            <span className="sidebar-sub">Track & update</span>
          </div>
        </NavLink>
      </div>

   
      <div className="sidebar-footer">
        <div className="sidebar-footer-inner">
          <i className="ti ti-circle-check" style={{color:"#27ae60",fontSize:"15px"}}></i>
          <span>System online</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;