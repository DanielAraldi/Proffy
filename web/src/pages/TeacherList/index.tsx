import { useState, FormEvent, useEffect } from "react";

import { Loading } from "../../components/Loading";
import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import { api } from "../../services/api";

import { Classes, Teacher } from "../../@types";

import "./styles.css";

function TeacherList() {
  const [isConnection, setIsConnection] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [optionSubjects, setOptionSubjects] = useState([
    { value: "Carregando opções...", label: "Carregando opções..." },
  ]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const searchTeachers = (e: FormEvent) => {
    e.preventDefault();

    api
      .get("classes", {
        params: {
          subject,
          week_day,
          time,
        },
      })
      .then((response) => {
        setTeachers(response.data);
      })
      .catch(() => setIsConnection(false))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    api
      .get("classes/all")
      .then((response) => {
        const data = response.data as Classes[];

        const subjects = data.map(({ subject }) => subject);

        // eslint-disable-next-line array-callback-return
        const optionsNoRepeat = subjects.filter((subject, index, array) => {
          if (array.indexOf(subject) === index) {
            return subject;
          }
        });

        const options = optionsNoRepeat.map((subject) => {
          return { value: subject, label: subject };
        });

        return setOptionSubjects(options);
      })
      .catch(() =>
        setOptionSubjects([{ value: "Sem dados", label: "Sem dados" }])
      );
  }, []);

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            options={optionSubjects}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => {
              setWeekDay(e.target.value);
            }}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => {
              setTime(e.target.value);
            }}
          />

          <button type="submit" onClick={() => setIsLoading(true)}>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {isConnection ? (
          isLoading ? (
            <Loading />
          ) : teachers.length < 1 ? (
            <h1 className="warning">
              Faça uma pesquisa válida para obter os resultados!
            </h1>
          ) : (
            teachers.map((teacher: Teacher) => {
              return <TeacherItem key={teacher.id} teacher={teacher} />;
            })
          )
        ) : (
          <h1 className="warning">Erro ao obter os dados!</h1>
        )}
      </main>
    </div>
  );
}

export default TeacherList;
