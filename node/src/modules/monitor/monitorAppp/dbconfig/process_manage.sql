/*
 Navicat Premium Data Transfer

 Source Server         : LocalHost
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : process_manage

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 10/01/2024 14:24:53
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
-- Records of branch_company
-- ----------------------------
INSERT INTO `branch_company` VALUES ('003', '重庆大学', '002');
INSERT INTO `branch_company` VALUES ('004', '重庆医科大学', '002');
INSERT INTO `branch_company` VALUES ('005', '重庆市人民医院', '002');
INSERT INTO `branch_company` VALUES ('007', '重庆工商大学', '006');
INSERT INTO `branch_company` VALUES ('008', '重庆市江北国际机场', '006');
INSERT INTO `branch_company` VALUES ('009', '重庆市江北区人民法院', '006');
INSERT INTO `branch_company` VALUES ('011', '重庆师范大学', '010');
INSERT INTO `branch_company` VALUES ('012', '重庆市沙坪坝区人民检察院', '010');
INSERT INTO `branch_company` VALUES ('013', '重庆市沙坪坝区人民政府', '010');
INSERT INTO `branch_company` VALUES ('016', '重庆邮电大学', '015');
INSERT INTO `branch_company` VALUES ('017', '重庆市九龙坡区人民政府', '015');
INSERT INTO `branch_company` VALUES ('018', '重庆市九龙坡区人民医院', '015');
INSERT INTO `branch_company` VALUES ('020', '重庆市巴南区人民法院', '019');
INSERT INTO `branch_company` VALUES ('021', '重庆市巴南区人民检察院', '019');
INSERT INTO `branch_company` VALUES ('022', '重庆市巴南区人民政府', '019');
INSERT INTO `branch_company` VALUES ('024', '重庆市北碚区人民法院', '023');
INSERT INTO `branch_company` VALUES ('025', '重庆市北碚区人民检察院', '023');
INSERT INTO `branch_company` VALUES ('026', '重庆市北碚区人民政府', '023');
INSERT INTO `branch_company` VALUES ('027', '重庆交通大学', '024');
INSERT INTO `branch_company` VALUES ('029', '重庆市渝北区人民法院', '028');
INSERT INTO `branch_company` VALUES ('030', '重庆市渝北区人民检察院', '028');
INSERT INTO `branch_company` VALUES ('031', '重庆市渝北区人民政府', '028');
INSERT INTO `branch_company` VALUES ('033', '重庆市合川区人民法院', '032');
INSERT INTO `branch_company` VALUES ('034', '重庆市合川区人民检察院', '032');
INSERT INTO `branch_company` VALUES ('035', '重庆市合川区人民政府', '032');
INSERT INTO `branch_company` VALUES ('037', '重庆市万州区人民法院', '036');
INSERT INTO `branch_company` VALUES ('038', '重庆市万州区人民检察院', '036');
INSERT INTO `branch_company` VALUES ('039', '重庆市万州区人民政府', '036');
INSERT INTO `branch_company` VALUES ('042', '成都市武侯区人民法院', '041');
INSERT INTO `branch_company` VALUES ('043', '成都市武侯区人民检察院', '041');
INSERT INTO `branch_company` VALUES ('044', '成都市武侯区人民政府', '041');
INSERT INTO `branch_company` VALUES ('046', '成都市锦江区人民法院', '045');
INSERT INTO `branch_company` VALUES ('047', '成都市锦江区人民检察院', '045');
INSERT INTO `branch_company` VALUES ('048', '成都市锦江区人民政府', '045');
INSERT INTO `branch_company` VALUES ('050', '成都市青羊区人民法院', '049');
INSERT INTO `branch_company` VALUES ('051', '成都市青羊区人民检察院', '049');
INSERT INTO `branch_company` VALUES ('052', '成都市青羊区人民政府', '049');
INSERT INTO `branch_company` VALUES ('054', '成都市金牛区人民法院', '053');
INSERT INTO `branch_company` VALUES ('055', '成都市金牛区人民检察院', '053');
INSERT INTO `branch_company` VALUES ('056', '成都市金牛区人民政府', '053');
INSERT INTO `branch_company` VALUES ('058', '成都市成华区人民法院', '057');
INSERT INTO `branch_company` VALUES ('059', '成都市成华区人民检察院', '057');
INSERT INTO `branch_company` VALUES ('060', '成都市成华区人民政府', '057');
INSERT INTO `branch_company` VALUES ('063', '北京市东城区人民法院', '062');
INSERT INTO `branch_company` VALUES ('064', '北京市东城区人民检察院', '062');
INSERT INTO `branch_company` VALUES ('065', '北京市东城区人民政府', '062');
INSERT INTO `branch_company` VALUES ('067', '北京市西城区人民法院', '066');
INSERT INTO `branch_company` VALUES ('068', '北京市西城区人民检察院', '066');
INSERT INTO `branch_company` VALUES ('069', '北京市西城区人民政府', '066');
INSERT INTO `branch_company` VALUES ('071', '北京市朝阳区人民法院', '070');
INSERT INTO `branch_company` VALUES ('072', '北京市朝阳区人民检察院', '070');
INSERT INTO `branch_company` VALUES ('073', '北京市朝阳区人民政府', '070');
INSERT INTO `branch_company` VALUES ('075', '北京市海淀区人民法院', '074');
INSERT INTO `branch_company` VALUES ('076', '北京市海淀区人民检察院', '074');
INSERT INTO `branch_company` VALUES ('077', '北京市海淀区人民政府', '074');
INSERT INTO `branch_company` VALUES ('079', '北京市丰台区人民法院', '078');
INSERT INTO `branch_company` VALUES ('080', '北京市丰台区人民检察院', '078');
INSERT INTO `branch_company` VALUES ('081', '北京市丰台区人民政府', '078');

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
-- Records of client
-- ----------------------------
INSERT INTO `client` VALUES ('082', '张三', '13812345678', '123456789', 'zhangsan@163.com', '003');
INSERT INTO `client` VALUES ('083', '李四', '13987654321', '987654321', 'lisi@126.com', '003');
INSERT INTO `client` VALUES ('084', '王五', '13713572468', '13572468', 'wangwu@sina.com', '004');
INSERT INTO `client` VALUES ('085', '赵六', '13624681357', '24681357', 'zhaoliu@qq.com', '004');
INSERT INTO `client` VALUES ('086', '孙七', '13456781234', '56781234', 'sunqi@sohu.com', '005');
INSERT INTO `client` VALUES ('087', '周八', '13345678901', '45678901', 'zhouba@tom.com', '005');
INSERT INTO `client` VALUES ('088', '吴九', '13212344321', '12344321', 'wujiu@yeah.net', '007');
INSERT INTO `client` VALUES ('089', '郑十', '13198761234', '98761234', 'zhengshi@foxmail.com', '007');
INSERT INTO `client` VALUES ('090', '冯十一', '13076543210', '76543210', 'fengshiyi@outlook.com', '008');
INSERT INTO `client` VALUES ('091', '陈十二', '15987654321', '87654321', 'chenshier@gmail.com', '008');
INSERT INTO `client` VALUES ('092', '楚十三', '15812345678', '12345678', 'chushisan@msn.com', '009');
INSERT INTO `client` VALUES ('093', '魏十四', '15713572468', '13572468', 'weishisi@yahoo.com', '009');
INSERT INTO `client` VALUES ('094', '蒋十五', '15624681357', '24681357', 'jiangshiwu@bing.com', '011');
INSERT INTO `client` VALUES ('095', '沈十六', '15556781234', '56781234', 'shenshiliu@zhihu.com', '011');
INSERT INTO `client` VALUES ('096', '韩十七', '15445678901', '45678901', 'hanshiji@weibo.com', '012');
INSERT INTO `client` VALUES ('097', '杨十八', '15312344321', '12344321', 'yangshiba@weixin.com', '012');
INSERT INTO `client` VALUES ('098', '朱十九', '15298761234', '98761234', 'zhushiwu@taobao.com', '013');
INSERT INTO `client` VALUES ('099', '秦二十', '15176543210', '76543210', 'qinershi@jd.com', '013');
INSERT INTO `client` VALUES ('100', '许二十一', '15087654321', '87654321', 'xuershiyi@baidu.com', '016');
INSERT INTO `client` VALUES ('101', '何二十二', '14912345678', '12345678', 'hershiyi@alibaba.com', '016');
INSERT INTO `client` VALUES ('102', '曹二十三', '14813572468', '13572468', 'caoshiyi@tencent.com', '017');
INSERT INTO `client` VALUES ('103', '姜二十四', '14724681357', '24681357', 'jiangshisi@netease.com', '017');
INSERT INTO `client` VALUES ('104', '董二十五', '14656781234', '56781234', 'dongshiwu@meituan.com', '018');
INSERT INTO `client` VALUES ('105', '宋二十六', '14545678901', '45678901', 'songshiliu@pinduoduo.com', '018');
INSERT INTO `client` VALUES ('106', '范二十七', '14412344321', '12344321', 'fanshiji@xiaomi.com', '020');
INSERT INTO `client` VALUES ('107', '方二十八', '14398761234', '98761234', 'fangshiba@huawei.com', '020');
INSERT INTO `client` VALUES ('108', '潘二十九', '14276543210', '76543210', 'panshiwu@bytedance.com', '021');
INSERT INTO `client` VALUES ('109', '马三十', '14187654321', '87654321', 'mashier@bilibili.com', '021');
INSERT INTO `client` VALUES ('110', '苏三十一', '14012345678', '12345678', 'sushiyi@kuaishou.com', '022');
INSERT INTO `client` VALUES ('111', '黄三十二', '13913572468', '13572468', 'huangshier@iqiyi.com', '022');
INSERT INTO `client` VALUES ('112', '程三十三', '13824681357', '24681357', 'chengshisan@youku.com', '024');
INSERT INTO `client` VALUES ('113', '邹三十四', '13756781234', '56781234', 'zoushisi@tiktok.com', '024');
INSERT INTO `client` VALUES ('114', '田三十五', '13645678901', '45678901', 'tianshiwu@youtube.com', '025');
INSERT INTO `client` VALUES ('115', '毛三十六', '13512344321', '12344321', 'maoshiliu@facebook.com', '025');
INSERT INTO `client` VALUES ('116', '林三十七', '13498761234', '98761234', 'linshiji@twitter.com', '026');
INSERT INTO `client` VALUES ('117', '罗三十八', '13376543210', '76543210', 'luoshiba@instagram.com', '026');
INSERT INTO `client` VALUES ('118', '高三十九', '13287654321', '87654321', 'gaosanjiu@amazon.com', '029');
INSERT INTO `client` VALUES ('119', '徐四十', '13112345678', '12345678', 'xusishi@netflix.com', '029');
INSERT INTO `client` VALUES ('120', '段四十一', '13013572468', '13572468', 'duanshiyi@spotify.com', '030');
INSERT INTO `client` VALUES ('121', '胡四十二', '12924681357', '24681357', 'hushier@linkedin.com', '030');
INSERT INTO `client` VALUES ('122', '梁四十三', '12856781234', '56781234', 'liangshisan@reddit.com', '031');
INSERT INTO `client` VALUES ('123', '于四十四', '12745678901', '45678901', 'yushisi@discord.com', '031');
INSERT INTO `client` VALUES ('124', '余四十五', '12612344321', '12344321', 'yushiwu@slack.com', '033');
INSERT INTO `client` VALUES ('125', '叶四十六', '12598761234', '98761234', 'yeshiliu@zoom.com', '033');
INSERT INTO `client` VALUES ('126', '韦四十七', '12476543210', '76543210', 'weishiwi@skype.com', '034');
INSERT INTO `client` VALUES ('127', '孔四十八', '12387654321', '87654321', 'kongshiba@whatsapp.com', '034');
INSERT INTO `client` VALUES ('128', '曾四十九', '12212345678', '12345678', 'zengshiwi@telegram.com', '035');
INSERT INTO `client` VALUES ('129', '丁五十', '12113572468', '13572468', 'dingwushi@snapchat.com', '035');
INSERT INTO `client` VALUES ('130', '安五十一', '12024681357', '24681357', 'anwuyi@twitch.com', '037');
INSERT INTO `client` VALUES ('131', '常五十二', '11956781234', '56781234', 'changwuer@steam.com', '037');
INSERT INTO `client` VALUES ('132', '乐五十三', '11845678901', '45678901', 'lewusan@epicgames.com', '038');
INSERT INTO `client` VALUES ('133', '时五十四', '11712344321', '12344321', 'shiwusi@nintendo.com', '038');
INSERT INTO `client` VALUES ('134', '付五十五', '11698761234', '98761234', 'fuwuwu@sony.com', '039');
INSERT INTO `client` VALUES ('135', '鲁五十六', '11576543210', '76543210', 'luwuli@xbox.com', '039');
INSERT INTO `client` VALUES ('136', '雷五十七', '11487654321', '87654321', 'leiwuqi@ea.com', '042');
INSERT INTO `client` VALUES ('137', '贺五十八', '11312345678', '12345678', 'hewuba@ubisoft.com', '042');
INSERT INTO `client` VALUES ('138', '倪五十九', '11213572468', '13572468', 'niwuwu@blizzard.com', '043');
INSERT INTO `client` VALUES ('139', '汤六十', '11124681357', '24681357', 'tangliushi@riotgames.com', '043');
INSERT INTO `client` VALUES ('140', '滕六十一', '11056781234', '56781234', 'tengliuyi@valve.com', '044');
INSERT INTO `client` VALUES ('141', '殷六十二', '10945678901', '45678901', 'yinliuer@rockstar.com', '044');
INSERT INTO `client` VALUES ('142', '罗六十三', '10812344321', '12344321', 'luoliusan@capcom.com', '046');
INSERT INTO `client` VALUES ('143', '毕六十四', '10798761234', '98761234', 'biliusi@sega.com', '046');
INSERT INTO `client` VALUES ('144', '郝六十五', '10676543210', '76543210', 'haoliuwu@niantic.com', '047');
INSERT INTO `client` VALUES ('145', '邬六十六', '10587654321', '87654321', 'wuliuli@supercell.com', '047');
INSERT INTO `client` VALUES ('146', '卞六十七', '10412345678', '12345678', 'bianliuqi@king.com', '048');
INSERT INTO `client` VALUES ('147', '康六十八', '10313572468', '13572468', 'kangliuba@roblox.com', '048');
INSERT INTO `client` VALUES ('148', '伍六十九', '10224681357', '24681357', 'wuliuwu@mojang.com', '050');
INSERT INTO `client` VALUES ('149', '余七十', '10156781234', '56781234', 'yuqishi@bethesda.com', '050');
INSERT INTO `client` VALUES ('150', '元七十一', '10045678901', '45678901', 'yuanqiyi@cdprojekt.com', '051');
INSERT INTO `client` VALUES ('151', '顾七十二', '09912344321', '12344321', 'guqier@konami.com', '051');
INSERT INTO `client` VALUES ('152', '孟七十三', '09898761234', '98761234', 'mengqisan@squareenix.com', '052');
INSERT INTO `client` VALUES ('153', '平七十四', '09776543210', '76543210', 'pingqisi@activision.com', '052');
INSERT INTO `client` VALUES ('154', '黎七十五', '09687654321', '87654321', 'liqiwu@namco.com', '054');
INSERT INTO `client` VALUES ('155', '夏七十六', '09512345678', '12345678', 'xiaqiliu@nintendo.com', '054');
INSERT INTO `client` VALUES ('156', '翁七十七', '09413572468', '13572468', 'wengqiqi@sony.com', '055');
INSERT INTO `client` VALUES ('157', '柯七十八', '09324681357', '24681357', 'keqiba@xbox.com', '055');
INSERT INTO `client` VALUES ('158', '耿七十九', '09256781234', '56781234', 'gengqiwu@ea.com', '056');
INSERT INTO `client` VALUES ('159', '牟八十', '09145678901', '45678901', 'moubashi@ubisoft.com', '056');
INSERT INTO `client` VALUES ('160', '卜八十一', '09012344321', '12344321', 'bubayi@blizzard.com', '058');
INSERT INTO `client` VALUES ('161', '路八十二', '08998761234', '98761234', 'lubaer@riotgames.com', '058');
INSERT INTO `client` VALUES ('162', '游八十三', '08876543210', '76543210', 'youbasan@valve.com', '059');
INSERT INTO `client` VALUES ('163', '辛八十四', '08787654321', '87654321', 'xinbasi@rockstar.com', '059');
INSERT INTO `client` VALUES ('164', '靳八十五', '08612345678', '12345678', 'jinbawu@capcom.com', '060');
INSERT INTO `client` VALUES ('165', '麻八十六', '08513572468', '13572468', 'mabaliu@konami.com', '060');
INSERT INTO `client` VALUES ('180', '邱一百零一', '07076543210', '76543210', 'qiuyilingyi@tencent.com', '072');
INSERT INTO `client` VALUES ('181', '史一百零二', '06987654321', '87654321', 'shiyilinger@alibaba.com', '072');
INSERT INTO `client` VALUES ('182', '侯一百零三', '06812345678', '12345678', 'houyilingsan@baidu.com', '073');
INSERT INTO `client` VALUES ('183', '宫一百零四', '06713572468', '13572468', 'gongyilingsi@xiaomi.com', '073');
INSERT INTO `client` VALUES ('184', '宁一百零五', '06624681357', '24681357', 'ningyilingwu@huawei.com', '075');
INSERT INTO `client` VALUES ('185', '仇一百零六', '06556781234', '56781234', 'qiuyilingliu@bytedance.com', '075');
INSERT INTO `client` VALUES ('186', '暴一百零七', '06445678901', '45678901', 'baoyilingqi@bilibili.com', '076');
INSERT INTO `client` VALUES ('187', '甘一百零八', '06312344321', '12344321', 'ganyilingba@kuaishou.com', '076');
INSERT INTO `client` VALUES ('188', '钱一百零九', '06298761234', '98761234', 'qianyilingjiu@iqiyi.com', '077');
INSERT INTO `client` VALUES ('189', '施一百一十', '06176543210', '76543210', 'shiyiyishi@youku.com', '077');
INSERT INTO `client` VALUES ('190', '厉一百一十一', '06087654321', '87654321', 'liyiyishiyi@tiktok.com', '079');
INSERT INTO `client` VALUES ('191', '伊一百一十二', '05912345678', '12345678', 'yiyiyishier@youtube.com', '079');
INSERT INTO `client` VALUES ('192', '余一百一十三', '05813572468', '13572468', 'yuyiyishisan@facebook.com', '080');
INSERT INTO `client` VALUES ('193', '元一百一十四', '05724681357', '24681357', 'yuanyiyishisi@twitter.com', '080');
INSERT INTO `client` VALUES ('194', '顾一百一十五', '05656781234', '56781234', 'guyiyishiwu@instagram.com', '081');
INSERT INTO `client` VALUES ('195', '孟一百一十六', '05545678901', '45678901', 'mengyiyishiliu@whatsapp.com', '081');
INSERT INTO `client` VALUES ('196', '李飞飞', '15320390102', '728482649', '728482649@qq.com', '027');
INSERT INTO `client` VALUES ('197', '赵', '15616132188', '78946565412', 'dad84@163.com', '027');

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
-- Records of client_company
-- ----------------------------
INSERT INTO `client_company` VALUES ('001', '重庆市');
INSERT INTO `client_company` VALUES ('040', '成都市');
INSERT INTO `client_company` VALUES ('061', '北京市');

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
-- Records of cloud
-- ----------------------------
INSERT INTO `cloud` VALUES ('root', 'root', 'root', '\\', 0, 0, '2023-12-05 10:47:37');
INSERT INTO `cloud` VALUES ('\\projects', 'projects', '\\', 'root', 0, 0, '2023-12-10 10:48:07');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10', '项目一-张三-重庆大学-2024.1.10', '\\projects', '\\projects', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\jpg', 'jpg', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\后期文件', '后期文件', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\后期文件\\原始文件', '原始文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\后期文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\后期文件', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\小样', '小样', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件', '模型文件', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件\\原始模型', '原始模型', '\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件\\最终模型', '最终模型', '\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件', '渲染文件', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件\\原始渲染', '原始渲染', '\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件\\最终渲染', '最终渲染', '\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件', '\\projects\\项目一-张三-重庆大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目一-张三-重庆大学-2024.1.10\\资料', '资料', '\\projects\\项目一-张三-重庆大学-2024.1.10', '\\projects\\项目一-张三-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:43:56');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10', '项目三-王五-重庆医科大学-2024.1.10', '\\projects', '\\projects', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\jpg', 'jpg', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\后期文件', '后期文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\后期文件\\原始文件', '原始文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\后期文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\后期文件', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\小样', '小样', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件', '模型文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件\\原始模型', '原始模型', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件\\最终模型', '最终模型', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件', '渲染文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件\\原始渲染', '原始渲染', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件\\最终渲染', '最终渲染', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件', '\\projects\\项目三-王五-重庆医科大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目三-王五-重庆医科大学-2024.1.10\\资料', '资料', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', '\\projects\\项目三-王五-重庆医科大学-2024.1.10', 0, 0, '2024-01-10 13:48:40');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10', '项目二-李四-重庆大学-2024.1.10', '\\projects', '\\projects', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\jpg', 'jpg', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\后期文件', '后期文件', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\后期文件\\原始文件', '原始文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\后期文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\后期文件', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\小样', '小样', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件', '模型文件', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件\\原始模型', '原始模型', '\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件\\最终模型', '最终模型', '\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\模型文件', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件', '渲染文件', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件\\原始渲染', '原始渲染', '\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件\\最终渲染', '最终渲染', '\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件', '\\projects\\项目二-李四-重庆大学-2024.1.10\\渲染文件', 0, 0, '2024-01-10 13:48:23');
INSERT INTO `cloud` VALUES ('\\projects\\项目二-李四-重庆大学-2024.1.10\\资料', '资料', '\\projects\\项目二-李四-重庆大学-2024.1.10', '\\projects\\项目二-李四-重庆大学-2024.1.10', 0, 0, '2024-01-10 13:48:23');

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
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES ('1', '模型部门');
INSERT INTO `department` VALUES ('2', '渲染部门');
INSERT INTO `department` VALUES ('3', '后期制作部门');

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
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES ('1', '刘一', '男', 25, '13245678901', 'liuyi@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg1', '1', '_34_Is-vdm9BgNFRNzGlV', 1);
INSERT INTO `employee` VALUES ('10', '吴十', '女', 16, '13245678910', 'wushi@msn.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg10', '1', '_34_Is-vdm9BgNFRNzGlV', 0);
INSERT INTO `employee` VALUES ('11', '郑十一', '男', 25, '13245678911', 'zhengshiyi@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg11', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('12', '冯十二', '女', 24, '13245678912', 'fengshier@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg12', '2', 'bMC3y8lqWNevNCYUXy-bq', 0);
INSERT INTO `employee` VALUES ('13', '陈十三', '男', 23, '13245678913', 'chenshisan@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg13', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('14', '褚十四', '女', 22, '13245678914', 'chushisi@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg14', '2', 'bMC3y8lqWNevNCYUXy-bq', 0);
INSERT INTO `employee` VALUES ('15', '卫十五', '男', 21, '13245678915', 'weishiwu@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg15', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('16', '蒋十六', '女', 20, '13245678916', 'jiangshiliu@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg16', '2', 'bMC3y8lqWNevNCYUXy-bq', 0);
INSERT INTO `employee` VALUES ('17', '钱十七', '男', 19, '13245678917', 'qianshiqi@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg17', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('18', '孙十八', '女', 18, '13245678918', 'sunshiba@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg18', '2', 'bMC3y8lqWNevNCYUXy-bq', 0);
INSERT INTO `employee` VALUES ('19', '周十九', '男', 17, '13245678919', 'zhoushiji@outlook.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg19', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('2', '陈二', '女', 24, '13245678902', 'chener@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg2', '1', '_34_Is-vdm9BgNFRNzGlV', 0);
INSERT INTO `employee` VALUES ('20', '吴二十', '女', 16, '13245678920', 'wuer@outlook.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg20', '2', 'bMC3y8lqWNevNCYUXy-bq', 0);
INSERT INTO `employee` VALUES ('21', '郑二十一', '男', 25, '13245678921', 'zhenger@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg21', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('22', '冯二十二', '女', 24, '13245678922', 'fenger@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg22', '3', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('23', '陈二十三', '男', 23, '13245678923', 'chensan@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg23', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('24', '褚二十四', '女', 22, '13245678924', 'chuesi@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg24', '3', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('25', '卫二十五', '男', 21, '13245678925', 'weierwu@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg25', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('26', '蒋二十六', '女', 20, '13245678926', 'jiangerliu@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg26', '3', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('27', '钱二十七', '男', 19, '13245678927', 'qianerqi@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg27', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('28', '孙二十八', '女', 18, '13245678928', 'sunerba@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg28', '3', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('29', '周二十九', '男', 17, '13245678929', 'zhouerjiu@outlook.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg29', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('3', '张三', '男', 23, '13245678903', 'zhangsan@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg3', '1', '_34_Is-vdm9BgNFRNzGlV', 1);
INSERT INTO `employee` VALUES ('30', '吴三十', '女', 16, '13245678930', 'wusan@outlook.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg30', '3', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('31', '郑三十一', '男', 25, '13245678931', 'zhengsan@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg31', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('32', '冯三十二', '女', 24, '13245678932', 'fengsan@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg32', '1', 'u39v8hWp2t7M11yRhVE3T', 0);
INSERT INTO `employee` VALUES ('33', '陈三十三', '男', 23, '13245678933', 'chensan@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg33', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('34', '褚三十四', '女', 22, '13245678934', 'chusan@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg34', '1', 'u39v8hWp2t7M11yRhVE3T', 0);
INSERT INTO `employee` VALUES ('35', '卫三十五', '男', 21, '13245678935', 'wesan@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg35', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('36', '蒋三十六', '女', 20, '13245678936', 'jiansan@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg36', '1', 'u39v8hWp2t7M11yRhVE3T', 0);
INSERT INTO `employee` VALUES ('37', '钱三十七', '男', 19, '13245678937', 'qiansan@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg37', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('38', '孙三十八', '女', 18, '13245678938', 'sunsan@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg38', '1', 'u39v8hWp2t7M11yRhVE3T', 0);
INSERT INTO `employee` VALUES ('39', '周三十九', '男', 17, '13245678939', 'zhousan@outlook.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg39', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('4', '李四', '女', 22, '13245678904', 'lisi@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg4', '1', '_34_Is-vdm9BgNFRNzGlV', 0);
INSERT INTO `employee` VALUES ('40', '吴四十', '女', 16, '13245678940', 'wusi@outlook.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg40', '1', 'u39v8hWp2t7M11yRhVE3T', 0);
INSERT INTO `employee` VALUES ('41', '郑四十一', '男', 25, '13245678941', 'zhengsi@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg41', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('42', '冯四十二', '女', 24, '13245678942', 'fengsi@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg42', '2', 'wSek39yxqPbarTVZD-1GJ', 0);
INSERT INTO `employee` VALUES ('43', '陈四十三', '男', 23, '13245678943', 'chensi@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg43', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('44', '褚四十四', '女', 22, '13245678944', 'chusi@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg44', '2', 'wSek39yxqPbarTVZD-1GJ', 0);
INSERT INTO `employee` VALUES ('45', '卫四十五', '男', 21, '13245678945', 'wesiwu@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg45', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('46', '蒋四十六', '女', 20, '13245678946', 'jiansiliu@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg46', '2', 'wSek39yxqPbarTVZD-1GJ', 0);
INSERT INTO `employee` VALUES ('47', '钱四十七', '男', 19, '13245678947', 'qiansiqi@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg47', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('48', '孙四十八', '女', 18, '13245678948', 'sunsiba@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg48', '2', 'wSek39yxqPbarTVZD-1GJ', 0);
INSERT INTO `employee` VALUES ('49', '周四十九', '男', 17, '13245678949', 'zhousiji@outlook.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg49', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('5', '王五', '男', 21, '13245678905', 'wangwu@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg5', '1', '_34_Is-vdm9BgNFRNzGlV', 1);
INSERT INTO `employee` VALUES ('50', '吴五十', '女', 16, '13245678950', 'wuwu@outlook.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg50', '2', 'T7eF0X7yeGRLfH_FfQPVD', 0);
INSERT INTO `employee` VALUES ('51', '郑五十一', '男', 25, '13245678951', 'zhengwu@163.com', '重庆市', 10000.00, '2020-01-15 00:00:00', NULL, 'yg51', '1', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('52', '冯五十二', '女', 24, '13245678952', 'fengwu@126.com', '重庆市', 9000.00, '2020-01-16 00:00:00', NULL, 'yg52', '1', 'tNLJqohtCAuc2b_dArpJJ', 0);
INSERT INTO `employee` VALUES ('53', '陈五十三', '男', 23, '13245678953', 'chenwu@sina.com', '重庆市', 8000.00, '2020-01-17 00:00:00', NULL, 'yg53', '1', 'tNLJqohtCAuc2b_dArpJJ', 1);
INSERT INTO `employee` VALUES ('54', '褚五十四', '女', 22, '13245678954', 'chuwu@qq.com', '重庆市', 7000.00, '2020-01-18 00:00:00', NULL, 'yg54', '1', 'tNLJqohtCAuc2b_dArpJJ', 0);
INSERT INTO `employee` VALUES ('55', '卫五十五', '男', 21, '13245678955', 'wewu@sohu.com', '重庆市', 6000.00, '2020-01-19 00:00:00', NULL, 'yg55', '1', 'tNLJqohtCAuc2b_dArpJJ', 1);
INSERT INTO `employee` VALUES ('56', '蒋五十六', '女', 20, '13245678956', 'jianwu@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg56', '1', 'tNLJqohtCAuc2b_dArpJJ', 0);
INSERT INTO `employee` VALUES ('57', '钱五十七', '男', 19, '13245678957', 'qianwu@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg57', '1', 'tNLJqohtCAuc2b_dArpJJ', 1);
INSERT INTO `employee` VALUES ('58', '孙五十八', '女', 18, '13245678958', 'sunwu@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg58', '1', 'tNLJqohtCAuc2b_dArpJJ', 0);
INSERT INTO `employee` VALUES ('59', '周五十九', '男', 17, '13245678959', 'zhouwu@outlook.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg59', '1', 'tNLJqohtCAuc2b_dArpJJ', 1);
INSERT INTO `employee` VALUES ('6', '赵六', '女', 20, '13245678906', 'zhaoliu@yeah.net', '重庆市', 5000.00, '2020-01-20 00:00:00', NULL, 'yg6', '1', '_34_Is-vdm9BgNFRNzGlV', 0);
INSERT INTO `employee` VALUES ('60', '吴六十', '女', 16, '13245678960', 'wuliu@outlook.com', '重庆市', 1000.00, '2020-01-24 00:00:00', NULL, 'yg60', '1', 'tNLJqohtCAuc2b_dArpJJ', 0);
INSERT INTO `employee` VALUES ('7', '钱七', '男', 19, '13245678907', 'qianqi@tom.com', '重庆市', 4000.00, '2020-01-21 00:00:00', NULL, 'yg7', '1', '_34_Is-vdm9BgNFRNzGlV', 1);
INSERT INTO `employee` VALUES ('8', '孙八', '女', 18, '13245678908', 'sunba@outlook.com', '重庆市', 3000.00, '2020-01-22 00:00:00', NULL, 'yg8', '1', '_34_Is-vdm9BgNFRNzGlV', 0);
INSERT INTO `employee` VALUES ('9', '周九', '男', 17, '13245678909', 'zhoujiu@gmail.com', '重庆市', 2000.00, '2020-01-23 00:00:00', NULL, 'yg9', '1', '_34_Is-vdm9BgNFRNzGlV', 1);
INSERT INTO `employee` VALUES ('bMC3y8lqWNevNCYUXy-bq', '赵俊辉', '男', 22, '15468451231', '1fas@163.com', '重庆交通大学', 9999.00, '2020-01-13 00:00:00', NULL, 'zg2', '2', 'bMC3y8lqWNevNCYUXy-bq', 1);
INSERT INTO `employee` VALUES ('T7eF0X7yeGRLfH_FfQPVD', '后期主管2', '男', 33, '18956234567', '7879456@qq.com', '重庆市', 150200.00, '2020-01-01 00:00:00', NULL, 'zg6', '3', 'T7eF0X7yeGRLfH_FfQPVD', 1);
INSERT INTO `employee` VALUES ('tNLJqohtCAuc2b_dArpJJ', '郭欢', '女', 18, '15648454652', '798456@qq.com', '重庆交通大学', 9999.00, '2020-01-28 00:00:00', NULL, 'zg3', '3', 'tNLJqohtCAuc2b_dArpJJ', 1);
INSERT INTO `employee` VALUES ('u39v8hWp2t7M11yRhVE3T', '模型主管2', '女', 18, '15623568947', '78946556@qq.com', '重庆市菜鸟驿站', 3500.00, '2021-06-30 00:00:00', NULL, 'zg4', '1', 'u39v8hWp2t7M11yRhVE3T', 1);
INSERT INTO `employee` VALUES ('wSek39yxqPbarTVZD-1GJ', '渲染主管2', '男', 45, '18961231234', '7556492@qq.com', '重庆市老油条', 180000.00, '2015-05-04 00:00:00', NULL, 'zg5', '2', 'wSek39yxqPbarTVZD-1GJ', 1);
INSERT INTO `employee` VALUES ('_34_Is-vdm9BgNFRNzGlV', '李鸿飞', '男', 19, '15320390102', '785644151@163.com', '重庆交通大学', 9999.00, '2020-01-05 00:00:00', NULL, 'zg1', '1', '_34_Is-vdm9BgNFRNzGlV', 1);

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
-- Records of employee_project
-- ----------------------------
INSERT INTO `employee_project` VALUES ('1', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `employee_project` VALUES ('bMC3y8lqWNevNCYUXy-bq', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `employee_project` VALUES ('tNLJqohtCAuc2b_dArpJJ', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `employee_project` VALUES ('_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `employee_project` VALUES ('4', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `employee_project` VALUES ('bMC3y8lqWNevNCYUXy-bq', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `employee_project` VALUES ('tNLJqohtCAuc2b_dArpJJ', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `employee_project` VALUES ('_34_Is-vdm9BgNFRNzGlV', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `employee_project` VALUES ('2', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `employee_project` VALUES ('3', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `employee_project` VALUES ('T7eF0X7yeGRLfH_FfQPVD', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `employee_project` VALUES ('wSek39yxqPbarTVZD-1GJ', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `employee_project` VALUES ('_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');

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
-- Records of mission
-- ----------------------------
INSERT INTO `mission` VALUES ('6jK8EwzvbbGTTIvZEAT3L', '标题', '完成模型2', '2024-01-10 13:59:23', NULL, 1, 'iZCdNvaS-hyv5CkZnhOo8', '_34_Is-vdm9BgNFRNzGlV', '1', 500);
INSERT INTO `mission` VALUES ('fsvmKF6o8mdYNeWdsKqOR', '标题', '合并', '2024-01-10 14:19:01', '2024-01-10 14:19:18', 3, 'iZCdNvaS-hyv5CkZnhOo8', '_34_Is-vdm9BgNFRNzGlV', '2', 780);
INSERT INTO `mission` VALUES ('ku1ZSrRwDSyeaqNlc0qwg', '标题', '完成模型5', '2024-01-10 14:18:42', '2024-01-10 14:19:53', 3, 'h-oajHnExed7QHbP-4j4x', '_34_Is-vdm9BgNFRNzGlV', '4', 650);
INSERT INTO `mission` VALUES ('Ld0zKiWAG6e1Y_UdW5bbd', '标题', '完成模型3', '2024-01-10 14:18:23', '2024-01-10 14:19:37', 3, 'iZCdNvaS-hyv5CkZnhOo8', '_34_Is-vdm9BgNFRNzGlV', '3', 750);
INSERT INTO `mission` VALUES ('rf5vEnyc6UKCpCnlRoX45', '标题', '完成模型1', '2024-01-10 13:58:47', NULL, 2, '9McoSw8tpCajGOFwpn5eE', '_34_Is-vdm9BgNFRNzGlV', '1', 500);
INSERT INTO `mission` VALUES ('SKU49I7Kf2M8tvGzldmGS', '标题', '完成模型1', '2024-01-10 13:59:07', '2024-01-10 14:14:23', 3, 'iZCdNvaS-hyv5CkZnhOo8', '_34_Is-vdm9BgNFRNzGlV', '2', 500);

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
-- Records of mission_log
-- ----------------------------
INSERT INTO `mission_log` VALUES ('6jK8EwzvbbGTTIvZEAT3L', '1', '_34_Is-vdm9BgNFRNzGlV', NULL);
INSERT INTO `mission_log` VALUES ('fsvmKF6o8mdYNeWdsKqOR', '2', '_34_Is-vdm9BgNFRNzGlV', NULL);
INSERT INTO `mission_log` VALUES ('ku1ZSrRwDSyeaqNlc0qwg', '4', '_34_Is-vdm9BgNFRNzGlV', NULL);
INSERT INTO `mission_log` VALUES ('Ld0zKiWAG6e1Y_UdW5bbd', '3', '_34_Is-vdm9BgNFRNzGlV', NULL);
INSERT INTO `mission_log` VALUES ('rf5vEnyc6UKCpCnlRoX45', '1', '_34_Is-vdm9BgNFRNzGlV', NULL);
INSERT INTO `mission_log` VALUES ('SKU49I7Kf2M8tvGzldmGS', '1', '_34_Is-vdm9BgNFRNzGlV', '今天有事');
INSERT INTO `mission_log` VALUES ('SKU49I7Kf2M8tvGzldmGS', '2', '_34_Is-vdm9BgNFRNzGlV', NULL);

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
-- Records of monitor
-- ----------------------------

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
-- Records of process_log
-- ----------------------------
INSERT INTO `process_log` VALUES ('-FeYF91r', '员工\'张三\'接受了任务\'标题\'', '2024-01-10 14:19:34', '3', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('0MVUnhJz', '项目初始化-成功', '2024-01-10 13:48:40', '_34_Is-vdm9BgNFRNzGlV', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('0qdFUU67', '员工\'刘一\'接受了任务\'标题\'', '2024-01-10 14:07:42', '1', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('0Vo78dBD', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:59:23', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('2cbzjjoQ', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:59:07', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('3i0TOCR0', '模型部分完成-成功', '2024-01-10 13:44:26', '_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('4FyM6wMH', '主管\'李鸿飞\'分配了任务\'标题\'', '2024-01-10 14:12:40', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('6jXU6IfF', '主管\'李鸿飞\'分配了任务\'标题\'', '2024-01-10 14:13:37', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('BO0fQIPj', '项目初始化-成功', '2024-01-10 13:48:23', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('cNVXVqMG', '员工\'刘一\'接受了任务\'标题\'', '2024-01-10 13:59:40', '1', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('E8qnc-gk', '渲染部分完成-成功', '2024-01-10 13:45:05', 'bMC3y8lqWNevNCYUXy-bq', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('g9sxrVTK', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:51:42', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('gkNtSRVG', '员工\'刘一\'退回了任务\'标题\'，原因：今天有事', '2024-01-10 14:12:20', '1', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('grV5p5LR', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:49:53', '_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('hX7safwo', '后期制作部分完成-成功', '2024-01-10 13:46:21', 'tNLJqohtCAuc2b_dArpJJ', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('hXAlsyKW', '创建项目-成功', '2024-01-10 13:47:29', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('KPPNsbsw', '创建项目-成功', '2024-01-10 13:48:15', '_34_Is-vdm9BgNFRNzGlV', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('lgVHuLK2', '回滚---项目状态变更为渲染中-成功', '2024-01-10 13:45:33', 'bMC3y8lqWNevNCYUXy-bq', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('MZPd0bM4', '模型部分完成-成功', '2024-01-10 13:48:43', '_34_Is-vdm9BgNFRNzGlV', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('oHNifAD_', '员工\'李四\'将任务\'标题\'设置为<完成>', '2024-01-10 14:19:53', '4', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('PhdpT-29', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:51:20', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('plFmktY3', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 14:18:42', '_34_Is-vdm9BgNFRNzGlV', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('QbwucZIc', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 13:58:47', '_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('sAZ_4K6Z', '员工\'李四\'接受了任务\'标题\'', '2024-01-10 14:19:50', '4', 'h-oajHnExed7QHbP-4j4x');
INSERT INTO `process_log` VALUES ('skS9k9sN', '员工\'刘一\'退回了任务\'标题\'，原因：今天有事', '2024-01-10 14:12:59', '1', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('sSKT1stN', '员工\'陈二\'将任务\'标题\'设置为<完成>', '2024-01-10 14:19:18', '2', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('SVX8MSSC', '创建项目-成功', '2024-01-10 13:43:54', '_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('UdoCvWPR', '员工\'刘一\'将任务\'标题\'设置为<完成>', '2024-01-10 13:53:28', '1', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('UIRKJHRX', '员工\'张三\'将任务\'标题\'设置为<完成>', '2024-01-10 14:19:37', '3', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('UvY2BRdI', '项目初始化-成功', '2024-01-10 13:43:56', '_34_Is-vdm9BgNFRNzGlV', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('WWxIt4f8', '项目归档-成功', '2024-01-10 13:46:32', 'tNLJqohtCAuc2b_dArpJJ', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('WzFAf4c1', '员工\'陈二\'接受了任务\'标题\'', '2024-01-10 14:14:01', '2', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('x9Palk-7', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 14:19:01', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('y1eT8Mou', '渲染部分完成-成功', '2024-01-10 13:45:43', 'bMC3y8lqWNevNCYUXy-bq', '9McoSw8tpCajGOFwpn5eE');
INSERT INTO `process_log` VALUES ('YPhMUPuW', '员工\'陈二\'将任务\'标题\'设置为<完成>', '2024-01-10 14:14:23', '2', 'iZCdNvaS-hyv5CkZnhOo8');
INSERT INTO `process_log` VALUES ('ZKutuvmL', '主管\'李鸿飞\'创建了任务\'标题\'', '2024-01-10 14:18:23', '_34_Is-vdm9BgNFRNzGlV', 'iZCdNvaS-hyv5CkZnhOo8');

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
-- Records of project
-- ----------------------------
INSERT INTO `project` VALUES ('9McoSw8tpCajGOFwpn5eE', '项目一', 500000, '082', '5', '2024-01-10 13:43:54', '2024-01-10 13:46:32', '\\projects\\项目一-张三-重庆大学-2024.1.10');
INSERT INTO `project` VALUES ('h-oajHnExed7QHbP-4j4x', '项目三', 100000000, '084', '2', '2024-01-10 13:48:15', NULL, '\\projects\\项目三-王五-重庆医科大学-2024.1.10');
INSERT INTO `project` VALUES ('iZCdNvaS-hyv5CkZnhOo8', '项目二', 200000, '083', '1', '2024-01-10 13:47:29', NULL, '\\projects\\项目二-李四-重庆大学-2024.1.10');

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
-- Records of subsidiary_company
-- ----------------------------
INSERT INTO `subsidiary_company` VALUES ('002', '渝中区', '001');
INSERT INTO `subsidiary_company` VALUES ('006', '江北区', '001');
INSERT INTO `subsidiary_company` VALUES ('010', '沙坪坝区', '001');
INSERT INTO `subsidiary_company` VALUES ('015', '九龙坡区', '001');
INSERT INTO `subsidiary_company` VALUES ('019', '巴南区', '001');
INSERT INTO `subsidiary_company` VALUES ('023', '北碚区', '001');
INSERT INTO `subsidiary_company` VALUES ('024', '南岸区', '001');
INSERT INTO `subsidiary_company` VALUES ('028', '渝北区', '001');
INSERT INTO `subsidiary_company` VALUES ('032', '合川区', '001');
INSERT INTO `subsidiary_company` VALUES ('036', '万州区', '001');
INSERT INTO `subsidiary_company` VALUES ('041', '武侯区', '040');
INSERT INTO `subsidiary_company` VALUES ('045', '锦江区', '040');
INSERT INTO `subsidiary_company` VALUES ('049', '青羊区', '040');
INSERT INTO `subsidiary_company` VALUES ('053', '金牛区', '040');
INSERT INTO `subsidiary_company` VALUES ('057', '成华区', '040');
INSERT INTO `subsidiary_company` VALUES ('062', '东城区', '061');
INSERT INTO `subsidiary_company` VALUES ('066', '西城区', '061');
INSERT INTO `subsidiary_company` VALUES ('070', '朝阳区', '061');
INSERT INTO `subsidiary_company` VALUES ('074', '海淀区', '061');
INSERT INTO `subsidiary_company` VALUES ('078', '丰台区', '061');

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
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('boss', '123');
INSERT INTO `user` VALUES ('front', '123');
INSERT INTO `user` VALUES ('yg1', '123');
INSERT INTO `user` VALUES ('yg10', '123');
INSERT INTO `user` VALUES ('yg11', '123');
INSERT INTO `user` VALUES ('yg12', '123');
INSERT INTO `user` VALUES ('yg13', '123');
INSERT INTO `user` VALUES ('yg14', '123');
INSERT INTO `user` VALUES ('yg15', '123');
INSERT INTO `user` VALUES ('yg16', '123');
INSERT INTO `user` VALUES ('yg17', '123');
INSERT INTO `user` VALUES ('yg18', '123');
INSERT INTO `user` VALUES ('yg19', '123');
INSERT INTO `user` VALUES ('yg2', '123');
INSERT INTO `user` VALUES ('yg20', '123');
INSERT INTO `user` VALUES ('yg21', '123');
INSERT INTO `user` VALUES ('yg22', '123');
INSERT INTO `user` VALUES ('yg23', '123');
INSERT INTO `user` VALUES ('yg24', '123');
INSERT INTO `user` VALUES ('yg25', '123');
INSERT INTO `user` VALUES ('yg26', '123');
INSERT INTO `user` VALUES ('yg27', '123');
INSERT INTO `user` VALUES ('yg28', '123');
INSERT INTO `user` VALUES ('yg29', '123');
INSERT INTO `user` VALUES ('yg3', '123');
INSERT INTO `user` VALUES ('yg30', '123');
INSERT INTO `user` VALUES ('yg31', '123');
INSERT INTO `user` VALUES ('yg32', '123');
INSERT INTO `user` VALUES ('yg33', '123');
INSERT INTO `user` VALUES ('yg34', '123');
INSERT INTO `user` VALUES ('yg35', '123');
INSERT INTO `user` VALUES ('yg36', '123');
INSERT INTO `user` VALUES ('yg37', '123');
INSERT INTO `user` VALUES ('yg38', '123');
INSERT INTO `user` VALUES ('yg39', '123');
INSERT INTO `user` VALUES ('yg4', '123');
INSERT INTO `user` VALUES ('yg40', '123');
INSERT INTO `user` VALUES ('yg41', '123');
INSERT INTO `user` VALUES ('yg42', '123');
INSERT INTO `user` VALUES ('yg43', '123');
INSERT INTO `user` VALUES ('yg44', '123');
INSERT INTO `user` VALUES ('yg45', '123');
INSERT INTO `user` VALUES ('yg46', '123');
INSERT INTO `user` VALUES ('yg47', '123');
INSERT INTO `user` VALUES ('yg48', '123');
INSERT INTO `user` VALUES ('yg49', '123');
INSERT INTO `user` VALUES ('yg5', '123');
INSERT INTO `user` VALUES ('yg50', '123');
INSERT INTO `user` VALUES ('yg51', '123');
INSERT INTO `user` VALUES ('yg52', '123');
INSERT INTO `user` VALUES ('yg53', '123');
INSERT INTO `user` VALUES ('yg54', '123');
INSERT INTO `user` VALUES ('yg55', '123');
INSERT INTO `user` VALUES ('yg56', '123');
INSERT INTO `user` VALUES ('yg57', '123');
INSERT INTO `user` VALUES ('yg58', '123');
INSERT INTO `user` VALUES ('yg59', '123');
INSERT INTO `user` VALUES ('yg6', '123');
INSERT INTO `user` VALUES ('yg60', '123');
INSERT INTO `user` VALUES ('yg7', '123');
INSERT INTO `user` VALUES ('yg8', '123');
INSERT INTO `user` VALUES ('yg9', '123');
INSERT INTO `user` VALUES ('zg1', '123');
INSERT INTO `user` VALUES ('zg2', '123');
INSERT INTO `user` VALUES ('zg3', '123');
INSERT INTO `user` VALUES ('zg4', '123');
INSERT INTO `user` VALUES ('zg5', '123');
INSERT INTO `user` VALUES ('zg6', '123');

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
