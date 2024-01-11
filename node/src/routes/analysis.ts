import Express from 'express';
import BodyParser from 'body-parser';
import { GetConnection, Query } from '../common/Query';
import { ConnectionPool } from '../index'
export const analysis = Express.Router();
analysis.use(BodyParser.json());


analysis.post('/analysis/getAllwork', async (req, res) => {
    const { employee_id } = req.body;
    const sql = `SELECT * 
    FROM employee_salary_view
    JOIN employee
    on employee_salary_view.employee_id = employee.id
    WHERE employee.supervisor_id = ?`;
    var result;
    try {
        result = await Query(await GetConnection(ConnectionPool), sql, [employee_id]);
        res.json({
            code: 200,
            message: 'success',
            data: result
        });
    } catch (err) {
        console.log(err);

        res.json({
            code: 500,
            message: 'error',
            data: null
        });
    }

});

analysis.post('/analysis/getDepartmentSalary', async (req, res) => {
    const { department_id } = req.body;
    const sql = `SELECT * 
    FROM employee_salary_view
    JOIN employee
    on employee_salary_view.employee_id = employee.id
    WHERE employee.department_id = ?`;
    var result;
    try {
        result = await Query(await GetConnection(ConnectionPool), sql, [department_id]);
        res.json({
            code: 200,
            message: 'success',
            data: result
        });
    } catch (err) {
        console.log(err);

        res.json({
            code: 500,
            message: 'error',
            data: null
        });
    }
});


analysis.post('/analysis/getAllsalary', async (req, res) => {
    const { employee_id } = req.body;
    const sql = `SELECT * 
    FROM employee_salary_view
    JOIN employee
    on employee_salary_view.employee_id = employee.id
    WHERE employee.supervisor_id = ?`;
    var result;
    try {
        result = await Query(await GetConnection(ConnectionPool), sql, [employee_id]);
        res.json({
            code: 200,
            message: 'success',
            data: result
        });
    } catch (err) {
        console.log(err);

        res.json({
            code: 500,
            message: 'error',
            data: null
        });
    }

});
