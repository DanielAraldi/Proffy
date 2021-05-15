import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Picker } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import { api } from "../../services/api";

import styles from "./styles";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isConnection, setIsConnection] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, SetIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }

  function hundleFilterSubmit() {
    loadFavorites();

    api
      .get("classes", {
        params: {
          subject,
          week_day,
          time,
        },
      })
      .then((response) => {
        SetIsFiltersVisible(false);
        setTeachers(response.data);
      })
      .catch(() => setIsConnection(false));
  }

  function hundleToggleFiltersVisible() {
    SetIsFiltersVisible(!isFiltersVisible);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={hundleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matérias</Text>
            <Picker
              selectedValue={subject}
              style={styles.picker}
              itemStyle={{ fontSize: 14 }}
              onValueChange={(itemValue, itemIndex) => setSubject(itemValue)}
            >
              <Picker.Item label="Qual a matéria?" value="" />
              <Picker.Item label="Artes" value="Artes" />
              <Picker.Item label="Biologia" value="Biologia" />
              <Picker.Item label="Ciências" value="Ciências" />
              <Picker.Item label="Educação física" value="Educação física" />
              <Picker.Item label="Filosofia" value="Filosofia" />
              <Picker.Item label="Física" value="Física" />
              <Picker.Item label="Geografia" value="Geografia" />
              <Picker.Item label="História" value="História" />
              <Picker.Item label="Inglês" value="Inglês" />
              <Picker.Item label="Matemática" value="Matemática" />
              <Picker.Item label="Português" value="Português" />
              <Picker.Item label="Química" value="Química" />
              <Picker.Item label="Religião" value="Religião" />
              <Picker.Item label="Sociologia" value="Sociologia" />
            </Picker>

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <Picker
                  selectedValue={week_day}
                  style={styles.picker}
                  itemStyle={{ fontSize: 14 }}
                  onValueChange={(itemValue, itemIndex) =>
                    setWeekDay(itemValue)
                  }
                >
                  <Picker.Item label="Qual o dia?" value="" />
                  <Picker.Item label="Domingo" value="0" />
                  <Picker.Item label="Segunda-feira" value="1" />
                  <Picker.Item label="Terça-feira" value="2" />
                  <Picker.Item label="Quarta-feira" value="3" />
                  <Picker.Item label="Quinta-feira" value="4" />
                  <Picker.Item label="Sexta-feira" value="5" />
                  <Picker.Item label="Sábado" value="6" />
                </Picker>
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#C1BCCC"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>

            <RectButton
              onPress={hundleFilterSubmit}
              style={styles.submitButton}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {!isConnection ? (
          <View style={styles.warningContainer}>
            <Text style={styles.warning}>Erro ao obter os dados!!</Text>
          </View>
        ) : teachers.length === 0 ? (
          <View style={styles.warningContainer}>
            <Text style={styles.warning}>
              Faça uma pesquisa válida para obter os resultados!
            </Text>
          </View>
        ) : (
          teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={teacher.id}
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
