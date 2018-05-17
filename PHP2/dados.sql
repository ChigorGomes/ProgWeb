-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 17/05/2018 às 19:41
-- Versão do servidor: 5.7.22-0ubuntu0.16.04.1
-- Versão do PHP: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `formulario`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `dados`
--

CREATE TABLE `dados` (
  `nome` varchar(65) NOT NULL,
  `email` varchar(65) NOT NULL,
  `url` varchar(100) NOT NULL,
  `mensagem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Fazendo dump de dados para tabela `dados`
--

INSERT INTO `dados` (`nome`, `email`, `url`, `mensagem`) VALUES
('Cicero', 'higorgomesousa@gmail.com', 'http://google.com', 'Este é o valor padrão!'),
('Cicero Higor', 'higorgomesousa@gmail.com', 'http://google.com', 'Este é o valor padrão!');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
