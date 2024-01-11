# Real Estate Project Design Process Management System

## Completed System Features

### Customer Management Module

- Add, edit, and delete customers
- Customer cascading queries
- **Access Control:** Front desk and boss have customer management permissions

### Supervisor Management Module

- Add, edit, and delete supervisors
- **Access Control:** Front desk and boss have supervisor management permissions

### Employee Management Module

- Add, edit, and delete employees
- **Department Authorization:** Different department supervisors have employee management permissions and can be authorized to multiple supervisors
- **Access Control:** Front desk and boss have employee management permissions, supervisors can only manage their subordinates

### Project Management Module

- Project establishment and initialization
- Project queries
- Visual representation of project status and progress, including project logs
- **Project Workflow:** Model supervisor initializes → Rendering supervisor completes → Model supervisor completes + Archive (In sequential order, the latter cannot operate on the project status if the former's work is incomplete)
- **Task Assignment:** Supervisor sends tasks, employees accept or reject tasks and provide feedback to the supervisor
- **Access Control:** Supervisors have project management permissions, model supervisor has initialization project permission

### Cloud Storage Module

- Cloud storage operations: Boss and supervisors can perform any operation on cloud storage
- Cloud storage viewing: Employees can only view projects they have been responsible for, with upload, download, and delete permissions
- **Access Control:** Bosses, supervisors, and employees have cloud storage operation permissions

### Monitoring Module

- Dynamic binding of employee work computers (automatic login request)
- **View Monitoring:** Boss can view monitoring of any department's employees during any time period, supervisors can only view monitoring of their subordinates
- **Monitoring Auto-start and Hide:** Inline hooks
- **Monitoring Data Storage:** All monitoring data is stored in the server-side database
- **Access Control:** Bosses and supervisors have monitoring management permissions

### Role Authorization

- Different roles have different permissions
- **Department Authorization:** Supervisors can authorize multiple supervisors, employees can only view projects they have been responsible for

## Installation
### Node
Navigate to the 'node' directory and install the dependencies using npm:
```bash
cd ./node
npm install
```
### Web
Navigate to the 'web' directory and install the dependencies using npm:
```bash
cd ./web
npm install
```
In case of installation errors, you can download the 'node_modules' package from the 'web' section to your local computer.
### Monitor
To enable automatic monitoring without manual intervention:
 - Add the monitoring task to the task scheduler with the highest permissions.
 - Set the executable to start when logging in.
 - The executable path: "node/src/modules/monitor/monitorAppp/bin/Release/net7.0/monitorAppp.exe"
### DataBase
 - MySQL
 - Data and structure, the path of sql: "node/src/dbconfig/latest_process.sql"
## Running the Project
### Node
```bash
# To run the Node application, use nodemon:
nodemon
```
### Web
```bash
# To run the web application, use the following npm command:
cd ./web
npm run serve
```
