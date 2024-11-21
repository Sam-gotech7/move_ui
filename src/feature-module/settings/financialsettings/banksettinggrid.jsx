import {
  ChevronUp,
  Edit,
  Grid,
  List,
  PlusCircle,
  RotateCcw,
  Trash2,
} from "feather-icons-react/build/IconComponents";
import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setToogleHeader } from "../../../core/redux/action";
import AddBankAccount from "../../../core/modals/settings/addbankaccount";
import EditBankAccount from "../../../core/modals/settings/editbankaccount";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import SettingsSideBar from "../settingssidebar";

const BankSettingGrid = () => {
  const [isActive, setIsActive] = useState("Karur vysya bank");

  const setActive = (theme) => {
    setIsActive(theme);
  };

  const route = {
    banksettingslist: "/bank-settings-list",
  };

  const dispatch = useDispatch();
  const data = useSelector((state) => state.toggle_header);

  const renderRefreshTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Refresh
    </Tooltip>
  );
  const renderCollapseTooltip = (props) => (
    <Tooltip id="collapse-tooltip" {...props}>
      Collapse
    </Tooltip>
  );

  const MySwal = withReactContent(Swal);

  const showConfirmationAlert = () => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#00ff00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonColor: "#ff0000",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          className: "btn btn-success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        MySwal.close();
      }
    });
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content settings-content">
          <div className="page-header settings-pg-header">
            <div className="add-item d-flex">
              <div className="page-title">
                <h4>Settings</h4>
                <h6>Manage your settings on portal</h6>
              </div>
            </div>
            <ul className="table-top-head">
              <li>
                <OverlayTrigger placement="top" overlay={renderRefreshTooltip}>
                  <Link to="#">
                    <RotateCcw />
                  </Link>
                </OverlayTrigger>
              </li>
              <li>
                <OverlayTrigger placement="top" overlay={renderCollapseTooltip}>
                  <Link
                    to="#"
                    id="collapse-header"
                    className={data ? "active" : ""}
                    onClick={() => {
                      dispatch(setToogleHeader(!data));
                    }}
                  >
                    <ChevronUp />
                  </Link>
                </OverlayTrigger>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="settings-wrapper d-flex">
                <SettingsSideBar />
                <div className="settings-page-wrap w-50">
                  <div className="setting-title">
                    <h4>Bank Account</h4>
                  </div>
                  <div className="page-header bank-settings justify-content-end">
                    <Link to={route.banksettingslist} className="btn-list me-2">
                      <List className="feather-user" />
                    </Link>
                    <Link
                      to={route.banksettingslist}
                      className="btn-grid active"
                    >
                      <Grid className="feather-user" />
                    </Link>
                    <div className="page-btn">
                      <Link
                        to="#"
                        className="btn btn-added"
                        data-bs-toggle="modal"
                        data-bs-target="#add-account"
                      >
                        <PlusCircle className="me-2" />
                        Add New Account
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    {/* Bank Account Boxes */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddBankAccount />
      <EditBankAccount />
    </div>
  );
};

export default BankSettingGrid;
