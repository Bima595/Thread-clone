import PropTypes from "prop-types";
import TalkItem from "../components/ChatItem";

function TalksList({ body, authUser }) {
  return (
    <div className="talks-list">
      {body.map((talk) => (
        <TalkItem key={talk.id} talk={talk} authUser={authUser}/>
      ))}
    </div>
  );
}

TalksList.propTypes = {
  body: PropTypes.array.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default TalksList;
