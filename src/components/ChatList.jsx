import PropTypes from "prop-types";
import TalkItem from "../components/ChatItem";

function TalksList({ body, authUser }) {
  console.log(typeof authUser, authUser);

  return (
    <div className="talks-list">
      {body.map((talk) => (
        <TalkItem key={talk.id} talk={talk} authUser={authUser.id}/>
      ))}
    </div>
  );
}

TalksList.propTypes = {
  body: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
};


export default TalksList;
