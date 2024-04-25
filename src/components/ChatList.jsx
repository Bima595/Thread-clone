import PropTypes from "prop-types";
import TalkItem from "./ChatItem";

function TalksList({ body }) {
  return (
    <div className="talks-list">
      {body.map((talk) => (
        <TalkItem key={talk.id} talk={talk} />
      ))}
    </div>
  );
}

TalksList.propTypes = {
  body: PropTypes.array.isRequired,
};

export default TalksList;
