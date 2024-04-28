import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TalkInput from "../components/ChatInput";
import TalksList from "../components/ChatList";
import { asyncPopulateUsersAndTalks } from "../states/shared/action";
import { asyncAddTalk } from "../states/talks/action";
import "../styles/HomePage.css";

const selectTalks = (state) => state.talks;
const selectUsers = (state) => state.users;
const selectAuthUser = (state) => state.authUser;

function HomePage() {
  const talks = useSelector(selectTalks);
  const users = useSelector(selectUsers);
  const authUser = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndTalks());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = [...new Set(talks.map((talk) => talk.category))];
    setCategories(uniqueCategories);
  }, [talks]);

  const onAddTalk = (text) => {
    dispatch(
      asyncAddTalk({
        body: text.body,
        category: text.category,
        title: text.title,
      })
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? "" : category
    );
  };

  const talkList = talks
    .filter((talk) => !selectedCategory || talk.category === selectedCategory)
    .map((talk) => ({
      ...talk,
      user: users.find((user) => user.id === talk.user),
      authUser: authUser.id,
    }));

  return (
    <section className="home-page">
      <TalkInput addTalk={onAddTalk} />
      <div className="category-buttons">
        {categories.map((category) => (
          <button key={category} onClick={() => handleCategoryClick(category)}>
            {category}
          </button>
        ))}
      </div>
      <TalksList body={talkList} authUser={authUser} />
    </section>
  );
}

export default HomePage;