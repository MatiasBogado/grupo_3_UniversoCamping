-- MySQL Script generated by MySQL Workbench
-- Thu Oct  1 19:07:41 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mercado_liebre_v2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mercado_liebre_v2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mercado_liebre_v2` DEFAULT CHARACTER SET utf8 ;
USE `mercado_liebre_v2` ;

-- -----------------------------------------------------
-- Table `mercado_liebre_v2`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_v2`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_v2`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_v2`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `fecha` DATE NULL DEFAULT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT NULL,
  `direccion` VARCHAR(45) NULL DEFAULT NULL,
  `ciudad` VARCHAR(45) NULL DEFAULT NULL,
  `provincia` VARCHAR(45) NULL DEFAULT NULL,
  `rol` VARCHAR(45) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_v2`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_v2`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `price` INT(11) NOT NULL,
  `discount` INT(11) NOT NULL DEFAULT 0,
  `description` VARCHAR(300) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `id_user` INT(11) NULL DEFAULT NULL,
  `id_category` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_categoria_idx` (`id_category` ASC),
  INDEX `id_user_idx` (`id_user` ASC),
  CONSTRAINT `id_category`
    FOREIGN KEY (`id_category`)
    REFERENCES `mercado_liebre_v2`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `mercado_liebre_v2`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mercado_liebre_v2`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mercado_liebre_v2`.`cart` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) NOT NULL,
  `id_product` INT(11) NOT NULL,
  `quantity` INT(11) NOT NULL DEFAULT 1,
  `remito` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_producto_idx` (`id_product` ASC),
  INDEX `id_usuario_idx` (`id_user` ASC),
  CONSTRAINT `id_producto`
    FOREIGN KEY (`id_product`)
    REFERENCES `mercado_liebre_v2`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_usuario`
    FOREIGN KEY (`id_user`)
    REFERENCES `mercado_liebre_v2`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;