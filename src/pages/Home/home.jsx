import { Layout } from '../../components/Layout/Layaout';
import { ItemListContainer } from "../../components/ItemListContainer/ItemListContainer";

const Home = () => {
  const itemListContainerProps = {
    greeting: "Hello, Andres, welcome to our store!",
    bgBlue: false,
  };

  return (
    <Layout>
      <ItemListContainer {...itemListContainerProps} />
    </Layout>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Home;