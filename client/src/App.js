import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import Projects from "./components/Projects";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merger(exisiting, incoming) {
            return incoming;
          },
        },
        projects: {
          merger(exisiting, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <AddClientModal />
          <Projects />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
