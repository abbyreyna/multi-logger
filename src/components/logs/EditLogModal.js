import React, { useState, useEffect } from 'react';
import UserSelectOptions from '../users/UserSelectOptions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [user, setUser] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setUser(current.user);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === '' || user === '') {
      M.toast({ html: 'Please enter a message and user' });
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        user,
        date: new Date(),
      };

      updateLog(updLog);
      M.toast({ html: `Log updated by ${user}` });

      // Clear fields
      setMessage('');
      setUser('');
      setAttention(false);
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="user"
              value={user}
              className="browser-default"
              onChange={(e) => setUser(e.target.value)}
            >
              <option value="" disabled>
                Select User
              </option>
              <UserSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect pink waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%',
};

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
