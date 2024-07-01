import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getArticles } from "../utils/apicalls";
import LoadingOverlay from "../components/LoadingOverlay";
import ListArticles from "../components/ListArticles";
import { GlobalStyles } from "../constants/styles";

function ArticlesScreen({ route, navigation }) {
  const [searchParams, setSearchParams] = useState({});

  const [isLoading, setIsloading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    let params = route.params;
    if (!params) {
      params = {};
    }
    let { topic, sort_by, order, p, limit } = params;
    const queries = {};
    if (topic) {
      queries.topic = topic;
    }
    if (sort_by) {
      queries.sort_by = sort_by;
    } else {
      queries.sort_by = "created_at";
    }
    if (order) {
      queries.order = order;
    } else {
      queries.order = "desc";
    }
    if (p) {
      queries.p = p;
      p = +p;
    } else {
      p = 1;
    }
    if (limit) {
      queries.limit = limit;
      limit = +limit;
    } else {
      limit = 10;
    }
    setSearchParams(queries);

    getArticles(queries)
      .then((res) => {
        setItems(res);
        if (res.length) {
          setPageData({
            pageNumber: p,
            pageSize: limit,
            maxPages: Math.ceil(+res[0].total_count / limit),
          });
        }
        setIsloading(false);
      })
      .catch((err) => {
        setError("Error fetching articles");
      });
  }, []);

  if (error) {
    return (
      <View style={styles.rootContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ListArticles
      navigation={navigation}
      route={route}
      items={items}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      pageData={pageData}
      setPageData={setPageData}
    />
  );
}

export default ArticlesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
