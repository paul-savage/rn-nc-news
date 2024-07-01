import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { reformatTime } from "../utils/utils";
import LoadingOverlay from "../components/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";

const ListArticles = ({
  navigation,
  route,
  items,
  searchParams,
  setSearchParams,
  pageData,
  setPageData,
}) => {
  const [queries, setQueries] = useState({});

  useEffect(() => {
    let params = route.params;
    if (!params) {
      params = {};
    }
    let { topic, sort_by, order, p, limit } = params;
    const newQueries = {};
    if (topic) {
      newQueries.topic = topic;
    }
    if (sort_by) {
      newQueries.sort_by = sort_by;
    } else {
      newQueries.sort_by = "created_at";
    }
    if (order) {
      newQueries.order = order;
    } else {
      newQueries.order = "desc";
    }
    setQueries(newQueries);
  }, [pageData]);

  const handleSelectChange = (value) => {
    setPageData((currentData) => {
      return { ...currentData, pageNumber: +value };
    });
    const copyQueries = { ...queries, p: +value };
    setQueries(copyQueries);
    setSearchParams(copyQueries);
  };

  const handleSubmit = () => {
    setSearchParams(queries);
  };

  const handleReadArticle = () => {};

  if (items.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text>No articles available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.rootContainer}>
      {items.map((item) => (
        <View key={item.article_id}>
          <Image style={styles.image} source={{ uri: item.article_img_url }} />
          <Text>{item.title}</Text>
          <Text>Topic: {item.topic}</Text>
          <Text>Author: {item.author}</Text>
          <Text>Comments: {item.comment_count}</Text>
          <Text>Votes: {item.votes}</Text>
          <Text>Created: {reformatTime(item.created_at)}</Text>
          <Button title="Read Article" onPress={handleReadArticle} />
        </View>
      ))}
    </ScrollView>
  );
};

export default ListArticles;

const styles = StyleSheet.create({
  rootContainer: {
    marginHorizontal: 16,
    marginTop: 60,
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
});
