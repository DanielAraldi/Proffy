import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, TextInput, Picker } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Feather } from "@expo/vector-icons";

import Loading from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import { api } from "../../services/api";

import styles from "./styles";

import { Classes } from "../../@types";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [isConnection, setIsConnection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [optionSubjects, setOptionSubjects] = useState([
    { label: "Carregando opções...", value: "" },
  ]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, SetIsFiltersVisible] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    api
      .get("classes/all")
      .then((response) => {
        const data = response.data as Classes[];

        const subjects = data.map(({ subject }) => subject);

        const optionsNoRepeat = subjects.filter((subject, index, array) => {
          if (array.indexOf(subject) === index) {
            return subject;
          }
        });

        const options = optionsNoRepeat.map((subject) => {
          return { label: subject, value: subject };
        });

        return setOptionSubjects(options);
      })
      .catch(() => setOptionSubjects([{ label: "Sem dados", value: "" }]));
  }, []);

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

  const makeLoading = () => setIsLoading(true);

  function hundleFilterSubmit() {
    loadFavorites();
    makeLoading();

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
      .catch(() => setIsConnection(false))
      .finally(() => setIsLoading(false));
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
              {optionSubjects.map(({ label, value }) => (
                <Picker.Item label={label} value={value} />
              ))}
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
        ) : isLoading ? (
          <Loading />
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
