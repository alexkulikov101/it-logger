import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs, clearSearch } from "../../actions/logActions";

const SearchBar = ({ searchLogs, log: { search }, clearSearch }) => {
  const text = useRef("");

  useEffect(() => {
    if (search === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      searchLogs(e.target.value);
    } else {
      clearSearch();
    }
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search Logs.."
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propType = {
  searchLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});
export default connect(
  mapStateToProps,
  { searchLogs, clearSearch }
)(SearchBar);
