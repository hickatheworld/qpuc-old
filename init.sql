-- Run this in your mysql server to create the necessary database --
CREATE DATABASE IF NOT EXISTS `QPUC`;
USE `QPUC`;
CREATE TABLE IF NOT EXISTS `ADMINS` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
	`USERNAME` VARCHAR(50) NOT NULL,
	`PASSWORD` VARCHAR(255) NOT NULL
);
-- Create the first admin yourself using bcrypt to hash the password --
CREATE TABLE IF NOT EXISTS `QUESTIONS` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
	`STATEMENT` varchar(255) NOT NULL,
	`ANSWER` VARCHAR(255) NOT NULL,
	`COLLECTION` VARCHAR(20)
);
CREATE TABLE IF NOT EXISTS `COLLECTIONS` (
	`ID` INT UNSIGNED NOT NULL AUTO_INCREMENT KEY,
	`NAME` VARCHAR(20)
);