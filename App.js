import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, StatusBar, Image } from "react-native";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";

const statusBarHeight = StatusBar.currentHeight;
const cardHeight = 110;
const cardOffSet = 10;

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchData("https://rickandmortyapi.com/api/character/?page=1");
  }, [fetchData]);

  const getItemLayout = (characters, index) => {
    return {
      length: characters.length,
      offset: (cardHeight + cardOffSet) * index,
      index,
    };
  };

  const fetchData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCharacters((_characters) => {
      return [..._characters, ...data.results];
    });
    if (data.info && data.info.next) {
      fetchData(data.info.next);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Container style={{ elevation: 20 }}>
        <Cover>
          <ImageBox
            color={
              item.status == "Alive"
                ? "greenStat"
                : item.status == "Dead"
                ? "redStat"
                : "blackStat"
            }
            style={{ elevation: 6 }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderWidth: 4,
                borderColor: "transparent",
                borderRadius: 32,
                overflow: "hidden",
              }}
              source={{
                uri: `${item.image}`,
              }}
            />
          </ImageBox>
          <PresentationBox>
            <Name>{item.name}</Name>
            <Location>{item.location.name}</Location>
            <TraitsBox>
              <StatusText
                text={
                  item.status == "Alive"
                    ? "greenStat"
                    : item.status == "Dead"
                    ? "redStat"
                    : "blackStat"
                }
              >
                #{item.status}
              </StatusText>
              <SpecieText>#{item.species}</SpecieText>
            </TraitsBox>
          </PresentationBox>
        </Cover>
      </Container>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <View
      style={{
        flex: 1,
        position: "relative",
        paddingTop: statusBarHeight,
      }}
    >
      <Circle1 />
      <Circle2 />
      <Circle3 />
      <BlurView
        intensity={100}
        style={{
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
        }}
      />
      <FlatList
        data={characters}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={6}
        style={{ position: "relative", zIndex: 100 }}
      />
    </View>
  );
}

export default App;

const Circle1 = styled.View`
  width: 300px;
  height: 300px;
  background: #fb4048;
  top: -20px;
  left: -50px;
  position: absolute;
  border-radius: 150px;
  z-index: -3;
`;

const Circle2 = styled.View`
  width: 400px;
  height: 400px;
  background: #56e1fd;
  bottom: -50px;
  right: -80px;
  position: absolute;
  border-radius: 200px;
  z-index: -3;
`;

const Circle3 = styled.View`
  width: 200px;
  height: 200px;
  background: #f7fd2b;
  bottom: 200px;
  left: 0;
  position: absolute;
  border-radius: 100px;
  z-index: -3;
`;

const Container = styled.View`
  padding: 10px 0;
  margin: ${cardOffSet}px;
  height: ${cardHeight}px;
  border-radius: 14px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 1);
`;

const PresentationBox = styled.View`
  flex-direction: column;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 700;
  align-self: flex-start;
  word-wrap: break-word;
  width: 260px;
`;

const Location = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: rgba(0, 0, 0, 0.4);
  word-break: break-all;
  width: 210px;
`;

const ImageBox = styled.View`
  width: 77px;
  height: 77px;
  margin-right: 10px;
  background: transparent;
  border-width: 3px;
  border-color: ${({ color }) =>
    color == "greenStat"
      ? "rgba(4,201,112, 0.6)"
      : color == "redStat"
      ? "rgba(226,45,45, 0.6)"
      : "rgba(0,0,0,0.6)"};
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
`;

const Cover = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
`;

const TraitsBox = styled.View`
  flex-direction: row;
`;

const SpecieText = styled.Text`
  color: rgba(0, 0, 0, 0.4);
  margin-left: 10px;
  font-weight: 600;
`;

const StatusText = styled.Text`
  color: ${({ text }) =>
    text == "greenStat"
      ? "rgba(4,201,112, 0.6)"
      : text == "redStat"
      ? "rgba(226,45,45, 0.6)"
      : "rgba(0,0,0,0.6)"};
  font-weight: 600;
`;
