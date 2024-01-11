/*
 Navicat Premium Data Transfer

 Source Server         : lhf
 Source Server Type    : MySQL
 Source Server Version : 80034 (8.0.34)
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 80034 (8.0.34)
 File Encoding         : 65001

 Date: 10/01/2024 10:45:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for branch_company
-- ----------------------------
DROP TABLE IF EXISTS `branch_company`;
CREATE TABLE `branch_company`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `subsidiary_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `subsidiary_id`(`subsidiary_id` ASC) USING BTREE,
  CONSTRAINT `branch_company_ibfk_1` FOREIGN KEY (`subsidiary_id`) REFERENCES `subsidiary_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `qq` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `e_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `branch_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `branch_id`(`branch_id` ASC) USING BTREE,
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for client_company
-- ----------------------------
DROP TABLE IF EXISTS `client_company`;
CREATE TABLE `client_company`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for cloud
-- ----------------------------
DROP TABLE IF EXISTS `cloud`;
CREATE TABLE `cloud`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parent_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` int NOT NULL COMMENT '是否为文件（1文件0文件夹）',
  `size` double NOT NULL,
  `modify_date` datetime NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for employee
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sex` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `e_mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `salary_least` decimal(10, 2) NOT NULL,
  `entry_time` datetime NOT NULL,
  `leave_time` datetime NULL DEFAULT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `department_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `supervisor_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_regular` int NOT NULL COMMENT '//是否为正式员工，主管为1',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `department_id`(`department_id` ASC) USING BTREE,
  INDEX `supervisor_id`(`supervisor_id` ASC) USING BTREE,
  CONSTRAINT `employee_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_6` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_7` FOREIGN KEY (`supervisor_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for employee_project
-- ----------------------------
DROP TABLE IF EXISTS `employee_project`;
CREATE TABLE `employee_project`  (
  `employee_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `project_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`employee_id`, `project_id`) USING BTREE,
  INDEX `project_id`(`project_id` ASC) USING BTREE,
  CONSTRAINT `employee_project_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_project_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mission
-- ----------------------------
DROP TABLE IF EXISTS `mission`;
CREATE TABLE `mission`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `create_date` datetime NOT NULL,
  `complete_date` datetime NULL DEFAULT NULL,
  `status` int NOT NULL COMMENT '任务状态, 0创建 1分配 2进行中 3完成 -1退回',
  `project_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '所属的项目',
  `publisher_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '发布者',
  `receiver_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '任务接收者（被指派的员工）',
  `bonus` int NOT NULL COMMENT '奖金',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `project_id`(`project_id` ASC) USING BTREE,
  INDEX `publisher_id`(`publisher_id` ASC) USING BTREE,
  INDEX `receiver_id`(`receiver_id` ASC) USING BTREE,
  CONSTRAINT `mission_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mission_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mission_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for mission_log
-- ----------------------------
DROP TABLE IF EXISTS `mission_log`;
CREATE TABLE `mission_log`  (
  `mission_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `receiver_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `publisher_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `receiver_reply` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`mission_id`, `receiver_id`, `publisher_id`) USING BTREE,
  INDEX `receiver_id`(`receiver_id` ASC) USING BTREE,
  INDEX `publisher_id`(`publisher_id` ASC) USING BTREE,
  CONSTRAINT `mission_log_ibfk_1` FOREIGN KEY (`mission_id`) REFERENCES `mission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for monitor
-- ----------------------------
DROP TABLE IF EXISTS `monitor`;
CREATE TABLE `monitor`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `employee_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `shot_blob` mediumblob NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `employee_id`(`employee_id` ASC) USING BTREE,
  CONSTRAINT `monitor_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for process_log
-- ----------------------------
DROP TABLE IF EXISTS `process_log`;
CREATE TABLE `process_log`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `log_content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL,
  `employee_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `project_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `employee_id`(`employee_id` ASC) USING BTREE,
  INDEX `project_id`(`project_id` ASC) USING BTREE,
  CONSTRAINT `process_log_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `process_log_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `quotation` int NOT NULL COMMENT '报价',
  `client_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '进度',
  `create_date` datetime NOT NULL,
  `complete_date` datetime NULL DEFAULT NULL,
  `cloud_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目在云盘中所处的位置（即项目根目录）',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `cloud_id`(`cloud_id` ASC) USING BTREE,
  INDEX `client_id`(`client_id` ASC) USING BTREE,
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`cloud_id`) REFERENCES `cloud` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for subsidiary_company
-- ----------------------------
DROP TABLE IF EXISTS `subsidiary_company`;
CREATE TABLE `subsidiary_company`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `company_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `company_id`(`company_id` ASC) USING BTREE,
  CONSTRAINT `subsidiary_company_ibfk_1` FOREIGN KEY (`company_id`) REFERENCES `client_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- View structure for base_mission_view
-- ----------------------------
DROP VIEW IF EXISTS `base_mission_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `base_mission_view` AS select `mission`.`id` AS `mission_id`,`mission`.`name` AS `mission_name`,`mission`.`content` AS `mission_content`,`mission`.`create_date` AS `mission_create_date`,`mission`.`complete_date` AS `mission_complete_date`,`mission`.`status` AS `mission_status`,`mission`.`project_id` AS `project_id`,`project`.`name` AS `project_name`,`mission`.`publisher_id` AS `publisher_id`,`employee_publisher`.`name` AS `publisher_name`,`mission`.`receiver_id` AS `receiver_id`,`employee_receiver`.`name` AS `receiver_name`,`mission`.`bonus` AS `mission_bonus`,`mission_log`.`receiver_reply` AS `receiver_reply` from ((((`project` join `mission` on((`project`.`id` = `mission`.`project_id`))) join `employee` `employee_publisher` on((`mission`.`publisher_id` = `employee_publisher`.`id`))) join `employee` `employee_receiver` on(((`mission`.`publisher_id` = `employee_publisher`.`id`) and (`mission`.`receiver_id` = `employee_receiver`.`id`)))) join `mission_log` on(((`mission`.`id` = `mission_log`.`mission_id`) and (`mission`.`receiver_id` = `mission_log`.`receiver_id`) and (`mission`.`publisher_id` = `mission_log`.`publisher_id`))));

-- ----------------------------
-- View structure for base_process_log_view
-- ----------------------------
DROP VIEW IF EXISTS `base_process_log_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `base_process_log_view` AS select `process_log`.`id` AS `process_log_id`,`process_log`.`log_content` AS `process_log_content`,`process_log`.`date` AS `process_log_date`,`process_log`.`employee_id` AS `employee_id`,`employee_operator`.`name` AS `employee_name`,`department`.`name` AS `employee_department_name`,`process_log`.`project_id` AS `project_id`,`project`.`name` AS `project_name`,`project`.`status` AS `project_status`,`project`.`create_date` AS `project_create_date`,`project`.`complete_date` AS `project_complete_date`,`employee_operator`.`supervisor_id` AS `employee_supervisor_id`,`employee_supervisor`.`name` AS `employee_supervisor_name` from ((((`process_log` join `project` on((`process_log`.`project_id` = `project`.`id`))) join `employee` `employee_operator` on((`process_log`.`employee_id` = `employee_operator`.`id`))) join `department` on((`employee_operator`.`department_id` = `department`.`id`))) join `employee` `employee_supervisor` on((`employee_operator`.`supervisor_id` = `employee_supervisor`.`id`)));

-- ----------------------------
-- View structure for base_project_view
-- ----------------------------
DROP VIEW IF EXISTS `base_project_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `base_project_view` AS select `project`.`id` AS `project_id`,`project`.`name` AS `project_name`,`project`.`quotation` AS `project_quotation`,`client`.`id` AS `client_id`,`client`.`name` AS `client_name`,`project`.`status` AS `project_status`,`project`.`create_date` AS `project_create_date`,`project`.`complete_date` AS `project_complete_date`,`cloud`.`id` AS `cloud_id`,`cloud`.`name` AS `cloud_name`,`cloud`.`path` AS `cloud_path` from ((`project` join `client` on((`project`.`client_id` = `client`.`id`))) left join `cloud` on((`project`.`cloud_id` = `cloud`.`id`)));

-- ----------------------------
-- View structure for base_user_view
-- ----------------------------
DROP VIEW IF EXISTS `base_user_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `base_user_view` AS select `user`.`id` AS `account_id`,`user`.`password` AS `account_password`,`employee`.`supervisor_id` AS `supervisor_id`,`employee`.`id` AS `employee_id`,`employee`.`name` AS `employee_name`,`employee`.`department_id` AS `department_id` from (`employee` join `user` on((`employee`.`user_id` = `user`.`id`)));

-- ----------------------------
-- View structure for employee_cloud_view
-- ----------------------------
DROP VIEW IF EXISTS `employee_cloud_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `employee_cloud_view` AS select `cloud`.`name` AS `cloud_name`,`cloud`.`path` AS `cloud_path`,`cloud`.`type` AS `cloud_type`,`cloud`.`size` AS `cloud_size`,`cloud`.`modify_date` AS `cloud_modify_date`,`mission`.`receiver_id` AS `employee_id`,`employee`.`user_id` AS `user_id`,`mission`.`id` AS `mission_id`,`mission`.`project_id` AS `project_id`,`project`.`cloud_id` AS `cloud_id` from ((((`mission` join `employee` on((`mission`.`receiver_id` = `employee`.`id`))) join `cloud`) join `project` on(((`cloud`.`id` = `project`.`cloud_id`) and (`mission`.`project_id` = `project`.`id`)))) join `user` on((`employee`.`user_id` = `user`.`id`)));

-- ----------------------------
-- View structure for employee_project_view
-- ----------------------------
DROP VIEW IF EXISTS `employee_project_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `employee_project_view` AS select `employee`.`id` AS `employee_id`,`employee`.`name` AS `employee_name`,`project`.`id` AS `project_id`,`project`.`name` AS `project_name`,`project`.`client_id` AS `client_id`,`project`.`status` AS `project_status`,`project`.`create_date` AS `project_create_date`,`project`.`cloud_id` AS `cloud_id`,`project`.`complete_date` AS `project_complete_date` from ((`project` join `employee_project` on((`project`.`id` = `employee_project`.`project_id`))) join `employee` on((`employee_project`.`employee_id` = `employee`.`id`)));

-- ----------------------------
-- View structure for employee_salary_view
-- ----------------------------
DROP VIEW IF EXISTS `employee_salary_view`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `employee_salary_view` AS select `employee`.`name` AS `employee_name`,`employee`.`salary_least` AS `salary_least`,year(`mission`.`complete_date`) AS `year`,month(`mission`.`complete_date`) AS `month`,count(`mission`.`id`) AS `mission_count`,sum(`mission`.`bonus`) AS `salary`,`mission`.`receiver_id` AS `employee_id` from (`mission` join `employee` on((`mission`.`receiver_id` = `employee`.`id`))) where ((`mission`.`status` = 3) and (`mission`.`complete_date` is not null) and (`employee`.`id` <> `employee`.`supervisor_id`)) group by year(`mission`.`complete_date`),month(`mission`.`complete_date`),`employee`.`id`;

SET FOREIGN_KEY_CHECKS = 1;
