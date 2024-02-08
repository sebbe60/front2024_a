import { TrophyIcon } from "@heroicons/react/24/outline";
import HomepageProviderSearch from "./homeprovidersearch";
import HomepageProviderSearchNew from "./homeprovidersearchNew";

const NewHomepage = (props) => {
  return (
    <>
      <div
        class="relative mt-0 overflow-hidden md:mt-18 p-10"
      >
        <HomepageProviderSearchNew />
      </div>
    </>
  );
};
export default NewHomepage;
