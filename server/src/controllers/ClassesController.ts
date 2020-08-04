import { Request, Response } from 'express';

import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    // Listagem das aulas
    async index(request: Request, response: Response) {
        const filters = request.query;

        // Diz pro typescript que é uma string
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return response.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        // Fazendo a conversão das horas para os minutos durante a pesquisa
        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                .from('class_schedule')
                .whereRaw('`class_schedule` . `class_id` = `classes` . `id`')
                .whereRaw('`class_schedule` . `week_day` = ??', [Number(week_day)])
                .whereRaw('`class_schedule` . `from` <= ??', [timeInMinutes])
                .whereRaw('`class_schedule` . `to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);

        return response.json(classes);
    }

    // Criação da aulas
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;

        // Ele faz todas as operações do banco de dados ao mesmo tempo, se uma delas falhar, desfaz todas já foram feitas
        const trx = await db.transaction();

        try {
            // Inserindo dados do usuário
            const insertedUsersIds = await trx('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            });

            const user_id = insertedUsersIds[0]; // Pega o primeiro item da linha, no caso o ID

            const insetedClassesIds = await trx('classes').insert({
                subject,
                cost,
                user_id,
            });

            const class_id = insertedUsersIds[0];

            // Mapeamento com o map dos dados do schedule
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            })

            // Inserindo os dados do schedule no banco de dados
            await trx('class_schedule').insert(classSchedule);

            // Insere todas as informações ao mesmo tempo no banco de dados
            await trx.commit();

            return response.status(201).send();
        } catch (err) {
            // Desfaz qualquer alteração no banco de dados
            await trx.rollback();

            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
}