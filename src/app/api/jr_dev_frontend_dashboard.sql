CREATE DATABASE IF NOT EXISTS jr_dev_dashboard;
USE jr_dev_dashboard;



CREATE TABLE malware (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100),
    threat_count INT
);

INSERT INTO malware (category, threat_count) VALUES ('pc', 12);
INSERT INTO malware (category, threat_count) VALUES ('mobile', 16);
INSERT INTO malware (category, threat_count) VALUES ('server', 2);

CREATE TABLE email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100),
    threat_count INT
);

INSERT INTO email (category, threat_count) VALUES ('spam', 19);
INSERT INTO email (category, threat_count) VALUES ('malware', 29);
INSERT INTO email (category, threat_count) VALUES ('phishing', 23);

CREATE TABLE users_mfa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100),
    threat_count INT
);

INSERT INTO users_mfa (category, threat_count) VALUES ('push', 10);
INSERT INTO users_mfa (category, threat_count) VALUES ('phone', 10);
INSERT INTO users_mfa (category, threat_count) VALUES ('text', 5);

CREATE TABLE general (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100),
    threat_count INT
);

INSERT INTO general (category, threat_count) VALUES ('missing_patches', 23);
INSERT INTO general (category, threat_count) VALUES ('login_30_days', 110);
INSERT INTO general (category, threat_count) VALUES ('firewall_blocks', 156);

CREATE TABLE user_fail_login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(100),
    jan INT,
    feb INT,
    mar INT,
    apr INT,
    may INT
);

INSERT INTO user_fail_login (user, jan, feb, mar, apr, may) VALUES ('WKS-EMR01', 15, 12, 24, 40, 34);
INSERT INTO user_fail_login (user, jan, feb, mar, apr, may) VALUES ('LPT-ALK23', 23, 43, 67, 54, 23);
INSERT INTO user_fail_login (user, jan, feb, mar, apr, may) VALUES ('SRV-COL98', 11, 76, 34, 98, 76);
INSERT INTO user_fail_login (user, jan, feb, mar, apr, may) VALUES ('PC-HSD44', 45, 11, 23, 87, 78);

CREATE TABLE attacks_by_country (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(100),
    hour INT,
    day INT
);

INSERT INTO attacks_by_country (country, hour, day) VALUES ('china', 11231, 269544);
INSERT INTO attacks_by_country (country, hour, day) VALUES ('russia', 15345, 368280);
INSERT INTO attacks_by_country (country, hour, day) VALUES ('india', 27476, 659424);
INSERT INTO attacks_by_country (country, hour, day) VALUES ('germany', 38756, 930144);
INSERT INTO attacks_by_country (country, hour, day) VALUES ('pakistan', 20847, 500328);